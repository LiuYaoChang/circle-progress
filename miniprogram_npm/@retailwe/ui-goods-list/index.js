"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("@retailwe/ui-common/index");
var index_2 = require("@retailwe/ui-common/index");
var GoodsList = (function (_super) {
    tslib_1.__extends(GoodsList, _super);
    function GoodsList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.externalClasses = ['wr-class'];
        _this.properties = {
            goodsList: {
                type: Array,
                value: [],
            },
            layout: {
                type: String,
                value: 'horizontal',
            },
            priceFill: {
                type: Boolean,
                value: false,
            },
            lazyLoad: {
                type: Boolean,
                value: true,
            },
        };
        _this.data = {
            goodsList: [],
        };
        return _this;
    }
    GoodsList.prototype.onClickGood = function (e) {
        var index = e.currentTarget.dataset.index;
        this.triggerEvent('click', { index: index });
    };
    GoodsList.prototype.onAddCart = function (e) {
        this.triggerEvent('addcart', e.detail);
    };
    GoodsList = tslib_1.__decorate([
        index_2.wxComponent()
    ], GoodsList);
    return GoodsList;
}(index_1.SuperComponent));
exports.default = GoodsList;
