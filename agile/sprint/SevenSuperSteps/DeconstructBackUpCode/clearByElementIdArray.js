export function clearByElementIdArray(elementIdArray) {
    if (!Array.isArray(elementIdArray)) {
        return;
    }
    elementIdArray.forEach(elementId => {
        elementId = elementId.substr(0, 1) === '#' ? elementId : '#' + elementId;
        $w(elementId).value = '';
        $w(elementId).resetValidityIndication();
    })

}