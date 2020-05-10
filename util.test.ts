import { sum } from './util';
import { funky } from './importer';
import { mocked } from 'ts-jest/utils';
import { get } from './lib';

// jest.setTimeout(500);

jest.mock('./importer');
jest.mock('./lib');

const mockedFunky = mocked(funky, true);
const { other } = jest.requireActual('./importer');
const { get: realGet } = jest.requireActual('./lib');

describe('util sum tests', () => {
  test('simple sum', () => {
    expect(sum(4, 5)).toEqual(9);
  });

  test('simple sum 0', () => {
    expect(sum(3, 0)).toEqual(3);
  });

  test('simple sum neg', () => {
    expect(sum(2, -4)).toEqual(-2);
  });

  test('cb resolve', () => {
    async function cb(data: number): Promise<number> {
      expect(data).toBe(10);
      return 2 * data;
    }

    expect(cb(10)).resolves.toBe(20);
  });

  test('cb reject', () => {
    async function cb(data: number): Promise<number> {
      expect(data).toBe(10);
      throw new Error('bad1');
    }

    expect(cb(10)).rejects.toEqual(new Error('bad1'));
  });

  test('cb async', async () => {
    async function cb(data: number): Promise<number> {
      expect(data).toBe(10);
      return 2 * data;
    }

    expect(await cb(10)).toBe(20);
  });

  test('cb reject', async () => {
    expect.assertions(2);

    async function cb(data: number): Promise<number> {
      expect(data).toBe(10);
      throw new Error('bad1');
    }

    try {
      await cb(10);
    } catch (e) {
      // console.log('catch');
      expect(e).toEqual(new Error('bad1'));
    }
  });

  test('mock', () => {
    const f = jest.fn();
    f.mockImplementation((x) => 3 * x);
    expect(f(10)).toBe(30);
    expect(f(20)).toBe(60);
    // console.log(f.mock);
  });
});

describe('mocker', () => {
  test('', () => {
    mockedFunky.mockReturnValue(50);

    expect(funky(3)).toBe(50);
    expect(other(3)).toBe(15);
    expect(get()).toBe('fake get');
    expect(realGet()).toBe('real get');
  });
});

describe('timer', () => {
  test('', () => {
    jest.useFakeTimers();
    // console.log('start');
    const cb = jest.fn();
    setTimeout(cb, 3000);
    setTimeout(cb, 1000);

    // setTimeout(() => {
    //   console.log('finish');
    // }, 3000);

    expect(cb).not.toBeCalled();
    jest.runAllTimers();
    // jest.advanceTimersByTime(4000);
    expect(cb).toBeCalled();
    // console.log(cb.mock);
  });
});
