import { Card, Flex } from 'antd'
import styled from 'styled-components'
import StuWork from './StuWork'
import TeaPubWork from './TeaPubWork'

const QuestionTitle = styled.div`
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #c5c5c5;
`

const HomeWorkDeatil = () => {
  return (
    <Card>
      <QuestionTitle>
        <Flex justify={'space-between'}>
          <span>应用案例-宜家家居的低成本战略</span>
          <span>返回</span>
        </Flex>
      </QuestionTitle>
      {/* <TeaPubWork /> */}
      <StuWork />
    </Card>
  )
}

export default HomeWorkDeatil
