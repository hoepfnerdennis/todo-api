import { Todo } from "@/types/Todo";

export abstract class AbstractTodoService {
  abstract findAllTodos(): Promise<Todo[]>;
  abstract findTodoById(TodoId: string): Promise<Todo>;
  abstract createTodo(
    TodoData: Pick<Todo, "title" | "description">
  ): Promise<Todo>;
  abstract updateTodo(
    TodoId: string,
    TodoData: Pick<Todo, "title" | "description">
  ): Promise<Todo>;
  abstract deleteTodo(TodoId: string): Promise<Todo>;
}
