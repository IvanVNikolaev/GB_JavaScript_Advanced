const API_URL = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

let makeGETRequest = url => {
    return fetch(url)
        .then(result => result.json())
        .catch(error => console.log(error));
}

class goodsList {
    constructor(container = `.goods-list`) {
        this.container = container;
        this.goods = [];
        this.allGoods = [];
        this.fetchGoods()
            .then(() => this._render());
    }

    fetchGoods() {
        return makeGETRequest(`${API_URL}/catalogData.json`)
            .then(goods => {
                this.goods = [...goods];
            })
    }

    _render() {
        const block = document.querySelector(this.container);
        for (let good of this.goods) {
            const goodObject = new GoodItem(good);
            this.allGoods.push(goodObject);
            block.insertAdjacentHTML('beforeend', goodObject.render())
        }
        let buttons = document.getElementsByClassName("goods_btn");
        for (let btn of buttons) {
            btn.addEventListener("click", () => {
                cart.addGoodObjectToCart(btn.dataset.idx);
            })
        }
    }

    sum() {
        return makeGETRequest(`${API_URL}/catalogData.json`)
            .then(goods => console.log(goods.reduce((accum, item) => accum + item.price, 0)));
    }
}

class GoodItem {
    constructor(good, img = 'img/no.svg') {
        this.product_name = good.product_name;
        this.id_product = good.id_product;
        this.price = good.price;
        this.img = img;
    }
    render() {
        return `<div class="goods-item">
                <img src="${this.img}" alt="goods_image">
                <h3>${this.product_name}</h3>
                <p><span>&#36;</span>${this.price}</p>
                <button class="goods_btn" data-idx = ${this.id_product}>Add to Cart</button>
            </div>`;
    }
}

class Cart {
    constructor(container = `.wrapCart`) {
        this.container = container;
        this.goods = [];
        this.contents = [];
        this.amount = 0;
        this.countGoods = 0;
        this._getCart()
            .then(() => this._render());
    }
    init() {

    }
    _getCart() {
        return makeGETRequest(`${API_URL}/getBasket.json`)
            .then(goods => {
                this.goods = [...goods.contents];
                this.amount = goods.amount;
                this.countGoods = goods.countGoods;
            })
    }
    _render() {
        const block = document.querySelector(this.container);
        while (block.children.length > 1) {
            block.removeChild(block.lastChild);
        }
        this.contents = [];
        for (let good of this.goods) {
            const cartItem = new CartItem(good);
            this.contents.push(cartItem);
            block.insertAdjacentHTML('beforeend', cartItem.render())
        }
        let buttonsIncrease = document.getElementsByClassName("cart-increase-goodObject");
        for (let btn of buttonsIncrease) {
            btn.addEventListener("click", () => {
                this.addGoodObjectToCart(btn.dataset.idx);
            })
        }
        let buttonsDecrease = document.getElementsByClassName("cart-decrease-goodObject");
        for (let btn of buttonsDecrease) {
            btn.addEventListener("click", () => {
                this.takeOffGoodObjectFromCart(btn.dataset.idx);
            })
        }
        let buttonsDelete = document.getElementsByClassName("cart-delete-goodObject");
        for (let btn of buttonsDelete) {
            btn.addEventListener("click", () => {
                this.deleteGoodObjectFromCart(btn.dataset.idx);
            })
        }
        block.insertAdjacentHTML('beforeend',
            this._showBottom()
        )
        document.getElementById("title_btn").innerText = `Cart (${this.countGoods})`;
    }

    _showBottom() {
        return `<div class="cart-block-t">
                <p class="cart-p cart-bottom">TOTAL</p>
                <p class="cart-quantity cart-bottom">${this._getQuantity()}</p>
                <p class="cart-price cart-bottom"></p>
                <p class="cart-sum-num cart-bottom">${this._getSum()}</p>
            </div>`;
    }
    _getSum() {
        let sum = 0;
        this.contents.map(x => sum += (x.price * x.quantity));
        this.amount = sum;
        return sum;
    }
    _getQuantity() {
        let quantity = 0;
        this.contents.map(x => quantity += x.quantity);
        this.countGoods = quantity;
        return quantity;
    }
    addGoodObjectToCart(id) {
        let elementFound = false;
        for (let element of this.goods) {
            if (element.id_product == id) {
                element.quantity += 1;
                elementFound = true;
                break;
            };
        }
        if (!elementFound) {
            for (let element of products.allGoods) {
                if (element.id_product == id) {
                    this.goods.push(new CartItem(element));
                }
            }
        }
        cart._render();
    }
    takeOffGoodObjectFromCart(id) {
        for (let element of this.goods) {
            if (element.id_product == id) {
                if (element.quantity === 1) {
                    this.goods.splice(this.goods.indexOf(element), 1);
                } else {
                    element.quantity -= 1;
                }
                break;
            };
        }
        cart._render();
    }
    deleteGoodObjectFromCart(id) {
        for (let element of this.goods) {
            if (element.id_product == id) {
                this.goods.splice(this.goods.indexOf(element), 1);
                break;
            };
        }
        cart._render();
    }
    onHover() {
    }
    isEmpty() {
    }
    clearCart() {
    }
    confirm() {
    }
}

class CartItem {
    constructor(good) {
        this.id_product = good.id_product;
        this.product_name = good.product_name;
        this.price = good.price;
        this.quantity = good.quantity || 1;
    }
    render() {
        return `<div class="cart-block">
                <p class="cart-p">${this.product_name}</p>
                <p class="cart-quantity">${this.quantity}<span class="cart-decrease-goodObject" data-idx=${this.id_product}><i class="fa-solid fa-minus"></i></span><span class="cart-increase-goodObject" data-idx=${this.id_product}><i class="fa-solid fa-plus"></i></span><span class="cart-delete-goodObject" data-idx=${this.id_product}><i class="fa-solid fa-xmark"></i></span></p>
                <p class="cart-price-num">${this.price}</p>
                <p class="cart-sum-num">${this._getSum()}</p>
            </div>`
    }
    _getSum() {
        return this.price * this.quantity;
    }
}

const products = new goodsList();
const cart = new Cart();
products.sum();

