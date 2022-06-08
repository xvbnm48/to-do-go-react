import { useState } from "react";
import { useForm } from "@mantine/hooks";
import { Group, Modal, Button, TextInput, Textarea } from "@mantine/core";
import { ENDPOINT } from "../App";

function AddTodo() {
  const [open, setOpen] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      body: "",
    },
  });
  async function createTodo(values: { title: string; body: string }) {
    const updated = await fetch(`${ENDPOINT}`);
  }
  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Create Todo">
        <form onSubmit={form.onSubmit(createTodo)}>
          <TextInput
            required
            mb={12}
            label="todo"
            placeholder="what do you want to do ?"
            {...form.getInputProps("title")}
          />
          <Textarea
            required
            mb={12}
            label="body"
            placeholder="tell me more..."
            {...form.getInputProps("title")}
          />
          <Button type="submit">Create Todo</Button>
        </form>
      </Modal>
      <Group position="center">
        <Button fullWidth mb={12} onClick={() => setOpen(true)}>
          ADD TODO
        </Button>
      </Group>
    </>
  );
}

export default AddTodo;
