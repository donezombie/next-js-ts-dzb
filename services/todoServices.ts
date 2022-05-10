import { ResponseGenerator } from "./../interfaces/index";
import httpService from "./httpMethod";
import { GET_TODOS_URL } from "constants/api";
import TodoModel from "models/todo.model";

class TodosService {
  getTodos(): Promise<ResponseGenerator<TodoModel[]>> {
    return httpService.get(GET_TODOS_URL);
  }

  getTodoDetail(id: string): Promise<ResponseGenerator> {
    return httpService.get(`${GET_TODOS_URL}/${id}`);
  }
}

export default new TodosService();
