// components/Quiz.tsx
import QuizClient from "./QuizClient";
import { questions } from "../quiz/quiz";

export default function Quiz() {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-[#300000] via-[#111111] to-[#1C2526] text-white px-4 py-10 sm:px-8 sm:py-16 font-['Roboto']">
      <h1 className="text-4xl sm:text-5xl font-bold text-[#D4A017] text-center font-['Playfair_Display'] mb-12">
        Викторина: Революция 1917
      </h1>
      <QuizClient questions={questions} />
    </div>
  );
}
