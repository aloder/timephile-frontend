interface IError {
  path: string;
  message: string;
}

export const normalizeErrors = (errors: IError[]) => {
  const errMap: { [key: string]: string } = {};

  errors.forEach(err => {
    errMap[err.path] = err.message;
  });

  return errMap;
};
