
$(function () {
  // 准备一个字符串，用于把所有的商品结构以字符串的形式先表达出来
  let html = ``;

  phoneData.forEach(e => {
    // 把数据拼接
    html += `<li class="goods-list-item">
      <a href="detail.html?id=${e.pID}">
        <div class="item-img">
          <img src="${e.imgSrc}" alt="">
        </div>
        <div class="item-title">${e.name}</div>
        <div class="item-price">
          <span class="now">¥${e.price}</span>
        </div>
        <div class="sold">
          <span> 已售 <em>${e.percent}% </em></span>
          <div class="scroll">
            <div class="per" style="width:${e.percent}%"></div>
          </div>
          <span>剩余<i>${e.left}</i>件</span>
        </div>
      </a>
      <a href="#" class="buy">
        查看详情
      </a>
    </li>`
  })
  // 把拼接的数据插入ul里
  $('.goods-list > ul').append(html)



})