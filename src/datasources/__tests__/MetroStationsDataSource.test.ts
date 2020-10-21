import DataSource from "../MetroStationsDataSource";
import { ApolloError, ValidationError } from "apollo-server-lambda";

const dataSource = new DataSource();

describe("MetroStationsDataSource", () => {
  process.env.TMB_API_APP_ID = "testAppId";
  process.env.TMB_API_APP_KEY = "testAppKey";
  const mockGet = jest.fn();

  //@ts-expect-error we are trying to mock a protected method, which is fine for our test purposes
  dataSource.get = mockGet;

  describe("[getAllStations]", () => {
    it("Correctly looks up the stations from the API", async () => {
      mockGet.mockReturnValueOnce(mockMetroStationsAPIResponse);

      const res = await dataSource.getAllStations();
      expect(res).toEqual(mockMetroStationsResponse);

      expect(mockGet).toBeCalledWith("estacions", {
        app_id: "testAppId",
        app_key: "testAppKey",
      });
    });
  });

  describe("[getStation]", () => {
    it("Throws a Validation Error if a falsy ID and name are passed as parameter", async () => {
      const res = await dataSource.getStation({ id: null, name: null });

      expect(res).toBeInstanceOf(ValidationError);
    });

    it("Throws a Not Found Error if the response does not contain features", async () => {
      mockGet.mockReturnValueOnce({ features: [] });
      const res = await dataSource.getStation({ id: 32 });

      expect(res).toBeInstanceOf(ApolloError);
    });

    it("Throws an Error if the features are null or undefined", async () => {
      mockGet.mockReturnValueOnce({ features: null });
      const res = await dataSource.getStation({ name: "Urwhatawave" });

      expect(res).toBeInstanceOf(ApolloError);
    });

    it("Correctly gets a station by ID", async () => {
      mockGet.mockReturnValueOnce({
        features: [mockMetroStationsAPIResponse.features[0]],
      });
      const res = await dataSource.getStation({ id: 32 });

      expect(res).toEqual(mockMetroStationsResponse.stations[0]);
      expect(mockGet).toBeCalledWith("estacions/32", {
        app_id: "testAppId",
        app_key: "testAppKey",
      });
    });

    it("Correctly gets a station by Name", async () => {
      mockGet.mockReturnValueOnce({
        features: [mockMetroStationsAPIResponse.features[0]],
      });
      const res = await dataSource.getStation({ name: "Urwhatawave" });

      expect(res).toEqual(mockMetroStationsResponse.stations[0]);
      expect(mockGet).toBeCalledWith("estacions", {
        app_id: "testAppId",
        app_key: "testAppKey",
        filter: "NOM_ESTACIO='Urwhatawave'",
      });
    });
  });

  it("[metroStationReducer]: Correctly parses an station API data to the schema format", () => {
    expect(
      dataSource.metroStationReducer(
        mockMetroStationsAPIResponse.features[0] as any
      )
    ).toEqual(mockMetroStationsResponse.stations[0]);
  });

  test.each([
    ["L1", ["L1"]],
    ["", []],
    ["L1L2", ["L1", "L2"]],
    ["L4L5L10N", ["L4", "L5", "L10N"]],
  ])(
    "[parseLines]: Parses the line string %p to be %p",
    (lineString, parsedLineString) => {
      expect(dataSource.parseLines(lineString)).toEqual(parsedLineString);
    }
  );
});

export const mockMetroStationsAPIResponse = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "ESTACIONS.6660935",
      geometry: {
        type: "Point",
        coordinates: [2.224737, 41.442817],
      },
      geometry_name: "GEOMETRY",
      properties: {
        CODI_GRUP_ESTACIO: 6660935,
        NOM_ESTACIO: "La Salut",
        PICTO: "L10N",
        DATA: "2020-10-18Z",
      },
    },
    {
      type: "Feature",
      id: "ESTACIONS.6660525",
      geometry: {
        type: "Point",
        coordinates: [2.181497, 41.41506],
      },
      geometry_name: "GEOMETRY",
      properties: {
        CODI_GRUP_ESTACIO: 6660525,
        NOM_ESTACIO: "Camp de l'Arpa",
        PICTO: "L5",
        DATA: "2020-10-18Z",
      },
    },
  ],
  totalFeatures: 135,
  numberMatched: 2,
  numberReturned: 2,
  timeStamp: "2020-10-19T06:44:29.076Z",
  crs: {
    type: "name",
    properties: {
      name: "urn:ogc:def:crs:EPSG::4326",
    },
  },
};

export const mockMetroStationsResponse = {
  numberOfStations: 2,
  stations: [
    {
      id: 6660935,
      lines: ["L10N"],
      location: {
        latitude: 41.442817,
        longitude: 2.224737,
      },
      name: "La Salut",
    },
    {
      id: 6660525,
      lines: ["L5"],
      location: {
        latitude: 41.41506,
        longitude: 2.181497,
      },
      name: "Camp de l'Arpa",
    },
  ],
};
