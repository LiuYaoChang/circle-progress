const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const timeTranslate = function (seconds) {
  const minute = Math.floor(seconds / 60);
  const second = Math.floor(seconds % 60);
  const result = {
    minute: minute < 10 ? `0${minute}` : minute,
    second: second < 10 ? `0${second}` : second
  }
  return result.minute + ':' + result.second;
}

module.exports = {
  formatTime: formatTime,
  timeTranslate
}
