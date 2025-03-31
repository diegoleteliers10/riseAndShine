"use client"

import { useEffect, useRef } from "react"
import { Loader } from '@googlemaps/js-api-loader'
import { fromAddress, setLocationType, setKey, setLanguage, setRegion, } from 'react-geocode';

interface MapProps {
  address: string;
}

export const Map = ({ address }: MapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(()=>{
    const initMap = async ()=> {
      const loader = new Loader({
        apiKey: 'AIzaSyAvEs37gxmsNsL6p74lqLCY-8HngU74pb4',
        version: 'weekly'
      })

      const { Map } = await loader.importLibrary('maps')
      const { AdvancedMarkerElement } = await loader.importLibrary('marker') // Importar la biblioteca de marcadores

      setKey("AIzaSyAkWImJ5XGzr5LO_wxKP75Vpwc_Xi3fMQ8");
      setLanguage("es");
      setRegion("es");

      setLocationType("ROOFTOP");

      const result = await fromAddress(address)
      .then(({ results }) => {
        const { lat, lng } = results[0].geometry.location;
        return {
          lat,
          lng
        }
      })
      .catch(console.error);

      console.log(result)

        const mapOptions: google.maps.MapOptions = {
          center: result as google.maps.LatLngLiteral,
          zoom: 17,
          mapId: 'MY_NEXTJS_MAPID'
        }

        const map = new Map(mapRef.current as HTMLElement, mapOptions);

        // Crear el marcador con la clase correctamente importada
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const marker = new AdvancedMarkerElement({
          map: map,
          position: result as google.maps.LatLngLiteral,
          title: address,
        });
      
    }

    initMap()
  },[address])

  return (
    <div 
      style={{height:'400px'}}
      ref={mapRef}
    />
  )
}
