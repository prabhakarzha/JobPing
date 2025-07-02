// 📁 redux/form/formActions.js
export const setFormData = (data) => ({
  type: "SET_FORM_DATA",
  payload: data,
});

export const deleteFormData = (id) => ({
  type: "DELETE_FORM_DATA",
  payload: id,
});

// ✅ New actions needed for SubmitApplication and UserApplicationDashboard:
export const addUserApplication = (application) => ({
  type: "ADD_USER_APPLICATION",
  payload: application,
});

export const setUserApplications = (applications) => ({
  type: "SET_USER_APPLICATIONS",
  payload: applications,
});

export const updateUserApplication = (application) => ({
  type: "UPDATE_USER_APPLICATION",
  payload: application,
});

export const removeUserApplication = (id) => ({
  type: "REMOVE_USER_APPLICATION",
  payload: id,
});

// action for Admintestimonial page
// redux/form/formActions.js

// Testimonials
export const setTestimonials = (testimonials) => ({
  type: "SET_TESTIMONIALS",
  payload: testimonials,
});

export const deleteTestimonial = (id) => ({
  type: "DELETE_TESTIMONIAL",
  payload: id,
});

export const updateTestimonial = ({ id, message }) => ({
  type: "UPDATE_TESTIMONIAL",
  payload: { id, message },
});

export const replyToTestimonial = ({ id, adminReply }) => ({
  type: "REPLY_TO_TESTIMONIAL",
  payload: { id, adminReply },
});
export const addTestimonial = (testimonial) => ({
  type: "ADD_TESTIMONIAL",
  payload: testimonial,
});
// export const setUserApplications = (applications) => ({
//   type: "SET_USER_APPLICATIONS",
//   payload: applications,
// });
