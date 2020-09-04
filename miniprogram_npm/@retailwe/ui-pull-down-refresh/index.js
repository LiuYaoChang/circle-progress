"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("@retailwe/ui-common/index");
var index_2 = require("@retailwe/ui-common/index");
var PullDownRefresh = (function (_super) {
    tslib_1.__extends(PullDownRefresh, _super);
    function PullDownRefresh() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isScrollToTop = true;
        _this.pixelRatio = 1;
        _this.startPoint = null;
        _this.isPulling = false;
        _this.DefaultBarHeight = 0;
        _this.MaxBarHeight = 200;
        _this.NormalBarHeight = 150;
        _this.externalClasses = ['wr-class'];
        _this.properties = {
            background: {
                type: String,
                value: '#F5F5F5',
            },
            loadingColorType: {
                type: String,
                observer: function (loadingColorType) {
                    var loadingImg = './loading.png';
                    if (loadingColorType === 'white') {
                        loadingImg = './loading-white.png';
                    }
                    this.setData({ loadingImg: loadingImg });
                },
            },
            color: {
                type: String,
                value: '#999999',
            },
            fontSize: {
                type: String,
                value: '24rpx',
                observer: function (fontSize) {
                    var res = fontSize.match(/([\d\.]+)([^\d]*)/);
                    if (!res)
                        return;
                    var unit = res[2];
                    var loadingSize = parseFloat(res[1]);
                    if (loadingSize > 0) {
                        loadingSize = loadingSize * (40 / 24);
                        this.setData({ loadingSize: loadingSize + unit });
                    }
                },
            },
        };
        _this.data = {
            loadingSize: '40rpx',
            loadingImg: './loading.png',
            barHeight: _this.DefaultBarHeight,
            refreshStatus: 0,
            text: {
                0: '下拉刷新',
                1: '释放刷新',
                2: '正在刷新',
                3: '刷新完成',
                4: '',
            },
            rotate: 0,
        };
        return _this;
    }
    PullDownRefresh.prototype.attached = function () {
        var _this = this;
        wx.getSystemInfo({
            success: function (res) {
                _this.screenWidth = res.screenWidth;
                _this.pixelRatio = 750 / res.screenWidth;
                _this.ios = !!(res.system.toLowerCase().search('ios') + 1);
            },
            fail: function (err) {
                console.error('navbar 获取系统信息失败', err);
                _this.isError = true;
            },
        });
    };
    PullDownRefresh.prototype.onPageScroll = function (e) {
        var scrollTop = e.scrollTop;
        this.isScrollToTop = scrollTop === 0;
    };
    PullDownRefresh.prototype.onTouchStart = function (e) {
        if (!this.isScrollToTop || this.isPulling)
            return;
        var touches = e.touches;
        if (touches.length !== 1)
            return;
        var _a = touches[0], pageX = _a.pageX, pageY = _a.pageY;
        this.startPoint = { pageX: pageX, pageY: pageY };
        this.isPulling = true;
    };
    PullDownRefresh.prototype.onTouchMove = function (e) {
        if (!this.isScrollToTop || !this.startPoint)
            return;
        var touches = e.touches;
        if (touches.length !== 1)
            return;
        var pageY = touches[0].pageY;
        var offset = pageY - this.startPoint.pageY;
        var barHeight = this.toRpx(offset);
        if (barHeight > 0) {
            if (barHeight > this.MaxBarHeight) {
                this.setRefreshBarHeight(this.MaxBarHeight);
                this.startPoint.pageY = pageY - this.toPx(this.MaxBarHeight);
            }
            else {
                this.setRefreshBarHeight(barHeight);
            }
        }
    };
    PullDownRefresh.prototype.onTouchEnd = function (e) {
        var _this = this;
        if (!this.startPoint)
            return;
        var changedTouches = e.changedTouches;
        if (changedTouches.length !== 1)
            return;
        var pageY = changedTouches[0].pageY;
        var barHeight = this.toRpx(pageY - this.startPoint.pageY);
        this.startPoint = null;
        if (barHeight > this.NormalBarHeight) {
            this.setData({
                barHeight: this.NormalBarHeight,
                rotate: 0,
                refreshStatus: 2,
            });
            var startTime_1 = Date.now();
            var callback = function () {
                var remainTime = 1000 - (Date.now() - startTime_1);
                setTimeout(function () {
                    _this.setData({ refreshStatus: 3 });
                    setTimeout(function () {
                        _this.close();
                    }, 1000);
                }, remainTime > 0 ? remainTime : 0);
            };
            this.triggerEvent('refresh', { callback: callback });
            setTimeout(function () {
                if (_this.data.refreshStatus === 2) {
                    _this.close();
                }
            }, 2000);
        }
        else {
            this.close();
        }
    };
    PullDownRefresh.prototype.toRpx = function (v) {
        return v * this.pixelRatio;
    };
    PullDownRefresh.prototype.toPx = function (v) {
        return v / this.pixelRatio;
    };
    PullDownRefresh.prototype.setRefreshBarHeight = function (barHeight) {
        var _this = this;
        var data = { barHeight: barHeight };
        if (barHeight >= this.NormalBarHeight) {
            data['refreshStatus'] = 1;
            data['rotate'] = 720;
        }
        else {
            data['refreshStatus'] = 0;
            data['rotate'] = (barHeight / this.NormalBarHeight) * 720;
        }
        return new Promise(function (resolve) {
            _this.setData(data, function () { return resolve(barHeight); });
        });
    };
    PullDownRefresh.prototype.close = function () {
        var _this = this;
        this.setData({ barHeight: this.DefaultBarHeight, refreshStatus: 4 });
        setTimeout(function () {
            _this.setData({ refreshStatus: 0 });
            _this.isPulling = false;
        }, 1000);
    };
    PullDownRefresh = tslib_1.__decorate([
        index_2.wxComponent()
    ], PullDownRefresh);
    return PullDownRefresh;
}(index_1.SuperComponent));
exports.default = PullDownRefresh;
