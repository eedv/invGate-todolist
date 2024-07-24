import "@mantine/core/styles.css";

import { Container, MantineProvider } from "@mantine/core";
import { TodoList } from "./TodoList";

function App() {
  return (
    <MantineProvider>
      <Container py="md">
        <TodoList />
      </Container>
    </MantineProvider>
  );
}

export default App;
