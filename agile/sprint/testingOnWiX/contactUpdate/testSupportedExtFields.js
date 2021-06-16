supportedExtFieldArray = ['custom.last-update',
'custom.legal-first',
'custom.timezone-offset',
'custom.current-region',
'custom.seed',
'custom.grade',
'custom.student-2',
'custom.birthday-1',
'custom.contact-type',
'custom.student-1',
'custom.message',
'custom.subject',
'contacts.displayByFirstName',
'contacts.displayByLastName',
'invoices.vatId',
'members.membershipStatus',
'members.mobile',
'ecom.numOfPurchases',
'ecom.totalSpentAmount',
'ecom.totalSpentCurrency',
'ecom.lastPurchaseDate',
'emailSubscriptions.subscriptionStatus',
'emailSubscriptions.deliverabilityStatus',
'emailSubscriptions.effectiveEmail'];

toAssignExtFieldArray = ['custom.last-update','custom.current-region','custom.timezone-offset'];

toAssignSupported = [];
toAssignUnsupported = [];

toAssignExtFieldArray.forEach(element => {
    // console.log(element);
    if(supportedExtFieldArray.includes(element)){
        toAssignSupported.push(element);
    }else{
        toAssignUnsupported.push(element);
    }
});


console.warn('toAssignSupported: ');
console.warn(toAssignSupported);
console.warn('toAssignUnsupported: ');
console.warn(toAssignUnsupported);