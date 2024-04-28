import React, { useEffect, useState } from 'react'
import { Button, Form, Cascader, Image, Input, message, Avatar, Carousel, Dropdown, Modal, List, Card, Space, Select, Flex } from 'antd'
import { history, useModel } from 'umi'
import { storage } from '@/utils'
import { createCourse } from '@/api/login'
import { getCourseList, addCourse, searchCourse } from '@/api/user'

const cover1 = require('@/assets/images/cover.png')
const cover2 = require('@/assets/images/cover3.png')
const cover3 = require('@/assets/images/cover4.png')
const class_cover = require('@/assets/images/class_cover.jpg')

import './index.less'

const CarouselAuto = () => {
  const covers = [cover1, cover2, cover3];
  return (
    <Carousel className='container' dots={false} autoplay>
      {covers.map((cover, index) => (
        <div key={index}>
          <Image preview={false} src={cover} />
        </div>
      ))}
    </Carousel>
  )
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}
const user = storage.getItem('userInfo1')
export default () => {
  const [form] = Form.useForm()
  const { departMapList, classMapList, teacherMapList } = useModel('course')
  const { userInitInfo } = useModel('user')
  const [showClassModal, setShowClassModal] = useState(false)
  const [showDetailModal, setShowDeatilModal] = useState(false)
  const [allCourse, setAllCourse] = useState(false)
  const [courseData, setCourseData] = useState([])
  const [courseDetail, setCourseDetail] = useState({})
  const { name, departId, Id, class: classValue, courseId: courseIds } = userInitInfo
  const courseIdList = JSON.parse(courseIds)

  const items = [
    {
      key: '1',
      label: '个人信息',
      onClick: async () => {
        Modal.confirm({
          title: '个人信息',
          content:
            <>
              <h3>姓名：{name}</h3>
              <h3>账号：{Id}</h3>
              {!user.isTeacher && <h3>班级：{classValue}</h3>}
              <h3>学院：{departMapList.get(departId)}</h3>
            </>
        })
      }
    },
    {
      key: '2',
      label: '退出登录',
      onClick: () => {
        Modal.confirm({
          title: '退出登录',
          content: '确认退出登录吗？',
          onOk: () => {
            history.push('/login')
            storage.removeItem('userInfo1')
          }
        })
      }
    }
  ]

  const onSearch = async (value: string) => {
    console.log(value);
    const res = await searchCourse({ searchValue: value })
    if (res) {
      setCourseData(res)
    } else {
      message.error('未找到相关课程')
    }
  }

  const getCourse = async () => {
    const res = await getCourseList();
    if (res) {
      const courseData = allCourse ? res.data : res.data.filter(item => courseIdList.includes(item.courseId));
      setCourseData(courseData)
    }
  }

  useEffect(() => {
    getCourse()
  }, [allCourse])

  const onFinish = async (values: any) => {
    const params = {
      courseId: Date.now() % 1000,
      teaId: parseInt(storage.getItem('userInfo1').teaId),
      departId: 14,
      ...values
    }
    const res = await createCourse(params)
    if (res) {
      message.success('新建成功')
    } else {
      message.error('新建失败')
    }
    setShowClassModal(false)
  }

  const onReset = () => {
    form.resetFields()
    setShowClassModal(false)
  }
  return (
    <>
      <div className='top-bar flex-container'>
        <h2>阳光课程平台</h2>
        <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
          <div>
            <Avatar src={cover1} style={{ margin: '0 10px' }} />{name}
          </div>
        </Dropdown>
      </div>
      <CarouselAuto />
      <div style={{ padding: '0 60px' }}>
        <div className='flex-container'>
          {!allCourse ? <h1>我的课程</h1> : <h1>全部课程</h1>}
          <div>
            <Button type='primary' onClick={() => setAllCourse(!allCourse)}>{allCourse ? '我的课程' : '全部课程'}</Button>
            <Input.Search style={{ width: 200, margin: '0 40px' }} placeholder='搜索课程' onSearch={onSearch} />
            {/* 老师权利 */}
            {user.isTeacher && (<Button type='primary' onClick={() => setShowClassModal(true)}>创建课程</Button>)}
          </div>
        </div>
        <List grid={{ gutter: 16, column: 4 }}
          dataSource={courseData}
          renderItem={({ name, classId, departId, courseId, teaId }) => (
            <List.Item>
              <Card
                cover={<img src={class_cover}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  onClick={async () => {
                    setShowDeatilModal(true)
                    const data = courseData.filter(item => item.courseId === courseId)[0]
                    setCourseDetail(data)
                  }}
                />}>
                <h3>{name}</h3>
                <div>{teacherMapList.get(teaId)}</div>
                <div>{departMapList.get(departId)}</div>
                <div className='flex-container'>
                  <div>{classMapList.get(classId)}</div>
                  {courseIdList.includes(courseId) && (
                    <Button type='primary' onClick={() => {
                      storage.setItem('courseId', courseId)
                      history.push('/home')
                    }}>进入课程</Button>
                  )}
                  {!courseIdList.includes(courseId) && (
                    <Button type='primary'
                      onClick={() => {
                        Modal.confirm({
                          content: '确认添加该课程吗？',
                          onOk: () => {
                            courseIdList.push(courseId)
                            const courseIdsList = JSON.stringify(courseIdList)
                            addCourse({ courseIdsList, Id }).then((res) => {
                              if (res) {
                                message.success('添加成功');
                                setTimeout(() => {
                                  location.reload();
                                }, 1300)
                              }
                            })
                          }
                        })
                      }}>
                      添加课程</Button>
                  )}
                </div>
              </Card>
            </List.Item>
          )} />
      </div>

      <Modal closable={false} title="创建课程" open={showClassModal} footer={null}>
        <Form form={form} {...layout} onFinish={onFinish}>
          <Form.Item label="课程名称" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="课程简介" name="content">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="所属学院" name="departId">
            <Select />
          </Form.Item>
          {/* 可选可不选，联表展示，选项包含学院及专业班级 */}
          <Form.Item label="特定班级" name="classId">
            <Cascader />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button htmlType='button' onClick={onReset} style={{ marginRight: '10px' }}>
              取消
            </Button>
            <Button type='primary' htmlType='submit'>
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal title={courseDetail.name} open={showDetailModal} onOk={() => setShowDeatilModal(false)} onCancel={() => setShowDeatilModal(false)}>
        <Flex>
          <Image preview={false} src={class_cover} style={{ minWidth: '250px' }}></Image>
          <div style={{ marginLeft: '20px' }}>
            <h3>主讲老师：{teacherMapList.get(courseDetail.teaId)}</h3>
            <h3>所属学院：{departMapList.get(courseDetail.departId)}</h3>
            <h3>课程简介：{courseDetail?.content || '暂无简介'}</h3>
          </div>
        </Flex>
      </Modal>
    </>
  )
}   