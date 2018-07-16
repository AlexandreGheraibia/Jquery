/* tableau associatif*/
var Clavier = {
    listKey : [],
/*methode create de l'objet clavier*/
		/*conteneurParent est égal à "ul" dansl'exemple*/
    init : function(listKey,conteneurParent){
    
        this.listKey = listKey;
	/* pour i allant de l'indice 0 à l'indice length-1*/
        for(var i = 0;i<this.listKey.length;i++)
        {
            /*ci-dessous
            on ajoute à ul la li suiante:
            <li id="' + this.listKey[i] + '"> this.listKey[i] +'</li>
            ce qui est équivalent à 
            <li id="lettre a l'indice i de listKey">lettre a 									l'indice i de listKey</li>
            exemple! pour i =0;
            this.listKey[0] est égale 'A'
            le document HTML est equivalent à 
            <ul>
	    	<li id='A'>
            			A
            	</li>
            </ul>
            */
           $(conteneurParent).append('<li id="' + this.listKey[i] + '">'+ this.listKey[i] +'</li>');
	    /*ci-dessous revient à écrire pour i égal à 0
              $(ul #A).on('click'),funtion()....
              on recherche l'element contenu dans ul qui  
              a pour identifiant  id égal à A
              si on reformule on cherche la balise qui contient id='A'
              et on lui attribut un listenner sur l'action clique.
              et une fonction anonyme qui fera le traitement (handler) du clique.
              
            */
            $(conteneurParent+' #' + this.listKey[i]).on('click', function() {
            	/*$(input) dans la balise input
                $('input').val() valeur de la balise input
                $(this).text() est equialent à  $(conteneurParent+' #'+listKey[i]).text();
                $(conteneurParent+' #'+listKey[i]) dans les balises qui sont contenues dans la balise ul
                je veux la balise qui a pour id='A' si i=0
                donc on peut interpreter $(this).text();
                comme je veux le texte de la balise qui est contenu dans la balise  qui a un id ='A' si i=0
                et qui est contenu dans (ou descendant de )  la balise ul.
                et donc l'instruction suiante dit: 
                je veux que la valeur de la balise input soit remplacée par la valeur de input plus celle de la 
                la li (car elle  a l'id égal à 'A' pour i=0) contenu dans ul.
                donc a chaque click input accumule les valeurs cliquées à la souris (parce que je le fais
		pour tous les i allant de 0 à longueur-1 de listKey donc pour tous les éléments du tableau listKey)
		
                  */
                $('input').val($('input').val() + $(this).text());
            }) 
        }
    }
}

/*Clavier.create(['A','Z','E','R','T','Y','U','I','O','P', 'Q', 'H'],'ul');*/
var clavierAzerty=Object.create(Clavier).init(['A','Z','E','R','T','Y','U','I','O','P', 'Q', 'H'],'ul');
