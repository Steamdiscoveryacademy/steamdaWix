import wixUsersBackend from 'wix-users-backend';

// ø <---------- <steamdaGetUser - Fron-End>  ---------->
export async function steamdaGetUser(id) {
return await wixUsersBackend.getUser(id);
//     .then((user) => {
//       return user;
//     });
}
// ø <---------- </steamdaGetUser - Front-End> ---------->

/* Returns a promise that resolves to:
 *
 * {
 *   "id": "dn8sf9c2-4e9f-a02d-a58d-f244d999729a",
 *   "memberName": "John Doe",
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "nickname": "johnd",
 *   "slug": "johnd123",
 *   "language": "en",
 *   "status": "ACTIVE",
 *   "loginEmail": "john.doe@somedomain.com",
 *   "creationDate": "2019-08-05T11:29:39Z",
 *   "lastUpdateDate": "2019-08-12T12:29:43.810Z",
 *   "lastLoginDate": "2019-08-12T13:42:30Z",
 *   "emails": [
 *     "john.doe@somedomain.com",
 *     "doughyjohn@anotherdomain.com"
 *   ],
 *   "phones": [
 *     "5555555555",
 *     "5555555556"
 *   ],
 *   "labels": [
 *     "contacts-new",
 *     "contacts-site_members_approved"
 *   ],
 *   "picture": {
 *     "url": "https://.../photo.jpg"
 *   }
 *   "customText": "Custom Text",
 *   "customNumber": 12345
 * }
 */