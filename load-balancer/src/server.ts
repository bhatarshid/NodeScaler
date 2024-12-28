import { exec } from "child_process";
import { INSTANCES } from "./index.js";

const SERVER_PATH = '../server/dist/index.js';

export function startNewInstance () {
  const port = Number(process.env.PORT) + INSTANCES.length + 1;
  const newInstance = exec(`node ${SERVER_PATH} ${port}`, (error, stdout, stderr) => {
      if (error) {
          console.error(`Error starting new instance: ${error.message}`);
          return;
      }
      if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
  });

  INSTANCES.push({ port, pid: newInstance.pid });
  console.log({INSTANCES})
}

export function terminateInstance (pid: number): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(`kill -SIGTERM ${pid}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error stopping server with PID ${pid}:`, error);
        reject(error);
      } else {
        console.log(`Server with PID ${pid} stopped.`);
        resolve();
      }
    });
  });
}