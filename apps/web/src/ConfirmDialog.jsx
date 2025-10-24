import './ConfirmDialog.css'

export default function ConfirmDialog({ title, message, prerequisites, onConfirm, onCancel }) {
  if (!title) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel()
    }
  }

  return (
    <div className="confirm-backdrop" onClick={handleBackdropClick}>
      <div className="confirm-dialog">
        <div className="confirm-header">
          <h3>{title}</h3>
        </div>
        
        <div className="confirm-body">
          {message && <p className="confirm-message">{message}</p>}
          
          {prerequisites && prerequisites.length > 0 && (
            <div className="confirm-prerequisites">
              <p className="prereq-title">⚠️ This module requires:</p>
              <ul className="prereq-list">
                {prerequisites.map((prereq) => (
                  <li key={prereq.code}>
                    <strong>{prereq.code}</strong> - {prereq.title}
                  </li>
                ))}
              </ul>
              <p className="prereq-question">
                Have you already completed or are you planning to take these modules?
              </p>
            </div>
          )}
        </div>
        
        <div className="confirm-footer">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            Yes, Add Module
          </button>
        </div>
      </div>
    </div>
  )
}
