let tempElement = {};
let coreObject = {};

	// coreObject.address = {}
	// coreObject.address.streetAddress = {};
	// coreObject.address.streetAddress.number = "100";
	// coreObject.address.streetAddress.name = "10th Street, NE";
	// coreObject.address.addressLine2 = "Suite 300";
	// coreObject.address.city = "Charlottesville";
	// coreObject.address.subdivision = "VA",
	// coreObject.address.postalCode = "22902",
	// coreObject.address.country = "US",
	// coreObject.address.location = {}
	// coreObject.address.location.latitude = "38.72826265311116",
	// coreObject.address.location.longitude = "-78.53931920032895"
    
	// coreObject.address = {};
	// coreObject.address.streetAddress = {};
	// coreObject.address.streetAddress.number = "ZXZvalueZXZ";//string
	// coreObject.address.streetAddress.name = "ZXZvalueZXZ";
	// coreObject.address.addressLine2 = "ZXZvalueZXZ";//comment out to prevent empty element
	// coreObject.address.city = "ZXZvalueZXZ";
	// coreObject.address.subdivision = "ZXZvalueZXZ";
	// coreObject.address.postalCode = "ZXZvalueZXZ";
	// coreObject.address.country = "US";
	// coreObject.address.location = {};
	// coreObject.address.location.latitude = "38.37080204122746";//string
	// coreObject.address.location.longitude = "-78.43729274424798";//string

	coreObject.address = {};
	coreObject.address.streetAddress = {};
	coreObject.address.streetAddress.number = "3004";//string
	coreObject.address.streetAddress.name = "Berkmar Drive";
	// coreObject.address.addressLine2 = "ZXZvalueZXZ";//comment out to prevent empty element
	coreObject.address.city = "Charlottesville";
	coreObject.address.subdivision = "VA";
	coreObject.address.postalCode = "22901";
	coreObject.address.country = "US";
	coreObject.address.location = {};
	coreObject.address.location.latitude = "38.12300501818869";//string
	coreObject.address.location.longitude = "-78.47768216332757";//string

    // coreObject.effectiveStamp = "20210531235959";
    // coreObject.errorString = "";
	coreJSON = JSON.stringify(coreObject.address);
	coreJSONPretty = JSON.stringify(coreObject.address,undefined,4);

    console.warn('coreJSON: ');
    console.warn(coreJSON);
    console.warn(coreJSONPretty);