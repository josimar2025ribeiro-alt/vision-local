export const dynamic = 'force-dynamic'
export const revalidate = 0
import { supabase } from "../../lib/supabase"

export default async function Page(props:any){
const slug=decodeURIComponent(props.params.slug).toLowerCase().replace(/[^a-z0-9-]+/g,"-").trim()
const res=await supabase.from("biosites").select("*").eq("slug", slug).single()
const data=res.data
if(!data){return <div style={{minHeight:'100vh',background:'#000',color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>Loja {slug} nao encontrada</div>}
const isVideo=data.foto_url&&String(data.foto_url).indexOf(".mp4")!==-1
let pixQr=null
let wifiQr=null
if(data.pix_key){pixQr="https://quickchart.io/qr?text="+encodeURIComponent(String(data.pix_key))+"&size=400"}
if(data.wifi_password){const txt="WIFI:T:WPA;S:"+(data.wifi_ssid||data.title)+";P:"+data.wifi_password+";;";wifiQr="https://quickchart.io/qr?text="+encodeURIComponent(txt)+"&size=400"}

return(
<div style={{minHeight:'100vh',background:'#080808',display:'flex',justifyContent:'center',padding:'16px'}}>
<div style={{width:'100%',maxWidth:'420px',background:'#121212',borderRadius:'28px',overflow:'hidden',border:'1px solid #222'}}>
<div style={{position:'relative'}}>
{data.foto_url? (isVideo? <video src={data.foto_url} autoPlay muted loop playsInline style={{width:'100%',height:'340px',objectFit:'cover'}}/> : <div style={{height:'340px',backgroundImage:"url("+data.foto_url+")",backgroundSize:'cover',backgroundPosition:'center'}}/>) : <div style={{height:'180px',background:'linear-gradient(135deg,#00FF88,#0066FF)'}}/>}
{data.logo_url? <img src={data.logo_url} style={{width:'92px',height:'92px',borderRadius:'50%',border:'4px solid #121212',background:'white',margin:'-46px auto 0',display:'block',position:'relative',zIndex:5}} alt="logo"/> : null}
</div>
<div style={{padding:'20px',textAlign:'center'}}>
<h1 style={{color:'white',fontWeight:900,fontSize:'24px',marginTop:'10px'}}>{data.title}</h1>
{data.capa_titulo? <div style={{color:'#00FF88',fontWeight:800}}>{data.capa_titulo}</div> : null}
{data.capa_desc? <div style={{color:'#AAA',fontSize:'13px'}}>{data.capa_desc}</div> : null}
<div style={{marginTop:'22px',display:'flex',flexDirection:'column',gap:'16px'}}>
{data.whatsapp? <a href={"https://wa.me/"+String(data.whatsapp).replace(/\D/g,'')} style={{background:'#25D366',padding:'22px',borderRadius:'22px',fontWeight:900,fontSize:'20px',color:'white',textDecoration:'none',display:'block'}}>WhatsApp</a> : null}
{data.instagram? <a href={"https://instagram.com/"+String(data.instagram).replace('@','')} style={{background:'linear-gradient(45deg,#f09433,#dc2743,#bc1888)',padding:'22px',borderRadius:'22px',fontWeight:900,fontSize:'18px',color:'white',textDecoration:'none',display:'block'}}>Instagram {data.instagram}</a> : null}
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
{pixQr? <div style={{background:'white',padding:'16px',borderRadius:'20px',border:'3px solid #00E676'}}><div style={{color:'black',fontWeight:900,fontSize:'11px'}}>PIX QR CODE</div><img src={pixQr} style={{width:'100%',marginTop:'8px'}} alt="pix"/><div style={{color:'black',fontSize:'10px',background:'#E0FFE0',padding:'6px',borderRadius:'6px',marginTop:'6px',wordBreak:'break-all'}}>{data.pix_key}</div></div> : null}
{wifiQr? <div style={{background:'white',padding:'16px',borderRadius:'20px',border:'3px solid #FF9500'}}><div style={{color:'black',fontWeight:900,fontSize:'11px'}}>WIFI QR CODE</div><img src={wifiQr} style={{width:'100%',marginTop:'8px'}} alt="wifi"/><div style={{background:'#FFF3E0',padding:'8px',borderRadius:'8px',marginTop:'8px'}}><div style={{color:'black',fontSize:'11px'}}>Rede: <b>{data.wifi_ssid||data.title}</b></div><div style={{color:'black',fontWeight:900}}>Senha: {data.wifi_password}</div></div></div> : null}
</div>
{data.localizacao? <a href={data.localizacao} style={{background:'white',padding:'20px',borderRadius:'20px',fontWeight:900,color:'#1a73e8',textDecoration:'none',display:'block',fontSize:'18px'}}>Ver no Maps</a> : null}
</div>
</div>
</div>
</div>
)
}
