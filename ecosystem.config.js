module.exports = {
  apps: [
    {
      name: 'blog-server',
      max_memory_restart: '1G',
      script: 'node dist/src/main.js',
      instances: 1,
      cron_restart: '0 0 * * *',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
