# js-console-logger

A configurable, lightweight, opinionated JavaScript logger.

Defined log levels are trace, debug, info, warn and error.
## Installation
```bash
    npm i js-console-logger --save
```

## Usage
```js
    import 'js-console-logger';
```
## Examples
Usage is very similar to `console` object.

NOTE: consoleLevel is set to `trace`.
```js
    logger.trace('Network', 'API is not reposding', { url: 'www.google.com', ua: 'bot' });
    logger.debug('Network', 'API is not reposding', { url: 'www.google.com', ua: 'bot' });
    logger.info('Network', 'API is not reposding', { url: 'www.google.com', ua: 'bot' });
    logger.warn('Network', 'API is not reposding', { url: 'www.google.com', ua: 'bot' });
    logger.error('Network', 'API is not reposding', { url: 'www.google.com', ua: 'bot' });
```

![demo screenshot](https://github.com/balavishnuvj/js-console-logger/blob/master/assets/screenshot_1.png)

## Configure example
Default configuration is good enough to start. But you can configure few options

```js
    import { consoleConfig } from 'js-console-logger';
    // import { LogLevel } from 'js-console-logger/lib/types';

    const isProd = process.env.NODE_ENV === 'production';

    consoleConfig.setDisableConsole(isProd); // default false

    consoleConfig.setConsoleLevel('info');
    // default info, Use types in TS.

    consoleConfig.setDisableReport(!isProd); //

    consoleConfig.setReportFn((obj) => {
        // report it to somewhere, call api etc.
    });

    consoleConfig.setReportLevel('error');
    // default error, Use types in TS.
```

## To dispatch an action on report.
```js
    import { consoleConfig } from 'js-console-logger';
    import store from '../utils/store';
    import { reportLog } from '../containers/App/actions';

    const reportFn = (obj) => {
        store.dispatch(reportLog(obj));
    };

    consoleConfig.setReportFn(reportFn);
```