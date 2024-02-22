
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Staff Contact System</Text>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button
                        color='#cb6d4f'
                        title="Display Staff List"
                        //navigation.navigate('Stack.Screen name=xxx')
                        onPress={() => { navigation.navigate('StaffContactList') }} />
                </View>
                <View style={styles.button}>
                    <Button
                        color='#cb6d4f'
                        title="View Staff Details"
                        onPress={() => navigation.navigate('ViewStaffDetails')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        color='#cb6d4f'
                        title="Add New Staff"
                        onPress={() => navigation.navigate('AddNewStaff')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        color='#cb6d4f'
                        title="Update Staff Details"
                        onPress={() => navigation.navigate('EditStaffDetail')}
                    />
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9',
        justifyContent: 'center'
    },

    title: {
        textAlign: 'center',
        marginBottom: 100,
        fontSize: 48,
        color: '#941a1d',
        fontWeight: 'bold'
    },

    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '30%',
    },
    button: {
        width: 200,
        height: 60,
    }

});

