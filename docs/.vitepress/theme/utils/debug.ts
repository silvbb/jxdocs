const DEBUG = true; // 可以通过这个开关统一控制日志输出

export const debug = {
  log: (...args: any[]) => {
    if (DEBUG) {
      console.log("[Debug]", ...args);
    }
  },

  warn: (...args: any[]) => {
    if (DEBUG) {
      console.warn("[Warn]", ...args);
    }
  },

  error: (...args: any[]) => {
    if (DEBUG) {
      console.error("[Error]", ...args);
    }
  },

  group: (label: string, ...args: any[]) => {
    if (DEBUG) {
      console.group(`[${label}]`);
      console.log(...args);
      console.groupEnd();
    }
  },
};
