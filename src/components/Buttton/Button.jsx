import React from 'react'

const Button = ({ children, type = "button", onClick, fullWidth = true, disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 
        text-white 
        bg-indigo-600 
        hover:bg-indigo-700 
        rounded-md
        transition-colors
        duration-200
        disabled:opacity-50 
        disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : 'w-auto'}
      `}
    >
      {children}
    </button>
  )
}

export default Button
