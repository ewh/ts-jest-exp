jest.mock('./lib');
import { get } from './lib';
// import Foo from './foo';

const { Indirect } = require('./indirect');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Foo } = require('./foo');
const { Foo: RealFoo } = jest.requireActual('./foo');

const { get: realGet } = jest.requireActual('./lib');
import { instance, mock, when, verify } from 'ts-mockito';

// jest.mock('./foo', () => {
//   return {
//     default: 'Foo',
//   };
// });

jest.mock('./foo');
jest.mock('./indirect');

describe('module mock tests', () => {
  // test('1', () => {
  //   expect(getStr()).toEqual('fake get');
  // });

  // test('2', () => {
  //   // console.log(realgetStr());
  //   expect(realgetStr()).toEqual('real get');
  // });

  // test('3', () => {
  //   // jest.unmock('./lib');
  //   expect(getStr()).toEqual('fake get');
  // });

  // test('4', () => {
  //   // console.log(Foo);
  //   const foo = new Foo<string>('abc');
  //   // console.log('get val', foo.getStr());
  //   expect(foo.getStr()).toEqual('val: abc');
  //   foo.set('xyz');
  //   expect(foo.getStr()).toEqual('val: xyz');
  // });

  // test('5', () => {
  //   const mocked: Foo<number> = mock(Foo);
  //   // console.log('foo', mocked);
  //   const foo = instance(mocked);
  //   when(mocked.getStr()).thenReturn('output');
  //   console.log(foo.getStr());

  //   const f = new Foo<boolean>(false);
  //   console.log(f.getStr());
  // });

  test('6', () => {
    const f = new Foo(true);
    f.getStr.mockReturnValue('val: true');

    // console.log(Foo.mock);
    expect(f.getStr()).toEqual('val: true');
    // console.log(f.getStr());
    // console.log(f.getIndirect());
  });

  test('7', () => {
    const f = new RealFoo(13.4);
    Indirect.mock.instances[0].get.mockReturnValue(17);
    expect(f.getIndirect()).toEqual(17);
  });
});
