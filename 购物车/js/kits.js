// 创建一个空对象，用来存储封装的方法
var kits = {};

// kits.randomInt = function (n, m) {
//     return Math.floor(Math.random() * (m - n + 1) + n);
//   }

  
// 封装获取本地存储的数据，默认是返回数组的
kits.loadData = function(key){
    // localStorage 地方存储器 
    let json = localStorage.getItem(key);

    let arr;
    if(json === null){
        arr = [];
    }else{
        arr = JSON.parse(json);
    };

    // 简化 三元表达式
    // arr = json === null ? [] : JSON.parse(json);
    return arr;

    // 短路运算进行简化
    // return JSON.parse(json) || [];
}


// 封装把数据存储到本地数据的方法

kits.saveData = function(key,data){
    let json = JSON.stringify(data);
    localStorage.setItem(key,json);
}