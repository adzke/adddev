import { useReactiveVar } from "@apollo/client"
import React, { useState } from "react"
import { View, ScrollView, TouchableOpacity, StyleSheet, Text} from "react-native"
import { rvCompanies, rvCurrentCompany, rvShowHeaderPopover } from "./common-states"
import { Company } from "./common-types"

export const HeaderPopover = () => {
    const companies = useReactiveVar(rvCompanies)
    const showHeaderPopover = useReactiveVar(rvShowHeaderPopover)
    const setCurrentCompany = (company: Company) => {
        rvCurrentCompany(company)
        rvShowHeaderPopover(!showHeaderPopover)
    }
    
    return (
        <View style={styles.popover} >
            <ScrollView >
                {companies.map(company => (
                    <TouchableOpacity key={company.id} style={styles.company} onPress={() => setCurrentCompany(company)}>
                        <Text style={styles.text}>
                            {company.company_name}
                        </Text>
                    </TouchableOpacity>

                ))}
            </ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    popover: {
        backgroundColor: '#363432',
        width: 200,
        height: 200,
        zIndex: 99,
        position: 'absolute',
        top: 75,
        left: 50,
    },
    text: {
        color: 'white',
        fontSize: 14,
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
});
