import { IConsoleLogger, ILoggerConfig, ILoggerInfo, LogLevel, ReportFnType } from './types';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    logger: object;
  }
}

// tslint:disable-next-line:no-empty
const noop = () => {};

const loggerConfig: ILoggerConfig = {
  consoleLevel: LogLevel.INFO,
  disableConsole: false,
  disableReport: true,
  reportFn: noop,
  reportLevel: LogLevel.ERROR,
};

const loggerInfo: ILoggerInfo = {
  debug: {
    levelCode: 2,
    levelTagColor: 'green',
  },
  error: {
    levelCode: 5,
    levelTagColor: 'red',
  },
  info: {
    levelCode: 3,
    levelTagColor: 'cornflowerblue',
  },
  trace: {
    levelCode: 1,
    levelTagColor: 'yellow',
  },
  warn: {
    levelCode: 4,
    levelTagColor: 'orange',
  },
};

const logLevels = Object.keys(loggerInfo);

const getTagStyle = (color: string) => `background-color: ${color}; font-size:10px; color: white; padding: 1px 5px;`;

const consoleLoggerFn = (level: LogLevel, name: string, msg: string, data: string | object = '') => {
  window.console[level](
    `%c${level.toUpperCase()}%c${name.toUpperCase()}`,
    getTagStyle(loggerInfo[level].levelTagColor),
    getTagStyle('indigo'),
    msg,
    data,
  );
};

const log = (level: LogLevel, name: string, msg: string, data: string | object = '') => {
  if (logLevels.includes(level)) {
    const { levelCode } = loggerInfo[level];
    const isAboveConsoleLevel = loggerInfo[loggerConfig.consoleLevel].levelCode <= levelCode;
    const shouldConsole = !loggerConfig.disableConsole && isAboveConsoleLevel;
    const isAboveReportLevel = loggerInfo[loggerConfig.reportLevel].levelCode <= levelCode;
    const shouldReport = !loggerConfig.disableReport && isAboveReportLevel;
    const obj = {
      data,
      level,
      msg,
      name,
    };
    if (shouldConsole) {
      consoleLoggerFn(level, name, msg, data);
    }
    if (shouldReport) {
      loggerConfig.reportFn(obj);
    }
  }
  /* Not reachable in TS
   else {
    consoleLogger.error('Logger', `Invalid logger call: ${level}`, {});
  }
  */
};

const getConsoleLevel = () => loggerConfig.consoleLevel;

const getReportLevel = () => loggerConfig.reportLevel;

const getDisableConsole = () => loggerConfig.disableConsole;

const getDisableReport = () => loggerConfig.disableReport;

const setConsoleLevel = (level: LogLevel) => {
  if (logLevels.includes(level)) {
    loggerConfig.consoleLevel = level;
    log(LogLevel.INFO, 'Logger', `Log level set to ${level}`);
  }
  /* Not reachable in TS
  else {
   log(LogLevel.ERROR, 'Logger', `Invalid level: ${level}`);
 }
*/
  return getConsoleLevel();
};

const setReportLevel = (level: LogLevel) => {
  if (logLevels.includes(level)) {
    loggerConfig.reportLevel = level;
    log(LogLevel.INFO, 'Logger', `Log level set to ${level}`);
  }
  /* Not reachable in TS
else {
log(LogLevel.ERROR, 'Logger', `Invalid level: ${level}`);
}
*/
  return getReportLevel();
};

const setDisableConsole = (flag: boolean) => {
  loggerConfig.disableConsole = flag;
  return getDisableConsole();
};

const setDisableReport = (flag: boolean) => {
  loggerConfig.disableReport = flag;
  return getDisableReport();
};

const setReportFn = (fn: ReportFnType) => {
  loggerConfig.reportFn = fn;
};

export const consoleConfig = {
  getConsoleLevel,
  getDisableConsole,
  getDisableReport,
  getReportLevel,
  setConsoleLevel,
  setDisableConsole,
  setDisableReport,
  setReportFn,
  setReportLevel,
};

const consoleLogger: IConsoleLogger = {
  debug: (name: string, msg: string, data: string | object = '') => log(LogLevel.DEBUG, name, msg, data),
  error: (name: string, msg: string, data: string | object = '') => log(LogLevel.ERROR, name, msg, data),
  info: (name: string, msg: string, data: string | object = '') => log(LogLevel.INFO, name, msg, data),
  trace: (name: string, msg: string, data: string | object = '') => log(LogLevel.TRACE, name, msg, data),
  warn: (name: string, msg: string, data: string | object = '') => log(LogLevel.WARN, name, msg, data),
};

if (window) {
  window.logger = consoleLogger;
}

export default consoleLogger;
