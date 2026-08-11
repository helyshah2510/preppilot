import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./DSAQues.css";

interface Example {
  input: string;
  output: string;
}

interface Question {
  title: string;
  problem: string;
  examples: Example[];
  constraints: string[];
  hint: string;
}

function DSAQues() {
  const { topic, difficulty } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answer, setAnswer] = useState("");
  const [totalQuestions] = useState(10);

    useEffect(() => {
        if (!topic || !difficulty) return;

        const loadQuestion = async () => {
            setLoading(true);
            setError("");

            // Get logged-in user
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setError("Please log in to continue.");
                setLoading(false);
                return;
            }

            // Check if there is an unfinished question
            const { data: existingQuestion, error: fetchError } =
            await supabase
                .from("dsa_attempts")
                .select("*")
                .eq("user_id", user.id)
                .eq("topic", topic)
                .eq("difficulty", difficulty)
                .eq("status", "in_progress")
                .order("question_number", { ascending: false })
                .limit(1)
                .maybeSingle();

            if (fetchError) {
                console.error(fetchError);
                setError("Could not load your practice session.");
                setLoading(false);
                return;
            }

            // Resume existing question
            if (existingQuestion) {
                setQuestion({
                    title: existingQuestion.question.title,
                    problem: existingQuestion.question.problem,
                    examples: existingQuestion.question.examples,
                    constraints: existingQuestion.question.constraints,
                    hint: existingQuestion.hint,
                });

                setQuestionNumber(existingQuestion.question_number);
                setAnswer(existingQuestion.user_answer || "");
                setLoading(false);
                return;
            }

            // No existing question → generate Question 1
            const { data, error: functionError } =
            await supabase.functions.invoke("generate-dsa", {
                body: {
                    topic,
                    difficulty,
                },
            });

            if (functionError) {
                console.error(functionError);
                setError("Failed to generate question.");
                setLoading(false);
                return;
            }

            if (data?.error) {
                setError(data.error);
                setLoading(false);
                return;
            }

            const generatedQuestion = data.question;

            // Save Question 1 to Supabase
            const { error: insertError } = await supabase
            .from("dsa_attempts")
            .insert({
                user_id: user.id,
                topic,
                difficulty,
                question: generatedQuestion,
                hint: generatedQuestion.hint,
                question_number: 1,
                total_questions: totalQuestions,
                status: "in_progress",
            });

            if (insertError) {
                console.error(insertError);
                setError("Question was generated but could not be saved.");
                setLoading(false);
                return;
            }

            setQuestion(generatedQuestion);
            setQuestionNumber(1);
            setLoading(false);
        };

        loadQuestion();
    },[topic, difficulty]);

    const [evaluating, setEvaluating] = useState(false);

    if (loading) {
        return <h2>{evaluating ? "Evaluating your answers..." : "Generating question..."}</h2>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const handleSaveExit = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user || !topic || !difficulty) {
            return;
        }

        const { error } = await supabase
            .from("dsa_attempts")
            .update({
                user_answer: answer,
            })
            .eq("user_id", user.id)
            .eq("topic", topic)
            .eq("difficulty", difficulty)
            .eq("question_number", questionNumber)
            .eq("status", "in_progress");

        if (error) {
            console.error("Save error:", error);
            setError("Could not save your progress.");
            return;
        }

        navigate("/dsa-practice");
    };

    const handleNextQuestion = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user || !topic || !difficulty || !question) {
            return;
        }

        // Save current answer
        const { error: updateError } = await supabase
            .from("dsa_attempts")
            .update({
                user_answer: answer,
            })
            .eq("user_id", user.id)
            .eq("topic", topic)
            .eq("difficulty", difficulty)
            .eq("question_number", questionNumber)
            .eq("status", "in_progress");

        if (updateError) {
            console.error(updateError);
            setError("Could not save your answer.");
            return;
        }

        setLoading(true);
        setError("");
        setAnswer("");

        // Generate next question
        const { data, error: functionError } =
            await supabase.functions.invoke("generate-dsa", {
                body: {
                    topic,
                    difficulty,
                },
            });

        if (functionError || data?.error) {
            setError("Failed to generate the next question.");
            setLoading(false);
            return;
        }

        const nextQuestion = data.question;
        const nextNumber = questionNumber + 1;

        // Save next question
        const { error: insertError } = await supabase
            .from("dsa_attempts")
            .insert({
                user_id: user.id,
                topic,
                difficulty,
                question: nextQuestion,
                hint: nextQuestion.hint,
                question_number: nextNumber,
                total_questions: totalQuestions,
                status: "in_progress",
            });

        if (insertError) {
            console.error(insertError);
            setError("Could not save the next question.");
            setLoading(false);
            return;
        }

        setQuestion(nextQuestion);
        setQuestionNumber(nextNumber);
        setLoading(false);
    };

    const handleSubmit = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user || !topic || !difficulty) return;

        setEvaluating(true);
        setLoading(true);
        setError("");

        // Save final answer
        const { error: updateError } = await supabase
            .from("dsa_attempts")
            .update({
                user_answer: answer,
            })
            .eq("user_id", user.id)
            .eq("topic", topic)
            .eq("difficulty", difficulty)
            .eq("question_number", questionNumber)
            .eq("status", "in_progress");

        if (updateError) {
            console.error(updateError);
            setError("Could not save your answer.");
            setLoading(false);
            return;
        }

        // Trigger evaluation
        const { data, error: functionError } = await supabase.functions.invoke(
            "evaluate-dsa",
            {
                body: { topic, difficulty },
            }
        );
        if (functionError || data?.error) {
            console.error(functionError || data?.error);
            setError(data?.error || "Failed to evaluate your answers.");
            setLoading(false);
            return;
        }
        navigate(`/dsa-question/${topic}/${difficulty}/result`);
    };

    return (
        <main className="dsa-question-page">
            <div className="dsa-question-container">

            <div className="dsa-question-header">
                <h1>{question?.title}</h1>

                <p className="dsa-question-meta">
                {topic} · {difficulty}
                </p>
            </div>

            <div className="dsa-question-card">

                <div className="dsa-question-section">
                    <h3>Problem</h3>
                    <p>{question?.problem}</p>
                    </div>

                    <div className="dsa-question-section">
                    <h3>Examples</h3>

                    {question?.examples.map((example, index) => (
                        <div className="dsa-example" key={index}>
                        <p>Input: {example.input}</p>
                        <p>Output: {example.output}</p>
                        </div>
                    ))}
                    </div>

                    <div className="dsa-question-section">
                    <h3>Constraints</h3>

                    <ul className="dsa-constraints">
                        {question?.constraints.map((constraint, index) => (
                        <li key={index}>{constraint}</li>
                        ))}
                    </ul>
                    </div>

                    <div className="dsa-question-section">
                        <h3>💡 Hint</h3>

                        <div className="dsa-hint">
                            <p>{question?.hint}</p>
                        </div>
                    </div>
                    {/* Text Answer Area */}

                    <div className="text-answer-area">
                       <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Type your answer here..."
                            rows={8}
                            autoFocus
                        />
                        <div className="dsa-action-buttons">
                            <button className="save-exit-btn" onClick={handleSaveExit}>
                                Save & Exit
                            </button>

                            {questionNumber < totalQuestions ? (
                                <button className="next-question-btn" onClick={handleNextQuestion}>
                                Next Question →
                                </button>
                            ) : (
                                <button className="submit-btn" onClick={handleSubmit}>
                                Submit
                                </button>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}
export default DSAQues;