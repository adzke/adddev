import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const AppsDashboard = () => {
    return (
        <View style={styles.page}>
            <Text>
                Welcome to Apps
            </Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    }
})


