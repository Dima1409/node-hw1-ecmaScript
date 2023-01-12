// import fs from "node:fs/promises";
import fs from "node:fs";
const fsPromise = fs.promises;

const baseUrl = new URL("db/contacts.json", import.meta.url).pathname;
const contactsPath = baseUrl.slice(1);

//console.log(contactsPath) //.. ==> C:/Users/dima/Desktop/node-hw1-ecmaScript/db/contacts.json 


const updateContacts = async data => {
  try {
    await fsPromise.writeFile(contactsPath, JSON.stringify(data));
  } catch (error) {
    console.error(error)
  }
  
};

const listContacts = async () => {
  try {
  const data = await fsPromise.readFile(contactsPath);
  const contacts = JSON.parse(data);
  console.table(contacts);
  return contacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async contactId => {
  try {
  const data = await listContacts();
  const contact = data.find((elem) => elem.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
  } catch (error) {
    console.error(error)
  }
  
};

const removeContact = async (contactId) => {
  try {
  const data = await listContacts();
  const idx = data.findIndex((elem) => elem.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = data.splice(idx, 1);
  updateContacts(data);
  return removeContact;
  } catch (error) {
    console.error(error)
  }
  
};

const addContact = async (name, email, phone) => {
  try {
  const data = await listContacts();
  const newContact = { name, email, phone, id: v4() };
  data.push(newContact);
  await updateContacts(data);
  return newContact;
  } catch (error) {
    console.error(error)
  }
};

const updateById = async (id, name, email, phone) => {
  try {
  const data = await listContacts();
  const idx = data.findIndex((elem) => elem.id === id);
  if (idx === -1) {
    return null;
  }
  data[idx] = { id, name, email, phone };
  await updateContacts(data);
  return data[idx];
  } catch (error) {
    console.error(error)
  }
  
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById
};