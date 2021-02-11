module.exports = {
  apps: [{
    name: 'ooba-blog',
    exec_mode: 'fork',
    script: './node_modules/nuxt/bin/nuxt.js',
    args: 'start',
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'root',
      host: '37.252.0.55',
      ref: 'origin/master',
      ssh_options: ['ForwardAgent=yes'],
      repo: 'https://github.com/baitkul/ooba-blog.git',
      path: '/var/www/ooba-blog',
      'post-deploy': 'npm ci && npm run build && pm2 startOrGracefulReload ecosystem.config.js --env production',
    }
  }
}
