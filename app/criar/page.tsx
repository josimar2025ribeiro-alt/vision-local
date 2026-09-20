// @ts-nocheck
"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"
export default function Criar(){
const [f,setF]=useState({title:"Minha Loja",slug:"minha-loja",logo:"",foto:"",wpp:"5519999999999",insta:"minhaloja",pix:"",wifi_ssid:"",wifi:"",linkMaps:"",mapaImg:"",logoSize:92,logoPos:"centro",corFundo:"#121212"})
const [up,setUp]=useState("")
async function upload(file,pasta){
setUp("Enviando "+file.name)
const nome=pasta+"/"+Date.now()+"-"+file.name
const r=await supabase.storage.from("midias").upload(nome,file)
setUp("")
if(r.error){alert(r.error.message);return null}
return supabase.storage.from("midias").getPublicUrl(nome).data.publicUrl
}
async function salvar(){
const slugFinal=f.slug.toLowerCase().replace(/[^a-z0-9-]+/g,"-").trim()
setUp("Salvando Pix e WiFi...")
const {error}=await supabase.from("biosites").upsert([{
title:f.title,slug:slugFinal,whatsapp:f.wpp,instagram:f.insta,
pix_key:f.pix,wifi_ssid:f.wifi_ssid,wifi_password:f.wifi,
localizacao:f.linkMaps,mapa_imagem_url:f.mapaImg,
logo_url:f.logo,foto_url:f.foto,logo_pos:f.logoPos,logo_size:f.logoSize,cor_fundo:f.corFundo
}],{onConflict:'slug'})
setUp("")
if(error){alert(error.message);return}
location.href="/"+slugFinal
}
const inp={padding:'12px',background:'#111',border:'1px solid #333',borderRadius:'10px',color:'white',width:'100%',marginBottom:'6px'} as any
let pixQr=null;let wifiQr=null
if(f.pix){pixQr="https://quickchart.io/qr?text="+encodeURIComponent(f.pix)+"&size=300"}
if(f.wifi){wifiQr="https://quickchart.io/qr?text="+encodeURIComponent("WIFI:T:WPA;S:"+f.wifi_ssid+";P:"+f.wifi+";;")+"&size=300"}
const isVideo=f.foto&&f.foto.includes(".mp4")
return(
<div style={{display:'flex',minHeight:'100vh',background:'#0A0A0A',color:'white'}}>
<div style={{width:'50%',padding:'14px',borderRight:'1px solid #222',overflowY:'auto',height:'100vh'}}>
{up? <div style={{background:'#00FF88',color:'black',padding:'8px',borderRadius:'8px',fontWeight:900,marginBottom:'8px'}}>{up}</div> : null}
<input style={inp} value={f.title} onChange={e=>setF({...f,title:e.target.value})} placeholder="Nome loja"/>
<input style={inp} value={f.slug} onChange={e=>setF({...f,slug:e.target.value})} placeholder="Slug"/>
<div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',border:'1px dashed #00FF88',marginBottom:'8px'}}>
<b style={{fontSize:'10px'}}>LOGO TAMANHO E POSIÇÃO</b>
<input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"logos");if(u)setF({...f,logo:u})}}}/>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'6px',marginTop:'8px'}}>
<button onClick={()=>setF({...f,logoPos:"centro"})} style={{padding:'8px',borderRadius:'8px',background:f.logoPos==="centro"?"#00FF88":"#222",color:f.logoPos==="centro"?"black":"white",fontSize:'10px'}}>Centro</button>
<button onClick={()=>setF({...f,logoPos:"esquerda"})} style={{padding:'8px',borderRadius:'8px',background:f.logoPos==="esquerda"?"#00FF88":"#222",color:f.logoPos==="esquerda"?"black":"white",fontSize:'10px'}}>Esq</button>
<button onClick={()=>setF({...f,logoPos:"direita"})} style={{padding:'8px',borderRadius:'8px',background:f.logoPos==="direita"?"#00FF88":"#222",color:f.logoPos==="direita"?"black":"white",fontSize:'10px'}}>Dir</button>
</div>
<div style={{marginTop:'8px'}}><label style={{fontSize:'10px'}}>Tamanho {f.logoSize}px</label><input type="range" min="50" max="150" value={f.logoSize} onChange={e=>setF({...f,logoSize:parseInt(e.target.value)})} style={{width:'100%'}}/></div>
</div>
<input style={inp} value={f.wpp} onChange={e=>setF({...f,wpp:e.target.value})} placeholder="WhatsApp"/>
<input style={inp} value={f.insta} onChange={e=>setF({...f,insta:e.target.value})} placeholder="Instagram"/>
<input style={inp} value={f.pix} onChange={e=>setF({...f,pix:e.target.value})} placeholder="Chave Pix - AGORA SALVA"/>
<input style={inp} value={f.wifi_ssid} onChange={e=>setF({...f,wifi_ssid:e.target.value})} placeholder="WiFi Nome"/>
<input style={inp} value={f.wifi} onChange={e=>setF({...f,wifi:e.target.value})} placeholder="WiFi Senha - AGORA SALVA"/>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginBottom:'8px'}}>
{pixQr? <div style={{background:'white',borderRadius:'12px',padding:'8px',textAlign:'center'}}><img src={pixQr} style={{width:'100%'}} alt="pix"/><div style={{color:'black',fontSize:'8px',fontWeight:900}}>PIX</div></div> : null}
{wifiQr? <div style={{background:'white',borderRadius:'12px',padding:'8px',textAlign:'center'}}><img src={wifiQr} style={{width:'100%'}} alt="wifi"/><div style={{color:'black',fontSize:'8px',fontWeight:900}}>WIFI {f.wifi}</div></div> : null}
</div>
<input style={inp} value={f.linkMaps} onChange={e=>setF({...f,linkMaps:e.target.value})} placeholder="Link Maps"/>
<input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"mapas");if(u)setF({...f,mapaImg:u})}}}/>
<button onClick={salvar} style={{background:'#00FF88',color:'black',padding:'18px',width:'100%',border:'none',borderRadius:'14px',fontWeight:900,marginTop:'12px'}}>SALVAR FINAL</button>
</div>
<div style={{width:'50%',background:'#000',display:'flex',justifyContent:'center',padding:'12px'}}>
<div style={{width:'380px',background:f.corFundo,borderRadius:'28px',overflow:'hidden',border:'1px solid #222'}}>
<div style={{position:'relative'}}>
{f.foto? (isVideo? <video src={f.foto} autoPlay muted loop playsInline style={{width:'100%',height:'320px',objectFit:'cover'}}/> : <div style={{height:'320px',backgroundImage:"url("+f.foto+")",backgroundSize:'cover',backgroundPosition:'center'}}/>) : <div style={{height:'180px',background:'linear-gradient(135deg,#00FF88,#0066FF)'}}/>}
{f.logo? <img src={f.logo} style={{width:f.logoSize,height:f.logoSize,borderRadius:'50%',border:'4px solid '+f.corFundo,background:'white',display:'block',position:'relative',zIndex:5,margin:f.logoPos==="esquerda"?'-46px 0 0 16px':f.logoPos==="direita"?'-46px 16px 0 auto':'-46px auto 0'}} alt="logo"/> : null}
</div>
<div style={{padding:'16px',textAlign:'center'}}>
<h2 style={{color:f.corFundo==="#FFFFFF"?"#111":"white",fontWeight:900}}>{f.title}</h2>
<div style={{marginTop:'18px',display:'flex',flexDirection:'column',gap:'12px'}}>
{f.pix? <div style={{background:'white',borderRadius:'16px',padding:'10px',border:'2px solid #00E676'}}><img src={pixQr} style={{width:'100px',margin:'0 auto',display:'block'}} alt="pix"/><div style={{color:'black',fontSize:'10px',fontWeight:900}}>PIX {f.pix}</div></div> : null}
{f.wifi? <div style={{background:'white',borderRadius:'16px',padding:'10px',border:'2px solid #FF9500'}}><img src={wifiQr} style={{width:'100px',margin:'0 auto',display:'block'}} alt="wifi"/><div style={{color:'black',fontSize:'10px',fontWeight:900}}>WIFI Senha: {f.wifi}</div></div> : null}
</div>
</div>
</div>
</div>
</div>
)
}
