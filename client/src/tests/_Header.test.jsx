import { render, screen } from '@testing-library/react'
import { describe, it, vi, beforeEach, expect } from 'vitest'

vi.mock('components/header/Login', () => ({
  Login: () => <div data-testid="login">Login</div>,
}))

vi.mock('components/header/LocalInfo', () => ({
  LocalInfo: () => <div data-testid="local-info">Local Info</div>,
}))

beforeEach(() => {
  vi.resetModules()
})

describe('Header', () => {
  it('renders LocalInfo when notification is closed', async () => {
    vi.doMock('contexts/NotificationContext', () => ({
      useNotification: () => ({
        notification: {
          open: false,
          type: 'info',
          message: 'Closed message',
        },
      }),
    }))

    const { Header } = await import('components/header/_Header')
    render(<Header />)
    expect(screen.getByTestId('local-info')).toBeInTheDocument()
    expect(screen.getByTestId('login')).toBeInTheDocument()
  })

  it('renders Alert when notification is open', async () => {
    vi.doMock('contexts/NotificationContext', () => ({
      useNotification: () => ({
        notification: {
          open: true,
          type: 'error',
          message: 'Something went wrong!',
        },
      }),
    }))

    const { Header } = await import('components/header/_Header')
    render(<Header />)
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong!')
    expect(screen.getByTestId('login')).toBeInTheDocument()
    expect(screen.queryByTestId('local-info')).not.toBeInTheDocument()
  })
})