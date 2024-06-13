const fs = require('fs').promises;
const path = require('path');

// Zapisz ścieżkę do pliku contacts.json
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// Funkcja do pobrania listy kontaktów
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts:', error);
  }
}

// Funkcja do pobrania kontaktu po ID
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId);
  } catch (error) {
    console.error('Error getting contact by ID:', error);
  }
}

// remove contact by ID
async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return updatedContacts;
  } catch (error) {
    console.error('Error removing contact:', error);
  }
}

// add new contact
async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: Date.now().toString(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error('Error adding contact:', error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
