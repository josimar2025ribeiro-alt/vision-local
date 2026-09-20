export const dynamic = 'force-dynamic'
export const revalidate = 0
import { supabase } from "../../lib/supabase"

export default async function Page({ params }: { params: { slug: string } }) {
const slug = decodeURIComponent(params.slug).toLowerCase().replace(/[^a-z0-9-]+/g,"-").trim()
const { data } = await supabase.from("biosites").select("*").eq("slug", slug).single()
if(!data){return <div style={{minHeight:'100vh',background:'#000',color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>Loja {slug} nao encontrada</div>}
const isVideo = data.foto_url&&String(data.foto_url).includes('mp4')
const pixQr = data.pix_key?`https://quickchart.io/qr?text=${encodeURIComponent(String(data.pix_key))}&size=400`:null
const wifiQr = data.wifi_password?`https://quickchart.io/qr?text=${encodeURIComponent(`WIFI:T:WPA;S:${data.wifi_ssid||data.title};P:${data.wifi_password};;`)}&size=400`:null

return(
<div style={{minHeight:'100vh',background:'#080808',display:'flex',justifyContent:'center',padding:'16px'}}>
<div style={{width:'100%',maxWidth:'420px',background:'#121212',borderRadius:'28px',overflow:'hidden',border:'1px solid #222'}}>
<div style={{position:'relative'}}>
{data.foto_url?(isVideo?<video src={data.foto_url} autoPlay muted loop playsInline style={{width:'100%',height:'280px',objectFit:'cover'}}/>:<div style={{height:'280px',background:`url(${data.foto_url}) center/cover`}}/>):<div style={{height:'120px',background:'linear-gradient(135deg,#00E676,#00B0FF)`}}/>}
{data.logo_url&&(data.logo_pos==='esquerda'?<img src={data.logo_url} style={{width:'86px',height:'86px',borderRadius:'50%',border:'4px solid #121212',background:'white',margin:'-40px 0 0 16px',display:'block'}} alt="logo"/>:data.logo_pos==='direita'?<img src={data.logo_url} style={{width:'86px',height:'86px',borderRadius:'50%',border:'4px solid #121212',background:'white',margin:'-40px 16px 0 auto',display:'block'}} alt="logo"/>:<img src={data.logo_url} style={{width:'86px',height:'86px',borderRadius:'50%',border:'4px solid #121212',background:'white',margin:'-43px auto 0',display:'block'}} alt="logo"/>)}
</div>
<div style={{padding:'20px',textAlign:'center'}}>
<h1 style={{color:data.cor_titulo||'white',fontWeight:900,fontSize:'22px'}}>{data.title}</h1>
{data.capa_desc&&<div style={{color:data.cor_desc||'#AAA',fontSize:'13px'}}>{data.capa_desc}</div>}
<div style={{marginTop:'20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
{pixQr&&<div style={{background:'white',borderRadius:'20px',padding:'14px',textAlign:'center',border:'3px solid #00E676'}}><div style={{color:'black',fontWeight:900,fontSize:'11px'}}>PIX QR CODE</div><img src={pixQr} style={{width:'100%',marginTop:'8px'}} alt="pix"/><div style={{color:'black',fontSize:'10px',fontWeight:700,marginTop:'6px',wordBreak:'break-all'}}>{data.pix_key}</div></div>}
{wifiQr&&<div style={{background:'white',borderRadius:'20px',padding:'14px',textAlign:'center',border:'3px solid #FF9500'}}><div style={{color:'black',fontWeight:900,fontSize:'11px'}}>WIFI QR CODE</div><img src={wifiQr} style={{width:'100%',marginTop:'8px'}} alt="wifi"/><div style={{background:'#FFF3E0',padding:'8px',borderRadius:'8px',marginTop:'8px'}}><div style={{color:'black',fontSize:'11px'}}>Rede: <b>{data.wifi_ssid||data.title}</b></div><div style={{color:'black',fontWeight:900}}>Senha: {data.wifi_password}</div></div></div>}
</div>
<div style={{marginTop:'20px',display:'flex',flexDirection:'column',gap:'12px'}}>
{data.whatsapp&&<a href={`https://wa.me/${String(data.whatsapp).replace(/\D/g,'')}`} style={{background:'#25D366',padding:'18px',borderRadius:'16px',color:'white',fontWeight:900,textAlign:'center',textDecoration:'none'}}>WhatsApp</a>}
</div>
</div>
</div>
</div>
)
}
