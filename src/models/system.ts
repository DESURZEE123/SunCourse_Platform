import { useEffect, useState } from 'react'
import { discussTrans, storage } from '../utils'
import { request } from 'umi'

const courseId = storage.getItem('courseId')
export default () => {
  const [discussList, setDiscussList] = useState([])
  useEffect(() => {
    request('/api/discuss', { method: 'GET' })
      .then((data) => {
        const filterData = data.filter((item) => item.idCourse === courseId)
        setDiscussList(discussTrans(filterData))
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])
  return { discussList, setDiscussList }
}
