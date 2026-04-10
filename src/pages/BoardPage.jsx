import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import TaskCard from '../components/TaskCard'

const STATUSES = ['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE']

export default function BoardPage() {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState({ title: '', description: '', status: 'TODO' })

  useEffect(() => {
    fetchTasks()
  }, [boardId])

  const fetchTasks = async () => {
    const res = await api.get(`/boards/${boardId}/tasks`)
    setTasks(res.data)
  }

  const createTask = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    await api.post(`/boards/${boardId}/tasks`, form)
    setForm({ title: '', description: '', status: 'TODO' })
    fetchTasks()
  }

  const deleteTask = async (taskId) => {
    await api.delete(`/boards/${boardId}/tasks/${taskId}`)
    fetchTasks()
  }

  const tasksByStatus = (status) => tasks.filter(t => t.status === status)

  return (
    <div className="page">
      <div className="back-link" onClick={() => navigate('/')}>← Back to boards</div>
      <div className="page-title">Board Tasks</div>

      <div className="form-box">
        <h2>Add a Task</h2>
        <form onSubmit={createTask}>
          <div className="form-group">
            <label>Title</label>
            <input
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Fix login bug"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Optional details"
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
            >
              {STATUSES.map(s => (
                <option key={s} value={s}>{s.replace('_', ' ')}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" type="submit">Add Task</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {STATUSES.map(status => (
          <div key={status}>
            <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 13, color: '#5e6c84', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {status.replace('_', ' ')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tasksByStatus(status).map(task => (
                <TaskCard key={task.id} task={task} onDelete={deleteTask} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}