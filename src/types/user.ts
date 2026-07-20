export type UserRole = "admin" | "moderator" | "user";

export type UserGender = "male" | "female";

export type UserAddress = {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: UserGender;
  email: string;
  phone: string;
  image: string;
  role: UserRole;
  address: UserAddress;
};

export type UsersResponse = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};