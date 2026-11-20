/* Dependency-free ZIP creation from local package sources. Works on file:// too. */
(()=>{const packages=new Map(),pending=new Map();window.ORGANON_PACKAGE_DATA=(slug,files)=>{packages.set(slug,files);pending.get(slug)?.resolve(files);pending.delete(slug)};
function load(slug){if(packages.has(slug))return Promise.resolve(packages.get(slug));if(pending.has(slug))return pending.get(slug).promise;let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b});pending.set(slug,{promise,resolve,reject});const script=document.createElement('script');script.src='./package-data/'+slug+'.js';script.onerror=()=>{pending.delete(slug);reject(Error('Template source package could not be loaded.'))};document.head.append(script);return promise}
const encoder=new TextEncoder();const crcTable=Array.from({length:256},(_,n)=>{for(let k=0;k<8;k++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0});function crc(bytes){let n=0xffffffff;for(const byte of bytes)n=crcTable[(n^byte)&255]^(n>>>8);return(n^0xffffffff)>>>0}
function zip(files){const locals=[],central=[];let offset=0;for(const [path,text] of Object.entries(files)){const name=encoder.encode(path),data=encoder.encode(text),sum=crc(data);const header=new Uint8Array(30+name.length),v=new DataView(header.buffer);v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint16(6,0x0800,true);v.setUint16(12,33,true);v.setUint32(14,sum,true);v.setUint32(18,data.length,true);v.setUint32(22,data.length,true);v.setUint16(26,name.length,true);header.set(name,30);locals.push(header,data);const record=new Uint8Array(46+name.length),c=new DataView(record.buffer);c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint16(8,0x0800,true);c.setUint16(14,33,true);c.setUint32(16,sum,true);c.setUint32(20,data.length,true);c.setUint32(24,data.length,true);c.setUint16(28,name.length,true);c.setUint32(42,offset,true);record.set(name,46);central.push(record);offset+=header.length+data.length}const size=central.reduce((n,a)=>n+a.length,0),end=new Uint8Array(22),e=new DataView(end.buffer);e.setUint32(0,0x06054b50,true);e.setUint16(8,central.length,true);e.setUint16(10,central.length,true);e.setUint32(12,size,true);e.setUint32(16,offset,true);return new Blob([...locals,...central,end],{type:'application/zip'})}
window.createStyledDownload=async(slug,theme,settings)=>{
 const source=await load(slug),files={...source},palette=window.ORGANON_PALETTES.find(p=>p.id===theme);
 if(!palette)throw Error('Choose a valid palette before downloading.');
 const selection='<!-- ORGANON-SELECTION:START -->\nSelected palette: '+palette.name+' ('+palette.id+')\nPalette swatches: '+palette.colors.join(', ')+'\nSelected style: '+JSON.stringify(settings)+'\n<!-- ORGANON-SELECTION:END -->';
 for(const name of Object.keys(files)){
  if(name.endsWith('index.html')||name.endsWith('bootstrap.js'))files[name]=files[name].replace(/const FIXED_CONFIG = (.*?);/,(_,config)=>{const parsed=JSON.parse(config);parsed.theme=theme;return'const FIXED_CONFIG = '+JSON.stringify(parsed)+';'});
  if(name.endsWith('style-config.js'))files[name]='window.ORGANON_STYLE_DEFAULT = '+JSON.stringify(settings)+';\n';
  if(name.endsWith('START-HERE.txt'))files[name]=files[name].replace(/Selected palette: .*\n/,'Selected palette: '+palette.name+'\nSelected style: '+settings.preset+'\n')+'\nAPPEARANCE\nEdit style-config.js to adjust shape, fill, panel transparency, border thickness and icons.\n';
  if(name.endsWith('/BUILD-INSTRUCTIONS.md'))files[name]=files[name].replace(/<!-- ORGANON-SELECTION:START -->[\s\S]*?<!-- ORGANON-SELECTION:END -->/,()=>selection);
  if(/\/(?:TEMPLATE|ELEMENT)-MANIFEST\.json$/.test(name)){
   const manifest=JSON.parse(files[name]);
   manifest.selected_palette=JSON.parse(JSON.stringify(palette));
   manifest.selected_style={...settings};
   files[name]=JSON.stringify(manifest,null,2)+'\n';
  }
 }
 return zip(files);
};
})();
