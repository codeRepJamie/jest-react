import React, {useState} from 'react';
import {Form,Select,Input, Button} from 'antd'
import './index.css'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const isNull = value => value === '' || value == null || (Array.isArray(value) && value.length === 0)

export default function FreeDesign(){
  const [form] = Form.useForm();

  const [state, changeState] = useState({
    showChangeButton: false,
    enableSubmit: false
  })

  const onValuesChange = (changedVal,values) => {
    changeState({
      ...state,
      enableSubmit: !isNull(values.phone) &&  !isNull(values.vertify),
      showChangeButton: !isNull(values.phone)
    })
  }

  // 点击更换电话号码，清空手机号码,验证码
  const changePhone = event => {
    form.setFieldsValue({
      phone: '',
      vertify: '',
    })
    changeState({
      ...state,
      enableSubmit: false,
      showChangeButton: false
    })
  }

  const changeVertify = event => {
    form.setFieldsValue({
      vertify: '',
    })
    changeState({
      ...state,
      enableSubmit: false,
    })
  }

  const onFinish = values => {
    console.log('Success:', values);
  };

  return (
    <div className="freeDesign" style={{ width:600, marginTop:60 }}>
      <Form form={form} {...layout} onFinish={onFinish} onValuesChange={onValuesChange}>
        <h1>抢免费设计名额</h1>
        <Form.Item label="所在城市" name="city" rules={[{required:true,message:'请输入城市'}]}>
          <Select>
            <Select.Option value={0}>广州</Select.Option>
            <Select.Option value={1}>深圳</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="装修类型" name="type" rules={[{required:true,message:'请输入装修类型'}]}>
          <Select>
            <Select.Option value={0}>全包</Select.Option>
            <Select.Option value={1}>半包</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="您的姓名" name="name" rules={
          [
            {required:true,message:'请输入姓名'},
            {pattern:/^[a-zA-Z.\u4e00-\u9fa5 ]{1,20}$/,message:'请填写您的姓名，可以输入中文或者英文，字符限制在20个以内'},
          ]
        }>
          <Input placeholder="您的姓名，如周先生/王女士"/>
        </Form.Item>
        <Form.Item label="手机号码" name="phone" rules={
          [
            {required:true,message:'请输入手机号码'},
            {pattern:/^1[3|4|5|7|8][0-9]\d{8}$/, message:'请输入正确的手机号码'}
          ]
        }>
          <Input placeholder="输入手机号码" suffix={<a onClick={changePhone} style={{display:state.showChangeButton?'inline-block':'none'}} href="#">更换电话号码</a>}/>
        </Form.Item>
        <Form.Item label="验证码" name="vertify" rules={[{required:true,message:'请输入验证码'}]}>
          <Input addonAfter={<Button onClick={changeVertify}>获取验证码</Button>}/>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType="submit" {...{ disabled : !state.enableSubmit }}>提交</Button>
        </Form.Item>
      </Form>
    </div>
  )
}