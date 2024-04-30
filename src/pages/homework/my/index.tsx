import React, { useEffect, useState } from 'react'
import HomeCard from '@/components/HomeCard'
import { PageContainer } from '@ant-design/pro-components'
import { history } from 'umi'
import { Flex, Tabs } from 'antd'
import { storage } from '@/utils'
import { getHomeworkList } from '@/api/homework'

const user = storage.getItem('userInfo1')
const HomeWork = () => {
  const [homeWorkList, setHomeWorkList] = useState([])

  const getHomeWorkData = async () => {
    if (user.isTeacher) {
      const res = await getHomeworkList({ teaId: user.teaId })
      setHomeWorkList(res.data)
    }
  }

  useEffect(() => {
    getHomeWorkData()
  }, [])

  const onChange = (key: string) => {
    // console.log(key)
  }

  const goDetail = (homework_id) => {
    // history.push('/pages/commonLink/list/edit?id=' + id)
    // history.push('/homework/details/StuWork')
    history.push({
      pathname: '/homework/my/details/TeaPubWork',
      search: `?id=${homework_id}`
    })
  }

  const items = [
    {
      key: '1',
      label: '我的作业',
      children:
        <Flex style={{ flexWrap: 'wrap' }}>
          {homeWorkList.map(item => <HomeCard goDetail={goDetail} detail={item} />)}

          {/* <HomeCard goDetail={() => { history.push('/homework/my/details/StuWork') }} />
          <HomeCard goDetail={() => { history.push('/homework/my/details/StuWork') }} />
          <HomeCard goDetail={() => { history.push('/homework/my/details/StuWork') }} />
          <HomeCard goDetail={() => { history.push('/homework/my/details/StuWork') }} /> */}
        </Flex>
    },
    {
      key: '2',
      label: '待批作业',
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
