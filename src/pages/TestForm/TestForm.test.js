import React from "react";
import { render } from "@testing-library/react";
import { fireEvent, screen } from "@testing-library/dom";
import TestForm from ".";
import { Button } from "antd";

// antd某些组件会使用window对象, 使用jest模拟
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

describe("快照测试", () => {
  it("测试快照 data1", () => {
    const { container } = render(<TestForm />);
    const button = screen.getByText('提交表单').closest('button')
    //fireEvent.click(button) 
    expect()
  });
});
