import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
} from "./contacts";

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.table(contacts);
        break;
  
      case "get":
        const contact = await getContactById(id);
        if (!contact) {
          throw new Error(`Contact with id:${id} not found`);
        }
        console.log(contact);
        break;
  
      case "add":
        const newContact = await addContact(
          name,
          email,
          phone
        );
        console.log(newContact);
        break;
  
      case "remove":
        const removeCont = await removeContact(id);
        console.log(removeCont);
        break;
  
      case "update":
        const updateContact = await updateById(
          id,
          name,
          email,
          phone
        );
        if (!updateContact) {
          throw new Error(`Contact with id:${id} not found`);
        }
        console.log(updateContact);
        break;
  
      default:
        console.warn("\x1B[31m Unknown action type!");
  
    }
  }