'use client'
import { questions } from "../quiz/quiz";
import { useState } from "react";
import { motion } from "framer-motion";

const Quiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);

    const handleAnswer = (answer) => {
        const isCorrect = answer.correct;
        setUserAnswers(prevAnswers => [...prevAnswers, { question: questions[currentQuestionIndex], selected: answer, isCorrect }]);

        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            setShowResults(true);
        }
    };

    const handleRestart = () => {
        setScore(0);
        setCurrentQuestionIndex(0);
        setShowResults(false);
        setUserAnswers([]);
    };

    return (
        <motion.div className="quiz-container p-10 max-w-5xl mx-auto  shadow-xl rounded-xl transition-transform duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {showResults ? (
                <motion.div className="results text-center"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-6">Ваш результат: {score} из {questions.length}</h2>
                    <ul className="mt-6 space-y-4">
                        {userAnswers.map((answer, index) => (
                            <li key={index} className={`flex justify-between items-center p-4 border rounded-lg ${answer.isCorrect ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'}`}>
                                <span className="flex-1 font-medium">{answer.question.question}</span>
                                <span className="ml-4 text-lg font-semibold">{answer.isCorrect ? '✓' : '✗'} {answer.selected.text}</span>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleRestart} className="mt-8 py-3 px-6 text-lg font-bold bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                        Пройти снова
                    </button>
                </motion.div>
            ) : (
                <motion.div className="question-section"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold mb-8">{questions[currentQuestionIndex].question}</h2>

                    <div className="answers space-y-4">
                        {questions[currentQuestionIndex].answers.map((answer, index) => (
                            <motion.button
                                key={index}
                                onClick={() => handleAnswer(answer)}
                                className="w-full text-left p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-200 transition duration-200"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {answer.text}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Quiz;
