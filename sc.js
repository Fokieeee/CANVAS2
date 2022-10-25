window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(Math.random() * 0.09 +0, "red");
    gradient.addColorStop(Math.random() * 0.09 +0, "green");
    gradient.addColorStop(Math.random() * 0.09 +0, "yellow");
    gradient.addColorStop(Math.random() * 0.09 +0, "indigo");
    gradient.addColorStop(Math.random() * 0.09 +0, "violet");
    gradient.addColorStop(Math.random() * 0.09 +0, "orange");
    
    


    //canvas settings
    ctx.fillStyle = gradient;
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;


    //effect settings
    let size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
    const maxlevel = 2;
    const branches =3;

    let spread = 0 ;
    let scale = 0.5;
    let sides = 2;
    let color = 'hsl('+ Math.random() * 360 +', 100%, 50%)';
    let lineWidth = Math.floor(Math.random() * 15 + 1);
    let trans = 0;
    let all = 0;
    

    //controls
    const randomizeButton = document.getElementById('randomizeButton');
    const resetButton = document.getElementById('reset');
    const goButton =document.getElementById('go');
    const slider_spread = document.getElementById('spread');
    const label_spread = document.querySelector('[for="spread"]');
    slider_spread.addEventListener('change', function(e){
        spread = e.target.value;
        updateSliders();
        drawFractal();
    });
    

    const slider_sides = document.getElementById('sides');
    const label_sides = document.querySelector('[for="sides"]');
    slider_sides.addEventListener('change',function(e){
        sides = e.target.value;
        updateSliders();
        drawFractal();
    })
    const slider_translate = document.getElementById('translate');
    const label_translate = document.querySelector('[for="translate"]');
    slider_translate.addEventListener('change', function(e){
        trans = e.target.value;
        updateSliders();
        drawFractal();
    });
    const slider_all = document.getElementById('all');
    const label_all = document.querySelector('[for="all"]');
    slider_all.addEventListener('change',function(e){
        console.log(e);
        trans = e.target.value * 0.5;
        sides = e.target.value;
        spread = e.target.value * 0.5 ;
        updateSliders();
        drawFractal();
        all += 0.2;
        
    });

    function resetFractal(){
    spread = 0 ;
    scale = 0.5;
    sides = 2;
    trans = 0;
    slider_all.value = 0;
    slider_sides.value = 2;
    slider_spread.value = 0;
    slider_translate.value = 0;
    all = 0;

};


    resetButton.addEventListener('click', function(){
        resetFractal();
        updateSliders();
        drawFractal();
        
    })
    let raf = null
function loop() {
  raf = requestAnimationFrame(loop)

  goButtonHold()
}

function stopLoop() {
  cancelAnimationFrame(raf)
  
}

    function goButtonHold(){
        all += 0.1;
        spread += 0.1;
        sides += 0.1;
        trans += 0.1;
       
        updateSliders();
        drawFractal();
        
    }
    goButton.addEventListener('mousedown',loop);
    goButton.addEventListener('mouseup',stopLoop);

   
   
   
    
   
    function drawBranch(level){
        if(level > maxlevel) return;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(size,0);
        ctx.stroke();
        
         for ( let i = 0; i < branches; i++){
            ctx.save();
            ctx.translate((size-(size/branches * i*trans)),0);
            ctx.rotate(spread);
            ctx.scale(scale, scale);
            drawBranch(level + 1);
            ctx.restore();

            ctx.save();
            ctx.translate((size-(size/branches * i*trans)),0);
            ctx.rotate(-spread);
            ctx.scale(scale, scale);
            drawBranch(level + 1);
            ctx.restore();
        }
    }

    function drawFractal(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = gradient;
        ctx.translate(canvas.width/2,canvas.height/2);
        for (let i = 0; i < sides; i++){
            ctx.rotate((Math.PI * 2)/sides);
            drawBranch(0);
        }
        ctx.restore();
    }
    drawFractal();
        
    function randomizeFractal(){
        spread = Math.random() * 2.9 + 0.1;
        scale = Math.random() * 0.2 + 0.4;
        sides = Math.floor(Math.random() * 7 + 2);
       // color = 'hsl('+ Math.random() * 360 +', 100%, 50%)';
        lineWidth = Math.floor(Math.random() * 15 + 1);
        trans = Math.random()* 10 + 1;
        //gradient.addColorStop(Math.random() * 0.09 +0, "red");
       // gradient.addColorStop(Math.random() * 0.09 +0, "green");
        gradient.addColorStop(Math.random() * 0.09 +0, "yellow");
        gradient.addColorStop(Math.random() * 0.09 +0, "indigo");
       // gradient.addColorStop(Math.random() * 0.09 +0, "violet");
        gradient.addColorStop(Math.random() * 0.09 +0, "orange")
    }
    randomizeButton.addEventListener('click', function(){
        randomizeFractal();
        updateSliders();
        drawFractal();
    });

    

    function updateSliders(){
        slider_spread.value = spread;
        label_spread.innerText = 'Spread: '+ Number(spread).toFixed(1);
        slider_sides.value = sides;
        label_sides.innerText = 'Sides: '+ Number(sides).toFixed(1);
        slider_translate.value = trans;
        label_translate.innerText = 'Translate:'+ Number(trans).toFixed(1);
        slider_all.value = all;
        label_all.innerText = 'all:' + Number(all).toFixed(1);

        
    }
    updateSliders();

   window.addEventListener('resize',function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawFractal();
        let size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
    })
    
    
});