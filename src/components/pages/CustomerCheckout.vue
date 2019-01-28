<template>
    <div>
        <div class="container py-5">
            <Alert></Alert>
            <img src="../../../static/images/logo.png" class="rounded mx-auto d-block mb-5">
            <router-view></router-view>
        </div>
        
    </div>
    
</template>

<script>
import Alert from '../AlertMessage';

export default{
    data(){
        return{
            order:{
                user:{}
            },
            orderId:'',
        }
    },
    components:{
        Alert,
    },
    methods:{
        getOrder(){
            const vm =this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
            
            vm.isLoading = true;
            this.$http.get(url).then((response) => {
                vm.order = response.data.order;
                // console.log(response);
                vm.isLoading = false;
            });
        },
        payOrder(){
            const vm =this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
            
            vm.isLoading = true;
            this.$http.post(url).then((response) => {
                // console.log(response);
                if(response.data.success){
                    vm.getOrder();
                }
                vm.isLoading = false;
            });
        }

    },
    created(){
        this.orderId =this.$route.params.orderId;
        this.getOrder();
        // console.log(this.orderId)
    }
}
</script>