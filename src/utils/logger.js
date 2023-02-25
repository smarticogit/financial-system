const log4js = require("log4js");

const logger = log4js.getLogger();

log4js.configure({
    appenders: { cheese: { type: "file", filename: "cheese.log" } },
    categories: { default: { appenders: ["cheese"], level: "error" } },
});

logger.level = "info";

module.exports = logger;