import "@mantine/core/styles.css";
import { AppShell, Burger, Group, MantineProvider, Title } from "@mantine/core";
import { TodoList } from "./TodoList";
import { useDisclosure } from "@mantine/hooks";

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Title order={1}>Todo List</Title>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>Navbar</AppShell.Navbar>
        <AppShell.Main>
          <TodoList />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
