import React, {useState} from "react";
import useCounter from "../Counter/index";
import './Counter.css';

export default function Counter(props){
  const {
    changeNum,
    innerNum,
    addNum,
    minusNum,
  } = useCounter(props)

  return (
  <div className="counter">
    <p className="title">Counter</p>
    <button onClick={minusNum}>-</button><input onChange={changeNum} value={innerNum} /><button onClick={addNum}>+</button>
  </div>
  )
}