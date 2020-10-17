import { fireEvent, screen, waitFor } from "@testing-library/dom";
import {sleep} from ".";

export function setDatePickerByLabelText(labelText, value){
  fireEvent.mouseDown(screen.getByLabelText(labelText))
  fireEvent.change(screen.getByLabelText(labelText), { target: { value} })
  fireEvent.blur(screen.getByLabelText(labelText))
}

export function setSelectByLabelText(labelText, optionText){
  const selectInput  = screen.getByLabelText(labelText)
  const container = selectInput.closest('body')
  const inputId = screen.getByLabelText(labelText).getAttribute('id')
  fireEvent.mouseDown(selectInput)
  const listbox = container.querySelector(`#${inputId}_list`)
  const dropdown = listbox.closest('.ant-select-dropdown')
  const option = dropdown.querySelector(`.ant-select-item[title=${optionText}]`)  
  fireEvent.click(option)
}

export function queryRadioInputByLabelText(labelText,container) {
  if(container){
    const labelId = container.querySelector(`label[title=${labelText}]`)
    if(labelId && labelId.htmlFor){
      const radioInput = container.querySelector(`#${labelId.htmlFor} .ant-radio-button-wrapper-checked input`)
      if(radioInput){
        return radioInput
      }
    }
  }
  return null
}

export function queryAlertByLabelText(labelText,container) {
  if(container){
    const labelId = container.querySelector(`label[title=${labelText}]`)
    const formItemControl = container.querySelector(`input[id=${labelId.htmlFor}]`).closest('.ant-form-item-control')
    const alertDiv = formItemControl.querySelector(`div[role=alert]`)
    if(alertDiv){
      return alertDiv
    }
  }
  return null
}

