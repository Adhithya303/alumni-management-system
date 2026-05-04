const AlertMessage = ({ type = 'info', message, onClose }) => {
  if (!message) return null

  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {message}
      {onClose ? (
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      ) : null}
    </div>
  )
}

export default AlertMessage
