<template>
    <div>
        
        <!-- 上方流程狀態 -->
            <div class="form-row text-center">
                <div class="col-12 col-sm">
                    <div class="alert alert-success alert-rounded border-light" role="alert">
                        1. 輸入訂單資料
                    </div>
                </div>
                <div class="col-12 col-sm">
                    <div class="alert alert-success alert-rounded border-light" role="alert">
                        2. 金流付款
                    </div>
                </div>
                <div class="col-12 col-sm">
                    <div class="alert alert-light alert-rounded border-light" role="alert" v-if="order.is_paid === false">
                        3. 完成！
                    </div>
                    <div class="alert alert-success alert-rounded border-light" role="alert" v-if="order.is_paid === true">
                        3. 完成！
                    </div>
                </div>
            </div>
        <!-- 上方流程狀態 -->
        <!-- 確認訂購資訊 -->
            <div class="my-5 row justify-content-center">
                <form class="col-md-6" @submit.prevent="payOrder">
                    <table class="table">
                    <thead>
                        <tr>
                            <th>品名</th>
                            <th>數量</th>
                            <th>單價</th> 
                        </tr>
                        
                    </thead>
                    <tbody>
                        <tr v-for="item in order.products" :key="item.id">
                        <td class="align-middle">{{ item.product.title }}</td>
                        <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                        <td class="align-middle text-right">{{ item.final_total }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                        <td colspan="2" class="text-right">總計</td>
                        <td class="text-right">{{ order.total }}</td>
                        </tr>
                    </tfoot>
                    </table>

                    <table class="table">
                    <tbody>
                        <tr>
                        <th width="100">Email</th>
                        <td>{{ order.user.email }}</td>
                        </tr>
                        <tr>
                        <th>姓名</th>
                        <td>{{ order.user.name }}</td>
                        </tr>
                        <tr>
                        <th>收件人電話</th>
                        <td>{{ order.user.tel }}</td>
                        </tr>
                        <tr>
                        <th>收件人地址</th>
                        <td>{{ order.user.address }}</td>
                        </tr>
                        <tr>
                        <th>付款狀態</th>
                        <td>
                            <span v-if="!order.is_paid">尚未付款</span>
                            <span v-else class="text-success">付款完成</span>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    <div class="text-right" v-if="order.is_paid === false">
                        <button class="btn btn-danger">確認付款去</button>
                    </div>
                    <router-link to='/'>
                        <div class="text-right">
                            <button class="btn btn-danger" v-if="order.is_paid != false">回首頁</button>
                        </div>
                    </router-link>
                </form>
            </div>
        <!-- 確認訂購資訊 -->
    </div>
</template>
<script>
export default {
    data(){
        return{
            order:{
                user:{}
            },
            orderId:'',
        }
    },
    methods:{
        getOrder(){
            const vm =this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
            
            vm.isLoading = true;
            this.$http.get(url).then((response) => {
                vm.order = response.data.order;
                console.log(response);
                vm.isLoading = false;
            });
        },
        payOrder(){
            const vm =this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
            
            vm.isLoading = true;
            this.$http.post(url).then((response) => {
                console.log(response);
                if(response.data.success){
                    vm.getOrder();
                }
                vm.isLoading = false;
                vm.$bus.$emit('message:push', '謝謝您的購買!', 'success');
                vm.$bus.$emit('message:push', '將於5秒後自動回到首頁', 'primary');
                setTimeout(() => {
                    vm.$router.push('/')
                }, 5000)
            });
        }

    },
    created(){
        this.orderId =this.$route.params.orderId;
        this.getOrder();
        // console.log(this.orderId)
    },
}
</script>