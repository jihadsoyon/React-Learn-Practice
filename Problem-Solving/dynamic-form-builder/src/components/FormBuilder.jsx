import React from 'react'
import FieldCard from './FieldCard'

const FIELD_TYPES = ['text', 'email', 'password', 'number', 'textarea']

export default function FormBuilder({ fields, onAdd, onRemove, onUpdate, onMove }) {
  return (
    <div className="builder-panel">
      <div className="builder-header">
        <h2>Field Builder</h2>
        <span className="field-count">{fields.length} field{fields.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="add-field-row">
        {FIELD_TYPES.map(type => (
          <button
            key={type}
            className={`btn-add-type btn-type-${type}`}
            onClick={() => onAdd(type)}
          >
            + {type}
          </button>
        ))}
      </div>

      {fields.length === 0 ? (
        <div className="builder-empty">
          <p>Click above to add your first field</p>
        </div>
      ) : (
        <div className="fields-list">
          {fields.map((field, index) => (
            <FieldCard
              key={field.id}
              field={field}
              index={index}
              total={fields.length}
              onUpdate={onUpdate}
              onRemove={onRemove}
              onMove={onMove}
            />
          ))}
        </div>
      )}
    </div>
  )
}