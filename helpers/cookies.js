const set = (name, value, days, useDomain = true) => {
  const { location } = window;
  const { protocol, hostname } = location;
  const isSecure = protocol === 'https:';
  
  let expires = "";
  let domain = "";


  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }

  if (useDomain) {
    domain = `; domain=${hostname};`
  }

  document.cookie = `${name}=${value || ""} ${expires}; path=/${isSecure ? "; secure" : ""}${domain}`;
}
const get = (name) => {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');

  for (var i=0;i < ca.length;i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }

  return null;
}
const erase = (name, useDomain) => {   
  const { location } = window;
  const { protocol, hostname } = location;
  const isSecure = protocol === 'https:';

  document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/;${isSecure ? "secure;" : ""}${useDomain ? `domain=${hostname}` : ""}`;
}

const parse = (request) => {
    const list = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) return list;

    cookieHeader.split(`;`).forEach(function(cookie) {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });

    return list;
}

module.exports = {
  server: {
    parse
  },
  client: {
    set, get, erase
  }
}