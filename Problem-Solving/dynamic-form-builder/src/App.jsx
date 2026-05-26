import React from 'react'
import FormBuilder from './components/FormBuilder'
import FormPreview from './components/FormPreview'
import SubmittedData from './components/SubmittedData'
import { useFormBuilder } from './hooks/useFormBuilder'

function App() {
  const {
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
  } = useFormBuilder()

  if (isSubmitted) {
    return (
      <div className="app-container">
        <header className="app-header">
          <h1>Dynamic Form Builder</h1>
        </header>
        <SubmittedData data={submittedData} onReset={resetForm} />
      </div>
    )
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Dynamic Form Builder</h1>
        <p>Add fields, configure them, then preview and submit</p>
      </header>

      <div className="app-layout">
        <FormBuilder
          fields={fields}
          onAdd={addField}
          onRemove={removeField}
          onUpdate={updateField}
          onMove={moveField}
        />
        <FormPreview
          fields={fields}
          onValueChange={updateFieldValue}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default App