// ADICIONA NO STATE f: wifi_ssid
const [f,setF]=useState({title:"",slug:"",wpp:"",insta:"",pix:"",pixValor:"",wifi_ssid:"",wifi:"",loc:"",logo:"",foto:"",capaTitulo:"",capaDesc:"",corTitulo:"#FFFFFF",corDesc:"#AAAAAA"})

// QR CODE WIFI - FORMATO OFICIAL QUE CELULAR LÊ AUTOMÁTICO
const wifiQrUrl = f.wifi_ssid && f.wifi ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`WIFI:T:WPA;S:${f.wifi_ssid};P:${f.wifi};;`)}` : null

// NO LUGAR DO INPUT SIMPLES DE WIFI, COLA ISSO:
<div style={{background:'#1A1A1A',padding:'12px',borderRadius:'16px',marginBottom:'10px',border:'1px dashed #FF9500'}}>
  <b style={{fontSize:'12px',color:'#FF9500'}}>📶 WIFI COM QR CODE</b>
  <input style={inp} placeholder="Nome da rede WiFi ex: Moda Feminina" value={f.wifi_ssid} onChange={e=>setF({...f,wifi_ssid:e.target.value})}/>
  <input style={inp} placeholder="Senha do WiFi ex: 12345678" value={f.wifi} onChange={e=>setF({...f,wifi:e.target.value})}/>
  {wifiQrUrl&&
    <div style={{background:'white',padding:'16px',borderRadius:'16px',marginTop:'10px',textAlign:'center'}}>
      <div style={{fontSize:'10px',color:'black',fontWeight:900,letterSpacing:'1px',marginBottom:'8px'}}>ESCANEIE PARA CONECTAR</div>
      <img src={wifiQrUrl} style={{width:'180px',height:'180px',margin:'0 auto',display:'block'}}/>
      <div style={{marginTop:'10px',background:'#FFF3E0',padding:'10px',borderRadius:'10px'}}>
        <div style={{fontSize:'12px',color:'black'}}>Rede: <b>{f.wifi_ssid}</b></div>
        <div style={{fontSize:'14px',color:'black',fontWeight:900}}>Senha: {f.wifi}</div>
      </div>
    </div>
  }
</div>
