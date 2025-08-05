import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
// import React from 'react';

vi.mock('./Login', () => ({
  Login: () => <div data-testid="login">Login</div>,
}));

vi.mock('./LocalInfo', () => ({
  LocalInfo: () => <div data-testid="local-info">Local Info</div>,
}));

beforeEach(() => {
  vi.resetModules(); // <-- This is critical!
});

describe('Header', () => {
  it('renders LocalInfo when notification is closed', async () => {
    vi.doMock('../../contexts/NotificationContext', () => ({
      useNotification: () => ({
        notification: {
          open: false,
          type: 'info',
          message: 'Closed message',
        },
      }),
    }));

    const { Header } = await import('./_Header');
    render(<Header />);
    expect(screen.getByTestId('local-info')).toBeInTheDocument();
    expect(screen.getByTestId('login')).toBeInTheDocument();
  });

  it('renders Alert when notification is open', async () => {
    vi.doMock('../../contexts/NotificationContext', () => ({
      useNotification: () => ({
        notification: {
          open: true,
          type: 'error',
          message: 'Something went wrong!',
        },
      }),
    }));

    const { Header } = await import('./_Header');
    render(<Header />);
    // Prefer role-based query for alerts
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong!');
    expect(screen.getByTestId('login')).toBeInTheDocument();
    // Ensure LocalInfo is NOT rendered
    expect(screen.queryByTestId('local-info')).not.toBeInTheDocument();
  });
});
