/**
 User: alfonso
 Data: 24/04/14 , 16:06
 */



var articulos=0;


var Utils=new function(){


    this.revisaOrto=function(pal){

        var outString = pal.replace(/[`~^*_|=;:",.<>\{\}\[\]\\\/]/gi, '');
        console.log("revisoOrto", typeof outString);
        return outString+"";
    };

    this.desordena=function(palab){

        var pal=palab.split("");
        pal = pal.sort(function() {return Math.random() - 0.5});
        pal.reverse();
        var pala="";
        for(var i=0;i<pal.length;i++){
            pala+=pal[i];
        }
        if (pala ==palab){
            console.log("coincide que  no ha cambiado nada");
            pala=Utils.desordena(pala);
            if (pala ==palab){
                console.log("coincide que  no ha cambiado nada");
                pala=Utils.desordena(pala);
                if (pala ==palab){
                    console.log("coincide que  no ha cambiado nada");
                    pala=Utils.desordena(pala);
                    if (pala ==palab){
                        console.log("coincide que  no ha cambiado nada");
                        pala=Utils.desordena(pala);

                    }
                }
            }
        }
        return pala

    };

    this.escribeArticulo=function(pal){
        console.log("escriboArticulo");
        articulos++;
        Inicio.numPalCont();
        Inicio.generaPalabra();

    };



};