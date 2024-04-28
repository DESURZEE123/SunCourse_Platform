import { useEffect, useState } from 'react'
import { request } from 'umi'
import { createMap } from '@/utils'

export default () => {
  const [departMapList, setDepartMapList] = useState([])
  const [courseMapList, setCourseMapList] = useState([])
  const [classMapList, setClassMapList] = useState([])
  const [teacherMapList, setTeacherMapList] = useState([])
  useEffect(() => {
    Promise.all([
      request('/api/user/depart', { method: 'GET' }),
      request('/api/user/course', { method: 'GET' }),
      request('/api/user/class', { method: 'GET' }),
      request('/api/user/get/teacher', { method: 'GET' })
    ])
      .then(([departData, courseData, classData, teacherData]) => {
        setDepartMapList(createMap(departData.data, 'departId', 'name'));
        setCourseMapList(createMap(courseData.data, 'courseId', 'name'));
        setClassMapList(createMap(classData, 'classId', 'name'));
        setTeacherMapList(createMap(teacherData.data, 'teaId', 'name'));
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  return { departMapList, courseMapList, classMapList, teacherMapList }
}