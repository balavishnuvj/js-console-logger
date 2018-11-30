import consoleLogger from '../index';
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

// run your code

test('With Defaut Config Debug', () => {
  consoleLogger.debug(testName, testMsg, testData);
  expect(global.console.debug).not.toHaveBeenCalled();
});

test('With Defaut Config Error', () => {
  consoleLogger.error(testName, testMsg, testData);
  expect(global.console.error).toHaveBeenCalled();
});

test('With Defaut Config Info', () => {
  consoleLogger.info(testName, testMsg, testData);
  expect(global.console.info).toHaveBeenCalled();
});

test('With Defaut Config Trace', () => {
  consoleLogger.trace(testName, testMsg, testData);
  expect(global.console.trace).not.toHaveBeenCalled();
});

test('With Defaut Config Warn', () => {
  consoleLogger.warn(testName, testMsg, testData);
  expect(global.console.warn).toHaveBeenCalled();
});
