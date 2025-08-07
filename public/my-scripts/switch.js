const app ={
  data(){
    return{
      isLoginShow: true,
      isSignInShow: false,
    }
  },
  methods:{
    change(e){
      console.log(e);
//--------------------------------------------------------------------
      // 如果點選後抓不到 data-action="logIn" 的原因，
      // 很可能是因為你點到了子元素 <span>，而不是 <div> 本身。
      // e.target 只會指向實際被點擊的 DOM 元素（此例是 <span>），
      // 而不是包含 data-action 的 <div>。
      
      //  解法：用 closest() 找到上層有 data-action 的元素
      console.log(e.target.closest('[data-action]'));
      const tab =  e.target.closest('[data-action]');
      //這段程式碼的關鍵： e.target.closest('[data-action]')
      //會自下而上尋找最近的 data-action 元素
      // （不管你點到的是 <div> 還是 <span>，都能找到正確的容器）。
      // 安全避免點到空白處或非 tab 區域時出錯。
//--------------------------------------------------------------------
      // 使用 if(!tab) 來預防是因為:
      // 如果 e.target.closest('[data-action]') 找不到匹配的元素
      //（例如你點到了空白區或外層 div），它會回傳 null，
      // 接著你對 null.dataset 做操作就錯了。
      if(!tab){
        console.warn('點擊的元素不包含 data-action, 請忽略此事件');
        return;
      };
//--------------------------------------------------------------------      
      // console.log(tab.dataset.action);
      const active = tab.dataset.action.trim();
      console.log(active);

      if(active === 'signIn'){
        console.log('success');
        this.isLoginShow = !this.isLoginShow; // 改 false 
        this.isSignInShow = !this.isSignInShow; // 改 true
      }else if(active === 'logIn'){
      // 如果在登入的畫面一樣點選'登入tag =>不會仍然觸發切換動作的原因是:
      // 在 Html 分開設定:
      //   !!import=> 在登入的畫面 只有在 註冊 設定 data-action="signIn", 而在註冊的畫面設定 data-action="logIn"; 
      //              並同時在上方程式碼追加 if(!tab) return;的設定,來做出錯攔截 
      // 此方法是防止在登入畫面時,仍誤點選 "登入" 時, 而觸發切換動作
        this.isLoginShow = !this.isLoginShow; // 改 true 
        this.isSignInShow = !this.isSignInShow; // 改 false
      }
//--------------------------------------------------------------------

      //此寫法會造成點選 tablist 時 如果當下點選 登入 仍然會跳切到 註冊 頁
      // if(e.target.innerText==='註冊'){
      //   console.log('success');
      //   this.isLoginShow = !this.isLoginShow;
      //   this.isSignInShow = !this.isSignInShow;
      //   console.log('login',this.isLoginShow);
      //   console.log('signin',this.isSignInShow);
        
      // } 
      
      // if(e.target.innerText==='登入'){
      //   this.isLoginShow = !this.isLoginShow;
      //   this.isSignInShow = !this.isSignInShow;
      //   console.log('login',this.isLoginShow);
      //   console.log('signin',this.isSignInShow);
      // }

//--------------------------------------------------
      // console.log(!this.isLoginShow); // false
      // console.log(!this.isSignInShow); // true
      // 加入 && !this.isLoginShow 跟 !this.isSignInShow 防呆
      // 遊戲規則 if(true) 執行 ; && 運算子「所有條件都要成立，結果才會是 true」
      // if(e.target.innerText === '註冊' && !this.isSignInShow){
      //   console.log('success');
      //   this.isLoginShow = !this.isLoginShow;
      //   this.isSignInShow = !this.isSignInShow;
      //   console.log('login',this.isLoginShow);
      //   console.log('signin',this.isSignInShow);
        
      // }else if(e.target.innerText === '登入' && !this.isLoginShow){
      //   //如果在登入的畫面一樣點選'登入tag =>
      //   //觸發 ([e.target.innerText === '登入' => true] && [!this.isLoginShow => false]) 狀態時===>不成立!!
      //   //因為目前還處於一開始 this.isLoginShow 是 true 的狀態
      //   this.isLoginShow = !this.isLoginShow;
      //   this.isSignInShow = !this.isSignInShow;
      //   console.log('login',this.isLoginShow);
      //   console.log('signin',this.isSignInShow);
      // }
    }
  }
}

Vue.createApp(app).mount('#app');