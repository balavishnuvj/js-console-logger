import consoleLogger, { consoleConfig } from '../index';
import { LogLevel } from '../types';

declare const global: any;

const testName = 'test';
const testMsg = 'test_msg';
const testData = { ua: 'bot', name: 'console-logger' };

global.console = {
  debug: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  trace: jest.fn(),
  warn: jest.fn(),
};

/*
    Debug is expected to be called if log level is set to 'DEBUG'
*/
test('Debug is expected to be called', () => {
  consoleConfig.setConsoleLevel(LogLevel.DEBUG);
  consoleLogger.debug(testName, testMsg, testData);
  expect(global.console.debug).toHaveBeenCalled();
});

/*
    Trace is expected to be called if log level is set to 'DEBUG'
*/
test('Trace is expected to be called', () => {
  consoleConfig.setConsoleLevel(LogLevel.TRACE);
  consoleLogger.trace(testName, testMsg, testData);
  expect(global.console.trace).toHaveBeenCalled();
});
