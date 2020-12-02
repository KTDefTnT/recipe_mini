// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: String,
    placeholderStyle: {
      type: [String, Object],
      value: ''
    },
    placeholderClass: {
      type: String,
      value: 'input-placeholder',
    },
    disabled: {
      type: Boolean,
      value: false
    },
    maxlength: {
      type: Number,
      value: 140,
    },
    cursorSpacing: {
      type: Number,
      value: 0
    },
    autoFocus: {
      type: Boolean,
      value: false
    },
    foucus: {
      type: Boolean,
      value: false
    },
    confirmType: {
      type: String,
      value: 'done'
    },
    confirmHold: {
      type: Boolean,
      value: false
    },
    cursor: {
      type: Number,
      value: -1
    },
    selectionStart: {
      type: Number,
      value: -1
    },
    selectionEnd: {
      type: Number,
      value: -1
    },
    adjustPosition: {
      type: Boolean,
      value: true
    },
    cancelText: {
      type: String,
      value: '取消'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputValue: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange (e) {
      this.triggerEvent('change', e.detail);
    },
    onFocus (e) {
      this.triggerEvent('focus', e.detail);
    },
    onBlur (e) {
      this.triggerEvent('blur', e.detail);
    },
    onConfirm (e) {
      this.triggerEvent('confirm', e.detail);
    },
    onKeyBoardHeightChange (e) {
      this.triggerEvent('keyBoardHeightChange', e.detail);
    },
    onCancel (e) {
      this.triggerEvent('cancel', e);
    }
  }
})
