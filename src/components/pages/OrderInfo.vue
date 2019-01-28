<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <!-- 上方流程狀態 -->
            <div class="form-row text-center">
                <div class="col-12 col-sm">
                    <div class="alert alert-success alert-rounded border-light" role="alert">
                        1. 輸入訂單資料
                    </div>
                </div>
                <div class="col-12 col-sm">
                    <div class="alert alert-light alert-rounded border-light" role="alert">
                        2. 金流付款
                    </div>
                </div>
                <div class="col-12 col-sm">
                    <div class="alert alert-light alert-rounded border-light" role="alert">
                        3. 完成！
                    </div>
                </div>
            </div>
        <!-- 上方流程狀態 -->
        <!-- 訂單資訊 -->
            <div class="row justify-content-center mt-5">
                <div class="col-md-10 mt-4" id="cart">
                        <div class="card mt-5 mb-4 border-0">
                            <div class="card-header">
                                <h4 class="h4 mb-0 text-center">訂單資訊</h4>
                            </div>
                        </div>
                        <table class="table" v-if="cart.final_total>0">
                            <thead>
                                <th></th>
                                <th>品名</th>
                                <th>數量</th>
                                <th>單價</th>
                            </thead>
                            <tbody>
                                <tr v-for="item in cart.carts" :key="item.id">
                                <td class="align-middle">
                                    <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                                    <i class="far fa-trash-alt"></i>
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
                        <div class="text-center h6 mt-4 text-secondary" v-if="cart.carts.length == 0">
                            目前尚未選購商品唷！
                        </div>
                        <div class="input-group mb-3 input-group-sm" v-if="cart.carts.length != 0">
                            <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                                套用優惠碼
                                </button>
                            </div>
                        </div>
                        
                </div>
            </div>
        <!-- 訂單資訊 -->
        <!-- 建立訂單及購物車頁面驗證 -->
            <div class="my-5 row justify-content-center" v-if="cart.carts.length != 0">
                <form class="col-md-10 mt-4" @submit.prevent="createOrder">
                    <div class="card mt-5 mb-4 border-0">
                        <div class="card-header">
                            <h4 class="h4 mb-0 text-center">訂購人資訊</h4>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="useremail">Email</label>
                        <input type="email" class="form-control" name="email" id="useremail"
                            v-validate="'required|email'" :class="{'is-invalid':errors.has('email')}"
                            v-model="form.user.email" placeholder="請輸入 Email" >
                        <span class="text-danger" v-if="errors.has('email')">
                            {{ errors.first('email') }}
                        </span>
                    </div>
                
                    <div class="form-group">
                        <label for="username">收件人姓名</label>
                        <input type="text" class="form-control" name="name" id="username"
                            :class="{'is-invalid':errors.has('name')}"
                            v-model="form.user.name" v-validate="'required'" placeholder="輸入姓名">
                        <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
                    </div>
                
                    <div class="form-group">
                        <label for="usertel">收件人電話</label>
                        <input type="tel" name="tel" class="form-control" id="usertel" 
                        v-validate="'required'" :class="{'is-invalid':errors.has('tel')}"
                        v-model="form.user.tel" placeholder="請輸入電話">
                        <span class="text-danger" v-if="errors.has('tel')">電話不得留空</span>
                    </div>
                
                    <div class="form-group">
                        <label for="useraddress">收件人地址</label>
                        <input type="address" class="form-control" name="address"
                            id="useraddress" v-model="form.user.address" :class="{'is-invalid':errors.has('address')}"
                            v-validate="'required'" placeholder="請輸入地址">
                        <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
                    </div>
                
                    <div class="form-group">
                        <label for="useraddress">留言</label>
                        <textarea name="" id="" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                    </div>
                    <div class="text-right">
                        <button class="btn btn-danger">送出訂單</button>
                    </div>
                </form>
            </div>
        <!-- 建立訂單及購物車頁面驗證 -->
        <div class="text-center mt-5">  
            <router-link to="/">
                <button class="btn btn-danger" v-if="cart.carts.length == 0">回首頁</button> 
            </router-link>
            
        </div>
        
    </div>
</template>
<script>
import $ from 'jquery';

export default {
    data(){
        return{
            cart:{
                carts:[],
            },
            form:{
                user:{
                    name:'',
                    email:'',
                    tel:'',
                    address:'',
                },
                message:'',
            },
            coupon_code:'',
            final_total:'',
            isLoading: false,
        }
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
        removeCartItem(id) {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${
            process.env.CUSTOMPATH
            }/cart/${id}`;

            vm.isLoading = true;
            this.$http.delete(url).then(response => {
            // vm.cart = response.data.data;
            console.log(response);
            vm.getCart();
            vm.$bus.$emit('message:push', '從購物車刪除囉!', 'danger');
            vm.isLoading = false;
            });
        },
        addCouponCode() {
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
            const coupon = {
            code: vm.coupon_code
            };
            vm.isLoading = true;
            this.$http.post(url, { data: coupon }).then(response => {
            console.log(response);
            vm.getCart();
            vm.$bus.$emit('message:push', '優惠卷使用成功!', 'warning');
            vm.isLoading = false;
            });
        },
        createOrder(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
            const order = vm.form;
            // vm.isLoading = true;
            this.$validator.validate().then((result) => {
                if (result) {
                    this.$http.post(url, { data: order }).then((response) => {
                        // console.log('訂單要求送出',response);
                        if (response.data.success) {
                            vm.$router.push(`/customer_checkout/payment/${response.data.orderId}`);
                            vm.$bus.$emit('message:push', '訂單建立成功!', 'success');
                        }else{
                        console.log('訂單建立失敗',response.data.success);
                        vm.$bus.$emit('message:push', '訂單建立失敗!', 'danger');
                        // vm.$bus.$emit('message:push', response.data.success, 'danger');  
                        }
                        // vm.getCart();
                        vm.isLoading = false;
                    });
                }else{
                    vm.$bus.$emit('message:push', '欄位不完整!', 'danger')
                    // console.log('欄位不完整')
                }
            });
            
        },
        

        },
    created(){
        
        this.getCart();
    },
}
</script>