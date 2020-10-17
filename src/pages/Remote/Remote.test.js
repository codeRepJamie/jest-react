import React from 'react';
import { render } from '@testing-library/react';
import { screen,waitFor } from '@testing-library/dom'
import Remote from '.';
import mockXHR from '../../mock/index';

beforeAll(() => mockXHR())
describe('测试Remote',()=>{
  it('远程内容', async () => {
    render(<Remote />)
    await waitFor(()=> screen.getByText('Remote getData: form server'))
  })
})
