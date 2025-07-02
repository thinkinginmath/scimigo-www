import React from 'react';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
  loading: boolean;
  error: string | null;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLogin, loading, error }) => {
  if (!open) return null;

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-container">
        <div className="login-modal-header">
          <div className="login-modal-brand">
            <img
              src={chrome.runtime.getURL('public/icons/icon48.png')}
              alt="SicMigo AI Tutor"
              className="login-modal-icon"
            />
            <div>
              <h2 className="login-modal-title">SicMigo AI Tutor</h2>
              <p className="login-modal-subtitle">Sign In Required</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="login-modal-close"
          >
            ×
          </button>
        </div>

        <div className="login-modal-content">
          <p className="login-modal-description">
            You need to sign in to ask questions. Creating an account is free and only takes a few seconds.
          </p>
          {error && <div className="login-modal-error">{error}</div>}
          <div className="login-modal-buttons">
            <button
              onClick={onLogin}
              disabled={loading}
              className="login-modal-button"
            >
              {loading ? 'Redirecting...' : 'Sign In / Sign Up'}
            </button>
            <p className="login-modal-disclaimer">
              Join SicMigo AI Tutor with secure Auth0 authentication. Your account will be created automatically if you don't have one.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginModal;
