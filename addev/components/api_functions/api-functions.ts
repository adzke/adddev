import { rvCompanies } from "../common/common-states";
import { Company } from "../common/common-types";


const apiUrl = 'http://127.0.0.1:8000/api/companies/'
const apiCompanyUrl = 'http://127.0.0.1:8000/api/companies/'



export const getStories = async () => {
    try {
        // 👇️ const response: Response
        const response = await fetch(apiCompanyUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        // 👇️ const result: GetUsersResponse
        const result = (await response.json()) as Company[];
        rvCompanies(result)

    }
    catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }

}