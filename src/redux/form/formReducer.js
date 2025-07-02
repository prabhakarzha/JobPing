// redux/form/formReducer.js

const initialState = {
  formData: {},
  userApplications: [],
  testimonials: [],
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return {
        ...state,
        formDataList: action.payload,
      };

    case "DELETE_FORM_DATA":
      return { ...state, formData: {} };

    case "SET_USER_APPLICATIONS":
      return { ...state, userApplications: action.payload };

    case "ADD_USER_APPLICATION":
      return {
        ...state,
        userApplications: [...state.userApplications, action.payload],
      };

    case "UPDATE_USER_APPLICATION":
      return {
        ...state,
        userApplications: state.userApplications.map((app) =>
          app.id === action.payload.id
            ? { ...app, ...action.payload.updatedData }
            : app
        ),
      };

    case "REMOVE_USER_APPLICATION":
      return {
        ...state,
        userApplications: state.userApplications.filter(
          (app) => app.id !== action.payload
        ),
      };

    // 🔽 Testimonials handlers
    case "SET_TESTIMONIALS":
      return { ...state, testimonials: action.payload };

    case "DELETE_TESTIMONIAL":
      return {
        ...state,
        testimonials: state.testimonials.filter((t) => t.id !== action.payload),
      };

    case "UPDATE_TESTIMONIAL":
      return {
        ...state,
        testimonials: state.testimonials.map((t) =>
          t.id === action.payload.id
            ? { ...t, message: action.payload.message }
            : t
        ),
      };

    case "REPLY_TO_TESTIMONIAL":
      return {
        ...state,
        testimonials: state.testimonials.map((t) =>
          t.id === action.payload.id
            ? { ...t, adminReply: action.payload.adminReply }
            : t
        ),
      };
    case "ADD_TESTIMONIAL":
      return {
        ...state,
        testimonials: [action.payload, ...state.testimonials],
      };

    default:
      return state;
  }
};

export default formReducer;
