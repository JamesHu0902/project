<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <!-- 導覽列開始 -->
            <div class="header-area">
                <div class="header-top">
                    <div class="container">
                    <div class="row">
                        <div class="col">
                        <div class="header-default">
                            <p>您好，歡迎光臨諾浩家具購物網站!</p>
                        </div>
                        </div>
                        <div class="col">
                        <div class="header-user-info">
                            <a href="#" @click="adminLogin">
                            <i class="fa fa-user"></i>
                            管理者登入
                            </a>
                            <a href="#">
                            <i class="fa fa-user"></i>
                            我的帳戶
                            </a>
                            <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-unlock-alt"></i>
                            會員登入
                            </a>
                            <div class="dropdown-menu">
                            <form class="px-4 py-3">
                                <div class="form-group">
                                <label for="exampleDropdownFormEmail1">帳號</label>
                                <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com">
                                </div>
                                <div class="form-group">
                                <label for="exampleDropdownFormPassword1">密碼
                                </label>
                                <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password">
                                </div>
                                <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="dropdownCheck">
                                <label class="form-check-label" for="dropdownCheck">
                                    記住我
                                </label>
                                </div>
                                <button type="submit" class="btn btn-primary">登入</button>
                            </form>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">新會員註冊</a>
                            <a class="dropdown-item" href="#">忘記密碼?</a>
                            </div>
                            <a href="#">
                            <i class="fa fa-share-square"></i>
                            會員登出
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div class="header-bottom">
                <div class="container">
                    <div class="row">
                        <div class="col-md-10 order-2 order-sm-1">
                            <nav class="navbar navbar-expand-lg navbar-light">
                                <a class="navbar-brand header-logo" href="#"><img src="../../assets/images/logo.png"></a>
                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                                </button>

                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav mr-auto text-nowrap">
                                    <li>
                                    <div class="input-group d-flex d-sm-none">
                                    <input type="text" class="form-control" placeholder="Search for..." aria-label="Search for...">
                                    <span class="input-group-btn">
                                    <button class="btn btn-secondary" type="button"><i class="fa fa-search"></i></button>
                                    </span>
                                    </div> 
                                    </li>
                                    <li class="nav-item active">
                                    <a class="nav-link" href="#">首頁 <span class="sr-only">(current)</span></a>
                                    </li>
                                    <li class="nav-item">
                                    <a class="nav-link" href="#">臥室</a>
                                    </li>
                                    <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        客廳
                                    </a>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="#">沙發</a>
                                        <a class="dropdown-item" href="#">桌子</a>
                                        <a class="dropdown-item" href="#">擺飾</a>
                                    </div>                      
                                    </li>
                                    <li class="nav-item">
                                    <a class="nav-link" href="#">燈光</a>
                                    </li>
                                    
                                </ul>
                                </div>
                            </nav>              
                        </div>
                        <div class="col-md-2 order-1 order-sm-2 text-center">
                            <ul class="header-bottom-right-inner">
                                <li class="d-none d-sm-inline-block">
                                <a href="#" class="cart-toggler search-icon">
                                    <i class="fa fa-search"></i>
                                </a>
                                <div class="header-bottom-search">
                                    <form class="search-box" action="#" method="post">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Search for..." aria-label="Search for...">
                                        <span class="input-group-btn">
                                            <button class="btn btn-secondary" type="button"><i class="fa fa-search"></i></button>
                                            
                                        </span>
                                    </div>                      
                                    </form>
                                </div>
                                </li>
                                <li>
                                    <button type="button" class="btn btn-link" data-toggle="modal" data-target="#cartModal">
                                        <a href="#" class="cart-toggler mini-cart-icon">
                                            <i class="fa fa-shopping-cart"></i>
                                            <span>{{cart.carts.length}}</span>
                                        </a>
                                    </button>
                                    
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        <!-- 導覽列結束 -->

        <!-- 商品清單 -->
            <div class="row mt-4">
                <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
                    <div class="card border-0 shadow-sm">
                        <div style="height: 150px; background-size: 
                        cover; background-position: center" :style="{backgroundImage:`url(${item.imageUrl})`}">
                        </div>
                        <div class="card-body">
                        <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                        <h5 class="card-title">
                            <a href="#" class="text-dark">{{item.title}}</a>
                        </h5>
                        <p class="card-text">{{item.content}}</p>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <!-- <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>  前者顯示僅由原價的 -->
                            <del class="h6" v-if="item.price < item.origin_price">原價 {{ item.origin_price }} 元</del> <!-- 後者顯示僅由原價+優惠價 -->
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
                        <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
                            <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                            加到購物車
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        <!-- 商品清單結束 --> 

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
                        <div class="modal-head">
                            <div class="social-sharing">
                                <div class="widget">
                                    <ul class="social-icons">
                                        <li><a target="_blank" title="Facebook" href="#" class="facebook social-icon"><i class="fab fa-facebook-square"></i></a></li>
                                        <li><a target="_blank" title="Twitter" href="#" class="twitter social-icon"><i class="fab fa-twitter-square"></i></a></li>
                                        <li><a target="_blank" title="Google +" href="#" class="gplus social-icon"><i class="fab fa-google-plus-square"></i></a></li>
                                        <li><a target="_blank" title="Instagram" href="#" class="instagram social-icon"><i class="fab fa-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
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
                            <select name="" class="form-control mt-3" v-model="product.num">
                                <option value="" selected>請選擇..</option>
                                <option :value="buy" v-for="buy in 10" :key="buy">
                                    選購 {{buy}} {{product.unit}}
                                </option>
                            </select>
                        </div>
                        <div class="modal-footer">
                            <div class="text-muted text-nowrap mr-3">
                            小計 <strong>{{ product.num * product.price }}</strong> 元
                            </div>
                            <button type="button" class="btn btn-primary"
                            @click="addtoCart(product.id, product.num)">
                            <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                            加到購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        <!-- 顯示更多結束 -->

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
                            <div class="row mt-4" id="cart">
                                <div class="col-11 container" v-if="cart.final_total>0">
                                    <table class="table">
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
                                    <div class="input-group mb-3 input-group-sm">
                                        <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                                            套用優惠碼
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                            <button type="button" class="btn btn-danger" 
                            data-toggle="modal" data-target="#checkoutModel">
                            結帳</button>
                        </div>
                    </div>
                </div>
            </div>
        <!-- 購物車結束 -->

        <!--建立訂單及購物車頁面驗證  -->
            <div class="modal fade" id="checkoutModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">付款資訊</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="my-2 row justify-content-center">
                                <form class="col-md-12" @submit.prevent="createOrder">
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
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button class="btn btn-danger">送出訂單</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <!--建立訂單及購物車頁面驗證結束  -->

        <!-- 底部區域開始 -->
            <footer class="footer-area">
                <!--Footer Top Area Start-->
                    <div class="footer-top section-padding2">
                        <div class="container">
                            <div class="row">
                                <div class="col-xs-12 col-sm-4 col-md-3">
                                    <div class="footer-top-menu">
                                        <h3 class="footer-widget-title">分類</h3>
                                        <ul class="toggle-footer">
                                            <li><a href="shop.html">臥室</a></li>
                                            <li><a href="shop.html">客廳</a></li>
                                            <li><a href="shop.html">燈光</a></li>
                                            <li><a href="shop.html">家飾</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-4 col-md-3">
                                    <div class="footer-top-menu">
                                        <h3 class="footer-widget-title">訊息</h3>
                                        <ul class="toggle-footer">
                                            <li><a href="shop.html">特價</a></li>
                                            <li><a href="shop.html">新產品</a></li>
                                            <li><a href="shop.html">最暢銷</a></li>
                                            <li><a href="shop.html">我們的商店</a></li>
                                            <li><a href="contact.html">聯繫我們</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-4 col-md-3">
                                    <div class="footer-top-menu">
                                        <h3 class="footer-widget-title">我的帳戶</h3>
                                        <ul class="toggle-footer">
                                            <li><a href="#">我的訂單</a></li>
                                            <li><a href="#">我的信用單</a></li>
                                            <li><a href="#">我的地址</a></li>
                                            <li><a href="#">我的個人訊息</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-3 col-md-3 hidden-sm">
                                    <div class="footer-top-menu">
                                        <h3 class="footer-widget-title">EXTRAS</h3>
                                        <ul class="toggle-footer">
                                            <li><a href="#">訂單與退貨</a></li>
                                            <li><a href="#">關鍵字搜索</a></li>
                                            <li><a href="#">進階搜索</a></li>
                                            <li><a href="#">關係企業</a></li>
                                            <li><a href="#">線上團購</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <!--Footer Top Area End-->
                <!--Footer Middle Area Start-->
                    <div class="footer-middle section-padding2">
                        <div class="container">
                            <div class="row">
                                <div class="footer-border-right col-lg-5 col-md-5 col-sm-6 col-xs-12 ">
                                    <div class="footer-middle-content">
                                        <a href="index.html"><img src="../../assets/images/logo-footer.png" alt=""></a>
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
                                            <img src="../../assets/images/paypal.png" alt="">
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

