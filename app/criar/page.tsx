"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

const TEMAS = [
{name:"Preto Premium", bg:"#080808", card:"#1A1A1A", btn:"#00C851"},
{name:"Oficina Vermelha", bg:"#1A0000", card:"#2A1010", btn:"#FF1A1A"},
{name:"Azul Elétrico", bg:"#000A1A", card:"#0A1A2A", btn:"#0066FF"},
{name:"Roxo Neon", bg:"#0F001A", card:"#1A0A2A", btn:"#9C27B0"},
{name:"Laranja Moto", bg:"#1A0A00", card:"#2A1A0A", btn:"#FF6A00"},
{name:"Verde Militar", bg:"#0A1A00", card:"#1A2A10", btn:"#4CAF50"},
]

export default function Criar(){
const [f,setF]=useState({title:"",slug:"",wpp:"",insta:"",serv:"",agend:"",pix:"",wifi:"",loc:"",logo:"",foto:"",video:"",cor:"#00C851",fundo:"#080808"});
const [temaIdx,setTemaIdx]=useState(0); const [up,setUp]=useState("");

async function upload(file:File, pasta:string){
setUp("Enviando "+file.name+"..."); const nome=`${pasta}/${Date.now()}-${file.name}`;
const {error}=await supabase.storage.from("midias").upload(nome,file);
setUp(""); if(error){alert(error.message); return null}
const {data}=supabase.storage.from("midias").getPublicUrl(nome); return data.publicUrl;
}
async function salvar(){
if(!f.title||!f.slug) return alert("Nome e slug"); 
const {error}=await supabase.from("biosites").upsert([{
title:f.title, slug:f.slug.toLowerCase().replace(/\s+/g,"-"), whatsapp:f.wpp, instagram:f.insta, servicos:f.serv, agendamento:f.agend, pix_key:f.pix, wifi_password:f.wifi, localizacao:f.loc, logo_url:f.logo, foto_url:f.foto, video_url:f.video
}],{onConflict:'slug'}); if(error) alert(error.message); else location.href="/"+f.slug;
}

const tema=TEMAS[temaIdx]
const inp={padding:'12px',background:'#111',border:'1px solid #333',borderRadius:'10px',color:'white',width:'100%',marginBottom:'8px',fontSize:'13px'} as any
const card={background:'#1A1A1A',border:'1px dashed #444',borderRadius:'12px',padding:'14px',marginBottom:'12px'} as any

return(
<div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
{/* ESQUERDA - EDITOR */}
<div style={{width:'50%',padding:'16px',overflowY:'auto',borderRight:'1px solid #222',height:'100vh'}}>
<h2 style={{fontWeight:900,fontSize:'14px'}}>EDITOR - ESQUERDA EDITA</h2>
{up && <div style={{background:'#00C851',padding:'8px',borderRadius:'6px',fontSize:'11px',marginBottom:'8px'}}>{up}</div>}

<input style={inp} placeholder="Nome da Loja *" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/>
<input style={inp} placeholder="Slug ex: oficina-holambra *" value={f.slug} onChange={e=>setF({...f,slug:e.target.value})}/>

<div style={{marginBottom:'12px'}}><b style={{fontSize:'11px'}}>🎨 ESCOLHA O TEMA DE FUNDO</b><div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginTop:'6px'}}>
{TEMAS.map((t,i)=><button key={i} onClick={()=>setTemaIdx(i)} style={{padding:'8px 12px',borderRadius:'8px',border: temaIdx===i?'2px solid white':'1px solid #333',background:t.btn,color:'white',fontSize:'10px',fontWeight:900}}>{t.name}</button>)}
</div></div>

<div style={card}><b style={{fontSize:'11px'}}>📸 LOGO</b><br/><input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0]; if(file){const url=await upload(file,"logos"); if(url) setF({...f,logo:url})}}}/>{f.logo && <img src={f.logo} style={{width:'50px',height:'50px',borderRadius:'50%',marginTop:'8px'}}/>}</div>
<div style={card}><b style={{fontSize:'11px'}}>🖼️ FOTO CAPA</b><br/><input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0]; if(file){const url=await upload(file,"capas"); if(url) setF({...f,foto:url})}}}/>{f.foto && <img src={f.foto} style={{width:'100%',height:'80px',objectFit:'cover',borderRadius:'6px',marginTop:'8px'}}/>}</div>
<div style={card}><b style={{fontSize:'11px'}}>🎥 VÍDEO</b><br/><input type="file" accept="video/*" onChange={async e=>{const file=e.target.files?.[0]; if(file){const url=await upload(file,"videos"); if(url) setF({...f,video:url})}}}/><input style={{...inp,marginTop:'8px'}} placeholder="Ou link YouTube" value={f.video.includes('midias')?'':f.video} onChange={e=>setF({...f,video:e.target.value})}/></div>

