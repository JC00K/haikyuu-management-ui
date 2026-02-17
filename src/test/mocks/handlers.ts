import { http, HttpResponse } from "msw";
import type { PlayerDTO } from "@/types/dto/player.types";
import { Position } from "@/types/enums/position.enum";
import { Role } from "@/types/enums/role.enum";
import { Year } from "@/types/enums/year.enum";

const BASE_URL = "http://localhost:8080/api";

// Mock data
export const mockPlayers: PlayerDTO[] = [
  {
    id: 1,
    name: "Hinata Shoyo",
    height: 162,
    age: 16,
    year: Year.FIRST,
    role: Role.PLAYER,
    schoolId: 1,
    schoolName: "Karasuno",
    imgUrl: "https://example.com/hinata.jpg",
    position: Position.MIDDLE_BLOCKER,
    jerseyNumber: 10,
  },
  {
    id: 2,
    name: "Kageyama Tobio",
    height: 181,
    age: 16,
    year: Year.FIRST,
    role: Role.PLAYER,
    schoolId: 1,
    schoolName: "Karasuno",
    imgUrl: "https://example.com/kageyama.jpg",
    position: Position.SETTER,
    jerseyNumber: 9,
  },
  {
    id: 3,
    name: "Tsukishima Kei",
    height: 190,
    age: 16,
    year: Year.FIRST,
    role: Role.PLAYER,
    schoolId: 1,
    schoolName: "Karasuno",
    imgUrl: "https://example.com/tsukishima.jpg",
    position: Position.MIDDLE_BLOCKER,
    jerseyNumber: 11,
  },
];

export const handlers = [
  // GET all players
  http.get(`${BASE_URL}/v1/players`, () => {
    return HttpResponse.json(mockPlayers);
  }),

  // GET players by position
  http.get(`${BASE_URL}/v1/players/position/:position`, ({ params }) => {
    const position = params.position as string;
    const filtered = mockPlayers.filter((p) => p.position === position);
    return HttpResponse.json(filtered);
  }),

  // POST create player
  http.post(`${BASE_URL}/v1/players`, async ({ request }) => {
    const body = (await request.json()) as Partial<PlayerDTO>;
    const newPlayer: PlayerDTO = {
      id: 100,
      name: body.name ?? "",
      height: body.height ?? 0,
      age: body.age ?? 0,
      year: body.year ?? Year.FIRST,
      role: Role.PLAYER,
      schoolId: body.schoolId ?? 0,
      schoolName: "Karasuno",
      imgUrl: body.imgUrl ?? "",
      position: body.position ?? Position.NONE,
      jerseyNumber: body.jerseyNumber ?? 0,
    };
    return HttpResponse.json(newPlayer, { status: 201 });
  }),
];
