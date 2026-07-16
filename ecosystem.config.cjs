module.exports = {
  apps: [{
    name: 'matchpoint',
    script: 'npm',
    args: 'start -- -p 3014',
    cwd: '/home/projects/matchpoint',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
