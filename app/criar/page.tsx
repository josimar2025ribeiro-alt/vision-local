export const dynamic = 'force-dynamic'
export const revalidate = 0
import { supabase } from "../../lib/supabase"

function getEmbedUrl(url){
if(!url){return ""}
if(url.indexOf("/d/embed")!==-1){return url}
if(url.indexOf("mid=")!==-1){
try{
const mid=url.split("mid=")[1].split("&")[0]
return "https://www.google.com/maps/d/embed?mid="+mid
}catch(e){return url}
}
if(url.indexOf("/maps/d/")!==-1){
try{
const parts=url.split("/maps/d/")
const id=parts[1].split("/")[0]
return "https://www.google.com/maps/d/embed?mid="+id
}catch(e){return url}
}
return "https://maps.google.com/maps?q="+encodeURIComponent(url)+"&z=15&output=embed"
}

export default async function Page(props:any){
const slug=decodeURIComponent(props.params.slug).toLowerCase().replace(/[^a-z0-9-]+/g,"-").trim()
const res=await supabase.from("biosites").select("*").eq("slug", slug).single()
const data=res.data
if(!data){return <div style={{minHeight:'100vh',background:'#000',color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>Loja {slug} nao encontrada</div>}
const isVideo=data.foto_url&&String(data.foto_url).includes(".mp4")
let pixQr=null
let wifiQr=null
if(data.pix_key){pixQr="https://quickchart.io/qr?text="+encodeURIComponent(String(data.pix_key))+"&size=400"}
if(data.wifi_password){const txt="WIFI:T:WPA;S:"+(data.wifi_ssid||data.title)+";P:"+data.wifi_password+";;";wifiQr="https://quickchart.io/qr?text="+encodeURIComponent(txt)+"&size=400"}
const logoSize=data.logo_size||92
const logoPos=data.logo_pos||"centro"

return(
<div style={{minHeight:'100vh',background:'#080808',display:'flex',justifyContent:'center',padding:'16px'}}>
<div style={{width:'100%',maxWidth:'420px',background:'#121212',borderRadius:'28px',overflow:'hidden',border:'1px solid #222'}}>
<div style={{position:'relative'}}>
{data.foto_url? (isVideo? <video src={data.foto_url} autoPlay muted loop playsInline style={{width:'100%',height:'360px',objectFit:'cover'}}/> : <div style={{height:'360px',backgroundImage:"url("+data.foto_url+")",backgroundSize:'cover',backgroundPosition:'center'}}/>) : <div style={{height:'180px',background:'linear-gradient(135deg,#00FF88,#0066FF)'}}/>}
{data.logo_url? <img src={data.logo_url} style={{width:logoSize,height:logoSize,borderRadius:'50%',border:'4px solid #121212',background:'white',display:'block',position:'relative',zIndex:5,margin:logoPos==="esquerda"?'-46px 0 0 16px':logoPos==="direita"?'-46px 16px 0 auto':'-46px auto 0'}} alt="logo"/> : null}
</div>
<div style={{padding:'20px',textAlign:'center'}}>
<h1 style={{color:'white',fontWeight:900,fontSize:'24px',marginTop:'10px'}}>{data.title}</h1>
<div style={{marginTop:'20px',display:'flex',flexDirection:'column',gap:'14px'}}>
{data.whatsapp? <a href={"https://wa.me/"+String(data.whatsapp).replace(/\D/g,'')} style={{background:'#25D366',padding:'18px',borderRadius:'20px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',textDecoration:'none'}}><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style={{width:'28px',height:'28px'}} alt="wa"/><span style={{fontWeight:900,color:'white',fontSize:'16px'}}>WhatsApp</span></a> : null}
{data.instagram? <a href={"https://instagram.com/"+String(data.instagram).replace('@','')} style={{background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',padding:'18px',borderRadius:'20px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',textDecoration:'none'}}><img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" style={{width:'24px',height:'24px'}} alt="insta"/><span style={{fontWeight:900,color:'white'}}>Instagram</span></a> : null}
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
{pixQr? <div style={{background:'white',padding:'16px',borderRadius:'20px',border:'3px solid #00E676'}}><div style={{color:'black',fontWeight:900,fontSize:'11px'}}>PIX QR CODE</div><img src={pixQr} style={{width:'100%',marginTop:'8px'}} alt="pix"/><div style={{color:'black',fontSize:'10px',background:'#E0FFE0',padding:'6px',borderRadius:'6px',marginTop:'6px',wordBreak:'break-all'}}>{data.pix_key}</div></div> : null}
{wifiQr? <div style={{background:'white',padding:'16px',borderRadius:'20px',border:'3px solid #FF9500'}}><div style={{color:'black',fontWeight:900,fontSize:'11px'}}>WIFI QR CODE</div><img src={wifiQr} style={{width:'100%',marginTop:'8px'}} alt="wifi"/><div style={{background:'#FFF3E0',padding:'8px',borderRadius:'8px',marginTop:'8px'}}><div style={{color:'black',fontSize:'11px'}}>Rede: <b>{data.wifi_ssid||data.title}</b></div><div style={{color:'black',fontWeight:900}}>Senha: {data.wifi_password}</div></div></div> : null}
</div>
{data.localizacao? <div style={{background:'white',borderRadius:'20px',overflow:'hidden',border:'2px solid #1a73e8'}}><div style={{padding:'10px',fontWeight:900,color:'#1a73e8',fontSize:'12px'}}>Localização no Maps</div><iframe src={getEmbedUrl(data.localizacao)} style={{width:'100%',height:'220px',border:'none'}} loading="lazy" allowFullScreen title="maps"/><a href={data.localizacao} target="_blank" style={{display:'block',padding:'12px',fontWeight:900,color:'#1a73e8',textDecoration:'none',background:'#E8F0FE',textAlign:'center'}}>Abrir no Google Maps</a></div> : null}
</div>
</div>
</div>
</div>
)
}
