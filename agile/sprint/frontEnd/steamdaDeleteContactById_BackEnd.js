import { contacts } from 'wix-crm-backend';

export function myDeleteContactFunction(contactId) {
  let isValid =  contactId.length === 36 ? true : false;
  const options = {
    suppressAuth: false
  };

  return contacts.deleteContact(contactId, options)
    .then(() => {
      console.log("Contact deleted");
    })
    .catch((error) => {
      console.error(error);
    });
}