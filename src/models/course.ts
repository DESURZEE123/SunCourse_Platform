import { useEffect, useState } from 'react'
import { request } from 'umi'
import { createMap } from '@/utils'

export default () => {
  const [departMapList, setDepartMapList] = useState([])
  const [courseMapList, setCourseMapList] = useState([])
  const [classMapList, setClassMapList] = useState([])

  useEffect(() => {
    Promise.all([
      request('/api/user/depart', { method: 'GET' }),
      request('/api/user/course', { method: 'GET' }),
      request('/api/user/class', { method: 'GET' }),
    ])
      .then(([departData, courseData, classData]) => {
        setDepartMapList(createMap(departData, 'departId', 'name'));
        setCourseMapList(createMap(courseData.data, 'courseId', 'name'));
        setClassMapList(createMap(classData, 'classId', 'name'));
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  return { departMapList, courseMapList, classMapList }
}