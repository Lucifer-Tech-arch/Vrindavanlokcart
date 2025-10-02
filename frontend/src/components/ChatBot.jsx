import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, RotateCw } from "lucide-react";

// A simple star icon component to replace the one from react-icons
const StarsIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );


const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "model", text: "👋 Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Auto-scroll to the bottom of the chat on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // --- API Call Logic ---
    try {
        const apiKey = "AIzaSyB841OE0WVUPV5eozMCe4Wkop6Fncnsu7U"; // Per instructions, leave API key empty
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        // We are not including chat history for this simple implementation
        const payload = {
            contents: [{ parts: [{ text: input }] }],
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        const modelResponseText = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (modelResponseText) {
            setMessages((prev) => [...prev, { role: "model", text: modelResponseText }]);
        } else {
             setMessages((prev) => [...prev, { role: "model", text: "Sorry, I couldn't get a response. Please try again." }]);
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        setMessages((prev) => [...prev, { role: "model", text: "An error occurred while fetching the response. Please check the console." }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
        { role: "model", text: "👋 Hello! How can I help you today?" },
    ]);
    setInput("");
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-9 left-9 z-50">
      {/* Animated Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-80 sm:w-96 h-[500px] bg-white shadow-2xl rounded-xl flex flex-col border border-gray-200"
          >
            {/* Header */}
            <div className="flex justify-between items-center bg-[#c2410c] text-white px-4 py-3 rounded-t-xl shadow-md">
              <div className="flex items-center gap-3">
                 <button onClick={handleNewChat} className="hover:opacity-75 transition-opacity" title="New Chat">
                    <RotateCw size={18} />
                 </button>
                <h2 className="text-md font-semibold flex items-center gap-2">
                  <StarsIcon />
                  VLC AI Assistant
                </h2>
              </div>
              <button onClick={() => setOpen(false)} className="hover:opacity-75 transition-opacity">
                <X size={20} />
              </button>
            </div>

            {/* Chat content */}
            <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto text-sm space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <motion.p
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.2 }}
                    className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                      msg.role === "user"
                        ? "bg-[#c2410c] text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </motion.p>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-bl-none px-4 py-3">
                        <div className="flex items-center space-x-1">
                            <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c2410c] transition-shadow"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                className="ml-3 p-2 bg-[#c2410c] text-white rounded-full hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                disabled={isLoading}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button with bounce animation */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          className="w-16 h-16 bg-[#c2410c] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform"
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.9 }}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
        >
          <MessageCircle size={32} />
        </motion.button>
      )}
    </div>
  );
};

export default ChatBot;