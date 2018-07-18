$(document).on('keydown',function(e){
//  alert(e.which);
  if(Player.action&&e.which==32){
      Player.action=false;
      Player.jump();
  }

  if(e.which==17){
      if(Player.item!=null){
        Player.tire=true;
        Player.item.run(-1);
      }

    }

});
$(document).on('keyup',function(e){
  if(e.which==32){
    Player.action=true;
  }

});
