import React, {useState} from 'react'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = (ev) => {
      ev.preventDefault()
      try{
        const user = await loginService.login({username, password})
        setUser(user)
        setUsername('')
        setPassword('')
      }
      catch(exception){
        // show error message
      }
  }
  const handleUsername = (ev) => {
      setUsername(ev.target.value)
  }
  const handlePassword = (ev) => {
      setPassword(ev.target.value)
  }
  return (
  <div>
      <form onSubmit={handleLogin}>
        <div> Username <input type="text" value={username} name="Username" onChange={handleUsername}/></div>
        <div> Password <input type="password" value={password} name="Password" onChange={handlePassword}/></div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default App;
