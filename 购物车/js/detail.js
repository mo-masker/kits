$(function(){
    // 先截取 locatuin.search 里面的id
    let id = location.search.substring(4)

    // 遍历数组 获取指定条件元素的方法 find
    let target = phoneData.find(e =>{
        // 返回需要的条件
        return e.pID == id;
    })
    console.log(target);

    // 把数据动态的渲染到结构里面
    // 把价格修改
    $('.dd em').text(`¥${target.price}`)
    // 改名字
    $('.sku-name').text(target.name);
    // 改图片
    $('.preview-img > img').attr('src',target.imgSrc)


    //---------------
    // 点击加入购物车
    $('.addshopcar').on('click',function(){
        // 先获取输入框里面的件数
        let number = $('.choose-number').val();
        // 需要判断用户输入的数据的合理性
        // 如果输入的是空的，不是数字，数量小于0都是不合理的情况
        if(number.trim().length === 0 || isNaN(number) || parseInt(number) <= 0){
            alert('商品数量不正确，请正确输入');
            return;
        };

        // ---把件数和商品的信息存储到本地数据----
        //从本地数据中读取出一个指定的键
        let arr = kits.loadData('cartListData');

        // 判断是否已经存在该商品 - 根据id判断是否已经存在
        let exist = arr.find(e =>{
            return e.pID == id;
        });
        // 为了保证数量是数字，需要把数量先转换为数字
        number = parseInt(number);
        // 如果数组中有满足条件的元素， exist就是一个对象，否则是undefined
        if(exist){
            exist.number += number;
        }else{
            // 需要自己构建数据对象
            let obj = {
                pID:target.pID,
                imgSrc:target.imgSrc,
                name:target.name,
                price:target.price,
                // 件数要从输入框里面获取
                number:number
            };
            // 把数据放到数组里面，然后存到本地
            arr.push(obj);
        }
        
        kits.saveData('cartListData',arr);
        // 最后需要跳转到购物车页面
        location.href = './cart.html';
    })
    
})