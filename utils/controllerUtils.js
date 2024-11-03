// General promise and error handler
function awaitWithCatch(promise) {
  return promise
    .then((data) => {
      return { result: data, code: 200 };
    })
    .catch((error) => {
      return { result: error, code: 500 };
    });
}

module.exports = { awaitWithCatch };
