<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="container fixed-top">
            <div class="row">
                <div class="col-md-2 order-1 order-sm-2 text-center">
                    <ul class="header-bottom-right-inner">
                        <li>
                            <button type="button" class="btn btn-link" 
                            @click.prevent="getCart()"
                            data-toggle="modal" data-target="#cartModal">
                                <a href="#" class="cart-toggler mini-cart-icon">
                                    <span><i class="fa fa-shopping-cart"></i></span>
                                    <span>{{cart.carts.length}}</span>
                                </a>
                            </button>
                            
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
    <!-- 購物車 -->
        <div class="modal fade" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">購物車</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row my-4 ml-3" id="cart">
                            <div class="col-11" v-if="cart.final_total>0">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>品名</th>
                                            <th>數量</th>
                                            <th>單價</th> 
                                        </tr>
                                        
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in cart.carts" :key="item.id">
                                        <td class="align-middle">
                                            <button type="button" class="btn btn-outline-danger btn-sm" 
                                            @click="removeCartItem(item.id,item.product.title)">
                                            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                                            <i class="far fa-trash-alt" v-if="status.loadingItem !== item.id"></i>
                                            </button>
                                        </td>
                                        <td class="align-middle">
                                            {{ item.product.title }}
                                            <div class="text-success" v-if="item.coupon">
                                            已套用優惠券 {{item.coupon.title}}
                                            </div>
                                        </td>
                                        <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                                        <td class="align-middle text-right">{{ item.final_total }}</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                        <td colspan="3" class="text-right">總計</td>
                                        <td class="text-right">{{ cart.total }}</td>
                                        </tr>
                                        <tr v-if="cart.final_total !== cart.total">
                                        <td colspan="3" class="text-right text-success">折扣價</td>
                                        <td class="text-right text-success">{{ cart.final_total }}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <!-- <div class="input-group mb-3 input-group-sm">
                                    <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                                        套用優惠碼
                                        </button>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <div class="text-center h4 mb-5 text-secondary" v-if="cart.carts.length == 0">
                        目前尚未選購商品唷！
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                        <button type="button" class="btn btn-danger" @click="gotoPay" v-if="cart.carts.length != 0">結帳去</button>
                        <router-link to="/">
                            <button type="button" class="btn btn-info" @click="gotoPay" v-if="cart.carts.length == 0">選購去</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    <!-- 購物車結束 -->
    </div>
    

</template>

<script>
import $ from 'jquery';

export default {
    data() {
        return {
            status: {
            loadingItem: ""
            },
            form: {
            user: {
                name: "",
                email: "",
                tel: "",
                address: ""
            },
            message: ""
            },
            isLoading: false,
            cart: {
                carts:[],
            },
            coupon_code: "",
            
        };
    },
    methods: {
        getCart() {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;

            vm.isLoading = true;
            this.$http.get(url).then(response => {
            vm.cart = response.data.data;
            // console.log(response);
            vm.isLoading = false;
            });
            },
        removeCartItem(id,title) {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${
            process.env.CUSTOMPATH
            }/cart/${id}`;
            vm.status.loadingItem =id;
            vm.isLoading = true;
            this.$http.delete(url).then(response => {
            // vm.cart = response.data.data;
            console.log('刪除成功');
            vm.getCart();
            vm.$bus.$emit('message:push', `${title}從購物車刪除囉!`, 'danger');
            vm.isLoading = false;
            });
        },
        // addCouponCode() {
        //     const vm = this;
        //     const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
        //     const coupon = {
        //     code: vm.coupon_code
        //     };
        //     vm.isLoading = true;
        //     this.$http.post(url, { data: coupon }).then(response => {
        //     console.log('加入優惠卷');
        //     vm.getCart();
        //     vm.isLoading = false;
        //     });
        // },
        gotoPay(){
            this.$router.push('/customer_checkout');
            $('#cartModal').modal('hide');
        }

        },
        created(){
            const vm = this;
            this.getCart();
            this.$bus.$on('getcart',() => {
            vm.getCart();
            });
        },
}
</script>

<style scoped>
@import '../../assets/css/style.css';
</style>