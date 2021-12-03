import {
  getClosestTmbStation,
} from "../getClosestStation";

import {
  mockMetroStationsAPIResponse,
  mockMetroStationsResponse,
} from "../../datasources/__fixtures__/MetroStationsFixtures";

const nullcoordinates = {
  latitude: null,
  longitude: null,
};

describe("getClosestStation", () => {
  describe("[getClosestTmbStation]", () => {
    test.each([
      [
        mockMetroStationsResponse[0].coordinates,
        mockMetroStationsAPIResponse.features[0],
      ],
      [
        mockMetroStationsResponse[1].coordinates,
        mockMetroStationsAPIResponse.features[1],
      ],
      [nullcoordinates, mockMetroStationsAPIResponse.features[0]],
    ])("Gets the closest metro station", (coordinates, closestStation) => {
      expect(
        getClosestTmbStation(mockMetroStationsAPIResponse.features, coordinates)
      ).toBe(closestStation);
    });
  });
});
