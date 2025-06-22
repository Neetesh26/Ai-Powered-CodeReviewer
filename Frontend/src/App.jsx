import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState(`const hello = "Hello World"`);
  const [review, setReview] = useState();


  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function reviewCode() {
     try {
      const response = await axios.post("http://localhost:3000/ai/get-response", { code });
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview({ response: "Failed to fetch review." });
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
              highlight={(code) =>
                Prism.highlight(code, Prism.languages.javascript, "javascript")
              }
              padding={15}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                border: "none",
                borderRadius: "0.4rem",
                outline: "none",
                lineHeight: "1.5",
                // backgroundColor: '#282c34',
                color: "#abb2bf",
              }}
            />
          </div>
          <div className="review" onClick={reviewCode}>
            Review
          </div>
        </div>

        <div className="right">
           {review ? review.response || "Invalid response" : ""}
        </div>
      </main>
    </>
  );
}

export default App;
