import { MatrixClient, Room } from "matrix-js-sdk";

export async function tryJoinConfiguredRooms(
  client: MatrixClient,
  rooms: string[]
) {
  return Object.fromEntries(
    await Promise.all(
      rooms.map((room) =>
        client
          .joinRoom(room)
          .then<[string, Room | null]>((res) => [room, res])
          .catch<[string, Room | null]>((err) => {
            console.error(err);
            return [room, null];
          })
      )
    )
  );
}
