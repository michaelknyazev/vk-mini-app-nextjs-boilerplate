const parseDate =  require("./parseDate");

const request = (method, status, url, debug) => {
  const { extended_readable } = parseDate(Date.now())

  console.log(`${extended_readable} - [${status === 200 ? '\x1b[92m' : '\x1b[93m'}${method}\x1b[0m] \x1b[35m${status}\x1b[0m ${url}`);
  
  if (debug) {
    console.log(debug);
    console.log('------');
  }
}

const action = (action, _type, name) => {
  const { extended_readable } = parseDate(Date.now());
  
  console.log(`${extended_readable} - [\x1b[92m${action}\x1b[0m] \x1b[35m${_type}\x1b[0m ${name}`);
}

module.exports = {
  request,
  action
}