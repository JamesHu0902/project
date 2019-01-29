<template>
    <div class="bg-light p-4 mb-3">
        <div class="swiper-container ">
        <swiper :options="swiperOption" class="topSwiper">
            <swiper-slide v-for="(item, index) in sliderImg" :key="index">
            <div class="slide" :style="`background-image: url('${item.imgPath}');`" ></div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        
        </div>
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
        swiperOption: {
            loop: true,
            spaceBetween: 30,
            centeredSlides: true,
            grabCursor:true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            slidesPerView: 1, //一次撥放幾張圖
            pagination: {   //分頁圖示
                el: '.swiper-pagination',
                clickable: true
            },
        },
    sliderImg:[
        {
            imgPath:'./static/images/banner-1.jpg',
            },
            {
            imgPath:'./static/images/banner-2.jpg',
            },
            {
            imgPath:'./static/images/banner-3.jpg',
            }
        ]
        }
    },
    components: {
    swiper,
    swiperSlide
    },
    mounted(){
        $('.topSwiper').on("mouseenter",function(){
        this.swiper.autoplay.stop();
        });
        $('.topSwiper').on("mouseleave",function(){
        this.swiper.autoplay.start();
        });
    },
    
}
</script>

<style lang="scss" scoped>
.swiper-container{
height: 250px;
@media (min-width: 768px) {
height: 400px;

}   
}
.slide{
height: 100%;
background-position: center center;
background-size: cover;
}
</style>
