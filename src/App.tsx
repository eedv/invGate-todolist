import "@mantine/core/styles.css";
import { AppShell, Burger, Button, Group, NavLink, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, NavLink as NavLinkRouter } from "react-router-dom";
import { useTodoContext } from "./useTodoContext";

export function App() {
  const { lists, addList } = useTodoContext();
  const [opened, { toggle }] = useDisclosure();

  const handleCreateList = () => {
    addList(`Nueva lista ${lists.length + 1}`);
  };

  return (
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
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={1}>Todo List</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Button onClick={handleCreateList}>Crear lista</Button>
        {lists.map((list) => (
          <NavLink
            key={list.id}
            component={NavLinkRouter}
            to={`lists/${list.id}`}
            label={list.name}
          />
        ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
