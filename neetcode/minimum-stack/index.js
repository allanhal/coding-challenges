class MinStack {
  stack = [];

  constructor() {}

  /**
   * @param {number} val
   * @return {void}
   */
  push(val) {
    this.stack.push(val);
  }

  /**
   * @return {void}
   */
  pop() {
    const toReturn = this.top();
    this.stack = this.stack.splice(0, this.stack.length - 1);
    return toReturn;
  }

  /**
   * @return {number}
   */
  top() {
    return this.stack[this.stack.length - 1];
  }

  /**
   * @return {number}
   */
  getMin() {
    return Math.min(...this.stack);
  }
}

const input = ["MinStack", "push", 1, "push", 2, "push", 0, "getMin", "pop", "top", "getMin"];
const output = [null, null, null, null, 0, null, 2, 1];

// const minStack = new MinStack();
// minStack.push(1);
// minStack.push(2);
// minStack.push(0);
// minStack.getMin(); // return 0
// minStack.pop();
// minStack.top();    // return 2
// minStack.getMin(); // return 1
