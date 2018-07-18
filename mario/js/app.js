//TABLEAU ITEM INITIALISE A VIDE
var items = [];
var piece;
var carapace;
var bonus;
var Player = {
    id : '',
    type:-1,
    x : 0,
    y : 0,
    skin : '',
    highJump : 0,
    timeJump : 0,
    width: 0,
    height: 0,
    action:false,
    item:null,
    tire:false,
    init : function(id, x, y, skin, highJump, timeJump){
        var self = this;
        self.id = id;
        self.x = x;
        self.y = y;
        self.skin = 'img/player/' + skin + '.png';
        self.highJump = highJump;
        self.timeJump = timeJump;

        //CREATION DU JOUEUR EN HTML
        $('#game').append('<div id="' + self.id + '" class="player"></div>');
        $('#' + self.id).append('<img src="' + self.skin + '" />');
        $('#' + self.id).css('bottom', self.y).css('left', self.x);

        //RECUPERATION DE SES DIMENSIONS
        self.width = parseInt($('#' + self.id).css('width'));
        self.height = parseInt($('#' + self.id).css('height'));
    },
    jump : function(){
        var self = this;
        $('#' + self.id).animate({
            'bottom' : self.y + self.highJump
        }, self.timeJump, function(){
            $('#' + self.id).animate({
                'bottom' : self.x
            });
        })
    }
}

var Item = {
    id : '',
    x : 0,
    y : 0,
    skin : '',
    speed : 0,
    width: 0,
    height: 0,
    type : 0,
    touch : 0,
    init : function(id, x, y, skin, speed, type){
        var self = this;
        self.id = id;
        self.x = x;
        self.y = y;
        self.skin = 'img/items/' + skin + '.png';
        self.speed = speed;
        self.type = type;

        $('#game').append('<div id="' + self.id + '" class="items"></div>');
        $('#' + self.id).append('<img src="' + self.skin + '" />');
        $('#' + self.id).css('bottom', self.y).css('left', self.x);

        self.width = parseInt($('#' + self.id).css('width'));
        self.height = parseInt($('#' + self.id).css('height'));

        //AJOUT DE L'ITEM A LA LISTE DES ITEMS
        items.push(self);
        self.run(1);
    },
    run : function(direction){
        var self = this;
        self.direction=direction;
        //SI L'ITEM A ETE TOUCHE, ON LE FAIT REAPPARAITRE AU DEBUT DE L'ANIMATION (VOIR LIGNE 34, Game.checkCollision)
        if(self.touch == 1)
        {
          //  $('#' + self.id).css('width', '');
            self.touch = 0;
        }

        $('#' + self.id).animate({
            'left' : -1*self.direction*100 + '%'
        }, self.speed, function(){
            $('#' + self.id).css('left', 110*self.direction+'%');
            self.run(self.direction);
        })
    }
}

var Game = {
    score : 0,
    start:function(){
      //CREATION DU JOUEUR
      Player.init('player', 15, 15, 'player', 150, 0500);
      //CREATION DES ITEMS
      piece= Object.create(Item);
      piece.init('piece', '90%', 5, 'piece', 3500, 1);
      carapace= Object.create(Item);
      carapace.init('carapace', '90%', 5, 'carapace', 2500, 0);
      bonus= Object.create(Item)
      bonus.init('bonus', '90%', 5, 'bonus', 3000, 2);
      this.scrolling();
      setInterval(function(){
                          items=Game.checkCollisions(Player, items);
                          if(Player.item!=null&&Player.tire){
                            console.log("la");
                            Game.checkCollisions(Player.item,items);
                          }

      }, 0100);
      //DEMARRAGE DU SCROLLING DU DECOR

    },
    checkCollisions : function(elem, items){
        elem.xTemp = parseInt($('#' + elem.id).css('left'));
        elem.yTemp = parseInt($('#' + elem.id).css('bottom'));
        //ON PARCOURT LE TABLEAU CONTENANT TOUS LES ITEMS

        for(var i = 0; i<items.length;i++)
        {


            //ON RECUPERE LA POSITION COURANTE DE L'ITEM PARCOURU
            items[i].xTemp = parseInt($('#' + items[i].id).css('left'));
            items[i].yTemp = parseInt($('#' + items[i].id).css('bottom'));

            //CONDITION DE VERIFICATION
            if (elem.xTemp < items[i].xTemp + items[i].width &&
                elem.xTemp + elem.width > items[i].xTemp &&
                elem.yTemp < items[i].yTemp + items[i].height &&
                elem.height + elem.yTemp > items[i].yTemp&&items[i].type!=3) {
                //SI ITEM NON TOUCHE DURANT SON ANIMATION, ON INCREMENTE LA COLLISION

                if(items[i].touch == 0){
                  if(elem.type==-1){
                          //ITEM TOUCHE
                          items[i].touch = 1;
                          switch(items[i].type){
                            case 0:
                              Game.scoring('loose');
                            break;
                            case 1:
                              Game.scoring('win');
                            break;
                            case 2:
                              Game.scoring('bonus');
                            break;
                          }
                          $('#' + items[i].id).stop();
                          if(items[i].type!=2&&items[i].type!=3){
                              $('#' + items[i].id).css('left', '110%');
                              items[i].run(1);
                          }
                          else{

                              if(items[i].type==2){
                                  items[i].type=3;
                                  Player.item=items[i];
                              }
                          }
                      }
                      else{
                        if(items[i].type==0){
                            Game.scoring('destroy');
                            $('#' + items[i].id).stop();
                            $('#' + elem.id).stop();
                            Player.item=null;
                            Player.tire=false;
                            $('#' + items[i].id).css('left', '110%');
                            $('#' + elem.id).css('left', '110%');
                            items[i].run(1);
                        }
                      }
                    }
                  }
                }


          return items;
    },
    scoring: function(type){
        if(type == 'win'){
            this.score += 1;
        }
        else
        {
            this.score -= 1;
            if(this.score < 0)
                this.score = 0;
        }
        //AFFICHAGE DU SCORE MIS A JOUR
        $('#score').text(this.score);
    },
    scrolling: function(){
        var self = this;

        //ON CHANGE LA POSITION DU BACKGROUND TOUTES LES X SECONDES, COMME PAR DEFAUT IL SE REPETE, CELA DONNERA CETTE IMPRESSION DE DEFILEMENT
        $('#sky').animate({
            'background-position': '-=70'
        }, 1000, 'linear', function(){ self.scrolling() });

        $('#road').animate({
            'background-position': '-=400'
        }, 1000, 'linear', function(){ self.scrolling() });
    }
}


Game.start();
