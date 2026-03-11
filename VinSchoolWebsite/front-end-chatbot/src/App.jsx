import ChatBot from "./components/ChatBot";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";

function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(user);
    }
  }, []);

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  if (user) {
    return <ChatBot handleLogOut={handleLogOut} token={user.token} />;
  }

  return (
    <LoginPage authMode={authMode} setAuthMode={setAuthMode} setUser={setUser}/>
  );
}

export default App;
