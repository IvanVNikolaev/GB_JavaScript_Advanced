

// ----------------ДЗ БУДЕТ ГОТОВО 15.10 ----------------
// ----------------ДЗ БУДЕТ ГОТОВО 15.10 ----------------
// ----------------ДЗ БУДЕТ ГОТОВО 15.10 ----------------












const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url, callback) {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
}

class goodsList {
    constructor(container = '.goods-list') {
        this.container = container;
        this.goods = [];
        this.allGoods = [];
        this.fetchGoods();
        this._render();
    }

    fetchGoods(cb) {
        // this.goods = [
        //     { product_name: 'Pulp Fiction', price: 4500 },
        //     { product_name: 'Death Proof', price: 2750 },
        //     { product_name: 'Django Unchained', price: 6900 },
        //     { product_name: 'Kill Bill', price: 3250 },
        // ];
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            cb();
        })
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
        this.product_name = good.product_name;
        this.price = good.price;
        this.img = img;
    }

    render() {
        return `<div class="goods-item">
                <img src="${this.img}" alt="goods_image">
                <h3>${this.product_name}</h3>
                <p><span>&#36;</span>${this.price}</p>
                <button class="goods_btn">Add to Cart</button>
            </div>`;
    }
}



const list = new goodsList();

list.fetchGoods(() => {
    list._render();
});


// list.fetchGoods();
// list._render();

console.log("Total " + list.sum());
