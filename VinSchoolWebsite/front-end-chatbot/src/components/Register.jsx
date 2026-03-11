import {useState} from 'react'
import registerService from '../services/register'
import '../styles/Register.css'

const Register = ({setAuthMode}) => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    const handleRegister = async (event) => {
        event.preventDefault()

        try {
            await registerService.register({username, name, password})
            
            setAuthMode('login')
            setPassword('')
            setUsername('')
        }
        catch (error) {
            console.log(error.response.data.error)
            setErrorMessage(error.response.data.error)

            setTimeout(() => {
                setErrorMessage('')
            }, 5000)
        }
    }

    return (
        <div className={'register-container'}>
            <form className='register-card' onSubmit={handleRegister}>
                <input 
                    value={username}
                    onChange={({target}) => setUsername(target.value)}
                    placeholder='Username'
                />
                <input
                    value={name}
                    onChange={({target}) => setName(target.value)}
                    placeholder='Name'
                />
                <input 
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                    placeholder='Your password'
                />
                <p className='mode-question'>
                  Đã có tài khoản?{" "}
                  <button type='button' className='change-mode-button' onClick={() => setAuthMode('login')}>Đăng nhập</button>
                </p>
                {errorMessage && <div className='error'>{errorMessage}</div>}
                <button type='submit' className='sign-up-button'>Đăng ký</button>
            </form>
        </div>
    )
}

export default Register