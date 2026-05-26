import React from 'react'

const FIELD_TYPES = ['text', 'email', 'password', 'number', 'textarea']

export default function FieldCard({ field, index, total, onUpdate, onRemove, onMove }) {
  return (
    <div className="field-card">
      <div className="field-card-header">
        <span className="field-index">#{index + 1}</span>
        <span className="field-type-badge">{field.type}</span>
        <div className="field-card-actions">
          <button
            onClick={() => onMove(field.id, 'up')}
            disabled={index === 0}
            className="btn-icon"
            title="Move Up"
          >▲</button>
          <button
            onClick={() => onMove(field.id, 'down')}
            disabled={index === total - 1}
            className="btn-icon"
            title="Move Down"
          >▼</button>
          <button
            onClick={() => onRemove(field.id)}
            className="btn-icon btn-danger"
            title="Remove"
          >✕</button>
        </div>
      </div>

      <div className="field-grid">
        <div className="form-group">
          <label>Field Type</label>
          <select
            value={field.type}
            onChange={e => onUpdate(field.id, 'type', e.target.value)}
          >
            {FIELD_TYPES.map(t => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Label</label>
          <input
            type="text"
            value={field.label}
            placeholder="Enter label..."
            onChange={e => onUpdate(field.id, 'label', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Placeholder</label>
          <input
            type="text"
            value={field.placeholder}
            placeholder="Enter placeholder..."
            onChange={e => onUpdate(field.id, 'placeholder', e.target.value)}
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={field.required}
              onChange={e => onUpdate(field.id, 'required', e.target.checked)}
            />
            Required Field
          </label>
        </div>
      </div>
    </div>
  )
}