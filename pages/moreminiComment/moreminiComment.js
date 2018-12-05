Page({
    data: {
        currentPage: 2,
        totalPage: 0,
        comments: null,
        movieid:null
    },
    onLoad: function (options) {
        const id = options.movieid;
        const that = this;
        wx.request({
            url: `https://api-m.mtime.cn/Showtime/HotMovieComments.api?pageIndex=1&movieId=${id}`,
            success: function (res) {
                const data = res.data.data.cts;
                const totalPage = Math.ceil(res.data.data.totalCount / data.length)
                that.setData({
                    comments: data,
                    totalPage,
                    isloading: false,
                    movieid:id
                }) 
            }
        })
    },
    onReachBottom: function () {
        let { currentPage,movieid } = this.data
        var that = this;
        this.setData({
            currentPage: currentPage + 1,
            isloading: true
        });
        wx.request({
            url: `https://api-m.mtime.cn/Showtime/HotMovieComments.api?pageIndex=${currentPage}&movieId=${movieid}`,
            success: function (res) {
                const comments = [...that.data.comments, ...res.data.data.cts]
                that.setData({
                    comments
                })
            }
        })
    }
})