const LoadingSpinner = () => {
  return (
    <div className="py-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="mt-3">Loading...</div>
    </div>
  )
}

export default LoadingSpinner
