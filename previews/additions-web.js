/* New UI-first, dependency-free starter layouts. All data stays local. */
function ogxMount(name,lead,content,section){
  root.innerHTML=`<main class="ogx ogx-${section}"><header class="ogx-head"><div><span class="ogx-eyebrow">INTERACTIVE STARTER</span><h1>${name}</h1><p>${lead}</p></div><span class="ogx-demo">Local demo · no service required</span></header>${content}</main>`;
}

function ogxEscape(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

function storyboardPlanner(){
  const shots=[
    {id:1,name:'Opening wide shot',scene:'01',duration:5,type:'Wide',notes:'Establish the location.'},
    {id:2,name:'The arrival',scene:'01',duration:3,type:'Medium',notes:'Move toward the main entrance.'},
    {id:3,name:'Close detail',scene:'02',duration:2,type:'Close-up',notes:'Emphasize the key object.'},
    {id:4,name:'Final reveal',scene:'02',duration:6,type:'Tracking',notes:'Pull out to the final composition.'}
  ];
  let active=1,mode='grid',counter=4;
  const art=i=>`<div class="ogx-shot-art ogx-shot-art-${i%4}"><span class="ogx-shot-sun"></span><span class="ogx-shot-hill"></span><strong>SHOT ${String(i).padStart(2,'0')}</strong></div>`;
  ogxMount('Storyboard planner','Arrange scenes, edit each shot and switch between a visual board and shot list.',`<div class="ogx-workbench"><aside class="ogx-sidebar"><h2>Scenes</h2><button class="btn" id="ogx-new-shot">+ Add shot</button><div id="ogx-shot-outline"></div><small>Use the arrows to change sequence order.</small></aside><section class="ogx-main"><div class="ogx-toolrow"><div class="ogx-segment"><button class="btn" data-shot-mode="grid">Storyboard</button><button class="btn" data-shot-mode="list">Shot list</button></div><span id="ogx-runtime"></span></div><div id="ogx-shot-board"></div></section><aside class="ogx-inspector"><h2>Shot properties</h2><div id="ogx-shot-editor"></div></aside></div>`,'storyboard');
  const get=()=>shots.find(s=>s.id===active)||shots[0];
  function redraw(){
    document.querySelectorAll('[data-shot-mode]').forEach(b=>b.classList.toggle('active',b.dataset.shotMode===mode));
    document.querySelector('#ogx-runtime').textContent=shots.length+' shots · '+shots.reduce((n,s)=>n+s.duration,0)+' seconds';
    document.querySelector('#ogx-shot-outline').innerHTML=shots.map((s,i)=>`<button class="ogx-outline-item ${s.id===active?'active':''}" data-shot="${s.id}"><span>${String(i+1).padStart(2,'0')}</span> ${ogxEscape(s.name)}</button>`).join('');
    document.querySelector('#ogx-shot-board').innerHTML=`<div class="${mode==='grid'?'ogx-shot-grid':'ogx-shot-list'}">${shots.map((s,i)=>`<article class="ogx-shot-card ${s.id===active?'selected':''}" data-shot-card="${s.id}" draggable="true">${art(i+1)}<div class="ogx-shot-info"><small>SCENE ${s.scene} · ${s.duration}s</small><strong>${ogxEscape(s.name)}</strong><span>${ogxEscape(s.type)}</span></div><div class="ogx-shot-actions"><button class="btn" data-shift="${s.id}" data-direction="-1" aria-label="Move up">↑</button><button class="btn" data-shift="${s.id}" data-direction="1" aria-label="Move down">↓</button></div></article>`).join('')}</div>`;
    const s=get();if(!s)return;
    document.querySelector('#ogx-shot-editor').innerHTML=`<label>Shot title<input id="ogx-shot-name" value="${ogxEscape(s.name)}"></label><label>Scene<input id="ogx-shot-scene" value="${ogxEscape(s.scene)}"></label><label>Shot type<select id="ogx-shot-type">${['Wide','Medium','Close-up','Tracking','Overhead'].map(v=>`<option ${s.type===v?'selected':''}>${v}</option>`).join('')}</select></label><label>Duration (seconds)<input id="ogx-shot-duration" type="number" min="1" max="300" value="${s.duration}"></label><label>Notes<textarea id="ogx-shot-notes">${ogxEscape(s.notes)}</textarea></label><div class="ogx-toolrow"><button class="btn" id="ogx-duplicate-shot">Duplicate</button><button class="btn" id="ogx-delete-shot">Remove</button></div>`;
    document.querySelectorAll('[data-shot],[data-shot-card]').forEach(el=>el.onclick=e=>{if(e.target.closest('[data-shift]'))return;active=Number(el.dataset.shot||el.dataset.shotCard);redraw()});
    document.querySelectorAll('[data-shift]').forEach(b=>b.onclick=()=>{let i=shots.findIndex(s=>s.id===Number(b.dataset.shift)),j=i+Number(b.dataset.direction);if(j<0||j>=shots.length)return;[shots[i],shots[j]]=[shots[j],shots[i]];redraw()});
    document.querySelectorAll('[data-shot-card]').forEach(card=>{
   card.ondragstart=e=>{e.dataTransfer.setData('text/plain',card.dataset.shotCard);e.dataTransfer.effectAllowed='move'};
   card.ondragover=e=>{e.preventDefault();card.classList.add('drop-target')};
   card.ondragleave=()=>card.classList.remove('drop-target');
   card.ondrop=e=>{e.preventDefault();card.classList.remove('drop-target');
     const source=Number(e.dataTransfer.getData('text/plain')),target=Number(card.dataset.shotCard);
     if(source===target)return;
     const i=shots.findIndex(s=>s.id===source),j=shots.findIndex(s=>s.id===target);
     if(i<0||j<0)return;const [moving]=shots.splice(i,1);shots.splice(j,0,moving);active=source;redraw();
   };
 });
 
    for(const [field,key] of [['name','name'],['scene','scene'],['type','type'],['notes','notes'],['duration','duration']]){
      document.querySelector('#ogx-shot-'+field).onchange=e=>{s[key]=field==='duration'?Math.max(1,Number(e.target.value)||1):e.target.value;redraw()};
    }
    document.querySelector('#ogx-duplicate-shot').onclick=()=>{const i=shots.indexOf(s);const copy={...s,id:++counter,name:s.name+' copy'};shots.splice(i+1,0,copy);active=copy.id;redraw()};
    document.querySelector('#ogx-delete-shot').onclick=()=>{if(shots.length<=1)return;shots.splice(shots.indexOf(s),1);active=shots[0].id;redraw()};
  }
  document.querySelector('#ogx-new-shot').onclick=()=>{const s={id:++counter,name:'New shot',scene:'03',duration:4,type:'Wide',notes:''};shots.push(s);active=s.id;redraw()};
  document.querySelectorAll('[data-shot-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.shotMode;redraw()});redraw();
}

function visualWorkflow(){
  let nodes=[{id:1,type:'Start',label:'Begin',x:60,y:110},{id:2,type:'Action',label:'Review item',x:280,y:110},{id:3,type:'Decision',label:'Approved?',x:500,y:110},{id:4,type:'End',label:'Complete',x:720,y:110}],links=[[1,2],[2,3],[3,4]],active=2,connecting=false,next=4,zoom=1;
  ogxMount('Visual workflow','Build a process map by positioning, connecting and editing nodes.',`<div class="ogx-workbench"><aside class="ogx-sidebar"><h2>Node library</h2>${['Start','Action','Decision','End'].map(v=>`<button class="ogx-library-item" data-add-node="${v}"><span class="ogx-node-dot"></span>${v}<span>+</span></button>`).join('')}<p class="ogx-help">Choose Connect, then click the source and destination nodes.</p><button class="btn" id="ogx-reset-flow">Reset canvas</button></aside><section class="ogx-main"><div class="ogx-toolrow"><div class="ogx-segment"><button class="btn" id="ogx-connect">Connect</button><button class="btn" id="ogx-zoom-out">−</button><span id="ogx-zoom-readout">100%</span><button class="btn" id="ogx-zoom-in">+</button></div><span id="ogx-link-count"></span></div><div class="ogx-flow-window"><div class="ogx-flow-stage" id="ogx-flow-stage"><svg id="ogx-flow-wires" aria-hidden="true"></svg><div id="ogx-flow-nodes"></div></div></div><p class="ogx-help" id="ogx-flow-message" role="status">Drag a node by its heading. Select one to edit it.</p></section><aside class="ogx-inspector"><h2>Node details</h2><div id="ogx-node-details"></div></aside></div>`,'workflow');
  let first=null;
  const stage=document.querySelector('#ogx-flow-stage');
  function draw(){
    stage.style.transform=`scale(${zoom})`;
    document.querySelector('#ogx-zoom-readout').textContent=Math.round(zoom*100)+'%';
    document.querySelector('#ogx-link-count').textContent=nodes.length+' nodes · '+links.length+' links';
    document.querySelector('#ogx-connect').classList.toggle('active',connecting);
    document.querySelector('#ogx-flow-nodes').innerHTML=nodes.map(n=>`<div class="ogx-flow-node ${n.type.toLowerCase()} ${n.id===active?'selected':''}" data-node="${n.id}" style="left:${n.x}px;top:${n.y}px"><div class="ogx-node-top" tabindex="0">${ogxEscape(n.type)}</div><strong>${ogxEscape(n.label)}</strong><span>●</span></div>`).join('');
    const map=new Map(nodes.map(n=>[n.id,n]));
    document.querySelector('#ogx-flow-wires').innerHTML=links.map(([a,b])=>{const x=map.get(a),y=map.get(b);if(!x||!y)return'';const x1=x.x+142,y1=x.y+36,x2=y.x,y2=y.y+36,c=(x1+x2)/2;return `<path d="M${x1} ${y1} C${c} ${y1},${c} ${y2},${x2} ${y2}" fill="none" stroke="var(--accent)" stroke-width="3" marker-end="url(#ogx-arrow)"/>`}).join('')+`<defs><marker id="ogx-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="var(--accent)"/></marker></defs>`;
    const n=map.get(active);
    document.querySelector('#ogx-node-details').innerHTML=n?`<label>Label<input id="ogx-node-label" value="${ogxEscape(n.label)}"></label><label>Type<select id="ogx-node-type">${['Start','Action','Decision','End'].map(v=>`<option ${n.type===v?'selected':''}>${v}</option>`).join('')}</select></label><p class="ogx-help">Position: ${Math.round(n.x)}, ${Math.round(n.y)}</p><button class="btn" id="ogx-remove-node">Delete node</button>`:'Select a node';
    if(n){document.querySelector('#ogx-node-label').onchange=e=>{n.label=e.target.value;draw()};document.querySelector('#ogx-node-type').onchange=e=>{n.type=e.target.value;draw()};document.querySelector('#ogx-remove-node').onclick=()=>{nodes=nodes.filter(v=>v.id!==active);links=links.filter(([a,b])=>a!==active&&b!==active);active=nodes[0]?.id;draw()}}
    document.querySelectorAll('[data-node]').forEach(el=>{
      el.onclick=()=>{const id=Number(el.dataset.node);if(connecting){if(first===null){first=id;document.querySelector('#ogx-flow-message').textContent='Click the destination node.'}else{if(first!==id&&!links.some(([a,b])=>a===first&&b===id))links.push([first,id]);first=null;connecting=false;draw()}}else{active=id;draw()}};
      el.querySelector('.ogx-node-top').onpointerdown=e=>{if(connecting)return;e.preventDefault();active=Number(el.dataset.node);const item=nodes.find(x=>x.id===active),x=item.x,y=item.y,sx=e.clientX,sy=e.clientY;const move=v=>{item.x=Math.max(5,Math.min(785,x+(v.clientX-sx)/zoom));item.y=Math.max(5,Math.min(505,y+(v.clientY-sy)/zoom));el.style.left=item.x+'px';el.style.top=item.y+'px';const map=new Map(nodes.map(n=>[n.id,n]));document.querySelectorAll('#ogx-flow-wires path').forEach((path,i)=>{if(i>=links.length)return;const [a,b]=links[i],left=map.get(a),right=map.get(b),px=left.x+142,py=left.y+36,qx=right.x,qy=right.y+36,c=(px+qx)/2;path.setAttribute('d',`M${px} ${py} C${c} ${py},${c} ${qy},${qx} ${qy}`)})};const up=()=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);draw()};window.addEventListener('pointermove',move);window.addEventListener('pointerup',up,{once:true})};
    });
  }
  document.querySelectorAll('[data-add-node]').forEach(b=>b.onclick=()=>{const type=b.dataset.addNode,id=++next;nodes.push({id,type,label:type+' '+id,x:70+((id*110)%600),y:220+((id*37)%210)});active=id;draw()});
  document.querySelector('#ogx-connect').onclick=()=>{connecting=!connecting;first=null;document.querySelector('#ogx-flow-message').textContent=connecting?'Click the source node, then its destination.':'Drag a node by its heading.';draw()};
  document.querySelector('#ogx-zoom-in').onclick=()=>{zoom=Math.min(1.5,zoom+.1);draw()};
  document.querySelector('#ogx-zoom-out').onclick=()=>{zoom=Math.max(.5,zoom-.1);draw()};
  document.querySelector('#ogx-reset-flow').onclick=()=>{nodes=[{id:1,type:'Start',label:'Begin',x:60,y:110},{id:2,type:'Action',label:'Review item',x:280,y:110},{id:3,type:'Decision',label:'Approved?',x:500,y:110},{id:4,type:'End',label:'Complete',x:720,y:110}];links=[[1,2],[2,3],[3,4]];next=4;active=2;connecting=false;zoom=1;draw()};
  draw();
}

