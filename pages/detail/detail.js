//logs.js
Page({
  data: {
    
  },
  onLoad: function (option) {
    var id=option.id;
    var that =this;
     that.setData({"ishidden":"hidden"});
    wx.request({
      url: 'https://m.maoyan.com/movie/'+id+'.json',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        if(res.data.status==0){
          var info=res.data.data.MovieDetailModel;
          info.dra=info.dra.replace("<p>","");
          info.isopen=false;
          info.max_height='3.6rem';
          info.dra=info.dra.replace("</p>","");
          info.arrow='⇣';
          that.setData(info);
        }
      },
    })
  },
  arrow_tap:function(e){
    if(this.data.isopen==false){
      this.setData({'max_height':'20rem'})
      this.setData({'isopen':true});
      this.setData({'arrow':'⇡'});
    }else{
      this.setData({'max_height':'3.6rem'})
      this.setData({'isopen':false});
      this.setData({'arrow':'⇣'});
    }
  },
  play_vd:function(){
    this.setData({"ishidden":"show"});
  },
  ended:function(){
    // this.setData({"ishidden":"hidden"});
    console.log(this.data)
  }
})
