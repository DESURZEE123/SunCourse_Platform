import React, { useEffect, useState } from 'react'
import HomeCard from '@/components/HomeCard'
import { PageContainer } from '@ant-design/pro-components'
import { history } from 'umi'
import { Flex, Tabs } from 'antd'
import { storage } from '@/utils'
import { getHomeworkList } from '@/api/homework'

const user = storage.getItem('userInfo1')
const courseId = storage.getItem('courseId')
const HomeWork = () => {
  const [homeWorkList, setHomeWorkList] = useState([])

  const getHomeWorkData = async () => {
    // if (user.isTeacher) {
    const res = await getHomeworkList({ courseId })
    setHomeWorkList(res.data)
    // }
  }

  useEffect(() => {
    getHomeWorkData()
  }, [])

  const onChange = (key: string) => {
    // console.log(key)
  }

  const goDetail = (homework_id) => {
    if (user.isTeacher) {
      history.push({
        pathname: '/homework/my/details/TeaPubWork',
        search: `?id=${homework_id}`
      })
    } else {
      history.push({
        pathname: '/homework/my/details/StuWork',
        search: `?id=${homework_id}`
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
          {/* <HomeCard goDetail={() => { history.push('/homework/my/details/TeaPubWork') }} /> */}
        </Flex>
    },
    {
      key: '3',
      label: '已批作业',
      children:
        <Flex style={{ flexWrap: 'wrap' }}>
          {/* <HomeCard goDetail={() => { history.push('/homework/my/details/TeaPubWork') }} /> */}
        </Flex>
    }
  ]



  return (
    <PageContainer>
      <div>
        <Tabs defaultActiveKey='1' items={user.isTeacher ? items : [items[0]]} onChange={onChange} />
      </div>
    </PageContainer>
  )
}

export default HomeWork
