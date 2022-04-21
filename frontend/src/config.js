const modeEnv = process.env.NODE_ENV || 'development';
let port = '5000'

// check if mode is in developement or production (Build)
if (modeEnv === 'development') port = ":5000" // :8000

export const API = window.location.protocol + '//' + window.location.hostname + ':' +port
export const uri = process.env.REACT_APP_API_URL
export const adminURL = process.env.REACT_APP_ADMIN_URL