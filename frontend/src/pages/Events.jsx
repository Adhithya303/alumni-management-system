import { useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient'
import AlertMessage from '../components/AlertMessage'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import { formatDate } from '../utils/helpers'

const Events = () => {
  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [participants, setParticipants] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(false)

  const [eventForm, setEventForm] = useState({ event_name: '', event_date: '', location: '' })
  const [eventErrors, setEventErrors] = useState({})

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true)
        const response = await axiosClient.get('/events')
        setEvents(response.data.data || [])
      } catch (err) {
        const message = err.response?.data?.message || err.message || 'An error occurred'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  const validateEventForm = () => {
    const nextErrors = {}
    if (!eventForm.event_name.trim()) nextErrors.event_name = 'Event name is required'
    if (!eventForm.event_date) nextErrors.event_date = 'Event date is required'
    setEventErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const addEvent = async (event) => {
    event.preventDefault()
    if (!validateEventForm()) return

    try {
      setActionLoading(true)
      setError('')
      const response = await axiosClient.post('/events', eventForm)
      const newEvent = { event_id: response.data.data?.event_id, ...eventForm }
      setEvents((prev) => [newEvent, ...prev])
      setEventForm({ event_name: '', event_date: '', location: '' })
      setEventErrors({})
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'An error occurred'
      setError(message)
    } finally {
      setActionLoading(false)
    }
  }

  const openParticipants = async (eventItem) => {
    try {
      setActionLoading(true)
      setError('')
      const response = await axiosClient.get(`/events/${eventItem.event_id}/participants`)
      setParticipants(response.data.data || [])
      setSelectedEvent(eventItem)
      setShowModal(true)
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'An error occurred'
      setError(message)
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="fade-in">
      <AlertMessage type="danger" message={error} onClose={() => setError('')} />
      {actionLoading ? <LoadingSpinner /> : null}

      {user?.role === 'admin' ? (
        <div className="card p-3 mb-3">
          <button
            type="button"
            className="btn btn-outline-primary mb-3"
            onClick={() => setShowAddEvent((prev) => !prev)}
          >
            {showAddEvent ? 'Hide Add Event' : 'Add Event'}
          </button>
          {showAddEvent ? (
            <form onSubmit={addEvent}>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Event Name</label>
                  <input
                    className="form-control"
                    value={eventForm.event_name}
                    onChange={(e) => setEventForm({ ...eventForm, event_name: e.target.value })}
                  />
                  {eventErrors.event_name ? <div className="text-danger small">{eventErrors.event_name}</div> : null}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Event Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={eventForm.event_date}
                    onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })}
                  />
                  {eventErrors.event_date ? <div className="text-danger small">{eventErrors.event_date}</div> : null}
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Location</label>
                  <input
                    className="form-control"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  />
                </div>
              </div>
              <button className="btn btn-primary" type="submit" disabled={actionLoading}>
                Add Event
              </button>
            </form>
          ) : null}
        </div>
      ) : null}

      <div className="card p-3">
        <h5 className="mb-3">Events</h5>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Location</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {events.map((eventItem) => (
                <tr key={eventItem.event_id}>
                  <td>{eventItem.event_name}</td>
                  <td>{formatDate(eventItem.event_date)}</td>
                  <td>{eventItem.location || '—'}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => openParticipants(eventItem)}
                    >
                      View Participants
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal ? (
        <>
          <div className="modal show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Participants - {selectedEvent?.event_name}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {participants.map((participant) => (
                          <tr key={participant.alumni_id}>
                            <td>{participant.name}</td>
                            <td>{participant.email}</td>
                            <td>{participant.role || 'Participant'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show"></div>
        </>
      ) : null}
    </div>
  )
}

export default Events
