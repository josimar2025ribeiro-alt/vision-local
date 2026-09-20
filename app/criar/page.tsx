// @ts-nocheck
"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"
export default function Criar(){
const [f,setF]=useState({title:"Minha Loja",slug:"minha-loja",logo:"",foto:"",wpp:"",insta:"",pix:"",wifi_ssid:"",wifi:"",linkMaps:"",mapaImg:"",logoSize:92,logoPos:"centro",corFundo:"#121212"})
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
setUp("Salvando...")
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
<b style={{fontSize:'10px'}}>CAPA DE FUNDO - VIDEO OU IMAGEM</b>
<input type="file" accept="image/*,video/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"capas");if(u)setF({...f,foto:u})}}}/>
{f.foto? <div style={{marginTop:'8px',height:'80px',borderRadius:'8px',overflow:'hidden'}}>{isVideo? <video src={f.foto} muted loop autoPlay playsInline style={{width:'100%',height:'100%',objectFit:'cover'}}/> : <img src={f.foto} style={{width:'100%',height:'100%',objectFit:'cover'}} alt="capa"/>}</div> : null}
</div>

<div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',border:'2px dashed #00FF88',marginBottom:'8px'}}>
<b style={{fontSize:'11px',color:'#00FF88'}}>LOGO TAMANHO E POSIÇÃO - VOLTOU 100%</b>
<input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"logos");if(u)setF({...f,logo:u})}}}/>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'6px',marginTop:'10px'}}>
<button onClick={()=>setF({...f,logoPos:"centro"})} style={{padding:'10px',borderRadius:'10px',background:f.logoPos==="centro"?"#00FF88":"#222",color:f.logoPos==="centro"?"black":"white",fontWeight:900}}>Centro</button>
<button onClick={()=>setF({...f,logoPos:"esquerda"})} style={{padding:'10px',borderRadius:'10px',background:f.logoPos==="esquerda"?"#00FF88":"#222",color:f.logoPos==="esquerda"?"black":"white",fontWeight:900}}>Esq</button>
<button onClick={()=>setF({...f,logoPos:"direita"})} style={{padding:'10px',borderRadius:'10px',background:f.logoPos==="direita"?"#00FF88":"#222",color:f.logoPos==="direita"?"black":"white",fontWeight:900}}>Dir</button>
</div>
<div style={{marginTop:'10px'}}><label style={{fontSize:'11px',fontWeight:900}}>Tamanho {f.logoSize}px</label><input type="range" min="50" max="180" value={f.logoSize} onChange={e=>setF({...f,logoSize:parseInt(e.target.value)})} style={{width:'100%'}}/></div>
</div>

<div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',border:'2px dashed #FFF',marginBottom:'8px'}}>
<b style={{fontSize:'11px'}}>CORES PROFISSIONAIS - VOLTOU 100%</b>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'6px',marginTop:'10px'}}>
<button onClick={()=>setF({...f,corFundo:"#121212"})} style={{padding:'12px',borderRadius:'10px',background:"#121212",border:f.corFundo==="#121212"?"3px solid #00FF88":"1px solid #333",color:'white',fontWeight:900}}>Preto Pro</button>
<button onClick={()=>setF({...f,corFundo:"#FFFFFF"})} style={{padding:'12px',borderRadius:'10px',background:"#FFF",border:f.corFundo==="#FFFFFF"?"3px solid #00FF88":"1px solid #333",color:'black',fontWeight:900}}>Branco Pro</button>
<button onClick={()=>setF({...f,corFundo:"#F5F5F5"})} style={{padding:'12px',borderRadius:'10px',background:"#F5F5F5",border:f.corFundo==="#F5F5F5"?"3px solid #00FF88":"1px solid #333",color:'black',fontWeight:900}}>Cinza Claro</button>
</div>
</div>

