import { useEffect, useState, useRef } from 'react'
import { Avatar, Button, Card, Input, Space, message, Image } from 'antd'
import { history, useModel } from 'umi'
import { BarsOutlined, LikeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { changeLike, getDiscussList, replayDiscuss } from '@/api/discuss'
import { discussTrans, storage } from '@/utils'
import styled from 'styled-components'

const ReplayLike = styled.div`
  display: flex;
  margin-top: 5px;
`
const courseId = storage.getItem('courseId')
const user = storage.getItem('userInfo1')
export default ({ TitleList }: { TitleList: string[] }) => {
  const { setDiscussList } = useModel('system')
  const { teacherMapList, studentMapList } = useModel('course')
  const [isReplay, setIsReplay] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [LikeNum, setLikeNum] = useState(0)
  const { idDiscussion, DisName, title, data, content, asList = [], like, file } = TitleList
  const inputRef = useRef()
  const isDetail = history.location.search.split('=')[1];
  useEffect(() => {
    setLikeNum(like)
  }, [like])

  // 赞
  const likeReview = async () => {
    setIsLike((prevState) => !prevState)
    const like = isLike ? -1 : 1
    await changeLike({ idDiscussion, like })
    const res = await getDiscussList()
    setDiscussList(discussTrans(res))
  }

  // 回复
  const ReplayDiscuss = async () => {
    // const belongId = idDiscussion
    // const data = { ...values, idDiscussion, belongId, idCourse: 1, replayId: 0, DisName: 'wyy' }
    const content = inputRef?.current.resizableTextArea.textArea.value
    const DisName = user?.teaId ? teacherMapList.get(parseInt(user.teaId)) : studentMapList.get(parseInt(user.stuId))
    const params = {
      idDiscussion: Date.now() % 100000,
      idCourse: courseId,
      replayId: idDiscussion,
      belongId: idDiscussion,
      DisName,
      title: '',
      content
    }
    const res = await replayDiscuss(params)
    if (res) {
      message.success('新建成功');
      setIsReplay(false)
      setTimeout(() => {
        location.reload();
      }, 1300)
    } else {
      message.error('新建失败');
    }
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
        {file && <Image src={file} width={200} />}
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
          <Input.TextArea ref={inputRef} style={{ marginTop: '10px' }} />
          <div style={{ marginTop: '10px', textAlign: 'right' }}>
            <Button type='primary' onClick={ReplayDiscuss}>回复</Button>
          </div>
        </div>
      )}
    </Card>
  )
}
