const { Command } = require('commander');
const contacts = require('./contacts');

const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactsList = await contacts.listContacts();
      console.log('Contacts:');
      console.table(contactsList);
      break;

    case 'get':
      if (!id) {
        console.error('ID is required for get action');
        break;
      }
      const contact = await contacts.getContactById(id);
      if (contact) {
        console.log('Contact:');
        console.table([contact]);
      } else {
        console.log(`Contact with id ${id} not found`);
      }
      break;

    case 'add':
      if (!name || !email || !phone) {
        console.error('Name, email, and phone are required for add action');
        break;
      }
      const newContact = await contacts.addContact(name, email, phone);
      console.log('New Contact added:');
      console.table([newContact]);
      break;

    case 'remove':
      if (!id) {
        console.error('ID is required for remove action');
        break;
      }
      const updatedContacts = await contacts.removeContact(id);
      if (updatedContacts) {
        console.log('Contact removed. Updated Contacts:');
        console.table(updatedContacts);
      } else {
        console.log(`Contact with id ${id} not found`);
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
