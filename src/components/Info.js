import React from 'react'
import { ReactDOM } from 'react'
import Photo from '../images/profile1.jpeg'
export default function Info() {
  return (
    <div className="Info">
      <img src={Photo} />
      <header>Sahil Bodkhe</header>
      <role>Backend Developer</role>
      <add>Mumbai ,India</add>
      <buttonsec>
        <button className="b1">Email</button>
        <button className="b2">Contact</button>
      </buttonsec>
    </div>
  )
}
