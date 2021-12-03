import getDistance from "geolib/es/getDistance";
import type { CoordinatesInputType } from "../../types";

import type { BusStopAPIType } from "../datasources/BusDataSource";
import type { MetroStationAPIType } from "../datasources/MetroDataSource";

type StationAPITypes = MetroStationAPIType | BusStopAPIType;
interface IStationDistanceInfo<T> {
  station: T;
  distance: number | null;
}

export const getClosestTmbStation = <T extends StationAPITypes>(
  stations: ReadonlyArray<T>,
  closest: CoordinatesInputType
): T => {
  const initValue: IStationDistanceInfo<T> = {
    station: stations[0],
    distance: null,
  };

  return stations.reduce(
    (
      closestStation: IStationDistanceInfo<T>,
      station: T
    ): IStationDistanceInfo<T> => {
      try {
        const coordinates = {
          longitude: station?.geometry.coordinates[0] ?? null,
          latitude: station?.geometry.coordinates[1] ?? null,
        };

        const distance = getDistance(coordinates as any, closest as any);
        if (
          closestStation.distance === null ||
          distance < Number(closestStation.distance)
        ) {
          return { station, distance };
        }
      } catch (error) {
        return closestStation;
      }

      return closestStation;
    },
    initValue
  ).station;
};
