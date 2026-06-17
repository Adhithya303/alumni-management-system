const FormField = ({ label, type = 'text', register, name, required = false, options = [] }) => {
  return (
    <label className="field">
      <span>{label}</span>
      {type === 'select' ? (
        <select {...register(name, { required })}>
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} {...register(name, { required })} />
      )}
    </label>
  )
}

export default FormField
