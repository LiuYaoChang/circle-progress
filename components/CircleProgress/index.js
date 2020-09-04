//index.js
Component({
  properties: {
    percentage: {
      type: Number,
      default: 0
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data: {
    config: {
      canvasSize: {
        width: 200,
        height: 200
      },
      percent: 100,
      barStyle: [{width: 6, fillStyle: '#f0f0f0'}, {width: 6, animate: true, fillStyle: '#90CBFB'}]
    },
    percentage: 60
  },

  methods: {
    draw(percentage) {
    }
  }
})
