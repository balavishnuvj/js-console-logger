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
    With default configuration Report function is not expected to be called on 'Error'.
    Even if report function is set.
*/
test('Report function to not be called on Error', () => {
  const mockReportFunction = jest.fn(obj => obj);
  consoleConfig.setReportFn(mockReportFunction);
  consoleLogger.error(testName, testMsg, testData);
  expect(global.console.error).toHaveBeenCalled();
  expect(mockReportFunction).not.toHaveBeenCalled();
});

/*
    Setting Report function is expected to be called on 'Error'.
*/
test('Report function to be called on Error', () => {
  const mockReportFunction = jest.fn(obj => obj);
  consoleConfig.setReportFn(mockReportFunction);
  consoleConfig.setDisableReport(false);
  consoleLogger.error(testName, testMsg, testData);
  expect(global.console.error).toHaveBeenCalled();
  expect(mockReportFunction).toHaveBeenCalled();
});

/*
    Setting Report function is not expected to be called in anything below 'Error' eg. 'Warn';
*/
test('Report function not to be called on Warn', () => {
  const mockReportFunction = jest.fn(obj => obj);
  consoleConfig.setReportFn(mockReportFunction);
  consoleConfig.setDisableReport(false);
  consoleLogger.info(testName, testMsg, testData);
  expect(global.console.info).toHaveBeenCalled();
  expect(mockReportFunction).not.toHaveBeenCalled();
});

/*
    If report level is set to 'Warn'
    Setting Report function is expected to be called in anything below 'Error' eg. 'Warn';
*/
test('Report function not to be called on Warn', () => {
  const mockReportFunction = jest.fn(obj => obj);
  consoleConfig.setReportFn(mockReportFunction);
  consoleConfig.setDisableReport(false);
  consoleConfig.setReportLevel(LogLevel.WARN);
  consoleLogger.info(testName, testMsg, testData);
  expect(global.console.info).toHaveBeenCalled();
  expect(mockReportFunction).not.toHaveBeenCalled();
});
