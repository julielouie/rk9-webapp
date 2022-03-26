/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
export const LEVEL_ERROR = 'error';
export const LEVEL_WARN = 'warn';
export const LEVEL_INFO = 'info';
export const LEVEL_DEBUG = 'debug';

type LevelTypes = typeof LEVEL_ERROR | typeof LEVEL_WARN | typeof LEVEL_INFO | typeof LEVEL_DEBUG;

export const LogError = (level: LevelTypes, error: any, source: string, body: any = null): void => {
  try {
    let errorMessage = `${error.message} from: ${source}`;
    if (body) errorMessage += `${JSON.stringify(body)}`;

    const errorToLog = { level, data: errorMessage };
    console.log(errorToLog);
  } catch (err) {
    console.log(err);
  }
};
