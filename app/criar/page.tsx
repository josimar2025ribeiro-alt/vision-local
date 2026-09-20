// @ts-nocheck
"use client"
import { useState, useEffect } from "react"
import { supabase } from "../../lib/supabase"

export default function Criar(){
const [f,setF]=useState({title:"Minha Loja",slug:"minha-loja",logo:"",foto:"",capaTitulo:"Bem Vindo",capaDesc:"Novidades",wpp:"5519999999999",insta:"minhaloja",pix:"",wifi_ssid:"",wifi:"",loc:"",logoSize:92,logoPos:"centro"})
const [up,setUp]=useState("")
const [mapImg,setMapImg]=useState("")

useEffect(()=>{
if(!f.loc){setMapImg("");return}
const q=encodeURIComponent(f.loc)
// Mapa estático OSM - funciona sem API key
setMapImg("https://staticmap.openstreetmap.de/staticmap.php?center=-22.5,-47.1&zoom=13&size=400x200&markers=-22.5,-47.1,red-pushpin")
fetch("https://nominatim.openstreetmap.org/search?format=json&q="+encodeURIComponent(f.loc))
.then(r=>r.json())
.then(d=>{
if(d&&d[0]){const lat=d[0].lat;const lon=d[0].lon;setMapImg("https://staticmap.openstreetmap.de/staticmap.php?center="+lat+","+lon+"&zoom=16&size=400x200&markers="+lat+","+lon+",red-pushpin")}
}).catch(()=>{})
},[f.loc])

async function upload(file,pasta){
setUp("Enviando "+file.name)
const nome=pasta+"/"+Date.now()+"-"+file.name
const r=await supabase.storage.from("midias").upload(nome,file)
setUp("")
if(r.error){alert(r.error.message);return null}
const u=supabase.storage.from("midias").getPublicUrl(nome).data.publicUrl
return u
}

async function salvar(){
const slugFinal=f.slug.toLowerCase().replace(/[^a-z0-9-]+/g,"-").trim()
if(f.title.length===0){alert("Nome");return}
setUp("Salvando...")
const res=await supabase.from("biosites").upsert([{
title:f.title,slug:slugFinal,whatsapp:f.wpp,instagram:f.insta,
pix_key:f.pix,wifi_ssid:f.wifi_ssid,wifi_password:f.wifi,
localizacao:f.loc,logo_url:f.logo,foto_url:f.foto,
capa_titulo:f.capaTitulo,capa_desc:f.capaDesc,
logo_pos:f.logoPos,logo_size:f.logoSize
}],{onConflict:'slug'})
setUp("")
if(res.error){alert(res.error.message);return}
location.href="/"+slugFinal
}

const inp={padding:'12px',background:'#111',border:'1px solid #333',borderRadius:'10px',color:'white',width:'100%',marginBottom:'6px'} as any
const mapsLink=f.loc?"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(f.loc):""
const isVideo=f.foto&&f.foto.includes(".mp4")

return(
<div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
<div style={{width:'50%',padding:'14px',borderRight:'1px solid #222',overflowY:'auto',height:'100vh'}}>
{up? <div style={{background:'#00FF88',color:'black',padding:'8px',borderRadius:'8px',fontWeight:900,marginBottom:'8px'}}>{up}</div> : null}
<input style={inp} placeholder="Nome loja" value={f.title} onChange={(e)=>{setF({...f,title:e.target.value})}}/>
<input style={inp} placeholder="Slug" value={f.slug} onChange={(e)=>{setF({...f,slug:e.target.value})}}/>
<div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',border:'1px dashed #00FF88',marginBottom:'8px'}}>
<b style={{fontSize:'10px'}}>LOGO EDITAVEL</b>
<input type="file" accept="image/*" onChange={async (e)=>{const file=e.target.files?e.target.files[0]:null;if(file){const u=await upload(file,"logos");if(u){setF({...f,logo:u})}}}}/>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'6px',marginTop:'8px'}}>
<button onClick={()=>{setF({...f,logoPos:"centro"})}} style={{padding:'6px',borderRadius:'8px',background:f.logoPos==="centro"?"#00FF88":"#222",color:f.logoPos==="centro"?"black":"white",fontSize:'9px'}}>Centro</button>
<button onClick={()=>{setF({...f,logoPos:"esquerda"})}} style={{padding:'6px',borderRadius:'8px',background:f.logoPos==="esquerda"?"#00FF88":"#222",color:f.logoPos==="esquerda"?"black":"white",fontSize:'9px'}}>Esq</button>
<button onClick={()=>{setF({...f,logoPos:"direita"})}} style={{padding:'6px',borderRadius:'8px',background:f.logoPos==="direita"?"#00FF88":"#222",color:f.logoPos==="direita"?"black":"white",fontSize:'9px'}}>Dir</button>
</div>
</div>
<div style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',marginBottom:'8px'}}>
<b style={{fontSize:'10px'}}>CAPA VIDEO</b>
<input type="file" accept="image/*,video/*" onChange={async (e)=>{const file=e.target.files?e.target.files[0]:null;if(file){const u=await upload(file,"capas");if(u){setF({...f,foto:u})}}}}/>
</div>
<input style={inp} placeholder="WhatsApp" value={f.wpp} onChange={(e)=>{setF({...f,wpp:e.target.value})}}/>
<input style={inp} placeholder="Instagram" value={f.insta} onChange={(e)=>{setF({...f,insta:e.target.value})}}/>
<input style={inp} placeholder="Pix" value={f.pix} onChange={(e)=>{setF({...f,pix:e.target.value})}}/>
<input style={inp} placeholder="WiFi" value={f.wifi_ssid} onChange={(e)=>{setF({...f,wifi_ssid:e.target.value})}}/>
<input style={inp} placeholder="Senha WiFi" value={f.wifi} onChange={(e)=>{setF({...f,wifi:e.target.value})}}/>
<input style={inp} placeholder="Endereço: Rua Armindo Longo 187, Holambra SP" value={f.loc} onChange={(e)=>{setF({...f,loc:e.target.value})}}/>
{f.loc? <div style={{background:'white',borderRadius:'12px',overflow:'hidden',marginTop:'8px',border:'2px solid #1a73e8'}}><div style={{padding:'8px',color:'#1a73e8',fontWeight:900,fontSize:'11px',textAlign:'center'}}>Localização no Maps</div>{mapImg? <img src={mapImg} style={{width:'100%',height:'140px',objectFit:'cover',display:'block'}} alt="mapa"/> : <div style={{height:'140px',background:'#E8F0FE',display:'flex',alignItems:'center',justifyContent:'center',color:'#1a73e8'}}>Carregando mapa...</div>}<div style={{padding:'8px',background:'#E8F0FE',color:'#1a73e8',fontWeight:900,fontSize:'11px',textAlign:'center'}}>{f.loc}</div><a href={mapsLink} target="_blank" style={{display:'block',background:'#1a73e8',color:'white',padding:'10px',textAlign:'center',fontWeight:900,textDecoration:'none',fontSize:'12px'}}>Abrir no Google Maps</a></div> : null}
<button onClick={salvar} style={{background:'#00FF88',color:'black',padding:'18px',width:'100%',border:'none',borderRadius:'14px',fontWeight:900,marginTop:'12px',fontSize:'18px'}}>SALVAR</button>
</div>
<div style={{width:'50%',background:'#000',display:'flex',justifyContent:'center',padding:'12px',overflowY:'auto',height:'100vh'}}>
<div style={{width:'380px',background:'#121212',borderRadius:'28px',overflow:'hidden',border:'1px solid #222'}}>
<div style={{position:'relative'}}>
{f.foto? (isVideo? <video src={f.foto} autoPlay muted loop playsInline style={{width:'100%',height:'320px',objectFit:'cover'}}/> : <div style={{height:'320px',backgroundImage:"url("+f.foto+")",backgroundSize:'cover',backgroundPosition:'center'}}/>) : <div style={{height:'180px',background:'linear-gradient(135deg,#00FF88,#0066FF)'}}/>}
{f.logo? <img src={f.logo} style={{width:f.logoSize,height:f.logoSize,borderRadius:'50%',border:'4px solid #121212',background:'white',display:'block',position:'relative',zIndex:5,margin:f.logoPos==="esquerda"?'-46px 0 0 16px':f.logoPos==="direita"?'-46px 16px 0 auto':'-46px auto 0'}} alt="logo"/> : null}
</div>
<div style={{padding:'16px',textAlign:'center'}}>
<h2 style={{color:'white',fontWeight:900,fontSize:'22px',marginTop:'8px'}}>{f.title}</h2>
<div style={{marginTop:'18px',display:'flex',flexDirection:'column',gap:'12px'}}>
{f.wpp? <div style={{background:'#25D366',padding:'18px',borderRadius:'20px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style={{width:'28px',height:'28px'}} alt="wa"/><span style={{fontWeight:900,color:'white'}}>WhatsApp</span></div> : null}
{f.insta? <div style={{background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',padding:'18px',borderRadius:'20px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}><img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" style={{width:'24px',height:'24px'}} alt="insta"/><span style={{fontWeight:900,color:'white'}}>Instagram</span></div> : null}
{f.loc? <div style={{background:'white',borderRadius:'16px',overflow:'hidden'}}><div style={{padding:'6px',color:'#1a73e8',fontWeight:900,fontSize:'10px'}}>Localização no Maps</div>{mapImg? <img src={mapImg} style={{width:'100%',height:'120px',objectFit:'cover'}} alt="mapa"/> : null}<div style={{padding:'6px',color:'#1a73e8',fontWeight:900,fontSize:'10px'}}>{f.loc}</div><div style={{background:'#1a73e8',color:'white',padding:'10px',fontWeight:900,fontSize:'11px'}}>Abrir no Google Maps</div></div> : null}
</div>
</div>
</div>
</div>
</div>
)
}
