import { supabase } from "@/lib/supabase"
function getYouTubeId(url:string){
if(!url) return null
try{
const u=new URL(url)
if(u.hostname.includes('youtu.be')) return u.pathname.slice(1)
if(u.searchParams.get('v')) return u.searchParams.get('v')
return u.pathname.split('/').pop()||null
}catch{return null}
}
export default async function Page({params}:{params:{slug:string}}){
const {data}=await supabase.from('biosites').select('*').eq('slug',params.slug).single()
if(!data) return <div style={{background:'#080808',color:'white',padding:'40px'}}>Não encontrado</div>
const ytId=getYouTubeId(data.video_url)
const btn={display:'flex',justifyContent:'space-between',alignItems:'center',padding:'18px 20px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'16px',color:'white',textDecoration:'none',marginBottom:'12px',fontWeight:600} as any
const btnG={...btn,background:'#00C851',border:'none',fontWeight:800} as any
return(
<div style={{background:'#080808',minHeight:'100vh',color:'white'}}>
{data.foto_url && <div style={{width:'100%',height:'220px',background:`url(${data.foto_url}) center/cover`,position:'relative'}}><div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom, transparent, #080808)'}}/></div>}
<div style={{maxWidth:'420px',margin:'0 auto',padding:'20px',marginTop:data.foto_url?'-60px':'40px',position:'relative'}}>
{data.logo_url?<img src={data.logo_url} style={{width:'90px',height:'90px',borderRadius:'50%',border:'4px solid #080808',objectFit:'cover',margin:'0 auto',display:'block'}}/>:<div style={{width:'90px',height:'90px',borderRadius:'50%',background:'#1A1A1A',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto',fontSize:'40px'}}>🏪</div>}
<h1 style={{textAlign:'center',fontWeight:900,fontSize:'22px',margin:'16px 0 6px'}}>{data.title}</h1>
<p style={{textAlign:'center',opacity:0.5,fontSize:'11px',marginBottom:'18px'}}>Toque nos botões abaixo 👇</p>
{ytId && <div style={{width:'100%',aspectRatio:'16/9',borderRadius:'16px',overflow:'hidden',marginBottom:'18px'}}><iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${ytId}`} frameBorder="0" allowFullScreen/></div>}
{data.instagram && <a href={data.instagram} target="_blank" style={btn}><span>📸 Instagram</span><span>→</span></a>}
{data.whatsapp && <a href={`https://wa.me/55${data.whatsapp}`} target="_blank" style={btnG}><span>💬 WhatsApp</span><span>→</span></a>}
{data.servicos && <a href={data.servicos} target="_blank" style={btn}><span>⭐ Nossos Serviços</span><span>→</span></a>}
{data.agendamento && <a href={data.agendamento} target="_blank" style={btn}><span>📅 Agendar Horário</span><span>→</span></a>}
{data.pix_key && <a href={data.pix_key} target="_blank" style={btnG}><span>💳 Pague com Pix</span><span>→</span></a>}
<div style={btn}><span>📶 Wi-Fi Grátis - Senha: {data.wifi_password||'...'}</span><span>→</span></div>
{data.localizacao && <a href={`https://maps.google.com/?q=${data.localizacao}`} target="_blank" style={btn}><span>📍 Ver no Mapa</span><span>→</span></a>}
<p style={{textAlign:'center',opacity:0.3,fontSize:'10px',marginTop:'24px'}}>FEITO COM VISION LOCAL</p>
</div></div>)
}
