import { Database } from "@/types/database";
import { Todo } from "@/types/Todo";
import { DBException } from "@/utils/DBException";
import { HttpException } from "@/utils/HttpException";
import isEmpty from "@/utils/isEmpty";
import { createClient } from "@supabase/supabase-js";
import { AbstractTodoService } from "./todos.interface";

class SupabaseTodoService implements AbstractTodoService {
  private todos = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  ).from("Todo");

  public async findAllTodos(): Promise<Todo[]> {
    const { data: allTodo, error } = await this.todos.select();
    if (error) throw new DBException(error.code, error.message);
    return allTodo || [];
  }

  public async findTodoById(TodoId: number): Promise<Todo> {
    if (isEmpty(TodoId)) throw new HttpException(400, "TodoId is empty");
    const findTodo = await this.findUnique(TodoId);
    if (!findTodo) throw new HttpException(409, "Todo doesn't exist");
    return findTodo;
  }

  public async createTodo(
    TodoData: Pick<Todo, "title" | "description">
  ): Promise<Todo> {
    if (isEmpty(TodoData)) throw new HttpException(400, "TodoData is empty");
    const { data: createTodoData, error } = await this.todos
      .insert(TodoData)
      .select()
      .single();
    if (error) throw new DBException(error.code, error.message);
    return createTodoData;
  }

  public async updateTodo(
    TodoId: number,
    TodoData: Pick<Todo, "title" | "description">
  ): Promise<Todo> {
    if (isEmpty(TodoData)) throw new HttpException(400, "TodoData is empty");
    const findTodo = await this.findUnique(TodoId);
    if (!findTodo) throw new HttpException(409, "Todo doesn't exist");
    const { data: updateTodoData, error } = await this.todos
      .update(TodoData)
      .eq("id", TodoId)
      .select()
      .single();
    if (error) throw new DBException(error.code, error.message);
    return updateTodoData;
  }

  public async deleteTodo(TodoId: number): Promise<Todo> {
    if (isEmpty(TodoId)) throw new HttpException(400, "Todo doesn't existId");
    const findTodo = await this.findUnique(TodoId);
    if (!findTodo) throw new HttpException(409, "Todo doesn't exist");
    const { data: deleteTodoData, error } = await this.todos
      .delete()
      .eq("id", TodoId)
      .select()
      .single();
    if (error) throw new DBException(error.code, error.message);
    return deleteTodoData;
  }

  private async findUnique(TodoId: number): Promise<Todo | null> {
    const { data } = await this.todos.select().eq("id", TodoId).single();
    return data;
  }
}

export default SupabaseTodoService;
