function eval() {
  // Do not use eval!!!
  return;
}

class Level {
  constructor(prev) {
    this.prev = prev;
    this.nums = [];
    this.op = null;
  }

  putLast(b, op) {
    const lastId = this.nums.length - 1;
    let last;

    switch (op) {
      case "*":
        last = this.nums[lastId] * b;
        break;
      case "/":
        if (b === 0) throw new Error("TypeError: Division by zero.");
        last = this.nums[lastId] / b;
        break;
      case "+":
        last = this.nums[lastId] + b;
        break;
      case "-":
        last = this.nums[lastId] - b;
        break;
    }

    this.nums[lastId] = last;
  }
}

function expressionCalculator(expr) {
  let bracketsCounter = 0;
  let level = new Level(null);
  let tmpNum = "";

  expr
    .replace(/ +/g, "")
    .split("")
    .forEach(s => {
      if (/\d/.test(s)) {
        tmpNum += s;
        return;
      }

      if (tmpNum) {
        switch (level.op) {
          case "*":
          case "/":
            level.putLast(Number(tmpNum), level.op);
            break;
          case "-":
            tmpNum *= -1;
          case "+":
          default:
            level.nums.push(Number(tmpNum));
        }

        level.op = null;
        tmpNum = "";
      }

      if (/[\*\/\+\-]/.test(s)) {
        level.op = s;
        return;
      }

      if (s === "(") {
        level = new Level(level);
        bracketsCounter++;
        return;
      }

      if (s === ")") {
        if (--bracketsCounter < 0)
          throw new Error("ExpressionError: Brackets must be paired");

        tmpNum = level.nums.reduce((sum, it) => sum + it);
        level = level.prev;
        return;
      }
    });

  if (bracketsCounter !== 0)
    throw new Error("ExpressionError: Brackets must be paired");

  level.putLast(Number(tmpNum), level.op);

  return level.nums.reduce((sum, it) => sum + it);
}

module.exports = {
  expressionCalculator
};
