// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import SupabaseTodoService from "@/services/todos.supabase";
import EdgeResponse from "@/utils/EdgeResponse";
import { HttpException } from "@/utils/HttpException";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const todoService = new SupabaseTodoService();

export default async function handler(req: NextRequest) {
  const { method, url } = req;
  const { searchParams } = new URL(url);
  const rawId = searchParams.get("id");

  try {
    const id = Number(rawId);

    if (!id) {
      throw new HttpException(400, "Invalid value for id");
    }

    switch (method) {
      case "GET":
        const oneTodos = await todoService.findTodoById(id);
        return EdgeResponse.json(200, oneTodos);
      case "PUT":
        const updateTodo = await req.json();
        const updatedTodo = await todoService.updateTodo(id, updateTodo);
        return EdgeResponse.json(200, updatedTodo);
      case "DELETE":
        const deletedTodo = await todoService.deleteTodo(id);
        return EdgeResponse.json(200, deletedTodo);
        break;
      default:
        throw new HttpException(405, "Method not allowed");
    }
  } catch (error) {
    if (error instanceof HttpException) {
      console.error("HttpException", error.status, error.message);
      return EdgeResponse.text(error.status, error.message);
    } else {
      console.error(error);
      return EdgeResponse.text(500, "Internal Server Error");
    }
  }
}
