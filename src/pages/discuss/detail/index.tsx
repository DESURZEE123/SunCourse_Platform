import DiscussCard from '@/components/DiscussCard'
import { Button, Card } from 'antd'
import { useEffect, useState, useCallback } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import { useModel, history } from 'umi'
import { discussTrans } from '@/utils'
import { getDiscussDetail } from '@/api/discuss'
import styled from 'styled-components'

const Line = styled.div`
  margin: 10px 0 20px;
  border: none;
  height: 2px;
  background-color: #bbbbbb;
`

export default () => {
  const { discussList } = useModel('system')
  const [disDetailList, setDisDetailList] = useState([])
  const idDiscussion = history.location.search.split('=')[1] as unknown as number

  const addIndictor = useCallback(
    async (idDiscussion: number) => {
      const res = await getDiscussDetail({ idDiscussion })
      setDisDetailList(discussTrans(res))
    },
    [idDiscussion]
  )

  useEffect(() => {
    addIndictor(idDiscussion)
  }, [idDiscussion])

  return (
    <PageContainer>
      <div
        style={{ textAlign: 'right' }}
        onClick={() => {
          history.back()
        }}
      >
        <Button type='text'>返回讨论列表</Button>
      </div>
      <Line />
      <Card>
        {disDetailList[0] && <DiscussCard TitleList={disDetailList[0]} hasReplay={false}/>}
        {(disDetailList[0]?.asList || []).length !== 0 && disDetailList[0].asList.map((item: { idDiscussion: number }) => (
          <div style={{ paddingLeft: '30px', marginTop: '-5px' }}>
            <DiscussCard TitleList={item} hasReplay={true}/>
          </div>
        ))}
      </Card>
    </PageContainer>
  )
}
