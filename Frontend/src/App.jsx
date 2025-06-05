import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Editor from "react-simple-code-editor";
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum() { return 1+1; }`);
  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    setError("");
    setReview("Analyzing your code...");

    try {
      const response = await axios.post("https://code-reviewer-x41h.onrender.com/ai/get-review", { code }); // Updated port
      setReview(response.data.review);
    } catch (err) {
      console.error("❌ Error fetching review:", err);
      setError("Failed to fetch review. Please check the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 12,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">
            {loading ? "Reviewing..." : "Review"}
          </div>
        </div>
        <div className="right">
          {error ? <p className="error">{error}</p> : <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>}
        </div>
      </main>
    </>
  );
}

export default App;
