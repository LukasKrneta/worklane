import 'dotenv/config'

const DEFAULT_PORT = 3000

const parsePort = (value) => {
  const parsedPort = Number.parseInt(value, 10)

  if (Number.isNaN(parsedPort) || parsedPort <= 0) {
    return DEFAULT_PORT
  }

  return parsedPort
}

const getRequiredEnv = (name) => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parsePort(process.env.PORT),
  databaseUrl: getRequiredEnv('DATABASE_URL'),
  jwtSecret: getRequiredEnv('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
}
