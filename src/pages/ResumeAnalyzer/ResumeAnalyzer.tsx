import "./ResumeAnalyzer.css";
import Sidebar from "../../components/dashboard_1/Sidebar";
import {
  Upload,
  FileText,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

function ResumeAnalyzer() {
  return (
    <div className="resume-analyzer-layout">

      <Sidebar />
        <main className="resume-analyzer-page">

        {/* Header */}

        <div className="resume-header">
            <h1>Resume Analyzer</h1>

            <p>
            Get instant feedback on how your resume reads to recruiters and ATS
            systems.
            </p>
        </div>


        {/* Upload Area */}

        <section className="resume-upload">

            <div className="upload-icon">
            <Upload size={28} />
            </div>

            <h2>Drop your resume here or browse</h2>

            <p>Supports PDF, DOCX up to 5 MB</p>

            <button className="choose-file-btn">
            <Upload size={18} />
            Choose File
            </button>

        </section>


        {/* Uploaded Resume */}

        <section className="uploaded-resume">

            <div className="resume-file">

            <div className="file-icon">
                <FileText size={22} />
            </div>

            <div>
                <h3>Hely_Shah_Resume.pdf</h3>
                <p>Analyzed just now</p>
            </div>

            </div>

            <button className="reanalyze-btn">
            <RefreshCw size={18} />
            Re-analyze
            </button>

        </section>


        {/* Analysis Overview */}

        <div className="analysis-overview">

            {/* Overall Score */}

            <section className="score-card">

            <div className="score-circle">
                <span>81</span>
            </div>

            <p>Overall match score</p>

            </section>


            {/* Metrics */}

            <div className="analysis-metrics">

            <div className="metric-card">

                <div className="metric-header">
                <span>ATS readability</span>
                <strong className="metric-green">92%</strong>
                </div>

                <div className="metric-bar">
                <span style={{ width: "92%" }}></span>
                </div>

            </div>


            <div className="metric-card">

                <div className="metric-header">
                <span>Keyword match</span>
                <strong className="metric-orange">68%</strong>
                </div>

                <div className="metric-bar keyword">
                <span style={{ width: "68%" }}></span>
                </div>

            </div>

            </div>

        </div>


        {/* Suggestions */}

        <section className="suggestions-card">

            <div className="suggestions-header">
            <h2>Suggestions</h2>
            </div>


            <div className="suggestion">

            <Lightbulb size={18} />

            <p>
                Add measurable impact to your Tipsons project bullets, for example
                lines saved or pages shipped.
            </p>

            </div>


            <div className="suggestion">

            <AlertTriangle size={18} />

            <p>
                Missing keywords for React roles:
                <strong> state management, REST API.</strong>
            </p>

            </div>


            <div className="suggestion">

            <CheckCircle2 size={18} />

            <p>
                Strong action verbs used consistently across experience section.
            </p>

            </div>

        </section>

        </main>
    </div>
  );
}

export default ResumeAnalyzer;