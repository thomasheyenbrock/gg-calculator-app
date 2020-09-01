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
  .button {
    padding: 0.25em 0;
    background-color: #CBD3DB;
    font-size: 2em;
    border: 2px solid #7A8EA1;
    border-top: none;
    border-radius: 0;
    width: 6rem;
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
        <div class={[stylesheet.getClass("display")]}>3 + 4</div>
        <div>
          <button class={[stylesheet.getClass("button")]}>AC</button>
          <button class={[stylesheet.getClass("button")]}>C</button>
          <button class={[stylesheet.getClass("button")]}>ANS</button>
          <button class={[stylesheet.getClass("button")]}>{"&div;"}</button>
        </div>
        <div>
          <button class={[stylesheet.getClass("button")]}>7</button>
          <button class={[stylesheet.getClass("button")]}>8</button>
          <button class={[stylesheet.getClass("button")]}>9</button>
          <button class={[stylesheet.getClass("button")]}>{"&times;"}</button>
        </div>
        <div>
          <button class={[stylesheet.getClass("button")]}>4</button>
          <button class={[stylesheet.getClass("button")]}>5</button>
          <button class={[stylesheet.getClass("button")]}>6</button>
          <button class={[stylesheet.getClass("button")]}>-</button>
        </div>
        <div>
          <button class={[stylesheet.getClass("button")]}>1</button>
          <button class={[stylesheet.getClass("button")]}>2</button>
          <button class={[stylesheet.getClass("button")]}>3</button>
          <button class={[stylesheet.getClass("button")]}>+</button>
        </div>
        <div>
          <button class={[stylesheet.getClass("button")]}>0</button>
          <button class={[stylesheet.getClass("button")]}>.</button>
          <button class={[stylesheet.getClass("button")]}>=</button>
        </div>
      </body>
    </html>
  );
});

export const page = gg.page(PageComponent, { stylesheet });
