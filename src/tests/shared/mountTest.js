import React from 'react';
import { render } from '@testing-library/react';

export default function mountTest(Component) {
  describe('测试生命周期mount与unmount',()=>{
    it('测试组件updated与unmounted是否报错',()=>{
      const {container,unmount} = render(<Component />)
      expect(unmount).not.toThrow()
    })
  })
}