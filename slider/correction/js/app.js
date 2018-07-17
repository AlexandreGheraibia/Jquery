//ON AJOUTE LE DOCUMENT.READY POUR ETRE SUR QUE TOUTE LA PAGE EST CHARGEE AVANT DE LANCER LES SCRIPTS. CELA PERMET DE CONSERVER LES SCRIPTS DANS LE BODY. ON NOTE QUE SLIDER EST DEFINI AVANT PUIS COMPLETE AFIN DE RESPECTER LA PORTEE DES VARIABLES
var Slider = undefined;
$(document).ready(function() { Slider = {
    id : undefined,
    width: 0,
    height: 0,
    slides: [],
    nbSlides: 0,
    currentSlide: 1,
    speed: 0,
    init: function(id, width, height, slides, parent, speed)
    {
        this.id = id;
        this.width = width;
        this.height = height;
        this.slides = slides;
        this.nbSlides = this.slides.length;
        this.currentSlide = 1;
        this.speed = speed;
        
        //CREATION DU SLIDE DANS LA DIV PARENTE
        $(parent).append('<div id="'+this.id+'" class="containerSlider"></div>');
        $('#' + this.id).css('width', this.width + 'px').css('height', this.height + 'px');
        
        //CREATION DE LA DIV ABSOLUE CONTENANT LES SLIDES ET CALCUL DE SA TAILLE EN FONCTION DE LEUR NOMBRE
        $('#' + this.id).append('<div id="'+this.id+'Slides" class="containerSlides"></div>');
        $('#' + this.id + 'Slides').css('width', 100 * this.nbSlides + '%');
        
        //ON PARCOURT LA LISTE DES ARTICLES/SLIDES
        for(var i = 0;i<this.nbSlides;i++)
        {
            //CREATION DE L'ARTICLE/SLIDE
            $('#' + this.id + 'Slides').append('<article id="slide'+i+this.id+'" class="slide"></article');
            $('#slide' + i + this.id).css('width', this.width + 'px').css('height', this.height + 'px').css('background', 'url("'+this.slides[i]['image']+'") no-repeat center top').css('background-size', 'cover');
            //CREATION DEGRADE SI SUR GRADIENT DU SLIDE A 1
            if(this.slides[i]['gradient'] == 1)
            {
                $('#slide' + i + this.id).append('<div class="gradient"></div>');
                $('#slide' + i + this.id + ' div.gradient').css('background', 'linear-gradient(to right, rgba('+this.slides[i]['gradientColor']+',1) 12%,rgba('+this.slides[i]['gradientColor']+',0) 57%,rgba('+this.slides[i]['gradientColor']+',0) 100%)');
            }
            $('#slide' + i + this.id).append('<div class="slidersContent"></div>');
            $('#slide' + i + this.id +' div.slidersContent').append('<p class="categ">'+this.slides[i]['categorie']+'</p><h1>'+this.slides[i]['titre']+'</h1><p class="intro">'+this.slides[i]['texte']+'</p>');
            
            //CALCUL DE LA HAUTEUR DE LA ZONE DE TEXTE ET PLACEMENT VERTICAL
            var heightHalfSlide = $('#slide' + i + this.id + ' .slidersContent').height() / 2;
            $('#slide' + i + this.id + ' .slidersContent').css('margin-top', '-' + heightHalfSlide + 'px');
        }
        
        //CREATION DU COMPTEUR ET DES FLECHE PREV + NEXT
        $('#' + this.id).append('<div id="'+this.id+'Compteur" class="sliderCompteur">'+(this.currentSlide) +'/'+this.nbSlides+'</div>')
        $('#' + this.id).append('<div id="'+this.id+'ArrowPrev" class="sliderArrowPrev"><i class="fas fa-angle-left"></i></div>');
        $('#' + this.id).append('<div id="'+this.id+'ArrowNext" class="sliderArrowNext"><i class="fas fa-angle-right"></i></div>');
        
        //STOCKAGE DE L'OBJET PROTOTYPE PAR SLIDER DANS UNE VARIABLE AFIN DE CONTOURNER LE PB DU THIS DANS L'APPEL D'UNE FONCTION DANS UN ECOUTEUR (THIS SE REFERANT ALORS A L'OBJET DU DOM SUR LEQUEL ON A CLIQUE ET PLUS A L'OBJET AUQUEL APPARTIENT LA METHODE)
        var self = this;
        
        //ECOUTEURS
        $('#' + this.id).on('click', '#'+this.id+'ArrowPrev', function (){
            self.changeSlide('prev')
        });
        $('#' + this.id).on('click', '#'+this.id+'ArrowNext', function (){
            self.changeSlide('next')
        });
        
        //DEFILEMENT AUTOMATIQUE
        var autoSlide = setInterval(function() {self.changeSlide('next')}, self.speed);
        
        //ARRET DEFILEMENT AUTO
        $(parent).on('mouseover', '#'+this.id, function (){
            clearInterval(autoSlide);
        });
        
        //REPRISE DEFILEMENT AUTO
        $(parent).on('mouseout', '#'+this.id, function (){autoSlide = setInterval(function() {self.changeSlide('next')}, self.speed);});
    },
    changeSlide: function (action) {
        var newSlide = this.currentSlide;
        if (action == "prev") {
            newSlide -= 1;
            if (newSlide < 1)
                newSlide = this.nbSlides;
        }
        if (action == "next") {
            newSlide += 1;
            if (newSlide > this.nbSlides)
                newSlide = 1;
        }
        this.currentSlide = newSlide;
        $("#" + this.id + "Slides").css("left", (this.currentSlide - 1) * - 100 + "%");
        $("#" + this.id + "Compteur").text(this.currentSlide + '/' + this.nbSlides);
    }
}
});