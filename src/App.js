import "./App.css";
import React, { useEffect, useState } from "react";
import { marked } from "marked";
import DocsItem from "./components/DocsItem";

const App = () => {
  const [code, setCode] = useState("## Hello");
  const [compiled, setCompiled] = useState('<h2 id="hello">Hello</h2>');
  const [docsData, setDocsData] = useState([]);

  const [isMarkdownOpen, setIsMarkdownOpen] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  const openMD = () => {
    setIsMarkdownOpen(true);
    setIsPreviewOpen(false);
    setIsDocsOpen(false);
  };

  const openPreview = () => {
    setIsMarkdownOpen(false);
    setIsPreviewOpen(true);
    setIsDocsOpen(false);
  };

  const openDocs = () => {
    setIsMarkdownOpen(false);
    setIsPreviewOpen(false);
    setIsDocsOpen(true);
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    setCompiled(marked.parse(e.target.value));
    localStorage.setItem("markDownCode", e.target.value);
  };

  useEffect(() => {
    const savedCode = localStorage.getItem("markDownCode");
    if (savedCode) {
      setCode(savedCode);
      setCompiled(marked.parse(savedCode));
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.markdownguide.org/api/v1/basic-syntax.json"
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        const parsedData = JSON.parse(data.contents);
        console.log(parsedData);
        setDocsData(parsedData.basic_syntax);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={openMD} className={`${isMarkdownOpen && "btn"}`}>
            MarkDown
          </button>
          <button onClick={openPreview} className={`${isPreviewOpen && "btn"}`}>
            Preview
          </button>
          <button onClick={openDocs} className={`${isDocsOpen && "btn"}`}>
            Docs
          </button>
        </div>
        {isMarkdownOpen && (
          <div>
            <textarea onChange={handleChange} value={code} />
          </div>
        )}
        {isPreviewOpen && (
          <div>
            <textarea value={compiled} />
          </div>
        )}
        {isDocsOpen && (
          <div className="docs">
            {docsData.map((item, index) => {
              return <DocsItem key={index} item={item} index={index} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
