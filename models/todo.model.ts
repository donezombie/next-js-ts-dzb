import { isArray } from "lodash";
import { AxiosResponse } from "axios";

class TodoModel {
  userId: number;
  id: number;
  title: string;
  completed: boolean;

  constructor({ userId = 0, id = 0, title = "", completed = false }) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.completed = completed;
  }

  static parseListTodoFromResponse(response: AxiosResponse<[]>) {
    const { data } = response;
    if (isArray(data)) {
      return data.map((el: TodoModel) => {
        const newTodo = new TodoModel(el);
        return newTodo;
      });
    }

    return [];
  }
}

export default TodoModel;
