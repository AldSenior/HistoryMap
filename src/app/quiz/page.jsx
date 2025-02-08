// pages/quiz.js
import Head from 'next/head';
import Quiz from '../components/quizask';

const QuizPage = () => {
  return (
    <div>
      <Head>
        <title>Викторина по Революции 1917 года</title>
      </Head>
      <main className="flex  min-h-72 bg-gray-100">
        <Quiz />
      </main>
    </div>
  );
};
export default QuizPage