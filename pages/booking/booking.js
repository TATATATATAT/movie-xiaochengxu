Page({
  data: {
    movieData: null,
    noImage:'http://www.zcwanjia.com/Tool/GetImage.aspx?path=www.jqltw.cn/uploads/cp/20170223020227.jpg'    
  },
  toInformation: function (event) {
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
        url:`/pages/information/information?movieid=${id}`
      })
  },
  onLoad: function () {
    let that = this;
    wx.request({
      url: "https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=290",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          movieData: res.data.movies
        }) 
        console.log(res.data.movies)
      }
    })
  }
})
