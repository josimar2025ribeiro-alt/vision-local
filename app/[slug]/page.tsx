{data.wifi_password&&
  <div style={{background:'white',padding:'18px',borderRadius:'20px',textAlign:'center'}}>
    <div style={{fontSize:'11px',color:'black',fontWeight:900,letterSpacing:'1px'}}>WIFI QR CODE</div>
    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`WIFI:T:WPA;S:${data.wifi_ssid||data.title};P:${data.wifi_password};;`)}`} style={{width:'200px',height:'200px',margin:'12px auto',display:'block'}}/>
    <div style={{background:'#FFF3E0',padding:'12px',borderRadius:'12px',marginTop:'8px'}}>
      <div style={{fontSize:'13px',color:'black'}}>Rede: <b>{data.wifi_ssid||data.title}</b></div>
      <div style={{fontSize:'16px',color:'black',fontWeight:900}}>Senha: {data.wifi_password}</div>
      <div style={{fontSize:'10px',color:'#666',marginTop:'4px'}}>Aponte a câmera do celular pro QR</div>
    </div>
  </div>
}
