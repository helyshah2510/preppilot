import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

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

interface DSAResultProps {
  topic: string | null;
  difficulty: string | null;
}

function DSAResult({ topic, difficulty }: DSAResultProps) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!topic || !difficulty) return;

    let cancelled = false;

    async function generate() {
      setQuestion(null);
      setError(null);
      setLoading(true);

      const { data, error: fnError } = await supabase.functions.invoke("generate-dsa", {
        body: { topic, difficulty },
      });

      if (cancelled) return;
      setLoading(false);

      if (fnError) {
        setError(fnError.message || "Failed to generate question");
        return;
      }
      if (data?.error) {
        setError(data.error);
        return;
      }

      setQuestion(data.question as Question);
    }

    generate();

    return () => {
      cancelled = true;
    };
  }, [topic, difficulty]);

  if (!topic || !difficulty) return null;

  return (
    <section className="dsa-section">
      {loading && <p>Generating question…</p>}
      {error && <p className="dsa-error">{error}</p>}

      {question && (
        <>
          <div className="section-title">
            <h2>{question.title}</h2>
            <p>{topic} · {difficulty}</p>
          </div>

          <p>{question.problem}</p>

          <h4>Examples</h4>
          {question.examples.map((ex, i) => (
            <p key={i}>Input: {ex.input} → Output: {ex.output}</p>
          ))}

          <h4>Constraints</h4>
          <ul>
            {question.constraints.map((c, i) => <li key={i}>{c}</li>)}
          </ul>

          <p>💡 {question.hint}</p>
        </>
      )}
    </section>
  );
}

export default DSAResult;