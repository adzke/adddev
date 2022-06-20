import { useReactiveVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { rvAuthorisedUser, rvCompanies } from "../common/common-states";
import { AuthorisedUser, Company } from "../common/common-types";


const apiUrl = 'http://127.0.0.1:8000/api/companies/'
const apiCompanyUrl = 'http://127.0.0.1:8000/api/companies/'
const loginAPI = 'http://127.0.0.1:8000/api/auth/login'
const verifyTokenAPI = 'http://127.0.0.1:8000/api/auth/user'
const logoutAPI = 'http://127.0.0.1:8000/api/auth/logout'
const storageKey = 'AuthorisedUser'

export const getCompanies = async (authorisedUser: AuthorisedUser) => {
    try {
        // 👇️ const response: Response
        const response = await fetch(apiCompanyUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${authorisedUser?.token}`
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

export const getAuthToken = async (username: string, password: string) => {

    const userObject = {
        username: username,
        password: password
    }

    try {

        // 👇️ const response: Response
        const response = await fetch(loginAPI, {
            method: 'POST',
            body: JSON.stringify(userObject),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        // 👇️ const result: CreateUserResponse
        const result = (await response.json()) as AuthorisedUser;

        await storeLoginToken(result)
        rvAuthorisedUser(result)
        return result
    }
    catch (error) {
        if (error instanceof Error) {

            console.log('error message: ', error.message);

            return {
                errorMessage: error.message,
                postSucessful: false
            }

        } else {

            console.log('unexpected error: ', error);
            return {
                errorMessage: 'An unexpected error occurred',
                postSucessful: false
            }

        }


    }

}

export const verifyAuthToken = async (authorisedUser: AuthorisedUser) => {


    try {

        // 👇️ const response: Response
        const response = await fetch(verifyTokenAPI, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Token ${authorisedUser?.token}`
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        // 👇️ const result: CreateUserResponse
        const result = (await response.json()) as AuthorisedUser;


        return result
    }
    catch (error) {
        if (error instanceof Error) {

            console.log('error message: ', error.message);

            return {
                errorMessage: error.message,
                postSucessful: false
            }

        } else {

            console.log('unexpected error: ', error);
            return {
                errorMessage: 'An unexpected error occurred',
                postSucessful: false
            }

        }


    }

}

export const logOut = async (authorisedUser: AuthorisedUser) => {


    try {

        // 👇️ const response: Response
        const response = await fetch(logoutAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Token ${authorisedUser?.token}`
            },
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        // 👇️ const result: CreateUserResponse
        await tokenVerifyorRemove(authorisedUser)

        return true
    }
    catch (error) {
        if (error instanceof Error) {

            console.log('error message: ', error.message);

            return {
                errorMessage: error.message,
                postSucessful: false
            }

        } else {

            console.log('unexpected error: ', error);
            return {
                errorMessage: 'An unexpected error occurred',
                postSucessful: false
            }

        }


    }

}

export const storeLoginToken = async (user: AuthorisedUser) => {
    try {
      const jsonValue = JSON.stringify(user)
      await AsyncStorage.setItem(storageKey, jsonValue)
    } catch (e) {
      // saving error
    }
  }

export const getLoginToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(storageKey)
      rvAuthorisedUser(JSON.parse(jsonValue!))
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }


export const tokenVerifyorRemove = async (authorisedUser: AuthorisedUser) => {

    const result = await verifyAuthToken(authorisedUser)
    if(result.username === authorisedUser.user.username){
        return true
    }
    removeToken()
    rvAuthorisedUser(undefined)
    return false
}

const removeToken = async () => {
    try {
      await AsyncStorage.removeItem(storageKey)
    } catch(e) {
      // remove error
    }

  }
  
