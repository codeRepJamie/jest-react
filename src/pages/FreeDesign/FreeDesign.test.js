/**
 * 需求文档
 * 您的姓名（必填）必填，默认文案为：请填写您的姓名，可以输入中文或者英文，字符限制在20个以内，未填写时，提示：请输入您的姓名
 * 
 * 手机号码（必填）
 * 未登录时： 需要 手机号码、验证码 登记 才能获取报价
 * 已登录时： 显示当前登录的手机号码，手机号码4-7位脱敏处理，可以[更换号码]、点击[更换号码]，需填写验证码
 * 
 * 获取验证码
 * 未输入手机号时，按钮置灰，禁用；
 * 
 * 点击 [更换号码]   展示如  未登录 所示，即展示可填写的 电话 及 验证码，更换的手机号码不需要注册
 */

import React from 'react';
import { screen,waitFor,fireEvent } from '@testing-library/dom'
import FreeDesign from '.';
import { sleep } from '../../tests/shared/index';
import * as AntdHelper from '../../tests/shared/AntdHelper'

describe('FreeDesign',()=>{
  it("表单必填项,直接提交显示错误", async () => {
    const { container } = AntdHelper.render(<FreeDesign/>)
    const form = container.querySelector('form')
    fireEvent.submit(form)
    await sleep(100)

    expect(screen.getAllByRole('alert'))
  })
  it("测试表单填写正确后提交", async () => {
    const { container } = AntdHelper.render(<FreeDesign />);
    const form = container.querySelector('form')
    AntdHelper.setSelectByLabelText('所在城市', '广州')
    AntdHelper.setSelectByLabelText('装修类型', '全包')
    AntdHelper.setInputByLabelText('您的姓名','周先生')
    AntdHelper.setInputByLabelText('手机号码','15018442345')
    AntdHelper.setInputByLabelText('验证码','111206')
    fireEvent.submit(form)
    await sleep(200)

    expect(screen.queryByRole('alert')).toBeNull()
  })  
})

test("测试输入姓名", async () => {
  const { container } = AntdHelper.render(<FreeDesign />);

  AntdHelper.setInputByLabelText('您的姓名', '周先生')
  await sleep(200)
  expect(screen.queryByRole('alert')).toBeNull()

  AntdHelper.setInputByLabelText('您的姓名', 'Mr. Zhou')
  await sleep(200)
  expect(screen.queryByRole('alert')).toBeNull()
  // 输入含有数字会报错
  AntdHelper.setInputByLabelText('您的姓名', '周先生123')
  await sleep(200)
  expect(screen.getByText('请填写您的姓名，可以输入中文或者英文，字符限制在20个以内'))
  // 输入特殊符号会报错
  AntdHelper.setInputByLabelText('您的姓名', '周先生@%#')
  await sleep(200)
  expect(screen.getByText('请填写您的姓名，可以输入中文或者英文，字符限制在20个以内'))
  // 超出20个字符, 输入21字符
  AntdHelper.setInputByLabelText('您的姓名', '一二三四五六七八九十一二三四五六七八九十一')
  await sleep(200)
  expect(screen.getByText('请填写您的姓名，可以输入中文或者英文，字符限制在20个以内'))
})

describe('测试提交按钮',()=>{
  it("只有填写手机号码、验证码, 才能提交", async () => {
    const { container, queryByCompDisplayText } = AntdHelper.render(<FreeDesign />);
    expect(queryByCompDisplayText('Button','提交').matches('[disabled]')).toBeTruthy()

    AntdHelper.setSelectByLabelText('所在城市', '广州')
    expect(queryByCompDisplayText('Button','提交').matches('[disabled]')).toBeTruthy()

    AntdHelper.setSelectByLabelText('装修类型', '全包')
    expect(queryByCompDisplayText('Button','提交').matches('[disabled]')).toBeTruthy()

    fireEvent.change(screen.getByLabelText('您的姓名'), { target: { value: '周先生'} })
    expect(queryByCompDisplayText('Button','提交').matches('[disabled]')).toBeTruthy()

    AntdHelper.setInputByLabelText('手机号码', '15018442345')
    expect(queryByCompDisplayText('Button','提交').matches('[disabled]')).toBeTruthy()

    AntdHelper.setInputByLabelText('验证码', '111206')
    expect(queryByCompDisplayText('Button','提交').matches('[disabled]')).toBeFalsy()
  })
})

describe('测试手机号码 未登录',()=>{
  it("需要填写手机号码时，隐藏更换号码", async () => {
    const { container } = AntdHelper.render(<FreeDesign />);
    expect(screen.queryByText('更换电话号码').style).toHaveProperty('display','none')
  })

  it("测试输入错误手机号码", async () => {
    const { container } = AntdHelper.render(<FreeDesign />);
    AntdHelper.setInputByLabelText('手机号码', '15018442')
    await sleep(200)
    expect(screen.getByText('请输入正确的手机号码'))
  })

  it("未输入手机号时，验证码按钮置灰", async () => {
    const { container, queryByCompDisplayText } = AntdHelper.render(<FreeDesign />);
    expect(queryByCompDisplayText('Button', '获取验证码').matches('[disabled]')).toBeTruthy()

    // 测试输入错误手机号码 验证码按钮置灰
    AntdHelper.setInputByLabelText('手机号码', '15018442')
    expect(queryByCompDisplayText('Button', '获取验证码').matches('[disabled]')).toBeTruthy()

    AntdHelper.setInputByLabelText('手机号码', '15018442345')
    expect(queryByCompDisplayText('Button', '获取验证码').matches('[disabled]')).toBeFalsy()
  })

  it("点击更换电话号码，清空手机号码,验证码", async () => {
    const { container, queryByCompDisplayText } = AntdHelper.render(<FreeDesign />);
    AntdHelper.setInputByLabelText('手机号码', '15018449987')
    AntdHelper.setInputByLabelText('验证码', '111206')
    fireEvent.click(screen.getByText('更换电话号码'))

    expect(queryByCompDisplayText('Input','手机号码').value).toEqual('')
    expect(queryByCompDisplayText('Input','验证码').value).toEqual('')
    expect(screen.queryByText('更换电话号码').style).toHaveProperty('display','none')
    expect(queryByCompDisplayText('Button', '提交').matches('[disabled]')).toBeTruthy()
  })

  it("点击获取验证码, 清空验证码", async () => {
    const { container, queryByCompDisplayText } = AntdHelper.render(<FreeDesign />);
    AntdHelper.setInputByLabelText('手机号码', '15018449987')
    AntdHelper.setInputByLabelText('验证码', '111206')
    fireEvent.click(screen.getByText('获取验证码').closest('button'))

    expect(queryByCompDisplayText('Input','验证码').value).toEqual('')
    expect(queryByCompDisplayText('Button', '提交').matches('[disabled]')).toBeTruthy()
  })
})