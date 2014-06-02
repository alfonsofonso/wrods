
/**
 User: alfonso
 Data: 10/04/14 , 11:15
 */

var historia ="Let's start with the three fundamental Rules of Robotics... We have: one, a robot may not injure a human being, or, through inaction, allow a human being to come to harm. Two, a robot must obey the orders given it by human beings except where such orders would conflict with the First Law. And three, a robot must protect its own existence as long as such protection does not conflict with the First or Second Laws. -- --";
var historiarr=[];
var wordsHistoria=[];
var lienzo;
var fontSize=120;
var numPal=0;
var palabra;
var palabraBien;
var palabar;
var margen;
var anchuraPalabra;
var gaps=[];
var gap=20;
var prevX;

var igLetras=20;
var equisLetras=0;

var Inicio=new function(){



    this.init=function(){
        stage.removeChild(percent);

        Inicio.ponFondo();
        Inicio.generaFrase();
        lienzo.y=alt/2;

        createjs.Ticker.addEventListener("tick", Inicio.tick);
        stage.addEventListener("mousedown",Inicio.handleDown);
        stage.on("pressup",Inicio.handleUp);
    };


    this.tick=function(){
        stage.update();
    };


    this.handleDown=function(e){/// clic

        if(e.target.children!=null || e.target.children!=undefined ){
            e.target.addEventListener("pressmove",Inicio.handleMove);

            e.target.children[0].graphics._fillInstructions[0].params[1]="yellow";
            e.target.parent.setChildIndex(e.target, e.target.parent.children.length-1);
            console.log("soy el ",e.target.miNumero)
        }
        prevX= e.target.x;

    };

    this.handleMove=function(e){
        if(e.stageX > margen  && //  si esta dentro del rango...
        e.stageX < anchuraPalabra+margen+10){  //....

            e.target.x = e.stageX;

            if(e.target.x < gaps[e.target.miNumero] ){
                e.target.off("pressmove",Inicio.handleMove);
                e.removeAllEventListeners(e.target);
                Inicio.retrocede(e.target.miNumero, e.target);

            }else if(e.target.x > gaps[e.target.miNumero+2]){
                e.target.off("pressmove",Inicio.handleMove);
                e.removeAllEventListeners(e.target);
                Inicio.adelanta(e.target.miNumero);
            }

        };
    };

    this.handleUp=function(e){

        e.target.off("pressmove",Inicio.handleMove);
        if(e.target.children!=null || e.target.children!=undefined ){
            e.target.children[0].graphics._fillInstructions[0].params[1]="green";
        }
    }

    this.comprova=function(){
//        console.log("comprova");
        if(palabar==palabraBien){
            Inicio.limpiaLienzo();
            Inicio.numPalCont();
            Inicio.generaPalabra();
        }
    };

    this.retrocede=function(n,f){
        var pal=palabar;
        var letraPalante=pal[n-1];
        var txt2 = pal.slice(0, n-1) + pal[n] + letraPalante + pal.slice(n+1);//the magic
        palabar=txt2;
        Inicio.limpiaLienzo();
        Inicio.ponTodasLasLetras(txt2);
        Inicio.comprova();
    };

    this.adelanta=function(n){
        var pal=palabar;
        if(n==pal.length-1){
            return
        }else{
            var letraPalante=pal[n+1];
        }
        var txt2 = pal.slice(0, n) + letraPalante +  pal[n] + pal.slice(n+2);
        palabar=txt2;
        Inicio.limpiaLienzo();
        Inicio.ponTodasLasLetras(txt2);
        Inicio.comprova();
    };


    this.generaFrase=function(){
        wordsHistoria=historia.split(" ");
        historiarr=historia.split("");
        Inicio.generaPalabra();
    };

    this.generaPalabra=function(){

        palabar=wordsHistoria[numPal];
        palabar=Utils.revisaOrto(palabar);

        if( palabar.length<3 ){
            Utils.escribeArticulo(palabar);
            return
        }

        palabraBien=palabar;
        palabar=Utils.desordena(palabar);
        Inicio.ponTodasLasLetras(palabar);

    };


    this.ponFondo=function(){

        if(lienzo==null || lienzo==undefined){
            lienzo=new createjs.Container();
        }
        stage.addChild(lienzo);
    };


    this.dameLetra=function(letra){

        var cont=new createjs.Container();
        var ficha=new createjs.Shape();

        var letr=new createjs.Text(letra, "bold "+fontSize+"px Helvetica", "#fff");
        letr.x=letr.y=5;
        ficha.graphics.beginFill("red").drawRoundRect(0, 0,letr.getBounds().width+10,fontSize+20 ,5);

        cont.addChild(ficha);
        cont.addChild(letr);
        cont.mouseChildren=false;
        cont.regX=cont.getTransformedBounds().width/2;

        return cont;

    }


    this.limpiaLienzo=function(){
        lienzo.removeAllChildren();
    };


    this.ponTodasLasLetras=function(p){////////////////////////////////   G E N E R A T O R    WROD
        console.log("pongo todas las letras de",p);
        equisLetras=0;
        margen=amp/(p.length+2);
        gaps=[margen];

        if(p.length<9){
            fontSize=150;
        }else{
            fontSize=96;
        }

        palabra=new createjs.Container();

        for(var i=0;i<p.length;i++){/// poner palabra

            var letra=Inicio.dameLetra(p[i]);
            letra.x= equisLetras + margen + letra.getTransformedBounds().width/2;
            letra.y=igLetras;
            letra.miNumero=i;
            palabra.addChild(letra);

            equisLetras = palabra.getTransformedBounds().width + gap;
            gaps.push(letra.x);//sense +""

        }

        lienzo.addChild(palabra);
       // gaps.push(palabra.getTransformedBounds()+margen);
        anchuraPalabra=equisLetras-gap;

    };


    this.numPalCont=function(){// siguiente palabra
        numPal++;
        if(numPal>=wordsHistoria.length-1){
            numPal=0;
        };
    };


};