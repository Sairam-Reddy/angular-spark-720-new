import { User } from "./user";

export interface Role {
  name: string;
  users: Array<User>;
}
