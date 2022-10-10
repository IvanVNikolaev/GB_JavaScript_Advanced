class goodsList {
    constructor(container = '.goods-list') {
        this.container = container;
        this.goods = [];
        this.allGoods = [];
        this.fetchGoods();
        this._render();
    }

    fetchGoods() {
        this.goods = [
            { title: 'Pulp Fiction', price: 4500 },
            { title: 'Death Proof', price: 2750 },
            { title: 'Django Unchained', price: 6900 },
            { title: 'Kill Bill', price: 3250 },
        ];
    }

    _render() {
        const block = document.querySelector(this.container);
        for (let good of this.goods) {
            const goodObject = new GoodItem(good);
            this.allGoods.push(goodObject);
            block.insertAdjacentHTML('beforeend', goodObject.render());
        }
    }

    sum() {
        let sum = 0;
        for (let item of this.goods) {
            sum += item.price;
        }
        return sum;
    }
}

class GoodItem {
    constructor(good, img = 'img/no.svg') {
        this.title = good.title;
        this.price = good.price;
        this.img = img;
    }

    render() {
        return `<div class="goods-item">
                <img src="${this.img}" alt="goods_image">
                <h3>${this.title}</h3>
                <p><span>&#36;</span>${this.price}</p>
                <button class="goods_btn">Add to Cart</button>
            </div>`;
    }
}

const goods = new goodsList();
console.log("Total " + goods.sum());



class Cart {
    constructor() {
        this.goodsInCart = [];
    }

    add(item) {

    }

    remove(item) {

    }

    _render() {

    }
}

class CartItem {
    constructor(item, qty = 1) {
        this.qty = qty;
    }

    _render() {

    }

    changeQty() {

    }
}
