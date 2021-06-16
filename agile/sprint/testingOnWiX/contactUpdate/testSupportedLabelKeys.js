let supportedLabelKeyArray = [
    "custom.w9-2021080913bday",
    "custom.w8-2021080206bday",
    "custom.w7-2021072630bday",
    "custom.w6-2021071923bday",
    "custom.w5-2021071216bday",
    "custom.w4-2021062832bday",
    "custom.w3-2021062125bday",
    "custom.w2-2021061418bday",
    "custom.w1-2021060711bday",
    "custom.w9-2021080913",
    "custom.w8-2021080206",
    "custom.w7-2021072630",
    "custom.w6-2021071923",
    "custom.w5-2021071216",
    "custom.w4-2021062832",
    "custom.w3-2021062125",
    "custom.w2-2021061418",
    "custom.w1-2021060711",
    "custom.member-faux",
    "custom.member-active",
    "custom.secondary-parent",
    "custom.primary-parent",
    "custom.t202106bday",
    "custom.photo-declined",
    "custom.gender-alternative",
    "custom.gender-unreported",
    "custom.gender-male",
    "custom.t202106",
    "custom.gender-female",
    "custom.summer21",
    "custom.student"
];

let toAssignLabelKeyArray = [
    "custom.w1-2021060711",
    "custom.w2-2021061418",
    "custom.w3-2021062125",
    "custom.w4-2021062832",
    "custom.w4-2021062832bday",
    "custom.w5-2021071216",
    "custom.t202106",
    "custom.t202106bday",
    "custom.primary-parent",
    "custom.member-active"
];

toAssignSupported = [];
toAssignUnsupported = [];
toAssignLabelKeyArray.forEach(element => {
    // console.log(element);
    if(supportedLabelKeyArray.includes(element)){
        toAssignSupported.push(element);
    }else{
        toAssignUnsupported.push(element);
    }
});

console.warn('toAssignSupported: ');
console.warn(toAssignSupported);
console.warn('toAssignUnsupported: ');
console.warn(toAssignUnsupported);