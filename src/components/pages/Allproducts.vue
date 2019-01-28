<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        
<!-- 商品清單 -->
        <div class="contener">
            <div class="row mt-4">
                <div class="col-md-4 mb-4" v-for="item in filterProducts" :key="item.id">
                    <div class="card border-0 shadow-sm">
                        <div style="height: 150px; background-size: 
                        cover; background-position: center" :style="{backgroundImage:`url(${item.imageUrl})`}">
                    </div>
                        <div class="card-body">
                        <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                        <h5 class="card-title">
                            <a href="#" class="text-dark">{{item.title}}</a>
                        </h5>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <!-- <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>  前者顯示僅由原價的 -->
                            <del class="h6" v-if="item.price < item.origin_price">
                                原價 {{ item.origin_price }} 元</del> <!-- 後者顯示僅由原價+優惠價 -->
                            <div class="h5 rounded ml-auto d-block">
                                <p v-if="item.price < item.origin_price">現在只要 {{ item.price }} 元</p>
                                <p v-if="item.price >= item.origin_price">售價 {{ item.price }} 元</p>  
                            </div>
                        </div>
                        </div>
                        <div class="card-footer d-flex">
                        <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                            查看更多
                        </button>
                        <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id,item.title)">
                            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                            加到購物車
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
<!-- 商品清單 -->       
<!-- 顯示更多 -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img :src="product.imageUrl" class="img-fluid rounded mx-auto d-block" alt="">
                    <blockquote class="blockquote mt-3">
                    <p class="mb-0">{{ product.content }}</p>
                    <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                    </blockquote>
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
                </div>
                <div class="modal-footer">
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
<!-- 顯示更多 -->
    </div>
</template>

<script>
import $ from 'jquery';

export default{
    data(){
        return{
            products:[],
            product:{},
            itemNum: '1',
            status:{
                loadingItem:'',
            },
            isLoading:false,
            cart:{},
            visibility:'all',
        };
    },
    
    methods:{
        getProducts(visibility){
            const vm =this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;  
            vm.isLoading = true;
            vm.visibility = visibility;
            this.$http.get(url).then((response) => {
                vm.products = response.data.products;
                console.log('獲取products');
                vm.isLoading = false;
            });

        },
        getProduct(id){
            const vm =this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;  
            this.$http.get(url).then((response) => {
                // $('#productModal').modal('show');
                // console.log(response);
                vm.$router.push(`/productdata/${response.data.product.id}`);
                // vm.status.loadingItem = '';
            });
        },
        addtoCart(id ,title, qty = 1){
            const vm =this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;  
            vm.status.loadingItem = id;
            const cart ={
                product_id:id,
                qty,
            }
            this.$http.post(url,{data:cart}).then((response) => {
                console.log('加入購物車');
                
                // $('#productModal').modal('hide');
                // vm.getCart();
                vm.$bus.$emit('getcart');
                vm.$bus.$emit('message:push', `${title}加到購物車囉！`, 'success');
                vm.status.loadingItem = '';
            }); 
        },
    },
    computed:{
    filterProducts(){
        const vm = this;
        if(vm.visibility=='all'){
            return this.products;
        }else{
            var newPorducts =[];
            vm.products.forEach(function(item){
                if(vm.visibility == item.category){
                    newPorducts.push(item);
                }
            })
            return newPorducts;
        }
        return [];
    }
    },
    created() {
        const vm = this;
        this.getProducts('all');
        // this.$bus.$on('filter',(visibility) => {
        // vm.visibility =visibility;
        // vm.getProducts(visibility);
        // });
        
    },
}
</script>