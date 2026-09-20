  async function salvar() {
    if (!f.title ||!f.slug) { alert("Nome e slug"); return }
    const slugFinal = f.slug.toLowerCase().replace(/\s+/g, "-").trim()
    const { data, error } = await supabase.from("biosites").upsert([{ 
      title: f.title, 
      slug: slugFinal,
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
    }], { onConflict: 'slug' }).select()
    if (error) { alert("ERRO AO SALVAR: " + error.message); console.log(error); return }
    location.href = "/" + slugFinal
  }
