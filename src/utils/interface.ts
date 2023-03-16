export interface ICommon {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  token: string;
}

export interface IPosition {
  lat: number;
  lng: number;
}
interface Location {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    location_type: string;
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  place_id: string;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  types: string[];
}

export interface IFood extends ICommon {
  user: UserData;
  location: Location;
  foodDescription: {
    title: string;
    image: string;
    foodType: string;
    packaging: boolean;
    foodPreprationTime: Date;
    shortDescription: string;
  };
}
