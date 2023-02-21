import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { FakeSessionGateway } from './Gateways/FakeSessionGateway'
import { FakeGatewaysProvider, GatewaysContextData } from './GatewaysProvider'

interface RenderAppParams {
  gateways?: Partial<GatewaysContextData>
}

function renderApp(params?: RenderAppParams) {
  render(
    <FakeGatewaysProvider value={params?.gateways}>
      <App />
    </FakeGatewaysProvider>
  )
}

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
  renderApp()
  expect(getUsernameInput()).toBeInTheDocument()
  expect(getPasswordInput()).toBeInTheDocument()
})

test('submit button disabled if form is empty', () => {
  renderApp()
  expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled()
})

test('submit button enabled if form is filled', async () => {
  const user = userEvent.setup()
  renderApp()

  await user.type(getUsernameInput(), 'John')
  await user.type(getPasswordInput(), 'admin')

  expect(getSubmitButton()).toBeEnabled()
})

test('calls api on submit button click', async () => {
  const user = userEvent.setup()
  const sessionGateway = new FakeSessionGateway()
  sessionGateway.login = vi.fn()
  renderApp({ gateways: { sessionGateway } })

  await user.type(getUsernameInput(), 'John')
  await user.type(getPasswordInput(), 'admin')
  await user.click(getSubmitButton())

  expect(sessionGateway.login).toBeCalled()
})
