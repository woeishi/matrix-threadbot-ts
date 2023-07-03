import { EventType, MatrixClient, Visibility } from "matrix-js-sdk";


export async function getDMRoomId(client: MatrixClient, userId?: string) {
  const dmRooms = client.getAccountData(EventType.Direct)?.getContent();
  if (!!dmRooms && userId) {
    if (!dmRooms[userId]) {
      const {room_id} =  await client.createRoom({visibility: Visibility.Private,invite: [userId],is_direct: true});
      dmRooms[userId] = room_id;
      client.setAccountData(EventType.Direct, dmRooms);
    }
    return dmRooms[userId];
  }
}