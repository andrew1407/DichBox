import { finished } from 'stream/promises';
import ILogger from '../../../logger/ILogger';
import Logger from '../../../logger/Logger';

export default class WrappedLogger extends Logger implements ILogger {
  static getStreamPath(): string|null {
    return Logger.writable?.path?.toString() || null;
  }

  // closes the stream and waits until all written entries are flushed
  static async flushWriteStream(): Promise<void> {
    const writable = Logger.writable;
    Logger.closeWriteStream();
    if (writable) await finished(writable).catch((): void => undefined);
  }
}
