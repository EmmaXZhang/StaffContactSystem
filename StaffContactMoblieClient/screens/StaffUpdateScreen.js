import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { getStaffByIdFromApi, updateStaffToApi } from '../services/contactService';
import { Picker } from '@react-native-picker/picker'

export default function EditStaffDetail({ navigation }) {
    const [iDSearched, setIdSearched] = useState("");
    const [editedStaff, setEditedStaff] = useState({});

    const departmentData = [
        { id: 0, name: 'General' },
        { id: 1, name: 'Information Communications Technology' },
        { id: 2, name: 'Finance' },
        { id: 3, name: 'Marketing' },
        { id: 4, name: 'Human Resources' },
    ];

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

    //search by staff id function
    function searchStaffById() {
        //get searched staff's detail
        getStaffByIdFromApi(iDSearched)
            .then((data) => {
                setEditedStaff(data);
            })
            .catch((error) => alert(error));
    }

    //save Change
    function saveChange() {
        updateStaffToApi(editedStaff)
            // If everything goes well, navigate back to 'Home'
            .then(() =>
                alert('Success', 'Staff information updated successfully'),
                navigation.navigate('Home'))
            .catch((error) => alert(error));
    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.textStyle}>Staff ID: </Text>
                <TextInput style={styles.inputStyle} onChangeText={handleIdSearch} />
                <Button color='#cb6d4f' title="Update" onPress={searchStaffById} />
            </View>

            <View style={styles.outputContainer}>
                {Object.keys(editedStaff).slice(1).map((field) => (
                    <View key={field}>
                        <Text>{field}:</Text>
                        {field === 'Department' ? (
                            <Picker
                                style={styles.picker}
                                selectedValue={editedStaff[field]} //display original property value
                                onValueChange={(itemValue) => setEditedStaff({ ...editedStaff, [field]: itemValue })} //replace new value [field]:itemValue to old one.
                            >
                                <Picker.Item label={editedStaff[field]} />
                                {departmentData.map((department) => (
                                    <Picker.Item key={department.id} label={department.name} value={department.name} /> //render department data 
                                ))}
                            </Picker>
                        ) : (
                            <TextInput
                                style={styles.inputStyle}
                                value={editedStaff[field].toString()}
                                //{...editedDetails} - to create a shallow copy of the state
                                //[key]:text - update specific property of the new object
                                onChangeText={(text) => setEditedStaff({ ...editedStaff, [field]: text })}
                                editable={true}
                            />
                        )}
                    </View>
                ))}
            </View>

            <View style={styles.button}>
                <Button color='#cb6d4f' title="Save Changes" onPress={saveChange} />
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
    picker: {
        width: 150,
        borderWidth: 1,
        borderRadius: 5, // set the border radius
        paddingHorizontal: 10,
        backgroundColor: '#D9D9D9'
    },
    inputStyle: {
        width: 150,
        borderColor: '#262626',
        borderWidth: 1,
        borderRadius: 5, // set the border radius
        paddingHorizontal: 10, // Add some padding for text inside the input
    },
    inputContainer: {
        flexDirection: 'row', // Place children in a row
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 30,
    },
    outputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    outputText: {
        fontSize: 18,
    },
    button: {
        alignItems: 'center',
        height: '50%',
        marginTop: 10,
    }
});
