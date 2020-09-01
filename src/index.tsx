import { gg } from "../deps.ts";

const PageComponent = gg.component(() => {
  return (
    <html>
      <body>
        <h1>Calculator App</h1>
        <p>Apply one basic arithmetic operation at a time to two numbers.</p>
      </body>
    </html>
  );
});

export const page = gg.page(PageComponent);
