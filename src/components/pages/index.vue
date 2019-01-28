<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <Alert></Alert>
        <IndexNavbar></IndexNavbar>
        <!-- 輪播開始 -->
            <div id="carouselExampleIndicators" class="carousel slide mt-5" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="../../../static/images/banner-1.jpg" alt="First slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="../../../static/images/banner-2.jpg" alt="Third slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="../../../static/images/banner-3.jpg" alt="Third slide">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        <!-- 輪播結束 -->
        <img id="Positioning"  class="rounded mx-auto d-block mt-3" src="../../../static/images/icon_title.png" alt="First slide">

        <div class="container">
            <router-view></router-view>
        </div>
        <CartModal></CartModal>
        <!-- 服務說明開始 -->
            <section class="service d-none d-sm-block">
                <div class="container">
                    <div class="row text-center">
                        <div class="col-4">
                            <div class="single-item border border-info rounded">
                            <i class="fa fa-truck fa-4"></i>
                            <h4>免費運送</h4>
                            <p  class="text-primary">訂購產品直達你家</p>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="single-item border border-info rounded">
                            <i class="fas fa-sync-alt fa-4"></i>
                            <h4>免費退貨</h4>
                            <p>30天以內保證退貨</p>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="single-item border border-info rounded">
                            <i class="far fa-clock fa-4"></i>
                            <h4>全年無休</h4>
                            <p>24小時線上營運</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        <!-- 服務說明結束 -->

        <!-- 底部區域開始 -->
            <footer class="footer-area">
                <!--Footer Middle Area Start-->
                    <div class="footer-middle section-padding2">
                        <div class="container">
                            <div class="row">
                                <div class="footer-border-right col-lg-5 col-md-5 col-sm-6 col-xs-12 ">
                                    <div class="footer-middle-content">
                                        <a href="index.html"><img src="../../../static/images/logo-footer.png" alt=""></a>
                                        <p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum。典型的非洲裔美國人;在iis qui facit中，我們使用了legentis。</p>
                                        <div class="social-icon">
                                            <ul>
                                                <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                                <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                                <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                                                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                                <li><a href="#"><i class="fab fa-google-plus-g"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                    <div class="contact-area">
                                        <h3 class="footer-widget-title">聯繫我們</h3>
                                        <div class="footer-info contact">
                                        <ul class="toggle-footer">
                                            <li>
                                            <i class="fas fa-map-marker-alt"></i>
                                            100台北市中正區重慶南路一段122號
                                            </li>
                                            <li>
                                            <i class="fas fa-phone"></i>
                                            <p>電話：866-540-3229 <br>傳真：866-540-3229</p>
                                            </li>
                                            <li>
                                            <i class="far fa-envelope"></i>
                                            電子郵件：admin@know-how.com.tw
                                            </li>
                                            <li>
                                            <i class="fas fa-globe-asia"></i>
                                            網站：www.know-how.com.tw
                                            </li>
                                        </ul>               
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 hidden-sm">
                                    <div class="time-area">
                                        <h3 class="footer-widget-title">營業時間</h3>
                                        <ul class="toggle-footer">
                                            <li>
                                                週一至週五：9：00-22：00
                                            </li>
                                            <li>
                                                週六：10：00 至 24:00
                                            </li>
                                            <li>
                                                週日：12：00 至 24:00
                                            </li>
                                        </ul>
                                        <div class="paypal">
                                            <img src="../../../static/images/paypal.png" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <!--Footer Middle Area End-->
                
            </footer>
        <!-- 底部區域結束 -->
    </div>
</template>

<script>
import $ from "jquery";
import CartModal from './CartModal.vue';
import IndexNavbar from './indexNavbar.vue';
import Alert from '../AlertMessage';
export default {
    
data() {
return {
    
    itemNum:'1',
    status: {
    loadingItem: ""
    },
    
    isLoading: false,
    
    coupon_code: "",
    visibility:'all',
};
},
components:{
        CartModal,
        Alert,
        IndexNavbar
    },
methods: {
    change(visibility){
        const vm = this;
        vm.visibility = visibility;
    }
},
created() {
        const vm = this;
        this.$bus.$on('filter',(visibility) => {
        vm.change(visibility);
        });
        
    },

};
</script>

<style scoped>
@import '../../assets/css/style.css';
</style>

