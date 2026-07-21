/* Jesus, Maria e Você — interface e navegação */
(function(){
  'use strict';

  const TIPOS = {
    palavra:{lbl:'A Palavra',g:'📖',c:'var(--gold-deep)'},
    evangelho:{lbl:'Evangelho',g:'✝',c:'var(--marian)'},
    santo:{lbl:'Testemunho dos Santos',g:'✧',c:'var(--gold-deep)'},
    maria:{lbl:'Com Maria',g:'🌹',c:'var(--rose)'},
    sacramento:{lbl:'Vida Sacramental',g:'✚',c:'var(--marian)'},
    oracao:{lbl:'Escola de Oração',g:'✦',c:'var(--marian)'},
    reflexao:{lbl:'Reflexão',g:'❖',c:'var(--sepia)'},
    vivencia:{lbl:'Vivência',g:'❀',c:'var(--sepia)'},
    descanso:{lbl:'Dia do Senhor',g:'☀',c:'var(--gold-deep)'},
    sintese:{lbl:'Síntese',g:'◈',c:'var(--gold-deep)'},
    envio:{lbl:'Envio',g:'➤',c:'var(--gold-deep)'},
    bissexto:{lbl:'Dia Extra',g:'✵',c:'var(--gold-deep)'}
  };

  const MESES=window.MESES;
  const DIAS=window.DIAS;
  const L=window.JMV_LITURGIA;
  if(!MESES || !DIAS || !L){
    document.body.innerHTML='<p style="padding:2rem;font-family:system-ui">Não foi possível carregar o conteúdo do devocional.</p>';
    return;
  }

  const $=s=>document.querySelector(s);
  const reader=$('#reader');
  const monthNav=$('#monthNav');
  const dayStrip=$('#dayStrip');
  const dailyGuide=$('#dailyGuide');
  const mesesComDados=[...new Set(DIAS.map(d=>d.m))].sort((a,b)=>a-b);
  const anoAtual=new Date().getFullYear();
  let anoMariano=anoAtual;
  let mesAtivo=mesesComDados[0];
  let idx=0;

  const READKEY='jmv_read';
  const LASTKEY='jmv_last';
  const THEMEKEY='jmv_theme';
  let lidos;
  try{lidos=new Set(JSON.parse(localStorage.getItem(READKEY)||'[]'));}catch(_){lidos=new Set();}

  function esc(value){
    return String(value==null?'':value)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }
  function nl2p(value){
    return String(value||'').split(/\n\s*\n/).map(p=>'<p>'+esc(p).replace(/\n/g,'<br>')+'</p>').join('');
  }
  function keyOf(day){return day.m+'-'+day.d;}
  function dataCurta(m,d){return String(d).padStart(2,'0')+'/'+String(m).padStart(2,'0');}
  function nomeMes(m){return MESES[m] ? MESES[m].nome : String(m);}

  $('#totalMeta').textContent=DIAS.length+' meditações';
  $('#footNote').textContent='Um ano completo de meditações, santos, devoções e oração — Janeiro a Dezembro.';

  function buildMonthNav(){
    monthNav.innerHTML='';
    mesesComDados.forEach(m=>{
      const b=document.createElement('button');
      b.className='mtab';
      b.textContent=MESES[m].nome;
      b.setAttribute('role','tab');
      b.setAttribute('aria-selected',String(m===mesAtivo));
      b.onclick=()=>{const first=DIAS.findIndex(d=>d.m===m);go(first);};
      monthNav.appendChild(b);
    });
    const cur=monthNav.querySelector('[aria-selected="true"]');
    if(cur) cur.scrollIntoView({inline:'center',block:'nearest'});
  }

  function buildDayStrip(){
    const info=MESES[mesAtivo];
    const dev=L.DEVOCOES_MENSAIS[mesAtivo];
    $('#monthTheme').innerHTML=esc(info.tema)+' <span>· Devoção: '+esc(dev.nome)+'</span>';
    const daysThis=DIAS.filter(d=>d.m===mesAtivo);
    $('#monthCount').textContent=daysThis.length+' dias';
    dayStrip.innerHTML='';
    daysThis.forEach(day=>{
      const gi=DIAS.indexOf(day);
      const mariana=L.dataMariana(day.m,day.d,anoMariano);
      const c=document.createElement('button');
      c.className='daychip'+(lidos.has(keyOf(day))?' read':'')+(mariana?' marian-day':'');
      c.setAttribute('aria-current',String(gi===idx));
      const t=TIPOS[day.tipo]||TIPOS.palavra;
      c.innerHTML='<span class="n">'+day.d+'</span><span class="g">'+(mariana?'🌹':t.g)+'</span>';
      c.title=(mariana?mariana.nome+' · ':'')+day.tit;
      c.onclick=()=>go(gi);
      dayStrip.appendChild(c);
    });
  }

  function renderDailyGuide(day){
    const santo=L.santoDoDia(day.m,day.d);
    const mariana=L.dataMariana(day.m,day.d,anoMariano);
    const dev=L.DEVOCOES_MENSAIS[day.m];
    dailyGuide.innerHTML=
      '<div class="guide-head"><div><span class="mini-kicker">Calendário espiritual</span><h2>'+esc(nomeMes(day.m))+' '+day.d+'</h2></div><span class="year-ref">Referência '+anoMariano+'</span></div>'+
      '<div class="guide-grid'+(mariana?' has-marian':'')+'">'+
        '<article class="guide-card saint-card"><div class="guide-icon">✧</div><div><span>Santo ou celebração do dia</span><h3>'+esc(santo)+'</h3><p>Testemunho para inspirar a caminhada cristã neste dia.</p></div></article>'+
        '<article class="guide-card devotion-card"><div class="guide-icon">'+esc(dev.simbolo)+'</div><div><span>Devoção do mês</span><h3>'+esc(dev.nome)+'</h3><p>'+esc(dev.pratica)+'</p></div></article>'+
        (mariana?'<article class="guide-card marian-card"><div class="guide-icon">🌹</div><div><span>Data mariana</span><h3>'+esc(mariana.nome)+'</h3><p>'+esc(mariana.grau)+'</p></div></article>':'')+
      '</div>'+
      '<p class="calendar-note">Referência devocional. Celebrações próprias podem variar conforme o calendário litúrgico do ano, da diocese, da paróquia ou da família religiosa.</p>';
  }

  function render(){
    const day=DIAS[idx];
    const info=MESES[day.m];
    const t=TIPOS[day.tipo]||TIPOS.palavra;
    mesAtivo=day.m;
    const verseBlock=day.ref?(
      '<div class="verse'+(day.txt?'':' ref-only')+'">'+
      (day.txt?'<div class="vt">“'+esc(day.txt)+'”</div>':'')+
      '<div class="vr">'+esc(day.ref)+'</div></div>'):'';

    reader.innerHTML=
      '<div class="r-eyebrow"><span class="badge" style="color:'+t.c+';border-color:'+t.c+'">'+t.g+' '+t.lbl+'</span></div>'+
      '<div class="r-week">'+esc(info.nome)+(day.st?' · '+esc(day.st):'')+'</div>'+
      '<h1 class="r-title">'+esc(day.tit)+'</h1>'+verseBlock+
      '<div class="prose"><p>'+esc(day.med)+'</p></div>'+
      '<div class="section-block"><div class="sb-label">❖ Para viver hoje</div><p>'+esc(day.pra)+'</p></div>'+
      '<div class="section-block prayer"><div class="sb-label">✦ Oração</div><p>'+esc(day.ora)+'</p></div>'+
      '<div class="anchor"><div class="al">Frase-âncora do mês</div><div class="aq">“'+esc(info.ancora)+'”</div></div>';

    renderDailyGuide(day);
    const prev=DIAS[idx-1],next=DIAS[idx+1];
    $('#prevBtn').disabled=!prev;$('#nextBtn').disabled=!next;
    $('#prevLbl').textContent=prev?(MESES[prev.m].nome+' '+prev.d):'—';
    $('#nextLbl').textContent=next?(MESES[next.m].nome+' '+next.d):'—';

    lidos.add(keyOf(day));
    try{
      localStorage.setItem(READKEY,JSON.stringify([...lidos]));
      localStorage.setItem(LASTKEY,String(idx));
    }catch(_){}
    buildMonthNav();
    buildDayStrip();
  }

  function countDay(day){
    let attempts=0;
    (function tryCount(){
      if(window.goatcounter && typeof window.goatcounter.count==='function'){
        window.goatcounter.count({path:'/dia/'+day.m+'-'+day.d,title:day.tit});
      }else if(attempts++<25){setTimeout(tryCount,180);}
    })();
  }

  function go(i,scroll=true,count=true){
    idx=Math.max(0,Math.min(DIAS.length-1,Number(i)||0));
    render();
    if(count) countDay(DIAS[idx]);
    if(scroll) dailyGuide.scrollIntoView({behavior:'smooth',block:'start'});
  }
  window.go=go;

  $('#prevBtn').onclick=()=>go(idx-1);
  $('#nextBtn').onclick=()=>go(idx+1);

  function toast(msg){
    const t=$('#toast');t.textContent=msg;t.classList.add('show');
    clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2600);
  }

  function indiceDeHoje(){
    const now=new Date(),m=now.getMonth()+1,d=now.getDate();
    let i=DIAS.findIndex(x=>x.m===m&&x.d===d);
    if(i<0)i=DIAS.findIndex(x=>x.m===m);
    return i<0?0:i;
  }
  window.indiceDeHoje=indiceDeHoje;

  $('#todayBtn').onclick=()=>{go(indiceDeHoje());toast('Meditação e calendário espiritual de hoje 🌹');};
  $('#prayersBtn').onclick=()=>$('#oracoes').scrollIntoView({behavior:'smooth'});
  $('#devotionsBtn').onclick=()=>$('#devocoes').scrollIntoView({behavior:'smooth'});

  function applyTheme(theme){
    document.documentElement.setAttribute('data-theme',theme);
    $('#themeBtn').setAttribute('aria-label',theme==='dark'?'Usar tema claro':'Usar tema escuro');
    try{localStorage.setItem(THEMEKEY,theme);}catch(_){}
  }
  let storedTheme=null;
  try{storedTheme=localStorage.getItem(THEMEKEY);}catch(_){}
  if(storedTheme==='light'||storedTheme==='dark')applyTheme(storedTheme);
  $('#themeBtn').onclick=()=>{
    const cur=document.documentElement.getAttribute('data-theme')||
      (matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
    applyTheme(cur==='dark'?'light':'dark');
  };

  function buildPrayers(){
    $('#prayerGrid').innerHTML=L.ORACOES.map((o,i)=>
      '<details class="prayer-card"'+(i===0?' open':'')+' id="'+esc(o.id)+'">'+
        '<summary><span><b>'+esc(o.titulo)+'</b><small>'+esc(o.subtitulo)+'</small></span><span class="expand" aria-hidden="true">＋</span></summary>'+
        '<div class="prayer-body">'+nl2p(o.texto)+'<button class="copy-btn" type="button" data-prayer="'+esc(o.id)+'">Copiar oração</button></div>'+
      '</details>').join('');
  }

  function buildDevotions(){
    $('#devotionGrid').innerHTML=Object.keys(L.DEVOCOES_MENSAIS).map(Number).sort((a,b)=>a-b).map(m=>{
      const d=L.DEVOCOES_MENSAIS[m];
      return '<article class="devotion-month'+(m===new Date().getMonth()+1?' current':'')+'">'+
        '<div class="devotion-symbol">'+esc(d.simbolo)+'</div><div><span>'+esc(nomeMes(m))+'</span><h3>'+esc(d.nome)+'</h3><p>'+esc(d.pratica)+'</p></div></article>';
    }).join('');
  }

  function buildYearOptions(){
    const select=$('#marianYear');
    let html='';
    for(let y=anoAtual-2;y<=anoAtual+6;y++)html+='<option value="'+y+'"'+(y===anoMariano?' selected':'')+'>'+y+'</option>';
    select.innerHTML=html;
    select.onchange=()=>{
      anoMariano=Number(select.value)||anoAtual;
      renderMarianCalendar();
      renderDailyGuide(DIAS[idx]);
      buildDayStrip();
    };
  }

  function renderMarianCalendar(){
    const items=L.datasMarianas(anoMariano);
    $('#marianCalendar').innerHTML=items.map(x=>
      '<article class="marian-date"><time datetime="'+anoMariano+'-'+String(x.m).padStart(2,'0')+'-'+String(x.d).padStart(2,'0')+'">'+dataCurta(x.m,x.d)+'</time>'+
      '<div><h3>'+esc(x.nome)+'</h3><p>'+esc(x.grau)+'</p></div></article>').join('');
    $('#marianYearLabel').textContent=String(anoMariano);
  }

  async function copyPrayer(id){
    const prayer=L.ORACOES.find(o=>o.id===id);
    if(!prayer)return;
    const text=prayer.titulo+'\n\n'+prayer.texto;
    try{
      if(navigator.clipboard && window.isSecureContext)await navigator.clipboard.writeText(text);
      else{
        const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';
        document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();
      }
      toast('Oração copiada.');
    }catch(_){toast('Não foi possível copiar automaticamente.');}
  }

  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-prayer]');
    if(b)copyPrayer(b.getAttribute('data-prayer'));
  });
  document.addEventListener('keydown',e=>{
    if(['INPUT','SELECT','TEXTAREA','BUTTON','SUMMARY'].includes(e.target.tagName))return;
    if(e.key==='ArrowRight')go(idx+1);
    if(e.key==='ArrowLeft')go(idx-1);
  });

  function setupVisitCounter(){
    const box=$('#visitBox');if(!box)return;
    let seen=null;try{seen=sessionStorage.getItem('jmv_visit');}catch(_){}
    const url='https://abacus.jasoncameron.dev/'+(seen?'get':'hit')+'/jesusmariaevoce-com-br/visitas';
    fetch(url).then(r=>r.json()).then(d=>{
      try{if(!seen)sessionStorage.setItem('jmv_visit','1');}catch(_){}
      if(d&&typeof d.value==='number'){
        box.innerHTML='🌹 <b>'+d.value.toLocaleString('pt-BR')+'</b> '+(d.value===1?'visita':'visitas');
        box.hidden=false;
      }
    }).catch(()=>{});
  }

  buildPrayers();
  buildDevotions();
  buildYearOptions();
  renderMarianCalendar();
  setupVisitCounter();
  go(indiceDeHoje(),false,true);

  if('serviceWorker' in navigator){
    addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
  }
})();