function knowledgePortal(){
  const pages=[
    {id:'start',group:'Getting started',name:'Introduction',intro:'A flexible documentation system with structured navigation, helpful examples and fast section links.',sections:[['Overview','Introduce the project with a concise explanation and a clear entry point.'],['Quick start','Guide the reader through the minimum steps they need to begin.'],['Next steps','Link to a more detailed guide when they are ready.']]},
    {id:'install',group:'Getting started',name:'Installation',intro:'Explain supported environments and a straightforward setup process.',sections:[['Requirements','List prerequisites and versions.'],['Setup','Present copyable commands and clear instructions.'],['Troubleshooting','Provide advice for common setup issues.']]},
    {id:'concepts',group:'Guides',name:'Core concepts',intro:'Introduce the terminology and components used throughout the documentation.',sections:[['Components','Describe the main moving parts.'],['Structure','Show the relationship between different sections.'],['Examples','Include short, practical demonstrations.']]},
    {id:'reference',group:'Guides',name:'Reference',intro:'A structured reference with detailed definitions, parameters and expected results.',sections:[['Methods','Document the available methods.'],['Parameters','Explain the accepted values.'],['Responses','Provide example response structures.']]}
  ];
  let active='start',search='';
  ogxMount('Documentation portal','A reader-focused knowledge base with three coordinated navigation columns.',`<div class="ogx-doc-shell"><aside class="ogx-doc-nav"><label>Find documentation<input id="ogx-doc-search" type="search" placeholder="Search articles…"></label><div id="ogx-doc-menu"></div></aside><article id="ogx-doc-article" class="ogx-doc-article"></article><aside class="ogx-doc-toc"><strong>ON THIS PAGE</strong><div id="ogx-doc-toc-links"></div></aside></div>`,'knowledge');
  function render(){
    const filtered=pages.filter(p=>(p.name+' '+p.intro+' '+p.group).toLowerCase().includes(search));
    document.querySelector('#ogx-doc-menu').innerHTML=[...new Set(filtered.map(p=>p.group))].map(group=>`<section><strong>${group}</strong>${filtered.filter(p=>p.group===group).map(p=>`<button class="ogx-doc-link ${active===p.id?'active':''}" data-doc-id="${p.id}">${p.name}</button>`).join('')}</section>`).join('')||'<p>No matching articles.</p>';
    const page=pages.find(p=>p.id===active);document.querySelector('#ogx-doc-article').innerHTML=`<nav class="ogx-crumbs">Documentation / ${page.group} / ${page.name}</nav><h2>${page.name}</h2><p class="ogx-lede">${page.intro}</p><div class="ogx-doc-notice"><strong>TIP</strong><p>This is a reusable documentation interface. Replace these sample articles with your own content.</p></div>${page.sections.map(([heading,copy],i)=>`<section id="ogx-doc-section-${i}"><h3>${heading}</h3><p>${copy}</p>${i===1?'<pre><code>const example = "editable starter";</code></pre>':''}</section>`).join('')}<div class="ogx-doc-pager"><button class="btn" id="ogx-doc-previous">← Previous</button><button class="btn" id="ogx-doc-next">Next →</button></div>`;
    document.querySelector('#ogx-doc-toc-links').innerHTML=page.sections.map(([name],i)=>`<a href="#ogx-doc-section-${i}">${name}</a>`).join('');
    document.querySelectorAll('[data-doc-id]').forEach(b=>b.onclick=()=>{active=b.dataset.docId;render()});
    document.querySelector('#ogx-doc-previous').onclick=()=>{active=pages[(pages.findIndex(p=>p.id===active)-1+pages.length)%pages.length].id;render()};
    document.querySelector('#ogx-doc-next').onclick=()=>{active=pages[(pages.findIndex(p=>p.id===active)+1)%pages.length].id;render()};
  }
  document.querySelector('#ogx-doc-search').oninput=e=>{search=e.target.value.toLowerCase();render()};render();
}

