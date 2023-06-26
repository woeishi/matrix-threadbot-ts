import { MatrixClient, RoomMemberEvent } from "matrix-js-sdk";

export function joinOnRoomInvite(client: MatrixClient) {
  client.on(RoomMemberEvent.Membership, async (event, member) => {
    if (member.membership === "invite" && member.userId === client.getUserId()) {
      const { joined_rooms } = await client.getJoinedRooms();
      if (!joined_rooms.includes(member.roomId)) {
        client.joinRoom(member.roomId).then(() => {
          console.log("Auto-joined %s", member.roomId);
        });
      }
    }
  });
}
