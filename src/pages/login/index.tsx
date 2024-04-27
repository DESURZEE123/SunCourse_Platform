import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Cascader, Image, Flex, Card, Select, message, Modal } from 'antd';
import { history, useModel } from 'umi'
// import { setCookie } from '@/utils/cookie'
import { login, registerApi } from '@/api/login'
import { getMajorList, getClassList } from '@/api/user'
import { storage, ClassOptionTrans } from '@/utils'
const SchoolImage = require('@/assets/images/school.jpg')

import './index.less'
export default () => {
  const { departMapList, classMapList } = useModel('course')
  const [form] = Form.useForm()
  const [register, setRegister] = useState(true)
  const [isTeacher, setIsTeacher] = useState(false)
  const [classOptions, setClassOptions] = useState([])

  useEffect(() => {
    storage.removeItem('userInfo1')
    form.resetFields()
  }, [])

  // 提交登录
  const onFinish = async (values: any) => {
    if ("login" in values) {
      const { status } = await login(values.login)
      if (status === 200) {
        message.success('登录成功')
        storage.setItem('userInfo1', values.login)
        // history.push('/login/course')
      } else if (values.login.teaId === '123') {
        storage.setItem('userInfo1', { admin: true })
        history.push('/home')
      } else if (status === 404) {
        message.error('账号或密码错误')
      }
    }
    if ("register" in values) {
      const { departId, class: classOptions } = values.register;
      const params = !isTeacher ? {
        Id: Date.now() % 10000,
        departId: parseInt(departId),
        classValue: classMapList.get(parseInt(classOptions[1])),
        classId: parseInt(classOptions[1]),
        ...values.register
      } :
        {
          Id: Date.now() % 10000,
          departId: parseInt(departId),
          ...values.register
        }
      const res = await registerApi(params)
      if (res) {
        message.success('注册成功')
        Modal.confirm({
          title: '注册成功',
          content: `您的账号为：${res.Id}`,
          onOk: () => {
            setRegister(false)
            form.resetFields()
          }
        })
      } else {
        message.error('系统出小差了。。')
      }
    }
  };

  const selectDepart = async (departId) => {
    const majorData = await getMajorList({ departId })
    const classData = await getClassList()
    const options = ClassOptionTrans(majorData, classData, departId)
    setClassOptions(options)
  }

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
            (<Form name="login" onFinish={onFinish} form={form} >
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
                <Form.Item label="所属学院" name={["register", "departId"]}>
                  <Select options={Array.from(departMapList, ([value, label]) => ({ value, label }))} onChange={selectDepart} />
                </Form.Item>
                {!isTeacher &&
                  <Form.Item label="所属班级" name={["register", "class"]}>
                    <Cascader options={classOptions} placeholder="请选择班级" />
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
