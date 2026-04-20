import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../api/client'
import FormField from '../components/FormField'
import Table from '../components/Table'

const Skills = () => {
  const [skills, setSkills] = useState([])
  const [alumni, setAlumni] = useState([])
  const [selectedAlumni, setSelectedAlumni] = useState('')
  const [alumniSkills, setAlumniSkills] = useState([])
  const [skillCount, setSkillCount] = useState(0)
  const { register, handleSubmit, reset } = useForm()

  const alumniOptions = useMemo(() => {
    const map = new Map()
    alumni.forEach((item) => {
      if (!map.has(item.alumni_id)) map.set(item.alumni_id, item.name)
    })
    return Array.from(map.entries()).map(([value, label]) => ({ value, label }))
  }, [alumni])

  const skillOptions = skills.map((item) => ({ value: item.skill_id, label: item.skill_name }))

  useEffect(() => {
    const loadData = async () => {
      const [skillsRes, alumniRes] = await Promise.all([api.get('/skills'), api.get('/alumni')])
      setSkills(skillsRes.data.data || [])
      setAlumni(alumniRes.data.data || [])
    }
    loadData()
  }, [])

  const fetchAlumniSkills = async (alumniId) => {
    if (!alumniId) {
      setAlumniSkills([])
      setSkillCount(0)
      return
    }

    const [skillsRes, countRes] = await Promise.all([
      api.get(`/alumni/${alumniId}/skills`),
      api.get(`/users/${alumniId}/skill-count`),
    ])

    setAlumniSkills(skillsRes.data.data || [])
    setSkillCount(countRes.data.data?.total_skills || 0)
  }

  useEffect(() => {
    fetchAlumniSkills(selectedAlumni)
  }, [selectedAlumni])

  const onSubmit = async (values) => {
    await api.post(`/alumni/${values.alumni_id}/skills`, { skill_id: values.skill_id })
    reset({ ...values, skill_id: '' })
    await fetchAlumniSkills(values.alumni_id)
    setSelectedAlumni(values.alumni_id)
  }

  const removeSkill = async (skillId) => {
    await api.delete(`/alumni/${selectedAlumni}/skills/${skillId}`)
    await fetchAlumniSkills(selectedAlumni)
  }

  return (
    <div className="page">
      <h2>Skills</h2>
      <div className="card">
        <h3>All Skills</h3>
        <ul className="chips">
          {skills.map((skill) => (
            <li key={skill.skill_id}>{skill.skill_name}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Alumni" type="select" register={register} name="alumni_id" required options={alumniOptions} />
          <FormField label="Skill" type="select" register={register} name="skill_id" required options={skillOptions} />
          <button type="submit">Assign Skill</button>
        </form>
      </div>

      <div className="card">
        <label className="field">
          <span>View assigned skills for alumni</span>
          <select value={selectedAlumni} onChange={(e) => setSelectedAlumni(e.target.value)}>
            <option value="">Select</option>
            {alumniOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>

        <p><strong>Total Skills:</strong> {skillCount}</p>

        <Table
          columns={['Skill', 'Action']}
          data={alumniSkills}
          renderRow={(item) => (
            <tr key={item.skill_id}>
              <td>{item.skill_name}</td>
              <td><button type="button" className="danger-btn" onClick={() => removeSkill(item.skill_id)}>Remove</button></td>
            </tr>
          )}
        />
      </div>
    </div>
  )
}

export default Skills
