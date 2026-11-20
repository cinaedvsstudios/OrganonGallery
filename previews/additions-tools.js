/* Interactive database and reusable UI elements: no external services. */
function dataFieldMapper(){
  let headers=['Full name','Email address','Status','Joined on'],rows=[['Alex Rivera','alex@example.test','Active','2026-10-08'],['Sam Chen','sam@example.test','Pending','2026-10-11'],['Morgan Lee','morgan@example.test','Active','2026-10-18']],mapping={'Name':'Full name','Email':'Email address','State':'Status','Created':'Joined on'},step=0;
  const target=['Name','Email','State','Created'];
  const parseCSV=text=>{
    const parsed=[];let row=[],field='',quoted=false;
    for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++}else quoted=!quoted}else if(c===','&&!quoted){row.push(field);field=''}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(field);if(row.some(v=>v.trim()))parsed.push(row);row=[];field=''}else field+=c}
    row.push(field);if(row.some(v=>v.trim()))parsed.push(row);return parsed;
  };
  ogxMount('Data import & field mapper','A source-to-destination mapping wizard with validation and an import preview.',`<div class="ogx-mapper"><aside class="ogx-steps" id="ogx-mapper-steps"></aside><section class="ogx-mapper-body" id="ogx-mapper-body"></section></div><div class="ogx-toolrow ogx-mapper-footer"><span id="ogx-mapper-status"></span><div><button class="btn" id="ogx-mapper-back">Back</button> <button class="btn primary" id="ogx-mapper-next">Continue</button></div></div>`,'mapper');
  const joined=()=>rows.map(r=>Object.fromEntries(target.map(k=>[k,r[headers.indexOf(mapping[k])]??''])));
  function render(){
    document.querySelector('#ogx-mapper-steps').innerHTML=['Source','Map fields','Validate','Preview'].map((s,i)=>`<button data-mapper-step="${i}" class="${i===step?'active':''}"><span>${i+1}</span>${s}</button>`).join('');
    let html='';
    if(step===0)html=`<h2>Source data</h2><p>Load a CSV file from your device, or use the built-in sample. The file is parsed locally.</p><label class="ogx-file-picker">Choose CSV<input id="ogx-mapper-file" type="file" accept=".csv,text/csv"></label><p>${rows.length} sample rows · ${headers.length} source fields</p><div class="ogx-data-scroll"><table><thead><tr>${headers.map(h=>`<th>${ogxEscape(h)}</th>`).join('')}</tr></thead><tbody>${rows.slice(0,5).map(r=>`<tr>${headers.map((_,i)=>`<td>${ogxEscape(r[i]||'')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    if(step===1)html=`<h2>Map destination fields</h2><p>Match each destination to a column from your source.</p><div class="ogx-field-mapping">${target.map(k=>`<label><strong>${k}</strong><select data-map-target="${k}"><option value="">— Unmapped —</option>${headers.map(h=>`<option value="${ogxEscape(h)}" ${mapping[k]===h?'selected':''}>${ogxEscape(h)}</option>`).join('')}</select></label>`).join('')}</div>`;
    if(step===2){const selected=target.filter(k=>mapping[k]);const duplicates=selected.filter((x,i)=>selected.findIndex(y=>mapping[y]===mapping[x])!==i);html=`<h2>Validation report</h2><div class="ogx-valid-list">${target.map(k=>`<div><strong>${ogxEscape(k)}</strong><span class="${mapping[k]?'good':'warning'}">${mapping[k]?'✓ '+ogxEscape(mapping[k]):'Needs mapping'}</span></div>`).join('')}</div><p>${duplicates.length?'Warning: some source columns are assigned more than once.':'No duplicate source mappings found.'}</p><p>${rows.length} records are ready for local preview. No database connection is used.</p>`}
    if(step===3)html=`<h2>Mapped data preview</h2><p>Review the result before exporting JSON.</p><div class="ogx-data-scroll"><table><thead><tr>${target.map(k=>`<th>${k}</th>`).join('')}</tr></thead><tbody>${joined().slice(0,12).map(r=>`<tr>${target.map(k=>`<td>${ogxEscape(r[k])}</td>`).join('')}</tr>`).join('')}</tbody></table></div><button class="btn" id="ogx-mapper-export">Export mapped JSON</button>`;
    document.querySelector('#ogx-mapper-body').innerHTML=html;
    document.querySelector('#ogx-mapper-back').disabled=step===0;
    document.querySelector('#ogx-mapper-next').textContent=step===3?'Start again':'Continue';
    document.querySelector('#ogx-mapper-status').textContent='Step '+(step+1)+' of 4';
    document.querySelectorAll('[data-mapper-step]').forEach(b=>b.onclick=()=>{step=Number(b.dataset.mapperStep);render()});
    if(step===0)document.querySelector('#ogx-mapper-file').onchange=async e=>{const file=e.target.files[0];if(!file)return;if(file.size>2000000){document.querySelector('#ogx-mapper-body p').textContent='Please choose a CSV smaller than 2 MB.';return}const data=parseCSV(await file.text());if(data.length<2){document.querySelector('#ogx-mapper-body p').textContent='CSV must contain a header and at least one data row.';return}headers=data[0].map(x=>x.trim());rows=data.slice(1,501);mapping=Object.fromEntries(target.map(k=>[k,headers.find(h=>h.toLowerCase().includes(k.toLowerCase()))||'']));render()};
    if(step===1)document.querySelectorAll('[data-map-target]').forEach(b=>b.onchange=()=>{mapping[b.dataset.mapTarget]=b.value});
    if(step===3)document.querySelector('#ogx-mapper-export').onclick=()=>{const a=document.createElement('a'),url=URL.createObjectURL(new Blob([JSON.stringify(joined(),null,2)],{type:'application/json'}));a.href=url;a.download='mapped-sample.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
  }
  document.querySelector('#ogx-mapper-back').onclick=()=>{step=Math.max(0,step-1);render()};
  document.querySelector('#ogx-mapper-next').onclick=()=>{step=(step+1)%4;render()};render();
}

function assetLibraryReview(){
  let assets=Array.from({length:12},(_,i)=>({id:i+1,name:['Landscape image','Social campaign','Cover design','Brand artwork'][i%4]+' '+String(i+1).padStart(2,'0'),type:['Image','Graphic','Document'][i%3],status:i%5===0?'Rejected':i%3===0?'Approved':'Pending',notes:'Sample media metadata and approval notes.'}));
  let active=1,filter='All',view='grid',search='';
  ogxMount('Asset library & review','Browse assets in a thumbnail grid, inspect metadata and change review status.',`<div class="ogx-workbench"><aside class="ogx-sidebar"><h2>Collections</h2>${['All','Pending','Approved','Rejected'].map(v=>`<button class="ogx-outline-item" data-asset-status="${v}">${v}</button>`).join('')}<p class="ogx-help">Status changes are kept in this preview session.</p></aside><section class="ogx-main"><div class="ogx-toolrow"><label class="ogx-small-search"><input type="search" id="ogx-assets-search" placeholder="Search assets…"></label><div class="ogx-segment"><button class="btn" data-asset-view="grid">Grid</button><button class="btn" data-asset-view="list">List</button></div></div><div id="ogx-asset-list"></div></section><aside class="ogx-inspector"><h2>Inspector</h2><div id="ogx-asset-detail"></div></aside></div>`,'asset');
  function draw(){
    const filtered=assets.filter(x=>(filter==='All'||x.status===filter)&&x.name.toLowerCase().includes(search));
    if(!filtered.some(x=>x.id===active))active=filtered[0]?.id??null;
    document.querySelectorAll('[data-asset-status]').forEach(b=>b.classList.toggle('active',b.dataset.assetStatus===filter));
    document.querySelectorAll('[data-asset-view]').forEach(b=>b.classList.toggle('active',b.dataset.assetView===view));
    document.querySelector('#ogx-asset-list').innerHTML=`<div class="ogx-asset-grid ${view==='list'?'as-list':''}">${filtered.map(a=>`<button class="ogx-asset-card ${a.id===active?'selected':''}" data-asset="${a.id}"><div class="ogx-asset-thumb ogx-thumb-${a.id%5}"><span>${a.type==='Document'?'▤':'◇'}</span></div><strong>${ogxEscape(a.name)}</strong><small>${a.type} · ${a.status}</small></button>`).join('')}</div>`||'<p>No assets.</p>';
    const item=assets.find(a=>a.id===active);
    document.querySelector('#ogx-asset-detail').innerHTML=item?`<div class="ogx-asset-large ogx-thumb-${item.id%5}">◇</div><h3>${ogxEscape(item.name)}</h3><p class="ogx-chip">${item.status}</p><dl class="ogx-review"><dt>Type</dt><dd>${item.type}</dd><dt>Identifier</dt><dd>#${item.id}</dd><dt>Notes</dt><dd>${item.notes}</dd></dl><div class="ogx-toolrow"><button class="btn" id="ogx-asset-approve">Approve</button><button class="btn" id="ogx-asset-reject">Reject</button></div>`:'<p>Nothing selected.</p>';
    document.querySelectorAll('[data-asset]').forEach(b=>b.onclick=()=>{active=Number(b.dataset.asset);draw()});
    if(item){document.querySelector('#ogx-asset-approve').onclick=()=>{item.status='Approved';draw()};document.querySelector('#ogx-asset-reject').onclick=()=>{item.status='Rejected';draw()}}
  }
  document.querySelectorAll('[data-asset-status]').forEach(b=>b.onclick=()=>{filter=b.dataset.assetStatus;draw()});
  document.querySelectorAll('[data-asset-view]').forEach(b=>b.onclick=()=>{view=b.dataset.assetView;draw()});
  document.querySelector('#ogx-assets-search').oninput=e=>{search=e.target.value.toLowerCase();draw()};draw();
}

function smartFileUpload(){
  let files=[],counter=0;
  ogxMount('Smart file upload','A reusable drag-and-drop area with type validation, previews and processing states.',`<section class="ogx-upload"><div class="ogx-drop-zone" id="ogx-drop-zone" role="button" tabindex="0" aria-label="Choose files"><div class="ogx-drop-icon">⇧</div><h2>Drop files here</h2><p>Or choose images, PDFs and text files from your device</p><button class="btn primary" type="button" id="ogx-upload-select">Browse files</button><input id="ogx-upload-input" type="file" multiple accept="image/*,.pdf,.txt,.csv,application/pdf,text/plain,text/csv" hidden></div><div class="ogx-toolrow"><strong>File queue <span id="ogx-upload-count">0</span></strong><span>Max 5 MB per file</span></div><div id="ogx-upload-items" class="ogx-upload-items"></div><div class="ogx-toolrow"><span class="ogx-help">Processing is simulated locally; no files are uploaded to a server.</span><button class="btn" id="ogx-upload-process">Validate queue</button></div></section>`,'upload');
  const readable=size=>size<1024?size+' B':size<1048576?(size/1024).toFixed(1)+' KB':(size/1048576).toFixed(2)+' MB';
  function add(items){for(const file of items){const ok=(file.type.startsWith('image/')||['application/pdf','text/plain','text/csv'].includes(file.type)||/\.(pdf|txt|csv)$/i.test(file.name))&&file.size<=5*1024*1024;const entry={id:++counter,name:file.name,size:file.size,status:ok?'Ready':'Rejected',reason:file.size>5*1024*1024?'Exceeds 5 MB':'Unsupported file type',preview:null};if(ok&&file.type.startsWith('image/'))entry.preview=URL.createObjectURL(file);files.push(entry)}draw()}
  function draw(){
    document.querySelector('#ogx-upload-count').textContent=files.length;
    document.querySelector('#ogx-upload-items').innerHTML=files.length?files.map(f=>`<article class="ogx-file-row">${f.preview?`<img src="${f.preview}" alt="">`:'<span class="ogx-file-icon">▤</span>'}<div><strong>${ogxEscape(f.name)}</strong><small>${readable(f.size)} · <span class="${f.status==='Rejected'?'ogx-error':''}">${f.status==='Rejected'?f.reason:f.status}</span></small>${f.status==='Checking'||f.status==='Validated'?'<progress max="100" value="'+(f.progress||0)+'" aria-label="Local file validation progress"></progress>':''}</div><button class="btn" data-file-remove="${f.id}" aria-label="Remove ${ogxEscape(f.name)}">×</button></article>`).join(''):'<p class="ogx-empty">No files selected.</p>';
    document.querySelectorAll('[data-file-remove]').forEach(b=>b.onclick=()=>{const i=files.findIndex(f=>f.id===Number(b.dataset.fileRemove));if(i<0)return;if(files[i].preview)URL.revokeObjectURL(files[i].preview);files.splice(i,1);draw()});
  }
  const input=document.querySelector('#ogx-upload-input'),zone=document.querySelector('#ogx-drop-zone');
  document.querySelector('#ogx-upload-select').onclick=e=>{e.stopPropagation();input.click()};
  zone.onclick=e=>{if(e.target.closest('button'))return;input.click()};
  zone.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();input.click()}};
  input.onchange=e=>{add([...e.target.files]);input.value=''};
  zone.ondragover=e=>{e.preventDefault();zone.classList.add('dragging')};
  zone.ondragleave=e=>{if(!zone.contains(e.relatedTarget))zone.classList.remove('dragging')};
  zone.ondrop=e=>{e.preventDefault();zone.classList.remove('dragging');add([...e.dataTransfer.files])};
  let validationTimer=null;
  document.querySelector('#ogx-upload-process').onclick=()=>{
    if(validationTimer)clearInterval(validationTimer);
    files.forEach(f=>{if(f.status!=='Rejected'){f.status='Checking';f.progress=0}});
    draw();
    validationTimer=setInterval(()=>{
      let pending=false;
      files.forEach(f=>{if(f.status==='Checking'){f.progress=Math.min(100,(f.progress||0)+20);if(f.progress>=100)f.status='Validated';else pending=true}});
      draw();
      if(!pending){clearInterval(validationTimer);validationTimer=null}
    },130);
  };
  window.addEventListener('pagehide',()=>files.forEach(f=>{if(f.preview)URL.revokeObjectURL(f.preview)}),{once:true});draw();
}

