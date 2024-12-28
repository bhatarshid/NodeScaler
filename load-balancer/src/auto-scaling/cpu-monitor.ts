import os from 'os';

function getCPUUsage() {
  const cpus = os.cpus();
  let user = 0;
  let nice = 0;
  let sys = 0;
  let idle = 0;
  let irq = 0;

  for (let cpu of cpus) {
    user += cpu.times.user;
    nice += cpu.times.nice;
    sys += cpu.times.sys;
    idle += cpu.times.idle;
    irq += cpu.times.irq;
  }

  const total = user + nice + sys + idle + irq;

  return {
    idle: idle/cpus.length,
    total: total/cpus.length
  }
}

function calculateCPUPercentage(start: any, end: any) {
  const idleDiff = end.idle - start.idle;
  const totalDiff = end.total - start.total;

  return (1 - idleDiff / totalDiff) * 100;
}

let startMeasure = getCPUUsage();

export function checkCPUUsage() {
  const endMeasure = getCPUUsage();
  const cpuPercentage = calculateCPUPercentage(startMeasure, endMeasure);
  startMeasure = endMeasure;

  console.log(`CPU Usage: ${cpuPercentage.toFixed(2)}%`);

  return cpuPercentage;
}