import React from 'react'

export default function FormPreview({ fields, onValueChange, onSubmit }) {
  if (fields.length === 0) {
    return (
      <div className="preview-empty">
        <div className="empty-icon">📋</div>
        <p>No fields yet. Add fields from the builder.</p>
      </div>
    )
  }

  return (
    <div className="form-preview">
      <h3 className="preview-title">Live Preview</h3>
      <div className="preview-form">
        {fields.map(field => (
          <div key={field.id} className="preview-field">
            <label className="preview-label">
              {field.label || <span className="unnamed">Unnamed Field</span>}
              {field.required && <span className="required-star">*</span>}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                placeholder={field.placeholder || ''}
                value={field.value}
                onChange={e => onValueChange(field.id, e.target.value)}
                rows={3}
              />
            ) : (
              <input
                type={field.type}
                placeholder={field.placeholder || ''}
                value={field.value}
                onChange={e => onValueChange(field.id, e.target.value)}
              />
            )}
          </div>
        ))}

        <button className="btn-submit" onClick={onSubmit}>
          Submit Form →
        </button>
      </div>
    </div>
  )
}