<input style={inp} value={f.wpp} onChange={e=>setF({...f,wpp:e.target.value})} placeholder="WhatsApp - ex: 5519999999999"/>
<input style={inp} value={f.insta} onChange={e=>setF({...f,insta:e.target.value})} placeholder="Instagram - ex: minhaloja"/>
<input style={inp} value={f.pix} onChange={e=>setF({...f,pix:e.target.value})} placeholder="Chave Pix"/>
<input style={inp} value={f.wifi_ssid} onChange={e=>setF({...f,wifi_ssid:e.target.value})} placeholder="WiFi Nome"/>
<input style={inp} value={f.wifi} onChange={e=>setF({...f,wifi:e.target.value})} placeholder="WiFi Senha"/>

<div style={{background:'#1A1A1A',padding:'10px',borderRadius:'12px',border:'1px dashed #1a73e8',marginBottom:'8px'}}>
<b style={{fontSize:'10px',color:'#1a73e8'}}>MAPA EDITAVEL</b>
<input style={inp} value={f.linkMaps} onChange={e=>setF({...f,linkMaps:e.target.value})} placeholder="Link Maps"/>
<input type="file" accept="image/*" onChange={async e=>{const file=e.target.files?.[0];if(file){const u=await upload(file,"mapas");if(u)setF({...f,mapaImg:u})}}}/>
</div>

<button onClick={salvar} style={{background:'#00FF88',color:'black',padding:'18px',width:'100%',border:'none',borderRadius:'14px',fontWeight:900,marginTop:'12px'}}>SALVAR FINAL</button>
</div>

<div style={{width:'50%',background:'#000',display:'flex',justifyContent:'center',padding:'12px',overflowY:'auto',height:'100vh'}}>
<div style={{width:'380px',background:f.corFundo,borderRadius:'28px',overflow:'hidden',border:'1px solid #222'}}>
<div style={{position:'relative'}}>
{f.foto? (isVideo? <video src={f.foto} autoPlay muted loop playsInline style={{width:'100%',height:'320px',objectFit:'cover'}}/> : <div style={{height:'320px',backgroundImage:"url("+f.foto+")",backgroundSize:'cover',backgroundPosition:'center'}}/>) : <div style={{height:'180px',background:'linear-gradient(135deg,#00FF88,#0066FF)'}}/>}
{f.logo? <img src={f.logo} style={{width:f.logoSize,height:f.logoSize,borderRadius:'50%',border:'4px solid '+f.corFundo,background:'white',display:'block',position:'relative',zIndex:5,margin:f.logoPos==="esquerda"?'-46px 0 0 16px':f.logoPos==="direita"?'-46px 16px 0 auto':'-46px auto 0'}} alt="logo"/> : null}
</div>
<div style={{padding:'16px',textAlign:'center'}}>
<h2 style={{color:f.corFundo==="#FFFFFF"?"#111":"white",fontWeight:900}}>{f.title}</h2>
<div style={{marginTop:'18px',display:'flex',flexDirection:'column',gap:'12px'}}>
{f.wpp? <div style={{background:'#25D366',padding:'14px',borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style={{width:'28px',height:'28px'}} alt="wa"/><span style={{fontWeight:900,color:'white'}}>WhatsApp</span></div> : null}
{f.insta? <div style={{background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',padding:'14px',borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}><img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" style={{width:'24px',height:'24px'}} alt="insta"/><span style={{fontWeight:900,color:'white'}}>Instagram</span></div> : null}
{f.pix? <div style={{background:'white',borderRadius:'16px',padding:'10px',border:'2px solid #00E676'}}><img src={pixQr} style={{width:'100px',margin:'0 auto',display:'block'}} alt="pix"/></div> : null}
{f.wifi? <div style={{background:'white',borderRadius:'16px',padding:'10px',border:'2px solid #FF9500'}}><img src={wifiQr} style={{width:'100px',margin:'0 auto',display:'block'}} alt="wifi"/></div> : null}
</div>
</div>
</div>
</div>
</div>
)
}
