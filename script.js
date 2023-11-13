$(function(){

   //varaiable
   var mode=0//app mode is off
   //time counter
   var timeCounter=0;
   //lap counter
   var lapCounter=0;
   //variable for set intervel functional
   var action;
   //number of laps
   var lapNumber=0;
   //minutes,sec,centisec for time and lap

   var timeMinutes,timeSeconds,timeCentiseconds,lapMinutes,lapSeconds,lapCentiseconds;

   //on loading we show only two buttons start and lap

   hideshowButtons("#startbut",'#lapbut');

    //clcik on start button

    $("#startbut").click(function()
    {
        //mode on
        mode=1;
        //show stop and lap buttons
        hideshowButtons("#stopbut",'#lapbut');
        //start counter
        startAction();
        
       }
    
    );

    //click on stop button
    $("#stopbut").click(function(){
        hideshowButtons("#resumebut",'#resettbut');
        //stop the counter
        clearInterval(action);

    });

    //clcik on resume
    $("#resumebut").click(function(){
        hideshowButtons("#stopbut",'#lapbut');
        //start the counter
        startAction();

    });

    //clcik on reset
    $("#resettbut").click(function(){
        //reload the page
        location.reload();

    });

    //click on lap button
    $("#lapbut").click(function(){
        //if mode is on 
        if(mode==1)
        {
            //stop action
            clearInterval(action);
            //reset lapcouner to zero
            lapCounter=0;
            //print the lap counter
            addLap();
            //startaction
            startAction();
        }
    });








   //functions

   function hideshowButtons(x,y)
   {
    //hide all buttons
    $(".control").hide();
    //show lap and start
    $(x).show();
    $(y).show();
   }
   //start counter function
   function startAction()
   {
    //every 10 ms increment time and lap counter by 1
     action=setInterval(() => {
        timeCounter++;
        lapCounter++;
        if(timeCounter==100*60*100)
        {
            timeCounter=0;
        }
        if(lapCounter==100*60*100)
        {
            lapCounter=0;
        }
        updateTime();
     }, 10);
   }

   //counterr to minutes,sec and centi sec
   function updateTime()
   {
        //1 min =60 sec
        //1 sec=100 centi sec
        //1 min=60*100 centi= 6000 centi sec

        timeMinutes=Math.floor(timeCounter/6000);
        //1 sec=100 centi sec
        timeSeconds=Math.floor((timeCounter%6000)/100);
        timeCentiseconds=(timeCounter%6000)%100;
        $("#timeminute").text(format(timeMinutes));
        $("#timesec").text(format(timeSeconds));
        $("#timemsec").text(format(timeCentiseconds));

        lapMinutes=Math.floor(lapCounter/6000);
        lapSeconds=Math.floor((lapCounter%6000)/100);
        lapCentiseconds=(lapCounter%6000)%100;

        $("#lapminute").text(format(lapMinutes));
        $("#lapsec").text(format(lapSeconds));
        $("#lapmsec").text(format(lapCentiseconds));
   }

   //format numbers
   function format(num)
   {
    if(num<10)
    {
        return "0"+num;
    }
    else{
        return num;
    }
   }

   //print the lap in laps
   function addLap(){
        lapNumber++;
         var myLapdetails='<div class="lap">'+
                            '<div class="laptitle">'+'Lap'+lapNumber+'</div>'+

                            '<div class="laptime">'+
                            '<span>'+format(lapMinutes)+
                            ':<span>'+format(lapSeconds)+
                            ':<span>'+format(lapCentiseconds)+'</div>'+
                          '</div>';
         $(myLapdetails).prependTo('#laps');

   }
});