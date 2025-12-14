// Configuración de ePayco
// Para obtener tus claves, regístrate en https://dashboard.epayco.co/

export const epaycoConfig = {
  // Clave pública de ePayco (reemplazar con tu clave real)
  publicKey: import.meta.env.VITE_EPAYCO_PUBLIC_KEY || 'YOUR_PUBLIC_KEY_HERE',
  
  // Modo de prueba (true para pruebas, false para producción)
  test: import.meta.env.VITE_EPAYCO_TEST_MODE === 'true' || true,
  
  // Nombre del comercio
  merchantName: 'StyleUrban',
  
  // País
  country: 'co',
  
  // Idioma
  lang: 'es',
  
  // Moneda
  currency: 'cop',
};

