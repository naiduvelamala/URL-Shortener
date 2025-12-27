import { useState } from "react";
import "./App.css";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleShorten = async () => {
    setError("");
    setShortUrl("");

    if (!longUrl) {
      setError("Please enter a URL");
      return;
    }

    try {
      const res = await fetch("http://localhost:8001/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: longUrl }),
      });

      const data = await res.json();

      if (data.shortUrl) {
        setShortUrl(data.shortUrl); // ✅ this triggers display
      }
    } catch {
      setError("Backend not running");
    }
  };

  return (
    <div className="app">
      <h1>🔗 URL Shortener</h1>

      <div className="card">
        {/* INPUT */}
        <input
          type="text"
          placeholder="Paste your long URL here"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />

        {/* BUTTON */}
        <button onClick={handleShorten}>Shorten URL</button>

        {/* ERROR */}
        {error && <p className="error">{error}</p>}

        {/* ✅ RESULT AT BOTTOM */}
        {shortUrl && (
          <div className="result-box">
            <p>Short URL</p>
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
