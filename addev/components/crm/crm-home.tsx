import { useReactiveVar } from '@apollo/client'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { rvCurrentCompanyContacts } from '../common/common-states'

export const CRMHome = () => {

    const currentContacts = useReactiveVar(rvCurrentCompanyContacts)

    let colors = ['#123456', '#654321'];



    return (
        <View style={styles.container}>
            <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                    <View style={styles.tableID}>
                        <Text style={styles.textBold}>ID</Text>
                    </View>
                    <View style={styles.tableContactName}>
                        <Text style={styles.textBold}>Name</Text>
                    </View>
                    <View style={styles.tableCompanyName}>
                        <Text style={styles.textBold}>Company</Text>
                    </View>
                </View>
                {currentContacts.map((contact, index) => {

                    return (
                        <View key={contact.id} style={[styles.tableBody, {backgroundColor: index % 2 == 0 ? 'white' : '#F2F2F2'}]}>
                        <View style={styles.tableID}>
                            <Text style={[styles.text,]}>{contact.id}</Text>
                        </View>
                        <View style={styles.tableContactName}>
                            <Text style={[styles.text, ]}>{contact.contact_name}</Text>
                        </View>
                        <View style={styles.tableCompanyName}>
                            <Text style={[styles.text,]}>{contact.company_name}</Text>
                        </View>
                    </View>
                    )
                    })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableContainer: {
        width: 500,
        height: 500,
        flexDirection: 'column',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FF530D',
        height: 50,
        width: '100%',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        padding: 20,
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
    },
    tableBody: {
        flexDirection: 'row',
        width: '100%',
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 0.1,
        borderBottomColor: '#E6E6E6',

    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'center'

    },
    tableID: {
        flex: 1,
    },
    tableContactName: {
        flex: 1,
    },
    tableCompanyName: {
        flex: 1,
    },
    text: {
        color: 'black',
        fontWeight: '400',
        fontSize: 12,
    },
    textBold: {
        color: 'white',
        fontWeight: 'bold'
    }
})

