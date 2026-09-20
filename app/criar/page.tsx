"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
const TEMAS=[
{name:"Preto",bg:"#080808",card:"#1A1A1A",btn:"#00C851"},
{name:"Vermelho",bg:"#1A0000",card:"#2A1010",btn:"#FF1A1A"},
{name:"Azul",bg:"#000A1A",card:"#0A1A2A",btn:"#0066FF"},
{name:"Roxo",bg:"#0F001A",card:"#1A0A2A",btn:"#9C27B0"},
{name:"Laranja",bg:"#1A0A00",card:"#2A1A0A",btn:"#FF6A00"},
]
export default function Criar(){
const [f,setF]=useState({title:"",slug:"",wpp:"",insta:"",pix:"",wifi:"",logo:"",foto:"",video:"",capaTitulo:"",capaDesc:""});
const [temaIdx,setTemaIdx]=useState(0); const [up,setUp]=useState("");
async function upload(file:File, pasta:string){
setUp("Enviando..."); const nome=`${pasta}/${Date.now()}-${file.name}`;
const {error}=await supabase.storage.from("midias").upload(nome,file);
setUp(""); if(error){alert(error.message); return null}
const {data}=supabase.storage.from("midias").getPublicUrl(nome); return data.publicUrl;
}
async function salvar(){
if(!f.title||!f.slug) return alert("Nome e slug");
const {error}=await supabase.from("biosites").upsert([{
title:f.title, slug:f.slug.toLowerCase().replace(/\s+/g,"-"), whatsapp:f.wpp, instagram:f.insta, pix_key:f.pix, wifi_password:f.wifi, logo_url:f.logo, foto_url:f.foto, video_url:f.video, capa_titulo:f.capaTitulo, capa_desc:f.capaDesc
}],{onConflict:'slug'}); if(error) alert(error.message); else location.href="/"+f.slug;
}
const tema=TEMAS[temaIdx]
const inp={padding:'12px',background:'#111',border:'1px solid #333',borderRadius:'10px',color:'white',width:'100%',marginBottom:'8px',fontSize:'13px'} as any
const card={background:'#1A1A1A',border:'1px dashed #555',borderRadius:'12px',padding:'14px',marginBottom:'12px'} as any

return(
<div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
<div style={{width:'50%',padding:'16px',overflowY:'auto',height:'100vh',borderRight:'1px solid #222'}}>
<h2 style={{fontWeight:900,fontSize:'13px',marginBottom:'10px'}}>ESQUERDA - EDITA TUDO</h2>
{up && <div style={{background:'#00C851',padding:'8px',borderRadius:'6px',fontSize:'11px',marginBottom:'8px'}}>{up}</div>}
<input style={inp} placeholder="Nome da Loja *" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/>
<input style={inp} placeholder="Slug ex: oficina-holambra *" value={f.slug} onChange={e=>setF({...f,slug:e.target.value})}/>

<div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'12px'}}>
{TEMAS.map((t,i)=><button key={i} onClick={()=>setTemaIdx(i)} style={{padding:'6px 10px',borderRadius:'8px',border: temaIdx===i?'2px solid white':'1px solid #333',background:t.btn,color:'white',fontSize:'10px',fontWeight:900}}>{t.name}</button>)}
</div>

<div style={card}><b style={{fontSize:'11px'}}>📸 LOGO - Clique pra galeria</b><br/><input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0]; if(file){const url=await upload(file,"logos"); if(url) setF({...f,logo:url})}}}/>{f.logo && <img src={f.logo} style={{width:'50px',height:'50px',borderRadius:'50%',marginTop:'8px'}}/>}</div>

