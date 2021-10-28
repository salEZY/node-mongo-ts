import logger from "pino";
import dayjs from "dayjs";
import PinoPretty from "pino-pretty";

const log = logger({
  prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
