<template>
    <div>
        <!-- 導覽列開始 -->
            <nav class="navbar navbar-expand-lg navbar-light">
                <a class="navbar-brand header-logo" href="#">
                    <img src="../../../static/images/logo.png"></a>
                <button class="navbar-toggler" type="button" 
                data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto text-nowrap">
                    
                    <li class="nav-item" >
                        <router-link to="/" class="nav-link">
                            首頁
                        </router-link>
                    </li>
                    <li class="nav-item" >
                        <router-link to="/category" class="nav-link">
                            商品
                        </router-link>
                    </li>
                    <!-- <li class="nav-item" >
                    <a class="nav-link" href="#" @click="gotous">關於我們</a> -->
                    
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link">
                            <i class="fa fa-user"></i>管理者登入
                        </router-link>
                    </li>
                    
                </ul>
                </div>
            </nav>              
        <!-- 導覽列結束 -->
    </div>
</template>
<script>
import $ from "jquery";
export default {
    data(){
        return {
            
        }
    },
    methods: {
    },
}
</script>
<style scoped>
@import '../../assets/css/style.css';
</style>