import { fireEvent, screen } from "@testing-library/dom";
// re-export everything
import { render, queries } from '@testing-library/react'
export * from '@testing-library/react'

import * as customQueries from './queries'

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
const customRender = (ui, options) => 
  render(ui, { queries:{ ...queries, ...customQueries }, ...options })
// override render method
export { customRender as render }

export function setInputByLabelText(labelText, value){
  fireEvent.change(screen.getByLabelText(labelText), { target: { value } })
}

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

export function setRadioGroupByLabelText(labelText, optionText){
  let success = false
  const label = screen.queryByText(labelText)
  try{
    const container = label.closest('body')
    const labelId = container.querySelector(`label[title=${labelText}]`)
    const radioGroup = container.querySelector(`.ant-radio-group[id=${labelId.htmlFor}]`)
    const allRadioButton = radioGroup.querySelectorAll('.ant-radio-button-wrapper')
    if(allRadioButton){
      allRadioButton.forEach(radioButton => {
        if(radioButton.textContent === optionText){
          fireEvent.click(radioButton)
          success = true
        }
      })
    }
    if(!success){
      throw 'fail'
    }
  }catch(e){
    throw(`Unable to find a Radio Group component witch has option text of: ${optionText} with label text is ${labelText}`)
  }
}