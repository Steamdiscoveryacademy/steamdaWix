// ø <------------------------------  <getImagePath_ofRandomDiverseFace>  ------------------------------>
export function getImagePath_ofRandomDiverseFace(){
    
    let fileName = 'radomDiversityAvatarCollection.js'
    let source = 'https://www.constructionexec.com/article/four-ways-diversity-will-save-the-construction-industry'
    let randomizedInfoPicureImagePathArray = [
        'https://static.wixstatic.com/media/523205_ebe854e9fb3c494fa104cefa5d782cc1~mv2.jpeg',
        'https://static.wixstatic.com/media/523205_a9d51ef5e556471a8cb60760ecfd838d~mv2.jpeg',
        'https://static.wixstatic.com/media/523205_c184eec530a64a5a8f8a1adecbe416f0~mv2.jpeg',
        'https://static.wixstatic.com/media/523205_990f0d3173664f29871528dd9e10ae5b~mv2.jpeg',
        'https://static.wixstatic.com/media/523205_1a129e0f9eca4beca2ce4a8a8846d9cd~mv2.jpeg',
        'https://static.wixstatic.com/media/523205_32a2a2ae76ed4886b08f28907686a7b5~mv2.jpeg',
        'https://static.wixstatic.com/media/523205_9249dded66d24a1cb1add3acf6b7e5e4~mv2.jpeg',
        'https://static.wixstatic.com/media/523205_fe0c18716e3d450caf6671b5489cdbb7~mv2.jpeg',
        'https://static.wixstatic.com/media/523205_e4c6294828094d5a9c016f515c17c334~mv2.jpeg',
    ]
    return randomizedInfoPicureImagePathArray[Math.floor(Math.random() * randomizedInfoPicureImagePathArray.length)]
}
// ø <------------------------------  </getImagePath_ofRandomDiverseFace> ------------------------------>