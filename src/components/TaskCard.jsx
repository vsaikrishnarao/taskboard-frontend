export default function TaskCard({ task, onDelete }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div className="card-title">{task.title}</div>
        <button className="btn btn-danger" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
      {task.description && (
        <p style={{ fontSize: '13px', color: '#5e6c84', margin: '6px 0' }}>{task.description}</p>
      )}
      <span className={`card-status status-${task.status}`}>{task.status.replace('_', ' ')}</span>
    </div>
  )
}