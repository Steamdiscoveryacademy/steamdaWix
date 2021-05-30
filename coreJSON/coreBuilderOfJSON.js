let tempElement = {};
let coreObject = {};

	// coreObject.name = "Stream Recovery Malady";
	coreObject.name = "Steam Discovery Academy";
	coreObject.tag = "flagship";
	coreObject.abbrv = "SteamDA";
	// coreObject.url = 'steamdiscoveryacademy.com';
	coreObject.urlArray = ['steamdiscoveryacademy.com','steamda.com'];
	coreObject.currentTerm = "t202106";
	coreObject.activeTermArray = ["t202106"];
	coreObject.officeAddress = JSON.parse(`{"streetAddress":{"number":"3004","name":"Berkmar Drive"},"city":"Charlottesville","subdivision":"VA","postalCode":"22901","country":"US","location":{"latitude":"38.12300501818869","longitude":"-78.47768216332757"}}`)
	
	coreObject.locations = [];
	// tempElement = {};
	tempElement = JSON.parse(`{"address":{"streetAddress":{"number":"3004","name":"Berkmar Drive"},"city":"Charlottesville","subdivision":"VA","postalCode":"22901","country":"US","location":{"latitude":"38.12300501818869","longitude":"-78.47768216332757"}}}`)
	tempElement.tag = "primary";
	tempElement.name = "The Hub";
	tempElement.abbrv = "hub"
	coreObject.locations.push(tempElement);
	tempElement = {};
	tempElement.address = JSON.parse(`{"streetAddress":{"number":"Pen Park Rd","name":"1205"},"city":"Charlottesville","subdivision":"VA","postalCode":"22901","country":"US","location":{"latitude":"38.30186212206945","longitude":"-78.48123805591004"}}`)
	tempElement.tag = "secondary";
	tempElement.name = "Charlottesville Catholic School";
	tempElement.abbrv = "cvilleCatholic"
	coreObject.locations.push(tempElement);
	// tempElement = {};
	// tempElement.address = JSON.parse(`{"streetAddress":{"number":"100","name":"10th Street, NE"},"addressLine2":"Suite 300","city":"Charlottesville","subdivision":"VA","postalCode":"22902","country":"US","location":{"latitude":"38.31910325117341","longitude":"38.38802677021461, -78.39334743258594"}}`)
	// tempElement.tag = "tertiary";
	// tempElement.name = "Incubator"
	// tempElement.abbrv = "incubator"
	// coreObject.locations.push(tempElement);
	// ø <==========================================================================================>
	// ø <===========================  <See Separate Address Builder>   ============================>
	// ø <==========================================================================================>
	// coreObject.officeAddress = {}
	// coreObject.officeAddress.streetAddress = {};
	// coreObject.officeAddress.streetAddress.number = "100";
	// coreObject.officeAddress.streetAddress.name = "10th Street, NE";
	// coreObject.officeAddress.addressLine2 = "Suite 300";
	// coreObject.officeAddress.city = "Charlottesville";
	// coreObject.officeAddress.subdivision = "VA",
	// coreObject.officeAddress.postalCode = "22902",
	// coreObject.officeAddress.country = "US",
	// coreObject.officeAddress.location = {}
	// coreObject.officeAddress.location.latitude = "38.31910325117341",
	// coreObject.officeAddress.location.longitude = "-78.459265400079134.2203"
	// ø <==========================================================================================>
	// ø <===========================  </See Separate Address Builder>  ============================>
	// ø <==========================================================================================>

    coreObject.effectiveStamp = "20210814235959";
    coreObject.errorString = "";
	let coreJSON = JSON.stringify(coreObject);
	let coreJSONPretty = JSON.stringify(coreObject,undefined,4);

    console.warn('coreJSON: ');
    console.warn(coreJSON);
    console.warn(coreJSONPretty);