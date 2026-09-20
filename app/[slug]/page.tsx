export const dynamic = 'force-dynamic'
export const revalidate = 0
import { supabase } from "../../lib/supabase"

export default async function Page({ params }: { params: { slug: string } }) {
const slug = decodeURIComponent(params.slug).toLowerCase().replace(/[^a-z0-9-]+/g,"-").trim()
const { data } = await supabase.from("biosites").select("*").eq("slug", slug).single()
if(!data){
return <div style={{minHeight:'100vh',background:'#000',color:'white',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}><div>Loja {slug} nao encontrada</div><a href="/criar" style={{color:'#00E676',marginTop:'10px'}}>Criar loja</a></div>
}
const youtubeId = data.youtube_topo? data.youtube_topo.split('v=')[1]?.split('&')[0] : 'vMzKWhcSMCY'
const pixQr = data.pix_key? `https://quickchart.io/qr?text=${encodeURIComponent(String(data.pix_key))}&size=400` : null
const wifiQr = data.wifi_password? `https://quickchart.io/qr?text=${encodeURIComponent(`WIFI:T:WPA;S:${data.wifi_ssid||data.title};P:${data.wifi_password};;`)}&size=400` : null

return(
<div style={{minHeight:'100vh',background:'#080808',display:'flex',justifyContent:'center'}}>
<div style={{width:'100%',maxWidth:'480px',background:'#0F0F0F',minHeight:'100vh'}}>
<div style={{height:'260px',background:'#000'}}>
<iframe src={`https://www.youtube.com/embed/${youtubeId}`} style={{width:'100%',height:'100%',border:'none'}} allowFullScreen title="video topo"/>
</div>
<div style={{padding:'20px',marginTop:'-30px',position:'relative',zIndex:2}}>
{data.logo_url && <img src={data.logo_url} style={{width:'88px',height:'88px',borderRadius:'50%',border:'4px solid #0F0F0F',background:'white',display:'block',margin:'0 auto'}} alt="logo"/>}
<h1 style={{color:'white',fontWeight:900,fontSize:'22px',textAlign:'center',marginTop:'12px'}}>{data.title}</h1>
<p style={{color:'#AAA',textAlign:'center',fontSize:'13px'}}>Energia Solar e Climatizacao</p>

<div style={{marginTop:'20px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
{pixQr && <div style={{background:'white',borderRadius:'20px',padding:'14px',textAlign:'center',border:'3px solid #00E676'}}><div style={{color:'black',fontWeight:900,fontSize:'11px'}}>PIX QR CODE</div><img src={pixQr} style={{width:'100%',marginTop:'8px'}} alt="pix qr"/><div style={{color:'black',fontSize:'10px',fontWeight:700,marginTop:'6px',wordBreak:'break-all'}}>{data.pix_key}</div></div>}
{wifiQr && <div style={{background:'white',borderRadius:'20px',padding:'14px',textAlign:'center',border:'3px solid #FF9500'}}><div style={{color:'black',fontWeight:900,fontSize:'11px'}}>WIFI QR CODE</div><img src={wifiQr} style={{width:'100%',marginTop:'8px'}} alt="wifi qr"/><div style={{background:'#FFF3E0',padding:'8px',borderRadius:'8px',marginTop:'8px'}}><div style={{color:'black',fontSize:'11px'}}>Rede: <b>{data.wifi_ssid||data.title}</b></div><div style={{color:'black',fontWeight:900}}>Senha: {data.wifi_password}</div></div><div style={{fontSize:'9px',color:'#666',marginTop:'4px'}}>QR em cima - Senha embaixo</div></div>}
</div>

<div style={{marginTop:'20px',display:'flex',flexDirection:'column',gap:'12px'}}>
{data.whatsapp && <a href={`https://wa.me/${String(data.whatsapp).replace(/\D/g,'')}`} style={{background:'#25D366',padding:'18px',borderRadius:'16px',color:'white',fontWeight:900,textAlign:'center',textDecoration:'none'}}>Fale no WhatsApp</a>}
{data.localizacao && <a href={data.localizacao} style={{background:'white',padding:'18px',borderRadius:'16px',color:'#1a73e8',fontWeight:900,textAlign:'center',textDecoration:'none'}}>Ver no Maps</a>}
<div style={{textAlign:'center',color:'#666',fontSize:'10px',marginTop:'12px'}}>@2025 {data.title}<br/>CNPJ: {data.pix_key}</div>
</div>
</div>
</div>
</div>
)
}
