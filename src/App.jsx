import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.scss";
import ReactMarkdown from "react-markdown";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Create session on mount
  useEffect(() => {
    createNewSession();
  }, []);

  const createNewSession = async () => {
    try {
      const response = await axios.post(`${API_URL}/sessions`);
      setSessionId(response.data.sessionId);
      setMessages([
        {
          role: "assistant",
          content:
            "Hello! I'm your news assistant. Ask me about the latest news from around the world!",
          timestamp: Date.now(),
        },
      ]);
      setError(null);
    } catch (err) {
      console.error("Failed to create session:", err);
      setError(
        "Failed to connect to server. Please make sure the backend is running."
      );
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !sessionId || loading) return;

    const userMessage = {
      role: "user",
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/chat`, {
        message: userMessage.content,
        sessionId,
      });

      const assistantMessage = {
        role: "assistant",
        content: response.data.response,
        sources: response.data.sources,
        timestamp: response.data.timestamp,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Failed to send message:", err);
      const errorMessage = {
        role: "assistant",
        content:
          "Sorry, I encountered an error processing your request. Please try again.",
        error: true,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setError(
        err.response?.data?.error || "Failed to get response from server"
      );
    } finally {
      setLoading(false);
    }
  };

  const clearSession = async () => {
    if (!sessionId) return;

    try {
      await axios.delete(`${API_URL}/sessions/${sessionId}`);
      createNewSession();
    } catch (err) {
      console.error("Failed to clear session:", err);
      // Still create new session even if delete fails
      createNewSession();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>📰 News Chatbot</h1>
          <p className="subtitle">Powered by RAG & Gemini AI</p>
        </div>
        <button
          className="reset-btn"
          onClick={clearSession}
          disabled={loading}
          title="Start new conversation"
        >
          🔄 Reset
        </button>
      </header>

      {error && <div className="error-banner">⚠️ {error}</div>}

      <main className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.role} ${msg.error ? "error" : ""}`}
            >
              <div className="message-header">
                <span className="role">
                  {msg.role === "user" ? "👤 You" : "🤖 Assistant"}
                </span>
                <span className="time">{formatTime(msg.timestamp)}</span>
              </div>
              {/* <div className="message-content">{msg.content}</div> */}
              <div className="message-content">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
              {msg.sources && msg.sources.length > 0 && (
                <div className="sources">
                  <p className="sources-title">📚 Sources:</p>
                  <ul>
                    {msg.sources.map((source, idx) => (
                      <li key={idx}>
                        <a
                          href={source.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {source.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="message assistant loading">
              <div className="message-header">
                <span className="role">🤖 Assistant</span>
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form className="input-form" onSubmit={sendMessage}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the latest news..."
            disabled={loading || !sessionId}
            className="message-input"
          />
          <button
            type="submit"
            disabled={loading || !input.trim() || !sessionId}
            className="send-btn"
          >
            {loading ? "⏳" : "📤"} Send
          </button>
        </form>
      </main>

      <footer className="footer">
        <p>
          Session ID:{" "}
          {sessionId ? sessionId.slice(0, 8) + "..." : "Connecting..."}
        </p>
        <p>Built with React + Express + Redis + Gemini</p>
      </footer>
    </div>
  );
}

export default App;
