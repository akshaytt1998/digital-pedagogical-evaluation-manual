"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getQuestions, saveAnswers } from "../../services/questionnaireService";
import type { QuestionSection, QuestionItem, SubmissionPayload } from "../../utils/types";

const Questionnaire = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [data, setData] = useState<QuestionSection[]>([]);
  const [yesCount, setYesCount] = useState(0);
  const [scoresByMainIndex, setScoresByMainIndex] = useState<Record<string, number>>({});
  const [titlesByMainIndex, setTitlesByMainIndex] = useState<Record<string, string>>({});
  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") ?? "Unknown";

  useEffect(() => {
    getQuestions()
      .then((questions) => {
        setData(questions);
        setAnswers({});
      })
      .catch((error: unknown) => console.error("Error fetching questions:", error));
  }, []);

  const handleSubmit = async () => {
    try {
      const payload: SubmissionPayload = {
        answers,
        role,
        score: yesCount,
        scoresBySection: scoresByMainIndex,
      };
      await saveAnswers(payload);
      setShowPopup(true);
    } catch (error: unknown) {
      console.error("Error saving answers:", error);
      alert("Failed to save answers. Please try again.");
    }
  };

  const handleInputChange = (index: string, value: unknown) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const renderQuestion = (question: QuestionItem) => {
    switch (question.type) {
      case 1: // Checklist
        return (
          <div className="space-y-2">
            {question.checklist?.map((item: string, idx: number) => (
              <label key={idx} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={
                    Array.isArray(answers[question.index]) &&
                    (answers[question.index] as string[]).includes(item)
                  }
                  onChange={(e) => {
                    const current = Array.isArray(answers[question.index])
                      ? (answers[question.index] as string[])
                      : [];
                    const newValue = e.target.checked
                      ? [...current, item]
                      : current.filter((i) => i !== item);
                    handleInputChange(String(question.index), newValue);
                  }}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-lg text-gray-700">{item}</span>
              </label>
            ))}
          </div>
        );

      case 2: // Yes/No
        return (
          <div className="flex space-x-4">
            <button
              onClick={() => handleInputChange(String(question.index), 1)}
              className={`px-6 py-3 rounded-lg text-white font-semibold transition-all ${
                answers[question.index] === 1
                  ? "bg-green-600 hover:bg-green-700 border-2 border-green-700"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleInputChange(String(question.index), 0)}
              className={`px-6 py-3 rounded-lg text-white font-semibold transition-all ${
                answers[question.index] === 0
                  ? "bg-red-600 hover:bg-red-700 border-2 border-red-700"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              No
            </button>
          </div>
        );

      case 3: // Description
        return (
          <textarea
            value={typeof answers[question.index] === "string" ? (answers[question.index] as string) : ""}
            onChange={(e) => handleInputChange(String(question.index), e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Enter your description..."
          />
        );

      case 4: // Scale
        return (
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map((value) => {
              const colors = [
                "bg-red-500 hover:bg-blue-600",
                "bg-orange-500 hover:bg-green-600",
                "bg-yellow-500 hover:bg-yellow-600",
                "bg-green-500 hover:bg-orange-600",
                "bg-green-800 hover:bg-red-600",
              ];
              return (
                <button
                  key={value}
                  onClick={() => handleInputChange(String(question.index), value)}
                  className={`px-6 py-3 rounded-lg text-white font-semibold transition-all ${
                    answers[question.index] === value
                      ? `${colors[value - 1]} border-2 border-gray-800`
                      : colors[value - 1]
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentPage < data.length - 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentPage((prev) => prev - 1);
    }
  };

  const currentData = data[currentPage];

  useEffect(() => {
    const scores: Record<string, number> = {};
    const titles: Record<string, string> = {};
    let total = 0;

    const findQuestionAndMainIndex = (index: string | number) => {
      for (const page of data) {
        for (const category of page.categories) {
          if (category.questionsSet) {
            const q = category.questionsSet.find((q) => q.index === Number(index));
            if (q) return { question: q, mainIndex: page.mainIndex, mainTitle: page.mainTitle };
          }
          if (category.subCategories) {
            for (const sub of category.subCategories) {
              const q = sub.questionsSet.find((q) => q.index === Number(index));
              if (q) return { question: q, mainIndex: page.mainIndex, mainTitle: page.mainTitle };
            }
          }
        }
      }
      return null;
    };

    for (const key in answers) {
      const value = answers[key];
      if (value == null) continue;

      const result = findQuestionAndMainIndex(key);
      if (!result) continue;

      const { question, mainIndex, mainTitle } = result;
      titles[mainIndex] = mainTitle;

      if (mainIndex === "0") continue;

      let score = 0;

      if (question.type === 1 && Array.isArray(value) && question.checklist) {
        const selectedCount = (value as string[]).length;
        const totalOptions = question.checklist.length;
        const percentage = (selectedCount / totalOptions) * 100;

        if (percentage > 0 && percentage <= 25) score = 1;
        else if (percentage > 25 && percentage <= 50) score = 2;
        else if (percentage > 50 && percentage <= 75) score = 3;
        else if (percentage > 75 && percentage <= 100) score = 4;
      } else if (typeof value === "number") {
        score = value;
      }

      total += score;
      scores[mainIndex] = (scores[mainIndex] || 0) + score;
    }

    setYesCount(total);
    setScoresByMainIndex(scores);
    setTitlesByMainIndex(titles);
  }, [answers, data]);

  function getAlphabet(index: number) {
    return String.fromCharCode(97 + index);
  }

  return (
    <div
      className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('/mooc.jpeg')",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-900 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 p-4 rounded-lg shadow-lg">
          {currentData?.mainTitle}
        </h1>

        {currentData?.categories.map((category, index) => (
          <div key={index} className="mb-8">
            <h2
              className="text-2xl font-semibold text-gray-800 mb-4"
              style={{ color: "blue" }}
            >
              {category.categoryTitle}
            </h2>

            {category.subCategories ? (
              category.subCategories.map((subCategory) => (
                <div key={subCategory.index} className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    {subCategory.title}
                  </h3>
                  {subCategory.questionsSet.map((question, qIdx) => (
                    <div
                      key={question.index}
                      className="mb-6 p-6 bg-blue-50 rounded-lg shadow-sm"
                    >
                      <p className="text-xl font-semibold mb-4 text-gray-800">
                        {getAlphabet(qIdx)}. {question.question}
                      </p>
                      {renderQuestion(question)}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              category.questionsSet?.map((question, qIdx) => (
                <div
                  key={question.index}
                  className="mb-6 p-6 bg-blue-50 rounded-lg shadow-sm"
                >
                  <p className="text-xl font-semibold mb-4 text-gray-800">
                    {getAlphabet(qIdx)}. {question.question}
                  </p>
                  {renderQuestion(question)}
                </div>
              ))
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg shadow-sm">
        <p className="text-lg text-gray-800">
          Total score:{" "}
          <span className="font-bold text-green-600">{yesCount}</span>
        </p>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded ${
            currentPage === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Previous
        </button>
        {currentPage < data.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
          >
            Submit
          </button>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
              Scores by Section
            </h2>

            <ul className="divide-y divide-gray-200 mb-6">
              {Object.entries(scoresByMainIndex).map(([mainIndex, score]) => (
                <li key={mainIndex} className="py-3">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-gray-700">
                      {titlesByMainIndex[mainIndex] || `Section ${mainIndex}`}
                    </span>
                    <span className="text-green-600 font-bold">{score}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t pt-4 text-center">
              <p className="text-lg font-semibold text-gray-800">
                Total Score:{" "}
                <span className="text-green-700">{yesCount}</span>
              </p>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => {
                  setShowPopup(false);
                  router.push("/");
                }}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
