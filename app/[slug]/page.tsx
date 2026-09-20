import { supabase } from "../../lib/supabase"

const LOGOS = {
  wpp: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
  insta: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
  maps: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Google_Maps_Logo_2020.svg",
  pix: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Pix_logo.png"
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug).toLowerCase()
  const { data } = await supabase.from("biosites").select("*").eq("slug", slug).single()
  if (!data) return <div style={{minHeight:'100vh',background:'#000',color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}><div>Slug {slug} nao encontrado <br/><a href="/criar" style={{color:'#00C851'}}>Voltar</a></div></div>
  const isVideo = data.foto_url?.includes('.mp4') || data.foto_url?.includes('.webm')
  const btnBase = { display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', padding:'14px', borderRadius:'14px', textDecoration:'none', fontWeight:900, textAlign:'center' } as any

  return (
    <div style={{minHeight:'100vh',background:'#080808',display:'flex',justifyContent:'center',padding:'20px'}}>
      <div style={{width:'390px',background:'linear-gradient(135deg,#080808,#1A1A1A)',borderRadius:'28px',overflow:'hidden',border:'1px solid #222'}}>
        {data.foto_url? (isVideo? <video src={data.foto_url} autoPlay muted loop playsInline style={{width:'100%',height:'240px',objectFit:'cover'}}/> : <div style={{height:'240px',background:`url(${data.foto_url}) center/cover`}}/>):<div style={{height:'110px',background:'#222'}}/>}
        <div style={{padding:'18px',marginTop:'-45px',textAlign:'center'}}>
          {data.logo_url&&<img src={data.logo_url} style={{width:'82px',height:'82px',borderRadius:'50%',margin:'0 auto',display:'block',border:'4px solid #080808',background:'white',objectFit:'cover'}}/>}
          <h1 style={{color:'white',fontWeight:900,margin:'8px 0 2px'}}>{data.title}</h1>
          {data.capa_titulo&&<h3 style={{color:'#00C851',margin:'4px 0',fontSize:'14px'}}>{data.capa_titulo}</h3>}
          {data.capa_desc&&<p style={{color:'white',opacity:0.6,fontSize:'12px'}}>{data.capa_desc}</p>}
          
          <div style={{display:'flex',flexDirection:'column',gap:'10px',marginTop:'16px'}}>
            {data.servicos&&<div style={{background:'#1A1A1A',padding:'14px',borderRadius:'14px',color:'white',fontWeight:600}}>{data.servicos}</div>}
            {data.catalogo&&<div style={{background:'#1A1A1A',padding:'14px',borderRadius:'14px',color:'white',whiteSpace:'pre-wrap',fontSize:'13px'}}>{data.catalogo}</div>}
            
            {data.whatsapp&&<a href={`https://wa.me/${data.whatsapp.replace(/\D/g,'')}`} style={{...btnBase, background:'#25D366', color:'white'}}><img src={LOGOS.wpp} style={{width:'22px',height:'22px'}}/> WhatsApp</a>}
            
            {data.instagram&&<a href={`https://instagram.com/${data.instagram.replace('@','')}`} style={{...btnBase, background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', color:'white'}}><img src={LOGOS.insta} style={{width:'20px',height:'20px',background:'white',borderRadius:'4px'}}/> {data.instagram}</a>}
            
            {data.pix_key&&<div style={{...btnBase, background:'#1A1A1A', color:'white', border:'1px solid #32BCAD'}}><img src={LOGOS.pix} style={{width:'28px',height:'16px',objectFit:'contain'}}/> Pix: {data.pix_key}</div>}
            
            {data.wifi_password&&<div style={{...btnBase, background:'#1A1A1A', color:'white', border:'1px dashed #FF9500'}}>📶 WiFi: {data.wifi_password}</div>}
            
            {data.localizacao&&<a href={data.localizacao} style={{...btnBase, background:'white', color:'#1a73e8'}}><img src={LOGOS.maps} style={{width:'20px',height:'20px'}}/> Ver no Maps</a>}
          </div>
        </div>
      </div>
    </div>
  )
}
