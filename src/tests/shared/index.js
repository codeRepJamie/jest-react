export * from './AntdHelper';
export { default as mountTest } from './mountTest';
import { act } from 'react-dom/test-utils';

const globalTimeout = global.setTimeout;

export const sleep = async (timeout = 0) => {
  await act(async () => {
    await new Promise(resolve => globalTimeout(resolve, timeout));
  });
};