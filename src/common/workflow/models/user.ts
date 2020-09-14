import { Discipline } from "./discipline";
import { Organization } from "./organization";
import { Project } from "./project";
import { Role } from "./role";

export interface User {
disciplines: Array<Discipline>;
email: string;
name: string;
organization: Organization;
password: string;
project: Project;
roles: Array<Role>;
}