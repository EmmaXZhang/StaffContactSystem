import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native';
import { getStaffByIdFromApi, getStaffFromApi } from '../services/contactService';

export default function ViewStaffDetail() {

    const [iDSearched, setIdSearched] = useState("");
    //searched staff detail
    const [staffDetail, setStaffDetail] = useState("");


    //update searched id to setIdSearched
    function handleIdSearch(text) {
        const numId = parseInt(text, 10);
        if (!isNaN(numId)) {
            setIdSearched(numId);
        } else {
            // Handle the case where the entered ID is not a valid integer
            alert('Please enter a valid integer for Staff ID');
        }
    }

    function checkStaffDetail() {
        //get searched staff's detail
        getStaffByIdFromApi(iDSearched)
            .then((data) => setStaffDetail(data))
            .catch((error) => alert(error))
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>Staff ID: </Text>
                <TextInput style={styles.inputStyle} onChangeText={handleIdSearch} />
                <Button color='#cb6d4f' title="View" onPress={checkStaffDetail} />
            </View>

            <View style={styles.outputContainer}>
                {Object.keys(staffDetail).map((key) => (<Text key={key} style={styles.outputText}>{key}:   {staffDetail[key]}</Text>))}
            </View>
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9',
    },

    textStyle: {
        textAlign: 'center',
        fontSize: 24,
    },

    inputStyle: {
        width: 70,
        height: 30,
        borderColor: '#262626',
        borderWidth: 1,
        borderRadius: 8, // set the border radius
        paddingHorizontal: 10, // Add some padding for text inside the input
    },
    inputContainer: {
        flexDirection: 'row', // Place children in a row
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 70,
    },
    outputContainer: {
        justifyContent: 'flex-start',
        marginTop: 100,
        marginLeft: 40,
        marginRight: 40,
        backgroundColor: '#cb6d4f'
    },
    outputText: {
        fontSize: 18,
    }
});
