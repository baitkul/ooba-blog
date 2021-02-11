module.exports = {
  '/api': {
    target: process.env.CRM_API_URL,
    pathRewrite: { '^/api': '/api/v1' }
  },
  '/static': {
    target: process.env.CRM_API_URL,
  }
}
