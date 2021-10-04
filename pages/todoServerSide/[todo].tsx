import React from "react";
import todoServices from "services/todoServices";
import { TodoModel } from "interfaces/models";
import { NextPageContext } from "next";
import useTranslation from "hooks/useTranslation";

interface ITodoDetail extends NextPageContext {
  todo: TodoModel;
}

//* Example get server side
const TodoDetailPage: React.FC<ITodoDetail> = (props) => {
  //! State
  const { todo, locale } = props;
  const { t } = useTranslation(locale);

  //! Function

  //! Render
  return (
    <div className="todo">
      {/* Example i18n */}
      <div>
        Locale: {locale}
        <br />
        <b>{t.hello}</b>
      </div>
      <div className="todo-id">{todo?.id}</div>
      <div className="todo-title">{todo?.title}</div>
    </div>
  );
};

export async function getServerSideProps({ params, locale }: any) {
  const res = await todoServices.getTodoDetail(params?.todo);
  const todo = res?.data;

  // Pass post data to the page via props
  return { props: { todo, locale } };
}

export default TodoDetailPage;
