import { useEffect, useState } from 'react'
import { discussTrans } from '../utils'
import { request } from 'umi'

export default () => {
  const [discussList, setDiscussList] = useState([])
  useEffect(() => {
    request('/api/discuss', { method: 'GET' })
      .then((data) => {
        setDiscussList(discussTrans(data))
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])
  return { discussList, setDiscussList }
}
