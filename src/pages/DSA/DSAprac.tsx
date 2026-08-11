import "./DSAprac.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/dashboard_1/Sidebar";
import {
  Search,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Circle,
} from "lucide-react";

interface Topic {
  name: string;
  icon: string;
  solved: number;
  total: number;
}

const topics: Topic[] = [
  { name: "Arrays", icon: "A", solved: 12, total: 20 },
  { name: "Strings", icon: "S", solved: 8, total: 15 },
  { name: "Linked Lists", icon: "L", solved: 4, total: 12 },
  { name: "Stack & Queue", icon: "S", solved: 6, total: 10 },
  { name: "Trees", icon: "T", solved: 5, total: 15 },
  { name: "Graphs", icon: "G", solved: 3, total: 12 },
];

function DSAPractice() {
    const navigate = useNavigate();
    //const [activeTopic, setActiveTopic] = useState<string | null>(null);
    const [difficulty, setDifficulty] = useState<string | null>(null);
    const [filterOpen, setFilterOpen] = useState(false);
  return (
    <div className="dsa-layout">
        <Sidebar/>
    
        <main className="dsa-page">

        {/* Header */}

        <div className="dsa-header">
            <div>
            <h1>DSA Practice</h1>

            <p>
                Sharpen your problem-solving skills with structured practice.
            </p>
            </div>

            <div className="dsa-progress">
            <span>Your Progress</span>
            <strong>24 / 50 solved</strong>
            </div>
        </div>


        {/* Search + Filter */}

        <div className="dsa-controls">

            <div className="dsa-search">
            <Search size={19} />

            <input
                type="text"
                placeholder="Search problems..."
            />
            </div>

            <div className="difficulty-filter-wrapper">
                <button
                    className="difficulty-filter"
                    onClick={() => setFilterOpen((open) => !open)}
                >
                    {difficulty ?? "All Difficulties"}
                    <ChevronDown size={18} />
                </button>

                {filterOpen && (
                    <div className="difficulty-menu">
                        {["All Difficulties", "Easy", "Medium", "Hard"].map((level) => (
                            <button
                            key={level}
                            onClick={() => {
                                setDifficulty(level === "All Difficulties" ? null : level);
                                setFilterOpen(false);
                            }}
                            >
                                {level}
                            </button>
                         ))}
                    </div>
                )}
            </div>

        </div>


        {/* Topics */}

        <section className="dsa-section">

            <div className="section-title">
                <h2>Topics</h2>
                <p>Choose a topic to practice.</p>
            </div>

            <div className="topic-grid">

                {topics.map((topic) => {
                    const percent = Math.round(
                        (topic.solved / topic.total) * 100
                    );

                    return (
                        <div className="topic-card" key={topic.name}>

                            <div className="topic-top">
                                <div
                                    className={`topic-icon ${topic.name
                                        .toLowerCase()
                                        .replace(/\s|&/g, "")}`}
                                >
                                    {topic.icon}
                                </div>

                                <span>
                                    {topic.solved} / {topic.total}
                                </span>
                            </div>

                            <h3>{topic.name}</h3>

                            <p>{topic.total} problems</p>

                            <div className="topic-progress">
                                <span
                                    style={{ width: `${percent}%` }}
                                ></span>
                            </div>

                            <button
                                className="start-practice-btn"
                                onClick={() => {
                                    if (!difficulty) {
                                        alert("Please select a difficulty first.");
                                        return;
                                    }

                                    navigate(
                                        `/dsa-question/${encodeURIComponent(
                                            topic.name
                                        )}/${difficulty.toLowerCase()}`
                                    );
                                }}
                            >
                                Practice
                                <ArrowRight size={17} />
                            </button>

                        </div>
                    );
                })}

            </div>

        </section>

        {/* Recommended Problems */}

        <section className="dsa-section">

            <div className="section-title">
            <h2>Recommended Problems</h2>

            <p>
                Problems selected based on your current progress.
            </p>
            </div>


            <div className="problem-list">

            <div className="problem-row">

                <div className="problem-status">
                <Circle size={20} />
                </div>

                <div className="problem-info">
                <h3>Two Sum</h3>
                <p>Arrays · Hash Map</p>
                </div>

                <span className="difficulty easy">
                Easy
                </span>

                <button className="solve-btn">
                Solve
                <ArrowRight size={17} />
                </button>

            </div>


            <div className="problem-row">

                <div className="problem-status completed">
                <CheckCircle2 size={20} />
                </div>

                <div className="problem-info">
                <h3>Valid Parentheses</h3>
                <p>Stack · Strings</p>
                </div>

                <span className="difficulty easy">
                Easy
                </span>

                <button className="solve-btn">
                Review
                <ArrowRight size={17} />
                </button>

            </div>


            <div className="problem-row">

                <div className="problem-status">
                <Circle size={20} />
                </div>

                <div className="problem-info">
                <h3>Longest Substring Without Repeating Characters</h3>
                <p>Strings · Sliding Window</p>
                </div>

                <span className="difficulty medium">
                Medium
                </span>

                <button className="solve-btn">
                Solve
                <ArrowRight size={17} />
                </button>

            </div>


            <div className="problem-row">

                <div className="problem-status">
                <Circle size={20} />
                </div>

                <div className="problem-info">
                <h3>Binary Tree Level Order Traversal</h3>
                <p>Trees · BFS</p>
                </div>

                <span className="difficulty medium">
                Medium
                </span>

                <button className="solve-btn">
                Solve
                <ArrowRight size={17} />
                </button>

            </div>

            </div>

        </section>

        </main>
    </div>
  );
}

export default DSAPractice;