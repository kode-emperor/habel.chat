module.exports = {
  apps : [
    {
      name   : "api",
      cwd: "./service",
      script : "npm run start",
      instances: 1,
      autorestart: false,
    },
    {
      name   : "ui",
      cwd: "./ui",
      script : "npm run build && npm run start",
      instances: 1,
      autorestart: false,
    }
  ]
}
