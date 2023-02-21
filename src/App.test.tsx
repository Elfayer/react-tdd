import { render, screen } from '@testing-library/react'
import App from './App'

test('renders login form', () => {
  render(<App />)

  const usernameInput = screen.getByLabelText(/username/i)
  const passwordInput = screen.getByLabelText(/password/i)

  expect(usernameInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()
})
