import { Button } from 'antd'
import { useModel } from 'umi'
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
  const { studentMapList } = useModel('course')

  const { homework_id, title, date_start, date_end, status, score, isMark, isFinish, stuId, scoretotal, finishDate } = detail

  const dataTransLocal = (dataTime: string) => {
    const date = new Date(dataTime.replace(/"/g, ''));
    const localDateTimeString = date.toLocaleString()
    return localDateTimeString
  }

  return (
    <Container>
      <div style={{ padding: '15px' }}>
        <Title>{title}</Title>
        {stuId && <h4>姓名：{studentMapList.get(stuId)}</h4>}
        {stuId && <h4>学号：{stuId}</h4>}
        {date_start && (
          <>
            <TimeText>开始时间：{dataTransLocal(date_start)}</TimeText>
            <TimeText>截止时间：{dataTransLocal(date_end)}</TimeText>
          </>
        )}
        {finishDate && <TimeText>完成时间：{dataTransLocal(finishDate)}</TimeText>}
        <div style={{ marginBottom: '8px' }}>
          <span style={{ color: '#555', fontWeight: 'bold' }}>{isMark === 0 && '作业状态：未批改'}</span>
          <span style={{ color: '#555', fontWeight: 'bold' }}>{isMark === 1 && '作业状态：已批改'}</span>
        </div>
      </div>
      <Score>
        {scoretotal && <ScoreText>{scoretotal}分</ScoreText>}
        {isMark === 0 && <ScoreText>未批改</ScoreText>}
        <Button type='primary' onClick={() => goDetail({ homework_id, isMark, stuId, isFinish })}>
          查看
        </Button>
      </Score>
    </Container>
  )
}
