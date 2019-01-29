<template>
    <div class="container mb-3 mt-4">
        
        <swiper :options="swiperOption" class="topSwiper" v-if="filterProducts.length>0">
            <swiper-slide v-for="item in filterProducts" :key="item.id">
            <div class="slide " >
                <div class="slide col mb-4" >
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
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination" v-if="filterProducts.length>3"></div>
        </swiper>


        
    </div> 
</template>


<script>
import $ from 'jquery';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
name: 'aboutus',
data() {
    return {
        products:[],
        status:{
                loadingItem:'',
        },
        isLoading:false,
        swiperOption: {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 3,
            loop: true,
            autoplay: {
            delay: 3000,
            },
            loopFillGroupWithBlank: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            
        },
    
    }
},
    components: {
    swiper,
    swiperSlide
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
    },
    computed:{
    filterProducts(){
        const vm = this;
        var newPorducts =[];
        vm.products.forEach(function(item){
            if(item.hotcake == true){
                newPorducts.push(item);
            }
        });
        return newPorducts;
        
        
        },
    },
    created() {
        const vm = this;
        this.getProducts();
        
    },
}
</script>

<style lang="scss" scoped>
.swiper-container{
    height: 250px;
    @media (min-width: 768px) {
    height: 380px;
    }   
}

</style>
