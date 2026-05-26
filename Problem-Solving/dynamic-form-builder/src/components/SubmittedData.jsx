import React from 'react'

export default function SubmittedData({ data, onReset }) {
  return (
    <div className="submitted-wrapper">
      <div className="submitted-header">
        <span className="success-icon">✅</span>
        <h2>Form Submitted Successfully!</h2>
        <p>Here's the data that was submitted:</p>
      </div>

      <div className="submitted-table-wrapper">
        <table className="submitted-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Label</th>
              <th>Type</th>
              <th>Value</th>
              <th>Required</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.label}</td>
                <td>
                  <span className={`type-pill type-${item.type}`}>{item.type}</span>
                </td>
                <td className="value-cell">
                  {item.type === 'password'
                    ? '••••••••'
                    : item.value || <span className="empty-value">—</span>}
                </td>
                <td>{item.required ? '✔ Yes' : '✘ No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="btn-reset" onClick={onReset}>
        ← Build New Form
      </button>
    </div>
  )
}