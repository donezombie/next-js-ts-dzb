import TodoModel from "models/todo.model";
import React from "react";
import todoServices from "services/todoServices";

const propTypes = {};

interface ITodoDetail {
  todo: TodoModel;
}

const TodoDetailPage: React.FC<ITodoDetail> = (props) => {
  //! State
  const { todo } = props;

  //! Function

  //! Render
  return (
    <div className="todo">
      <div className="todo-id">{todo?.id}</div>
      <div className="todo-title">{todo?.title}</div>
    </div>
  );
};

export async function getStaticPaths() {
  const resTodoList = await todoServices.getTodos();
  const todoList = resTodoList?.data || [];

  const paths = todoList.map((todo: TodoModel) => {
    return { params: { todo: `${todo.id}` } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const res = await todoServices.getTodoDetail(params?.todo);
  const todo = res?.data;

  // Pass post data to the page via props
  return { props: { todo } };
}

TodoDetailPage.propTypes = propTypes;
export default TodoDetailPage;
