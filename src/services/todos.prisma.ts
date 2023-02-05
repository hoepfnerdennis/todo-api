import { HttpException } from "@/utils/HttpException";
import isEmpty from "@/utils/isEmpty";
import { PrismaClient, Todo } from "@prisma/client";
import { AbstractTodoService } from "./todos.interface";

class PrismaTodoService implements AbstractTodoService {
  private todos = new PrismaClient().todo;

  public async findAllTodos(): Promise<Todo[]> {
    const allTodo: Todo[] = await this.todos.findMany();
    return allTodo;
  }

  public async findTodoById(TodoId: number): Promise<Todo> {
    if (isEmpty(TodoId)) throw new HttpException(400, "TodoId is empty");

    const findTodo = await this.todos.findUnique({
      where: { id: TodoId },
    });
    if (!findTodo) throw new HttpException(409, "Todo doesn't exist");

    return findTodo;
  }

  public async createTodo(
    TodoData: Pick<Todo, "title" | "description">
  ): Promise<Todo> {
    if (isEmpty(TodoData)) throw new HttpException(400, "TodoData is empty");

    const createTodoData = await this.todos.create({ data: TodoData });
    return createTodoData;
  }

  public async updateTodo(
    TodoId: number,
    TodoData: Pick<Todo, "title" | "description">
  ): Promise<Todo> {
    if (isEmpty(TodoData)) throw new HttpException(400, "TodoData is empty");

    const findTodo = await this.todos.findUnique({
      where: { id: TodoId },
    });
    if (!findTodo) throw new HttpException(409, "Todo doesn't exist");

    const updateTodoData = await this.todos.update({
      where: { id: TodoId },
      data: TodoData,
    });
    return updateTodoData;
  }

  public async deleteTodo(TodoId: number): Promise<Todo> {
    if (isEmpty(TodoId)) throw new HttpException(400, "Todo doesn't existId");

    const findTodo = await this.todos.findUnique({
      where: { id: TodoId },
    });
    if (!findTodo) throw new HttpException(409, "Todo doesn't exist");

    const deleteTodoData = await this.todos.delete({ where: { id: TodoId } });
    return deleteTodoData;
  }
}

export default PrismaTodoService;
