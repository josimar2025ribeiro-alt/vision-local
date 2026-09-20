"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
export default function Criar(){
const [f,setF]=useState({title:"",slug:"",wpp:"",insta:"",serv:"",agend:"",pix:"",wifi:"",loc:"",logo:"",foto:"",video:""});
const [up,setUp]=useState("");
async function upload(file:File, pasta:string){
setUp("Enviando..."); const nome=`${pasta}/${Date.now()}-${file.name}`;
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
const inp={padding:'12px',background:'#111',border:'1px solid #333',borderRadius:'10px',color:'white',width:'100%',marginBottom:'8px'} as any
const card={background:'#1A1A1A',border:'1px dashed #444',borderRadius:'12px',padding:'14px',marginBottom:'12px'} as any
return(<div style={{background:'#0A0A0A',color:'white',padding:'20px',minHeight:'100vh'}}>
<h1 style={{fontWeight:900}}>EDITOR COM UPLOAD - CLIQUE E ESCOLHA DO CELULAR</h1>
{up && <div style={{background:'#00C851',padding:'10px',borderRadius:'8px',marginBottom:'10px'}}>{up}</div>}
<input style={inp} placeholder="Nome da Loja" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/>
<input style={inp} placeholder="Slug ex: oficina-holambra" value={f.slug} onChange={e=>setF({...f,slug:e.target.value})}/>
<div style={card}><b>📸 LOGO - Clica pra abrir galeria do celular</b><br/><br/><input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0]; if(file){const url=await upload(file,"logos"); if(url) setF({...f,logo:url})}}}/>{f.logo && <img src={f.logo} style={{width:'60px',height:'60px',borderRadius:'50%',marginTop:'10px'}}/>}</div>
<div style={card}><b>🖼️ FOTO CAPA DA LOJA</b><br/><br/><input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0]; if(file){const url=await upload(file,"capas"); if(url) setF({...f,foto:url})}}}/>{f.foto && <img src={f.foto} style={{width:'100%',height:'120px',objectFit:'cover',borderRadius:'8px',marginTop:'10px'}}/>}</div>
<div style={card}><b>🎥 VÍDEO DA LOJA</b><br/><br/><input type="file" accept="video/*" onChange={async e=>{const file=e.target.files?.[0]; if(file){const url=await upload(file,"videos"); if(url) setF({...f,video:url})}}}/><input style={{...inp,marginTop:'10px'}} placeholder="Ou cole link YouTube" value={f.video.includes('midias')?'':f.video} onChange={e=>setF({...f,video:e.target.value})}/></div>
<input style={inp} placeholder="WhatsApp" value={f.wpp} onChange={e=>setF({...f,wpp:e.target.value})}/>
<input style={inp} placeholder="Instagram" value={f.insta} onChange={e=>setF({...f,insta:e.target.value})}/>
<input style={inp} placeholder="Pix" value={f.pix} onChange={e=>setF({...f,pix:e.target.value})}/>
<input style={inp} placeholder="WiFi" value={f.wifi} onChange={e=>setF({...f,wifi:e.target.value})}/>
<input style={inp} placeholder="Localização" value={f.loc} onChange={e=>setF({...f,loc:e.target.value})}/>
<button onClick={salvar} style={{background:'#00C851',padding:'18px',width:'100%',border:'none',borderRadius:'12px',fontWeight:900,color:'white',fontSize:'16px'}}>SALVAR LOJA</button>
</div>)
}
