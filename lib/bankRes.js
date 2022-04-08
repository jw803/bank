const bankRes = {
  return(msg, errCode) {
    if (!errCode) {
      return {
        status: true,
        code: 200,
        data: msg
      }
    }
    return {
      status: false,
      message: msg,
      code: errCode,
      data: {}
    }
  }
}

export default bankRes
