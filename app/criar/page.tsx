// @ts-nocheck
"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Criar(){
const [f,setF]=useState({title:"Minha Loja",slug:"minha-loja",logo:"",foto:"",capaTitulo:"Bem Vindo",capaDesc:"Novidades",wpp:"5519999999999",insta:"minhaloja",pix:"",wifi_ssid:"",wifi:"",loc:"",logoSize:92,logoPos:"centro"})
const [up,setUp]=useState("")

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
let pixQr=null
let wifiQr=null
if(f.pix){pixQr="https://quickchart.io/qr?text="+encodeURIComponent(f.pix)+"&size=300"}
if(f.wifi){const txt="WIFI:T:WPA;S:"+f.wifi_ssid+";P:"+f.wifi+";;";wifiQr="https://quickchart.io/qr?text="+encodeURIComponent(txt)+"&size=300"}
const isVideo=f.foto&&f.foto.indexOf(".mp4")!==-1
const logoStyleBase={borderRadius:'50%',border:'4px solid #121212',background:'white',position:'relative',zIndex:5,display:'block'} as any

function getLogoStyle(){
const s=f.logoSize
if(f.logoPos==="esquerda"){return {...logoStyleBase,width:s,height:s,margin:'-46px 0 0 16px'}}
if(f.logoPos==="direita"){return {...logoStyleBase,width:s,height:s,margin:'-46px 16px 0 auto'}}
if(f.logoPos==="canto-esq"){return {...logoStyleBase,width:s,height:s,position:'absolute',top:'12px',left:'12px'}}
if(f.logoPos==="canto-dir"){return {...logoStyleBase,width:s,height:s,position:'absolute',top:'12px',right:'12px'}}
return {...logoStyleBase,width:s,height:s,margin:'-46px auto 0'}
}

return(
<div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
<div style={{width:'50%',padding:'14px',borderRight:'1px solid #222',overflowY:'auto',height:'100vh'}}>
{up? <div style={{background:'#00FF88',color:'black',padding:'8px',borderRadius:'8px',fontWeight:900,marginBottom:'8px'}}>{up}</div> : null}
<input style={inp} placeholder="Nome loja" value={f.title} onChange={(e)=>{setF({...f,title:e.target.value})}}/>
<input style={inp} placeholder="Slug" value={f.slug} onChange={(e)=>{setF({...f,slug:e.target.value})}}/>
<div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',border:'1px dashed #00FF88',marginBottom:'8px'}}>
<b style={{fontSize:'10px'}}>LOGO EDITAVEL - tamanho e canto</b>
<input type="file" accept="image/*" onChange={async (e)=>{const file=e.target.files?e.target.files[0]:null;if(file){const u=await upload(file,"logos");if(u){setF({...f,logo:u})}}}}/>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'6px',marginTop:'8px'}}>
<button onClick={()=>{setF({...f,logoPos:"centro"})}} style={{padding:'6px',borderRadius:'8px',background:f.logoPos==="centro"?"#00FF88":"#222",color:f.logoPos==="centro"?"black":"white",fontSize:'9px'}}>Centro</button>
<button onClick={()=>{setF({...f,logoPos:"esquerda"})}} style={{padding:'6px',borderRadius:'8px',background:f.logoPos==="esquerda"?"#00FF88":"#222",color:f.logoPos==="esquerda"?"black":"white",fontSize:'9px'}}>Esq</button>
<button onClick={()=>{setF({...f,logoPos:"direita"})}} style={{padding:'6px',borderRadius:'8px',background:f.logoPos==="direita"?"#00FF88":"#222",color:f.logoPos==="direita"?"black":"white",fontSize:'9px'}}>Dir</button>
<button onClick={()=>{setF({...f,logoPos:"canto-esq"})}} style={{padding:'6px',borderRadius:'8px',background:f.logoPos==="canto-esq"?"#00FF88":"#222",color:f.logoPos==="canto-esq"?"black":"white",fontSize:'9px'}}>Canto Esq</button>
</div>
<div style={{marginTop:'8px'}}><label style={{fontSize:'10px'}}>Tamanho logo: {f.logoSize}px</label><input type="range" min="50" max="150" value={f.logoSize} onChange={(e)=>{setF({...f,logoSize:parseInt(e.target.value)})}} style={{width:'100%'}}/></div>
{f.logo? <img src={f.logo} style={{width:'60px',height:'60px',borderRadius:'50%',marginTop:'8px',background:'white'}} alt="logo"/> : null}
</div>
<div style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',marginBottom:'8px'}}>
<b style={{fontSize:'10px'}}>CAPA VIDEO RODANDO</b>
<input type="file" accept="image/*,video/*" onChange={async (e)=>{const file=e.target.files?e.target.files[0]:null;if(file){const u=await upload(file,"capas");if(u){setF({...f,foto:u})}}}}/>
</div>
<input style={inp} placeholder="WhatsApp 551999..." value={f.wpp} onChange={(e)=>{setF({...f,wpp:e.target.value})}}/>
<input style={inp} placeholder="Instagram @loja" value={f.insta} onChange={(e)=>{setF({...f,insta:e.target.value})}}/>
<input style={inp} placeholder="Pix" value={f.pix} onChange={(e)=>{setF({...f,pix:e.target.value})}}/>
<input style={inp} placeholder="WiFi Nome" value={f.wifi_ssid} onChange={(e)=>{setF({...f,wifi_ssid:e.target.value})}}/>
<input style={inp} placeholder="WiFi Senha" value={f.wifi} onChange={(e)=>{setF({...f,wifi:e.target.value})}}/>
<input style={inp} placeholder="Link Google Maps" value={f.loc} onChange={(e)=>{setF({...f,loc:e.target.value})}}/>
{f.loc? <div style={{height:'120px',marginTop:'8px',borderRadius:'12px',overflow:'hidden',border:'1px solid #333'}}><iframe src={f.loc} style={{width:'100%',height:'100%',border:'none'}} title="map"/></div> : null}
<button onClick={salvar} style={{background:'#00FF88',color:'black',padding:'18px',width:'100%',border:'none',borderRadius:'14px',fontWeight:900,marginTop:'12px',fontSize:'18px'}}>SALVAR FINAL</button>
</div>

