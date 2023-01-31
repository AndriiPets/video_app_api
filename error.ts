interface ResponseError extends Error {
  status?: number;
}

const createError = (status: number, massage: string) => {
  const err: ResponseError = new Error();
  err.message = massage;
  err.status = status;
  return err;
};

export default createError;
