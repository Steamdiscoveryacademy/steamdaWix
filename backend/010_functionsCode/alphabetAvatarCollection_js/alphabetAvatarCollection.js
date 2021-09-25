// ø <------------------------------  <getImagePath_ofAlphabetAvatar>  ------------------------------>
export function getImagePath_ofAlphabetAvatar(letter = 'STRING'){
    let alphabetSimpleArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',];
    let alphabetPath2dArray = [
        ['A','https://static.wixstatic.com/media/523205_114dd1e33fdb47119f781a64296e0ad2~mv2.png'],
        ['B','https://static.wixstatic.com/media/523205_7cacff88119943d8889f06fb62c7f121~mv2.png'],
        ['C','https://static.wixstatic.com/media/523205_c48fb09bc4e246058a93521d5180bec0~mv2.png'],
        ['D','https://static.wixstatic.com/media/523205_4b27ad1015cf4b4c9f0958c5e91ac73c~mv2.png'],
        ['E','https://static.wixstatic.com/media/523205_dfb3eaab0b144d6c9a91fd36126c99ff~mv2.png'],
        ['F','https://static.wixstatic.com/media/523205_18a1cce02a3040c6b3b5ef5d259b14bb~mv2.png'],
        ['G','https://static.wixstatic.com/media/523205_e63a8e0e85bb46a883a07c2daf73f50a~mv2.png'],
        ['H','https://static.wixstatic.com/media/523205_b355d14b63d0430aad1c34cbae135c57~mv2.png'],
        ['I','https://static.wixstatic.com/media/523205_71af9a284e194c708f9860845273aca9~mv2.png'],
        ['J','https://static.wixstatic.com/media/523205_ba09afbd5d1945dfb2218a7953a8ff15~mv2.png'],
        ['K','https://static.wixstatic.com/media/523205_db9f7b3be60f4c1ea91a1fb4814a40e6~mv2.png'],
        ['L','https://static.wixstatic.com/media/523205_b37fa3b7e7c44cad8b6dd2dc682941f9~mv2.png'],
        ['M','https://static.wixstatic.com/media/523205_b8616176e53f4178945c37525720bf71~mv2.png'],
        ['N','https://static.wixstatic.com/media/523205_641f8447016542e8b4055046746dc887~mv2.png'],
        ['O','https://static.wixstatic.com/media/523205_2db0e20ef9c545bca30b45e61e57dcb3~mv2.png'],
        ['P','https://static.wixstatic.com/media/523205_795061ecbcb24c3c94ab558b01fa57bc~mv2.png'],
        ['Q','https://static.wixstatic.com/media/523205_2e90375d9f224a20b8ae6ab9e4a15a28~mv2.png'],
        ['R','https://static.wixstatic.com/media/523205_01d1e7e0cad143d0894a8dd04ae67b5c~mv2.png'],
        ['S','https://static.wixstatic.com/media/523205_29d37d6424ea4090b87cba4b872dbf55~mv2.png'],
        ['T','https://static.wixstatic.com/media/523205_3ed832ccb7244ac58434b185c9072168~mv2.png'],
        ['U','https://static.wixstatic.com/media/523205_22ce77d1585a4159b7bf6dbd3d859b90~mv2.png'],
        ['V','https://static.wixstatic.com/media/523205_c5ba8700874c4764893ae81e5d4ff514~mv2.png'],
        ['W','https://static.wixstatic.com/media/523205_559053b3b8504c21b9a6546cc2f8ea38~mv2.png'],
        ['X','https://static.wixstatic.com/media/523205_676e64b830d34a0e85b0eea3a311b4e7~mv2.png'],
        ['Y','https://static.wixstatic.com/media/523205_6d9818ec43b445848557e054944a0c48~mv2.png'],
        ['Z','https://static.wixstatic.com/media/523205_78078c0c1fa64bb8bccb5f9ee09df8fa~mv2.png']
    ];
    let altCharPath2dArray = [['@','https://static.wixstatic.com/media/523205_f29a8c1b82894bdcb1cde4f24607b15b~mv2.png']]
    
    letter = letter.toUpperCase()
    letter = letter === 'RANDOM' ? alphabetSimpleArray[Math.floor(Math.random() * alphabetSimpleArray.length)] : letter;
    while(letter.length > 1){
        if(alphabetSimpleArray.includes(letter.substr(0,1))){
            letter = letter.substr(0,1)
        }else{
            letter = letter.substr(1)
        }
    }
    // letter = alphabetSimpleArray.includes(letter.substr(0,1)) ? letter : 'RANDOM'
    // letter = letter === 'RANDOM' ? alphabetSimpleArray[Math.floor(Math.random() * alphabetSimpleArray.length)] : letter;
    letter = alphabetSimpleArray.includes(letter.substr(0,1)) ? letter : 'RANDOM_ALT'
    letter = letter === 'RANDOM_ALT' ? altCharPath2dArray[Math.floor(Math.random() * altCharPath2dArray.length)] : letter;
    
    let letterIndex = alphabetSimpleArray.indexOf(letter)
    return alphabetPath2dArray[letterIndex][1]
}
// ø <------------------------------  </getImagePath_ofAlphabetAvatar> ------------------------------>
    