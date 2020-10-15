import React from 'react';
import { Form, Input, Button, Checkbox, Radio, DatePicker } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function TestForm(params) {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ width:600, marginTop:60 }}>
      <Form
        {...layout}
        name="basic"
        initialValues={{ certType: 0, sex: 0 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
         <Form.Item
          label="投保人姓名"
          name="personName"
          rules={[{ required: true, message: '请输入投保人姓名！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="证件类型"
          name="certType"
        >
          <Radio.Group>
            <Radio.Button value={0}>身份证</Radio.Button> 
            <Radio.Button value={1}>护照</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="证件号码"
          name="certNo"
          rules={[{ required: true, message: '请输入证件号码' }]}
        >
          <Input placeholder="请输入证件号码"/>
        </Form.Item>
        <Form.Item
          label="性别"
          name="sex"
        >
          <Radio.Group>
            <Radio.Button value={0}>男</Radio.Button> 
            <Radio.Button value={1}>女</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="出生年月"
          name="birthday"
          rules={[{ required: true, message: '请输入出生年月' }]}
        >
          <DatePicker locale="zh_CN" style={{width: 200}} placeholder="请输入出生年月"/>
        </Form.Item>
        <Form.Item
          label="手机号码"
          name="mobile"
          rules={[{ required: true, message: '请输入手机号码' }]}
        >
          <Input placeholder="请输入手机号码"/>
        </Form.Item>
        <Form.Item
          label="电子邮箱"
          name="email"
          rules={[{ required: true, message: '请输入电子邮箱' }]}
        >
          <Input placeholder="此邮箱将用于接收电子保单"/>
        </Form.Item>
        <Form.Item {...tailLayout} name="remember" valuePropName="checked" rules={[{ required: true, message: '请先阅读保险信息须知' }]}>
          <Checkbox>已阅读保险信息须知</Checkbox>
        </Form.Item>
        <Form.Item {...tailLayout}> 
          <Button type="primary" htmlType="submit">
            提交表单
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}