import { createSpinner } from "nanospinner";

export interface ProgressStateLogger {
  start(text: string): void;

  stop(text: string): void;

  success(text: string): void;

  error(text: string): void;

  warn(text: string): void;
}

export const progressStateLogger = createProgressStateLogger();

export function createProgressStateLogger(): ProgressStateLogger {
  const spinner = createSpinner();

  return {
    start(text: string) {
      spinner.start({ text });
    },
    stop(text: string) {
      spinner.stop({ text });
    },
    success(text: string) {
      spinner.success({ text });
    },
    error(text: string) {
      spinner.error({ text });
      process.exit(1);
    },
    warn(text: string) {
      spinner.warn({ text });
    }
  };
}
