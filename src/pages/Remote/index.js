import React, {useEffect, useState} from 'react';
import axios from 'axios'

export default function Remote(params) {
  const [text,changeText] = useState('null')

  useEffect(()=>{
    /* fetch('/api/getText').then(data=>data.json()).then(({data})=>{
      changeText(data)
    }) */
    axios.get('/api/getText').then(({data:rsp})=>{
      changeText(rsp.data)
    })
  },[])

  return <p>Remote getData: {text}</p>
}