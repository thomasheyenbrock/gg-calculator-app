import { gg } from "../deps.ts";

const PageComponent = gg.component(() => {
  return (
    <html>
      <body>
        <p>Hello from gg!</p>
      </body>
    </html>
  );
});

export const page = gg.page(PageComponent);
