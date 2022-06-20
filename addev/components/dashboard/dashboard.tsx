import { useReactiveVar } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { getAuthToken, getCompanies, getLoginToken, logOut, verifyAuthToken } from "../api_functions/api-functions"
import { rvAuthorisedUser, rvCompanies } from "../common/common-states"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Dashboard = () => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const companies = useReactiveVar(rvCompanies)
    const authorisedUser = useReactiveVar(rvAuthorisedUser)



    const clearFields = () => {
        setUsername('')
        setPassword('')
    }

    const logoutAPI = () => {
        if (authorisedUser) {
            logOut(authorisedUser)
        }
    }


    const Login = async () => {
        await getAuthToken(username, password)
        clearFields()

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {authorisedUser?.user &&
                    <View style={styles.row}>
                        <Text style={styles.text}>{authorisedUser?.user.username}</Text>
                        <TouchableOpacity style={styles.submitLogin} onPress={logoutAPI}>
                            <Text style={styles.text}>
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>

            <View style={styles.center}>
                <Text style={styles.textCenter}>Welcome to dashboard</Text>

                {authorisedUser?.user
                    ?
                    <View style={styles.row}>
                        {companies.map(company => (
                            <View style={styles.companies}>
                                <Text>{company.company_name}</Text>
                            </View>
                        ))}
                    </View>
                    :
                    <View>
                        <TextInput style={styles.textInput} placeholder={"Username"} onChangeText={setUsername} value={username} />
                        <TextInput secureTextEntry={true} style={styles.textInput} placeholder={"Password"} onChangeText={setPassword} value={password} />
                        <TouchableOpacity style={styles.submitLogin} onPress={Login}>
                            <Text>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textInput: {
        height: 30,
        width: 200,
        borderWidth: 1,
        marginVertical: 5,
    },
    submitLogin: {
        width: 100,
        height: 25,
        backgroundColor: '#FF530D',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        zIndex: 99
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#363432',
        height: 75,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: '15%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: 5,
    },
    companies: {
        width: 200,
        height: 200,
        backgroundColor: '#FF530D',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        margin: 5,
    },
    textCenter: {
    },
    text: {
        color: 'white',
        fontSize: 14,
    }
});
