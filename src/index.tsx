import { gg } from "../deps.ts";

const calculatorState = gg.state(
  {
    firstNumber: "",
    operator: "",
    secondNumber: "",
    result: "",
  },
  {
    display: (value) =>
      [
        value.firstNumber,
        value.operator,
        value.secondNumber,
        value.result ? "=" : "",
        value.result,
      ].join(" "),
  }
);

type Result = { id: string; result: string };
const initialValue: Result[] = [];
const previousResults = gg.state(initialValue, {
  hasResults: (value) => value.length > 0,
});

const setCalculatorState = gg.setState(
  calculatorState,
  (value, event, [previousResultsValue]) => {
    if (!(event.target instanceof HTMLButtonElement)) {
      return value;
    }
    const buttonText = event.target.innerText;
    switch (buttonText) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9": {
        if (value.result) {
          break;
        }
        const number = value.operator ? "secondNumber" : "firstNumber";
        if (value[number] === "ANS") {
          value[number] = buttonText;
        } else {
          value[number] += buttonText;
        }
        break;
      }
      case "0": {
        if (value.result) {
          break;
        }
        const number = value.operator ? "secondNumber" : "firstNumber";
        if (value[number]) {
          value[number] += buttonText;
        }
        break;
      }
      case ".": {
        if (value.result) {
          break;
        }
        const number = value.operator ? "secondNumber" : "firstNumber";
        if (value[number] === "ANS") {
          value[number] = buttonText;
        } else if (!value[number].includes(".")) {
          value[number] += buttonText;
        }
        break;
      }
      case "+":
      case "-":
      case "×":
      case "÷": {
        if (value.result) {
          break;
        }
        if (
          value.firstNumber &&
          value.firstNumber !== "." &&
          !value.secondNumber
        ) {
          value.operator = buttonText;
        }
        break;
      }
      case "=": {
        if (
          value.firstNumber &&
          value.firstNumber !== "." &&
          value.operator &&
          value.secondNumber &&
          value.secondNumber !== "."
        ) {
          const parsedFirstNumber = parseFloat(
            value.firstNumber === "ANS"
              ? previousResultsValue[0].result
              : value.firstNumber
          );
          const parsedSecondNumber = parseFloat(
            value.secondNumber === "ANS"
              ? previousResultsValue[0].result
              : value.secondNumber
          );
          switch (value.operator) {
            case "+":
              value.result = (
                parsedFirstNumber + parsedSecondNumber
              ).toString();
              break;
            case "-":
              value.result = (
                parsedFirstNumber - parsedSecondNumber
              ).toString();
              break;
            case "×":
              value.result = (
                parsedFirstNumber * parsedSecondNumber
              ).toString();
              break;
            case "÷":
              value.result = (
                parsedFirstNumber / parsedSecondNumber
              ).toString();
              break;
          }
        }
        break;
      }
      case "C":
      case "AC": {
        value.firstNumber = "";
        value.operator = "";
        value.secondNumber = "";
        value.result = "";
        break;
      }
      case "ANS": {
        if (value.result || !previousResultsValue[0].result) {
          break;
        }
        value[value.operator ? "secondNumber" : "firstNumber"] = buttonText;
        break;
      }
    }
    return value;
  },
  [previousResults]
);

const setPreviousResults = gg.setState(
  previousResults,
  (value, event, [calculatorStateValue]) => {
    if (!(event.target instanceof HTMLButtonElement)) {
      return value;
    }
    const buttonText = event.target.innerText;
    if (buttonText === "C" && calculatorStateValue.result) {
      value.unshift({
        id: Date.now().toString(),
        result: calculatorStateValue.result,
      });
      return value;
    }
    if (buttonText === "AC") {
      return [];
    }
    return value;
  },
  [calculatorState]
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
    <button class={classes} onclick={[setPreviousResults, setCalculatorState]}>
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
          {calculatorState.selectors.display}
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
        <h2>Previous results</h2>
        <p hidden={previousResults.selectors.hasResults}>
          No calculation has been finished yet.
        </p>
        <ul>
          {gg
            .unstable_list(previousResults, {
              result: (value) => value.result,
              time: (value) => {
                const date = new Date(parseInt(value.id));
                return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
              },
            })
            .map((selectors) => (
              <li>
                {selectors.result} (calculated at <time>{selectors.time}</time>)
              </li>
            ))}
        </ul>
      </body>
    </html>
  );
});

export const page = gg.page(PageComponent, { stylesheet });
