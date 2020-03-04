function eval() {
  // Do not use eval!!!
  return;
}

const calc = (a, b, op) => {
  switch (op) {
    case "*":
      return a * b;
    case "/":
      if (b === 0) throw new Error("TypeError: Division by zero.");
      return a / b;
    case "+":
      return a + b;
    case "-":
      return a - b;
  }
};

class Level {
  constructor(prev) {
    this.prev = prev;
    this.nums = [];
    this.op = null;
  }
}

function expressionCalculator(expr) {
  let bracketsCounter = 0;
  let level = new Level(null);
  let num = "";

  expr
    .replace(/ +/g, "")
    .split("")
    .forEach(s => {
      if (/\d/.test(s)) {
        num += s;
        return;
      }

      if (num) {
        switch (level.op) {
          case "-":
            num *= -1;
          case "+":
            level.nums.push(Number(num));
            break;
          case "*":
          case "/":
            const last = level.nums.length - 1;
            level.nums[last] = calc(level.nums[last], Number(num), level.op);
            break;
          default:
            level.nums.push(Number(num));
        }

        level.op = null;
        num = "";
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

        num = level.nums.reduce((sum, it) => sum + it);
        level = level.prev;
        return;
      }
    });

  if (bracketsCounter !== 0)
    throw new Error("ExpressionError: Brackets must be paired");

  const last = level.nums.length - 1;
  level.nums[last] = calc(level.nums[last], Number(num), level.op);

  return level.nums.reduce((sum, it) => sum + it);
}

module.exports = {
  expressionCalculator
};
