import React, {useState} from "react";

export default function Counter(props){
  const {num, step = 1, max, min, onChange} = props

  const [innerNum,changeInnerNum] = useState(num)

  const _changeInnerNum = _innerNum => {
    changeInnerNum(_innerNum)
    if(onChange != null && typeof onChange === 'function'){
      onChange.call(null, _innerNum)
    }
  }

  const setMinus = () => {
    changeInnerNum('-')
  }

  const addNum =() => {
    const current = innerNum + step
    if(max != null && current > max){
      return;
    }
    _changeInnerNum(current)
  }

  const minusNum =() => {
    const current = innerNum - step
    if(min != null && current < min){
      return;
    }
    _changeInnerNum(current)
  }

  const changeNum = (event)=>{
    if(event.target.value != null){
      if(event.target.value === ''){
        _changeInnerNum('')
        return;
      }
      if(event.target.value === '-'){
        setMinus()
        return;
      }
      const inputNum = Number(event.target.value)
      if(Number.isNaN(inputNum)){
        _changeInnerNum('')
      }else{
        if(max != null && inputNum > max){
          _changeInnerNum(max)
          return;
        }
        if(min != null && min > inputNum){
          _changeInnerNum(min)
          return;
        }
        _changeInnerNum(inputNum)
      }
    }
  }

  return (
  <div>
    <p>Counter</p>
    <button onClick={minusNum}>-</button><input onChange={changeNum} value={innerNum} /><button onClick={addNum}>+</button>
  </div>
  )
}