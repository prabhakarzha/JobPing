// src/components/JobApplicationFields.js

import React from "react";

const JobApplicationFields = ({
  formFields,
  formData,
  errors,
  handleChange,
}) => {
  return formFields.map((field) => (
    <div
      key={field.name}
      className={`col-12 col-md-${field.type === "select" ? 4 : 6} mb-3`}
    >
      <label htmlFor={field.name} className="form-label fw-semibold">
        {field.label}
      </label>

      {field.type === "select" ? (
        <select
          id={field.name}
          name={field.name}
          className={`form-select ${errors[field.name] ? "is-invalid" : ""}`}
          value={formData[field.name] || ""}
          onChange={handleChange}
        >
          <option value="">Select {field.label}</option>
          {field.options.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === "file" ? (
        <input
          type="file"
          id={field.name}
          name={field.name}
          className={`form-control ${errors[field.name] ? "is-invalid" : ""}`}
          onChange={handleChange}
        />
      ) : (
        <input
          type={field.type}
          id={field.name}
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          className={`form-control ${errors[field.name] ? "is-invalid" : ""}`}
          placeholder={`Enter ${field.label}`}
        />
      )}

      {errors[field.name] && (
        <div className="invalid-feedback">{errors[field.name]}</div>
      )}
    </div>
  ));
};

export default JobApplicationFields;
