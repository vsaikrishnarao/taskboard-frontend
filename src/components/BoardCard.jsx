import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function BoardCard({ board, onDelete }) {
  const navigate = useNavigate()
  const handleDelete = async (e) => {
    e.stopPropagation()  
    await api.delete(`/boards/${board.id}`)
    onDelete()
  }
  return (
    <div className="card" onClick={() => navigate(`/boards/${board.id}`)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="card-title">{board.name}</div>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}