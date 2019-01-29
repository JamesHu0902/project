<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="container mt-4">
            <div class="row">
                <div class="col-md-6">
                    <img :src="product.imageUrl" class="img-fluid rounded mx-auto d-block col-10" alt="">
                </div>
                <div class="col-md-6">
                    <h3 class="h3">{{ product.title }}</h3>
                    <blockquote class="blockquote mt-3">
                        <p class="mb-0">{{ product.content }}</p>
                        <p class="blockquote-footer text-right">{{ product.description }}</p>
                    </blockquote>
                    <!-- 分隔 -->
                    <div class="border border-primary  p-5 mt-5 bg-light">
                        <div class="d-flex justify-content-between align-items-baseline">
                        <!-- <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div> -->
                        <del class="h6" v-if="product.price < product.origin_price">原價 {{ product.origin_price }} 元</del>
                        <div class="h4" v-if="product.price < product.origin_price">現在只要 {{ product.price }} 元</div>
                        <div class="h4 rounded ml-auto d-block" v-if="product.price >= product.origin_price">售價 {{ product.price }} 元</div>
                    </div>
                        <select name="" class="form-control mt-3" v-model="itemNum">
                            <option :value="buy" v-for="buy in 10" :key="buy">
                                選購 {{buy}} {{product.unit}}
                            </option>
                        </select>

                        <div class="mt-5 d-flex justify-content-end">
                            <div class="text-muted text-nowrap mr-3">
                            小計 <strong>{{ itemNum * product.price }}</strong> 元
                            </div>
                            <button type="button" class="btn btn-primary"
                                @click="addtoCart(product.id, itemNum)">
                                <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                                加到購物車
                            </button>
                        </div>
                    
                    
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';

export default {
    data(){
        return{
            productId:'',
            product:{},
            itemNum: '1',
            status:{
                loadingItem:'',
            },
            isLoading:false,
        }
    },
    methods:{
        getProduct(id){
            const vm =this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.productId}`;  
            vm.itemNum = 1;
            this.$http.get(url).then((response) => {
                vm.product = response.data.product;
                // console.log('讀取product完成');
                vm.productId = '';
            });
        },
        addtoCart(id , qty = 1){
            const vm =this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`; 
            vm.status.loadingItem = id;
            const cart ={
                product_id:id,
                qty,
            }
            this.$http.post(url,{data:cart}).then((response) => {
                console.log('加入購物車');
                
                vm.$bus.$emit('getcart');
                vm.$bus.$emit('message:push', `加到購物車囉！`, 'success');
                vm.status.loadingItem = '';
            }); 
        },
    },
    created(){
        this.productId = this.$route.params.id;
        this.getProduct();
    }
}
</script>