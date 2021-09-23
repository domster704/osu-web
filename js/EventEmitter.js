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
            for (let i in this.handlers[name]) {
                let ii = this.handlers[name][i](...data);
                console.log(ii)
                if (ii === 'closeFunc' && name === 'mapPlaying') {
                    delete this.handlers[name][i];
                }
            }
        }
    }
}