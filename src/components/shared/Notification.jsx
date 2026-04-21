import { useEffect } from 'react';

const COLORS = {
  success: '#10b981',
  error: '#ef4444',
  info: '#3b82f6',
};

export default function Notification({ message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className="notification-toast" style={{ background: COLORS[type] || COLORS.info }}>
      <span>{message}</span>
      <button onClick={onClose} className="notification-close-btn">&times;</button>
    </div>
  );
}
