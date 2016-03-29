var Dispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;
var AskUsConstants = require('../constants/AskUsConstants');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var _askUs = [];

var AskUsStore = assign({}, EventEmitter.prototype,{
    getAskUs: function(){
      return _askUs;
    },
    emitChange: function(){
        return this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
  dispatcherIndex: Dispatcher.register(function(action){
    switch(action.type){
      case AskUsConstants.GET_ASK_US:
        console.log("msg from dispatcher", action.msg );
        _askUs = action.msg;
        AskUsStore.emitChange();
        break;
      default:
      break;
    }
    })
});
module.exports = AskUsStore;
