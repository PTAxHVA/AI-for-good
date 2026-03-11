import { useState } from "react"
import loginService from "../services/login";
import '../styles/Login.css'

const Login = ({setUser, setAuthMode}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    console.log(`Logging with ${username} ${password}`)

    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 

      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      alert("Wrong credentials")
    }
  }

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          placeholder="Username"  
        />
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
        />
        <p className='mode-question'>
          Bạn chưa có tài khoản?{" "}
          <button type='button' className={'change-mode-button'} onClick={() => setAuthMode('register')}>Đăng ký</button>
        </p>
        <button type="submit" className="login-button">Đăng nhập</button>
      </form>
    </div>
  )
}

export default Login