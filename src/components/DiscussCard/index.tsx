import { BarsOutlined, LikeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Input, Space } from 'antd'
import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { history, useModel } from 'umi'
import { changeLike, getDiscussList, replayDiscuss } from '@/api/discuss'
import { discussTrans } from '@/utils'
import { message } from 'antd/lib'

const ReplayLike = styled.div`
  display: flex;
  margin-top: 5px;
`

export default ({ TitleList }: { TitleList: string[] }) => {
  const { setDiscussList } = useModel('system')
  const [isReplay, setIsReplay] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [LikeNum, setLikeNum] = useState(0)
  const { idDiscussion, DisName, title, data, content, asList = [], like } = TitleList
  const inputRef = useRef()
  const isDetail = history.location.search.split('=')[1];
  useEffect(() => {
    setLikeNum(like)
  }, [like])
// console.log(TitleList);

  // 赞
  const likeReview = async () => {
    setIsLike((prevState) => !prevState)
    const like = isLike ? -1 : 1
    await changeLike({ idDiscussion, like })
    const res = await getDiscussList()
    setDiscussList(discussTrans(res))
  }

  // 回复
  const ReplayDiscuss = async() => {
    // const belongId = idDiscussion
    // const data = { ...values, idDiscussion, belongId, idCourse: 1, replayId: 0, DisName: 'wyy' }
    const content = inputRef?.current.resizableTextArea.textArea.value
    const params = {
      idDiscussion: Date.now(),
      idCourse: 1,
      replayId: idDiscussion,
      belongId: idDiscussion,
      DisName: 'wyy',
      title:'',
      content
    }
    const res = await replayDiscuss(params)

    message.success('回复成功')
    setIsReplay(false)
  }


  return (
    <Card style={{ marginBottom: '10px' }}>
      <Space>
        <Avatar style={{ backgroundColor: '#c5ccdd' }} icon={<UserOutlined />} />
        <div>
          <span className='text-detail'>{DisName}</span>
          <div className='text-detail'>{data}</div>
        </div>
      </Space>
      <div>
        <div className='text'>{title}</div>
        <div>{content}</div>
        <ReplayLike>
          {/* 回复 */}
          <div style={{ marginRight: '15px' }}>
            <Button
              shape='circle'
              size='small'
              icon={<MessageOutlined style={{ fontSize: isReplay ? '16px' : 'inherit', color: isReplay ? '#08c' : 'inherit' }} />}
              onClick={() => {
                setIsReplay((prevState) => !prevState)
              }}
            />
            <span className='text-detail'> 回复 {asList.length}</span>
          </div>
          {/* 赞 */}
          <div style={{ marginRight: '15px' }}>
            <Button
              shape='circle'
              size='small'
              icon={<LikeOutlined style={{ fontSize: isLike ? '16px' : 'inherit', color: isLike ? '#08c' : 'inherit' }} />}
              onClick={likeReview}
            />
            <span className='text-detail'> 赞 {like}</span>
          </div>
          {/* 详情 */}
          {!isDetail && (
            <div>
              <Button
                shape='circle'
                size='small'
                icon={<BarsOutlined />}
                onClick={() => {
                  // history.push(`/discuss/detail/idDiscussion=${idDiscussion}`, idDiscussion);
                  history.push({
                    pathname: '/discuss/detail',
                    search: `idDiscussion=${idDiscussion}`,
                  })
                }}
              />
              <span className='text-detail'> 详情</span>
            </div>
          )}

        </ReplayLike>
      </div>
      {isReplay && (
        <div>
          {/* value={`回复${DisName}：`} */}
          <Input.TextArea ref={inputRef} style={{ marginTop: '10px' }}  />
          <div style={{ marginTop: '10px', textAlign: 'right' }}>
            <Button type='primary' onClick={ReplayDiscuss}>回复</Button>
          </div>
        </div>
      )}
    </Card>
  )
}
