import React from 'react'
import { ReactDOM } from 'react'
import fb from '../images/images (1).png'
import insta from '../images/insta.png'
import link from '../images/link.png'
import git from '../images/github.png'
import tw from '../images/twitter.jpg'
export default function Footer() {
  return (
    <div className="Footer">
      <img src={tw} />
      <img src={fb} />
      <img src={insta} />
      <img src={link} />
      <img src={git} />
    </div>
  )
}
