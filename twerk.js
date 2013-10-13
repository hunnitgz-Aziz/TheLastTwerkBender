(function(){
Players = new Meteor.Collection("players");
hash = "";
picUrl="";
characters = new Array('images/iceking_twerk.gif',
                       'images/miley_twerk.gif',
                       'images/squidward_twerk.gif',
                       'images/nicki_twerk.gif');

nations = new Array('images/air_nation.png',
                    'images/fire_nation.png',
                    'images/water_nation.png',
                    'images/earth_nation.png');

function getGravatar(email){
  hash = $.md5(email);
  return hash;
}
function makeUrl(hash){
  var baseUrl = 'http://gravatar.com/avatar/';
  var picUrl = baseUrl + hash + '.jpg?s=50';
  return picUrl; 
}

if (Meteor.isClient) {
  Template.Players.PlayerList = function() {
    return Players.find({}, {sort: { Name: 1 } });
  };
  Template.Players.events = {
    'click .Player' : function(){
      alert('Character is: ' + this.Name);
    }
  };
  Template.Players.created = function() {
    $.shake({ 
      callback: function() {
         Players.update(Session.get("currentUser"), {$inc: {Points: 1}});
         Players.find().map(function(player){
            if (player.Points >= 20) {
              alert(Player.Email + " won!");
              console.log('Success!');
            }
         });
      }
    }); 
  };
  Template.Forms.events = {
    'reset': function() {
      var ids = Players.find().map(function(player) { return player._id })
      ids.forEach(function(id) {
        Players.remove(id);
      });
        $('.gravatarEmail').show();
        $('.submitButton').show();
    },
    'submit': function() {
      var inputVal = $('.gravatarEmail').val();
      getGravatar(inputVal); 
      var gravatarUrl = makeUrl(hash);
      var numTwerkers = $('.twerkCharacter').length;
      var playerId = Players.insert({Image: characters[numTwerkers],
									                   Nation: nations[numTwerkers],
                                     Email: inputVal,
									                   Gravatar: gravatarUrl,
									                   Points: 0});

      Session.set("currentUser", playerId);
      if(numTwerkers>=4){
        $('.gravatarEmail').hide();
        $('.submitButton').hide();
      }   
        return false;
      }
    }
}
if (Meteor.isServer) {
 Meteor.startup(function () {
  //Code to run on startup
    Players.remove({});
  });
}
})();
