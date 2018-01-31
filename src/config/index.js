// console.log('process.env.NODE_ENV', process.env.NODE_ENV)

export default {
  serverURI: 'http://localhost:3030',
  socketURI: 'http://localhost:3030',
  microURI: 'https://auth.' + process.env.domainkey + '/api',
  userDetailsAPI: 'http://auth.' + process.env.domainkey + '/api/'
}
