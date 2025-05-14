"use client";
import Head from "next/head";
import Quiz from "../components/Quizlient";

const QuizPage = () => {
  return (
    <div>
      <Head>
        <title>Викторина по Революции 1917 года</title>
      </Head>
      <main className="flex ">
        <Quiz />
      </main>
    </div>
  );
};
export default QuizPage;
