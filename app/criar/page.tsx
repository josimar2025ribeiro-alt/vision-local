// @ts-nocheck
"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

const TEMAS=[
{ name:"Neon", btn:"#00FF88", bg:"#050505", b1:"#00FF88", b2:"#0066FF", txt:"#FFF" },
{ name:"Rosa", btn:"#FF006B", bg:"#0A0014", b1:"#FF006B", b2:"#8A2BE2", txt:"#FFF" },
{ name:"Ocean", btn:"#00D4FF", bg:"#00111A", b1:"#00D4FF", b2:"#0066FF", txt:"#FFF" },
{ name:"Gold", btn:"#FFD700", bg:"#1A1400", b1:"#FFD700", b2:"#FF6B00", txt:"#FFF" },
{ name:"Branco", btn:"#000", bg:"#FFF", b1:"#DDD", b2:"#FFF", txt:"#000" },
{ name:"Red", btn:"#FF1A1A", bg:"#1A0000", b1:"#FF1A1A", b2:"#FF6B00", txt:"#FFF" },
]

const CAPAS=[
{ id:"full", nome:"Capa Full", desc:"Tela toda" },
{ id:"quadrada", nome:"Quadrada", desc:"1:1 quadrada" },
{ id:"redonda", nome:"Redonda", desc:"Círculo" },
{ id:"banner", nome:"Banner", desc:"Faixa fina" },
{ id:"separada", nome:"Separada", desc:"Card separado" },
{ id:"sem", nome:"Sem Capa", desc:"Só cor" },
]

const LOGO_POS=[
{ id:"centro", nome:"Centro Topo" },
{ id:"esquerda", nome:"Esquerda" },
{ id:"direita", nome:"Direita" },
{ id:"centro-capa", nome:"Dentro da Capa" },
{ id:"flut-esq", nome:"Flutuante Esq" },
{ id:"flut-dir", nome:"Flutuante Dir" },
]

const LAYOUTS=[
{ id:1, nome:"Clássico", desc:"Botões grandes centralizados" },
{ id:2, nome:"Moderno Glass", desc:"Vidro + blur" },
{ id:3, nome:"Minimal", desc:"Limpo e fino" },
{ id:4, nome:"Cards", desc:"Tudo em cards" },
{ id:5, nome:"Neon Futuro", desc:"Bordas neon brilhando" },
{ id:6, nome:"Magazine", desc:"Grade tipo revista" },
]

