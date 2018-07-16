/* tableau associatif*/
var Clavier = {
    listKey : [],
/*methode create de l'objet clavier*/
		/*conteneurParent est �gal � "ul" dansl'exemple*/
    init : function(listKey,conteneurParent){
    
        this.listKey = listKey;
				/* pour i allant de l'indice 0 � l'indice length-1
        */
        for(var i = 0;i<this.listKey.length;i++)
        {
        		/*ci-dessous
            on ajoute � ul
            la  li suiante
            <li id="' + this.listKey[i] + '"> this.listKey[i] +'</li>
            ce qui est �quivalent � 
            <li id="lettre a l'indice i de listKey">lettre a 									l'indice i de listKey</li>
            exemple! pour i =0;
            this.listKey[0] est �gale 'A'
            le document HTML est equivalent � 
            <ul><li id='A'>
            			A
            		</li>
            </ul>
            */
           $(conteneurParent).append('<li id="' + this.listKey[i] + '">'+ this.listKey[i] +'</li>');
						/*ci-dessous
            	revient � �crire pour i �gal � 0
              $(ul #A).on('click'),funtion()....
              soir on recherche l'element contenu dans ul qui  
              a pour identifiant donc id �gal � A
              si on reformule on cherche la balise qui contient id='A'
              et on lui attribut un listenner surl'action clique.
              et une fonction anonyme qui fera le traitement (handler).
              
            */
            $(conteneurParent+' #' + this.listKey[i]).on('click', function() {
            		/*$(input) dans la balise input
                	$('input').val() valeur de la balise input
                	$(this).text() est equialent � la $(conteneurParent.listKey[i]).text();
                	$(conteneurParent+' #'+listKey[i]) dans la balise qui est contenu dans la balise ul
                  je veux la balise qui a pour id='A' si i=0
                  donc on peut interpreter $(this).text();
                  comme je eux le texte de la balise qui est contenu dans la balise  qui a un id ='A' si i=0
                  et qui est contenu dans (ou descendant de )  la balise ul.
                  et donc la'instruction suiante dit: 
                  je veux que la valeur de la balise input soit remplacer par la valeur plus celle de la 
                  la li (car elle  a l'id �gal � 'A' pour i=0) contenu dans ul.
                  donc a chaque click input accumule les valeurs cliqu�es � la souris 
                  */
                $('input').val($('input').val() + $(this).text());
            }) 
        }
    }
}

/*Clavier.create(['A','Z','E','R','T','Y','U','I','O','P', 'Q', 'H'],'ul');*/
var clavierAzerty=Object.create(Clavier).init(['A','Z','E','R','T','Y','U','I','O','P', 'Q', 'H'],'ul');
