import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native';
import { postStaffToApi } from '../services/contactService';
import { Picker } from '@react-native-picker/picker'

export function InputField({ value, onChangeText: changedText }) {
    return (
        <View style={styles.inputFieldContainer}>
            <TextInput value={value} onChangeText={changedText} style={styles.textInput} />
        </View>
    );
}

export default function AddNewStaff() {
    //create Department array for picker
    const departmentData = [
        { id: 0, name: 'General' },
        { id: 1, name: 'Information Communications Technology' },
        { id: 2, name: 'Finance' },
        { id: 3, name: 'Marketing' },
        { id: 4, name: 'Human Resources' },
    ];

    //create staffDetails object for staff details (property name = field)
    const [staffDetails, setStaffDetails] = useState({
        Name: "",
        Phone: "",
        Department: "",
        Address: "",
        City: "",
        State: "",
        Zip: "",
        Country: "",
    });

    function handleInputChange(field, text) {
        //create copy of object {} from staffDetails using object.assign() method
        const newDetails = Object.assign({}, staffDetails);
        //[] access field in the object, text=new value
        newDetails[field] = text;
        setStaffDetails(newDetails);
    }

    //Add new staff detail to the staff list
    function handleOnPress(e) {
        postStaffToApi(staffDetails)
            .then(() =>
                alert('Success', 'Staff added successfully'),
            )
            .catch((error) => alert(error));
    }

    return (
        <ScrollView style={styles.container}>

            <View style={styles.outputContainer}>
                {Object.keys(staffDetails).map((field, index) => (
                    <View key={index}>
                        <Text style={styles.inputLable}>{field}: </Text>
                        {field === 'Department' ? (
                            <Picker
                                style={styles.picker}
                                selectedValue={staffDetails[field]}
                                onValueChange={(itemValue) => handleInputChange(field, itemValue)}
                            >
                                <Picker.Item label="Please Select" value="" />
                                {departmentData.map((department) => (
                                    <Picker.Item key={department.id} label={department.name} value={department.name} />
                                ))}
                            </Picker>
                        ) : (
                            <TextInput
                                style={styles.inputStyle}
                                key={index} value={staffDetails[field]} onChangeText={(text) => handleInputChange(field, text)} />
                        )}
                    </View>
                ))}
            </View>

            <View style={styles.button}>
                <Button color='#cb6d4f' title="Add Staff" onPress={handleOnPress} />
            </View>

        </ScrollView>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9',

    },
    outputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
    picker: {
        width: 200,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5,
        backgroundColor: 'transparent',
        borderColor: 'black'

    },
    inputStyle: {
        width: 200,
        borderColor: '#262626',
        borderWidth: 1,
        borderRadius: 5, // set the border radius
        paddingHorizontal: 10, // Add some padding for text inside the input
        marginBottom: 5
    },
    inputLable: {
        fontSize: 16,
        color: '#262626',
        fontWeight: 'bold',
        // marginBottom: 10,
    },

    button: {
        alignItems: 'center',
        height: 50,
    }

});
