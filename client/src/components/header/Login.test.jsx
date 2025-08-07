import { render, screen } from '@testing-library/react'
import { describe, it, vi, beforeEach, expect } from 'vitest'
// import userEvent from '@testing-library/user-event'
import { Login } from './Login'

//// Mock external components
// vi.mock('../Icon', () => ({
//     GetIconButton: ({ title, onClick, iconName, ...props}) => (
//         <button data-testid={`icon-button-${iconName}`} onClick={onClick} {...props}>
//             {title}
//         </button>
//     )
// }))

vi.mock('../forms/_TechForm', () => ({
  TechForm: () => <div data-testid="tech-form">TechForm</div>,
}))

vi.mock('../forms/_ProjectForm', () => ({
  ProjectForm: () => <div data-testid="project-form">ProjectForm</div>,
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('<Login />', () => {
    it('User not logged in', () => {
        vi.mock('../../hooks/useLogin', () => ({
            useLogin: () => ({
                user: null,
                loading: false,
                showLogin: false,
                setShowLogin: vi.fn(),
                username: '',
                password: '',
                setUsername: vi.fn(),
                setPassword: vi.fn(),
                handleLogin: vi.fn(),
                handleLogout: vi.fn()
            }),
        }))

        render(<Login />)

    })
})