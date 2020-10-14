import React from 'react';
import { render } from '@testing-library/react';
import { queryByTestId,getByTestId,screen,queryHelpers,fireEvent } from '@testing-library/dom'
import Counter from './Counter';

test('标题是Counter', () => {
  render(<Counter />)
  expect(screen.getByText('Counter'))
})

test('初始值为0', () => {
  render(<Counter />)
  expect(screen.getByDisplayValue('0'))
})

test('根据props回填输入框',()=>{
  render(<Counter num={20}/>)
  expect(screen.getByDisplayValue('20'))
})
test('点击+号加一',()=>{
  render(<Counter num={1}/>)
  fireEvent.click(screen.getByText('+'))
  expect(screen.getByDisplayValue('2'))
})
test('点击-号减一',()=>{
  render(<Counter num={2}/>)
  fireEvent.click(screen.getByText('-'))
  expect(screen.getByDisplayValue('1'))
})

test('设置输入框改变num值',()=>{
  const container = render(<Counter num={3}/>)
  fireEvent.change(screen.getByDisplayValue('3'), { target: { value: '20'} })
  expect(screen.getByDisplayValue('20'))
})

test('输入框只能输入数字，非数字统一设置为0',()=>{
  const container = render(<Counter num={3}/>)
  fireEvent.change(screen.getByDisplayValue('3'), { target: { value: '测试输入汉字'} })
  expect(screen.getByDisplayValue('0'))
})

test('输入框内置数字转换, 输入0032, 最终输出32',()=>{
  const container = render(<Counter num={3}/>)
  fireEvent.change(screen.getByDisplayValue('3'), { target: { value: '0032'} })
  expect(screen.getByDisplayValue('32'))
})

test('设置最大值5，点击加号多次不能超过5',()=>{
  const container = render(<Counter num={3} max={5}/>)
  for(let i=0;i<5;i++){
    // 点击5次加号
    fireEvent.click(screen.getByText('+'))
  }
  expect(screen.getByDisplayValue('5'))
})

test('设置最小值1，点击减号多次不能少于1',()=>{
  const container = render(<Counter num={3} min={1}/>)
  for(let i=0;i<5;i++){
    // 点击5次加号
    fireEvent.click(screen.getByText('-'))
  }
  expect(screen.getByDisplayValue('1'))
})

test('设置最大值与最小值,在输入框上输入数据边界外的数字,结果在数据界限边上',()=>{
  const container = render(<Counter num={3} min={1} max={5}/>)
  fireEvent.change(screen.getByDisplayValue('3'), { target: { value: '8'} })
  expect(screen.getByDisplayValue('5'))
  fireEvent.change(screen.getByDisplayValue('5'), { target: { value: '0'} })
  expect(screen.getByDisplayValue('1'))
})

test('设置step=2，点击+号或-号时候，结果递增2或递减2',()=>{
  const container = render(<Counter num={3} step={2}/>)
  fireEvent.click(screen.getByText('+'))
  fireEvent.click(screen.getByText('+'))
  expect(screen.getByDisplayValue('7'))
  fireEvent.click(screen.getByText('-'))
  expect(screen.getByDisplayValue('5'))
})