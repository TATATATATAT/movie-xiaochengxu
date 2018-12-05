Page({
    data: {
        basic: null,
        boxOffice: null,
        date: '未知',
        type: '暂未分类',
        classData: ['影片概况', '影片简介', '演职员', '票房', '影评'],
        curent: 0,
        personType: null,
        noImage: 'http://www.zcwanjia.com/Tool/GetImage.aspx?path=www.jqltw.cn/uploads/cp/20170223020227.jpg',
        noPersonImg: 'http://img31.mtime.cn/ph/540/972540/972540_1280X720X2.jpg',
        comments: null,
        currentId: null
    },
    changePage: function (event) {
        const index = event.currentTarget.dataset.index;
        this.setData({
            current: index
        })
    },
    pageFinsh: function (event) {
        const index = event.detail.current;
        this.setData({
            current: index
        })
    },
    moreComments: function (event) {
        const id = event.target.dataset.movieid;
        wx.navigateTo({
            url: `/pages/moreComment/moreComment?movieid=${id}`
        })
    },
    moreminiComments: function (event) {
        const id = event.target.dataset.movieid;
        wx.navigateTo({
            url: `/pages/moreminiComment/moreminiComment?movieid=${id}`
        })
    },
    errImg: function (e) {
        console.log(this.data.personType.persons)
        const errImg = e.target.daset.errorimg;
        const errObj = {};
        errObj[errImg] = this.data.noPersonImg;
        this.setData(errObj);
    },
    onLoad: function (options) {
        const id = options.movieid;
        this.setData({
            currentId: id
        })
        const that = this;
        wx.request({//演职员
            url: `https://api-m.mtime.cn/Movie/MovieCreditsWithTypes.api?movieId=${id}`,
            success: function (res) {
                that.setData({
                    personType: res.data.types
                })
            },
        })
        wx.request({//概况
            url: `https://ticket-api-m.mtime.cn/movie/detail.api?locationId=290&movieId=${id}`,
            success: function (res) {
                console.log(res.data.data)
                const releaseDate = res.data.data.basic.releaseDate;
                const movieType = res.data.data.basic.type;
                that.setData({
                    basic: res.data.data.basic,
                    boxOffice: res.data.data.boxOffice,
                    date: releaseDate ? `${releaseDate[0]}${releaseDate[1]}${releaseDate[2]}${releaseDate[3]}年${releaseDate[4]}${releaseDate[5]}月${releaseDate[6]}${releaseDate[7]}日` : '上映时间未知',
                    type: movieType.join('/'),
                    current: 0,
                })
            }
        })
        wx.request({
            url: `https://ticket-api-m.mtime.cn/movie/hotComment.api?movieId=${id}`,
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                that.setData({
                    comments: res.data.data
                })
            }
        })
    }
})