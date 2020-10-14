import React, {useState} from "react";

export default function Counter(props){
  const {num = 0, max, min} = props

  const [innerNum,changeInnerNum] = useState(num)

  const addNum =() => {
    const current = innerNum+1
    if(max != null && current > max){
      return;
    }
    changeInnerNum(current)
  }

  const minusNum =() => {
    const current = innerNum - 1
    if(min != null && current < min){
      return;
    }
    changeInnerNum(current)
  }

  const changeNum = (event)=>{
    if(event.target.value != null){
      const inputNum = Number(event.target.value)
      if(Number.isNaN(inputNum)){
        changeInnerNum(0)
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