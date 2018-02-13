// console.log('process.env.NODE_ENV', process.env.NODE_ENV)
export default {
  // serverURI: 'http://172.16.230.151:3030',
  serverURI: 'https://api.' + process.env.domainkey + '/subscription',
  // socketURI: 'http://localhost:3030',
  microURI: 'https://auth.' + process.env.domainkey + '/api',
  userDetailsAPI: 'https://api.' + process.env.domainkey + '/auth/api/'
}
