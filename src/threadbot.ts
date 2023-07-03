import { ClientEvent, MatrixClient, createClient } from "matrix-js-sdk";
import { SyncState } from "matrix-js-sdk/lib/sync";
import { Config } from "./config/types";
import { joinOnRoomInvite } from "./joinOnRoomInvite";
import { catchUpMention } from "./catchUpMention";
import { listenNewMention } from "./listenNewMention";
import { tryJoinConfiguredRooms } from "./tryJoinConfiguredRooms";

export async function startBot({ baseUrl, userId, password, rooms }: Config) {

  let clientIsPrepared = false;
  let resolveClientInit = (value: MatrixClient) => {};
  const clientStartedPromise = new Promise<MatrixClient>((resolve) => {
    resolveClientInit = resolve;
  });

  const client = createClient({
    baseUrl,
    timelineSupport: true
  });

  client.on(ClientEvent.Sync, async (state) => {
    switch (state) {
      case SyncState.Prepared:
        if (!clientIsPrepared) {
          clientIsPrepared = true;
          console.log("client prepared");
          // catch up
          await catchUpMention(client);
          console.log("bot caught up");
          // attach listeners
          listenNewMention(client);
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
  await tryJoinConfiguredRooms(client, rooms);
  await clientStartedPromise;

  return client;
}
