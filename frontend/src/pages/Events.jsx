import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../api/client'
import FormField from '../components/FormField'
import Table from '../components/Table'

const Events = () => {
  const [events, setEvents] = useState([])
  const [alumni, setAlumni] = useState([])
  const [participants, setParticipants] = useState([])
  const [selectedEvent, setSelectedEvent] = useState('')

  const addEventForm = useForm()
  const participationForm = useForm()

  const alumniOptions = useMemo(() => {
    const map = new Map()
    alumni.forEach((item) => {
      if (!map.has(item.alumni_id)) map.set(item.alumni_id, item.name)
    })
    return Array.from(map.entries()).map(([value, label]) => ({ value, label }))
  }, [alumni])

  const eventOptions = events.map((event) => ({ value: event.event_id, label: event.event_name }))

  const loadData = async () => {
    const [eventsRes, alumniRes] = await Promise.all([api.get('/events'), api.get('/alumni')])
    setEvents(eventsRes.data.data || [])
    setAlumni(alumniRes.data.data || [])
  }

  useEffect(() => {
    loadData()
  }, [])

  const loadParticipants = async (eventId) => {
    if (!eventId) {
      setParticipants([])
      return
    }

    const response = await api.get(`/events/${eventId}/participants`)
    setParticipants(response.data.data || [])
  }

  useEffect(() => {
    loadParticipants(selectedEvent)
  }, [selectedEvent])

  const onAddEvent = async (values) => {
    await api.post('/events', values)
    addEventForm.reset()
    await loadData()
  }

  const onParticipate = async (values) => {
    await api.post(`/events/${values.event_id}/participate`, {
      alumni_id: values.alumni_id,
      role: values.role,
    })
    participationForm.reset({ ...values, alumni_id: '', role: '' })
    setSelectedEvent(values.event_id)
    await loadParticipants(values.event_id)
  }

  return (
    <div className="page">
      <h2>Events</h2>

      <div className="card">
        <h3>Add Event</h3>
        <form className="form" onSubmit={addEventForm.handleSubmit(onAddEvent)}>
          <FormField label="Event Name" register={addEventForm.register} name="event_name" required />
          <FormField label="Event Date" type="date" register={addEventForm.register} name="event_date" required />
          <FormField label="Location" register={addEventForm.register} name="location" required />
          <button type="submit">Add Event</button>
        </form>
      </div>

      <div className="card">
        <h3>Register Alumni for Event</h3>
        <form className="form" onSubmit={participationForm.handleSubmit(onParticipate)}>
          <FormField label="Event" type="select" register={participationForm.register} name="event_id" required options={eventOptions} />
          <FormField label="Alumni" type="select" register={participationForm.register} name="alumni_id" required options={alumniOptions} />
          <FormField label="Role" register={participationForm.register} name="role" />
          <button type="submit">Register</button>
        </form>
      </div>

      <div className="card">
        <h3>Events</h3>
        <Table
          columns={['Event', 'Date', 'Location', 'Participants']}
          data={events}
          renderRow={(item) => (
            <tr key={item.event_id}>
              <td>{item.event_name}</td>
              <td>{item.event_date ? new Date(item.event_date).toLocaleDateString() : '-'}</td>
              <td>{item.location}</td>
              <td>
                <button type="button" onClick={() => setSelectedEvent(item.event_id)}>
                  View Participants
                </button>
              </td>
            </tr>
          )}
        />
      </div>

      <div className="card">
        <h3>Participants</h3>
        <label className="field">
          <span>Select event</span>
          <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
            <option value="">Select</option>
            {eventOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <Table
          columns={['Name', 'Email', 'Role']}
          data={participants}
          renderRow={(item) => (
            <tr key={item.alumni_id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          )}
        />
      </div>
    </div>
  )
}

export default Events
