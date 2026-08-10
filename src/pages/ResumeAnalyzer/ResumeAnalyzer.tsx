import "./ResumeAnalyzer.css";
import { supabase } from "../../lib/supabase";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import { useRef,useState } from "react";
import Sidebar from "../../components/dashboard_1/Sidebar";
import {
  Upload,
  FileText,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

function ResumeAnalyzer() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [error, setError] = useState("");
    const [analysis, setAnalysis] = useState<any>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleChooseFile = () => {
    fileInputRef.current?.click();
    };

    const extractResumeText = async (file: File) => {
        if (file.type === "application/pdf") {
            const arrayBuffer = await file.arrayBuffer();

            const pdf = await pdfjsLib.getDocument({
            data: arrayBuffer,
            }).promise;

            let fullText = "";

            for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
                const page = await pdf.getPage(pageNumber);

                const textContent = await page.getTextContent();

                const pageText = textContent.items
                .map((item) => {
                    if ("str" in item) {
                        return item.str;
                    }

                    return "";
                })
                .join(" ");

                fullText += pageText + "\n";
            }

            return fullText;
        }

        if (
            file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            const arrayBuffer = await file.arrayBuffer();

            const result = await mammoth.extractRawText({
                arrayBuffer,
            });

            return result.value;
        }

        throw new Error("Unsupported file type.");
    };

    const handleFileChange = async(
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setError("");

        // Check file type
        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedTypes.includes(file.type)) {
            setError("Please upload a PDF or DOCX file.");
            return;
        }

        // Check file size: 5 MB
        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            setError("File size must be less than 5 MB.");
            return;
        }

        setSelectedFile(file);

        console.log("Selected file:", file);
        try {
            const text = await extractResumeText(file);

            console.log("===== RESUME TEXT =====");
            console.log(text);
            console.log("=======================");
            setIsAnalyzing(true);

            const { data, error } = await supabase.functions.invoke(
                "analyze-resume",
                {
                    body: {
                        resumeText: text,
                    },
                }
            );

            setIsAnalyzing(false);

            if (error) {
                console.error("Resume analysis error:", error);
                setError("Could not analyze this resume. Please try again.");
                return;
            }

            console.log("AI ANALYSIS:", data);

            setAnalysis(data.analysis);
        } catch (error) {
            console.error("Error extracting resume:", error);
            setIsAnalyzing(false);

            setError(
                "Could not read this resume. Please try another file."
            );
        }
    };
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
            <button
            className="choose-file-btn"
            onClick={handleChooseFile}
            >
            <Upload size={18} />
            Choose File
            </button>

            <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            style={{ display: "none" }}
            />
            {error && (
                <p
                    style={{
                    color: "#f87171",
                    marginTop: "15px",
                    marginBottom: 0,
                    }}
                >
                    {error}
                </p>
            )}

        </section>


        {/* Uploaded Resume */}

        <section className="uploaded-resume">

            <div className="resume-file">

            <div className="file-icon">
                <FileText size={22} />
            </div>

            <div>
                <h3>{selectedFile
                    ? selectedFile.name
                    : "Hely_Shah_Resume.pdf"}
                </h3>
               <p>
                    {selectedFile
                        ? "Ready to analyze"
                        : "Analyzed just now"}
                </p>
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
                <span>{analysis?.overallScore ?? 0}</span>
            </div>

            <p>Overall match score</p>

            </section>


            {/* Metrics */}

            <div className="analysis-metrics">

            <div className="metric-card">

                <div className="metric-header">
                <span>ATS readability</span>
                <strong className="metric-green">
                    {analysis?.atsReadability ?? 0}%
                </strong>
                </div>

                <div className="metric-bar">
                    <span
                        style={{
                            width: `${analysis?.atsReadability ?? 0}%`,
                        }}
                    ></span>
                </div>

            </div>


            <div className="metric-card">

                <div className="metric-header">
                <span>Keyword match</span>
                <strong className="metric-orange">
                    {analysis?.keywordMatch ?? 0}%
                </strong>
                </div>

                <div className="metric-bar keyword">
                    <span
                    style={{
                        width: `${analysis?.keywordMatch ?? 0}%`,
                    }}
                    ></span>
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