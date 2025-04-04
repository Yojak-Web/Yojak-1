import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { RobotIcon, SendIcon } from "./Icons";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/chatbot", {
        message: input,
      });

      if (response.data && response.data.reply) {
        setMessages([...newMessages, { sender: "bot", text: response.data.reply }]);
      } else {
        setMessages([...newMessages, { sender: "bot", text: "No response from server." }]);
      }
    } catch (error) {
      console.error("Chatbot API Error:", error.response || error);
      setMessages([...newMessages, { sender: "bot", text: "Error connecting to chatbot server." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Govt. Scheme Chatbot</h3>
          <RobotIcon className="w-8 h-8 text-blue-400 animate-bounce" />
        </div>

        <div className="chat-box h-64 overflow-y-auto space-y-3 p-3 bg-gray-700 rounded-lg">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ x: msg.sender === "user" ? 50 : -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white self-end ml-auto"
                  : "bg-gray-600 text-white self-start"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 rounded-lg bg-gray-600 text-white"
            >
              Typing...
            </motion.div>
          )}
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about schemes..."
            className="w-full p-2 rounded-lg bg-gray-700 text-white outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={sendMessage}
            disabled={!input.trim()}
            className={`p-2 rounded-lg ${
              input.trim() ? "bg-blue-500 text-white" : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            <SendIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Chatbot;
