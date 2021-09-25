// ! <ORIGINAL - Default within any Backend File>
export function multiply(factor1, factor2) {
    return factor1 * factor2;
}
// ! </ORIGINAL - Default within any Backend File>

// ¡ <REWRITE - Make the function a the Same BUT Unique for each Backend FIle>
// export function multiply(factor1, factor2) {
//     return factor1 * factor2;
// }
export function multiplyFor_BACKEND_FILE_NAME(factor1, factor2) {
    // return factor1 * factor2;
    let product =  factor1 * factor2;
    return `In SITE_NAME Backend, in the file 'BACKEND_FILE_NAME', the multiply() function return a product of ${product}`
}
// ¡ </REWRITE - Make the function a the Same BUT Unique for each Backend FIle>





