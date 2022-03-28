class Event {
  constructor() {}
  handles = {};

  addEventListener(type, event) {
    if (!(type in this.handles)) {
      this.handles[type] = [];
    }
    this.handles[type].push(event);
  }

  dispatchEvent(type, ...params) {
    if (!(type in this.handles)) {
      console.error('未注册事件');
    }
    this.handles[type].forEach((element) => {
      element(...params);
    });
  }
  removeEventLisener(type, event) {
    if (!(type in this.handles)) {
      console.error('无效事件');
    }
    if (!event) {
      delete this.handles[type];
    } else {
      const ids = this.handles[type].findIndex((it) => it === event);
      if (ids === undefined) {
        console.error('无该绑定事件');
      }

      this.handles[type].splice(ids, 1);
      if (this.handles[type].length === 0) {
        delete this.handles[type];
      }
    }
  }
}

const event = new Event();
function load(params) {
  console.log('load', params);
}
