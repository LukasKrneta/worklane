import "dotenv/config";

const DEFAULT_PORT = 3000;

const parsePort = (value) => {
  const parsedPort = Number.parseInt(value, 10);

  if (Number.isNaN(parsedPort) || parsedPort <= 0) {
    return DEFAULT_PORT;
  }

  return parsedPort;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: parsePort(process.env.PORT),
};
