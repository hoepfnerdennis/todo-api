import SupabaseTodoService from "@/services/todos.supabase";
import type { Todo } from "@/types/Todo";
import type {
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<{
    todos: Todo[];
  }>
> {
  const todoService = new SupabaseTodoService();
  const todos = await todoService.findAllTodos();
  return {
    props: {
      todos,
    },
  };
}

export default function Home({
  todos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  return (
    <div>
      <h1>Todos</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const title = form.get("title")?.valueOf();
          const description = form.get("description")?.valueOf();
          await fetch(`/api/todos`, {
            method: "POST",
            body: JSON.stringify({ title, description }),
          });
          router.reload();
        }}
      >
        <input type="text" name="title" id="title" />
        <input type="text" name="description" id="description" />
        <input type="submit" value="add" />
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.description}{" "}
            <button
              onClick={async () => {
                await fetch(`/api/todos/${todo.id}`, { method: "DELETE" });
                router.reload();
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
