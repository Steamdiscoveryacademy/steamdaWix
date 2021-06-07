// ø <---------- <stepsCycleSteps>  ---------->
export function stepsCycleSteps(){
    //memItemLIST will be replaced with memory.getItem()
    let funcStepArray = memory.getItem('enrollmentStepList').split(',');
    memory.setItem('enrollmentStepCompleted',funcStepArray[0]);
    memory.setItem('enrollmentStepCurrent',funcStepArray[1]);
    memory.setItem('enrollmentStepNext',funcStepArray[2]);
    let cycleElement = funcStepArray.shift();
    funcStepArray.push(cycleElement);
    memory.setItem('enrollmentStepList',funcStepArray.toString());
    // let funcMemItemCurrNxtLst = funcMemItemCURRENT + '|' + funcMemItemNEXT + '|' + funcMemItemLIST;
    // return funcMemItemCurrNxtLst;
    //memItemLIST, memItemCURRENT and memItemNEXT will be replaced with memory.getItem()
    //thus, memItemCurrNxtList being returned and parsed upon return will be MOOT
}
// ø <---------- </stepsCycleSteps> ---------->
