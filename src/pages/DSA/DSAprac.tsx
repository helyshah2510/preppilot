import "./DSAprac.css";
import Sidebar from "../../components/dashboard_1/Sidebar";
import {
  Search,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Circle,
} from "lucide-react";

function DSAPractice() {
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

            <button className="difficulty-filter">
            All Difficulties
            <ChevronDown size={18} />
            </button>

        </div>


        {/* Topics */}

        <section className="dsa-section">

            <div className="section-title">
            <h2>Topics</h2>
            <p>Choose a topic to practice.</p>
            </div>


            <div className="topic-grid">

            <div className="topic-card">
                <div className="topic-top">
                <div className="topic-icon arrays">A</div>

                <span>12 / 20</span>
                </div>

                <h3>Arrays</h3>

                <p>20 problems</p>

                <div className="topic-progress">
                <span style={{ width: "60%" }}></span>
                </div>
            </div>


            <div className="topic-card">
                <div className="topic-top">
                <div className="topic-icon strings">S</div>

                <span>8 / 15</span>
                </div>

                <h3>Strings</h3>

                <p>15 problems</p>

                <div className="topic-progress">
                <span style={{ width: "53%" }}></span>
                </div>
            </div>


            <div className="topic-card">
                <div className="topic-top">
                <div className="topic-icon linked-list">L</div>

                <span>4 / 12</span>
                </div>

                <h3>Linked Lists</h3>

                <p>12 problems</p>

                <div className="topic-progress">
                <span style={{ width: "33%" }}></span>
                </div>
            </div>


            <div className="topic-card">
                <div className="topic-top">
                <div className="topic-icon stack">S</div>

                <span>6 / 10</span>
                </div>

                <h3>Stack & Queue</h3>

                <p>10 problems</p>

                <div className="topic-progress">
                <span style={{ width: "60%" }}></span>
                </div>
            </div>


            <div className="topic-card">
                <div className="topic-top">
                <div className="topic-icon trees">T</div>

                <span>5 / 15</span>
                </div>

                <h3>Trees</h3>

                <p>15 problems</p>

                <div className="topic-progress">
                <span style={{ width: "33%" }}></span>
                </div>
            </div>


            <div className="topic-card">
                <div className="topic-top">
                <div className="topic-icon graphs">G</div>

                <span>3 / 12</span>
                </div>

                <h3>Graphs</h3>

                <p>12 problems</p>

                <div className="topic-progress">
                <span style={{ width: "25%" }}></span>
                </div>
            </div>

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