const ResponseDTO = (message: string, data: any = null, success: boolean = true) => {
  return {
    message,
    data,
    success,
  };
};
export default ResponseDTO;
