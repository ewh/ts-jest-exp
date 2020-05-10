import { Indirect } from './indirect';

export class Foo<T> {
  private indirect: Indirect;

  constructor(public val: T) {
    this.indirect = new Indirect();
  }
  getStr(): string {
    return `val: ${this.val}`;
  }

  set(input: T): void {
    this.val = input;
  }

  getIndirect(): number {
    return this.indirect.get();
  }
}
