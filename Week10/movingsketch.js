var e1x = 220
var ey = 230
var e2x = 375
var eary = 240
var eary2= 240
var movement1
var movement2
let currentSize = 20; 
let sizeChange = 2; 
let growing = true; 
let cycles = 0;
function setup() {
    createCanvas(600,600);
    movement1 = floor(random() * 10) +1;
    movement2 = floor(random() * 5) +1;
    movement3 = floor(random() * 10) +1;
    movement4 = floor(random() * 5) +1;
  }
  
  function draw() {
    background(220);
    //ears
    rect(75,eary,50,90);
    if(eary >= 400 || eary <= 150)
      {
         movement3 *= -1;
      }
  
       eary += movement1;
    rect(475,eary2,50,90);
    if(eary2 >= 400 || eary2 <= 150)
      {
         movement4 *= -1;
      }
  
       eary2 += movement4;
    //face
   ellipse(300,345,400,500);
   //hair
    circle(200,120,50);
    circle(215,100,50);
    circle(230,120,50);
    circle(245,100,50);
    circle(260,120,50);
    circle(275,100,50);
    circle(290,120,50);
    circle(305,100,50);
    circle(320,120,50);
    circle(335,100,50);
    circle(350,120,50);
    circle(365,100,50);
    circle(380,120,50);
    //eyes
     circle(e1x, ey, 40);
     if(e1x >= 270 || e1x <= 160)
      {
         movement1 *= -1;
      }
  
       e1x += movement1;
   circle(e2x,ey,40)
   if(e2x >= 450 || e2x <= 290)
    {
       movement2 *= -1;
    }

     e2x += movement2;
    //zit
    point(380,160)
    //nose
    triangle(280, 320, 320, 320, 300, 290);
//stache
    line(220, 420, 375, 420);
    line (220, 415, 220, 390);
    line (225, 415, 225, 390);
     line (230, 415, 230, 390);
     line (235, 415, 235, 390);
     line (240, 415, 240, 390);
    line (245, 415, 245, 390);
     line (250, 415, 250, 390);
     line (255, 415, 255, 390);
     line (260, 415, 260, 390);
    line (265, 415, 265, 390);
     line (270, 415, 270, 390);
     line (275, 415, 275, 390);
     line (280, 415, 280, 390);
    line (285, 415, 285, 390);
     line (290, 415, 290, 390);
     line (295, 415, 295, 390);
     line (300, 415, 300, 390);
    line(305, 415, 305, 390)
    line (310, 415, 310, 390);
    line(315, 415, 315, 390)
    line (320, 415, 320, 390);
    line(325, 415, 325, 390)
    line (330, 415, 330, 390);
    line(335, 415, 335, 390)
    line (340, 415, 340, 390);
    line(345, 415, 345, 390)
    line (350, 415, 350, 390);
    line(355, 415, 355, 390)
  line (360, 415, 360, 390);
    line(365, 415, 365, 390)
    line (370, 415, 370, 390);
    line(375, 415, 375, 390)
    //beard
  line(300, 593, 300, 575)
    line(295, 593, 295, 575)
    line(290, 593, 290, 575)
    line(285, 593, 285, 575)
    line(305, 593, 305, 575)
    line(310, 593, 310, 575)
    line(315, 593, 315, 575)
    textSize(currentSize)
    text('Maxwell Lenik',10,60)
    if (growing) {
      currentSize += sizeChange; 
    } else {
      currentSize -= sizeChange; 
    }
  
    if (currentSize >= 100) { 
      growing = false;
      cycles++; 
    } else if (currentSize <= 20) { 
      growing = true;
      cycles++; 
    }
  
    if (cycles >= 10) {
      cycles = 0;
    }
  }
  