<div style={{width:'50%',background:'#000',display:'flex',justifyContent:'center',padding:'12px',overflowY:'auto',height:'100vh'}}>
<div style={{width:'380px',background:'#121212',borderRadius:'28px',overflow:'hidden',border:'1px solid #222'}}>
<div style={{position:'relative'}}>
{f.foto? (isVideo? <video src={f.foto} autoPlay muted loop playsInline style={{width:'100%',height:'320px',objectFit:'cover'}}/> : <div style={{height:'320px',backgroundImage:"url("+f.foto+")",backgroundSize:'cover',backgroundPosition:'center'}}/>) : <div style={{height:'180px',background:'linear-gradient(135deg,#00FF88,#0066FF)'}}/>}
{f.logo? <img src={f.logo} style={getLogoStyle()} alt="logo"/> : null}
</div>
<div style={{padding:'16px',textAlign:'center'}}>
<h2 style={{color:'white',fontWeight:900,fontSize:'22px',marginTop:'8px'}}>{f.title}</h2>

<div style={{marginTop:'18px',display:'flex',flexDirection:'column',gap:'12px'}}>
{f.wpp? <div style={{background:'#25D366',padding:'18px',borderRadius:'20px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style={{width:'28px',height:'28px'}} alt="whats"/><span style={{fontWeight:900,color:'white'}}>WhatsApp</span></div> : null}
{f.insta? <div style={{background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',padding:'18px',borderRadius:'20px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}><img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" style={{width:'24px',height:'24px'}} alt="insta"/><span style={{fontWeight:900,color:'white'}}>Instagram</span></div> : null}
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
{pixQr? <div style={{background:'white',borderRadius:'16px',padding:'10px',border:'2px solid #00FF88'}}><div style={{color:'black',fontSize:'9px',fontWeight:900}}>PIX QR CODE</div><img src={pixQr} style={{width:'100%'}} alt="pix"/><div style={{color:'black',fontSize:'8px',background:'#E0FFE0',padding:'4px',borderRadius:'6px',marginTop:'4px',wordBreak:'break-all'}}>{f.pix}</div></div> : null}
{wifiQr? <div style={{background:'white',borderRadius:'16px',padding:'10px',border:'2px solid #FF9500'}}><div style={{color:'black',fontSize:'9px',fontWeight:900}}>WIFI QR CODE</div><img src={wifiQr} style={{width:'100%'}} alt="wifi"/><div style={{background:'#FFF3E0',padding:'4px',borderRadius:'6px',marginTop:'4px'}}><div style={{color:'black',fontSize:'10px'}}>Rede: <b>{f.wifi_ssid}</b></div><div style={{color:'black',fontSize:'12px',fontWeight:900}}>Senha: {f.wifi}</div></div></div> : null}
</div>
{f.loc? <div style={{background:'white',borderRadius:'16px',overflow:'hidden',border:'2px solid #1a73e8'}}><div style={{padding:'10px',fontWeight:900,color:'#1a73e8',fontSize:'12px'}}>Localização</div><iframe src={f.loc} style={{width:'100%',height:'140px',border:'none'}} title="mapa preview"/><div style={{padding:'8px',color:'#1a73e8',fontWeight:900}}>Ver no Maps</div></div> : null}
</div>
</div>
</div>
</div>
</div>
)
}
