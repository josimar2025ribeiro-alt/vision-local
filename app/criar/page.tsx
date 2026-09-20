// @ts-nocheck
"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Criar(){
const [f,setF]=useState({title:"Minha Loja",slug:"minha-loja",logo:"",foto:"",capaTitulo:"Bem Vindo",capaDesc:"Novidades",corTitulo:"#FFFFFF",corDesc:"#AAAAAA",capaEstilo:"full",logoPos:"centro",wpp:"5519999999999",pix:"",wifi_ssid:"",wifi:"",loc:""})
const [servicos,setServicos]=useState([{url:"",nome:"",preco:"",desc:"",type:"image"}])
const [catalogo,setCatalogo]=useState([{url:"",nome:"",preco:"",desc:"",type:"image"}])
const [cols,setCols]=useState([{url:"",desc:"",type:"image"}])
const [up,setUp]=useState("")
const [tema,setTema]=useState(0)
const temas=[{btn:"#00FF88",b1:"#00FF88",b2:"#0066FF",bg:"#050505"}]

async function upload(file,pasta){
setUp("Enviando "+file.name)
const nome=pasta+"/"+Date.now()+"-"+file.name
const r=await supabase.storage.from("midias").upload(nome,file)
setUp("")
if(r.error){alert(r.error.message);return null}
const u=supabase.storage.from("midias").getPublicUrl(nome).data.publicUrl
const isV=file.type.indexOf("video")>-1
if(isV){return {url:u,type:"video"}}
return {url:u,type:"image"}
}

async function salvar(){
const slugFinal=f.slug.toLowerCase().replace(/[^a-z0-9-]+/g,"-").trim()
if(f.title.length===0||slugFinal.length===0){alert("Nome e slug");return}
setUp("Salvando...")
const res=await supabase.from("biosites").upsert([{
title:f.title,slug:slugFinal,whatsapp:f.wpp,pix_key:f.pix,wifi_ssid:f.wifi_ssid,wifi_password:f.wifi,localizacao:f.loc,logo_url:f.logo,foto_url:f.foto,capa_titulo:f.capaTitulo,capa_desc:f.capaDesc,cor_titulo:f.corTitulo,cor_desc:f.corDesc,tema_idx:tema,capa_estilo:f.capaEstilo,logo_pos:f.logoPos,colunas:cols,servicos_json:servicos,catalogo_json:catalogo
}],{onConflict:'slug'})
setUp("")
if(res.error){alert(res.error.message);return}
location.href="/"+slugFinal
}

const inp={padding:'12px',background:'#111',border:'1px solid #333',borderRadius:'10px',color:'white',width:'100%',marginBottom:'6px',fontSize:'13px'} as any
let pixQr=null
let wifiQr=null
if(f.pix){pixQr="https://quickchart.io/qr?text="+encodeURIComponent(f.pix)+"&size=300"}
if(f.wifi_ssid && f.wifi){const txt="WIFI:T:WPA;S:"+f.wifi_ssid+";P:"+f.wifi+";;";wifiQr="https://quickchart.io/qr?text="+encodeURIComponent(txt)+"&size=300"}
const t=temas[tema]
const isVideoCover = f.foto && f.foto.indexOf(".mp4")!==-1

