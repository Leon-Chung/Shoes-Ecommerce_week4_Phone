
const app ={
  data(){
    return{
      string:'1',
      ProductNum: [
        Math.floor(Math.random() * new Date().getTime()),
        Math.floor(Math.random() * new Date().getTime())
      ],
      //防止，window.location.href 或 window.open() 
      // 有可能被快速執行多次，造成跳轉異常或錯誤行為
      isRedirecting: false, // 一開始預設為 false
      
      // 頁面切換
      indexShow: true,
      ProductListShow: false, //首頁先設 false, 寫完改回
      blackShoesShow: false,

      
      //單一物件存放資料
      chooseItem:{
        
      },
      //原始陣列商品資訊
      productsItem :[
        {
          merchandiseName:'所有商品'
        },
        {
          merchandiseName:'慢跑鞋',
          shoesModel: ['Neofoam','R:UNER'],
          price: 'NT$4,000'
        },
        {
          merchandiseName:'滑板鞋',
          shoesModel: ['PLATFORM 404','VM001'],
          price: 'NT$2,600'
        },
        {
          merchandiseName:'厚底鞋',
          shoesModel: 'BOOMBLOK',
          price: 'NT$3,200'
        },
        {
          merchandiseName:'限定 / 聯名企劃',
          shoesModel: ['Melty Kiss','Sugar Snap'],
          price: 'NT$4,000'
        }
      ],
    }
  },
  methods:{
    clickItem(shoesItem){
      console.log(shoesItem.merchandiseName);
      this.chooseItem={
        name:shoesItem.merchandiseName,
        price:shoesItem.price,
        shoesModel: shoesItem.shoesModel
      }
      console.log(this.chooseItem);
    },
    getStyle(val){
      // console.log(val);
      // 商品列表
      if(this.chooseItem.name === '所有商品'){
        // console.log('err');
        return this.chooseItem.name === '所有商品'?'faded':'active';
      }

      if(!this.chooseItem.name || this.chooseItem.name === val.merchandiseName){
        // console.log('success');
        return this.chooseItem.name === val.merchandiseName?'active':'faded'
      } 

    }
    ,
    watchItem(lookItem){
      // console.log(lookItem);
      // console.log(this.chooseItem.name);
      if(!this.chooseItem.name || this.chooseItem.name === '所有商品'){
        return {opacity: 1 };
      }else{
        return { opacity: this.chooseItem.name === lookItem? 1 : 0.3 };
      }
    },
    changeBg(num){
      // console.log(typeof num.target.innerText);
      this.string = num.target.innerText;
      // console.log(this.string);
    },
    //index切換productList
    indexProduct(e){
      console.log(e.target.innerText === '立即選購');
      if(e.target.innerText === '立即選購' || e.target.innerText === '立即搶購'){
        this.indexShow = !this.indexShow;
        this.ProductListShow = !this.ProductListShow;
      }
    },
    //鞋子介面切換
    shoeIntroduction(e){

       if (this.isRedirecting) {
        console.log('click other');
        setTimeout(()=>{
          this.isRedirecting = false; 
        },1000)
        return;
      }
      //如果目前 isRedirecting 是 true（代表目前已經在執行跳轉中）

      // console.log(typeof this.ProductNum[0]); // 目前是數字
      // console.log( typeof e.target.dataset.num); // 目前是字串

      const numCheck = e.target.dataset.num * 1;
      // console.log(typeof numCheck); // 目前是數字
      if(!this.isRedirecting){
        this.isRedirecting = true;
        if(numCheck === this.ProductNum[0]){
          window.location.href = '/Shoes-Ecommerce_week4_Phone/productDetails.html';
        }else if(numCheck === this.ProductNum[1]){
          window.location.href = '';
        }
      } 

      // 可以用在同一頁面時
      // if(numCheck === this.ProductNum[0]){ 
      //   this.ProductListShow = !this.ProductListShow;
      //   this.blackShoesShow = !this.blackShoesShow;
      // }
    }
  }
}

Vue.createApp(app).mount('#app');