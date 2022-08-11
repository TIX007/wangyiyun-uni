var Eventbus = (function () {
  let onlyBus;
  // 类型判断
  let judgeType = function (param) {
    return Object.prototype.toString.call(param).slice(8, -1);
  };
  // Bus构造函数
  function Bus () {
    this.eventMap = new Map([['once', []]]);
  }
  // 执行事件
  Bus.prototype.emit = function (eventName, ...args) {
    var hanlder = this.eventMap.get(eventName);
    if (judgeType(hanlder) === 'Array') {
      hanlder.array.forEach(item => {
        if (args.length > 0) {
          item.applay(this, args);
        } else {
          item.call(this);
        }
      });
    } else if (judgeType(hanlder) === 'Function') {
      if (args.length > 0) {
        hanlder.applay(this, args);
      } else {
        hanlder.call(this);
      }
    }
  };
  // 添加事件
  Bus.prototype.on = function (eventName, callback) {
    var hanlder = this.eventMap.get(eventName);
    if (!hanlder) {
      this.eventMap.set(eventName, callback);
    } else {
      if (judgeType(hanlder) === 'Array') {
        hanlder.push(callback);
      } else if (judgeType(hanlder) === 'Function') {
        this.eventMap.set(eventName, [hanlder, callback]);
      }
    }
  };
  // 删除事件
  Bus.prototype.off = function (eventName, fn) {
    var hanlder = this.eventMap.get(eventName);
    if (hanlder && judgeType(hanlder) === 'Function') {
      this.eventMap.delete(eventName, fn);
    } else if (hanlder && judgeType(hanlder) === 'Array') {
      for (var i = 0; i < hanlder.length; i++) {
        if (hanlder[i] === fn) {
          break;
        }
      }
      hanlder.splice(i, 1);
      if (hanlder.length === 1) {
        this.eventMap.set(eventName, hanlder[0]);
      }
    }
  };
  // todo
  // Bus.once = function (eventName, callback) {
  //   var hanlder = this.eventMap.get(eventName);
  //   var once = this.eventMap.get('once');
  //   if (!hanlder) {
  //     this.eventMap.set(eventName, callback);
  //     if (once.indexOf(eventName) === -1) {
  //       once.push(eventName);
  //     }
  //   } else {
  //     if (judgeType(hanlder) === 'Array') {
  //       hanlder.push(callback);
  //     } else if (judgeType(hanlder) === 'Function') {
  //       this.eventMap.set(eventName, [hanlder, callback]);
  //     }
  //   }
  // };
  return {
    getBus: function () {
      // 单例
      if (!onlyBus) {
        onlyBus = new Bus();
      }
      return onlyBus;
    }
  };
}());
var bus = Eventbus.getBus();