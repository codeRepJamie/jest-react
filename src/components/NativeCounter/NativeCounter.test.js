import React from 'react';
import { render } from '@testing-library/react';
import { queryByTestId,getByTestId,screen,queryHelpers,fireEvent } from '@testing-library/dom'
import { mountTest } from '../../tests/shared/index';
import NativeCounter from '.';

describe('NativeCounter',()=>{
  mountTest(NativeCounter)

  test('标题是NativeCounter', () => {
    render(<NativeCounter />)
    expect(screen.getByText('NativeCounter'))
  })

  test('无初始值，输入框为空字符串', () => {
    render(<NativeCounter />)
    expect(screen.getByDisplayValue(''))
  })

  test('无初始值，点击+号', () => {
    render(<NativeCounter />)
    fireEvent.click(screen.getByText('+'))
    expect(screen.getByDisplayValue('1'))
  })

  test('无初始值，点击-号', () => {
    render(<NativeCounter />)
    fireEvent.click(screen.getByText('-'))
    expect(screen.getByDisplayValue('-1'))
  })

  test('根据props回填输入框',()=>{
    render(<NativeCounter num={20}/>)
    expect(screen.getByDisplayValue('20'))
  })

  test('点击+号加一',()=>{
    render(<NativeCounter num={1}/>)
    fireEvent.click(screen.getByText('+'))
    expect(screen.getByDisplayValue('2'))
  })

  test('点击-号减一',()=>{
    render(<NativeCounter num={2}/>)
    fireEvent.click(screen.getByText('-'))
    expect(screen.getByDisplayValue('1'))
  })

  test('设置输入框改变num值,对输入框输入数字字符进行处理',()=>{
    const container = render(<NativeCounter num={3}/>)
    fireEvent.change(screen.getByDisplayValue('3'), { target: { value: '0'} })
    expect(screen.getByDisplayValue('0'))
    fireEvent.change(screen.getByDisplayValue('0'), { target: { value: '20'} })
    expect(screen.getByDisplayValue('20'))
    
  })

  test('输入框输入空值,输入框显示为空',()=>{
    const container = render(<NativeCounter num={3}/>)
    fireEvent.change(screen.getByDisplayValue('3'), { target: { value: ''} })
    expect(screen.getByDisplayValue(''))
  })

  test('输入框只能输入数字，非数字统一设置为0',()=>{
    const container = render(<NativeCounter num={3}/>)
    fireEvent.change(screen.getByDisplayValue('3'), { target: { value: '测试输入汉字'} })
    expect(screen.getByDisplayValue(''))
  })

  test('输入框内置数字转换, 输入0032, 最终输出32',()=>{
    const container = render(<NativeCounter num={3}/>)
    fireEvent.change(screen.getByDisplayValue('3'), { target: { value: '0032'} })
    expect(screen.getByDisplayValue('32'))
  })

  test('设置最大值5，点击加号多次不能超过5',()=>{
    const container = render(<NativeCounter num={3} max={5}/>)
    for(let i=0;i<5;i++){
      // 点击5次加号
      fireEvent.click(screen.getByText('+'))
    }
    expect(screen.getByDisplayValue('5'))
  })

  test('设置最小值1，点击减号多次不能少于1',()=>{
    const container = render(<NativeCounter num={3} min={1}/>)
    for(let i=0;i<5;i++){
      // 点击5次加号
      fireEvent.click(screen.getByText('-'))
    }
    expect(screen.getByDisplayValue('1'))
  })

  test('无初始值,设置最小值1，点击减号多次不能少于1',()=>{
    const container = render(<NativeCounter min={1}/>)
    for(let i=0;i<5;i++){
      // 点击5次加号
      fireEvent.click(screen.getByText('-'))
    }
    expect(screen.getByDisplayValue('1'))
  })

  test('设置最大值与最小值,在输入框上输入数据边界外的数字,结果在数据界限边上',()=>{
    const container = render(<NativeCounter num={3} min={1} max={5}/>)
    fireEvent.change(screen.getByDisplayValue('3'), { target: { value: '8'} })
    expect(screen.getByDisplayValue('5'))
    fireEvent.change(screen.getByDisplayValue('5'), { target: { value: '0'} })
    expect(screen.getByDisplayValue('1'))
  })

  test('设置step=2，点击+号或-号时候，结果递增2或递减2',()=>{
    const container = render(<NativeCounter num={3} step={2}/>)
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('+'))
    expect(screen.getByDisplayValue('7'))
    fireEvent.click(screen.getByText('-'))
    expect(screen.getByDisplayValue('5'))
  })

  test('测试更改数据回调',()=>{
    const changeNumCb = jest.fn(num=>{})
    const container = render(<NativeCounter num={3} onChange={changeNumCb}/>)
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('-'))
    fireEvent.change(screen.getByDisplayValue('4'), { target: { value: '0'} })
    // 此 mock 函数被调用了4次
    expect(changeNumCb.mock.calls.length).toBe(4)
    // 第一次函数调用的返回值是 4
    expect(changeNumCb.mock.calls[0][0]).toBe(4)
    // 第二次函数调用的返回值是 5
    expect(changeNumCb.mock.calls[1][0]).toBe(5)
    // 第三次函数调用的返回值是 4
    expect(changeNumCb.mock.calls[2][0]).toBe(4)
    // 第四次函数调用的返回值是 0
    expect(changeNumCb.mock.calls[3][0]).toBe(0)
  })

  test('输入框输入负号-,输入框显示为"-",回调不触发',()=>{
    const changeNumCb = jest.fn(num=>{})
    const container = render(<NativeCounter num={3} onChange={changeNumCb}/>)
    fireEvent.change(screen.getByDisplayValue('3'), { target: { value: '-'} })
    expect(screen.getByDisplayValue('-'))
    // 此 mock 函数被调用了0次
    expect(changeNumCb.mock.calls.length).toBe(0)
  })
})