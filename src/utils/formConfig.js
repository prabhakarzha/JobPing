// src/utils/formConfig.js

export const defaultFormData = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  gender: "",
  salary: "",
  resume: null,
};

export const formFields = [
  { label: "First Name", name: "firstName", type: "text" },
  { label: "Last Name", name: "lastName", type: "text" },
  { label: "Email", name: "email", type: "email" },
  { label: "Address", name: "address", type: "text" },
  { label: "Salary", name: "salary", type: "text" },
  {
    label: "Gender",
    name: "gender",
    type: "select",
    options: ["Male", "Female"],
  },
  { label: "Upload Resume", name: "resume", type: "file" },
];

export const validateForm = (formData) => {
  const newErrors = {};

  if (!formData.firstName.trim())
    newErrors.firstName = "First name is required";
  if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
  if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
    newErrors.email = "Valid email is required";
  if (!formData.address.trim()) newErrors.address = "Address is required";
  if (!formData.gender) newErrors.gender = "Gender is required";
  if (!formData.salary.trim() || isNaN(formData.salary))
    newErrors.salary = "Valid salary is required";
  if (!formData.resume) newErrors.resume = "Resume is required";

  return newErrors;
};
