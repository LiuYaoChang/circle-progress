"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("@retailwe/ui-common/index");
var index_2 = require("@retailwe/ui-common/index");
var default_1 = (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.externalClasses = ['wr-class', 'wr-class--no-more'];
        _this.options = { multipleSlots: true };
        _this.properties = {
            status: {
                type: Number,
                value: 0,
            },
            loadingText: {
                type: String,
                value: '加载中...',
            },
            noMoreText: {
                type: String,
                value: '没有更多了',
            },
            failedText: {
                type: String,
                value: '加载失败，点击重试',
            },
            color: {
                type: String,
                value: '#BBBBBB',
            },
            failedColor: {
                type: String,
                value: '#FA550F',
            },
            size: {
                type: null,
                value: '40rpx',
            },
            loadingBackgroundColor: {
                type: String,
                value: '#F5F5F5',
            },
            listIsEmpty: {
                type: Boolean,
                value: false,
            },
        };
        return _this;
    }
    default_1.prototype.onFailedTap = function () {
        this.triggerEvent('retry');
    };
    default_1 = tslib_1.__decorate([
        index_2.wxComponent()
    ], default_1);
    return default_1;
}(index_1.SuperComponent));
exports.default = default_1;
