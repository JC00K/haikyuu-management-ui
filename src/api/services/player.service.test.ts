import { playerService } from "./player.service";
import { mockPlayers } from "@/test/mocks/handlers";
import { Position } from "@/types/enums/position.enum";

describe("playerService", () => {
  describe("getAllPlayers", () => {
    it("returns all players", async () => {
      const players = await playerService.getAllPlayers();
      expect(players).toHaveLength(mockPlayers.length);
      expect(players[0].name).toBe("Hinata Shoyo");
      expect(players[1].name).toBe("Kageyama Tobio");
    });
  });

  describe("getByPosition", () => {
    it("returns players filtered by position", async () => {
      const players = await playerService.getByPosition(
        Position.MIDDLE_BLOCKER,
      );
      expect(players.length).toBeGreaterThan(0);
      players.forEach((p) => {
        expect(p.position).toBe(Position.MIDDLE_BLOCKER);
      });
    });

    it("returns empty array for position with no players", async () => {
      const players = await playerService.getByPosition(Position.LIBERO);
      expect(players).toHaveLength(0);
    });
  });

  describe("createPlayer", () => {
    it("creates a new player and returns it", async () => {
      const newPlayer = await playerService.createPlayer({
        name: "Nishinoya Yu",
        height: 160,
        age: 17,
        year: "SECOND" as never,
        schoolId: 1,
        imgUrl: "https://example.com/nishinoya.jpg",
        position: Position.LIBERO,
        jerseyNumber: 4,
      });

      expect(newPlayer.id).toBe(100);
      expect(newPlayer.name).toBe("Nishinoya Yu");
    });
  });
});
