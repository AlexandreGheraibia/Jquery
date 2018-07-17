var Slider={
  id:0,
  nbSlides:0,
  widthTotal:0,
  actualPos:1,

  init:function (id,nbSlides){
      var self=this;//bonne pratique
      self.id=id;
      self.nbSlides=nbSlides;
      self.widthTotal=100*nbSlides;
      rollover=setInterval(function(){
          self.nextSlide(1);
      },2500);
      $('#monSlidersArrows').on('mouseover',function(){
        clearInterval(rollover);
      });
      $('#monSlidersArrows').on('mouseout',function(){
          rollover=setInterval(function(){
          self.nextSlide(1);
        },2500);
      });
      $('#monSlidersArrows div:first-child').on('click',function(){
            //precedent
          self.nextSlide(-1);
      });

      $('#monSlidersArrows div:last-child').on('click',function(){
          self.nextSlide(1);
      });
  },

  nextSlide:function(direction){
    var self=this;
    self.actualPos=(self.nbSlides+self.actualPos+direction)%self.nbSlides;
    var nextPos=-(self.actualPos)*100+'%';
    $('#monSliderContent').css('left',nextPos);
  }
}

Slider.init('monSlider',4);

console.log(Slider);
