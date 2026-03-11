import Login from "../components/Login";
import Register from "../components/Register";
import "../styles/LoginPage.css";
import logo from "../images/logo.png";
import slogan from "../images/slogan.png";

const LoginPage = ({ authMode, setAuthMode, setUser }) => {
  return (
    <div className="auth-page">
      <div className="navbar-wrapper">
        <div className="navbar">
          <div className="nav-left">
            <button className="nav-btn">Home</button>
            <button className="nav-btn">About</button>
          </div>

          <div className="nav-right">
            <button className="nav-btn" onClick={() => setAuthMode('login')}>Log in</button>
            <button className="nav-btn">Contact us</button>
          </div>
        </div>
      </div>
      <div className='auth-section'>
        <div className="auth-left">
          <img className="logo-ai" alt="logo ai hoc su" src={logo}></img>
          <img className="slogan-img" alt="slogan image" src={slogan}></img>
        </div>
        <div className="auth-card">
          {/* Tabs */}
          <div className="auth-tabs">
            <div
              className={`auth-tab   ${authMode === "login" ? "active" : ""}`}
              onClick={() => setAuthMode("login")}>
              Đăng nhập
            </div>

            <div
              className={`auth-tab ${authMode === "register" ? "active" : ""}`}
              onClick={() => setAuthMode("register")} >
              Đăng ký
            </div>
          </div>

          {/* Nội dung */}
          <div className="auth-content">
            {authMode === "login" ? <Login setAuthMode={setAuthMode} setUser={setUser} /> : <Register setAuthMode={setAuthMode} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
