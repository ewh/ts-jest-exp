export default class Foo<T> {
  constructor(public val: T) {}
  getStr(): string {
    return `val: ${this.val}`;
  }

  set(input: T): void {
    this.val = input;
  }
}
