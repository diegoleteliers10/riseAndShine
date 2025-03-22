export const combineDateTime = (date:string,time:string) => {
  if( date && time ){const fechaStr = date;
    const horaStr = time;

    // Primero, decodifica los valores URL-encoded
    const fechaDecodificada = decodeURIComponent(fechaStr);
    const horaDecodificada = decodeURIComponent(horaStr);

    // Crea un objeto Date a partir de la fecha
    const fecha = new Date(fechaDecodificada);

    // Extrae las partes de la hora
    const [horas, minutos, segundos] = horaDecodificada.split(':');

    // Establece la nueva hora
    fecha.setUTCHours(parseInt(horas), parseInt(minutos), parseInt(segundos));

    // Obtén la nueva cadena ISO
    const nuevaFechaISO = fecha.toISOString();

    // Codifica nuevamente los caracteres especiales
    // const resultado = nuevaFechaISO.replace(/:/g, "%3A");

    return nuevaFechaISO
  }
}