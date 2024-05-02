import React, { useEffect, useState } from 'react'
import HomeCard from '@/components/HomeCard'
import { PageContainer } from '@ant-design/pro-components'
import { history } from 'umi'
import { Flex, Tabs } from 'antd'
import { storage } from '@/utils'
import { getHomeworkList, getHomeworStudentFinish } from '@/api/homework'

const user = storage.getItem('userInfo1')
const courseId = storage.getItem('courseId')
const HomeWork = () => {
  const [homeWorkList, setHomeWorkList] = useState([])
  const [notMarkedHomeWorkList, setNotMarkedHomeWorkList] = useState([])
  const [isMarkedHomeWorkList, setIsMarkedHomeWorkList] = useState([])

  const getHomeWorkData = async () => {
    // if (user.isTeacher) {
    const res = await getHomeworkList({ courseId })
    setHomeWorkList(res.data)
    // }
    if (user.isTeacher) {
      const isNotMarked = await getHomeworStudentFinish({ courseId, isMark: 0, isFinish: 1 })
      setNotMarkedHomeWorkList(isNotMarked.data)
      const isMarked = await getHomeworStudentFinish({ courseId, isMark: 1, isFinish: 1 })
      setIsMarkedHomeWorkList(isMarked.data)
    } else {
      const isMarked = await getHomeworStudentFinish({ courseId, isMark: 1, isFinish: 1 })
      setIsMarkedHomeWorkList(isMarked.data)
    }

  }

  useEffect(() => {
    getHomeWorkData()
  }, [])

  const onChange = (key: string) => {
    // console.log(key)
  }

  const goDetail = ({ homework_id, isMark, stuId }) => {
    if (user.isTeacher) {
      if (isMark === 0) {
        history.push({
          pathname: '/homework/my/details/StuWork',
          search: `?id=${homework_id}?isMark=0?stuId=${stuId}`
        })
      } else if (isMark === 1) {
        history.push({
          pathname: '/homework/my/details/StuWork',
          search: `?id=${homework_id}?isMark=1?stuId=${stuId}`
        })
      } else {
        history.push({
          pathname: '/homework/my/details/TeaPubWork',
          search: `?id=${homework_id}`
        })
      }
    } else if (isMark === 1) {
      history.push({
        pathname: '/homework/my/details/StuWork',
        search: `?id=${homework_id}?isMark=1?stuId=${stuId}`
      })
    } else {
      history.push({
        pathname: '/homework/my/details/StuWork',
        search: `?id=${homework_id}?isMark=3?stuId=${user.stuId}`
      })
    }
  }

  const items = [
    {
      key: '1',
      label: '我的作业',
      children:
        <Flex style={{ flexWrap: 'wrap' }}>
          {homeWorkList.map(item => <HomeCard goDetail={goDetail} detail={item} />)}
        </Flex>
    },
    {
      key: '2',
      label: '待批作业',
      children:
        <Flex style={{ flexWrap: 'wrap' }}>
          {notMarkedHomeWorkList.map(item => <HomeCard goDetail={goDetail} detail={item} />)}
        </Flex>
    },
    {
      key: '3',
      label: '已批作业',
      children:
        <Flex style={{ flexWrap: 'wrap' }}>
          {isMarkedHomeWorkList.map(item => <HomeCard goDetail={goDetail} detail={item} />)}
        </Flex>
    },
    {
      key: '4',
      label: '已完成作业',
      children:
        <Flex style={{ flexWrap: 'wrap' }}>
          {isMarkedHomeWorkList.map(item => <HomeCard goDetail={goDetail} detail={item} />)}
        </Flex>
    }
  ]



  return (
    <PageContainer>
      <div>
        <Tabs defaultActiveKey='1' items={user.isTeacher ? [items[0], items[1], items[2]] : [items[0], items[3]]} onChange={onChange} />
      </div>
    </PageContainer>
  )
}

export default HomeWork
