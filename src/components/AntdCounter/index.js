import React, {useState} from "react";
import { Input } from 'antd';
import useCounter from "../Counter/index";

export default function Counter(props){
  const {
    changeNum,
    innerNum,
    addNum,
    minusNum,
  } = useCounter(props)

  const minusButton = <div onClick={minusNum}>-</div>
  const plusButton = <div onClick={addNum}>+</div>

  return (
  <div>
    <p>Antd Counter</p>
    <Input addonBefore={minusButton} addonAfter={plusButton}  onChange={changeNum} value={innerNum} />
  </div>
  )
}