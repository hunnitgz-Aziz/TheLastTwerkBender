Players = new Meteor.Collection("players");
hash = "";
picUrl="";

function getGravatar(email){
  hash = $.md5(email);
  return hash;
}
function makeUrl(hash){
  var baseUrl = 'gravatar.com/avatar/';
  var picUrl = baseUrl + hash;
  return picUrl; 
}
if (Meteor.isClient) {
  Template.Players.PlayerList = function(){
    return Players.find({}, {sort:{ Name: 1 } });
  };

  Template.Players.events = {
    'click .Player' : function(){
      alert('Character is: ' + this.Name);
    }
  };
  Template.Players.created = function() {
    $.shake({
      callback: function() {
        //Players.update({_id: id}, {$set: {Points: Points + 1}});
        alert("shake");
      }
    }); 
  };
  Template.Forms.events = {
    'submit': function(){
      var inputVal = $('.gravatarEmail').val();
      getGravatar(inputVal); 
      console.log(hash); 
    }
  }

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
