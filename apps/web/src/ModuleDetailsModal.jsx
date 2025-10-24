import { useEffect, useState } from 'react'
import { api } from './api'
import './ModuleDetailsModal.css'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function ModuleDetailsModal({ moduleCode, onClose, onAdd }) {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!moduleCode) return

    const fetchDetails = async () => {
      try {
        setLoading(true)
        setError(null)
        const { data } = await api.get(`/modules/${moduleCode}/details`)
        setDetails(data)
      } catch (err) {
        console.error('Failed to load module details:', err)
        setError('Failed to load module details')
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [moduleCode])

  if (!moduleCode) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Group indexes by index_code
  const groupedIndexes = details?.indexes?.reduce((acc, idx) => {
    if (!acc[idx.index_code]) {
      acc[idx.index_code] = []
    }
    acc[idx.index_code].push(idx)
    return acc
  }, {}) || {}

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{moduleCode}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {loading && <div className="modal-loading">Loading module details...</div>}
          
          {error && <div className="modal-error">{error}</div>}
          
          {details && (
            <>
              <div className="detail-section">
                <h3>{details.title}</h3>
                <div className="detail-row">
                  <span className="detail-label">Academic Units:</span>
                  <span className="detail-value">{details.au} AU</span>
                </div>
                {details.school && (
                  <div className="detail-row">
                    <span className="detail-label">School:</span>
                    <span className="detail-value">{details.school}</span>
                  </div>
                )}
                {details.description && (
                  <div className="detail-row">
                    <span className="detail-label">Description:</span>
                    <span className="detail-value">{details.description}</span>
                  </div>
                )}
              </div>

              {details.prerequisites && details.prerequisites.length > 0 && (
                <div className="detail-section prerequisites-section">
                  <h3>⚠️ Prerequisites Required</h3>
                  <div className="prerequisites-list">
                    {details.prerequisites.map((prereq) => (
                      <div key={prereq.code} className="prerequisite-item">
                        <strong>{prereq.code}</strong>
                        <span>{prereq.title}</span>
                      </div>
                    ))}
                  </div>
                  <p className="prerequisite-warning">
                    You must complete these modules before taking {moduleCode}
                  </p>
                </div>
              )}

              <div className="detail-section">
                <h3>Class Indexes ({Object.keys(groupedIndexes).length})</h3>
                {Object.keys(groupedIndexes).length === 0 ? (
                  <p className="no-indexes">No class indexes available</p>
                ) : (
                  <div className="indexes-list">
                    {Object.entries(groupedIndexes).map(([indexCode, classes]) => (
                      <div key={indexCode} className="index-group">
                        <div className="index-header">Index {indexCode}</div>
                        <div className="index-classes">
                          {classes.map((cls, idx) => (
                            <div key={idx} className="class-item">
                              <span className="class-type">{cls.type}</span>
                              <span className="class-day">{DAYS[cls.day_of_week - 1]}</span>
                              <span className="class-time">
                                {cls.start_time.substring(0, 5)} - {cls.end_time.substring(0, 5)}
                              </span>
                              <span className="class-venue">{cls.venue}</span>
                              {cls.capacity && (
                                <span className="class-capacity">Cap: {cls.capacity}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
          {onAdd && (
            <button className="btn-primary" onClick={() => {
              onAdd(details)
              onClose()
            }}>
              Add to My Modules
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
