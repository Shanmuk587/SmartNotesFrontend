import { forwardRef } from 'react'

const Input = forwardRef(({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  error,
  disabled = false,
  required = false,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="label">
          {label} {required && <span className="text-error-500">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          input
          ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}
          ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error-600">{error}</p>}
    </div>
  )
})

Input.displayName = 'Input'

export default Input