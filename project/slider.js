var Slider={
  id:0,
  nbSlides:0,
  widthTotal:0,
  actualPos:0,

  init:function (id){
      var self=this;//bonne pratique
      self.id=id;
      self.widthTotal=100*$('.slide').length;
      rollover=setInterval(()=>{
                self.nextSlide(1);
                },2500);
      $('#monSlidersArrows').on('mouseover',()=>{
        clearInterval(rollover);
      });
      $('#monSlidersArrows').on('mouseout',()=>{
          rollover=setInterval(()=>{
          self.nextSlide(1);
        },2500);
      });
      $('#monSlidersArrows div').on('click',()=>{
          self.nextSlide(Math.pow(-1,$(this).index()+1));
      });

  },
  nextSlide:function(direction){
    var self=this;
    self.actualPos=(self.widthTotal+self.actualPos+direction*100)%self.widthTotal;
    var nextPos=-self.actualPos+'%';
    $('#monSliderContent').css('left',nextPos);
  }
}

Slider.init('monSlider',4);

console.log(Slider);
