
export default {
	serverURI: 'https://api.' + process.env.domainkey + '/subscription',
	microURI: 'https://auth.' + process.env.domainkey + '/api',
	userDetailsAPI: 'https://api.' + process.env.domainkey + '/auth/api/',
	gatewayAccountId: process.env.gatewayid
}
