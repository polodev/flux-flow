var React = require('react');

var AskUsPreviousQueries = React.createClass({
  getInitialState : function () {
    return {
      userdata:[{queryHeading:"Where can i practiece my hacking knowledge ?",queryData:"Lorem ipsum dolor sit amet, erat corpora iudicabit per ex. Habeo albucius eam no, in viderer voluptua interpretaris vix, sed ea quodsi eripuit evertitur. Vix id omnes quidam dictas, quidam vituperata vel at, nulla clita at vim. Ea inermis accusata persequeris pro"},{queryHeading:"Some technical doudt in hacking?",
      queryData:"erat corpora iudicabit per ex. Habeo albucius eam no, in viderer voluptua interpretaris vix, sed ea quodsi eripuit evertitur. Vix id omnes quidam dictas, quidam vituperata vel at, nulla clita at vim. Ea inermis accusata persequeris pro"},{queryHeading:"Some technical doudt in hacking?",
      queryData:""},{queryHeading:"Some technical doudt in hacking?",queryData:""},{queryHeading:"Some technical doudt in hacking?",queryData:"Vix id omnes quidam dictas"}]
    }
  },
  render : function () {
    console.log('From the page of AskUsPreviousQueries',this.props.allAskUs);
    var questionAnswer= this.props.allAskUs.map(function(singleAskUs,index){
      var hashAndId='#'+index;
      var notAnsweredQuestion=null;
      var answer=null;
      var num=index + 1;
      if(singleAskUs.answer == null){
        notAnsweredQuestion =
          <label className="questionWillAnswer">
            <span className="willAnswer">Will AnswerSoon</span>
          </label>;
      }
      else{
        answer=
          <div className="queryData collapse" ref="queryData" id={index}>
            <p>{singleAskUs.answer}</p>
          </div>;
      }
      return(
        <div>
          <span className="questionHead">
            <label data-toggle="collapse" data-target={hashAndId}   ref="queryHead" className="heading">
              {num}.{singleAskUs.name}
            </label>
          </span>
          {notAnsweredQuestion}
          {answer}
        </div>
          );
    });

    return (
      <div>
        {questionAnswer}
      </div>
      )
  } 
});

module.exports = AskUsPreviousQueries;