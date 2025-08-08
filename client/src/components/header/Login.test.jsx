import { render, screen } from '@testing-library/react'
import { describe, it, vi, beforeEach, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Login } from './Login'
import { useLogin } from '../../hooks/useLogin'

vi.mock('../../hooks/useLogin', () => ({
    useLogin: vi.fn()
})) 

vi.mock('../../contexts/NotificationContext', () => ({
  useNotification: () => ({
    formNotification: {
      success: vi.fn(),
      error: vi.fn(),
    },
  }),
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('<Login />', () => {
  describe('when user is NOT logged in', () => {
    it('shows toggle button and hides login form initially', () => {
      useLogin.mockReturnValue({
        user: null,
        loading: false,
        showLogin: false,
        setShowLogin: vi.fn(),
      })

      render(<Login />)
      expect(screen.getByLabelText('show login form')).toBeInTheDocument()
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    })

    it('clicking toggle button calls setShowLogin(true)', async () => {
      const setShowLogin = vi.fn()
      const user = userEvent.setup()

      useLogin.mockReturnValue({
        user: null,
        loading: false,
        showLogin: false,
        setShowLogin,
      })

      render(<Login />)

      const toggleButton = screen.getByLabelText('show login form')
      await user.click(toggleButton)

      expect(setShowLogin).toHaveBeenCalledWith(true)
      expect(setShowLogin.mock.calls).toHaveLength(1)
    })

    it('shows login form when showLogin is true', () => {
      useLogin.mockReturnValue({
        user: null,
        loading: false,
        showLogin: true,
      })

      render(<Login />)
      expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
    })
  })

  describe('when user IS logged in', () => {
    it('shows tech/project AddDialog buttons and logout icon', () => {
      useLogin.mockReturnValue({
        user: { name: 'Test User' },
        loading: false,
        handleLogout: vi.fn(),
      })

      render(<Login />)

      // You can check for button existence by role, label, or test id.
      expect(screen.getByLabelText('click to log out')).toBeInTheDocument()
      expect(screen.getByLabelText('click to add new tech')).toBeInTheDocument()
      expect(screen.getByLabelText('click to add new project')).toBeInTheDocument()
    })
  })
})
