import React, {useState} from "react";

export default function Counter(props){
  const {num, step = 1, max, min} = props

  const [innerNum,changeInnerNum] = useState(num)

  const addNum =() => {
    const current = innerNum + step
    if(max != null && current > max){
      return;
    }
    changeInnerNum(current)
  }

  const minusNum =() => {
    const current = innerNum - step
    if(min != null && current < min){
      return;
    }
    changeInnerNum(current)
  }

  const changeNum = (event)=>{
    if(event.target.value != null){
      if(event.target.value === ''){
        changeInnerNum('')
        return;
      }
      const inputNum = Number(event.target.value)
      if(Number.isNaN(inputNum)){
        changeInnerNum('')
      }else{
        if(max != null && inputNum > max){
          changeInnerNum(max)
          return;
        }
        if(min != null && min > inputNum){
          changeInnerNum(min)
          return;
        }
        changeInnerNum(inputNum)
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