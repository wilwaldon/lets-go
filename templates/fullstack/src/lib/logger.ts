/**
 * Centralized logging utility
 *
 * Usage:
 * - logger.error('Something went wrong', error, { userId, action })
 * - logger.warn('Deprecated API used')
 * - logger.info('User signed in', { userId })
 * - logger.debug('State updated', state)
 *
 * In production, this can be connected to services like:
 * - Sentry for error tracking
 * - LogRocket for session replay
 * - DataDog for monitoring
 */

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDev = import.meta.env.DEV;
  private isProd = import.meta.env.PROD;

  /**
   * Log an error with context
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    console.error(`[ERROR] ${message}`, error, context);

    if (this.isProd) {
      // TODO: Send to error tracking service
      // Example with Sentry:
      // Sentry.captureException(error, {
      //   level: 'error',
      //   extra: { message, ...context },
      // });

      // Example with custom API:
      // this.sendToApi('error', message, error, context);
    }
  }

  /**
   * Log a warning
   */
  warn(message: string, context?: LogContext): void {
    console.warn(`[WARN] ${message}`, context);

    if (this.isProd) {
      // TODO: Send to logging service
    }
  }

  /**
   * Log info message (only in development)
   */
  info(message: string, context?: LogContext): void {
    if (this.isDev) {
      console.info(`[INFO] ${message}`, context);
    }
  }

  /**
   * Log debug message (only in development)
   */
  debug(message: string, data?: unknown): void {
    if (this.isDev) {
      console.debug(`[DEBUG] ${message}`, data);
    }
  }

  /**
   * Track user action/event
   */
  track(event: string, properties?: LogContext): void {
    this.debug(`Event: ${event}`, properties);

    if (this.isProd) {
      // TODO: Send to analytics service
      // Example with analytics:
      // analytics.track(event, properties);
    }
  }

  /**
   * Log performance metric
   */
  performance(metric: string, duration: number, context?: LogContext): void {
    this.debug(`Performance: ${metric} took ${duration}ms`, context);

    if (this.isProd && duration > 1000) {
      // Log slow operations
      this.warn(`Slow operation: ${metric} took ${duration}ms`, context);
    }
  }

  /**
   * Helper to measure async function performance
   */
  async measure<T>(
    label: string,
    fn: () => Promise<T>,
    context?: LogContext
  ): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;
      this.performance(label, duration, context);
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.error(`${label} failed after ${duration}ms`, error, context);
      throw error;
    }
  }
}

// Export singleton
export const logger = new Logger();

// Setup global error handlers
if (typeof window !== 'undefined') {
  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    logger.error('Unhandled promise rejection', event.reason, {
      promise: event.promise,
    });
  });

  // Catch global errors
  window.addEventListener('error', (event) => {
    logger.error('Global error', event.error, {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });
}
