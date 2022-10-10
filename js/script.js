const goods = [
    { title: 'Pulp Fiction', price: 4500 },
    { title: 'Death Proof', price: 2750 },
    { title: 'Django Unchained', price: 6900 },
    { title: 'Kill Bill', price: 3250 },
];

const renderGoodsItem = (item, img = 'img/no.svg') => {
    return `<div class="goods-item">
                <img src="${img}" alt="goods_image">
                <h3>${item.title}</h3>
                <p><span>&#36;</span>${item.price}</p>
                <button class="goods_btn">Add to Cart</button>
            </div>`;
};

const renderGoodsList = list => {
    let goodsList = list.map(item => renderGoodsItem(item));
    document.querySelector('.goods-list').insertAdjacentHTML('beforeend', goodsList.join(""));
};

renderGoodsList(goods);