export default function Criar(){
const [f,setF]=useState({title:"",slug:"",wpp:"",insta:"",pix:"",pixValor:"",wifi_ssid:"",wifi:"",loc:"",logo:"",foto:"",capaTitulo:"",capaDesc:"",corTitulo:"#FFFFFF",corDesc:"#AAAAAA",capaEstilo:"full",logoPos:"centro",layoutTipo:1})
const [servicos,setServicos]=useState([{url:"",nome:"",preco:"",desc:"",type:"image"}])
const [catalogo,setCatalogo]=useState([{url:"",nome:"",preco:"",desc:"",type:"image"}])
const [cols,setCols]=useState([{url:"",desc:"",type:"image"}])
const [temaIdx,setTemaIdx]=useState(0)
const [up,setUp]=useState("")
const t=TEMAS[temaIdx]

async function upload(file,pasta){setUp("Enviando...");const nome=pasta+"/"+Date.now()+"-"+file.name;const r=await supabase.storage.from("midias").upload(nome,file);setUp("");if(r.error){alert(r.error.message);return null}return {url:supabase.storage.from("midias").getPublicUrl(nome).data.publicUrl,type:file.type.startsWith('video')?'video':'image'}}

async function salvar(){
const slugFinal=f.slug.toLowerCase().replace(/[^a-z0-9-]+/g,"-").replace(/--+/g,"-").trim()
if(!f.title||!slugFinal){alert("Nome e slug!");return}
setUp("Salvando...")
const {error}=await supabase.from("biosites").upsert([{
title:f.title,slug:slugFinal,whatsapp:f.wpp,instagram:f.insta,
servicos:servicos.map(s=>s.nome).join(', '),catalogo:catalogo.map(c=>c.nome).join(', '),
pix_key:f.pix,pix_qr_valor:f.pixValor,wifi_ssid:f.wifi_ssid,wifi_password:f.wifi,localizacao:f.loc,
logo_url:f.logo,foto_url:f.foto,capa_titulo:f.capaTitulo,capa_desc:f.capaDesc,
cor_titulo:f.corTitulo,cor_desc:f.corDesc,tema_idx:temaIdx,
colunas:cols,servicos_json:servicos,catalogo_json:catalogo,
capa_estilo:f.capaEstilo,logo_pos:f.logoPos,layout_tipo:f.layoutTipo
}],{onConflict:'slug'})
setUp("");if(error){alert(error.message);return}location.href="/"+slugFinal
}

const inp={padding:'12px',background:'#111',border:'1px solid #333',borderRadius:'10px',color:'white',width:'100%',marginBottom:'6px',fontSize:'13px'} as any
const isVideo=f.foto&&(f.foto.includes('.mp4')||f.foto.includes('webm'))
const pixQr=f.pix?`https://quickchart.io/qr?text=${encodeURIComponent(f.pix)}&size=250`:null
const wifiQr=f.wifi_ssid&&f.wifi?`https://quickchart.io/qr?text=${encodeURIComponent(`WIFI:T:WPA;S:${f.wifi_ssid};P:${f.wifi};;`)}&size=250`:null

// FUNÇÃO QUE RENDERIZA CAPA DE ACORDO COM ESTILO
function renderCapa(){
if(f.capaEstilo==='sem') return <div style={{height:'80px',background:`linear-gradient(135deg,${t.b1},${t.b2})`}}/>
if(f.capaEstilo==='quadrada') return <div style={{height:'320px',background:f.foto?`url(${f.foto}) center/cover`:`linear-gradient(135deg,${t.b1},${t.b2})`,borderRadius:'24px',margin:'12px'}}/>
if(f.capaEstilo==='redonda') return <div style={{width:'200px',height:'200px',background:f.foto?`url(${f.foto}) center/cover`:`linear-gradient(135deg,${t.b1},${t.b2})`,borderRadius:'50%',margin:'12px auto'}}/>
if(f.capaEstilo==='banner') return <div style={{height:'100px',background:f.foto?`url(${f.foto}) center/cover`:`linear-gradient(90deg,${t.b1},${t.b2})`}}/>
if(f.capaEstilo==='separada') return <div style={{height:'180px',background:f.foto?`url(${f.foto}) center/cover`:`linear-gradient(135deg,${t.b1},${t.b2})`,borderRadius:'20px',margin:'12px',border:`2px solid ${t.btn}`}}/>
return <div style={{height:'260px',background:f.foto?`url(${f.foto}) center/cover`:`linear-gradient(135deg,${t.b1},${t.b2})`}}/>
}

function renderLogo(){
const base={width:'86px',height:'86px',borderRadius:'50%',background:'white',objectFit:'cover',border:`3px solid ${t.bg}`,display:'block'} as any
if(f.logoPos==='esquerda') return <img src={f.logo} style={{...base,margin:'-40px 0 0 20px'}}/>
if(f.logoPos==='direita') return <img src={f.logo} style={{...base,margin:'-40px 20px 0 auto'}}/>
if(f.logoPos==='centro-capa') return <img src={f.logo} style={{...base,position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',zIndex:5}}/>
if(f.logoPos==='flut-esq') return <img src={f.logo} style={{...base,position:'absolute',top:'20px',left:'16px',zIndex:5}}/>
if(f.logoPos==='flut-dir') return <img src={f.logo} style={{...base,position:'absolute',top:'20px',right:'16px',zIndex:5}}/>
return <img src={f.logo} style={{...base,margin:'-44px auto 0'}}/>
}

return(
<div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
<div style={{width:'52%',padding:'14px',overflowY:'auto',height:'100vh',borderRight:'1px solid #222'}}>
<h2 style={{fontSize:'10px',opacity:0.6,letterSpacing:'1px'}}>6 LAYOUTS - ESCOLHA A APARÊNCIA</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'6px',margin:'8px 0'}}>
{LAYOUTS.map(l=><button key={l.id} onClick={()=>setF({...f,layoutTipo:l.id})} style={{padding:'10px',borderRadius:'12px',background:f.layoutTipo===l.id?t.btn:'#1A1A1A',color:f.layoutTipo===l.id?'black':'white',border:`2px solid ${f.layoutTipo===l.id?t.btn:'#333'}`,textAlign:'left'}}><div style={{fontWeight:900,fontSize:'11px'}}>{l.nome}</div><div style={{fontSize:'8px',opacity:0.7}}>{l.desc}</div></button>)}
</div>

<h2 style={{fontSize:'10px',opacity:0.6,marginTop:'12px'}}>ESTILO DA CAPA</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'6px',margin:'6px 0'}}>
{CAPAS.map(c=><button key={c.id} onClick={()=>setF({...f,capaEstilo:c.id})} style={{padding:'8px',borderRadius:'10px',background:f.capaEstilo===c.id?t.btn:'#222',color:f.capaEstilo===c.id?'black':'white',border:'1px solid #444',fontSize:'10px',fontWeight:700}}>{c.nome}</button>)}
</div>

