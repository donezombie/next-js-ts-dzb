import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTodosList } from "redux/actions";
import type { GetStaticPathsContext, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import useGetTodoList from "hooks/todos/useGetTodoList";
import { List } from "interfaces";
import { TodoModel } from "interfaces/models";
import todoServices from "services/todoServices";
import { GetStaticPropsCallback } from "next-redux-wrapper";

interface IHome {
  todoList: List<TodoModel>;
}

const Home: NextPage<IHome> = ({ todoList, locale, locales }) => {
  const dispatch = useDispatch();
  const { data, loading } = useGetTodoList();
  console.log({ locale, locales });

  useEffect(() => {
    //* Example dispatch action redux
    dispatch(getTodosList({}));
  }, []);

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
  console.log({ locale, locales });
  return {
    props: {
      todoList,
    }, // will be passed to the page component as props
  };
}

export default Home;
