<template>
    <div>
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                <div class="sidebar-sticky">
                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>管理員</span>
                        <a class="d-flex align-items-center text-muted" href="#">
                            <span data-feather="plus-circle"></span>
                        </a>
                    </h6>
                    <ul class="nav flex-column mb-2">
                        <li class="nav-item">
                            <router-link to="/admin/products" class="nav-link">
                                <i class="fas fa-box-open"></i>
                                產品列表
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/admin/orders" class="nav-link">
                                <i class="fas fa-chart-pie"></i>
                                訂單列表
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/admin/coupons" class="nav-link">
                                <i class="fas fa-barcode"></i>
                                優惠卷
                            </router-link>
                        </li>
                    </ul>
                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>模擬下單功能</span>
                        <a class="d-flex align-items-center text-muted" href="#">
                            <span data-feather="plus-circle"></span>
                        </a>
                    </h6>
                    <ul class="nav flex-column mb-2">
                        <li class="nav-item">
                            <router-link to="/test/customer_orders" class="nav-link">
                                <i class="fas fa-shopping-cart"></i>
                                模擬訂單
                            </router-link>
                        </li>
                    </ul>
                    
                </div>
        </nav>
    </div>
</template>
