"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("@retailwe/ui-common/index");
var index_2 = require("@retailwe/ui-common/index");
var GoodCard = (function (_super) {
    tslib_1.__extends(GoodCard, _super);
    function GoodCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.options = {
            addGlobalClass: true,
            multipleSlots: true,
        };
        _this.externalClasses = [
            'card-class',
            'num-class',
            'desc-class',
            'specs-class',
            'thumb-class',
            'title-class',
        ];
        _this.properties = {
            tag: String,
            num: String,
            desc: String,
            thumb: String,
            title: String,
            titlePrefixTags: Array,
            price: String,
            priceFill: {
                type: Boolean,
                value: true,
            },
            layout: {
                type: String,
                value: 'horizontal',
            },
            centered: Boolean,
            lazyLoad: Boolean,
            thumbLink: String,
            originPrice: String,
            thumbMode: {
                type: String,
                value: 'aspectFit',
            },
            currency: {
                type: String,
                value: '¥',
            },
        };
        _this.data = {
            isLinePriceBigger: false,
        };
        return _this;
    }
    GoodCard.prototype.attached = function () {
        var _a = this.properties, price = _a.price, originPrice = _a.originPrice, thumb = _a.thumb;
        this.setData({
            isLinePriceBigger: parseInt(price.toString()) < parseInt(originPrice.toString()),
            thumb: (thumb + '').startsWith('//') ? 'https:' + thumb : thumb,
        });
    };
    GoodCard.prototype.onClickThumb = function () {
        this.triggerEvent('clickThumb');
    };
    GoodCard = tslib_1.__decorate([
        index_2.wxComponent()
    ], GoodCard);
    return GoodCard;
}(index_1.SuperComponent));
exports.default = GoodCard;
