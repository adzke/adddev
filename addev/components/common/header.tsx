import { useReactiveVar } from "@apollo/client"
import React from "react"
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native"
import { rvAuthorisedUser, rvCompanies, rvCurrentCompany, rvShowHeaderPopover } from "./common-states"
import { AntDesign } from '@expo/vector-icons';
import { logOut } from "../api_functions/api-functions"
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { HeaderPopover } from "./header-popover";

export const Header = ({ navigation: { navigate} }: NativeStackHeaderProps) => {

    const showHeaderPopover = useReactiveVar(rvShowHeaderPopover)
    const currentCompany = useReactiveVar(rvCurrentCompany)
    const authorisedUser = useReactiveVar(rvAuthorisedUser)


    const logoutAPI = () => {
        if (authorisedUser) {
            logOut(authorisedUser)
        }
    }

    const navigatehome = () => {
        navigate('Dashboard')
    }

    const navigateToApps = () => {
        navigate('Apps')
    }



    


    return (
        <View>
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../assets/images/ADdev-logo.svg')} />
                </View>
                {showHeaderPopover && <HeaderPopover />}
                <View style={styles.leftHeader}>

                </View>
                {authorisedUser?.user &&
                    <View style={styles.row}>
                        <Text style={styles.text}>Welcome, {authorisedUser?.user.username}</Text>
                        <View style={styles.rowHeader}>
                            {/* <AntDesign name="home" size={30} color="#FF530D" /> */}
                            {/* <TouchableOpacity style={styles.company} onPress={() => rvShowHeaderPopover(!showHeaderPopover)}>
                            <Text style={styles.text}>
                                {currentCompany?.company_name}
                            </Text>
                            <AntDesign name="caretdown" size={15} color="white" style={styles.icon} />
                        </TouchableOpacity> */}
                        </View>
                        <TouchableOpacity style={styles.submitLogin} onPress={logoutAPI}>
                            <Text style={styles.text}>
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                }

            </View>
            <View style={styles.belowHeader}>
                <TouchableOpacity onPress={navigatehome}>
                    <Text style={styles.secondHeaderText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToApps}>
                    <Text style={styles.secondHeaderText}>Apps</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.secondHeaderText}>Companies</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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

    leftHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 1,
    },
    submitLogin: {
        width: 100,
        height: 35,
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
    text: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center'
    },
    icon: {
        paddingLeft: 5,
    },
    logo: {
        width: 125,
        height: 25,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    belowHeader: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
    },
    secondHeaderText: {
        fontSize: 18,
        marginHorizontal: 10,
        fontWeight: '300',
        }
});