var Subscribers = function(){
  var sub_list= [];

  return {
    add: function(user_id, socket){
      sub_list.push({user_id: user_id, socket: socket});
    },
    notify: function(user_id, value){
      console.log('notify',user_id,value);
      for (var i = sub_list.length - 1; i >= 0; i--) {
        var subscriber = sub_list[i];
        if (subscriber.user_id == user_id){
          subscriber.socket.emit('update',{
            value: value
          });
        }
      };
    }
  }

}();



var Socket =  function (socket) {

  socket.on('init', function (data, fn){
    console.log(data);
    Subscribers.add(data.user_id,socket);
    fn(true);
  });

};



module.exports = {
  socket: Socket,
  subscribers: Subscribers
};