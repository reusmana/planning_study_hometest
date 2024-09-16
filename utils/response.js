module.exports = {
  // Success response
  success: (res, message = "Operation successful", data = {}) => {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  },

  // Error response
  error: (
    res,
    message = "Something went wrong",
    statusCode = 500,
    data = {}
  ) => {
    return res.status(statusCode).json({
      success: false,
      message,
      data,
    });
  },

  // Validation error response
  validationError: (
    res,
    errors = [],
    message = "Validation failed",
    statusCode = 400
  ) => {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  },

  // Not found response
  notFound: (res, message = "Resource not found", data = {}) => {
    return res.status(404).json({
      success: false,
      message,
      data,
    });
  },

  // Forbidden response
  forbidden: (res, message = "Access denied", data = {}) => {
    return res.status(403).json({
      success: false,
      message,
      data,
    });
  },
};
