
import { Platform } from 'react-native';

//get all staff list 
export function getStaffFromApi() {
    const baseUrl = getServerAddress();
    return fetch(new URL("/api/staffs", baseUrl))
        .then((response) => {
            // Check if the response returned was free of errors
            if (response.ok) {
                // Convert body data from json text to in-memory objects
                return response.json();
            }
            return Promise.reject('There was some error getting data from the service')
        });
}

//get staff by searched id:   /api/staffs?id=1
export function getStaffByIdFromApi(Id) {
    const baseUrl = getServerAddress();
    const fullUrl = new URL(`/api/staffs/${Id}`, baseUrl);
    return fetch(fullUrl)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject('Incorrect staff ID')
        })
}

//update searched staff detail
export function updateStaffToApi(staffToUpdate) {
    const baseUrl = getServerAddress();
    const fullUrl = new URL('/api/staffs', baseUrl);

    return fetch(fullUrl, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(staffToUpdate),
    }).then(response => {
        if (response.ok) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('Did not save staff correctly!'));
        }
    });
}

//create new staff
export function postStaffToApi(staffToPost) {
    const baseUrl = getServerAddress();
    const fullUrl = new URL('/api/staffs', baseUrl);
    return fetch(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(staffToPost),
    }).then(response => {
        if (response.ok) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('Error.Please provide all information'));
        }
    });
}


//set up server address
function getServerAddress() {
    if (Platform.OS === "web") {
        return 'http://localhost:3000'
    } else if (Platform.OS === "android") {
        return 'http://10.0.2.2:3000'
    } else {
        throw new Error("Unsupported mobile platform!");
    }
}