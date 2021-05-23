const app = getApp()

Page({
  data: {
    headerUrl:'',
    Url:''
  },
  onLoad: function (options) {
    // this.setData({
    //   headerUrl:options.img
    // })
  },
  upload (){
    var that = this;
   
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        that.setData({
          Url:res.tempFilePaths[0]
        })
        const tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: '等待服务器返回',
        })
        wx.uploadFile({
          //http://139.224.50.124:80/uploadfile/
          url: 'http://classification.shop:80/uploadfile/', 
          filePath: tempFilePaths[0],
          name: 'file',
          success (res){
            const data = res.data
            console.log(data)
            const app =getApp()
            var js1 = JSON.parse(data)
            console.log(js1.class)
            app.globalData.class = js1.class
            wx.hideLoading({
              success: (res) => {},
            })
            wx.navigateTo({
              url: `../../result/result?src=${tempFilePaths[0]}`,
            })
            //do something
          },
          fail (res){
            console.log(res)
            //do something
          },
        })
        
      }
    })
  }
})
