import { useReactiveVar } from "@apollo/client"
import React, { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native"
import { getAuthToken, logOut } from "../api_functions/api-functions"
import { rvAuthorisedUser, rvCompanies, rvCurrentCompany, rvCurrentCompanyContacts} from "../common/common-states"
import { AntDesign } from '@expo/vector-icons';
import { Company } from "../common/common-types"


export const Dashboard = () => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const companies = useReactiveVar(rvCompanies)
    const currentCompany = useReactiveVar(rvCurrentCompany)
    const authorisedUser = useReactiveVar(rvAuthorisedUser)
    const [dropDownCompanies, setDropDownCompanies] = useState<boolean>(false)
    const currentContacts = useReactiveVar(rvCurrentCompanyContacts)

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

    const setCurrentCompany = (company: Company) => {
        rvCurrentCompany(company)
        setDropDownCompanies(false)
    }

    const Popover = () => {
        return (
            <View style={styles.popover} >
                <ScrollView >
                    {companies.map(company => (
                        <TouchableOpacity style={styles.company} onPress={() => setCurrentCompany(company)}>
                            <Text style={styles.text}>
                                {company.company_name}
                            </Text>
                        </TouchableOpacity>

                    ))}
                </ScrollView>
            </View>
        )
    }



    return (
        <View style={styles.container}>

            {dropDownCompanies && <Popover />}
            <View style={styles.header}>
                <View style={styles.leftHeader}>
                    {authorisedUser?.user &&
                        <View style={styles.rowHeader}>
                            <TouchableOpacity style={styles.company} onPress={() => setDropDownCompanies(!dropDownCompanies)}>
                                <Text style={styles.text}>
                                    {currentCompany?.company_name}
                                </Text>
                                <AntDesign name="caretdown" size={15} color="white" style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
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

                {authorisedUser?.user
                    ?
                    <View>
                        <Text style={styles.title}>
                            Business apps
                        </Text>
                        <View style={styles.spacer} />
                        <View style={styles.businessApp}>
                            <Text style={styles.text}>
                                CRM
                            </Text>
                            <Text>
                                {currentContacts.map(contact => (
                                    contact.contact_name
                                ))}
                            </Text>
                        </View>
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
    leftHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 1,
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
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: 5,
    },
    rowHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    company: {
        width: 100,
        height: 35,
        flexDirection: 'row',
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
    },
    icon: {
        paddingLeft: 5,
    },
    popover: {
        backgroundColor: '#363432',
        width: 200,
        height: 200,
        zIndex: 99,
        position: 'absolute',
        top: 75,
        left: 5,


    },
    containingStyle: {
        flex: 1,
        width: '100%',
    },
    title: {
        color: '#363432',
        fontSize: 20,
    },
    businessApp: {
        width: 100,
        height: 100,
        backgroundColor: '#FF530D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spacer: {
        width: '100%',
        height: 25,
    }
});
