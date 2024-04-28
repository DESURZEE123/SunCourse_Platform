import { useEffect, useState } from 'react'
import { request } from 'umi'
import { storage } from '@/utils'

const user = storage.getItem('userInfo1')
export default () => {
  const [userInitInfo, setUserInitInfo] = useState([])
  useEffect(() => {
    request(user.isTeacher ? '/api/user/detail/teacher' : '/api/user/detail/student', {
      method: 'post',
      params: {isTeacher: user.isTeacher, Id: parseInt(user?.stuId) || parseInt(user?.teaId)}
    })
      .then((res) => {
        setUserInitInfo(res.data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])
  return { userInitInfo, setUserInitInfo }
}
