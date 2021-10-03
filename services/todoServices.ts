import httpService from "./httpMethod";
import { GET_TODOS_URL } from "constants/api";

class TodosService {
  getTodos() {
    return httpService.get(GET_TODOS_URL);
  }

  getTodoDetail(id: string) {
    return httpService.get(`${GET_TODOS_URL}/${id}`);
  }
}

export default new TodosService();
