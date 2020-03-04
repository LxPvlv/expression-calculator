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
      const n = s.match(/\d/);
      if (n) {
        num += n[0];
        return;
      }

      if (num && level.op && level.op.match(/[\+\-]/)) {
        if (level.op[0] === "-") num *= -1;
        level.nums.push(Number(num));
        level.op = null;
        num = "";
      }

      if (num && level.op && level.op.match(/[\*\/]/)) {
        level.nums[level.nums.length - 1] = calc(
          level.nums[level.nums.length - 1],
          Number(num),
          level.op
        );
        level.op = null;
        num = "";
      }

      if (num) {
        level.nums.push(Number(num));
        num = "";
      }

      const x = s.match(/[\*\/\+\-]/);
      if (x) {
        level.op = s;
        return;
      }

      if (s.match(/\(/)) {
        level = new Level(level);
        bracketsCounter++;
        return;
      }

      if (s.match(/\)/)) {
        num = level.nums.reduce((sum, it) => sum + it);
        level = level.prev;
        bracketsCounter--;
        if (bracketsCounter < 0)
          throw new Error("ExpressionError: Brackets must be paired");
        return;
      }
    });

  if (bracketsCounter !== 0)
    throw new Error("ExpressionError: Brackets must be paired");

  level.nums[level.nums.length - 1] = calc(
    level.nums[level.nums.length - 1],
    Number(num),
    level.op
  );

  return level.nums.reduce((sum, it) => sum + it);
}

module.exports = {
  expressionCalculator
};