function bottomSheetDrawer(){
  let side='bottom',snap='medium',open=false,startY=0;
  ogxMount('Bottom sheet & drawer','Open a draggable mobile sheet or a sliding side drawer without leaving the page.',`<div class="ogx-sheet-example"><div class="ogx-sheet-controls"><h2>Overlay layout demo</h2><p>Choose a panel placement, then experiment with its size and dismissal behavior.</p><div class="ogx-toolrow"><button class="btn primary" id="ogx-sheet-open">Open panel</button><button class="btn" data-sheet-side="bottom">Bottom sheet</button><button class="btn" data-sheet-side="right">Side drawer</button></div></div><div class="ogx-sheet-device"><header><strong>Sample application</strong><span>☰</span></header><div class="ogx-sheet-fake"><div></div><div></div><div></div></div><div class="ogx-sheet-backdrop" id="ogx-sheet-backdrop"></div><aside id="ogx-sheet-panel" class="ogx-sheet-panel" role="dialog" aria-modal="true" aria-label="Sample panel" aria-hidden="true"><button class="ogx-sheet-handle" id="ogx-sheet-handle" aria-label="Drag panel"></button><div class="ogx-toolrow"><h3>Panel content</h3><button class="btn" id="ogx-sheet-close">×</button></div><p>A reusable overlay with configurable placement and snap points.</p><div class="ogx-toolrow"><button class="btn" data-sheet-snap="small">Small</button><button class="btn" data-sheet-snap="medium">Medium</button><button class="btn" data-sheet-snap="large">Large</button></div><label>Example control<select><option>Option one</option><option>Option two</option></select></label></aside></div></div>`,'sheet');
  const panel=document.querySelector('#ogx-sheet-panel'),backdrop=document.querySelector('#ogx-sheet-backdrop');
  function render(){
    panel.className=`ogx-sheet-panel ${open?'open':''} ${side==='right'?'as-drawer':'as-sheet'} snap-${snap}`;
    panel.setAttribute('aria-hidden',String(!open));
    backdrop.classList.toggle('visible',open);
    document.querySelectorAll('[data-sheet-side]').forEach(b=>b.classList.toggle('active',b.dataset.sheetSide===side));
    document.querySelectorAll('[data-sheet-snap]').forEach(b=>b.classList.toggle('active',b.dataset.sheetSnap===snap));
    panel.inert=!open;
  }
  document.querySelector('#ogx-sheet-open').onclick=()=>{open=true;render()};
  document.querySelector('#ogx-sheet-close').onclick=()=>{open=false;render()};
  backdrop.onclick=()=>{open=false;render()};
  document.querySelectorAll('[data-sheet-side]').forEach(b=>b.onclick=()=>{side=b.dataset.sheetSide;open=true;render()});
  document.querySelectorAll('[data-sheet-snap]').forEach(b=>b.onclick=()=>{snap=b.dataset.sheetSnap;render()});
  document.querySelector('#ogx-sheet-handle').onpointerdown=e=>{startY=side==='right'?e.clientX:e.clientY;e.currentTarget.setPointerCapture(e.pointerId)};
  document.querySelector('#ogx-sheet-handle').onpointerup=e=>{const move=(side==='right'?e.clientX:e.clientY)-startY;if((side==='bottom'&&move>65)||(side==='right'&&move>65)){open=false;render()}};
  window.addEventListener('keydown',e=>{if(e.key==='Escape'&&open){open=false;render()}});
  render();
}

