import { renderHook, act } from '@testing-library/react-hooks'
import useCounter from './useCounter'

describe('useCounter hooks test',()=>{
  it('初始值&输出类型测试', () => {
    const { result } = renderHook(() => useCounter({ num: 0 }))
    expect(result.current.innerNum).toBe(0)
    expect(typeof result.current.addNum).toBe('function')
    expect(typeof result.current.minusNum).toBe('function')
    expect(typeof result.current.changeNum).toBe('function')
  })
  it('增加数字', () => {
    const { result } = renderHook(() => useCounter({ num: 0 }))
    act(() => {
      result.current.addNum()
    })
    expect(result.current.innerNum).toBe(1)
  })
  
  it('减少数字', () => {
    const { result } = renderHook(() => useCounter({ num: 2 }))
    act(() => {
      result.current.minusNum()
    })
    expect(result.current.innerNum).toBe(1)
  })
  
  it('根据props更新数字',()=>{
    const { result } = renderHook(() => useCounter({ num: 20 }))
    expect(result.current.innerNum).toBe(20)
  })

  it('changeNum改变数字',()=>{
    const { result } = renderHook(() => useCounter({ num: 20 }))
    act(() => {
      result.current.changeNum({ target:{ value:30 } })
    })
    expect(result.current.innerNum).toBe(30)
  })
  
  it('changeNum输入空值,数字为空值',()=>{
    const { result } = renderHook(() => useCounter({}))
    act(() => {
      result.current.changeNum({ target:{ value: '' } })
    })
    expect(result.current.innerNum).toBe('')
  })
  
  it('changeNum输入只能输入数字，非数字统一设置为0',()=>{
    const { result } = renderHook(() => useCounter({}))
    act(() => {
      result.current.changeNum({ target:{ value: '测试输入汉字' } })
    })
    expect(result.current.innerNum).toBe('')
  })
  
  it('changeNum输入框内置数字转换, 输入0032, 最终输出32',()=>{
    const { result } = renderHook(() => useCounter({}))
    act(() => {
      result.current.changeNum({ target:{ value: '0032' } })
    })
    expect(result.current.innerNum).toBe(32)
  })
  
  it('设置最大值5，新增多次不能超过5',()=>{
    const { result } = renderHook(() => useCounter({ num:3, max:5 }))
    for(let i=0;i<5;i++){
      act(() => {
        result.current.addNum()
      })
    }
    expect(result.current.innerNum).toBe(5)
  })

  it('设置最小值1，减少多次不能少于1',()=>{
    const { result } = renderHook(() => useCounter({ num:3, min:1 }))
    for(let i=0;i<5;i++){
      act(() => {
        result.current.minusNum()
      })
    }
    expect(result.current.innerNum).toBe(1)
  })

  it('无初始值, 设置最小值1，减少多次不能少于1',()=>{
    const { result } = renderHook(() => useCounter({ min:1 }))
    for(let i=0;i<5;i++){
      act(() => {
        result.current.minusNum()
      })
    }
    expect(result.current.innerNum).toBe(1)
  })

  it('设置最大值与最小值,改变数据边界外的数字,结果在数据界限边上',()=>{
    const { result } = renderHook(() => useCounter({ num:3, min:1,max:5 }))
    act(() => {
      result.current.changeNum({ target:{ value: '8' } })
    })
    expect(result.current.innerNum).toBe(5)
    act(() => {
      result.current.changeNum({ target:{ value: '0' } })
    })
    expect(result.current.innerNum).toBe(1)
  })

  it('设置step=2，新增或减少，结果递增2或递减2',()=>{
    const { result } = renderHook(() => useCounter({ num:3, step:2 }))
    act(() => {
      result.current.addNum()
    })
    act(() => {
      result.current.addNum()
    })
    expect(result.current.innerNum).toBe(7)
    act(() => {
      result.current.minusNum()
    })
    expect(result.current.innerNum).toBe(5)
  })

  it('测试更改数据回调',()=>{
    const changeNumCb = jest.fn(num=>{})
    const { result } = renderHook(() => useCounter({ num:3, onChange: changeNumCb }))
    act(() => {
      result.current.addNum()
    })
    act(() => {
      result.current.addNum()
    })
    act(() => {
      result.current.minusNum()
    })
    act(() => {
      result.current.changeNum({ target:{ value: '0' } })
    })
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

  it('输入负号-,数字为"-",回调不触发',()=>{
    const changeNumCb = jest.fn(num=>{})
    const { result } = renderHook(() => useCounter({ num:3, onChange: changeNumCb }))
    act(() => {
      result.current.changeNum({ target:{ value: '-' } })
    })
    expect(result.current.innerNum).toBe('-')
    // 此 mock 函数被调用了0次
    expect(changeNumCb.mock.calls.length).toBe(0)
  })
})