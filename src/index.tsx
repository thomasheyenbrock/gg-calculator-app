import { gg } from "../deps.ts";

const firstNumber = gg.state("");
const operator = gg.state("");
const secondNumber = gg.state("");
const calculatorState = gg.state({
  firstNumber: "",
  operator: "",
  secondNumber: "",
});

const setFirstNumber = gg.setState(
  firstNumber,
  (value, event, [operatorValue]) => {
    if (operatorValue) {
      return value;
    }
    if (!(event.target instanceof HTMLButtonElement)) {
      return value;
    }
    const buttonText = event.target.innerText;
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(buttonText)) {
      return value + buttonText;
    }
    if (buttonText === "0" && value) {
      return value + buttonText;
    }
    if (buttonText === "." && !value.includes(".")) {
      return value + buttonText;
    }
    return value;
  },
  [operator]
);

const setOperator = gg.setState(
  operator,
  (value, event, [firstNumberValue, secondNumberValue]) => {
    if (!firstNumberValue || firstNumberValue === ".") {
      return value;
    }
    if (secondNumberValue) {
      return value;
    }
    if (!(event.target instanceof HTMLButtonElement)) {
      return value;
    }
    const buttonText = event.target.innerText;
    if (["+", "-", "×", "÷"].includes(buttonText)) {
      return buttonText;
    }
    return value;
  },
  [firstNumber, secondNumber]
);

const setSecondNumber = gg.setState(
  secondNumber,
  (value, event, [operatorValue]) => {
    if (!operatorValue) {
      return value;
    }
    if (!(event.target instanceof HTMLButtonElement)) {
      return value;
    }
    const buttonText = event.target.innerText;
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(buttonText)) {
      return value + buttonText;
    }
    if (buttonText === "0" && value) {
      return value + buttonText;
    }
    if (buttonText === "." && !value.includes(".")) {
      return value + buttonText;
    }
    return value;
  },
  [operator]
);

const buttonStyles = gg.stylesheet(`
  .button {
    padding: 0.25em 0;
    background-color: #CBD3DB;
    font-size: 2em;
    border: 2px solid #7A8EA1;
    border-top: none;
    border-radius: 0;
    width: 6rem;
  }
  .button:hover {
    background-color: #C7EAFF;
  }
  .button:focus {
    outline: none;
    border-color: #20A4F3;
    box-shadow: -1px -1px 0 2px #20A4F3;
    position: relative;
    z-index: 1;
  }
  .button:focus:first-child {
    box-shadow: 0px -2px 0 1px #20A4F3, 0px 0px 0 1px #20A4F3
  }
  .button:active {
    background-color: #93D5FC;
  }
  .button + .button {
    border-left: none;
  }
  .double-width {
    width: 12rem;
  }
`);

type ButtonArgs = {
  isDoubleWidth?: boolean;
};

const Button = gg.component<ButtonArgs>((args) => {
  const classes = [buttonStyles.getClass("button")];
  if (args.isDoubleWidth) {
    classes.push(buttonStyles.getClass("double-width"));
  }
  return (
    <button
      class={classes}
      onclick={[setFirstNumber, setOperator, setSecondNumber]}
    >
      {args.children}
    </button>
  );
});

const stylesheet = gg.stylesheet(`
  body {
    margin: 0 auto;
    max-width: 24rem;
    font-family: sans-serif;
    background-color: #F6F7F8;
  }
  .display {
    font-size: 3em;
    text-align: right;
    padding: 0.1em 0.25em;

    min-height: 1.5em;
    width: 24rem;

    border: 2px solid #7A8EA1;
    box-sizing: border-box;
  }
`);

const PageComponent = gg.component(() => {
  return (
    <html>
      <head>
        <title>gg Calculator App</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <h1>Calculator App</h1>
        <p>Apply one basic arithmetic operation at a time to two numbers.</p>
        <div class={[stylesheet.getClass("display")]}>
          {firstNumber} {operator} {secondNumber}
        </div>
        <div>
          <Button>AC</Button>
          <Button>C</Button>
          <Button>ANS</Button>
          <Button>{"&div;"}</Button>
        </div>
        <div>
          <Button>7</Button>
          <Button>8</Button>
          <Button>9</Button>
          <Button>{"&times;"}</Button>
        </div>
        <div>
          <Button>4</Button>
          <Button>5</Button>
          <Button>6</Button>
          <Button>-</Button>
        </div>
        <div>
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
          <Button>+</Button>
        </div>
        <div>
          <Button isDoubleWidth>=</Button>
          <Button>.</Button>
          <Button>=</Button>
        </div>
      </body>
    </html>
  );
});

export const page = gg.page(PageComponent, { stylesheet });