<h2 style={{fontSize:'10px',opacity:0.6,marginTop:'10px'}}>POSIÇÃO DA LOGO</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'6px',margin:'6px 0'}}>
{LOGO_POS.map(p=><button key={p.id} onClick={()=>setF({...f,logoPos:p.id})} style={{padding:'8px',borderRadius:'10px',background:f.logoPos===p.id?t.btn:'#222',color:f.logoPos===p.id?'black':'white',border:'1px solid #444',fontSize:'10px',fontWeight:700}}>{p.nome}</button>)}
</div>

<h2 style={{fontSize:'10px',opacity:0.6,marginTop:'12px'}}>12 CORES VIVAS</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'6px',margin:'6px 0'}}>{TEMAS.map((tm,i)=><button key={i} onClick={()=>setTemaIdx(i)} style={{height:'36px',borderRadius:'10px',background:tm.bg,border:temaIdx===i?'2px solid white':'1px solid #333'}}><div style={{height:'100%',background:`linear-gradient(135deg,${tm.b1},${tm.b2})`,borderRadius:'6px'}}/></button>)}</div>

<div style={{display:'flex',gap:'6px',margin:'8px 0'}}><div style={{flex:1}}><label style={{fontSize:'8px'}}>COR TITULO</label><input type="color" value={f.corTitulo} onChange={e=>setF({...f,corTitulo:e.target.value})} style={{width:'100%',height:'30px'}}/></div><div style={{flex:1}}><label style={{fontSize:'8px'}}>COR DESC</label><input type="color" value={f.corDesc} onChange={e=>setF({...f,corDesc:e.target.value})} style={{width:'100%',height:'30px'}}/></div></div>

{up&&<div style={{background:t.btn,color:'black',padding:'8px',borderRadius:'8px',fontWeight:900}}>{up}</div>}

<input style={inp} placeholder="Nome * RTR" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/>
<input style={inp} placeholder="Slug * pizzaria-holambra" value={f.slug} onChange={e=>setF({...f,slug:e.target.value})}/>
<div style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',marginBottom:'6px',border:'1px dashed #555'}}><b style={{fontSize:'9px'}}>LOGO</b><input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"logos");if(u)setF({...f,logo:u.url})}}}/></div>
<div style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',marginBottom:'8px',border:'1px dashed #555'}}><b style={{fontSize:'9px'}}>CAPA VIDEO/FOTO</b><input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"capas");if(u)setF({...f,foto:u.url})}}}/><input style={{...inp,marginTop:'6px'}} placeholder="Titulo capa" value={f.capaTitulo} onChange={e=>setF({...f,capaTitulo:e.target.value})}/><input style={inp} placeholder="Descricao" value={f.capaDesc} onChange={e=>setF({...f,capaDesc:e.target.value})}/></div>

<div style={{background:'#111',padding:'8px',borderRadius:'12px',marginBottom:'8px',border:'1px solid #333'}}>
<div style={{display:'flex',justifyContent:'space-between'}}><b style={{fontSize:'10px'}}>SERVICOS + FOTO</b><button onClick={()=>setServicos([...servicos,{url:"",nome:"",preco:"",desc:"",type:"image"}])} style={{background:t.btn,border:'none',borderRadius:'6px',padding:'4px 8px',fontWeight:900}}>+</button></div>
{servicos.map((s,i)=><div key={i} style={{background:'#1A1A1A',padding:'6px',borderRadius:'8px',marginTop:'6px'}}><input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"servicos");const n=[...servicos];n[i]={...n[i],url:u.url,type:u.type};setServicos(n)}}}/><input style={{...inp,marginTop:'4px'}} placeholder="Nome" value={s.nome} onChange={e=>{const n=[...servicos];n[i].nome=e.target.value;setServicos(n)}}/><div style={{display:'flex',gap:'4px'}}><input style={{...inp,flex:1}} placeholder="Preco" value={s.preco} onChange={e=>{const n=[...servicos];n[i].preco=e.target.value;setServicos(n)}}/><input style={{...inp,flex:2}} placeholder="Desc" value={s.desc} onChange={e=>{const n=[...servicos];n[i].desc=e.target.value;setServicos(n)}}/></div></div>)}
</div>

