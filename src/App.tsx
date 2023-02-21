import { useState } from 'react'
import { useGateways } from './GatewaysProvider'

function App() {
  const { sessionGateway } = useGateways()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const isFormValid = !!username && !!password

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    sessionGateway.login(username, password)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default App
