const contacts = require('./contacts');

// Testowanie funkcji listContacts
async function testListContacts() {
  const allContacts = await contacts.listContacts();
  console.log('All Contacts:', allContacts);
}

// Testowanie funkcji getContactById
async function testGetContactById(contactId) {
  const contact = await contacts.getContactById(contactId);
  console.log(`Contact with ID ${contactId}:`, contact);
}

// Testowanie funkcji removeContact
async function testRemoveContact(contactId) {
  const updatedContacts = await contacts.removeContact(contactId);
  console.log(`Updated Contacts after removing ID ${contactId}:`, updatedContacts);
}

// Testowanie funkcji addContact
async function testAddContact(name, email, phone) {
  const newContact = await contacts.addContact(name, email, phone);
  console.log('New Contact:', newContact);
}

// Wykonanie testów
async function runTests() {
  await testListContacts();
  await testGetContactById('1'); // Zakładając, że ID 1 istnieje w pliku contacts.json
  await testRemoveContact('2');  // Zakładając, że ID 2 istnieje w pliku contacts.json
  await testAddContact('John Doe', 'john.doe@example.com', '123456789');
}


