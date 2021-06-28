const express = require('express');
const fs = require('fs');
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.use(express.json());


// get all contacts
app.route('/contacts').get((req, res) => {
    const users = getContactData();
    res.send(users);
})


app.route('/contacts/add').post((req, res) => {

    //get the existing contact data
    const contacts = getContactData();
    const contactData = req.body;

    const maxId = contacts.reduce(
        (max, contact) => (contact.id > max ? contact.id : max),
        contacts[0].id
      );

    contactData["id"] = maxId+1;
      
    //check if the Contact fields are missing
    if (contactData.name == null || contactData.surname == null || contactData.number == null) {
        return res.status(401).send({ error: true, msg: 'Data missing' });
    }

    //check if the phone exist already
    const findExist = contacts.find(user => user.number === contactData.number);

    if (findExist) {
        return res.status(409).send({ error: true, msg: 'Contact already exist' });
    }

    contacts.push(contactData);

    saveContactData(contacts);
    res.send({ success: true, msg: 'Contact added successfully' });
});


// search contacts with name or surname
app.route('/contacts/:name').get((req, res) => {
    const name = req.params.name;
    const contacts = getContactData();

    let findContacts = [];
    for (let i = 0; i < contacts.length; i++) {

        if (contacts[i].name.includes(name)) {
            findContacts.push(contacts[i]);
            continue;
        };

        if (contacts[i].surname.includes(name)) {
            findContacts.push(contacts[i]);
        };
    }

    if (!findContacts) {
        return res.status(404).send({ error: true, msg: 'Contact not exist' });
    }
    res.send(findContacts);
})


app.route('/contacts/delete/:id').delete((req, res) => {

    const id = req.params.id
    
    const contacts = getContactData();

    //filter the contact to remove it, 
    const filterContact = contacts.filter( contact => contact.id != id );

 
    if ( contacts.length === filterContact.length ) {
        return res.status(409).send({error: true, msg: 'Contact does not exist'});
    }
   
    saveContactData(filterContact)
 
   res.send(filterContact)
})


const saveContactData = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync('contacts.json', stringifyData);
}

//get the data from json file
const getContactData = () => {
    const jsonData = fs.readFileSync('contacts.json');
    return JSON.parse(jsonData);
}


app.listen(3000, () => {
    console.log('Server runs on port 3000')
})