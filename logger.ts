import { createLogger, format, transports } from "winston"

const logger = createLogger({
  level: "info",
  format: format.json(),
  transports: [new transports.File({ filename: `./logs/logs.log` })],
})

export default logger
