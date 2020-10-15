import {useState} from "react";

export default function useCounter(props) {
  const {num = '', step = 1, max, min, onChange} = props

  const [innerNum,changeInnerNum] = useState(num)

  const _changeInnerNum = _innerNum => {
    if(max != null && _innerNum > max){
      _innerNum = max
    }
    if(min != null && _innerNum < min){
      _innerNum = min
    }
    changeInnerNum(_innerNum)
    if(onChange != null && typeof onChange === 'function'){
      onChange.call(null, _innerNum)
    }
  }

  const setMinus = () => {
    changeInnerNum('-')
  }

  const addNum =() => {
    let current = Number(innerNum) + step
    _changeInnerNum(current)
  }

  const minusNum =() => {
    let current = Number(innerNum) - step
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
        _changeInnerNum(inputNum)
      }
    }
  }

  return {
    changeNum,
    innerNum,
    addNum,
    minusNum,
  }
} 