import "./ActiveInterview.css";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Clock3,
  Mic,
  Keyboard,
  SkipForward,
  Send,
} from "lucide-react";

function ActiveInterview() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get interview type from URL
  const interviewType = searchParams.get("type") || "Technical";

  const totalQuestions = 5;

  const [questionNumber, setQuestionNumber] = useState(1);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);

  const [showTextInput, setShowTextInput] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Generate a question from Gemini
  const generateQuestion = useCallback(async () => {
    setLoading(true);
    setQuestion("");

    try {
      const { data, error } = await supabase.functions.invoke(
        "generate-interview",
        {
          body: {
            type: interviewType,
          },
        }
      );

      if (error) {
        console.error("Error generating interview:", error);
        return;
      }

      console.log("AI response:", data);

      setQuestion(data.question);
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  }, [interviewType]);

  // Start interview
  useEffect(() => {
    // Clear any previous interview data
    sessionStorage.removeItem("preppilot-interview");
    sessionStorage.removeItem("preppilot-interview-result");

    // Store basic interview information
    sessionStorage.setItem(
      "preppilot-interview",
      JSON.stringify({
        type: interviewType,
        questions: [],
      })
    );

    generateQuestion();
  }, [generateQuestion, interviewType]);

  // Save a question and answer
  const saveQuestionAnswer = (
    currentQuestion: string,
    currentAnswer: string
  ) => {
    const existingInterview = sessionStorage.getItem(
      "preppilot-interview"
    );

    const interviewData = existingInterview
      ? JSON.parse(existingInterview)
      : {
          type: interviewType,
          questions: [],
        };

    interviewData.questions.push({
      questionNumber,
      question: currentQuestion,
      answer: currentAnswer,
    });

    sessionStorage.setItem(
      "preppilot-interview",
      JSON.stringify(interviewData)
    );

    return interviewData;
  };

  // Move to next question
  const goToNextQuestion = async () => {
    if (questionNumber >= totalQuestions) {
      return;
    }

    if (!answer.trim()) {
      return;
    }

    // Save current question + answer
    saveQuestionAnswer(question, answer);

    // Move to next question
    setQuestionNumber((previous) => previous + 1);

    // Clear previous answer
    setAnswer("");
    setShowTextInput(false);

    // Generate next question
    await generateQuestion();
  };

  // Skip current question
  const handleSkip = async () => {
    if (questionNumber >= totalQuestions || loading) {
      return;
    }

    // Save skipped question with empty answer
    saveQuestionAnswer(question, "");

    // Move to next question
    setQuestionNumber((previous) => previous + 1);

    setAnswer("");
    setShowTextInput(false);

    await generateQuestion();
  };

  // Evaluate the completed interview
  const handleSubmit = async () => {
    if (questionNumber !== totalQuestions || evaluating) {
      return;
    }

    setEvaluating(true);

    try {
      // Save Question 5 + its answer
      const interviewData = saveQuestionAnswer(
        question,
        answer
      );

      console.log("Interview data:", interviewData);

      // Send all questions and answers to evaluation Edge Function
      const { data, error } = await supabase.functions.invoke(
        "evaluate-interview",
        {
          body: interviewData,
        }
      );

      if (error) {
        console.error("Error evaluating interview:", error);

        alert(
          "There was a problem evaluating your interview. Please try again."
        );

        return;
      }

      console.log("Evaluation result:", data);

      // Store AI result for Result page
      sessionStorage.setItem(
        "preppilot-interview-result",
        JSON.stringify(data)
      );

      // Go to result page
      navigate("/mock-interview/result");
    } catch (error) {
      console.error("Unexpected evaluation error:", error);

      alert(
        "Something went wrong while evaluating your interview."
      );
    } finally {
      setEvaluating(false);
    }
  };

  // Start speech recognition
  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech recognition is not supported in this browser. Please use Chrome or type your answer instead."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript =
        event.results[0][0].transcript;

      setAnswer((previous) => {
        if (previous.trim()) {
          return `${previous} ${transcript}`;
        }

        return transcript;
      });
    };

    recognition.onerror = (event: any) => {
      console.error(
        "Speech recognition error:",
        event.error
      );

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const hasAnswer = answer.trim().length > 0;

  return (
    <>
      {/* Header */}

      <header className="interview-topbar">
        <div>
          <h2>{interviewType} Interview</h2>

          <p>
            Question {questionNumber} of {totalQuestions}
          </p>
        </div>

        <div className="interview-timer">
          <Clock3 size={18} />
          <span>02:14</span>
        </div>
      </header>

      {/* Progress */}

      <div className="question-progress">
        {Array.from({ length: totalQuestions }).map(
          (_, index) => (
            <span
              key={index}
              className={`progress-step ${
                index < questionNumber
                  ? "active"
                  : ""
              }`}
            ></span>
          )
        )}
      </div>

      {/* Question */}

      <section className="question-card">
        <div className="question-number">
          Question {questionNumber}
        </div>

        <h1>
          {loading
            ? "Generating your question..."
            : question}
        </h1>
      </section>

      {/* Answer Area */}

      <section className="answer-section">
        <div className="answer-header">
          <div>
            <h3>Your Answer</h3>

            <p>
              Speak your answer or type it manually.
            </p>
          </div>
        </div>

        {!showTextInput ? (
          <>
            {/* Voice Area */}

            <div className="voice-area">
              <div className="mic-circle">
                <Mic size={30} />
              </div>

              <h3>
                {isListening
                  ? "Listening..."
                  : "Ready when you are"}
              </h3>

              <p>
                {isListening
                  ? "Speak your answer."
                  : "Click the microphone to start answering."}
              </p>

              <div className="voice-wave">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <button
                className="record-btn"
                onClick={handleVoiceInput}
                disabled={isListening}
              >
                <Mic size={18} />

                {isListening
                  ? "Listening..."
                  : "Start Recording"}
              </button>
            </div>

            {/* Type Instead */}

            <button
              className="type-answer-btn"
              onClick={() =>
                setShowTextInput(true)
              }
            >
              <Keyboard size={18} />
              Type instead
            </button>
          </>
        ) : (
          <>
            {/* Text Answer Area */}

            <div className="text-answer-area">
              <textarea
                value={answer}
                onChange={(event) =>
                  setAnswer(event.target.value)
                }
                placeholder="Type your answer here..."
                rows={8}
                autoFocus
              />
            </div>

            {/* Back to Voice */}

            <button
              className="type-answer-btn"
              onClick={() =>
                setShowTextInput(false)
              }
            >
              <Mic size={18} />
              Use voice instead
            </button>
          </>
        )}
      </section>

      {/* Bottom Actions */}

      <div className="interview-actions">
        {/* Skip */}

        <button
          className="skip-btn"
          onClick={handleSkip}
          disabled={
            loading ||
            evaluating ||
            questionNumber === totalQuestions
          }
        >
          <SkipForward size={18} />
          Skip
        </button>

        {/* Questions 1-4 */}

        {questionNumber < totalQuestions && (
          <button
            className="submit-btn"
            onClick={goToNextQuestion}
            disabled={!hasAnswer || loading}
          >
            <Send size={18} />
            Next Question
          </button>
        )}

        {/* Question 5 */}

        {questionNumber === totalQuestions && (
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={
              !hasAnswer ||
              loading ||
              evaluating
            }
          >
            <Send size={18} />

            {evaluating
              ? "Evaluating..."
              : "Submit Answer"}
          </button>
        )}
      </div>
    </>
  );
}

export default ActiveInterview;