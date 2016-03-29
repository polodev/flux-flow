var Dispatcher = require('../dispatcher/Dispatcher');
var TrainerAPIUtils = require('../utils/TrainerAPIUtils');
var AskUsConstants = require('../constants/AskUsConstants');
var AskUsStore = require('../stores/AskUsStore');

var AskUsActions = {
    AskQuery : function (query) {
        console.log("AskQuery called");
        var requestObject = {"discussionSetId": 1,  "name" : query},
            url = "kpropsnew/initiateAskUsAPI/v1/",
            onSucess = function (msg) {
                console.log("passed", msg);
            },
            onFailure = function (msg) {
                console.log("failed", msg);
            };

        TrainerAPIUtils.networkCall(url, requestObject, onSucess, onFailure);
    },
    GetAskUsQuestions : function () {
        console.log('GetAskUsQuestions is called');
        var url = "kpropsnew/getAskUsQuestionsAPI/v1/",
            requestObject = {
                "discussionSetId": 1,
                "offset" : 0,
                "length" : 20
            },
            onSucess = function (msg) {
                // console.log(msg);
                Dispatcher.dispatch({type: AskUsConstants.GET_ASK_US, msg : msg});
            },
            onFailure = function (msg) {
                console.log(msg);
            };
        TrainerAPIUtils.networkCall(url, requestObject, onSucess, onFailure);
    }


    
}

module.exports = AskUsActions;