"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
export default function Criar(){
const [f,setF]=useState({title:"",slug:"",whatsapp:"",localizacao:"",video_url:"",pix_key:"",wifi_ssid:"",wifi_pass:"",bio:""});
const salvar=async()=>{
if(!f.slug||!f.title) return alert("Preenche nome e slug!");
const {error}=await supabase.from("biosites").insert([{...f,catalogo:[]}]);
if(error) alert(error.message); else {alert("Criado!"); location.href="/"+f.slug}
};
return(<div style={{background:'#0A0A0A',minHeight:'100vh',color:'white',padding:'20px',fontFamily:'system-ui'}}><h1 style={{fontWeight:900}}>Criar Biosite</h1><div style={{display:'flex',flexDirection:'column',gap:'10px',maxWidth:'400px',marginTop:'20px'}}>
<input placeholder="Nome ex: Pizzaria Holambra" value={f.title} onChange={e=>setF({...f,title:e.target.value})} style={{padding:'12px',borderRadius:'8px',background:'#1A1A1A',border:'1px solid #333',color:'white'}}/>
<input placeholder="slug ex: pizzaria-holambra" value={f.slug} onChange={e=>setF({...f,slug:e.target.value.toLowerCase().replace(/ /g,"-")})} style={{padding:'12px',borderRadius:'8px',background:'#1A1A1A',border:'1px solid #333',color:'white'}}/>
<input placeholder="WhatsApp" value={f.whatsapp} onChange={e=>setF({...f,whatsapp:e.target.value})} style={{padding:'12px',borderRadius:'8px',background:'#1A1A1A',border:'1px solid #333',color:'white'}}/>
<input placeholder="Local ex: Holambra SP" value={f.localizacao} onChange={e=>setF({...f,localizacao:e.target.value})} style={{padding:'12px',borderRadius:'8px',background:'#1A1A1A',border:'1px solid #333',color:'white'}}/>
<input placeholder="Link YouTube" value={f.video_url} onChange={e=>setF({...f,video_url:e.target.value})} style={{padding:'12px',borderRadius:'8px',background:'#1A1A1A',border:'1px solid #333',color:'white'}}/>
<input placeholder="Chave Pix" value={f.pix_key} onChange={e=>setF({...f,pix_key:e.target.value})} style={{padding:'12px',borderRadius:'8px',background:'#1A1A1A',border:'1px solid #333',color:'white'}}/>
<input placeholder="Senha Wi-Fi" value={f.wifi_pass} onChange={e=>setF({...f,wifi_pass:e.target.value})} style={{padding:'12px',borderRadius:'8px',background:'#1A1A1A',border:'1px solid #333',color:'white'}}/>
<button onClick={salvar} style={{background:'#00C851',padding:'16px',borderRadius:'12px',border:'none',fontWeight:900,color:'white'}}>CRIAR</button>
</div></div>);
}
