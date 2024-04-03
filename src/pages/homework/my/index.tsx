import HomeCard from '@/components/HomeCard'
import { PageContainer } from '@ant-design/pro-components'
import { history } from 'umi'
import { Flex, Tabs } from 'antd'

const HomeWork = () => {
  const onChange = (key: string) => {
    // console.log(key)
  }

  const goDetail = () => {
    // history.push('/pages/commonLink/list/edit?id=' + id)
    // history.push('/homework/details/StuWork')
    history.push('/homework/my/details/TeaPubWork')
  }

  const items = [
    {
      key: '1',
      label: '我的作业',
      children:
        <Flex style={{ flexWrap: 'wrap' }}>
          <HomeCard goDetail={() => { history.push('/homework/my/details/StuWork') }} />
          <HomeCard goDetail={() => { history.push('/homework/my/details/StuWork') }} />
          <HomeCard goDetail={() => { history.push('/homework/my/details/StuWork') }} />
          <HomeCard goDetail={() => { history.push('/homework/my/details/StuWork') }} />
        </Flex>
    },
    {
      key: '2',
      label: '待批作业',
      children:
        <Flex style={{ flexWrap: 'wrap' }}>
          <HomeCard goDetail={() => { history.push('/homework/my/details/TeaPubWork') }} />
        </Flex>
    }
  ]



  return (
    <PageContainer>
      <div>
        <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
      </div>
    </PageContainer>
  )
}

export default HomeWork
