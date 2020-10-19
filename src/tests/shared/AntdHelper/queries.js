import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { queryHelpers, buildQueries, render } from '@testing-library/react'
import {sleep} from "..";

/* Input */
const queryInput = (container, text) => {
  const labelId = container.querySelector(`label[title=${text}]`)
  if(labelId && labelId.htmlFor){
    const input = container.querySelector(`input#${labelId.htmlFor}`)
    if(input){
      return [input]
    }
  }
  return []
}

/* RadioGroup */
const queryRadioGroup = (container, text) => {
  const labelId = container.querySelector(`label[title=${text}]`)
  if(labelId && labelId.htmlFor){
    const radioInput = container.querySelector(`#${labelId.htmlFor} .ant-radio-button-wrapper-checked input`)
    if(radioInput){
      return [radioInput]
    }
  }
  return []
}

/* Button */
const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str: any) {
  return typeof str === 'string';
}
const queryButton = (container, text) => {
  const SPACE = ' ';
  const buttonArr = container.querySelectorAll(`.ant-btn`)
  if(buttonArr && buttonArr.length){
    const filteredButton = []
    let _text = text
    if (isTwoCNChar(text)) {
      _text = text.split('').join(SPACE);
    }
    buttonArr.forEach(button => {
      const span = button.querySelector('span')
      if(span.textContent === _text){
        filteredButton.push(button)
      }
    })
    return filteredButton
  }
  return []
}

/* FormItemAlert */
function queryFormItemAlert(container, text){
  if(text != null) {
    const labelId = container.querySelector(`label[title=${text}]`)
    const formItemControl = container.querySelector(`input[id=${labelId.htmlFor}]`).closest('.ant-form-item-control')
    const alertDiv = formItemControl.querySelector(`div[role=alert]`)
    if(alertDiv){
      return [alertDiv]
    }else{
      return []
    }
  } else {
    return queryHelpers.queryAllByAttribute('role', container, 'alert')
  }
}

const queryAllByCompDisplayText = (container, componentName, text) => {
  switch (componentName) {
    case 'Input':
    case 'DatePicker':
      return queryInput(container, text)
    case 'RadioGroup':
      return queryRadioGroup(container, text)
    case 'Button':
        return queryButton(container, text)
    case 'FormItemAlert':
        return queryFormItemAlert(container, text)
    default:
      return []
  }
  return []
}

const getCompMultipleError = (c, componentName, labelText) =>
  `Found multiple components elements witch component's name is '${componentName}' with the display text of: ${labelText}`
const getCompMissingError = (c, componentName, labelText) =>
  `Unable to find a component element witch component's name is '${componentName}' with the display text of: ${labelText}`

const [
  queryByCompDisplayText,
  getAllByCompDisplayText,
  getByCompDisplayText,
  findAllByCompDisplayText,
  findByCompDisplayText,
] = buildQueries(queryAllByCompDisplayText, getCompMultipleError, getCompMissingError)

export {
  queryByCompDisplayText,
  getAllByCompDisplayText,
  getByCompDisplayText,
  findAllByCompDisplayText,
  findByCompDisplayText,
}

