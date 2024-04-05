import React, { useState } from 'react'
import { Button, Form, Image, Input, Flex, Avatar, Carousel, Dropdown, Modal, List, Card, Space } from 'antd'
import { history } from 'umi'

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
    class: '20信管1'
  },
  {
    title: 'Title 2',
    name: '王怡阳',
    class: '20信管1'
  },
  {
    title: 'Title 3',
    name: '王怡阳',
    class: '20信管1'
  }
];




export default () => {
  const [showModal, setShowModal] = useState(false)
  const items = [
    {
      key: '1',
      label: '退出登录',
      onClick: () => {
        Modal.confirm({
          title: '退出登录',
          content: '确认退出登录吗？',
          onOk: () => {
            history.push('/login')
          }
        })
      }
    },
    {
      key: '2',
      label: '个人信息',
      onClick: () => {
        setShowModal(true)
      }
    }
  ]
  const onSearch = (value: string) => {
    console.log(value);
  }

  const addCourse = () => {
    history.push('/home')
  }
  return (
    <>
      <div className='top-bar flex-container'>
        <div>阳光课程平台</div>
        <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
          <div>
            <Avatar src={cover1} style={{ margin: '0 10px' }} />王怡阳
          </div>
        </Dropdown>
      </div>
      <CarouselAuto />
      <div style={{ marginTop: '120px',padding:'0 20px' }}>
        <div className='flex-container'>
          <h1>我的课程</h1>
          <div>
            <Input.Search style={{ width: 200, marginRight: '40px' }} placeholder='搜索课程' onSearch={onSearch} />
            {/* 老师权利 */}
            <Button type='primary' onClick={() => history.push('/login/course/create')}>创建课程</Button>
          </div>
        </div>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          renderItem={({ title, name, class: className }) => (
            <List.Item>
              <Card cover={<img src={class_cover} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />}>
                <h3>{title}</h3>
                <div>{name}</div>
                <div className='flex-container'>
                  <div>{className}</div>
                  {/* 需要判断课程是否属于自己本身 */}
                  {/* <Button type='primary' onClick={addCourse}>添加课程</Button> */}
                  <Button type='primary' onClick={addCourse}>进入课程</Button>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>

      <Modal title="个人信息" open={showModal} onOk={() => setShowModal(false)} onCancel={() => setShowModal(false)}>
        <Form>
          <Form.Item label="姓名">
            <Input value='王怡阳' />
          </Form.Item>
          <Form.Item label="学号">
            <Input value='201801010101' />
          </Form.Item>
          <Form.Item label="学院">
            <Input value='计算机学院' />
          </Form.Item>
          <Form.Item label="专业">
            <Input value='软件工程' />
          </Form.Item>
          <Form.Item label="班级">
            <Input value='软件工程1801' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}   