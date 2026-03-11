import { useState, useEffect, useRef } from "react";
import chatBotGif from "../../assets/robot.webp";
import chatService from '../services/chat';
import '../styles/ChatBot.css';

const RobotButton = (props) => {
  return (
    <button onClick={props.onClick} className="robot-button">
      <img src={chatBotGif} alt={'Robot icon'} className="robot-gif"/>
    </button>
  )
}

const ChatBox = ({token, handleLogOut}) => {
  const [isOpen, setOpen] = useState(false)
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setTyping] = useState(false)
  const [hasIntroduces, setIntro] = useState(false)

  const chatEndRef = useRef(null)

  const sendMessage = async () => {
    if (!message) return;

    const newChat = [...chat, { role: "user", text: message }];
    setChat(newChat);
    try {
      setTyping(true)

      const responseData = await chatService.sendMessage(message, token)

      const botMessage = {
          role: "bot",
          text: responseData.reply,
      };
      
      setChat(prev => [...prev, botMessage])

      setMessage("")
    } finally {
      setTyping(false)
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isTyping]);

  useEffect(() => {
    if (isOpen === true && !hasIntroduces) {
      setTyping(true);
      setTimeout(() => {
        setChat([
          {
            role: 'bot',
            text: 'Hello, I am a historical assistant. Can I help you?'
          }
        ])
        setTyping(false)
        setIntro(true)
      }, 1000)
    }
  }, [isOpen, hasIntroduces]);
  
  const handleRobotButton = () => {
    setOpen(!isOpen)
  }

  const handleInput = (event) => {
    setMessage(event.target.value)
  }

  return (
    <div className="chatbot">
      <RobotButton onClick={()=>handleRobotButton()}/>
      <button onClick={handleLogOut} className="logout-btn">Logout</button>
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            Historical Assistor
            <span className="close-button" onClick={handleRobotButton}>x</span>
          </div>
          <div className="chat-message">
            {chat.map((msg, index) => (
              <div key={index} className={msg.role === 'user' ? 'user' : 'bot'}>
                <p>{msg.text}</p>
              </div>
            ))}

            {isTyping && (
              <div className="bot typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}

            <div ref={chatEndRef}/>
          </div>

          <div className={"chat-input-wrapper"}>
            <input
              value={message}
              onChange={handleInput}
              placeholder="Type something..."
            />
            <button onClick={sendMessage}>Gửi</button>
          </div>

        </div>
      )}
    </div>
  );
};

export default ChatBox;