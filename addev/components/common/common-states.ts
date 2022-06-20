import { makeVar } from "@apollo/client";
import { Company } from "./common-types";


export const rvCompanies = makeVar<Company[]>([])