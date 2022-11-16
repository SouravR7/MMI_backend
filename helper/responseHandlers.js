module.exports = {
  to_user,
};

function to_user(res, code, error, resMsg, data) {
  var res_data = {
    responseCode: code,
    responseMessage: resMsg,
    errorMessage: error,
    error: error ? true : false,
  };
  if (data) {
    res_data.result = data;
  }
  return res.status(code).send(res_data);
}
