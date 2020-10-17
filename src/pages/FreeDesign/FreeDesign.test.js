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
import { render } from '@testing-library/react';
import { screen,waitFor,fireEvent } from '@testing-library/dom'
import FreeDesign from '.';
import { setDatePickerByLabelText, setSelectByLabelText, queryRadioInputByLabelText, queryAlertByLabelText, sleep } from '../../tests/shared/index';

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('FreeDesign',()=>{
  it("表单必填项,直接提交显示错误", async () => {
    const { container } = render(<FreeDesign />);
    const form = container.querySelector('form')
    fireEvent.submit(form)
    await sleep(100)
    expect(screen.getAllByRole('alert'))
  })
  it("测试表单填写正确后提交", async () => {
    const { container } = render(<FreeDesign />);
    const form = container.querySelector('form')
    setSelectByLabelText('所在城市', '广州')
    setSelectByLabelText('装修类型', '全包')
    fireEvent.change(screen.getByLabelText('您的姓名'), { target: { value: '周先生'} })
    fireEvent.change(screen.getByLabelText('手机号码'), { target: { value: '15018442345'} })
    fireEvent.change(screen.getByLabelText('验证码'), { target: { value: '111206'} })
    fireEvent.submit(form)
    await sleep(200)
    expect(screen.queryByRole('alert')).toBeNull()
  })  
})

test("测试输入姓名", async () => {
  const { container } = render(<FreeDesign />);
  fireEvent.change(screen.getByLabelText('您的姓名'), { target: { value: '周先生'} })
  await sleep(200)
  expect(screen.queryByRole('alert')).toBeNull()
  fireEvent.change(screen.getByLabelText('您的姓名'), { target: { value: 'Mr. Zhou'} })
  await sleep(200)
  expect(screen.queryByRole('alert')).toBeNull()
  // 输入含有数字会报错
  fireEvent.change(screen.getByLabelText('您的姓名'), { target: { value: '周先生123'} })
  await sleep(200)
  expect(screen.getByText('请填写您的姓名，可以输入中文或者英文，字符限制在20个以内'))
  // 输入特殊符号会报错
  fireEvent.change(screen.getByLabelText('您的姓名'), { target: { value: '周先生@%#'} })
  await sleep(200)
  expect(screen.getByText('请填写您的姓名，可以输入中文或者英文，字符限制在20个以内'))
  // 超出20个字符, 输入21字符
  fireEvent.change(screen.getByLabelText('您的姓名'), { target: { value: '一二三四五六七八九十一二三四五六七八九十一'} })
  await sleep(200)
  expect(screen.getByText('请填写您的姓名，可以输入中文或者英文，字符限制在20个以内'))
})

describe('测试提交按钮',()=>{
  it("只有填写手机号码、验证码, 才能提交", async () => {
    const { container } = render(<FreeDesign />);
    expect(screen.getByText('提 交').closest('button[disabled]')).not.toBeNull()
    setSelectByLabelText('所在城市', '广州')
    expect(screen.getByText('提 交').closest('button[disabled]')).not.toBeNull()
    setSelectByLabelText('装修类型', '全包')
    expect(screen.getByText('提 交').closest('button[disabled]')).not.toBeNull()
    fireEvent.change(screen.getByLabelText('您的姓名'), { target: { value: '周先生'} })
    expect(screen.getByText('提 交').closest('button[disabled]')).not.toBeNull()
    fireEvent.change(screen.getByLabelText('手机号码'), { target: { value: '15018442345'} })
    expect(screen.getByText('提 交').closest('button[disabled]')).not.toBeNull()
    fireEvent.change(screen.getByLabelText('验证码'), { target: { value: '111206'} })
    expect(screen.getByText('提 交').closest('button[disabled]')).toBeNull()
  })
})

describe('测试手机号码 未登录',()=>{
  it("需要填写手机号码时，隐藏更换号码", async () => {
    const { container } = render(<FreeDesign />);
    expect(screen.queryByText('更换电话号码').style).toHaveProperty('display','none')
  })

  it("测试输入错误手机号码", async () => {
    const { container } = render(<FreeDesign />);
    fireEvent.change(screen.getByLabelText('手机号码'), { target: { value: '15018442'} })
    await sleep(200)
    expect(screen.getByText('请输入正确的手机号码'))
  })

  it("未输入手机号时，验证码按钮置灰", async () => {
    const { container } = render(<FreeDesign />);
    expect(screen.getByText('获取验证码').closest('button[disabled]'))

    // 测试输入错误手机号码 验证码按钮置灰
    fireEvent.change(screen.getByLabelText('手机号码'), { target: { value: '15018442'} })
    expect(screen.getByText('获取验证码').closest('button[disabled]'))

    fireEvent.change(screen.getByLabelText('手机号码'), { target: { value: '15018442345'} })
    expect(screen.queryByText('获取验证码').closest('button[disabled]')).toBeNull()
  })

  it("点击更换电话号码，清空手机号码,验证码", async () => {
    const { container } = render(<FreeDesign />);
    fireEvent.change(screen.getByLabelText('手机号码'), { target: { value: '15018449987'} })
    fireEvent.change(screen.getByLabelText('验证码'), { target: { value: '111206'} })
    fireEvent.click(screen.getByText('更换电话号码'))
    expect(screen.getByLabelText('手机号码').value).toEqual('')
    expect(screen.getByLabelText('验证码').value).toEqual('')
    expect(screen.queryByText('更换电话号码').style).toHaveProperty('display','none')
    expect(screen.getByText('提 交').closest('button[disabled]')).not.toBeNull()
  })

  it("点击获取验证码, 清空验证码", async () => {
    const { container } = render(<FreeDesign />);
    fireEvent.change(screen.getByLabelText('验证码'), { target: { value: '111206'} })
    fireEvent.click(screen.getByText('获取验证码').closest('button'))
    expect(screen.getByLabelText('验证码').value).toEqual('')
    expect(screen.getByText('提 交').closest('button[disabled]')).not.toBeNull()
  })
})