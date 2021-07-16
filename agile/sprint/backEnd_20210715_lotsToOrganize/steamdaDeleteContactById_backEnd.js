// import { contacts } from 'wix-crm-backend';
// \_ already in contactReference.jsw


// ø <---------- <steamdaDeleteContactById BackEnd>  ---------->
export function steamdaDeleteContactById(contactIdToDelete = 'ZXZ') {
  const contactId = contactIdToDelete;
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
// ø <---------- </steamdaDeleteContactById BackEnd> ---------->