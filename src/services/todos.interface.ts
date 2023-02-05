import { Todo } from "@/types/Todo";

export abstract class AbstractTodoService {
  abstract findAllTodos(): Promise<Todo[]>;
  abstract findTodoById(TodoId: number): Promise<Todo>;
  abstract createTodo(
    TodoData: Pick<Todo, "title" | "description">
  ): Promise<Todo>;
  abstract updateTodo(
    TodoId: number,
    TodoData: Pick<Todo, "title" | "description">
  ): Promise<Todo>;
  abstract deleteTodo(TodoId: number): Promise<Todo>;
}
