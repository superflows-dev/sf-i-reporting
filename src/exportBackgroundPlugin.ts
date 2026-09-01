import { Plugin } from 'chart.js';
import { ExportBackgroundOptions } from './types/chartjs-plugins'; // adjust path

export const exportBackgroundPlugin: Plugin = {
  id: 'exportBackground',

  beforeDraw: (chart, _args, options?: ExportBackgroundOptions) => {
    if (!options?.exporting) return;

    const { ctx, width, height } = chart;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color || '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }
};