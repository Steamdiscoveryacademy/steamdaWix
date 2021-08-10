// ø <wixData.get(byId)>
DOX = 'pstEnrBootstrap _id: 9e86366c-78aa-49a4-b1b3-9f4e75256d58';
let peSevenGET = await wixData.get("sourcedJSON", '9e86366c-78aa-49a4-b1b3-9f4e75256d58', options);
$w('#ppDatabaseResponseJSON').value = JSON.stringify(peSevenGET.jsonData);
// ø </wixData.get(byId)>

// ø <wixData.query(byKey, versionStampTxt DESC, limit 1)>
DOX = 'eq: key: pstEnrBootstrap; lt: versionStampTxt: nowISO; descending: versionStampTxt; limit: 1';
let nowISO = (new Date()).toISOString();
console.log('nowISO: ' + nowISO);
let peSevenRECORD = await wixData.query("sourcedJSON")
.eq("key", "pstEnrBootstrap")
.lt("versionStampTxt", nowISO)
.descending("versionStampTxt")
.limit(1)
.find();
// $w('#ppDatabaseResponseJSON').value = JSON.stringify(peSevenRECORD);
$w('#ppDatabaseResponseJSON').value = JSON.stringify(peSevenRECORD.items[0].jsonData);
// ø </wixData.query(byKey, versionStampTxt DESC, limit 1)>

