const contacts = require('./contacts');
const argv = require('yargs').argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.table(await contacts.listContacts());
      break;

    case 'get':
      const contact = await contacts.getContactById(id);
      if (contact) {
        console.log(contact);
      } else {
        console.log(`Contact with ID ${id} not found.`);
      }
      break;

    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      console.log('Contact added:', newContact);
      break;

    case 'remove':
      const updatedContacts = await contacts.removeContact(id);
      console.log(`Contact with ID ${id} removed. Updated list:`);
      console.table(updatedContacts);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);