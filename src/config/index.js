
export default {
	// serverURI: 'http://localhost:3030',
	serverURI: 'https://api.' + process.env.domainkey + '/subscription',
	// socketURI: 'http://localhost:3030',
	microURI: 'https://auth.' + process.env.domainkey + '/api',
	userDetailsAPI: 'https://api.' + process.env.domainkey + '/auth/api/',
	gatewayAccountId: process.env.gatewayid
}
