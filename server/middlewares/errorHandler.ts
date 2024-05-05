export const createError = (statusCode: string, message: string) => {
  const err = new Error();
  // err.statusCode = statusCode || 500;
  err.message = message || "Internal server error.";
  return err;
};
