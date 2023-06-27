import { loadConfig } from "./config/load";
import { startBot } from "./threadbot";

async function main() {
  const config = loadConfig();
  const bot = await startBot(config);
}

main();