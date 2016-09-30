var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

var config = {
  apiKey: "AIzaSyAtDgXyDX3mRvpneGpapO36ukNzaRLNZGE",
  authDomain: "somos-39d0c.firebaseapp.com",
  databaseURL: "https://somos-39d0c.firebaseio.com",
  storageBucket: "somos-39d0c.appspot.com",
  messagingSenderId: "576492174487"
};

firebase.initializeApp(config);

var React = require('react');
var ReactDOM = require('react-dom');

var Home = React.createClass({
  // getInitialState : function() {
  //   return {
  //     counter : 0
  //   };
  // },
  // plusClicked: function(){
  //   this.setState({
  //     counter: this.state.counter + 1
  //   });
  // },
  // minusClicked: function(){
  //   this.setState({
  //     counter: this.state.counter - 1
  //   });
  // },
  render: function(){
    return (
      <video id="video1" width="420">
        <source src="../videos/coldplay.mp4" type="video/mp4" />
      </video>
      )
  }
});

module.exports = Home;

ReactDOM.render(
  <Home />, document.getElementById('app')
);
