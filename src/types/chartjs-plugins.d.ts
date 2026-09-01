import { ChartTypeRegistry } from 'chart.js';

export interface ExportBackgroundOptions {
  color?: string;
  exporting?: boolean;
}

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends keyof ChartTypeRegistry> {
    exportBackground?: ExportBackgroundOptions;
  }
}