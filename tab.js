class Tab {
    constructor(options) {
        options = options || {};
        this.itemClass = options.itemClass || '.item';
        this.eventType = options.eventType || 'mouseover';
        this.itemActiveClass = options.itemActiveClass || 'active';
        this.contentClass = options.contentClass || '.content';
        this.contentShowClass = options.contentShowClass || 'show';

        this.items = document.querySelectorAll(this.itemClass);
        this.contetns = document.querySelectorAll(this.contentClass);

        this.addEvent();
    }

    // 封装方法
    // 注册事件
    addEvent() {
        this.items.forEach((e, i) => {
            e.addEventListener(this.eventType, (e) => {
                let target = e.target;
                // 切换分类
                this.changeItems(target);
                // 切换内容
                this.changeContent(i);
            })
        })
    }
    // 切换分类
    changeItems(current) {
        // 把当前点的那一个变红，把其他的变白
        this.items.forEach(e => {
            e.classList.remove(this.itemActiveClass);
        })
        // 把点击的那一个变红
        current.classList.add(this.itemActiveClass);

    }
    // 切换内容
    changeContent(index) {
        // 把所有的内容隐藏
        this.contetns.forEach(e => {
            e.classList.remove(this.contentShowClass);
        })
        // 把对应的内容显示
        this.contetns[index].classList.add(this.contentShowClass);
    }
}