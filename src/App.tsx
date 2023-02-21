import { useState } from 'react'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const isFormValid = !!username && !!password

  return (
    <div className="App">
      <label>
        Username:
        <input value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </label>
      <button disabled={!isFormValid}>Submit</button>
    </div>
  )
}

export default App
