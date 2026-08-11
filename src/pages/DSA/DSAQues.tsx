import { useParams } from "react-router-dom";

function DSAQues() {
  const { topic, difficulty } = useParams();

  return (
    <div>
      <h1>DSA Question</h1>

      <p>Topic: {topic}</p>
      <p>Difficulty: {difficulty}</p>
    </div>
  );
}

export default DSAQues;