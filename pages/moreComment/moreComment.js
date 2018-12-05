Page({
    data: {
        currentPage: 2,
        totalPage: 0,
        comments: null,
        movieid: null
    },
    onLoad: function (options) {
        const id = options.movieid;
        const that = this;
        wx.request({
            url: `https://api-m.mtime.cn/Movie/HotLongComments.api?pageIndex=1&movieId=${id}`,
            success: function (res) {
                const data = res.data;
                that.setData({
                    comments: data.comments,
                    totalPage: Math.ceil(data.totalCount / data.comments.length),
                    movieid: id
                })
            }
        })
    },
    onReachBottom: function () {
        let { currentPage, movieid } = this.data
        this.setData({
            currentPage: currentPage + 1,
            isloading: true
        });
        const that = this;
        console.log(currentPage)
        wx.request({
            url: `https://api-m.mtime.cn/Movie/HotLongComments.api?pageIndex=${currentPage}&movieId=${movieid}`,
            success: function (res) {
                const comments = [...that.data.comments, ...res.data.comments]
                that.setData({
                    comments
                })
            }
        })
    }
})