<input style={inp} placeholder="WhatsApp" value={f.wpp} onChange={e=>setF({...f,wpp:e.target.value})}/>
<input style={inp} placeholder="Instagram" value={f.insta} onChange={e=>setF({...f,insta:e.target.value})}/>
<input style={inp} placeholder="Pix" value={f.pix} onChange={e=>setF({...f,pix:e.target.value})}/>
<input style={inp} placeholder="WiFi" value={f.wifi} onChange={e=>setF({...f,wifi:e.target.value})}/>
<button onClick={salvar} style={{background:'#00C851',padding:'16px',width:'100%',border:'none',borderRadius:'10px',fontWeight:900,color:'white'}}>💾 SALVAR LOJA</button>
</div>

{/* DIREITA - PREVIEW BIOSITE AO VIVO */}
<div style={{width:'50%',background:'#050505',display:'flex',justifyContent:'center',padding:'20px',overflowY:'auto',height:'100vh'}}>
<div style={{width:'360px'}}>
<div style={{fontSize:'10px',textAlign:'center',opacity:0.4,marginBottom:'10px'}}>👁️ PREVIEW AO VIVO - DIREITA</div>
<div style={{background:tema.bg,border:`1px solid ${tema.card}`,borderRadius:'24px',overflow:'hidden'}}>
{f.foto && <div style={{height:'140px',background:`url(${f.foto}) center/cover`}}/>}
<div style={{padding:'18px',marginTop:f.foto?'-40px':'0'}}>
{f.logo ? <img src={f.logo} style={{width:'72px',height:'72px',borderRadius:'50%',border:`3px solid ${tema.bg}`,margin:'0 auto',display:'block',objectFit:'cover'}}/> : <div style={{width:'72px',height:'72px',borderRadius:'50%',background:tema.card,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center'}}>🏪</div>}
<h2 style={{textAlign:'center',fontWeight:900,marginTop:'10px',fontSize:'18px',color:'white'}}>{f.title||'NOME DA LOJA'}</h2>
{f.video && <div style={{marginTop:'12px',borderRadius:'12px',overflow:'hidden',background:'#111',aspectRatio:'16/9'}}>{f.video.includes('youtube')||f.video.includes('youtu.be') ? <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${f.video.split('v=')[1]?.split('&')[0]||f.video.split('/').pop()}`} frameBorder="0"/> : <video src={f.video} controls style={{width:'100%',height:'100%'}}/>}</div>}
<div style={{marginTop:'14px',display:'flex',flexDirection:'column',gap:'8px'}}>
<div style={{background:tema.card,padding:'14px',borderRadius:'12px',fontSize:'13px',color:'white',border:`1px solid ${tema.card}`}}>📸 Instagram</div>
<div style={{background:tema.btn,padding:'14px',borderRadius:'12px',fontSize:'13px',fontWeight:900,color:'white'}}>💬 WhatsApp {f.wpp}</div>
<div style={{background:tema.card,padding:'14px',borderRadius:'12px',fontSize:'13px',color:'white'}}>⭐ Serviços</div>
<div style={{background:tema.card,padding:'14px',borderRadius:'12px',fontSize:'13px',color:'white'}}>📅 Agendar</div>
<div style={{background:tema.btn,padding:'14px',borderRadius:'12px',fontSize:'13px',fontWeight:900,color:'white'}}>💳 Pix {f.pix?': '+f.pix:' - '+ (f.wifi||'Senha WiFi')}</div>
</div>
</div>
</div>
<div style={{textAlign:'center',fontSize:'10px',opacity:0.3,marginTop:'10px'}}>vision-local.com/{f.slug||'sua-loja'}</div>
</div>
</div>
</div>
)
}
