export enum LogLevel {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export type FunctionType = (level: LogLevel, name: string, msg: string, data: string | object) => void;

export type ConsoleLogFnType = (name: string, msg: string, data: string | object) => void;

export type ReportFnType = (obj: object) => void;

export type SetBooleanFnType = (flag: boolean) => void;

export type SetFunctionFnType = (fn: ReportFnType) => void;

export interface ILoggerInfoType {
  levelTagColor: string;
  levelCode: number;
}

export interface ILoggerInfo {
  trace: ILoggerInfoType;
  debug: ILoggerInfoType;
  info: ILoggerInfoType;
  warn: ILoggerInfoType;
  error: ILoggerInfoType;
}

export interface ILoggerConfig {
  disableConsole: boolean;
  disableReport: boolean;
  consoleLevel: LogLevel;
  reportLevel: LogLevel;
  reportFn: ReportFnType;
}

export interface IConsoleLogger {
  trace: ConsoleLogFnType;
  debug: ConsoleLogFnType;
  info: ConsoleLogFnType;
  warn: ConsoleLogFnType;
  error: ConsoleLogFnType;
}
