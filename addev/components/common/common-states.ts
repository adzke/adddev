import { makeVar } from "@apollo/client";
import { AuthorisedUser, Company, Contact } from "./common-types";


export const rvCompanies = makeVar<Company[]>([])

export const rvContacts = makeVar<Contact[]>([])

export const rvCurrentCompanyContacts = makeVar<Contact[]>([])

export const rvCurrentCompany = makeVar<Company | undefined>(undefined)

export const rvAuthorisedUser = makeVar<AuthorisedUser | undefined>(undefined)

export const rvShowHeaderPopover = makeVar<boolean>(false)




