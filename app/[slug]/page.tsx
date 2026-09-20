export const dynamic = 'force-dynamic'
export const revalidate = 0
import { supabase } from "../../lib/supabase"

export default async function Page(props:any){
const slug = decodeURIComponent(props.params.slug).toLowerCase().replace(/[^a-z0-9-]+/g,"-").trim()
const result = await supabase.from("biosites").select("*").eq("slug", slug).single()
const data = result.data
if(!data){
return (
<div style={{minHeight:'100vh',background:'#000',color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>
<div>Loja {slug} nao encontrada</div>
</div>
)
}
const isVideo = data.foto_url && String(data.foto_url).indexOf('mp4')>-1
const pixKey = data.pix_key ? String(data.pix_key) : ""
const wifiPass = data.wifi_password ? String(data.wifi_password) : ""
const wifiSsid = data.wifi_ssid ? String(data.wifi_ssid) : String(data.title)
let pixQr = null
let wifiQr = null
if(pixKey){pixQr = "https://quickchart.io/qr?text="+encodeURIComponent(pixKey)+"&size=400"}
if(wifiPass){const txt = "WIFI:T:WPA;S:"+wifiSsid+";P:"+wifiPass+";;";wifiQr = "https://quickchart.io/qr?text="+encodeURIComponent(txt)+"&size=400"}

return(
<div style={{minHeight:'100vh',background:'#080808',display:'flex',justifyContent:'center',padding:'16px'}}>
<div style={{width:'100%',maxWidth:'420px',background:'#121212',borderRadius:'28px',overflow:'hidden',border:'1px solid #222'}}>
<div style={{position:'relative'}}>
{data.foto_url ? (isVideo ? <video src={data.foto_url} autoPlay muted loop playsInline style={{width:'100%',height:'280px',objectFit:'cover'}}/> : <div style={{height:'280px',backgroundImage:"url("+data.foto_url+")",backgroundSize:'cover',backgroundPosition:'center'}}/>) : <div style={{height:'120px',background:'linear-gradient(135deg,#00E676,#00B0FF)'}}/>}
{data.logo_url ? <img src={data.logo_url} style={{width:'86px',height:'86px',borderRadius:'50%',border:'4px solid #121212',background:'white',margin:'-43px auto 0',display:'block',position:'relative',zIndex:2}} alt="logo"/> : null}
</div>
<div style={{padding:'20px',textAlign:'center'}}>
<h1 style={{color:'white',fontWeight:900,fontSize:'22px'}}>{data.title}</h1>
{data.capa_desc ? <div style={{color:'#AAA',fontSize:'13px'}}>{data.capa_desc}</div> : null}
<div style={{marginTop:'20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
{pixQr ? <div style={{background:'white',borderRadius:'20px',padding:'14px',textAlign:'center',border:'3px solid #00E676'}}><div style={{color:'black',fontWeight:900,fontSize:'11px'}}>PIX QR CODE</div><img src={pixQr} style={{width:'100%',marginTop:'8px'}} alt="pix"/><div style={{color:'black',fontSize:'10px',fontWeight:700,marginTop:'6px',wordBreak:'break-all'}}>{data.pix_key}</div></div> : null}
{wifiQr ? <div style={{background:'white',borderRadius:'20px',padding:'14px',textAlign:'center',border:'3px solid #FF9500'}}><div style={{color:'black',fontWeight:900,fontSize:'11px'}}>WIFI QR CODE</div><img src={wifiQr} style={{width:'100%',marginTop:'8px'}} alt="wifi"/><div style={{background:'#FFF3E0',padding:'8px',borderRadius:'8px',marginTop:'8px'}}><div style={{color:'black',fontSize:'11px'}}>Rede: <b>{wifiSsid}</b></div><div style={{color:'black',fontWeight:900}}>Senha: {wifiPass}</div></div><div style={{fontSize:'9px',color:'#666',marginTop:'4px'}}>QR em cima - Senha embaixo</div></div> : null}
</div>
<div style={{marginTop:'20px',display:'flex',flexDirection:'column',gap:'12px'}}>
{data.whatsapp ? <a href={"https://wa.me/"+String(data.whatsapp).replace(/\D/g,'')} style={{background:'#25D366',padding:'18px',borderRadius:'16px',color:'white',fontWeight:900,textAlign:'center',textDecoration:'none'}}>WhatsApp</a> : null}
{data.localizacao ? <a href={data.localizacao} style={{background:'white',padding:'18px',borderRadius:'16px',color:'#1a73e8',fontWeight:900,textAlign:'center',textDecoration:'none'}}>Ver no Maps</a> : null}
</div>
</div>
</div>
</div>
)
}
