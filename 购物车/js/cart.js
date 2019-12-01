$(function(){
    // 第一个功能：先读取本地数据中的数据，然后动态的生成列表结构
    let arr = kits.loadData('cartListData');
    // 遍历数组，生成指定的结构
    let html = ''; // 先准备一个空字符串，后面存储要生成的所有的结构字符串
    arr.forEach(function (e) {
        // console.log(e);
        // 需要有一个产品的id，用于后期的一些其他操作
        html += `<div class="item" data-id="${e.pID}">
        <div class="row">
          <div class="cell col-1 row">
            <div class="cell col-1">
              <input type="checkbox" class="item-ck" ${e.isCheched ? "checked" : ''}>
            </div>
            <div class="cell col-4">
              <img src="${e.imgSrc}" alt="">
            </div>
          </div>
          <div class="cell col-4 row">
            <div class="item-name">${e.name}</div>
          </div>
          <div class="cell col-1 tc lh70">
            <span>￥</span>
            <em class="price">${e.price}</em>
          </div>
          <div class="cell col-1 tc lh70">
            <div class="item-count">
              <a href="javascript:void(0);" class="reduce fl ">-</a>
              <input autocomplete="off" type="text" class="number fl" value="${e.number}">
              <a href="javascript:void(0);" class="add fl">+</a>
            </div>
          </div>
          <div class="cell col-1 tc lh70">
            <span>￥</span>
            <em class="computed">${e.number * e.price}</em>
          </div>
          <div class="cell col-1">
            <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
          </div>
        </div>
      </div>`
    });
    // 把拼接好的数据放到列表里
    $('.item-list').append(html);

    
    
    
    // 如果arr里面的数据不是全都勾选的，需要把全选的勾选去掉
    let noCkAll = arr.find(e => {
        return !e.isCheched;
    });
    $('.pick-all').prop('checked', !noCkAll);

    // 判断购物车的有没有数据，处理一些该隐藏的效果和该显示的效果
    if(arr.length !=0){
        $('.empty-tip').hide(); // 空空
        $('.cart-header').show(); //表头
        $('.total-of').show(); //结算
    }


    // 第二个功能 全选和点选
    $('.pick-all').on('click',function(){
        // 把当前的状态保存,然后改变每一个单选
        let status = $(this).prop('checked');
        $('.item-ck').prop('checked',status);
        $('.pick-all').prop('checked',status);
        // 先把本地数据里面的所有的数据都勾选
        arr.forEach(e => {
            e.isCheched = status;
        });

        // 重新存进本地数据
        kits.saveData('cartListData',arr);
        // 点击全选的时候，也需要把数据重新更新
        calcTotal();
    })

    // 点选 动态生成的，用事件委托
    $('.item-list').on('click','.item-ck',function(){
        // 如果勾选的个数和总数一致  = 全选
        let ckall = $('.item-ck').length === $('.item-ck:checked').length;
        // 设置全选的状态和ckall一致
        $('.pick-all').prop('checked',ckall);
        // 点选的同时，要修改该多选框对应的本地数据里面的选中状态
        // 需要根据点选的商品的id，到本地数据中，修改isChecked 属性
        let pID = $(this).parents('.item').attr('data-id');
        // 获取当前这个单选是否选中
        let isCheched = $(this).prop('checked');

        arr.forEach(e =>{
            if(e.pID == pID){
                // 需要把当前这个产品的选中状态改成和勾选状态一致
                e.isCheched = isCheched;
            }
        });
        // 把数据更新回本地数据
        kits.saveData('cartListData',arr);
        // 每次点选需要计算总价和总件数
        calcTotal();
    })

    /**--------------------------------------------------- */
    // 封装一个计算总价格和总件数的函数，方便每次使用就调用
    function calcTotal(){
        // 第三个功能:计算总价和总件数
        // 每次需要计算总价和总件数，都是直接从本地数据里面，得到isChecked 为true的数据，然后计算总价和总件数
        let totalCount = 0; // 总件数
        let totalMoney = 0; //总价格
        arr.forEach(e => {
            if(e.isCheched){
                totalCount += e.number;
                totalMoney += e.number * e.price;
            }
        });
        // 把总价和总件数更新到页面里面
        $('.selected').text(totalCount);
        $('.total-money').text(totalMoney)
    }
    // 需要一开始就计算一次
    calcTotal();


    // 第四个功能 实现数量的加减  -事件委托
    $('.item-list').on('click','.add',function(){
        // 让输入框里面的数量增加
        // prev 上一个 前一个兄弟
        let prev = $(this).prev();
        let current = prev.val();
        prev.val(++current);
        // 数量也要更新到本地数据  parent--  attr--属性
        let id = $(this).parents('.item').attr('data-id');
        let obj = arr.find(e =>{
            return e.pID == id;
        });
        obj.number = current;
        // 要把数据存储到本地里面
        kits.saveData('cartListData',arr);
        // 更新总件数和总价格  调用
        calcTotal()
        // 更新右边的总价
        $(this).parents('.item').find('.computed').text(obj.number * obj.price);
    })

    // 实现减号
    $('.item-list').on('click','.reduce',function(){
        // 让输入框里面的数量减少
        // prev 上一个 前一个兄弟
        let next = $(this).next();
        let current = next.val();
        // 判断一下，当前的值是否是 小于等于1
        if(current <= 1) {
            alert('商品的件数不能小于1');
            return;
        }
        next.val(--current);
        // 数量也要更新到本地数据
        let id = $(this).parents('.item').attr('data-id');
        let obj = arr.find(e =>{
            return e.pID == id;
        });
        obj.number = current;
        // 要把数据存储到本地里面
        kits.saveData('cartListData',arr);
        // 更新总件数和总价格
        calcTotal();
        // 更新右边的总价
        $(this).parents('.item').find('.computer').text(obj.number * obj.price);

    })


    /**---------------------------------- */
    // 删除
    // 当得到焦点的时候，把当前的值，保存起来，如果失焦的时候输入的结果是不合理的，我们可以恢复原来的数字
    $('.item-list').on('blur','.number',function(){
        // 需要对用户的输入进行验证
        let current = $(this).val();
        // 每次让用户自己输入的内容，一定要做合法性判断
        if(current.trim().length === 0 || isNaN(current) || parseInt(current) <= 0){
            let old = $(this).attr('data-old');
            // 如果用户输入的不正确，恢复以前的正确数字
            $(this).val(old); 
            alert('商品数量不正确，请输入一个阿拉伯数字');
            return;
        }

        // 如果验证通过，把总价之类数据更新即可
        // 数量也要更新到本地数据
        let id = $(this).parents('.item').attr('data-id');
        let obj = arr.find(e =>{
            return e.pID == id;
        });
        obj.number = parseInt(current);
        // -----
        // 要把数据存储到本地里面
        kits.saveData('cartListData',arr);
        // 更新总件数和总价格
        calcTotal();
        // 更新右边的总价
        $(this).parents('.item').find('.computer').text(obj.number * obj.price);
        // --------
    })

    // 实现删除
    $('.item-list').on('click','.item-del',function(){
        layer.confirm('确定要删除吗?',{icon:0,title:'警告'},(index)=>{
            layer.close(index);
            // 在这里执行 删除的逻辑
            // 先得到要删除的数据的id
            let id = $(this).parents('item').attr('data-id');
            // 把当前点击的这个删除对应的这一行删掉
            $(this).parents('.item').remove();
            // 还要把本地存储里面的数据删除
            arr = arr.filter(e=>{
                return e.pID !=id;
            });
            kits.saveData('cartListData',arr);
            // 重新更新总件数和总价
            calcTotal();
        })
    })
})