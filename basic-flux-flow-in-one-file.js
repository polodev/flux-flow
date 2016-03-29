//Component
var React = require('require');
var AskUsActions = require('AskUsActions');
var AskUsStore = require('AskUsStore');
function getAppState () {
    return {
        allAskUs : AskUsStore.getAskUs();
    }
}

var AskUs = React.createClass({
    getInitialState : function() {
        return {
            allAskUs : []
        }
    },
    handleSubmit : function (e) {
        e.preventDefault();
        var data = {
            fullName : this.refs.fullName.value,
            emailId : this.refs.emailId.value,
            mobileNo : this.refs.mobileNo.value,
            userQuery : this.refs.userQuery.value
        }

        AskUsActions.AskQuery(data.fullName);
        $('.askus-form').hide();
        $('.submit-output').show();
    },
    componentDidMount : function () {
        AskUsActions.GetAskUsQuestions();
        AskUsStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        AskUsStore.removeChangeListener(this._onChange);
    },
    _onChange : function () {
        this.setState(getAppState);
    },
    render : function () {
        return (
                //do appropriate return;
            );
    }

})


//Dispatcher
var Dispatcher = require('flux').Dispatcher;
module.exports = new Dispatcher;

//constants
module.exports = {
    GET_ASK_US : 'get_ask_us'
}

//Actions
var Dispatcher = require('../dispatcher/Dispatcher');
var TrainerAPIUtils = require('../utils/TrainerAPIUtils');
var AskUsConstants = require('../constants/AskUsContants');
var AskUsStore = require('../stores/AskUsStore');

var AskUsActions = {
    AskQuery : function (query) {
        var requestedObject = {
                "discussionSetId" : 1,
                "name" : query
            },
            url = "kpropsnew/initiateAskUsAPI/v1",
            onSuccess = function (msg) {
                console.log('passed', msg);
            },
            onFaliure = function (msg) {
                console.log('failed', msg);
            } 

        TrainerAPIUtils.networkCall(url, requestedObject, onSuccess, onFaliure);
    },
    GetAskUsQuestions : function () {
        var url = "kpropsnew/GetAskUsQuestionsAPI/v1",
            requestedObject = {
                "discussionSetId" : 1,
                "offset" : 0,
                "limit" : 20
            },
            onSuccess : function (msg) {
                Dispatcher.dispatch({
                    type : AskUsConstants.GET_ASK_US,
                    msg : msg
                });
            } ,
            onFaliure = function (msg) {
                console.log(msg);
            }

        TrainerAPIUtils.networkcall(url, requestedObject, onSuccess, onFaliure);

    }
}

module.exports = AskUsActions;


 


//Store
var Dispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var __askUs = [];
var AskUsConstants = require('../constants/AskUsConstants');


var AskUsStore = assign({}, EventEmitter.prototype, {
    getAskUs : function () {
        return __askUs;
    }, 
    emitChange : function () {
        return this.emit(CHANGE_EVENT);
    },
    addChangeListener : function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener : function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    dispatcherIndex : Dispatcher.register(function (action) {
        switch(action.type) {
            case : AskUsConstants.GET_ASK_US : 
                __askUs = action.msg;
                AskUsStore.emitChange();
                break;
            default : 
                break;
        }
    })
}) ;

module.exports = AskUsStore;