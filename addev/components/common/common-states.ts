import { makeVar } from "@apollo/client";
import { AuthorisedUser, Company } from "./common-types";


export const rvCompanies = makeVar<Company[]>([])

export const rvAuthorisedUser = makeVar<AuthorisedUser | undefined>(undefined)


