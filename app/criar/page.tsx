// @ts-nocheck
"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

const TEMAS=[
{btn:"#00E676",bg:"#0A0A0A",b1:"#00E676",b2:"#00B0FF"},
{btn:"#FFC400",bg:"#0A0A0A",b1:"#FFC400",b2:"#FF6D00"},
{btn:"#FF006B",bg:"#0A0014",b1:"#FF006B",b2:"#8A2BE2"},
{btn:"#000",bg:"#FFF",b1:"#DDD",b2:"#FFF"},
]

export default function Criar(){
const [f,setF]=useState({title:"Minha Loja",slug:"minha-loja",capaTitulo:"Bem Vindo",capaDesc:"Moda toda semana",logo:"",foto:"",logoPos:"centro",capaEstilo:"full",layoutTipo:1,corTitulo:"#FFFFFF",corDesc:"#AAAAAA",wpp:"5519999999999",insta:"",pix:"",pixValor:"",wifi_ssid:"",wifi:"",loc:""})
const [servicos,setServicos]=useState([{url:"",nome:"",preco:"",desc:"",type:"image"}])
const [catalogo,setCatalogo]=useState([{url:"",nome:"",preco:"",desc:"",type:"image"}])
const [cols,setCols]=useState([{url:"",desc:"",type:"image"},{url:"",desc:"",type:"image"}])
const [temaIdx,setTemaIdx]=useState(0)
const [up,setUp]=useState("")
const t=TEMAS[temaIdx]

async function upload(file,pasta){
setUp("Enviando "+file.name)
const nome=pasta+"/"+Date.now()+"-"+file.name
const r=await supabase.storage.from("midias").upload(nome,file)
setUp("")
if(r.error){alert(r.error.message);return null}
return {url:supabase.storage.from("midias").getPublicUrl(nome).data.publicUrl,type:file.type.startsWith('video')?'video':'image'}
}

async function salvar(){
const slugFinal=f.slug.toLowerCase().replace(/[^a-z0-9-]+/g,"-").trim()
if(!f.title||!slugFinal){alert("Nome e slug");return}
setUp("Salvando...")
const {error}=await supabase.from("biosites").upsert([{
title:f.title,slug:slugFinal,
whatsapp:f.wpp,instagram:f.insta,
pix_key:f.pix,pix_qr_valor:f.pixValor,
wifi_ssid:f.wifi_ssid,wifi_password:f.wifi,localizacao:f.loc,
logo_url:f.logo,foto_url:f.foto,
capa_titulo:f.capaTitulo,capa_desc:f.capaDesc,
cor_titulo:f.corTitulo,cor_desc:f.corDesc,
tema_idx:temaIdx,capa_estilo:f.capaEstilo,logo_pos:f.logoPos,layout_tipo:f.layoutTipo,
colunas:cols,servicos_json:servicos,catalogo_json:catalogo
}],{onConflict:'slug'})
setUp("")
if(error){alert(error.message);return}
location.href="/"+slugFinal
}

const inp={padding:'12px',background:'#111',border:'1px solid #333',borderRadius:'10px',color:'white',width:'100%',marginBottom:'6px',fontSize:'13px'} as any
const isVideo=f.foto&&f.foto.includes('mp4')
const pixQr=f.pix?`https://quickchart.io/qr?text=${encodeURIComponent(f.pix)}&size=300`:null
const wifiQr=f.wifi?`https://quickchart.io/qr?text=${encodeURIComponent(`WIFI:T:WPA;S:${f.wifi_ssid};P:${f.wifi};;`)}&size=300`:null

return(
<div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
<div style={{width:'50%',padding:'14px',overflowY:'auto',height:'100vh',borderRight:'1px solid #222'}}>
<div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'6px',marginBottom:'10px'}}>
{TEMAS.map((tm,i)=><button key={i} onClick={()=>setTemaIdx(i)} style={{height:'36px',borderRadius:'10px',background:tm.bg,border:temaIdx===i?'2px solid white':'1px solid #333'}}><div style={{height:'100%',background:`linear-gradient(135deg,${tm.b1},${tm.b2})`,borderRadius:'6px'}}/></button>)}
</div>
<div style={{display:'flex',gap:'6px',marginBottom:'8px'}}>
<div style={{flex:1}}><label style={{fontSize:'8px'}}>COR TITULO</label><input type="color" value={f.corTitulo} onChange={e=>setF({...f,corTitulo:e.target.value})} style={{width:'100%',height:'32px'}}/></div>
<div style={{flex:1}}><label style={{fontSize:'8px'}}>COR DESC</label><input type="color" value={f.corDesc} onChange={e=>setF({...f,corDesc:e.target.value})} style={{width:'100%',height:'32px'}}/></div>
</div>
<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'6px',marginBottom:'8px'}}>
{[{id:'full',n:'Capa Full'},{id:'quadrada',n:'Quadrada'},{id:'redonda',n:'Redonda'},{id:'banner',n:'Banner'},{id:'separada',n:'Separada'},{id:'sem',n:'Sem Capa'}].map(c=><button key={c.id} onClick={()=>setF({...f,capaEstilo:c.id})} style={{padding:'6px',borderRadius:'8px',background:f.capaEstilo===c.id?t.btn:'#222',color:f.capaEstilo===c.id?'black':'white',fontSize:'9px',border:'1px solid #444'}}>{c.n}</button>)}
</div>
<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'6px',marginBottom:'10px'}}>
{[{id:'centro',n:'Centro'},{id:'esquerda',n:'Esquerda'},{id:'direita',n:'Direita'},{id:'centro-capa',n:'Dentro Capa'},{id:'flut-esq',n:'Flut Esq'},{id:'flut-dir',n:'Flut Dir'}].map(p=><button key={p.id} onClick={()=>setF({...f,logoPos:p.id})} style={{padding:'6px',borderRadius:'8px',background:f.logoPos===p.id?t.btn:'#222',color:f.logoPos===p.id?'black':'white',fontSize:'9px',border:'1px solid #444'}}>{p.n}</button>)}
</div>
{up&&<div style={{background:t.btn,color:'black',padding:'8px',borderRadius:'8px',fontWeight:900,marginBottom:'8px'}}>{up}</div>}
<input style={inp} placeholder="Nome loja" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/>
<input style={inp} placeholder="Slug ex: minha-loja" value={f.slug} onChange={e=>setF({...f,slug:e.target.value})}/>
<div style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',marginBottom:'6px',border:'1px dashed #555'}}>
<b style={{fontSize:'9px'}}>LOGO - Coloque onde quiser em cima</b>
<input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"logos");if(u)setF({...f,logo:u.url})}}}/>
</div>
<div style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',marginBottom:'8px',border:'1px dashed #00E676'}}>
<b style={{fontSize:'9px'}}>CAPA COM VIDEO MP4 RODANDO ATRÁS</b>
<input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"capas");if(u)setF({...f,foto:u.url})}}}/>
<input style={{...inp,marginTop:'6px'}} placeholder="Titulo capa" value={f.capaTitulo} onChange={e=>setF({...f,capaTitulo:e.target.value})}/>
<input style={inp} placeholder="Descricao capa" value={f.capaDesc} onChange={e=>setF({...f,capaDesc:e.target.value})}/>
{f.foto&&<div style={{marginTop:'6px'}}>{isVideo?<video src={f.foto} style={{width:'100%',height:'80px',objectFit:'cover',borderRadius:'8px'}} autoPlay muted loop playsInline/>:<img src={f.foto} style={{width:'100%',height:'80px',objectFit:'cover',borderRadius:'8px'}} alt="capa"/>}</div>}
</div>
<div style={{background:'#111',padding:'8px',borderRadius:'12px',marginBottom:'8px',border:'1px solid #333'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><b style={{fontSize:'10px'}}>SERVICOS - VIDEO/FOTO + PRECO</b><button onClick={()=>setServicos([...servicos,{url:"",nome:"",preco:"",desc:"",type:"image"}])} style={{background:t.btn,border:'none',borderRadius:'6px',padding:'4px 8px',fontWeight:900}}>+</button></div>
{servicos.map((s,i)=><div key={i} style={{background:'#1A1A1A',padding:'6px',borderRadius:'8px',marginTop:'6px'}}><input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"servicos");const n=[...servicos];n[i]={...n[i],url:u.url,type:u.type};setServicos(n)}}}/><input style={{...inp,marginTop:'4px'}} placeholder="Nome servico" value={s.nome} onChange={e=>{const n=[...servicos];n[i].nome=e.target.value;setServicos(n)}}/><div style={{display:'flex',gap:'4px'}}><input style={{...inp,flex:1}} placeholder="Preco" value={s.preco} onChange={e=>{const n=[...servicos];n[i].preco=e.target.value;setServicos(n)}}/><input style={{...inp,flex:2}} placeholder="Descricao" value={s.desc} onChange={e=>{const n=[...servicos];n[i].desc=e.target.value;setServicos(n)}}/></div></div>)}
</div>
<div style={{background:'#111',padding:'8px',borderRadius:'12px',marginBottom:'8px',border:'1px solid #333'}}>
<div style={{display:'flex',justifyContent:'space-between'}}><b style={{fontSize:'10px'}}>CATALOGO - VIDEO/FOTO + DESCRICAO</b><button onClick={()=>setCatalogo([...catalogo,{url:"",nome:"",preco:"",desc:"",type:"image"}])} style={{background:t.btn,border:'none',borderRadius:'6px',padding:'4px 8px',fontWeight:900}}>+</button></div>
{catalogo.map((c,i)=><div key={i} style={{background:'#1A1A1A',padding:'6px',borderRadius:'8px',marginTop:'6px'}}><input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"catalogo");const n=[...catalogo];n[i]={...n[i],url:u.url,type:u.type};setCatalogo(n)}}}/><input style={{...inp,marginTop:'4px'}} placeholder="Nome produto" value={c.nome} onChange={e=>{const n=[...catalogo];n[i].nome=e.target.value;setCatalogo(n)}}/><div style={{display:'flex',gap:'4px'}}><input style={{...inp,flex:1}} placeholder="Preco" value={c.preco} onChange={e=>{const n=[...catalogo];n[i].preco=e.target.value;setCatalogo(n)}}/><input style={{...inp,flex:2}} placeholder="Descricao" value={c.desc} onChange={e=>{const n=[...catalogo];n[i].desc=e.target.value;setCatalogo(n)}}/></div></div>)}
</div>
<input style={inp} placeholder="WhatsApp" value={f.wpp} onChange={e=>setF({...f,wpp:e.target.value})}/>
<input style={inp} placeholder="Instagram" value={f.insta} onChange={e=>setF({...f,insta:e.target.value})}/>
<div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',border:'2px solid #00E676',marginTop:'8px'}}>
<b style={{fontSize:'10px',color:'#00E676'}}>PIX QR CODE - CIMA QR BAIXO CHAVE</b>
<input style={inp} placeholder="Chave Pix" value={f.pix} onChange={e=>setF({...f,pix:e.target.value})}/>
<input style={inp} placeholder="Valor opcional" value={f.pixValor} onChange={e=>setF({...f,pixValor:e.target.value})}/>
{pixQr&&<div style={{background:'white',padding:'10px',borderRadius:'12px',textAlign:'center',marginTop:'6px'}}><img src={pixQr} style={{width:'140px',height:'140px',margin:'0 auto',display:'block'}} alt="pix"/><div style={{color:'black',fontSize:'10px',marginTop:'4px',wordBreak:'break-all'}}>{f.pix}</div></div>}
</div>
<div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',border:'2px solid #FF9500',marginTop:'8px'}}>
<b style={{fontSize:'10px',color:'#FF9500'}}>WIFI QR CODE - CIMA QR BAIXO SENHA</b>
<input style={inp} placeholder="Nome Rede" value={f.wifi_ssid} onChange={e=>setF({...f,wifi_ssid:e.target.value})}/>
<input style={inp} placeholder="Senha WiFi" value={f.wifi} onChange={e=>setF({...f,wifi:e.target.value})}/>
{wifiQr&&<div style={{background:'white',padding:'10px',borderRadius:'12px',textAlign:'center',marginTop:'6px'}}><img src={wifiQr} style={{width:'140px',height:'140px',margin:'0 auto',display:'block'}} alt="wifi"/><div style={{background:'#FFF3E0',padding:'6px',borderRadius:'8px',marginTop:'6px'}}><div style={{color:'black',fontSize:'11px'}}>Rede: <b>{f.wifi_ssid}</b></div><div style={{color:'black',fontWeight:900}}>Senha: {f.wifi}</div></div></div>}
</div>
<input style={{...inp,marginTop:'8px'}} placeholder="Maps link" value={f.loc} onChange={e=>setF({...f,loc:e.target.value})}/>
<div style={{background:'#111',padding:'8px',borderRadius:'12px',marginTop:'8px'}}>
<b style={{fontSize:'10px'}}>COLUNAS SEPARADAS - ARRASTAR E EDITAR (igual Bio.site)</b>
{cols.map((c,i)=><div key={i} style={{background:'#1A1A1A',padding:'6px',borderRadius:'8px',marginTop:'6px'}}><div style={{display:'flex',justifyContent:'space-between'}}><span style={{fontSize:'9px'}}>COLUNA {i+1}</span><button onClick={()=>setCols(cols.filter((_,idx)=>idx!==i))} style={{background:'#FF1A1A',border:'none',color:'white',borderRadius:'4px',padding:'2px 6px',fontSize:'9px'}}>X</button></div><input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"colunas");const nc=[...cols];nc[i]={...nc[i],url:u.url,type:u.type};setCols(nc)}}}/><input style={{...inp,marginTop:'4px'}} placeholder="Descricao coluna" value={c.desc} onChange={e=>{const nc=[...cols];nc[i].desc=e.target.value;setCols(nc)}}/>{c.url&&<div style={{marginTop:'4px'}}>{c.type==='video'?<video src={c.url} style={{width:'100%',height:'60px',objectFit:'cover',borderRadius:'6px'}} autoPlay muted loop playsInline/>:<img src={c.url} style={{width:'100%',height:'60px',objectFit:'cover',borderRadius:'6px'}} alt="col"/>}</div>}</div>)}
<button onClick={()=>setCols([...cols,{url:"",desc:"",type:"image"}])} style={{background:'#222',border:'1px dashed #555',color:'white',width:'100%',padding:'8px',borderRadius:'8px',marginTop:'6px',fontSize:'10px'}}>+ Adicionar Coluna</button>
</div>
<button onClick={salvar} style={{background:t.btn,color:'black',padding:'16px',width:'100%',border:'none',borderRadius:'12px',fontWeight:900,marginTop:'12px'}}>{up||'SALVAR LOJA'}</button>
</div>
<div style={{width:'50%',background:t.bg,display:'flex',justifyContent:'center',padding:'12px',overflowY:'auto',height:'100vh'}}>
<div style={{width:'380px',background:'rgba(20,20,20,0.9)',borderRadius:'28px',overflow:'hidden',border:`1px solid ${t.btn}50`}}>
<div style={{position:'relative'}}>
{f.foto? (isVideo?<video src={f.foto} autoPlay muted loop playsInline style={{width:'100%',height:'260px',objectFit:'cover'}}/>:<div style={{height:'260px',background:`url(${f.foto}) center/cover`}}/>):<div style={{height:'120px',background:`linear-gradient(135deg,${t.b1},${t.b2})`}}/>}
{f.logo&&(
f.logoPos==='esquerda'?<img src={f.logo} style={{width:'86px',height:'86px',borderRadius:'50%',border:`4px solid ${t.bg}`,background:'white',margin:'-40px 0 0 16px',display:'block',position:'relative',zIndex:2}} alt="logo"/>:
f.logoPos==='direita'?<img src={f.logo} style={{width:'86px',height:'86px',borderRadius:'50%',border:`4px solid ${t.bg}`,background:'white',margin:'-40px 16px 0 auto',display:'block',position:'relative',zIndex:2}} alt="logo"/>:
f.logoPos==='flut-esq'?<img src={f.logo} style={{width:'76px',height:'76px',borderRadius:'50%',background:'white',position:'absolute',top:'16px',left:'16px',zIndex:5}} alt="logo"/>:
f.logoPos==='flut-dir'?<img src={f.logo} style={{width:'76px',height:'76px',borderRadius:'50%',background:'white',position:'absolute',top:'16px',right:'16px',zIndex:5}} alt="logo"/>:
<img src={f.logo} style={{width:'86px',height:'86px',borderRadius:'50%',border:`4px solid ${t.bg}`,background:'white',margin:'-43px auto 0',display:'block',position:'relative',zIndex:2}} alt="logo"/>
)}
</div>
<div style={{padding:'16px',textAlign:'center'}}>
<h1 style={{color:f.corTitulo,fontWeight:900,fontSize:'22px'}}>{f.title}</h1>
{f.capaTitulo&&<div style={{color:t.btn,fontWeight:800,fontSize:'13px'}}>{f.capaTitulo}</div>}
{f.capaDesc&&<div style={{color:f.corDesc,fontSize:'12px'}}>{f.capaDesc}</div>}
<div style={{marginTop:'16px',display:'flex',flexDirection:'column',gap:'10px'}}>
{servicos.filter(s=>s.nome||s.url).map((s,i)=><div key={i} style={{background:'rgba(255,255,255,0.08)',borderRadius:'14px',overflow:'hidden',textAlign:'left'}}>{s.url&&(s.type==='video'?<video src={s.url} style={{width:'100%',height:'120px',objectFit:'cover'}} autoPlay muted loop playsInline/>:<img src={s.url} style={{width:'100%',height:'120px',objectFit:'cover'}} alt="serv"/>)}<div style={{padding:'8px'}}><div style={{fontWeight:900,color:'white',fontSize:'12px'}}>{s.nome} {s.preco&&<span style={{color:t.btn}}>{s.preco}</span>}</div>{s.desc&&<div style={{fontSize:'11px',color:'#CCC'}}>{s.desc}</div>}</div></div>)}
{catalogo.filter(c=>c.nome||c.url).map((c,i)=><div key={i} style={{background:'rgba(255,255,255,0.08)',borderRadius:'14px',overflow:'hidden',textAlign:'left'}}>{c.url&&(c.type==='video'?<video src={c.url} style={{width:'100%',height:'120px',objectFit:'cover'}} autoPlay muted loop playsInline/>:<img src={c.url} style={{width:'100%',height:'120px',objectFit:'cover'}} alt="cat"/>)}<div style={{padding:'8px'}}><div style={{fontWeight:900,color:'white',fontSize:'12px'}}>{c.nome} {c.preco&&<span style={{color:t.btn}}>{c.preco}</span>}</div>{c.desc&&<div style={{fontSize:'11px',color:'#CCC'}}>{c.desc}</div>}</div></div>)}
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
{pixQr&&<div style={{background:'white',borderRadius:'16px',padding:'10px'}}><img src={pixQr} style={{width:'100%'}} alt="pix"/><div style={{color:'black',fontSize:'9px',fontWeight:900}}>PIX QR</div></div>}
{wifiQr&&<div style={{background:'white',borderRadius:'16px',padding:'10px'}}><img src={wifiQr} style={{width:'100%'}} alt="wifi"/><div style={{color:'black',fontSize:'9px',fontWeight:900}}>WIFI QR</div><div style={{color:'black',fontSize:'8px'}}>Senha: {f.wifi}</div></div>}
</div>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
{cols.filter(c=>c.url).map((c,i)=><div key={i} style={{background:'rgba(255,255,255,0.08)',borderRadius:'12px',overflow:'hidden'}}>{c.type==='video'?<video src={c.url} style={{width:'100%',height:'80px',objectFit:'cover'}} autoPlay muted loop playsInline/>:<img src={c.url} style={{width:'100%',height:'80px',objectFit:'cover'}} alt="col"/>}{c.desc&&<div style={{padding:'6px',fontSize:'10px',color:'white'}}>{c.desc}</div>}</div>)}
</div>
</div>
</div>
</div>
</div>
</div>
</div>
)
}
