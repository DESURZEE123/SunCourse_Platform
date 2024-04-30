import { Button } from 'antd'
import styled from 'styled-components'

const Container = styled.div`
  width: 300px;
  margin-right: 15px;
  margin-bottom: 15px;
  background-color: #ffffff;
  border: 1px solid #ccc;
`

const Title = styled.div`
  margin-bottom: 7px;
  color: #333;
  font-size: 17px;
  font-weight: bold;
`

const TimeText = styled.div`
  margin-bottom: 8px;
  color: #333;
  font-size: 13px;
`

const Score = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
  background-color: #e4ecd6;
`

const ScoreText = styled.span`
  margin-top: 5px;
  color: #ff0319;
  font-size: 18px;
  font-weight: bold;
`
export default ({ goDetail, detail }) => {
  // console.log(detail);
  const { homework_id, title, date_start, date_end, status, score } = detail

  return (
    <Container>
      <div style={{ padding: '15px' }}>
        <Title>{title}</Title>
        <TimeText>开始时间：{date_start}</TimeText>
        <TimeText>截止时间：{date_end}</TimeText>
        <div style={{ marginBottom: '8px' }}>
          <span>作业状态：</span>
          <span style={{ color: '#555', fontWeight: 'bold' }}>已发布</span>
        </div>
      </div>
      <Score>
        {status !== 0 && <ScoreText>{score}分</ScoreText>}
        <Button type='primary' onClick={()=> goDetail(homework_id)}>
          查看
        </Button>
      </Score>
    </Container>
  )
}
