import { useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import useGetTodoList from "hooks/todos/useGetTodoList";
import { List } from "interfaces";
import todoServices from "services/todoServices";
import useSagaCreators from "hooks/useSagaCreators";
import TodoModel from "models/todo.model";

interface IHome {
  todoList: List<TodoModel>;
}

const Home: NextPage<IHome> = ({ todoList }) => {
  const { dispatch } = useSagaCreators();
  const { data, loading } = useGetTodoList();
  console.log(data)

  useEffect(() => {
    //* Example dispatch action redux
  }, [dispatch]);

  return (
    <div>
      {todoList.map((todo) => (
        <div key={todo.id}>
          {/* Example static path */}
          {/* <Link href={`/todo/${todo.id}`}> */}
          <Link href={`/todoServerSide/${todo.id}`}>
            <a>
              {todo.id} - {todo.title}
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export async function getStaticProps({ locale, locales }: any) {
  const response = await todoServices.getTodos();
  const todoList = response?.data || [];
  return {
    props: {
      todoList,
    }, // will be passed to the page component as props
  };
}

export default Home;
