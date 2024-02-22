import express = require('express');
const app = express(); // Initialise the express app
const cors = require('cors');
const port = 3000;// Set the port that the app will listen on
app.use(cors());
app.use(express.json());

// Create the Staff class here
class Staff {
    //field
    id: number;
    Name: string;
    Phone: string;
    Department: string;
    Address: string;
    City: string;
    State: string;
    Zip: string;
    Country: string;

    //cons
    constructor(
        _id: number, _name: string, _phone: string, _department: string, _address: string, _city: string, _state: string, _zip: string, _country: string) {
        this.id = _id;
        this.Name = _name;
        this.Phone = _phone;
        this.Department = _department;
        this.Address = _address;
        this.City = _city;
        this.State = _state;
        this.Zip = _zip;
        this.Country = _country;
    }
};

// Create an empty array to store the products
const staffList = [
    new Staff(1, "John Smith", "02 9988 2211", "Information Communications Technology", "1 Code Lane", "Javaville", "NSW", '0100', "Australia"),
    new Staff(2, "Sue White", "03 8899 2255", "Finance", "16 Bit Way", "Byte Cove", "QLD", '1101', "Australia"),
    new Staff(3, "Bob O'Bits", "05 7788 2255", "Marketing", "8 Silicon Road", "Cloud Hills", "VIC", '1001', "Australia")
];


//Add new Staff detail to array and increase id by 1
let lastId = 3;
function getNextId(): number {
    const nextId = lastId + 1;
    lastId = nextId;
    return nextId;
}

// Add new staff
app.post('/api/staffs', (req, res) => {
    //get data from the body
    let staff = req.body;

    //check if staff informations are include in the body
    if (staff.Name && staff.Phone && staff.Department && staff.Address && staff.City && staff.State && staff.Zip && staff.Country) {
        //create a new staff object
        const newStaff = new Staff(getNextId(), staff.Name, staff.Phone, staff.Department, staff.Address, staff.City, staff.State, staff.Zip, staff.Country);
        //add to array
        staffList.push(newStaff);
        res.status(201).json("Add successfully");
    } else {
        res.status(400).json({
            errors: [
                "You must provide all details for the staff!"
            ]
        })
    }
});

// Display all Staff
app.get('/api/staffs', (req, res) => {
    const result = staffList.slice();
    res.json(result);
});


// View staff detail by specified ID - get by id
app.get('/api/staffs/:staffId', (req, res) => {
    //get staffId using route params,  outcome is texttype ()
    const staffIdInput = req.params.staffId;
    const staffId = parseInt(staffIdInput, 10);

    //here "staff" is object type
    for (let staff of staffList) {
        if (staffId === staff.id) {
            res.json(staff)
        }
    }
    res.status(404).json("No staff detail can be found. Please double check your ID.");
});



//Udpate staff details
app.put('/api/staffs', (req, res) => {
    let updatedStaff = req.body;
    const staffId = parseInt(updatedStaff.id, 10);

    const index = staffList.findIndex((staff) => staff.id === staffId);
    if (index !== -1) {
        const staffToUpdate = staffList[index];

        // Update properties explicitly instead of replacing entire object
        // Ensures the staff id remains a number
        staffToUpdate.Name = updatedStaff.Name;
        staffToUpdate.Phone = updatedStaff.Phone;
        staffToUpdate.Department = updatedStaff.Department;
        staffToUpdate.Address = updatedStaff.Address;
        staffToUpdate.City = updatedStaff.City;
        staffToUpdate.State = updatedStaff.State;
        staffToUpdate.Zip = updatedStaff.Zip;
        staffToUpdate.Country = updatedStaff.Country;

        staffList[index] = staffToUpdate;

        res.status(200).json("Update successfully");
    } else {
        res.status(404).json({ error: 'Staff not found' });
    }
});





// Once all request handlers are setup, get the app running and listening on a port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


