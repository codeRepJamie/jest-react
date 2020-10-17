import React, {useState} from 'react';
import { Form, Input, Button, Checkbox, Radio, DatePicker, Select } from 'antd';
import moment from 'moment'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function TestForm(params) {
  const [form] = Form.useForm();
  const [showCertType,changeShowCertType] = useState(true)

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedVal,values) => {

    if(values.insureType === 0){
      changeShowCertType(false)
      values.certType = 0
    }else{
      changeShowCertType(true)
    }

    // 填写投保人身份证号码时候自动填写出生年月/性别
    if(values.certNo != null && values.certType === 0){
      const result = /^\d{6}(\d{4})(\d{2})(\d{2})\d{2}(\d{1})/.exec(values.certNo)
      if(result){
        const [text,year,month,date,sexCode] = result
        if(year != null && month != null  && date != null ){
          form.setFieldsValue({
            birthday: moment(`${year}-${month}-${date}`)
          })
        }
        if(sexCode != null){
          form.setFieldsValue({
            sex: sexCode % 2 === 1 ? 0 : 1
          })
        }
      }
    }
  }

  return (
    <div style={{ width:600, marginTop:60 }}>
      <Form
        form={form}
        {...layout}
        name="basic"
        initialValues={{ certType: 0, sex: 0 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          label="保险类型"
          name="insureType"
          rules={[{ required: true, message: '请选择保险类型' }]}
        >
          <Select>
            <Select.Option value={0} data-testid="人寿险">人寿险</Select.Option>
            <Select.Option value={1} data-testid="旅游险">旅游险</Select.Option>
          </Select>
        </Form.Item>
         <Form.Item
          label="投保人姓名"
          name="personName"
          rules={[{ required: true, message: '请输入投保人姓名' }]}
        >
          <Input />
        </Form.Item>
        {
          showCertType ?
        <Form.Item
          label="证件类型"
          name="certType"
        >
          <Radio.Group>
            <Radio.Button value={0}>身份证</Radio.Button> 
            <Radio.Button value={1}>护照</Radio.Button>
          </Radio.Group>
        </Form.Item> : null
        }
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
          rules={[
            { required: true, message: '请输入手机号码' },
            { pattern:/^1[3|4|5|7|8][0-9]\d{8}$/, message:'请输入正确的手机号码'}
          ]}
        >
          <Input placeholder="请输入手机号码"/>
        </Form.Item>
        <Form.Item
          label="电子邮箱"
          name="email"
          rules={[
            { required: true, message: '请输入电子邮箱' },
            { type:'email', message:'请输入正确的电子邮箱'}
          ]}
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