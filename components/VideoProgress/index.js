//index.js
import { timeTranslate } from '../../utils/util';
Component({
  properties: {
    duration: {
      type: Number,
      default: 0
    },
    time: {
      type: Number,
      default: 0
    },
    buffered: {
      type: Number,
      default: 0
    }
  },
  observers: {
    duration: function (val) {
      console.log('loaded meta data', val)
      this.setData({
        durationStr: timeTranslate(val)
      })
    },
    time: function (val) {
      const percent = (val/this.data.duration) * 100;
      const x = parseInt((percent * this.data.finished) / 100);
      this.setData({
        moveViewX: x > this.data.finished ? this.data.finished : x,
        plaied: percent || 0,
        timeStr: timeTranslate(val)
      })
    }
  },
  data: {
    src: '../../assets/icon/play-dot.png',
    durationStr: '00:00',
    timeStr: '00:00',
    finished: 152,
    moveViewX: 0,
    plaied: 0,
    loading: 0,
    list: []
  },
  methods: {
    handleMove: function(e) {
      const { x, y, source } = e.detail;
      const percent = (x/this.data.finished) * 100;
      this.setData({
        plaied: percent
      })
      if (source === 'touch') {
        this.triggerEvent('change', percent);
      }
    }
  }
})
