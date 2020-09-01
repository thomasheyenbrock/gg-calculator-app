import { gg } from "../deps.ts";

const PageComponent = gg.component(() => {
  return (
    <html>
      <body>
        <h1>Calculator App</h1>
        <p>Apply one basic arithmetic operation at a time to two numbers.</p>
        <div>3 + 4</div>
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

export const page = gg.page(PageComponent);
