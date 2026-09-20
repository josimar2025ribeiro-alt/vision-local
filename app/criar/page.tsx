// @ts-nocheck
"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Criar(){
const [f,setF]=useState({title:"Minha Loja",slug:"minha-loja",logo:"",foto:"",wpp:"5519999999999",insta:"minhaloja",pix:"minhaloja@gmail.com",wifi_ssid:"Minha Loja WiFi",wifi:"12345678",linkMaps:"https://maps.app.goo.gl/...",mapaImg:"",logoSize:92,logoPos:"centro",corFundo:"#121212"})
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
setUp("Salvando Pix e WiFi...")
const {error}=await supabase.from("biosites").upsert([{
title:f.title,slug:slugFinal,
whatsapp:f.wpp,instagram:f.insta,
pix_key:f.pix,wifi_ssid:f.wifi_ssid,wifi_password:f.wifi,
localizacao:f.linkMaps,mapa_imagem_url:f.mapaImg,
logo_url:f.logo,foto_url:f.foto,
logo_pos:f.logoPos,logo_size:f.logoSize,cor_fundo:f.corFundo
}],{onConflict:'slug'})
setUp("")
if(error){alert("ERRO AO SALVAR: "+error.message);return}
alert("Salvo! Pix e WiFi salvos!")
location.href="/"+slugFinal
}

const inp={padding:'12px',background:'#111',border:'1px solid #333',borderRadius:'10px',color:'white',width:'100%',marginBottom:'6px'} as any
let pixQr=null
let wifiQr=null
if(f.pix){pixQr="https://quickchart.io/qr?text="+encodeURIComponent(f.pix)+"&size=300"}
if(f.wifi){const txt="WIFI:T:WPA;S:"+f.wifi_ssid+";P:"+f.wifi+";;";wifiQr="https://quickchart.io/qr?text="+encodeURIComponent(txt)+"&size=300"}
const isVideo=f.foto&&f.foto.includes(".mp4")

