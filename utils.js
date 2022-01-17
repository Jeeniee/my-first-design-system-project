const getTokens = (storage) => {

  const authAPIReducer = JSON.parse(storage.authAPIReducer);
  const authNWayReducer = JSON.parse(storage.authNWayReducer);

  return {
    b: authAPIReducer.user.token,
    n: authNWayReducer.nWayUser.accessToken
  }
}

