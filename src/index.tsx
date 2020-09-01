import { gg } from "../deps.ts";

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
        <div class={["display"]}>3 + 4</div>
        <div>
          <button>AC</button>
          <button>C</button>
          <button>ANS</button>
          <button>{"&div;"}</button>
        </div>
        <div>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>{"&times;"}</button>
        </div>
        <div>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>-</button>
        </div>
        <div>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>+</button>
        </div>
        <div>
          <button>0</button>
          <button>.</button>
          <button>=</button>
        </div>
      </body>
    </html>
  );
});

export const page = gg.page(PageComponent, { stylesheet });
