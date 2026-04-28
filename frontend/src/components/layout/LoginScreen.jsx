import React, { useState } from 'react';
import { Lock, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { loginUser } from '../../services/authApi';

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await loginUser(username, password);
      // Store token
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Trigger parent login callback
      if (onLogin) onLogin();
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-experience-v2">
      <div className="login-card-v2">
        {/* Logo */}
        <div className="avs-logo-box">AVS</div>

        {/* Titles */}
        <div className="login-brand-v2">AVS InSoTech</div>
        <div className="login-system-v2">Investment & Treasury System v2.0</div>

        {/* RBI Info Banner */}
        <div className="rbi-info-banner">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="rbi-tag-v2">RBI UCB</span>
            <span className="rbi-main-text">Master Circular Compliant — All Modules</span>
          </div>
          <div className="module-list-v2">
            G-Sec · SDL · T-Bills · FD · Bonds · Mutual Fund · Call Money · CP · CD | SLR/CRR | HTM·AFS·HFT
          </div>
        </div>

        {/* Error Message */}
        {error && (
            <div style={{ 
              background: '#fff5f5', 
              border: '1px solid #feb2b2', 
              color: '#c53030', 
              padding: '10px', 
              borderRadius: '6px', 
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              width: '100%'
            }}>
              <AlertCircle size={14} />
              {error}
            </div>
          )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className="v2-input-group">
            <label className="v2-label">User ID</label>
            <input 
              className="v2-input" 
              placeholder="Enter User ID" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div className="v2-input-group" style={{ marginBottom: '25px' }}>
            <label className="v2-label">Password</label>
            <input 
              className="v2-input" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            className="v2-submit-btn" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Authenticating...
              </>
            ) : (
              <>
                <Lock size={14} fill="#C8A000" color="#C8A000" /> &nbsp; Login to Treasury Portal
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="v2-footer">
          2FA Enabled · Role-Based Access · Complete Audit Trail
        </div>
      </div>
    </div>
  );
}
