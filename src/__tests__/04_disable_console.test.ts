import consoleLogger, { consoleConfig } from '../index';

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
    Console logs are expected not be called if Console is disabled
*/
consoleConfig.setDisableConsole(true);

test('Console log is not expected to be called on Debug', () => {
  consoleLogger.debug(testName, testMsg, testData);
  expect(global.console.debug).not.toHaveBeenCalled();
});

test('Console log is not expected to be called on Error', () => {
  consoleLogger.error(testName, testMsg, testData);
  expect(global.console.error).not.toHaveBeenCalled();
});

test('Console log is not expected to be called on Info', () => {
  consoleLogger.info(testName, testMsg, testData);
  expect(global.console.info).not.toHaveBeenCalled();
});

test('Console log is not expected to be called on Trace', () => {
  consoleLogger.trace(testName, testMsg, testData);
  expect(global.console.trace).not.toHaveBeenCalled();
});

test('With Defaut Config Warn', () => {
  consoleLogger.warn(testName, testMsg, testData);
  expect(global.console.warn).not.toHaveBeenCalled();
});
