import { supabase } from "../../lib/supabase"
export default async function Page({ params }: { params: { slug: string } }) {
  const { data, error } = await supabase.from("biosites").select("*").eq("slug", params.slug).single()
  if (error || !data) {
    return <div style={{ minHeight: '100vh', background: '#080808', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}>
      <h1>Slug: {params.slug} nao encontrado</h1>
      <p style={{ opacity: 0.6 }}>Erro: {error?.message}</p>
      <a href="/criar" style={{ color: '#00C851' }}>Voltar pro criar</a>
    </div>
  }
  const isVideo = data.foto_url?.includes('.mp4') || data.foto_url?.includes('video')
  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '380px', background: '#111', borderRadius: '28px', overflow: 'hidden' }}>
        {data.foto_url? (isVideo? <video src={data.foto_url} autoPlay muted loop playsInline style={{ width: '100%', height: '220px', objectFit: 'cover' }} /> : <div style={{ height: '220px', background: `url(${data.foto_url}) center/cover` }} />) : <div style={{ height: '110px', background: '#222' }} />}
        <div style={{ padding: '18px', textAlign: 'center' }}>
          {data.logo_url && <img src={data.logo_url} style={{ width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto', display: 'block' }} />}
          <h1 style={{ color: 'white' }}>{data.title}</h1>
          <p style={{ color: 'white', opacity: 0.6 }}>{data.capa_titulo} - {data.capa_desc}</p>
          {data.servicos && <div style={{ background: '#1A1A1A', padding: '14px', borderRadius: '12px', marginTop: '10px' }}>{data.servicos}</div>}
          {data.whatsapp && <a href={`https://wa.me/${data.whatsapp}`} style={{ display: 'block', background: '#00C851', padding: '14px', borderRadius: '12px', color: 'white', textDecoration: 'none', fontWeight: 900, marginTop: '12px' }}>WhatsApp</a>}
          {data.localizacao && <a href={data.localizacao} style={{ display: 'block', background: '#0A2A5A', padding: '14px', borderRadius: '12px', color: 'white', textDecoration: 'none', marginTop: '8px' }}>Ver no Maps</a>}
        </div>
      </div>
    </div>
  )
}
