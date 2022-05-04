function timeAgo(time) {

  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, 'seconds', 1], // 60
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
  ];
  var seconds = (+new Date() - time) / 1000,
    token = 'ago',
    list_choice = 1;

  if (seconds == 0) {
    return 'Just now'
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
  }
  var i = 0,
    format;
  while (format = time_formats[i++])
    if (seconds < format[0]) {
      if (typeof format[2] == 'string')
        return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
    }

  const { extended_readable } = parseDate(time, false)

  return extended_readable;
}

const parseDate = (timestamp, ago = true) => {
  const _months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const yyyy = date.getFullYear();
  const mm = month < 10 ? `0${month}` : month;
  const dd = day < 10 ? `0${day}` : day;
  const hh = hours < 10 ? `0${hours}` : hours;
  const min = minutes < 10 ? `0${minutes}` : minutes;
  const ss = seconds < 10 ? `0${seconds}` : seconds;

  return {
    day: dd,
    month: mm,
    year: yyyy,
    hours: date.getUTCHours(),
    minutes: date.getUTCMinutes(),
    seconds: date.getUTCSeconds(),
    readable: `${dd}.${mm}.${yyyy}`,
    readable_with_monthname: `${dd} ${_months[month - 1]} ${yyyy}`,
    extended_readable: `${dd}.${mm}.${yyyy} ${hh}:${min}:${ss}`,
    passed_time: ago ? timeAgo(timestamp) : null
  };
};

module.exports = parseDate
