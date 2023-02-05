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
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        const allTodos = await todoService.findAllTodos();
        return EdgeResponse.json(200, allTodos);
      case "POST":
        const newTodo = await req.json();
        const createdTodo = await todoService.createTodo(newTodo);
        return EdgeResponse.json(201, createdTodo);
      default:
        throw new HttpException(405, "Method not allowed");
    }
  } catch (error) {
    console.error(error);
    if (error instanceof HttpException) {
      return EdgeResponse.text(error.status, error.message);
    } else {
      return EdgeResponse.text(500, "Internal Server Error");
    }
  }
}
