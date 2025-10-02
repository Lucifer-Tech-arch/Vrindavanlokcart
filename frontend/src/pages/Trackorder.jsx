import React from 'react'
import { assests } from '../assets/assests'
import L from 'leaflet'
const deliveryboyicon = new L.Icon({
        iconUrl: assests.scooter,
        iconSize: [40,40],
        iconAnchor: [20,40]
    })
const customerhomeicon = new L.Icon({
        iconUrl: assests.home,
        iconSize: [40,40],
        iconAnchor: [20,40]
})

const Trackorder = () => {
    
  return (
    <div>
      
    </div>
  )
}

export default Trackorder
