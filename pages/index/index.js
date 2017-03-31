//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    movie_list:null
  },
  onLoad:function(){
    this.get_list();
  },
 get_list:function(){
   //先判断缓存里面有没有没过期的数据
    var movie_list=wx.getStorageSync('movie_list');
    var nowtime=Date.parse(new Date());
    if(movie_list && movie_list.time>nowtime){
      this.setData({movie_list:movie_list.list});
      return;
    }
    var that=this;
    wx.request({
      url: 'https://m.maoyan.com/movie/list.json',
      data: {'type':'hot','limit':10},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        if(res.data.status=='0'){
            that.setData({movie_list:res.data.data.movies});
            //更新缓存，2小时失效
            wx.setStorage({
              key: 'movie_list',
              data: {'list':res.data.data.movies,'time':nowtime+1000*60*60*2},
            })
        }
      },
    });
  },
  detail:function(e){
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id='+id,
    });
  }

})
