import { supabase } from "@/lib/supabase"
export default async function Page({params}:{params:{slug:string}}){
const {data} = await supabase.from('biosites').select('*').eq('slug',params.slug).single()
if(!data) return <div style={{background:'#0A0A0A',color:'white',padding:'40px'}}>Não encontrado</div>
const btn = {display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px',background:'#111',border:'1px solid #222',borderRadius:'16px',color:'white',textDecoration:'none',marginBottom:'12px'} as any
const btnVerde = {...btn,background:'#00C851',border:'none',fontWeight:700}
return(
<div style={{background:'#0A0A0A',minHeight:'100vh',color:'white',padding:'24px',display:'flex',flexDirection:'column',alignItems:'center'}}>
<div style={{width:'100%',maxWidth:'400px'}}>
<div style={{width:'80px',height:'80px',background:'#1A1A1A',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',fontSize:'40px'}}>🏪</div>
<h1 style={{textAlign:'center',fontWeight:900,fontSize:'22px',marginBottom:'24px'}}>{data.title}</h1>
{data.instagram && <a href={data.instagram} target="_blank" style={btn}><span>📸 Instagram</span><span>→</span></a>}
{data.whatsapp && <a href={`https://wa.me/55${data.whatsapp}`} target="_blank" style={btnVerde}><span>💬 WhatsApp</span><span>→</span></a>}
{data.servicos && <a href={data.servicos} target="_blank" style={btn}><span>⭐ Nossos Serviços</span><span>→</span></a>}
{data.agendamento && <a href={data.agendamento} target="_blank" style={btn}><span>📅 Agendar Horário</span><span>→</span></a>}
{data.pix_key && <a href={data.pix_key} target="_blank" style={btnVerde}><span>💳 Pague com Pix</span><span>→</span></a>}
<a href="#" style={btn}><span>📶 Wi-Fi Grátis - Senha: {data.wifi_password}</span><span>→</span></a>
{data.localizacao && <a href={`https://maps.google.com/?q=${data.localizacao}`} target="_blank" style={btn}><span>📍 Ver no Mapa</span><span>→</span></a>}
<p style={{textAlign:'center',opacity:.4,fontSize:'12px',marginTop:'30px'}}>Feito com Vision Local</p>
</div></div>)
}