<input style={inp} placeholder="WhatsApp" value={f.wpp} onChange={e=>setF({...f,wpp:e.target.value})}/>
<input style={inp} placeholder="Instagram" value={f.insta} onChange={e=>setF({...f,insta:e.target.value})}/>
<div style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',marginBottom:'6px',border:'1px dashed #32BCAD'}}><b style={{fontSize:'9px'}}>PIX QR</b><input style={inp} placeholder="Chave Pix" value={f.pix} onChange={e=>setF({...f,pix:e.target.value})}/>{pixQr&&<img src={pixQr} style={{width:'120px',height:'120px',margin:'6px auto',display:'block',background:'white',padding:'6px',borderRadius:'8px'}}/>}</div>
<div style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',marginBottom:'6px',border:'1px dashed #FF9500'}}><b style={{fontSize:'9px'}}>WIFI QR - CIMA QR BAIXO SENHA</b><input style={inp} placeholder="Nome rede" value={f.wifi_ssid} onChange={e=>setF({...f,wifi_ssid:e.target.value})}/><input style={inp} placeholder="Senha" value={f.wifi} onChange={e=>setF({...f,wifi:e.target.value})}/>{wifiQr&&<img src={wifiQr} style={{width:'120px',height:'120px',margin:'6px auto',display:'block',background:'white',padding:'6px',borderRadius:'8px'}}/>}</div>
<input style={inp} placeholder="Maps link" value={f.loc} onChange={e=>setF({...f,loc:e.target.value})}/>

<button onClick={salvar} style={{background:t.btn,padding:'16px',width:'100%',border:'none',borderRadius:'12px',fontWeight:900,color:t.bg==='#FFF'?'black':'white',marginTop:'8px'}}>SALVAR LOJA</button>
</div>

<div style={{width:'48%',background:t.bg,display:'flex',justifyContent:'center',padding:'12px',overflowY:'auto',height:'100vh'}}>
<div style={{width:'360px'}}>
<div style={{
background: f.layoutTipo===2?'rgba(20,20,20,0.85)': f.layoutTipo===3?'white': f.layoutTipo===4?'#111': f.layoutTipo===5?`linear-gradient(135deg,#000,${t.b1}40)` : '#1A1A1A',
backdropFilter: f.layoutTipo===2?'blur(20px)':'none',
borderRadius: f.layoutTipo===3?'12px': f.layoutTipo===4?'16px': f.layoutTipo===6?'8px':'28px',
overflow:'hidden',
border: f.layoutTipo===5?`2px solid ${t.btn}`: f.layoutTipo===3?'1px solid #EEE':'1px solid rgba(255,255,255,0.1)',
boxShadow: f.layoutTipo===5?`0 0 30px ${t.btn}60`: f.layoutTipo===2?`0 20px 50px ${t.b1}40`:'none'
}}>
<div style={{position:'relative'}}>
{renderCapa()}
{f.logo&&renderLogo()}
</div>
<div style={{padding:'16px',textAlign: f.layoutTipo===6?'left':'center',marginTop: f.logoPos==='centro'||f.logoPos==='esquerda'||f.logoPos==='direita'? '-20px':'10px'}}>
<h1 style={{color:f.layoutTipo===3?'black':f.corTitulo,fontWeight:900,fontSize: f.layoutTipo===3?'22px':'26px'}}>{f.title||'RTR'}</h1>
{f.capaTitulo&&<div style={{color:t.btn,fontWeight:700,fontSize:'13px'}}>{f.capaTitulo}</div>}
{f.capaDesc&&<div style={{color:f.layoutTipo===3?'#666':f.corDesc,fontSize:'12px'}}>{f.capaDesc}</div>}

<div style={{
display: f.layoutTipo===6?'grid':'flex',
gridTemplateColumns: f.layoutTipo===6?'1fr 1fr':'',
flexDirection:'column',
gap:'12px',marginTop:'16px'
}}>
{f.wpp&&<div style={{background: f.layoutTipo===3?'black':'#25D366',padding: f.layoutTipo===3?'14px':'18px',borderRadius: f.layoutTipo===3?'8px':'18px',color:'white',fontWeight:900}}>WhatsApp</div>}
{f.insta&&<div style={{background: f.layoutTipo===4?'#222':'linear-gradient(45deg,#f09433,#bc1888)',padding:'16px',borderRadius:'14px',color:'white',fontWeight:900}}>{f.insta}</div>}
{pixQr&&<div style={{background:'white',padding:'12px',borderRadius:'16px'}}><img src={pixQr} style={{width:'140px',height:'140px',margin:'0 auto',display:'block'}}/><div style={{color:'black',fontSize:'10px',marginTop:'4px'}}>Pix: {f.pix}</div></div>}
{wifiQr&&<div style={{background:'white',padding:'12px',borderRadius:'16px'}}><img src={wifiQr} style={{width:'140px',height:'140px',margin:'0 auto',display:'block'}}/><div style={{color:'black',fontWeight:900,fontSize:'12px',marginTop:'4px'}}>Senha: {f.wifi}</div></div>}
</div>
</div>
</div>
</div>
</div>
</div>
)
}
