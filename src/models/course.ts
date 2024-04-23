import { useEffect, useState } from 'react'
import { request } from 'umi'

export default () => {
  const [departMapList, setDepartMapList] = useState([])
  useEffect(() => {
    request('/api/user/depart', { method: 'GET' })
      .then((data) => {
        const departMap = new Map()
        data.forEach((item) => {
          departMap.set(item.departId, item.name)
        })
        setDepartMapList(departMap)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])
  return { departMapList }
}
