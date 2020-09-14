export const Loading = {
    show(self,fn){
        self.$toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true,
            message: '加载中',
          });
          const timer = setInterval(() => {
              if(!!(fn)){
                  fn();
              }
              clearInterval(timer);
              self.$toast.clear();
          }, 100);
    }
}