function contextualFloatingToolbar(){
  ogxMount('Contextual floating toolbar','Select text to reveal actions near the selection rather than a permanent editor ribbon.',`<section class="ogx-context-demo"><div class="ogx-toolrow"><strong>Editable document</strong><span>Select a sentence or phrase to begin</span></div><article id="ogx-context-editor" class="ogx-editable" contenteditable="true" role="textbox" aria-multiline="true"><h2>Designing with context</h2><p>A contextual toolbar appears exactly where it is useful. Select this sample text to experiment with bold, italic, highlighting and copying.</p><p>It stays out of the way while you read, and returns as soon as you select another passage.</p></article><div id="ogx-floating-toolbar" class="ogx-floating-toolbar" role="toolbar" aria-label="Text formatting" hidden><button class="btn" data-format="bold" title="Bold">B</button><button class="btn" data-format="italic" title="Italic"><i>I</i></button><button class="btn" data-format="highlight" title="Highlight">◩</button><button class="btn" data-format="copy" title="Copy">Copy</button></div><p id="ogx-context-notice" class="ogx-help" role="status">Try selecting text in the editable document.</p></section>`,'contextual');
  const editor=document.querySelector('#ogx-context-editor'),toolbar=document.querySelector('#ogx-floating-toolbar');let range=null;
  function position(){
    const selection=window.getSelection();if(!selection||selection.isCollapsed||!selection.rangeCount||!editor.contains(selection.anchorNode)||!editor.contains(selection.focusNode)){toolbar.hidden=true;return}
    range=selection.getRangeAt(0).cloneRange();const rect=range.getBoundingClientRect(),parent=toolbar.parentElement.getBoundingClientRect();
    toolbar.hidden=false;toolbar.style.left=Math.min(Math.max(rect.left-parent.left,0),Math.max(0,parent.width-240))+'px';toolbar.style.top=Math.max(0,rect.top-parent.top-46)+'px';
  }
  editor.addEventListener('mouseup',position);editor.addEventListener('keyup',position);
  document.addEventListener('selectionchange',()=>{if(document.activeElement===editor)position()});
  toolbar.addEventListener('pointerdown',e=>e.preventDefault());
  document.querySelectorAll('[data-format]').forEach(b=>b.onclick=async()=>{
    if(!range)return;const type=b.dataset.format,selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);
    if(type==='copy'){try{await navigator.clipboard.writeText(selection.toString());document.querySelector('#ogx-context-notice').textContent='Selection copied.'}catch{document.querySelector('#ogx-context-notice').textContent='Copy is unavailable in this preview.'}}
    else if(type==='bold'||type==='italic'){document.execCommand(type,false,null)}
    else if(type==='highlight'){try{document.execCommand('hiliteColor',false,'#ffe28c')}catch{}}
    toolbar.hidden=true;
  });
}

