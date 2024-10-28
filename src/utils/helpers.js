

// Helper to format error responses or extract error message
export const getErrorMessage = (error) => {
    return error.response?.data?.message || 'An error occurred';
  };
  