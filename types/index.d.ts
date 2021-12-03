export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
}

/** Root Query */
export interface RootQueryType {
  __typename?: 'RootQuery';
  /** Information about the metro stations of the city of Barcelona */
  metroStations: Maybe<MetroStationConnectionType>;
  /** Returns the information about a metro station */
  metroStation: Maybe<MetroStationQueryResponseType>;
  /** Returns the information about a metro line */
  metroLine: Maybe<MetroLineQueryResponseType>;
  /** Information about the metro lines of the city of Barcelona */
  metroLines: Maybe<MetroLineConnectionType>;
  /** Returns the information about a bus stop */
  busStop: Maybe<BusStopQueryResponseType>;
  /** Information about the bus stops of the city of Barcelona */
  busStops: Maybe<BusStopConnectionType>;
  /** Returns the information about a bus line */
  busLine: Maybe<BusLineQueryResponseType>;
  /** Information about the bus lines of the city of Barcelona */
  busLines: Maybe<BusLineConnectionType>;
}


/** Root Query */
export interface RootQueryMetroStationsArgsType {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
  filterBy: Maybe<FilterByInputTmbType>;
}


/** Root Query */
export interface RootQueryMetroStationArgsType {
  findBy: FindByInputType;
}


/** Root Query */
export interface RootQueryMetroLineArgsType {
  findBy: FindByInputType;
}


/** Root Query */
export interface RootQueryMetroLinesArgsType {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
}


/** Root Query */
export interface RootQueryBusStopArgsType {
  findBy: FindByInputType;
}


/** Root Query */
export interface RootQueryBusStopsArgsType {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
  filterBy: Maybe<FilterByInputTmbType>;
}


/** Root Query */
export interface RootQueryBusLineArgsType {
  findBy: FindByInputType;
}


/** Root Query */
export interface RootQueryBusLinesArgsType {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
}

/** A connection to a list of items. */
export interface MetroStationConnectionType {
  __typename?: 'MetroStationConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfoType;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<MetroStationEdgeType>>>;
}

/** Information about pagination in a connection. */
export interface PageInfoType {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor: Maybe<Scalars['String']>;
}

/** An edge in a connection. */
export interface MetroStationEdgeType {
  __typename?: 'MetroStationEdge';
  /** The item at the end of the edge */
  node: Maybe<MetroStationType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
}

/** Metro station information */
export interface MetroStationType {
  __typename?: 'MetroStation';
  /** Unique ID of the station */
  id: Maybe<Scalars['ID']>;
  /** Name of the station */
  name: Maybe<Scalars['String']>;
  /** Location coordinates of the station */
  coordinates: Maybe<CoordinatesOutputType>;
  /** Lines the station belongs to e.g. L1, L2 */
  lines: Maybe<Array<Maybe<Scalars['String']>>>;
}

/** Coordinates (Latitude, Longitude, Altitude), of a given station/stop */
export interface CoordinatesOutputType {
  __typename?: 'CoordinatesOutput';
  latitude: Maybe<Scalars['Float']>;
  longitude: Maybe<Scalars['Float']>;
  altitude: Maybe<Scalars['Float']>;
}

/** Input for the filterBy argument of the metro and bus queries, which allows filtering a connection by some parameters (e.g. lineName or lineId) */
export interface FilterByInputTmbType {
  lineId: Maybe<Scalars['Int']>;
  lineName: Maybe<Scalars['String']>;
}

export type MetroStationQueryResponseType = MetroStationType | NotFoundErrorType;

export interface NotFoundErrorType {
  __typename?: 'NotFoundError';
  /** Search params that resulted in a not found error */
  params: Maybe<Scalars['JSON']>;
}


/** Input for the FindBy argument of the queries, which allows finding an entity by some parameters (e.g. name or id) */
export interface FindByInputType {
  id: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
  /** Finds the closest station given some coordinates */
  closest: Maybe<CoordinatesInputType>;
}

/** Coordinates (Latitude, Longitude, Altitude), of a given station/stop */
export interface CoordinatesInputType {
  latitude: Maybe<Scalars['Float']>;
  longitude: Maybe<Scalars['Float']>;
  altitude: Maybe<Scalars['Float']>;
}

export type MetroLineQueryResponseType = MetroLineType | NotFoundErrorType;

/** Metro line information */
export interface MetroLineType {
  __typename?: 'MetroLine';
  /** Numeric Code of the line */
  id: Maybe<Scalars['Int']>;
  /** Name of the line */
  name: Maybe<Scalars['String']>;
  /** Origin station of the line */
  originStation: Maybe<MetroStationType>;
  /** Ending station of the line */
  endingStation: Maybe<MetroStationType>;
  /** Stations of the line */
  stations: Maybe<MetroStationConnectionType>;
  /** Color of the line represented as a Hexadecimal string */
  color: Maybe<Scalars['String']>;
}


/** Metro line information */
export interface MetroLineStationsArgsType {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
}

/** A connection to a list of items. */
export interface MetroLineConnectionType {
  __typename?: 'MetroLineConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfoType;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<MetroLineEdgeType>>>;
}

/** An edge in a connection. */
export interface MetroLineEdgeType {
  __typename?: 'MetroLineEdge';
  /** The item at the end of the edge */
  node: Maybe<MetroLineType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
}

export type BusStopQueryResponseType = BusStopType | NotFoundErrorType;

/** Bus stop information */
export interface BusStopType {
  __typename?: 'BusStop';
  /** Unique ID of the stop */
  id: Maybe<Scalars['ID']>;
  /** Name of the stop */
  name: Maybe<Scalars['String']>;
  /** Location of the stop */
  location: Maybe<LocationType>;
}

/** Location of a stop/station */
export interface LocationType {
  __typename?: 'Location';
  address: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  district: Maybe<Scalars['String']>;
  street: Maybe<Scalars['String']>;
  coordinates: Maybe<CoordinatesOutputType>;
}

/** A connection to a list of items. */
export interface BusStopConnectionType {
  __typename?: 'BusStopConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfoType;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<BusStopEdgeType>>>;
}

/** An edge in a connection. */
export interface BusStopEdgeType {
  __typename?: 'BusStopEdge';
  /** The item at the end of the edge */
  node: Maybe<BusStopType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
}

export type BusLineQueryResponseType = BusLineType | NotFoundErrorType;

/** Bus line information */
export interface BusLineType {
  __typename?: 'BusLine';
  /** Numeric Code of the line */
  id: Maybe<Scalars['Int']>;
  /** Name of the line */
  name: Maybe<Scalars['String']>;
  /** Origin stop of the line */
  originStop: Maybe<BusStopType>;
  /** Ending stop of the line */
  endingStop: Maybe<BusStopType>;
  /** Stops of the line */
  stops: Maybe<BusStopConnectionType>;
  /** Color of the line represented as a Hexadecimal string */
  color: Maybe<Scalars['String']>;
}


/** Bus line information */
export interface BusLineStopsArgsType {
  after: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  before: Maybe<Scalars['String']>;
  last: Maybe<Scalars['Int']>;
}

/** A connection to a list of items. */
export interface BusLineConnectionType {
  __typename?: 'BusLineConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfoType;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<BusLineEdgeType>>>;
}

/** An edge in a connection. */
export interface BusLineEdgeType {
  __typename?: 'BusLineEdge';
  /** The item at the end of the edge */
  node: Maybe<BusLineType>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
}
