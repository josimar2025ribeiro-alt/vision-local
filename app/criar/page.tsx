// @ts-nocheck
"use client"
import { useState } from "react"
import { supabase } from "../../lib/supabase"

const TEMPLATES = [
  { label: "Barbearia", title: "Barbearia Style", capa: "Barbearia Premium", desc: "Corte na regua e barba", serv: "Corte, Barba" },
  { label: "Salao", title: "Studio Beleza", capa: "Salao Completo", desc: "Escova e coloracao", serv: "Escova, Coloracao" },
  { label: "Oficina Moto", title: "Oficina do Joao", capa: "Oficina Motos", desc: "15 anos em Holambra", serv: "Revisao, Motor" },
  { label: "Oficina Carro", title: "Auto Center", capa: "Auto Center", desc: "Mecanica completa", serv: "Mecanica, Freio" },
  { label: "Lanchonete", title: "Lanches Top", capa: "Lanchonete", desc: "Melhores lanches", serv: "Lanches" },
  { label: "Pizzaria", title: "Pizzaria Sabor", capa: "Pizzaria", desc: "Pizza forno a lenha", serv: "Pizzas" },
  { label: "Loja Roupas", title: "Moda Feminina", capa: "Moda Atual", desc: "Roupas femininas", serv: "Feminino" },
  { label: "Pet Shop", title: "Pet Amigo", capa: "Pet Shop", desc: "Banho e tosa", serv: "Banho e Tosa" },
]

export default function Criar() {
  const [f, setF] = useState({ title: "", slug: "", wpp: "", insta: "", serv: "", cat: "", pix: "", wifi: "", loc: "", logo: "", foto: "", capaTitulo: "", capaDesc: "" })
  const [up, setUp] = useState("")

  async function upload(file, pasta) {
    setUp("Enviando...")
    const nome = pasta + "/" + Date.now() + "-" + file.name
    const res = await supabase.storage.from("midias").upload(nome, file)
    setUp("")
    if (res.error) { alert(res.error.message); return null }
    const pub = supabase.storage.from("midias").getPublicUrl(nome)
    return pub.data.publicUrl
  }

  function useTemplate(t) {
    setF({...f, title: t.title, capaTitulo: t.capa, capaDesc: t.desc, serv: t.serv })
  }

  async function salvar() {
    if (!f.title ||!f.slug) { alert("Nome e slug"); return }
    const { error } = await supabase.from("biosites").upsert([{
      title: f.title,
      slug: f.slug.toLowerCase().replace(/\s+/g, "-"),
      whatsapp: f.wpp,
      instagram: f.insta,
      servicos: f.serv,
      catalogo: f.cat,
      pix_key: f.pix,
      wifi_password: f.wifi,
      localizacao: f.loc,
      logo_url: f.logo,
      foto_url: f.foto,
      capa_titulo: f.capaTitulo,
      capa_desc: f.capaDesc
    }], { onConflict: 'slug' })
    if (error) alert(error.message)
    else location.href = "/" + f.slug
  }

  const inp = { padding: '12px', background: '#111', border: '1px solid #333', borderRadius: '10px', color: 'white', width: '100%', marginBottom: '8px' } as any

  return (
    <div style={{ background: '#0A0A0A', color: 'white', padding: '16px', minHeight: '100vh' }}>
      <h2 style={{ fontWeight: 900, fontSize: '14px', marginBottom: '10px' }}>TEMPLATES - CLICA PRA USAR</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
        {TEMPLATES.map((t, i) => (
          <button key={i} onClick={() => useTemplate(t)} style={{ background: '#1A1A1A', border: '1px solid #333', borderRadius: '10px', padding: '14px', color: 'white', fontWeight: 900 }}>
            {t.label}
          </button>
        ))}
      </div>

      {up && <div style={{ background: '#00C851', padding: '8px', borderRadius: '8px', marginBottom: '8px' }}>{up}</div>}

      <input style={inp} placeholder="Nome da Loja *" value={f.title} onChange={e => setF({...f, title: e.target.value })} />
      <input style={inp} placeholder="Slug ex: oficina-holambra *" value={f.slug} onChange={e => setF({...f, slug: e.target.value })} />

      <div style={{ background: '#1A1A1A', padding: '12px', borderRadius: '10px', marginBottom: '10px', border: '1px dashed #555' }}>
        <b>LOGO - Clique pra galeria</b><br />
        <input type="file" accept="image/*" onChange={async e => { const file = e.target.files?.[0]; if (file) { const u = await upload(file, "logos"); if (u) setF({...f, logo: u }) } }} />
      </div>

      <div style={{ background: '#1A1A1A', padding: '12px', borderRadius: '10px', marginBottom: '10px', border: '1px dashed #555' }}>
        <b>CAPA - Foto ou Video + Nome + Desc</b><br />
        <input type="file" accept="image/*,video/*" onChange={async e => { const file = e.target.files?.[0]; if (file) { const u = await upload(file, "capas"); if (u) setF({...f, foto: u }) } }} />
        <input style={{...inp, marginTop: '8px' }} placeholder="Nome da Capa" value={f.capaTitulo} onChange={e => setF({...f, capaTitulo: e.target.value })} />
        <input style={inp} placeholder="Descricao" value={f.capaDesc} onChange={e => setF({...f, capaDesc: e.target.value })} />
      </div>

      <input style={inp} placeholder="Servicos" value={f.serv} onChange={e => setF({...f, serv: e.target.value })} />
      <input style={inp} placeholder="Catalogo" value={f.cat} onChange={e => setF({...f, cat: e.target.value })} />
      <input style={inp} placeholder="WhatsApp" value={f.wpp} onChange={e => setF({...f, wpp: e.target.value })} />
      <input style={inp} placeholder="Instagram" value={f.insta} onChange={e => setF({...f, insta: e.target.value })} />
      <input style={inp} placeholder="Pix" value={f.pix} onChange={e => setF({...f, pix: e.target.value })} />
      <input style={inp} placeholder="WiFi Senha" value={f.wifi} onChange={e => setF({...f, wifi: e.target.value })} />
      <input style={inp} placeholder="Link Google Maps" value={f.loc} onChange={e => setF({...f, loc: e.target.value })} />

      <button onClick={salvar} style={{ background: '#00C851', padding: '16px', width: '100%', border: 'none', borderRadius: '10px', fontWeight: 900, color: 'white', marginTop: '10px' }}>SALVAR LOJA</button>
    </div>
  )
}
