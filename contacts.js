// filepath: d:\goit\Node.js\CLI-application-Node-HW_1\contacts.js
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === String(contactId)) || null;
  }

  async function removeContact(contactId) {
    const contacts = await listContacts();
    const contactToRemove = contacts.find(contact => contact.id === String(contactId));
  
    if (!contactToRemove) {
      console.log(`Contact with ID ${contactId} not found.`);
      return null;
    }
  
    const updatedContacts = contacts.filter(contact => contact.id !== String(contactId));
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  
    console.log(`Contact removed: 
      ID: ${contactToRemove.id}, 
      Name: ${contactToRemove.name}, 
      Email: ${contactToRemove.email}, 
      Phone: ${contactToRemove.phone}`);
     
    return updatedContacts;
  }
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: String(contacts.length + 1),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};