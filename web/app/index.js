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



// function res (){return firebase.database().ref('/Users').once('value').then(function(snapshot) {
//   return snapshot.child("Ricky").val();
// });}

// res()
//
// console.log(res());
//
// firebase.database().ref('/Users').on('value',function(snapshot){
//      console.log(snapshot.val().Ricky);
//    })

// console.log(firebase.database().ref('/users/Ricky'));

var React = require('react');
var ReactDOM = require('react-dom');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {playing: false};
    this.state.ready = false;
  }

  componentWillMount(){
    firebase.database().ref('/Users').on('value',function(snapshot){
      this.setState({playing: snapshot.val().Ricky});
      this.setState({ready: true})
      // if(this.state.playing == true){
      this.toggle()
      // }
    }.bind(this))
  }

  toggle(){
    var myVideo = document.getElementById("video1");

    if (this.state.playing == true)
        myVideo.play();
    else
        myVideo.pause();
  }

  render(){
    if (!this.state.ready){
      return null
    }
    else {

    return (
      <div>
        <video id="video1" width="420">
          <source src="../videos/coldplay.mp4" type="video/mp4" />
        </video>

      </div>
          )
        }
  }
};



module.exports = Home;

ReactDOM.render(
  <Home />, document.getElementById('app')
);
