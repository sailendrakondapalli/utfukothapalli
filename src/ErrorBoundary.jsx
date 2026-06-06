import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          padding: '40px', fontFamily: 'monospace',
          background: '#1a0000', color: '#ff6666',
          minHeight: '100vh', whiteSpace: 'pre-wrap'
        }}>
          <h2 style={{ color: '#ffd700', marginBottom: '16px' }}>⚠ App Error</h2>
          <div style={{ color: 'white', marginBottom: '8px', fontSize: '1.1rem' }}>
            {this.state.error?.message}
          </div>
          <div style={{ color: '#aaa', fontSize: '0.85rem' }}>
            {this.state.error?.stack}
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '24px', padding: '10px 24px',
              background: '#cc0000', color: 'white',
              border: 'none', borderRadius: '8px',
              fontSize: '1rem', cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
