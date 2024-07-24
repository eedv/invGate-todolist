import { MantineProvider } from "@mantine/core";
import { TodoProvider } from "./TodoProvider";
import { App } from "./App";

export function Root() {
  return (
    <MantineProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </MantineProvider>
  );
}
