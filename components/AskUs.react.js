var React = require('react');
var AskUsPreviousQueries = require('./AskUsPreviousQueries.react');
var AskUsActions = require('../../actions/AskUsActions');
var AskUsStore = require('../../stores/AskUsStore');
console.log("object from store", AskUsStore.getAskUs());

function getAppState () {
  console.log("getAppState",AskUsStore.getAskUs());
  return {
    allAskUs : AskUsStore.getAskUs() 
  }
}

var AskUs = React.createClass({
  getInitialState : function () {
    return {
      allAskUs : [] 
    }
  },
  handleSubmit : function (e){
    e.preventDefault();
    var data={
     fullName :this.refs.fullName.value,
     emailId  :this.refs.emailId.value,
     mobileNo :this.refs.mobileNo.value,
     userQuery:this.refs.userQuery.value,
    }

    AskUsActions.AskQuery(data.userQuery);
    
    $('.askus-form').hide();
    $('.submit-output').show();
  },
  componentDidMount : function () {
    AskUsActions.GetAskUsQuestions();
    AskUsStore.addChangeListener(this._onChange)
  },
  componentWillUnmount : function () {
    AskUsStore.removeChangeListener(this._onChange)
  },
  submitAnother: function (e){
    e.preventDefault();
    $('.submit-output').hide();
    $('.askus-form').show();
    document.getElementById("myform").reset();
  },
  _onChange : function () {
    this.setState(getAppState());
  },
  prevQuery : function () {
    this.componentDidMount();
    $('.submit-output').hide();
    $('.askus-form').show();
  },
  render : function () {
    return (
        <div className="row">
          <div className="col-md-offset-3">
            <div className="user-form boxshadow">
                <br/>
                <div className="row" >
                  <div className="col-md-offset-3" id="tabs">
                    <ul className="nav nav-tabs">
                      <li className="active"><a data-toggle="tab" className="btn-gp" href="#home">ASK QUERY</a></li>
                      <li><a data-toggle="tab" onClick={this.prevQuery} className=" btn-gp" href="#menu1">PREVIOUS QUERIES</a></li>
                    </ul>
                  </div>
                </div>
                <br/><br/>
                <div className="tab-content askus-form ">
                  <div id="home" className="tab-pane fade in active ">
                    <form onSubmit={this.handleSubmit}  name="form1" className="user-form-filler" id="myform">
                      <input type="text" className="form-control " id="caret" ref="fullName" placeholder="Enter Your Name" required/><br/>
                      <div className="row">
                        <div className="col-md-6">
                            <input type="email" className="form-control email" ref="emailId" id="caret exampleInputEmail3" placeholder="Enter your Email id" required/>
                        </div>
                        <div className="col-md-6">
                            <input type="mobile" className="form-control mobile" ref="mobileNo" id=" caret mobile-no" placeholder="Enter your Mobile Number" required/>
                        </div>
                      </div><br/>
                      <textarea className="form-control query" rows="8" ref="userQuery"  placeholder="Write down your query" id="caret comment" required></textarea>
                      <br/>
                      <button  type="submit" className="btn btn-default button" >SUBMIT</button>
                    </form>
                    <br/><br/><br/>
                  </div>
                  <div id="menu1" className="tab-pane fade">
                    <br/>
                    <div className="row previousQueries">
                      <div className="col-md-1 search-icon">
                        <span className="glyphicon glyphicon-search"></span>
                      </div>
                      <div className="col-md-6">
                      <form>
                        <input type="text" placeholder="Enter keyword to search" required/>
                        <button className="btn"  type="submit">search</button>
                      </form>

                      </div>
                    </div>
                    <br/>
                    <br/><br/>
                    
                    <AskUsPreviousQueries allAskUs= {this.state.allAskUs}/>

                    <br/><br/><br/><br/><br/>

                  </div>
                </div>
                <div className="submit-output" hidden>
                  <br/>
                  <h4>Thanks for Reaching out to us<br/><p></p> Your Query was submitted and will be answered soon </h4>
                  <br/><br/>
                  <button onClick={this.submitAnother} className="btn btn-submit-another" type="submit">SUBMIT ANOTHER</button>
                  <br/><br/><br/>
                </div>
            </div>
          </div>

        </div>
      );
  }
});

module.exports = AskUs;