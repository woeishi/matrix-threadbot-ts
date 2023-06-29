import { setMaxListeners } from "events";
import { loadConfig } from "./config/load";
import { startBot } from "./threadbot";

async function main() {
  // some but with thread implementation requires more listeners
  // https://github.com/matrix-org/matrix-js-sdk/issues/3463
  setMaxListeners(128);
  const config = loadConfig();
  const bot = await startBot(config);
}

main();