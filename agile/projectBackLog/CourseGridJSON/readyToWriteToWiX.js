let rowColumnObjectArray = `[{"lable":"1B","lable2":"B1","column":1,"letter":"B","sort":26,"index":1},{"lable":"2B","lable2":"B2","column":2,"letter":"B","sort":32,"index":5},{"lable":"2D","lable2":"D2","column":2,"letter":"D","sort":32,"index":7},{"lable":"1F","lable2":"F1","column":1,"letter":"F","sort":35,"index":3},{"lable":"3A","lable2":"A3","column":3,"letter":"A","sort":35,"index":9},{"lable":"1A","lable2":"A1","column":1,"letter":"A","sort":40,"index":0},{"lable":"2A","lable2":"A2","column":2,"letter":"A","sort":40,"index":4},{"lable":"3E","lable2":"E3","column":3,"letter":"E","sort":43,"index":11},{"lable":"2F","lable2":"F2","column":2,"letter":"F","sort":48,"index":8},{"lable":"3C","lable2":"C3","column":3,"letter":"C","sort":77,"index":10},{"lable":"1C","lable2":"C1","column":1,"letter":"C","sort":86,"index":2},{"lable":"2C","lable2":"C2","column":2,"letter":"C","sort":92,"index":6}]`;
let rowColumnObjectArrayObject = {};
rowColumnObjectArrayObject.rowColumnObjectArray = JSON.parse(rowColumnObjectArray)
console.warn('rowColumnObjectArrayObject: ');
console.warn(rowColumnObjectArrayObject);