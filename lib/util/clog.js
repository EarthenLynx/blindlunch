const moment = require("moment");
const chalk = require("chalk");

/**
 * 
 * @param {String} level 1 for error, 2 for info, 3 for debug, 4 for testing
 * @param {String} message The message to log to the console
 */

module.exports = function log(level, message) {
  const now = moment().format('DD MM YYYY, hh:mm:ss a');

  switch (level) {
    case 1:
      console.log(chalk.yellow(now) + chalk.red(" @Error: ") + message)
      break;

    case 2:
      console.log(chalk.yellow(now) + chalk.blue(" @Info: ") + message)
      break;

    case 3:
      console.log(chalk.yellow(now) + chalk.greenBright(" @Debug: ") + message)
      break;

    case 4:
      console.log(chalk.yellow(now) + chalk.greenBright(" @Testing: ") + message)
      break;
  }
}