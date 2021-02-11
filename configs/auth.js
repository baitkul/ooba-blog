module.exports = {
  redirect: {
    login: '/login',
    logout: '/login',
    home: '/',
  },
  strategies: {
    local: {
      endpoints: {
        login: { url: '/users/login', method: 'post', propertyName: 'token' },
        user: { url: '/users/info', method: 'get', propertyName: '' },
        logout: false
      },
      tokenRequired: true,
      tokenType: 'Bearer'
    },
  },
  localStorage: {
    prefix: 'ooba_crm_auth.'
  },
  cookie: {
    prefix: 'ooba_crm_auth.',
    options: {
      path: '/'
    }
  },
}
