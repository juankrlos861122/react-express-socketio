import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("/");

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("messageFrontend", receivedMessage);
    return () => {
      socket.off("messageFrontend", receivedMessage);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };

    setMessages([...messages, newMessage]);
    socket.emit("messageBackend", message);
  };

  const receivedMessage = (message) => {
    setMessages((state) => [...state, message]);
  };

  return (
    <div className=" h-screen w-screen text-white">
      <ul className=" bg-zinc-700 h-full">
        {messages.map((msj, index) => (
          <li key={index}>
            {msj.from}:{msj.body}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="fixed bottom-0 w-screen">
        <input
          className="w-[90%]"
          type="text"
          placeholder="Write the message ..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="w-[10%]">Send</button>
      </form>
    </div>
  );
};

export default App;
