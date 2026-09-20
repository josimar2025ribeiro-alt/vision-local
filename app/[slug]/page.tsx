export const dynamic = 'force-dynamic'
export const revalidate = 0
import { supabase } from "../../lib/supabase"

export default async function Page(props:any){
const slug=decodeURIComponent(props.params.slug).toLowerCase().replace(/[^a-z0-9-]+/g,"-").trim()
const res=await supabase.from("biosites").select("*").eq("slug", slug).single()
const data=res.data
if(!data){return <div style={{minHeight:'100vh',background:'#000',color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>Loja {slug} nao encontrada</div>}
const isVideo=data.foto_url&&String(data.foto_url).includes(".mp4")
const logoSize=data.logo_size||92
const logoPos=data.logo_pos||"centro"
const mapsLink=data.localizacao?"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(String(data.localizacao)):""

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
{data.localizacao? <a href={mapsLink} target="_blank" style={{background:'white',borderRadius:'20px',overflow:'hidden',border:'2px solid #1a73e8',display:'block',textDecoration:'none'}}><div style={{padding:'10px',fontWeight:900,color:'#1a73e8',fontSize:'12px',background:'white'}}>Localização no Maps</div><img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=300&fit=crop" style={{width:'100%',height:'180px',objectFit:'cover',display:'block'}} alt="mapa"/><div style={{padding:'10px',background:'#E8F0FE',color:'#1a73e8',fontWeight:900,fontSize:'12px',textAlign:'center'}}>{data.localizacao}</div><div style={{padding:'14px',fontWeight:900,color:'white',background:'#1a73e8',textAlign:'center'}}>Abrir no Google Maps</div></a> : null}
</div>
</div>
</div>
</div>
)
}