function comparisonSlider(){
  let amount=50,direction='horizontal';
  const graphic=(variant)=>`<svg viewBox="0 0 760 470" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${variant?'After':'Before'} sample landscape"><rect width="760" height="470" fill="${variant?'#d8edff':'#e3b38e'}"/><circle cx="575" cy="125" r="76" fill="${variant?'#fff4ac':'#cc7251'}"/><path d="M0 350L130 165L260 310L390 130L535 325L660 185L760 290V470H0Z" fill="${variant?'#769ab1':'#8e6762'}"/><path d="M0 390L180 275L360 398L560 270L760 360V470H0Z" fill="${variant?'#3d756f':'#554f52'}"/><path d="M0 432Q210 350 400 423T760 405V470H0Z" fill="${variant?'#2c6261':'#373b46'}"/><rect x="190" y="251" width="105" height="91" rx="3" fill="${variant?'#e8e0ce':'#a9795e'}"/><path d="M173 258L240 206L310 258Z" fill="${variant?'#456c7d':'#69515b'}"/><rect x="231" y="287" width="28" height="55" fill="${variant?'#6d9aab':'#453a3e'}"/></svg>`;
  ogxMount('Before & after comparison','A reusable visual comparison element with a draggable reveal handle and orientation switch.',`<section class="ogx-compare"><div class="ogx-toolrow"><div class="ogx-segment"><button class="btn" data-compare-orient="horizontal">Horizontal reveal</button><button class="btn" data-compare-orient="vertical">Vertical reveal</button></div><button class="btn" id="ogx-compare-reset">Reset</button></div><div id="ogx-compare-stage" class="ogx-compare-stage"><div class="ogx-compare-base">${graphic(0)}</div><div class="ogx-compare-overlay" id="ogx-compare-overlay">${graphic(1)}</div><span class="ogx-compare-label before">Before</span><span class="ogx-compare-label after">After</span><div class="ogx-compare-divider" id="ogx-compare-divider"><span>↔</span></div><input id="ogx-compare-range" type="range" min="0" max="100" value="50" aria-label="Adjust comparison reveal"></div><div class="ogx-toolrow"><span>Move the handle or use the keyboard arrows.</span><strong id="ogx-compare-amount">50%</strong></div></section>`,'comparison');
  const overlay=document.querySelector('#ogx-compare-overlay'),divider=document.querySelector('#ogx-compare-divider'),stage=document.querySelector('#ogx-compare-stage'),input=document.querySelector('#ogx-compare-range');
  function draw(){
    stage.classList.toggle('vertical',direction==='vertical');
    overlay.style.clipPath=direction==='horizontal'?`inset(0 ${100-amount}% 0 0)`:`inset(0 0 ${100-amount}% 0)`;
    divider.style.cssText=direction==='horizontal'?`left:${amount}%;top:0;height:100%;width:3px`:`top:${amount}%;left:0;width:100%;height:3px`;
    document.querySelector('#ogx-compare-amount').textContent=amount+'%';input.value=amount;
    document.querySelectorAll('[data-compare-orient]').forEach(b=>b.classList.toggle('active',b.dataset.compareOrient===direction));
  }
  input.oninput=e=>{amount=Number(e.target.value);draw()};
  let pointerActive=false;
  function updateFromPointer(e){
    const rect=stage.getBoundingClientRect();
    const fraction=direction==='horizontal'?(e.clientX-rect.left)/rect.width:(e.clientY-rect.top)/rect.height;
    amount=Math.max(0,Math.min(100,Math.round(fraction*100)));draw();
  }
  input.onpointerdown=e=>{e.preventDefault();pointerActive=true;stage.setPointerCapture(e.pointerId);updateFromPointer(e)};
  stage.onpointermove=e=>{if(pointerActive)updateFromPointer(e)};
  stage.onpointerup=()=>{pointerActive=false};
  stage.onpointercancel=()=>{pointerActive=false};
  document.querySelector('#ogx-compare-reset').onclick=()=>{amount=50;draw()};
  document.querySelectorAll('[data-compare-orient]').forEach(b=>b.onclick=()=>{direction=b.dataset.compareOrient;draw()});
  draw();
}
Object.assign(collectionRenderers,{dataFieldMapper,assetLibraryReview,smartFileUpload,bottomSheetDrawer,contextualFloatingToolbar,comparisonSlider});