return(
<div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
<div style={{width:'50%',padding:'14px',borderRight:'1px solid #222',overflowY:'auto',height:'100vh'}}>
{up? <div style={{background:'#00FF88',color:'black',padding:'10px',borderRadius:'8px',fontWeight:900,marginBottom:'8px'}}>{up}</div> : null}
<input style={inp} placeholder="Nome loja" value={f.title} onChange={(e)=>{setF({...f,title:e.target.value})}}/>
<input style={inp} placeholder="Slug" value={f.slug} onChange={(e)=>{setF({...f,slug:e.target.value})}}/>
<div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',border:'1px dashed #00FF88',marginBottom:'8px'}}>
<b style={{fontSize:'10px'}}>LOGO - TAMANHO E POSIÇÃO</b>
<input type="file" accept="image/*" onChange={async (e)=>{const file=e.target.files?e.target.files[0]:null;if(file){const u=await upload(file,"logos");if(u){setF({...f,logo:u})}}}}/>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'6px',marginTop:'8px'}}>
<button onClick={()=>{setF({...f,logoPos:"centro"})}} style={{padding:'8px',borderRadius:'8px',background:f.logoPos==="centro"?"#00FF88":"#222",color:f.logoPos==="centro"?"black":"white",fontSize:'10px',fontWeight:900}}>Centro</button>
<button onClick={()=>{setF({...f,logoPos:"esquerda"})}} style={{padding:'8px',borderRadius:'8px',background:f.logoPos==="esquerda"?"#00FF88":"#222",color:f.logoPos==="esquerda"?"black":"white",fontSize:'10px',fontWeight:900}}>Esquerda</button>
<button onClick={()=>{setF({...f,logoPos:"direita"})}} style={{padding:'8px',borderRadius:'8px',background:f.logoPos==="direita"?"#00FF88":"#222",color:f.logoPos==="direita"?"black":"white",fontSize:'10px',fontWeight:900}}>Direita</button>
</div>
<div style={{marginTop:'10px'}}><label style={{fontSize:'11px'}}>Tamanho: {f.logoSize}px</label><input type="range" min="50" max="150" value={f.logoSize} onChange={(e)=>{setF({...f,logoSize:parseInt(e.target.value)})}} style={{width:'100%'}}/></div>
</div>
<div style={{background:'#1A1A1A',padding:'8px',borderRadius:'10px',marginBottom:'8px'}}>
<b style={{fontSize:'10px'}}>CAPA VIDEO</b>
<input type="file" accept="image/*,video/*" onChange={async (e)=>{const file=e.target.files?e.target.files[0]:null;if(file){const u=await upload(file,"capas");if(u){setF({...f,foto:u})}}}}/>
</div>
<input style={inp} placeholder="WhatsApp" value={f.wpp} onChange={(e)=>{setF({...f,wpp:e.target.value})}}/>
<input style={inp} placeholder="Instagram" value={f.insta} onChange={(e)=>{setF({...f,insta:e.target.value})}}/>
<div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',border:'1px dashed #00E676',marginBottom:'8px'}}>
<b style={{fontSize:'10px',color:'#00E676'}}>PIX - AGORA SALVA 100%</b>
<input style={inp} placeholder="Chave Pix" value={f.pix} onChange={(e)=>{setF({...f,pix:e.target.value})}}/>
</div>
<div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',border:'1px dashed #FF9500',marginBottom:'8px'}}>
<b style={{fontSize:'10px',color:'#FF9500'}}>WIFI - AGORA SALVA 100%</b>
<input style={inp} placeholder="Nome WiFi" value={f.wifi_ssid} onChange={(e)=>{setF({...f,wifi_ssid:e.target.value})}}/>
<input style={inp} placeholder="Senha WiFi" value={f.wifi} onChange={(e)=>{setF({...f,wifi:e.target.value})}}/>
</div>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginBottom:'8px'}}>
{pixQr? <div style={{background:'white',borderRadius:'12px',padding:'8px',textAlign:'center',border:'2px solid #00E676'}}><img src={pixQr} style={{width:'100%'}} alt="pix"/><div style={{color:'black',fontSize:'8px',fontWeight:900}}>PIX QR</div></div> : null}
{wifiQr? <div style={{background:'white',borderRadius:'12px',padding:'8px',textAlign:'center',border:'2px solid #FF9500'}}><img src={wifiQr} style={{width:'100%'}} alt="wifi"/><div style={{color:'black',fontSize:'8px',fontWeight:900}}>WIFI {f.wifi_ssid}</div><div style={{color:'black',fontSize:'8px'}}>Senha: {f.wifi}</div></div> : null}
</div>
<div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',border:'1px dashed #1a73e8',marginBottom:'8px'}}>
<b style={{fontSize:'10px',color:'#1a73e8'}}>MAPA EDITAVEL</b>
<input style={inp} placeholder="Link Maps https://maps.app.goo.gl/..." value={f.linkMaps} onChange={(e)=>{setF({...f,linkMaps:e.target.value})}}/>
<input type="file" accept="image/*" onChange={async (e)=>{const file=e.target.files?e.target.files[0]:null;if(file){const u=await upload(file,"mapas");if(u){setF({...f,mapaImg:u})}}}}/>
</div>
<button onClick={salvar} style={{background:'#00FF88',color:'black',padding:'18px',width:'100%',border:'none',borderRadius:'14px',fontWeight:900,marginTop:'12px',fontSize:'18px'}}>SALVAR FINAL - PIX E WIFI</button>
</div>
<div style={{width:'50%',background:'#000',display:'flex',justifyContent:'center',padding:'12px',overflowY:'auto',height:'100vh'}}>
<div style={{width:'380px',background:f.corFundo,borderRadius:'28px',overflow:'hidden',border:'1px solid #222'}}>
<div style={{position:'relative'}}>
{f.foto? (isVideo? <video src={f.foto} autoPlay muted loop playsInline style={{width:'100%',height:'320px',objectFit:'cover'}}/> : <div style={{height:'320px',backgroundImage:"url("+f.foto+")",backgroundSize:'cover',backgroundPosition:'center'}}/>) : <div style={{height:'180px',background:'linear-gradient(135deg,#00FF88,#0066FF)'}}/>}
{f.logo? <img src={f.logo} style={{width:f.logoSize,height:f.logoSize,borderRadius:'50%',border:'4px solid '+f.corFundo,background:'white',display:'block',position:'relative',zIndex:5,margin:f.logoPos==="esquerda"?'-46px 0 0 16px':f.logoPos==="direita"?'-46px 16px 0 auto':'-46px auto 0'}} alt="logo"/> : null}
</div>
<div style={{padding:'16px',textAlign:'center'}}>
<h2 style={{color:f.corFundo==="#FFFFFF"?"#111":"white",fontWeight:900,fontSize:'22px',marginTop:'8px'}}>{f.title}</h2>
<div style={{marginTop:'18px',display:'flex',flexDirection:'column',gap:'12px'}}>
{f.wpp? <div style={{background:'#25D366',padding:'18px',borderRadius:'20px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}><span style={{fontWeight:900,color:'white'}}>WhatsApp</span></div> : null}
{f.insta? <div style={{background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',padding:'18px',borderRadius:'20px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}><span style={{fontWeight:900,color:'white'}}>Instagram</span></div> : null}
{f.pix? <div style={{background:'white',borderRadius:'16px',padding:'10px',border:'2px solid #00E676'}}><img src={pixQr} style={{width:'100px',margin:'0 auto',display:'block'}} alt="pix"/><div style={{color:'black',fontSize:'10px',fontWeight:900}}>PIX: {f.pix}</div></div> : null}
{f.wifi? <div style={{background:'white',borderRadius:'16px',padding:'10px',border:'2px solid #FF9500'}}><img src={wifiQr} style={{width:'100px',margin:'0 auto',display:'block'}} alt="wifi"/><div style={{color:'black',fontSize:'10px',fontWeight:900}}>WIFI Senha: {f.wifi}</div></div> : null}
{f.linkMaps? <div style={{background:'white',borderRadius:'16px',overflow:'hidden',border:'2px solid #1a73e8'}}><div style={{padding:'6px',color:'#1a73e8',fontWeight:900,fontSize:'10px'}}>Localização</div><img src={f.mapaImg||"https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Google_Maps_icon_%282020%29.svg/500px-Google_Maps_icon_%282020%29.svg.png"} style={{width:'100%',height:'110px',objectFit:'contain',background:'#E8F0FE'}} alt="mapa"/><div style={{background:'#1a73e8',color:'white',padding:'10px',fontWeight:900,fontSize:'11px'}}>Ver no Maps</div></div> : null}
</div>
</div>
</div>
</div>
</div>
)
}
