import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getStaffFromApi } from '../services/contactService';
import { useFocusEffect } from '@react-navigation/native';

export default function DisplayStaffList() {

    //state variable "contactList" to hold state value
    const [contactList, setContactList] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            // Get the staff data every time I visit this screen
            getStaffFromApi()
                .then((data) => setContactList(data))
                .catch((error) => alert(error))
        }, [])
    );

    function renderItem(info) {
        const staff = info.item;

        //Only display first 4 property of Staff, using .slice(0,4)
        return (
            <View style={styles.itemContainer}>
                {Object.keys(staff).slice(0, 4).map((key) => (
                    <Text key={key}>{key}:  {staff[key]}</Text>
                ))}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={contactList}
                renderItem={renderItem}
                // Specify the property that uniquely identifies each staff
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9',
        // alignItems: 'center',
        justifyContent: 'space-around'
    },

    itemContainer: {
        margin: 20,
        backgroundColor: '#cb6d4f',
        display: 'flex',
        alignSelf: 'stretch',
        padding: 20,

    }
});