<div style={card}>
<b style={{fontSize:'11px'}}>🖼️ CAPA PRINCIPAL - Pode ser FOTO ou VÍDEO da galeria</b><br/>
<span style={{fontSize:'10px',opacity:0.5}}>Clica e escolhe da memória do celular</span><br/><br/>
<input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0]; if(file){const url=await upload(file,"capas"); if(url) setF({...f,foto:url})}}}/>
{f.foto && (f.foto.endsWith('.mp4')||f.foto.includes('video') ? <video src={f.foto} controls style={{width:'100%',height:'120px',borderRadius:'8px',marginTop:'8px'}}/> : <img src={f.foto} style={{width:'100%',height:'120px',objectFit:'cover',borderRadius:'8px',marginTop:'8px'}}/>)}
<input style={{...inp,marginTop:'10px'}} placeholder="📝 Nome da Capa ex: Oficina do João - Especialista" value={f.capaTitulo} onChange={e=>setF({...f,capaTitulo:e.target.value})}/>
<textarea style={{...inp,height:'60px'}} placeholder="📄 Descrição ex: Mais de 10 anos consertando motos em Holambra..." value={f.capaDesc} onChange={e=>setF({...f,capaDesc:e.target.value})}/>
</div>

<div style={card}><b style={{fontSize:'11px'}}>🎥 VÍDEO DA LOJA (extra)</b><br/><input type="file" accept="video/*" onChange={async e=>{const file=e.target.files?.[0]; if(file){const url=await upload(file,"videos"); if(url) setF({...f,video:url})}}}/><input style={{...inp,marginTop:'8px'}} placeholder="Ou link YouTube" value={f.video.includes('midias')?'':f.video} onChange={e=>setF({...f,video:e.target.value})}/></div>

<input style={inp} placeholder="WhatsApp" value={f.wpp} onChange={e=>setF({...f,wpp:e.target.value})}/>
<input style={inp} placeholder="Instagram" value={f.insta} onChange={e=>setF({...f,insta:e.target.value})}/>
<input style={inp} placeholder="Pix" value={f.pix} onChange={e=>setF({...f,pix:e.target.value})}/>
<button onClick={salvar} style={{background:'#00C851',padding:'16px',width:'100%',border:'none',borderRadius:'10px',fontWeight:900,color:'white'}}>💾 SALVAR LOJA</button>
</div>

<div style={{width:'50%',background:'#050505',display:'flex',justifyContent:'center',padding:'20px',overflowY:'auto',height:'100vh'}}>
<div style={{width:'360px'}}>
<div style={{fontSize:'10px',textAlign:'center',opacity:0.3,marginBottom:'10px'}}>👁️ PREVIEW DIREITA - BIOSITE</div>
<div style={{background:tema.bg,borderRadius:'24px',overflow:'hidden',border:`1px solid ${tema.card}`}}>
{f.foto ? (f.foto.endsWith('.mp4')||f.foto.includes('videos') ? <video src={f.foto} autoPlay muted loop style={{width:'100%',height:'200px',objectFit:'cover'}}/> : <div style={{height:'200px',background:`url(${f.foto}) center/cover`}}/>) : <div style={{height:'120px',background:tema.card}}/>}
<div style={{padding:'18px',marginTop:'-40px'}}>
{f.logo ? <img src={f.logo} style={{width:'72px',height:'72px',borderRadius:'50%',border:`3px solid ${tema.bg}`,margin:'0 auto',display:'block',objectFit:'cover'}}/> : <div style={{width:'72px',height:'72px',borderRadius:'50%',background:tema.card,margin:'0 auto'}}/>}
<h2 style={{textAlign:'center',fontWeight:900,marginTop:'10px',fontSize:'18px'}}>{f.title||'NOME DA LOJA'}</h2>
{f.capaTitulo && <h3 style={{textAlign:'center',fontSize:'13px',marginTop:'6px',color:tema.btn,fontWeight:700}}>{f.capaTitulo}</h3>}
{f.capaDesc && <p style={{textAlign:'center',fontSize:'11px',opacity:0.7,marginTop:'6px',lineHeight:'14px'}}>{f.capaDesc}</p>}
{f.video && <div style={{marginTop:'12px',borderRadius:'12px',overflow:'hidden',aspectRatio:'16/9',background:'#111'}}><video src={f.video} controls style={{width:'100%',height:'100%'}}/></div>}
<div style={{marginTop:'14px',display:'flex',flexDirection:'column',gap:'8px'}}>
<div style={{background:tema.btn,padding:'14px',borderRadius:'12px',fontWeight:900,textAlign:'center'}}>💬 WhatsApp</div>
<div style={{background:tema.card,padding:'12px',borderRadius:'10px',fontSize:'12px',textAlign:'center'}}>📸 Instagram</div>
</div>
</div>
</div>
</div>
</div>
</div>
)
}
