import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Cascader, Image, Flex, Card, Select, message } from 'antd';
import { connect } from 'dva'
import { history } from 'umi'
// import { setCookie } from '@/utils/cookie'
import { login, registerApi } from '@/api/login'
import { storage } from '@/utils'
const SchoolImage = require('@/assets/images/school.jpg')

import './index.less'
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
export default () => {
  // const Demo = ({ users, dispatch }) => {
  const [register, setRegister] = useState(false)
  const [isTeacher, setIsTeacher] = useState(false)

  // 提交登录
  const onFinish = async (values: any) => {
    // 提交给dva 中的effects：Action 处理器
    // new Promise((resolve, reject) => {
    //   dispatch({ type: 'users/fetch', payload: { resolve, reject, userInfo: values } });
    // }).then((data) => {
    //   if (data === 'SUCCESS') { //跳转首页
    //     history.push('/home')
    //   }
    // });
    // console.log("register" in values, values);

    if ("login" in values) {
      const res = await login(values.login)
      console.log(res);
      message.success('登录成功')
      if (values.login.teaId === '123') {
        storage.setItem('userInfo1', { admin: true })
      } else {
        storage.setItem('userInfo1', values.login)
      }
      history.push('/login/course')

      // if (res) {
      //   message.success('登录成功')
      //   storage.setItem('userInfo1', values.login)
      //   // history.push('/login/course')
      // } else {
      //   message.error('账号或密码错误')
      // }
    }

    if ("register" in values) {
      const res = await registerApi(values.register)
      if (res) {
        message.success('注册成功')
        // Modal.confirm({
        //   title: '退出登录',
        //   content: '确认退出登录吗？',
        //   onOk: () => {
        //     history.push('/login')
        //     storage.removeItem('userInfo1')
        //   }
        // })
        setRegister(false)
      } else {
        message.error('系统出小差了。。')
      }
    }
  };

  const onChange = (value: (string | number)[]) => {
    console.log(value);
  };

  return (
    <div className="container">
      <Flex style={{ boxShadow: '25px 25px 15px #dedede' }}>
        <Image preview={false} src={SchoolImage}></Image>
        <Card style={{ minWidth: '500px' }}>
          <Flex justify={'space-between'}>
            {!register && <h1>登 录</h1>}
            {register && <h1>注 册</h1>}
            {!register && <h3 style={{ marginTop: '10px' }} onClick={() => { setRegister(true), setIsTeacher(false) }}>没有账号？点击注册</h3>}
            {register && <h3 style={{ marginTop: '10px' }} onClick={() => { setRegister(false) }}>返回登录</h3>}
          </Flex>
          {!register ?
            (<Form name="login" onFinish={onFinish} >
              <Form.Item label="身份" name={["login", "isTeacher"]}>
                <Select
                  options={[
                    { label: '学生', value: false },
                    { label: '老师', value: true }
                  ]}
                  onChange={(value) => setIsTeacher(value)}
                  placeholder="请选择身份"
                />
              </Form.Item>
              {
                isTeacher ?
                  <Form.Item label="教工号" name={["login", "teaId"]}>
                    <Input placeholder='请输入教工号' />
                  </Form.Item> :
                  <Form.Item label="学号" name={["login", "stuId"]}>
                    <Input placeholder='请输入学号' />
                  </Form.Item>
              }
              <Form.Item label="密码" name={["login", "password"]}>
                <Input.Password placeholder='请输入密码' />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
              </Form.Item>
            </Form>
            ) : (
              <Form name="register" onFinish={onFinish} >
                <Form.Item label="身份" name={["register", "isTeacher"]}>
                  <Select
                    options={[
                      { label: '学生', value: false },
                      { label: '老师', value: true },
                    ]}
                    onChange={(value) => setIsTeacher(value)}
                    placeholder="请选择身份"
                  />
                </Form.Item>
                <Form.Item label="姓名" name={["register", "name"]}>
                  <Input placeholder='请输入姓名' />
                </Form.Item>
                <Form.Item label="所属学院" name={["register", "department"]}>
                  <Select />
                </Form.Item>
                {!isTeacher &&
                  <Form.Item label="所属班级" name={["register", "class"]}>
                    <Cascader options={options} onChange={onChange} placeholder="请选择班级" />
                  </Form.Item>}
                <Form.Item label="密码" name={["register", "password"]}>
                  <Input.Password />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    注册
                  </Button>
                </Form.Item>
              </Form>
            )
          }

        </Card>

      </Flex>
      <div className="bottom-fixed">
        <Button type='link' onClick={() => { window.open("https://github.com/DESURZEE123/SunCourse_Platform", "_blank"); }}>仓库地址</Button>
        <Button type='link'>使用条款</Button>
        <Button type='link'>帮助文档</Button>
      </div>
    </div>
  );
};
// const mapStateToProps = ({ users }) => {
//   return { users, }
// }
// export default connect(mapStateToProps)(Demo)
