// 提示颜色
const chalk =  require('chalk');
const chalkError = chalk.red;
const chalkSuccess = chalk.green;
const chalkWarning = chalk.yellow;
const chalkProcessing = chalk.blue;
const chalkMessage = chalk.default;
module.exports = {
  chalkError,
  chalkProcessing,
  chalkWarning,
  chalkSuccess,
  chalkMessage
};