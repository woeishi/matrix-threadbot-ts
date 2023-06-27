import { ClientEvent, MatrixClient, createClient } from "matrix-js-sdk";
import { SyncState } from "matrix-js-sdk/lib/sync";
import { Config } from "./config/types";
import { joinOnRoomInvite } from "./joinOnRoomInvite";

export async function startBot({ baseUrl, userId, password }: Config) {

  let clientIsPrepared = false;
  let resolveClientInit = (value: MatrixClient) => {};
  const clientStartedPromise = new Promise<MatrixClient>((resolve) => {
    resolveClientInit = resolve;
  });

  const client = createClient({
    baseUrl,
    timelineSupport: true
  });

  client.on(ClientEvent.Sync, (state) => {
    switch (state) {
      case SyncState.Prepared:
        if (!clientIsPrepared) {
          clientIsPrepared = true;
          console.log("client prepared");
          // catch up
          console.log("bot caught up");
          // attach listeners
          console.log("bot active");
          resolveClientInit(client);
        }
        break;
    }
  });

  joinOnRoomInvite(client);
  
  await client.loginWithPassword(userId, password);
  await client.startClient({
    disablePresence: true,
    threadSupport: true,
  });

  return clientStartedPromise;
}
