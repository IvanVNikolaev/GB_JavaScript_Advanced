Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: 'img/no.svg'
        }
    },
    methods: {
        filter(filterText) {
            let regexp = new RegExp(filterText, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.$parent.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
    },


    template: `<div class="goods-list">
           <product 
           v-for="el of filtered" 
           :key="el.id_product"
           :img="imgCatalog"
           :product="el"></product>
        </div>`
});

Vue.component('product', {
    props: ['product', 'img'],
    template: ` <div class="goods-item" >
                <img :src="img" :alt="product.product_name">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p><span>$</span>{{product.price}}</p>
                    <button class="goods_btn" @click="$root.$refs.cart.addProduct(product)">Add to Cart</button>
                </div>
            </div>`
});