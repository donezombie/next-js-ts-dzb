import React from "react";
import { NextPageContext } from "next";
import { useTranslation } from "next-i18next";
import todoServices from "services/todoServices";
import { TodoModel } from "interfaces/models";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface ITodoDetail extends NextPageContext {
  todo: TodoModel;
}

//* Example get server side
const TodoDetailPage: React.FC<ITodoDetail> = (props) => {
  //! State
  const { todo, locale } = props;
  const { t } = useTranslation("common");

  //! Function

  //! Render
  return (
    <div className="todo">
      {/* Example i18n */}
      <div className="example-i18n">
        Locale: {locale}
        <br />
        <b>{t("change-locale")}</b>
        <br />
        <b>{t("number", { number: todo?.id })}</b>
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
  return {
    props: {
      todo,
      locale,

      //* serverSideTranslations must have for translation
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default TodoDetailPage;
