'use strict'
module.exports = {
  NODE_ENV: '"production"',
  domainkey: JSON.stringify(process.env.domainkey),
  gatewayAccountId: JSON.stringify(process.env.gatewayid)
}
