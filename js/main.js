
var percent;
var amp=960;
var alt=1440;

Main= new function(){

    var RESOLUTION=1;

    var fons_loader;

    this.init=function(){
        console.log("gudmornin");

        Main.windowResize();

        Main.creaStage();

        Inicio.init();
    };

    this.windowResize =function ()
    {
        console.log("resizo");
        var canvas = $("#mainCanvas");

        var ratio =   1440/960;
        var height = canvas.css('height').substring(0, canvas.css('height').lastIndexOf('px') );
        if( $(window).height() != height)
        {
            canvas.css( 'height', $(window).height()+ 'px' );
            canvas.css( 'width',  ($(window).height() / ratio) + 'px' );
        }

        var width = canvas.css('width').substring(0, canvas.css('width').lastIndexOf('px') );
        if( $(window).width() < width)
        {
            canvas.css('width', $(window).width()+ 'px');
            canvas.css('height', $(window).width() * ratio+'px');
        }
    };

    this.creaStage=function(){

        stage = new createjs.Stage(document.getElementById("mainCanvas"));
        createjs.Touch.enable(stage);
        fons_loader = new createjs.Shape();
        fons_loader.graphics.beginFill("black").drawRect( 0 , 0 , 960/RESOLUTION, 1440/RESOLUTION ); //.drawCircle (50/RESOLUTION, 50/RESOLUTION, 50/RESOLUTION);

        fons_loader.cache(0, 0, 960/RESOLUTION, 1440/RESOLUTION);
        fons_loader.x = 0;
        fons_loader.y = 0;
        stage.addChild(fons_loader);

        if( percent == null || percent == undefined )
        {
            percent = new createjs.Text("generating\ndyslexia...", "bold "+(100/RESOLUTION)+"px Arial", "#555555");
            percent.textBaseline = "alphabetic";
            percent.y = 720 / RESOLUTION;
            percent.x = 230 / RESOLUTION;
        }

        stage.addChild(percent);
        Main.windowResize();
        stage.update();
    }



};



window.onload=Main.init();

window.onresize=function(){
    Main.windowResize();
};