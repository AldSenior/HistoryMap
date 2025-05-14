"use client";

import { questions } from "../quiz/quiz";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[index];

  const handleAnswer = (answer) => {
    if (selected) return;

    const isCorrect = answer.correct;
    if (isCorrect) setScore((s) => s + 1);

    setSelected(answer);
    setAnswers((prev) => [
      ...prev,
      { question: currentQuestion, selected: answer, isCorrect },
    ]);
  };

  const nextQuestion = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setFinished(false);
    setSelected(null);
    setAnswers([]);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-[#300000] via-[#111111] to-[#1C2526] text-white px-4 py-10 sm:px-8 sm:py-16 font-['Roboto']">
      <motion.h1
        className="text-4xl sm:text-5xl font-bold text-[#D4A017] text-center font-['Playfair_Display'] mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Викторина: Революция 1917
      </motion.h1>

      <motion.div
        className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-10 border border-white/10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
      >
        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="mb-8">
                <motion.div
                  className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-[#D4A017] flex items-center justify-center shadow-[0_0_25px_#D4A017]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 120 }}
                >
                  <span className="text-black text-3xl font-bold">
                    {score}/{questions.length}
                  </span>
                </motion.div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#D4A017] font-['Playfair_Display']">
                  Ваш результат
                </h2>
              </div>

              <ul className="space-y-4 text-left max-w-3xl mx-auto">
                {answers.map((a, i) => (
                  <li
                    key={i}
                    className={`flex items-start p-4 rounded-xl border ${
                      a.isCorrect
                        ? "bg-green-200/10 border-green-400 text-green-300"
                        : "bg-red-200/10 border-red-400 text-red-300"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">
                        {a.question.question}
                      </p>
                      <p className="text-xs">
                        {a.isCorrect ? "✓ Правильно:" : "✗ Неверно:"}{" "}
                        <span className="text-white">{a.selected.text}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <motion.button
                onClick={restart}
                className="mt-10 px-6 py-3 bg-[#D4A017] text-black font-bold rounded-lg hover:bg-yellow-400 transition hover:scale-105 shadow-lg"
              >
                Пройти снова
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                {currentQuestion.question}
              </h2>

              <div className="space-y-4">
                {currentQuestion.answers.map((a, i) => {
                  const isSelected = selected?.text === a.text;
                  const isCorrect = a.correct;

                  // Определяем финальный класс
                  let base =
                    "transition-all duration-300 shadow-sm w-full text-left p-4 rounded-lg font-medium border";
                  let colorClass =
                    "bg-white/10 text-white border-white/10 hover:scale-[1.02] hover:border-yellow-400";

                  if (selected) {
                    if (isSelected && isCorrect) {
                      colorClass =
                        "bg-green-500/20 text-green-300 border-green-400";
                    } else if (isSelected && !isCorrect) {
                      colorClass = "bg-red-500/20 text-red-300 border-red-400";
                    } else if (isCorrect) {
                      colorClass =
                        "bg-green-200/10 text-green-200 border-green-300";
                    } else {
                      colorClass = "bg-white/5 text-white border-white/10";
                    }
                  }

                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleAnswer(a)}
                      disabled={!!selected}
                      className={`${base} ${colorClass} ${selected ? "cursor-default" : ""}`}
                      whileHover={!selected ? { scale: 1.01 } : {}}
                    >
                      {a.text}
                    </motion.button>
                  );
                })}
              </div>

              {selected && (
                <div className="mt-8 text-center">
                  <motion.button
                    onClick={nextQuestion}
                    className="mt-4 px-6 py-3 bg-[#D4A017] text-black font-bold rounded-lg hover:bg-yellow-400 transition hover:scale-105 shadow-lg"
                  >
                    {index + 1 < questions.length
                      ? "Следующий вопрос"
                      : "Завершить"}
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Quiz;
