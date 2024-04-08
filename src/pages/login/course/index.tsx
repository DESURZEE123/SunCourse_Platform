import React, { useState } from 'react'
import { Button, Form, Image, Input, message, Avatar, Carousel, Dropdown, Modal, List, Card, Space, Select, Flex } from 'antd'
import { history } from 'umi'
import { storage } from '@/utils'
import { createCourse } from '@/api/login'

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

const data = [
  {
    title: '计算机科学',
    name: '王怡阳',
    class: '20信管1',
    courseId: 1
  },
  {
    title: 'Title 2',
    name: '王怡阳',
    class: '20信管1',
    courseId: 2
  },
  {
    title: 'Title 3',
    name: '王怡阳',
    class: '20信管1',
    courseId: 3
  },
  {
    title: 'Title 3',
    name: '王怡阳',
    class: '20信管1',
    courseId: 4
  },
  {
    title: 'Title 3',
    name: '王怡阳',
    class: '20信管1',
    courseId: 5
  }
];

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}
const user = storage.getItem('userInfo1')
export default () => {
  const [form] = Form.useForm()
  const [showClassModal, setShowClassModal] = useState(false)
  const [showDetailModal, setShowDeatilModal] = useState(false)
  const items = [
    {
      key: '1',
      label: '个人信息',
      onClick: () => {
        Modal.confirm({
          title: '个人信息',
          content:
            <>
              <h3>姓名：{'尾牙宴'}</h3>
              <h3>学号：{'201801010101'}</h3>
              <h3>班级：{'20信管1'}</h3>
              <h3>学院：{'管理工程学院'}</h3>
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
  const onSearch = (value: string) => {
    console.log(value);
  }

  const getCourse = (courseId) => {
    storage.setItem('courseId', courseId)
    history.push('/home')
  }

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
            <Avatar src={cover1} style={{ margin: '0 10px' }} />王怡阳
          </div>
        </Dropdown>
      </div>
      <CarouselAuto />
      <div style={{ padding: '0 60px' }}>
        <div className='flex-container'>
          <h1>我的课程</h1>
          <div>
            <Input.Search style={{ width: 200, marginRight: '40px' }} placeholder='搜索课程' onSearch={onSearch} />
            {/* 老师权利 */}
            {user.isTeacher && (<Button type='primary' onClick={() => setShowClassModal(true)}>创建课程</Button>)}
          </div>
        </div>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          renderItem={({ title, name, class: className, courseId }) => (
            <List.Item>
              <Card
                cover={<img src={class_cover}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  onClick={() => { setShowDeatilModal(true) }}
                />}>
                <h3>{title}</h3>
                <div>{name}</div>
                <div className='flex-container'>
                  <div>{className}</div>
                  {/* 需要判断课程是否属于自己本身 */}
                  <Button type='primary'
                    onClick={() => {
                      Modal.confirm({
                        content: '确认添加该课程吗？',
                        onOk: () => {
                          message.success('添加成功')
                        }
                      })
                    }}>
                    添加课程</Button>
                  <Button type='primary' onClick={() => { getCourse(courseId) }}>进入课程</Button>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>

      <Modal closable={false} title="创建课程" open={showClassModal} footer={null}>
        <Form form={form} {...layout} onFinish={onFinish}>
          <Form.Item label="课程名称" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="课程简介" name="content">
            <Input.TextArea />
          </Form.Item>
          {/* <Form.Item label="所属学院" name="departId">
            <Select />
          </Form.Item> */}
          {/* 可选可不选，联表展示，选项包含学院及专业班级 */}
          <Form.Item label="特定班级" name="classId">
            <Select />
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
      <Modal title="课程详情" open={showDetailModal} onOk={() => setShowDeatilModal(false)} onCancel={() => setShowDeatilModal(false)}>
        <Flex>
          <Image preview={false} src={class_cover} style={{ minWidth: '250px' }}></Image>
          <div style={{ marginLeft: '20px' }}>
            <h3>主讲老师：{'尾牙宴'}</h3>
            <h3>所属学院：{'管理工程学院'}</h3>
            <h3>课程简介：{'这门课程xxxdccdscewdfc鹅夫人v规定人头比光度法不通过地方vcccccccccx'}</h3>
          </div>
        </Flex>
      </Modal>
    </>
  )
}   