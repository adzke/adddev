import React, { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { getAuthToken } from "../api_functions/api-functions"
import { StackScreenProps } from '@react-navigation/stack'
import { addevBlack, addevOrange, defaultWhite } from "../common/common-colours"


export const Login = ({ navigation: { navigate } }: StackScreenProps<ADDevParamList, 'Login'>) => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')


    const clearFields = () => {
        setUsername('')
        setPassword('')
    }


    const Login = async () => {
        await getAuthToken(username, password)
        clearFields()

    }

    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <View>
                    <TextInput style={styles.textInput} placeholder={"Username"} onChangeText={setUsername} value={username} />
                    <TextInput secureTextEntry={true} style={styles.textInput} placeholder={"Password"} onChangeText={setPassword} value={password} />
                    <TouchableOpacity style={styles.submitLogin} onPress={Login}>
                        <Text>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defaultWhite,
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
        backgroundColor: addevOrange,
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
        backgroundColor: addevBlack,
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
        backgroundColor: addevOrange,
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
        backgroundColor: addevBlack,
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
        color: addevBlack,
        fontSize: 20,
    },
    businessApp: {
        width: 100,
        height: 100,
        backgroundColor: addevOrange,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    spacer: {
        width: '100%',
        height: 25,
    },
    businessAppsRow: {
        flexDirection: 'row',
    }
});
