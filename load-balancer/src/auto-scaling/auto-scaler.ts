import cron from "node-cron";
import { INSTANCES } from "../index.js";
import { startNewInstance, terminateInstance } from "../server.js";
import { checkCPUUsage } from "./cpu-monitor.js";

const SCALE_UP_THRESHOLD  = 45;
const SCALE_DOWN_THRESHOLD = 20;
const MAX_SERVERS = 5;

function scalingDecision() {
  const cpuUsage = checkCPUUsage();

  if (cpuUsage > SCALE_UP_THRESHOLD && INSTANCES.length < MAX_SERVERS) {
    startNewInstance()
  }
  else if (cpuUsage < SCALE_DOWN_THRESHOLD && INSTANCES.length > 1) {
    const instance = INSTANCES.pop();
    if (instance && instance.child) {
      setTimeout(() => {
        terminateInstance(instance.child);
      }, 5000);
    }
  }
}

// run cpu monitoring and scaling decision every 5 seconds
cron.schedule('*/5 * * * * *', () => {
  scalingDecision();
});