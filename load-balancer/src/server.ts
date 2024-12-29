import { ChildProcess, spawn } from "child_process";
import { INSTANCES } from "./index.js";

const SERVER_PATH = '../server/dist/index.js';

export function startNewInstance () {
  const port = Number(process.env.PORT) + INSTANCES.length + 1;
  const newInstance: ChildProcess = spawn('node', [SERVER_PATH, port.toString()]);

  newInstance.stdout?.on('data', (data) => {
    console.log(`stdout: ${data}`);
    INSTANCES.push({ port, child: newInstance });
    console.log({INSTANCES})
  });
  newInstance.stderr?.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  newInstance.on('error', (error) => {
    console.error(`Error starting new instance: ${error.message}`);
  }); 
}

export function terminateInstance (instance: ChildProcess) {
  if (instance && !instance.killed) {
    instance.kill('SIGTERM')

    // Wait for the process to exit, or force kill if it doesn't exit in time
    setTimeout(() => {
      if (!instance.killed) {
        instance.kill('SIGKILL'); // Force kill if SIGTERM didn't work
      }
      console.log({INSTANCES})
    }, 5000);
  } else {
    console.log("The instance was either not running or already killed");
  }
}