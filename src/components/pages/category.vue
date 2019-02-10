<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        
<!-- 商品清單 -->
        <div class="contener">
            <div class="row mt-4">
            <!-- 左側按鈕 -->
                <!-- sm按鈕 -->
                <div class="">
                    <div class="row  text-center">
                        <div class="col-10 btn-group d-md-none mb-1 mx-auto" role="group" aria-label="Basic example">
                            <button type="button" @click="putvisibility('all')" :class="{'active':visibility=='all'}"
                            class="list-group-item list-group-item-action rounded m-1">
                                全部
                            </button>
                            <button type="button" @click="putvisibility('臥室')" :class="{'active':visibility=='臥室'}"
                            class="list-group-item list-group-item-action rounded m-1">臥室</button>
                            <button type="button" @click="putvisibility('桌子')" :class="{'active':visibility=='桌子'}"
                            class="list-group-item list-group-item-action rounded m-1">桌子</button>
                        </div>
                        <div class="col-10 btn-group d-md-none mb-4 mx-auto" role="group" aria-label="Basic example">
                            <button type="button" @click="putvisibility('椅子')" :class="{'active':visibility=='椅子'}"
                            class="list-group-item list-group-item-action rounded m-1">椅子</button>
                            <button type="button" @click="putvisibility('擺飾')" :class="{'active':visibility=='擺飾'}"
                            class="list-group-item list-group-item-action rounded m-1">擺飾</button>
                            <button type="button" @click="putvisibility('燈光')" :class="{'active':visibility=='燈光'}"
                            class="list-group-item list-group-item-action rounded m-1">燈光</button>
                        </div> 
                    </div>
                </div>
                
                <!-- md按鈕 -->
                <div class="list-group col-md-2 d-none d-md-block">
                    <button type="button" @click="putvisibility('all')" :class="{'active':visibility=='all'}"
                    class="list-group-item list-group-item-action">
                        全部
                    </button>
                    <button type="button" @click="putvisibility('臥室')" :class="{'active':visibility=='臥室'}"
                    class="list-group-item list-group-item-action">臥室</button>
                    <button type="button" @click="putvisibility('桌子')" :class="{'active':visibility=='桌子'}"
                    class="list-group-item list-group-item-action">桌子</button>
                    <button type="button" @click="putvisibility('椅子')" :class="{'active':visibility=='椅子'}"
                    class="list-group-item list-group-item-action">椅子</button>
                    <button type="button" @click="putvisibility('擺飾')" :class="{'active':visibility=='擺飾'}"
                    class="list-group-item list-group-item-action">擺飾</button>
                    <button type="button" @click="putvisibility('燈光')" :class="{'active':visibility=='燈光'}"
                    class="list-group-item list-group-item-action">燈光</button>
                </div>
            <!-- 左側按鈕 -->
            <!-- 右側商品 -->
                <div class="col-md-10 ">
                    <div class="row">
                        <div class="col-lg-4 col-md-6 mb-4" v-for="item in filterProducts" :key="item.id">
                            <div class="card border-0 shadow-sm">
                                <div style="height: 150px; background-size: 
                                cover; background-position: center" :style="{backgroundImage:`url(${item.imageUrl})`}">
                            </div>
                                <div class="card-body">
                                <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                                <h5 class="card-title">
                                    <a href="#" class="text-dark" @click="getProduct(item.id)">
                                        <i class="fas fa-crown" v-if="item.hotcake"></i>{{item.title}}</a>
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
                
            <!-- 右側商品 -->
                
            </div>
        </div>
<!-- 商品清單 -->       

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
        getProducts(){
            const vm =this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;  
            vm.isLoading = true;
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
        putvisibility(visibility){
            const vm = this;
            vm.visibility = visibility;
            vm.getProducts();
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
        this.getProducts();
        
    },
}
</script>