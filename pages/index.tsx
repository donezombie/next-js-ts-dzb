import useGetTodoList from "hooks/todos/useGetTodoList";
import { List } from "interfaces";
import { TodoModel } from "interfaces/models";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTodosList } from "redux/actions";
import todoServices from "services/todoServices";

interface IHome {
  todoList: List<TodoModel>;
}

const Home: NextPage<IHome> = ({ todoList }) => {
  const dispatch = useDispatch();
  const { data, loading } = useGetTodoList();

  useEffect(() => {
    //* Example dispatch action redux
    dispatch(getTodosList({}));
  }, []);

  return (
    <div>
      {todoList.map((todo) => (
        <div key={todo.id}>
          {todo.id} - {todo.title}
        </div>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const response = await todoServices.getTodos();
  const todoList = response?.data || [];
  return {
    props: {
      todoList,
    }, // will be passed to the page component as props
  };
}

export default Home;
