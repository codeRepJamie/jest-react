import React from "react";
import { render } from "@testing-library/react";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import TestForm from ".";
import { Button } from "antd";
import { sleep } from '../../tests/shared/index';
import * as AntdHelper from '../../tests/shared/AntdHelper'

// antd某些组件会使用window对象, 使用jest模拟
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

describe("测试表单输入检查", () => {
  it("测试表单必填项,直接提交显示错误", async () => {
    const { container } = AntdHelper.render(<TestForm />);
    const form = container.querySelector('form')
    fireEvent.submit(form)
    await sleep(100)
    expect(screen.getAllByRole('alert'))
  });

  it("测试表单填写正确后提交", async () => {
    const { container, queryByCompDisplayText } = AntdHelper.render(<TestForm />); 
    const form = container.querySelector('form')
    AntdHelper.setSelectByLabelText('保险类型', '人寿险')
    AntdHelper.setInputByLabelText('投保人姓名', '王饱饱')
    AntdHelper.setInputByLabelText('证件号码', '511028198312020035')
    AntdHelper.setInputByLabelText('手机号码', '15018460442')
    AntdHelper.setInputByLabelText('电子邮箱', 'example@qq.com')
    fireEvent.click(container.querySelector('#basic_remember'))
    fireEvent.submit(form)
    await sleep(200)

    expect(queryByCompDisplayText('FormItemAlert')).toBeNull()
  });

  it("测试手机号码格式", async () => {
    const { container, queryByCompDisplayText } = AntdHelper.render(<TestForm />);

    AntdHelper.setInputByLabelText('手机号码', '15018460442')
    await sleep(100)
    expect(queryByCompDisplayText('FormItemAlert','手机号码')).toBeNull()

    AntdHelper.setInputByLabelText('手机号码', '9999')
    await sleep(100)
    expect(queryByCompDisplayText('FormItemAlert','手机号码')).not.toBeNull()
  })

  it("测试电子邮箱格式", async () => {
    const { container, queryByCompDisplayText } = AntdHelper.render(<TestForm />);

    AntdHelper.setInputByLabelText('电子邮箱', 'asdfjlx@')
    await sleep(100)
    expect(queryByCompDisplayText('FormItemAlert','电子邮箱')).not.toBeNull()

    AntdHelper.setInputByLabelText('电子邮箱', 'example@qq.com')
    await sleep(100)
    expect(queryByCompDisplayText('FormItemAlert','电子邮箱')).toBeNull()
  })
});

describe("测试表单联动", () => {
  it("填写投保人身份证号码格式错误，组件不做任何处理，且不报错", async () => {
    const { container, queryByCompDisplayText } = AntdHelper.render(<TestForm />); 
    AntdHelper.setRadioGroupByLabelText('证件类型','身份证')
    AntdHelper.setInputByLabelText('证件号码', '511028198')
    expect(queryByCompDisplayText('DatePicker','出生年月').value).toEqual('')
  })
  
  it("填写投保人身份证号码时候，自动填写出生年月", async () => {
    const { container, queryByCompDisplayText } = AntdHelper.render(<TestForm />);
    AntdHelper.setRadioGroupByLabelText('证件类型','身份证')
    AntdHelper.setInputByLabelText('证件号码', '511028198312020035')
    expect(queryByCompDisplayText('DatePicker','出生年月').value).toEqual('1983-12-02')
  })

  it("填写投保人其他证件号码时候，出生年月不做任何处理", async () => {
    const { container, queryByCompDisplayText } = AntdHelper.render(<TestForm />);
    AntdHelper.setRadioGroupByLabelText('证件类型','护照')
    AntdHelper.setInputByLabelText('证件号码', '511028198312020035')
    expect(queryByCompDisplayText('DatePicker','出生年月').value).toEqual('')
  })

  it("填写投保人身份证号码时候，自动判断性别", async () => {
    const { container, queryByCompDisplayText } = AntdHelper.render(<TestForm />);
    AntdHelper.setRadioGroupByLabelText('证件类型','身份证')
    // 模拟输入男性身份证号，第17为奇数
    AntdHelper.setInputByLabelText('证件号码', '511028198312020035')
    expect(queryByCompDisplayText('RadioGroup','性别').value).toEqual('0')
    // 模拟输入女性身份证号，第17为偶数
    AntdHelper.setInputByLabelText('证件号码', '511028198312020025')
    expect(queryByCompDisplayText('RadioGroup','性别').value).toEqual('1')
  })

  it('选择人寿险后，证件类型自动隐藏', async() => {
    const { container, queryByCompDisplayText } = AntdHelper.render(<TestForm />);
    AntdHelper.setSelectByLabelText('保险类型', '人寿险')
    expect(queryByCompDisplayText('RadioGroup','证件类型')).toBeNull()
  })
})