function multiStepWizard(){
  const steps=['Details','Preferences','Confirmation'];let current=0,done=false;
  const state={name:'',email:'',project:'Website',notifications:true,note:''};
  ogxMount('Multi-step wizard','A guided input flow with conditional fields, progress tracking and a final review.',`<div class="ogx-wizard"><div class="ogx-wizard-progress" id="ogx-wizard-progress"></div><div class="ogx-wizard-card"><div id="ogx-wizard-fields"></div><p id="ogx-wizard-error" role="alert" class="ogx-error"></p><div class="ogx-toolrow"><button class="btn" id="ogx-wizard-back">Back</button><button class="btn primary" id="ogx-wizard-next">Continue</button></div></div></div>`,'wizard');
  function capture(){
    const name=document.querySelector('#ogx-wizard-name'),email=document.querySelector('#ogx-wizard-email'),project=document.querySelector('#ogx-wizard-project'),notifications=document.querySelector('#ogx-wizard-notify'),note=document.querySelector('#ogx-wizard-note');
    if(name)state.name=name.value;if(email)state.email=email.value;if(project)state.project=project.value;if(notifications)state.notifications=notifications.checked;if(note)state.note=note.value;
  }
  function draw(){
    document.querySelector('#ogx-wizard-progress').innerHTML=steps.map((step,i)=>`<div class="${i===current?'active':i<current?'complete':''}"><span>${i<current?'✓':i+1}</span><small>${step}</small></div>`).join('');
    const area=document.querySelector('#ogx-wizard-fields');
    if(done){area.innerHTML='<h2>Setup complete</h2><p>Your sample configuration is ready. Nothing has been submitted to a server.</p>';document.querySelector('#ogx-wizard-back').hidden=true;document.querySelector('#ogx-wizard-next').textContent='Start again';return}
    if(current===0)area.innerHTML=`<h2>Project details</h2><p>Enter a name and email to continue. This information is used only in this preview.</p><label>Your name<input id="ogx-wizard-name" required value="${ogxEscape(state.name)}"></label><label>Email<input id="ogx-wizard-email" type="email" value="${ogxEscape(state.email)}" placeholder="example@email.com"></label>`;
    if(current===1)area.innerHTML=`<h2>Choose your setup</h2><label>Project type<select id="ogx-wizard-project">${['Website','Dashboard','Documentation','Other'].map(v=>`<option ${v===state.project?'selected':''}>${v}</option>`).join('')}</select></label><label class="ogx-check"><input id="ogx-wizard-notify" type="checkbox" ${state.notifications?'checked':''}> Show local notification examples</label><label>Optional instructions<textarea id="ogx-wizard-note">${ogxEscape(state.note)}</textarea></label>`;
    if(current===2)area.innerHTML=`<h2>Review and confirm</h2><dl class="ogx-review"><dt>Name</dt><dd>${ogxEscape(state.name)}</dd><dt>Email</dt><dd>${ogxEscape(state.email)}</dd><dt>Project</dt><dd>${ogxEscape(state.project)}</dd><dt>Notifications</dt><dd>${state.notifications?'Enabled':'Disabled'}</dd><dt>Notes</dt><dd>${ogxEscape(state.note||'Not provided')}</dd></dl><p>All choices remain inside this browser preview.</p>`;
    document.querySelector('#ogx-wizard-back').hidden=current===0;
    document.querySelector('#ogx-wizard-next').textContent=current===2?'Finish':'Continue';
    document.querySelector('#ogx-wizard-error').textContent='';
  }
  document.querySelector('#ogx-wizard-back').onclick=()=>{capture();current=Math.max(0,current-1);draw()};
  document.querySelector('#ogx-wizard-next').onclick=()=>{if(done){done=false;current=0;state.name='';state.email='';state.note='';draw();return}capture();if(current===0&&(!state.name.trim()||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email))){document.querySelector('#ogx-wizard-error').textContent='Please enter a name and valid email address.';return}if(current===2)done=true;else current++;draw()};draw();
}

