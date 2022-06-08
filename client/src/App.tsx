import { Box, List, ThemeIcon, Button } from "@mantine/core";
import { CheckCircleFillIcon } from "@primer/octicons-react";
import useSWR from "swr";
import "./App.css";
import AddTodo from "./components/AddTodo";

export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

export const ENDPOINT = "http://localhost:4000";
const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function App() {
  const { data, mutate } = useSWR<Todo[]>("api/todos", fetcher);
  async function markTodoAdDone(id: number) {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
      method: "PATCH",
    }).then((r) => r.json());

    mutate(updated);
  }
  async function deleteTodo(id: number) {
    const remove = await fetch(`${ENDPOINT}/api/todos/${id}`, {
      method: "DELETE",
    }).then((r) => r.json());
    mutate(remove);
  }
  return (
    <Box
      sx={({ theme }) => ({
        padding: "2rem",
        width: "100%",
        maxWidth: "40rem",
        margin: "0 auto",
      })}
    >
      {/* {JSON.stringify(data)} */}
      <List spacing="xs" size="sm" mb={12} center>
        {data?.map((todo) => {
          return (
            <List.Item
              className="todo-item"
              onClick={() => markTodoAdDone(todo.id)}
              key={`todo_list__${todo.id}`}
              icon={
                todo.done ? (
                  <ThemeIcon color={"teal"} size={24} radius="xl">
                    <CheckCircleFillIcon size={20} />
                  </ThemeIcon>
                ) : (
                  <ThemeIcon color={"red"} size={24} radius="xl">
                    <CheckCircleFillIcon size={20} />
                  </ThemeIcon>
                )
              }
            >
              {todo.title}
              <Button
                onClick={() => deleteTodo(todo.id)}
                ml={10}
                size={12}
                type="submit"
              >
                Remove
              </Button>
            </List.Item>
          );
        })}
      </List>
      <AddTodo mutate={mutate} />
    </Box>
  );
}

export default App;
