import { supabase } from "@/lib/supabase"

function getYouTubeId(url:string){
if(!url) return null
try{
const u = new URL(url)
if(u.hostname.includes('youtu.be')) return u.pathname.slice(1)
if(u.searchParams.get('v')) return u.searchParams.get('v')
const parts = u.pathname.split('/')
return parts.pop() || null
}catch{return null}
}

export default async function Page({params}:{params:{slug:string}}){
const {data} = await supabase.from('biosites').select('*').eq('slug',params.slug).single()
if(!data) return <div style={{background:'#080808',color:'white',padding:'40px'}}>Loja não encontrada</div>

const ytId = getYouTubeId(data.video_url)
const btnBase = {display:'flex',justifyContent:'space-between',alignItems:'center',padding:'18px 20px',background:'rgba(255,255,255,0.06)',backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'16px',color:'white',textDecoration:'none',marginBottom:'12px',fontWeight:600,transition:'all 0.2s'} as any
const btnGreen = {...btnBase,background:'#00C851',border:'none',boxShadow:'0 4px 15px rgba(0,200,81,0.3)',fontWeight:800}

return(
<div style={{background:'#080808',minHeight:'100vh',color:'white',fontFamily:'system-ui'}}>
{/* CAPA */}
{data.foto_url && <div style={{width:'100%',height:'220px',background:`url(${data.foto_url}) center/cover`,position:'relative'}}><div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom, transparent 0%, #080808 100%)'}}/></div>}

<div style={{maxWidth:'420px',margin:'0 auto',padding:'0 20px 40px',marginTop:data.foto_url ? '-60px' : '40px',position:'relative',zIndex:2}}>

{/* LOGO */}
{data.logo_url ? <img src={data.logo_url} style={{width:'90px',height:'90px',borderRadius:'50%',border:'4px solid #080808',objectFit:'cover',margin:'0 auto',display:'block',boxShadow:'0 8px 20px rgba(0,0,0,0.5)'}}/> : <div style={{width:'90px',height:'90px',borderRadius:'50%',background:'#1A1A1A',border:'4px solid #080808',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'40px',margin:'0 auto'}}>🏪</div>}

<h1 style={{textAlign:'center',fontWeight:900,fontSize:'24px',margin:'16px 0 6px',letterSpacing:'-0.5px'}}>{data.title}</h1>
<p style={{textAlign:'center',opacity:0.5,fontSize:'13px',marginBottom:'22px'}}>Toque nos botões abaixo 👇</p>

{/* YOUTUBE */}
{ytId && <div style={{width:'100%',aspectRatio:'16/9',borderRadius:'16px',overflow:'hidden',marginBottom:'20px',boxShadow:'0 10px 30px rgba(0,0,0,0.5)'}}><iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${ytId}`} frameBorder="0" allowFullScreen style={{border:'none'}}/></div>}

{/* BOTÕES */}
{data.instagram && <a href={data.instagram} target="_blank" style={btnBase}><span>📸 Instagram</span><span>→</span></a>}
{data.whatsapp && <a href={`https://wa.me/55${data.whatsapp}`} target="_blank" style={btnGreen}><span>💬 WhatsApp</span><span>→</span></a>}
{data.servicos && <a href={data.servicos} target="_blank" style={btnBase}><span>⭐ Nossos Serviços</span><span>→</span></a>}
{data.agendamento && <a href={data.agendamento} target="_blank" style={btnBase}><span>📅 Agendar Horário</span><span>→</span></a>}
{data.pix_key && <a href={data.pix_key} target="_blank" style={btnGreen}><span>💳 Pague com Pix</span><span>→</span></a>}
<div style={btnBase}><span>📶 Wi-Fi Grátis - Senha: {data.wifi_password || 'pergunte no balcão'}</span><span>→</span></div>
{data.localizacao && <a href={`https://maps.google.com/?q=${data.localizacao}`} target="_blank" style={btnBase}><span>📍 Ver no Mapa</span><span>→</span></a>}

<p style={{textAlign:'center',opacity:0.3,fontSize:'11px',marginTop:'28px',letterSpacing:'1px'}}>FEITO COM VISION LOCAL</p>
</div>
</div>
)
}
