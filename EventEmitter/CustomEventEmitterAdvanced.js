// A simple Event Emitter with 3 methods: on, off, emit.

class MyEventEmitter {
    constructor() {
        // The "notebook" of listeners. It looks like this:
        // { eventName: [function1, function2, ...] }
        this._events = {};
    }

    // on: "When this event happens, call my function."
    on(eventName, handler) {
        if (!this._events[eventName]) {
            this._events[eventName] = [];            // first time: make an empty list
        }
        this._events[eventName].push(handler);     // add the function to the list
    }

    // off: "Stop calling my function."
    off(eventName, handler) {
        if (!this._events[eventName]) return;      // nothing to remove

        // keep every function EXCEPT the one we want to remove
        this._events[eventName] = this._events[eventName].filter((fn) => fn !== handler);
    }

    // emit: "This event happened! Call everyone who is listening."
    emit(eventName, ...args) {
        if (!this._events[eventName]) return;      // nobody is listening

        this._events[eventName].forEach((handler) => handler(...args));
    }
}

module.exports = MyEventEmitter;