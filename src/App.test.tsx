import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

function getUsernameInput(): HTMLInputElement {
  return screen.getByLabelText(/username/i)
}

function getPasswordInput(): HTMLInputElement {
  return screen.getByLabelText(/password/i)
}

function getSubmitButton(): HTMLButtonElement {
  return screen.getByRole('button', { name: /submit/i })
}

test('renders login form', () => {
  render(<App />)
  expect(getUsernameInput()).toBeInTheDocument()
  expect(getPasswordInput()).toBeInTheDocument()
})

test('submit button disabled if form is empty', () => {
  render(<App />)
  expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled()
})

test('submit button enabled if form is filled', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.type(getUsernameInput(), 'John')
  await user.type(getPasswordInput(), 'admin')

  expect(getSubmitButton()).toBeEnabled()
})
