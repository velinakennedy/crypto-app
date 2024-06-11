import { ChartArea } from "chart.js";

const createGradient = (ctx: CanvasRenderingContext2D, area: ChartArea, color: string): CanvasGradient => {
    const colorStart = `rgba(${color}, 0.1)`;
    const colorMid = `rgba(${color}, 0.4)`;
    const colorEnd = `rgba(${color}, 0.7)`;
  
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(0.5, colorMid);
    gradient.addColorStop(1, colorEnd);
  
    return gradient;
};

export default createGradient;