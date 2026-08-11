import "./DSAprac.css";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
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

interface Recommendation {
  title: string;
  detail: string;
  difficulty: string;
  completed: boolean;
}

const topics: Topic[] = [
  { name: "Arrays", icon: "A",solved: 5, total: 10 },
  { name: "Strings", icon: "S", solved: 5,total: 10 },
  { name: "Linked Lists", icon: "L",solved: 5, total: 10 },
  { name: "Stack & Queue", icon: "S",solved: 5, total: 10 },
  { name: "Trees", icon: "T", solved: 5,total: 10 },
  { name: "Graphs", icon: "G",solved: 5,total: 10 },
];

function DSAPractice() {
    const navigate = useNavigate();
    //const [activeTopic, setActiveTopic] = useState<string | null>(null);
    const [difficulty, setDifficulty] = useState<string | null>(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [recLoading, setRecLoading] = useState(true);

    useEffect(() => {
        const loadRecommendations = async () => {
            setRecLoading(true);

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setRecLoading(false);
                return;
            }

            const { data: results, error } = await supabase
                .from("dsa_results")
                .select("topic, difficulty, recommendations, created_at")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (error || !results) {
                console.error(error);
                setRecLoading(false);
                return;
            }

            // Which topic+difficulty combos the user already has a result for
            const completedKeys = new Set(
                results.map(
                    (r: any) => `${r.topic.toLowerCase()}|${r.difficulty.toLowerCase()}`
                )
            );

            const difficultyFromText = (text: string): string => {
                const match = text.match(/easy|medium|hard/i);
                return match ? match[0].toLowerCase() : "easy";
            };

            // Flatten recommendations across all results, most recent first,
            // de-duped by title (first occurrence = most recent, since results
            // are already ordered by created_at desc)
            const seen = new Map<string, Recommendation>();

            for (const result of results) {
                const recs = (result.recommendations ?? []) as {
                    title: string;
                    detail: string;
                }[];

                for (const rec of recs) {
                    if (seen.has(rec.title)) continue;

                    const difficulty = difficultyFromText(rec.detail);
                    const key = `${rec.title.toLowerCase()}|${difficulty}`;

                    seen.set(rec.title, {
                        title: rec.title,
                        detail: rec.detail,
                        difficulty,
                        completed: completedKeys.has(key),
                    });
                }
            }

            setRecommendations(Array.from(seen.values()).slice(0, 4));
            setRecLoading(false);
        };

        loadRecommendations();
    }, []);

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

           {/*<div className="dsa-progress">
            <span>Your Progress</span>
            <strong>24 / 50 solved</strong>
            </div> */}
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

                {recLoading && <p>Loading recommendations...</p>}

                {!recLoading && recommendations.length === 0 && (
                    <p>Complete a practice session to see recommendations here.</p>
                )}

                {!recLoading &&
                    recommendations.map((rec) => (
                        <div className="problem-row" key={rec.title}>

                            <div
                                className={`problem-status ${
                                    rec.completed ? "completed" : ""
                                }`}
                            >
                                {rec.completed ? (
                                    <CheckCircle2 size={20} />
                                ) : (
                                    <Circle size={20} />
                                )}
                            </div>

                            <div className="problem-info">
                                <h3>{rec.title}</h3>
                                <p>{rec.detail}</p>
                            </div>

                            <span className={`difficulty ${rec.difficulty}`}>
                                {rec.difficulty.charAt(0).toUpperCase() +
                                    rec.difficulty.slice(1)}
                            </span>

                            <button
                                className="solve-btn"
                                onClick={() =>
                                    navigate(
                                        `/dsa-question/${encodeURIComponent(
                                            rec.title
                                        )}/${rec.difficulty}`
                                    )
                                }
                            >
                                {rec.completed ? "Review" : "Solve"}
                                <ArrowRight size={17} />
                            </button>

                        </div>
                    ))}

            </div>

        </section>

        </main>
    </div>
  );
}

export default DSAPractice;