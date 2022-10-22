Vue.component('cart', {
    data() {
        return {
            showCart: false,
            cartUrl: '/getBasket.json',
            imgCart: 'img/no.svg',
            cartItems: [],
        }
    },
    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++
                        } else {
                            let prod = Object.assign({ quantity: 1 }, product);
                            this.cartItems.push(prod);
                        }
                    }
                })
        },
        remove(product) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {
                        if (product.quantity > 1) {
                            product.quantity--
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1)
                        }
                    }
                })
        },
    },
    mounted() {
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `<div>
                <button class="title_btn" type="button" @click="showCart = !showCart">Cart</button>
                    <div class="cart-block" v-show="showCart">
                        <p v-if="!cartItems.length">Cart is empty</p>
                        <cart-item 
                            v-for="item of cartItems" 
                            :key="item.id_product"
                            :cart-item="item"
                            :img="imgCart"
                            @remove="remove"></cart-item>
               </div>
</div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="cart-item" >
                <div class="product-bio">
                    <img :src="img" :alt="cartItem.product_name">
                    <p class="product-title">{{cartItem.product_name}}</p>
                    <p class="product-quantity"><span>Quantity: </span>{{cartItem.quantity}}</p>
                    <p class="product-single-price"><span>Price: </span><span>$</span>{{cartItem.price}}</p>
                    <p class="product-price"><span>Sum: </span><span>$</span>{{cartItem.quantity*cartItem.price}}</p>
                    <button class="del-btn" @click="$emit('remove', cartItem)"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div>`
});