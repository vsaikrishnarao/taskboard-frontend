import { useEffect, useState } from 'react'
import api from '../api/axios'
import BoardCard from '../components/BoardCard'

export default function BoardListPage() {
  const [boards, setBoards] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    fetchBoards()
  }, [])

  const fetchBoards = async () => {
    const res = await api.get('/boards')
    setBoards(res.data)
  }

const [error, setError] = useState('')

const createBoard = async (e) => {
  e.preventDefault()
  if (!name.trim()) return
  try {
    await api.post('/boards', { name })
    setName('')
    setError('')
    fetchBoards()
  } catch (err) {
    setError(err.response?.data?.message || 'Board name already exists')
  }
}

  return (
    <div className="page">
      <div className="page-title">My Boards</div>

      <div className="form-box">
        <h2>Create a Board</h2>
        <form onSubmit={createBoard}>
          <div className="form-group">
            <label>Board name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Sprint 1"
            />
          </div>
          <button className="btn btn-primary" type="submit">Create</button>
          {error && <p style={{ color: 'red', marginTop: 8, fontSize: 13 }}>{error}</p>}
        </form>
      </div>

      <div className="card-grid">
        {boards.map(board => (
          <BoardCard key={board.id} board={board} 
          onDelete={fetchBoards}
           />
        ))}
      </div>
    </div>
  )
}