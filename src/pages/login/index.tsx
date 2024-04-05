import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Image, Flex, Card, Space, Select } from 'antd';
import { connect } from 'dva'
import { history } from 'umi'
const SchoolImage = require('@/assets/images/school.jpg')
import styled from 'styled-components'

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
    console.log(values);
    
    history.push('/login/course')

  };

  return (
    <div style={{ padding: '70px 70px', backgroundColor: '#fefefe' }}>
      <Flex style={{ boxShadow: '25px 25px 15px #dedede' }}>
        <Image preview={false} src={SchoolImage}></Image>
        <Card style={{ minWidth: '500px' }}>
          <Space>
            <h1 onClick={() => { setRegister(false) }}>登录</h1>
            <h3 onClick={() => { setRegister(true) }}>没有账号？点击注册</h3>
          </Space>
          {!register ?
            (<Form name="login" onFinish={onFinish} >
              <Form.Item label="身份" name={["login","isTeacher"]}>
                <Select />
              </Form.Item>
              <Form.Item label="学号" name={["login","stuId"]}>
                <Input />
              </Form.Item>
              <Form.Item label="教工号" name={["login","teaId"]}>
                <Input />
              </Form.Item>
              <Form.Item label="密码" name={["login","password"]}>
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
              </Form.Item>
            </Form>
            ) : (
              <Form name="register" onFinish={onFinish} >
                <Form.Item label="身份" name={["register","isTeacher"]}>
                  <Select />
                </Form.Item>
                <Form.Item label="姓名"  name={["register","name"]}>
                  <Input />
                </Form.Item>
                <Form.Item label="所属学院"  name={["register","department"]}>
                  <Select />
                </Form.Item>
                <Form.Item label="所属班级"  name={["register","class"]}>
                  <Select />
                </Form.Item>
                <Form.Item label="密码"  name={["register","password"]}>
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
      <h4>博主仓库 使用条款 帮助文档</h4>
    </div>


  );
};
// const mapStateToProps = ({ users }) => {
//   return { users, }
// }
// export default connect(mapStateToProps)(Demo)
