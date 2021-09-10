const has = (a, b) => Object.prototype.hasOwnProperty.call(a, b);

export default class EventEmitter {
    handlers = {};

    addEventListener(name, handler) {
        if (!has(this.handlers, name)) {
            this.handlers[name] = [];
        }
        
        this.handlers[name].push(handler);
    }

    on(...args) {
        return this.addEventListener(...args);
    }

    emit(name, ...data) {
        if (this.handlers[name]) {
            for (const handler of this.handlers[name]) {
                handler(...data);
            }
        }
    }
}