function mapResultsExplorer(){
  const places=[{id:1,name:'Riverside Gallery',category:'Culture',x:27,y:38,note:'Exhibitions and public spaces'},{id:2,name:'Northern Garden',category:'Nature',x:55,y:23,note:'Green paths and seating'},{id:3,name:'Harbor Square',category:'Culture',x:72,y:62,note:'Public square and gathering point'},{id:4,name:'Market Hall',category:'Food',x:42,y:65,note:'Local shops and dining'},{id:5,name:'West Park',category:'Nature',x:19,y:73,note:'Outdoor recreation'},{id:6,name:'Station Café',category:'Food',x:64,y:40,note:'Coffee and casual meals'}];
  let active=1,cat='All',query='',zoom=1,showMap=true;
  const schematic=`<svg viewBox="0 0 720 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="720" height="460" fill="var(--surface)"/><path d="M0 0H720V460H0Z" fill="var(--soft)"/><path d="M0 150 Q280 240 720 110" stroke="var(--bg)" stroke-width="38" fill="none"/><path d="M80 0Q230 180 200 460" stroke="var(--bg)" stroke-width="28" fill="none"/><path d="M450 0Q400 180 620 460" stroke="var(--bg)" stroke-width="20" fill="none"/><path d="M0 300Q250 250 720 350" stroke="var(--bg)" stroke-width="26" fill="none"/><path d="M0 400Q310 350 720 200" stroke="#87b5ce" stroke-width="47" fill="none" opacity=".65"/><rect x="235" y="40" width="130" height="80" rx="20" fill="#91c69b" opacity=".65"/><rect x="460" y="290" width="150" height="95" rx="24" fill="#91c69b" opacity=".65"/></svg>`;
  ogxMount('Map & results explorer','Discover places through a linked location map, filterable results and a detail inspector.',`<div class="ogx-map-layout"><aside class="ogx-map-results"><label>Find a place<input id="ogx-map-search" type="search" placeholder="Search places…"></label><label>Category<select id="ogx-map-category"><option>All</option><option>Nature</option><option>Culture</option><option>Food</option></select></label><div id="ogx-map-list"></div></aside><section class="ogx-main"><div class="ogx-toolrow"><strong>Sample city map</strong><div class="ogx-segment"><button class="btn" id="ogx-map-toggle">List view</button><button class="btn" id="ogx-map-minus">−</button><button class="btn" id="ogx-map-plus">+</button></div></div><div class="ogx-map-surface" id="ogx-map-surface"><div id="ogx-map-layer">${schematic}<div id="ogx-map-pins"></div></div></div><p class="ogx-help">Illustrative map with sample points; no external map service is connected.</p></section><aside class="ogx-inspector"><h2>Place details</h2><div id="ogx-map-detail"></div></aside></div>`,'map');
  function render(){
    const filtered=places.filter(p=>(cat==='All'||p.category===cat)&&p.name.toLowerCase().includes(query));
    if(!filtered.some(p=>p.id===active))active=filtered[0]?.id??null;
    document.querySelector('#ogx-map-list').innerHTML=filtered.map(p=>`<button class="ogx-map-result ${p.id===active?'active':''}" data-map-place="${p.id}"><small>${p.category}</small><strong>${p.name}</strong><span>${p.note}</span></button>`).join('')||'<p>No matching places.</p>';
    document.querySelector('#ogx-map-pins').innerHTML=filtered.map(p=>`<button class="ogx-map-pin ${p.id===active?'selected':''}" data-map-place="${p.id}" style="left:${p.x}%;top:${p.y}%" aria-label="${p.name}">${p.id}</button>`).join('');
    document.querySelector('#ogx-map-layer').style.transform=`scale(${zoom})`;
    document.querySelector('#ogx-map-surface').classList.toggle('list-only',!showMap);
    document.querySelector('#ogx-map-toggle').textContent=showMap?'List view':'Map view';
    const p=places.find(p=>p.id===active);
    document.querySelector('#ogx-map-detail').innerHTML=p?`<div class="ogx-detail-art">⌖</div><h3>${p.name}</h3><span class="ogx-chip">${p.category}</span><p>${p.note}</p><p class="ogx-help">Illustrative coordinates: ${p.x}, ${p.y}</p>`:'<p>Select a result.</p>';
    document.querySelectorAll('[data-map-place]').forEach(b=>b.onclick=()=>{active=Number(b.dataset.mapPlace);render()});
  }
  document.querySelector('#ogx-map-search').oninput=e=>{query=e.target.value.toLowerCase();render()};
  document.querySelector('#ogx-map-category').onchange=e=>{cat=e.target.value;render()};
  document.querySelector('#ogx-map-toggle').onclick=()=>{showMap=!showMap;render()};
  document.querySelector('#ogx-map-minus').onclick=()=>{zoom=Math.max(.8,zoom-.2);render()};
  document.querySelector('#ogx-map-plus').onclick=()=>{zoom=Math.min(2,zoom+.2);render()};render();
}
Object.assign(collectionRenderers,{storyboardPlanner,visualWorkflow,knowledgePortal,multiStepWizard,mapResultsExplorer});