return (
<div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
<div style={{width:'50%',padding:'14px',overflowY:'auto',height:'100vh',borderRight:'1px solid #222'}}>
{up? <div style={{background:t.btn,color:'black',padding:'8px',borderRadius:'8px',fontWeight:900,marginBottom:'8px'}}>{up}</div> : null}
<input style={inp} placeholder="Nome loja" value={f.title} onChange={(e)=>{setF({...f,title:e.target.value})}}/>
<input style={inp} placeholder="Slug minha-loja" value={f.slug} onChange={(e)=>{setF({...f,slug:e.target.value})}}/>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'6px',marginBottom:'8px'}}>
<button onClick={()=>{setF({...f,capaEstilo:"full"})}} style={{padding:'6px',borderRadius:'8px',background:f.capaEstilo==="full"?t.btn:"#222",color:f.capaEstilo==="full"?"black":"white"}}>Full</button>
<button onClick={()=>{setF({...f,capaEstilo:"quadrada"})}} style={{padding:'6px',borderRadius:'8px',background:f.capaEstilo==="quadrada"?t.btn:"#222",color:f.capaEstilo==="quadrada"?"black":"white"}}>Quadrada</button>
<button onClick={()=>{setF({...f,capaEstilo:"redonda"})}} style={{padding:'6px',borderRadius:'8px',background:f.capaEstilo==="redonda"?t.btn:"#222",color:f.capaEstilo==="redonda"?"black":"white"}}>Redonda</button>
</div>
<div style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',marginBottom:'6px',border:'1px dashed #555'}}>
<b style={{fontSize:'9px'}}>LOGO onde quiser no topo</b>
<input type="file" accept="image/*" onChange={async (e)=>{const file=e.target.files?e.target.files[0]:null;if(file){const u=await upload(file,"logos");if(u){setF({...f,logo:u.url})}}}}/>
</div>
<div style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',marginBottom:'8px',border:'1px dashed #00FF88'}}>
<b style={{fontSize:'9px'}}>CAPA COM VIDEO MP4 RODANDO ATRAS - ORIGINAL</b>
<input type="file" accept="image/*,video/*" onChange={async (e)=>{const file=e.target.files?e.target.files[0]:null;if(file){const u=await upload(file,"capas");if(u){setF({...f,foto:u.url})}}}}/>
<input style={inp} placeholder="Titulo capa" value={f.capaTitulo} onChange={(e)=>{setF({...f,capaTitulo:e.target.value})}}/>
<input style={inp} placeholder="Descricao" value={f.capaDesc} onChange={(e)=>{setF({...f,capaDesc:e.target.value})}}/>
</div>
<div style={{background:'#111',padding:'8px',borderRadius:'12px',marginBottom:'8px',border:'1px solid #333'}}>
<div style={{display:'flex',justifyContent:'space-between'}}><b style={{fontSize:'10px'}}>SERVICOS VIDEO/FOTO</b><button onClick={()=>{setServicos([...servicos,{url:"",nome:"",preco:"",desc:"",type:"image"}])}} style={{background:t.btn,border:'none',borderRadius:'6px',padding:'4px 8px',fontWeight:900}}>+</button></div>
{servicos.map((s,i)=>{
return (
<div key={i} style={{background:'#1A1A1A',padding:'6px',borderRadius:'8px',marginTop:'6px'}}>
<input type="file" accept="image/*,video/*" onChange={async (e)=>{const file=e.target.files?e.target.files[0]:null;if(file){const u=await upload(file,"servicos");const n=[...servicos];n[i]={...n[i],url:u.url,type:u.type};setServicos(n)}}}/>
<input style={inp} placeholder="Nome" value={s.nome} onChange={(e)=>{const n=[...servicos];n[i].nome=e.target.value;setServicos(n)}}/>
</div>
)
})}
</div>
<input style={inp} placeholder="WhatsApp GRANDE" value={f.wpp} onChange={(e)=>{setF({...f,wpp:e.target.value})}}/>
<input style={inp} placeholder="Pix" value={f.pix} onChange={(e)=>{setF({...f,pix:e.target.value})}}/>
<input style={inp} placeholder="WiFi Nome" value={f.wifi_ssid} onChange={(e)=>{setF({...f,wifi_ssid:e.target.value})}}/>
<input style={inp} placeholder="WiFi Senha" value={f.wifi} onChange={(e)=>{setF({...f,wifi:e.target.value})}}/>
<input style={inp} placeholder="Maps" value={f.loc} onChange={(e)=>{setF({...f,loc:e.target.value})}}/>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginTop:'8px'}}>
{pixQr? <div style={{background:'white',borderRadius:'12px',padding:'8px',textAlign:'center'}}><img src={pixQr} style={{width:'100%'}} alt="pix"/><div style={{color:'black',fontSize:'8px',fontWeight:900}}>PIX QR</div></div> : null}
{wifiQr? <div style={{background:'white',borderRadius:'12px',padding:'8px',textAlign:'center'}}><img src={wifiQr} style={{width:'100%'}} alt="wifi"/><div style={{color:'black',fontSize:'8px',fontWeight:900}}>WIFI QR - SENHA {f.wifi}</div></div> : null}
</div>
<button onClick={salvar} style={{background:t.btn,color:'black',padding:'18px',width:'100%',border:'none',borderRadius:'14px',fontWeight:900,marginTop:'12px',fontSize:'18px'}}>SALVAR ORIGINAL</button>
</div>
<div style={{width:'50%',background:t.bg,display:'flex',justifyContent:'center',padding:'12px',overflowY:'auto',height:'100vh'}}>
<div style={{width:'380px',background:'#121212',borderRadius:'28px',overflow:'hidden',border:'1px solid #222'}}>
<div style={{position:'relative'}}>
{f.foto? (isVideoCover? <video src={f.foto} autoPlay muted loop playsInline style={{width:'100%',height:'260px',objectFit:'cover'}}/> : <div style={{height:'260px',backgroundImage:"url("+f.foto+")",backgroundSize:'cover',backgroundPosition:'center'}}/>) : <div style={{height:'120px',background:'linear-gradient(135deg,#00FF88,#0066FF)'}}/>}
{f.logo? <img src={f.logo} style={{width:'86px',height:'86px',borderRadius:'50%',border:'4px solid #121212',background:'white',margin:'-43px auto 0',display:'block',position:'relative',zIndex:2}} alt="logo"/> : null}
</div>
<div style={{padding:'16px',textAlign:'center'}}>
<h2 style={{color:f.corTitulo,fontWeight:900}}>{f.title}</h2>
<div style={{color:f.corDesc,fontSize:'12px'}}>{f.capaDesc}</div>
<div style={{marginTop:'16px',display:'flex',flexDirection:'column',gap:'12px'}}>
<div style={{background:'#25D366',padding:'22px',borderRadius:'22px',fontWeight:900,fontSize:'20px',color:'white'}}>WhatsApp GRANDE</div>
</div>
</div>
</div>
</div>
</div>
)
}
