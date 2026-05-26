import { useState } from 'react'

const generateId = () => `field_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

const createField = (type = 'text') => ({
  id: generateId(),
  type,
  label: '',
  placeholder: '',
  required: false,
  value: '',
})

export function useFormBuilder() {
  const [fields, setFields] = useState([])
  const [submittedData, setSubmittedData] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const addField = (type = 'text') => {
    setFields(prev => [...prev, createField(type)])
  }

  const removeField = (id) => {
    setFields(prev => prev.filter(f => f.id !== id))
  }

  const updateField = (id, key, val) => {
    setFields(prev =>
      prev.map(f => (f.id === id ? { ...f, [key]: val } : f))
    )
  }

  const updateFieldValue = (id, val) => {
    setFields(prev =>
      prev.map(f => (f.id === id ? { ...f, value: val } : f))
    )
  }

  const moveField = (id, direction) => {
    setFields(prev => {
      const idx = prev.findIndex(f => f.id === id)
      if (idx === -1) return prev
      const newFields = [...prev]
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1
      if (swapIdx < 0 || swapIdx >= newFields.length) return prev
      ;[newFields[idx], newFields[swapIdx]] = [newFields[swapIdx], newFields[idx]]
      return newFields
    })
  }

  const handleSubmit = () => {
    const data = fields.map(f => ({
      label: f.label || `Field (${f.type})`,
      type: f.type,
      value: f.value,
      required: f.required,
    }))
    setSubmittedData(data)
    setIsSubmitted(true)
  }

  const resetForm = () => {
    setFields([])
    setSubmittedData(null)
    setIsSubmitted(false)
  }

  return {
    fields,
    submittedData,
    isSubmitted,
    addField,
    removeField,
    updateField,
    updateFieldValue,
    moveField,
    handleSubmit,
    resetForm,
  }
}