export default {
data() {
return {
    visibility:'all',
    products: [],
    product: {},
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
    coupon_code: ""
};
},
methods: {
    getProducts() {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
        }/products`;
        vm.isLoading = true;
        this.$http.get(url).then(response => {
        vm.products = response.data.products;
        console.log(response);
        vm.isLoading = false;
        });
    },
    getProduct(id) {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
        }/product/${id}`;
        vm.status.loadingItem = id;
        this.$http.get(url).then(response => {
        vm.product = response.data.product;
        $("#productModal").modal("show");
        console.log(response);
        vm.status.loadingItem = "";
        });
    },
    addtoCart(id, qty = 1) {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
        vm.status.loadingItem = id;
        const cart = {
        product_id: id,
        qty
        };
        this.$http.post(url, { data: cart }).then(response => {
        console.log(response);
        vm.status.loadingItem = "";
        $("#productModal").modal("hide");
        vm.getCart();
        });
    },
    getCart() {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;

        vm.isLoading = true;
        this.$http.get(url).then(response => {
        vm.cart = response.data.data;
        console.log(response);
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
        vm.isLoading = false;
        });
    },
    createOrder() {
        const vm = this;
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
        const order = vm.form;
        // vm.isLoading = true;
        this.$validator.validate().then(result => {
        if (result) {
            this.$http.post(url, { data: order }).then(response => {
            console.log("訂單要求送出", response);
            if (response.data.success) {
                vm.$router.push(`/customer_checkout/${response.data.orderId}`);
            } else {
                console.log("訂單建立失敗", response.data.success);
            }
            vm.isLoading = false;
            });
        } else {
            console.log("欄位不完整");
        }
        });
    },
    // computed:{

    // },
    adminLogin() {
        const vm = this;
        vm.$router.push("/login");
    },
},
created() {
this.getProducts();
this.getCart();

}
};
</script>

<style scoped>
@import '../../assets/css/style.css';
</style>

