import { EventType, MatrixClient, RoomMemberEvent } from "matrix-js-sdk";

export function joinOnRoomInvite(client: MatrixClient) {
  client.on(RoomMemberEvent.Membership, async (event, member) => {
    if (member.membership === "invite") {
      if (member.userId === client.getUserId()) {
        const { joined_rooms } = await client.getJoinedRooms();
        if (!joined_rooms.includes(member.roomId)) {
          client.joinRoom(member.roomId).then(() => {
            console.log("Auto-joined %s", member.roomId);
          });
        }
      }
      // m.direct account data must be set for DMs
      // https://spec.matrix.org/v1.7/client-server-api/#client-behaviour-21
      if (event.getContent().is_direct) {
        let directEvent = client.getAccountData(EventType.Direct);
        let directData = directEvent?.getContent() ?? {};
        const otherId =
          member.userId === client.getUserId()
            ? event.getSender() ?? member.userId
            : member.userId;
        if (!directData[otherId]) {
          directData[otherId] = member.roomId;
          client.setAccountData(EventType.Direct, directData);
          console.log(`room ${member.roomId} marked as direct with ${otherId}`);
        }
      }
    }
  });
}
