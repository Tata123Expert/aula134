img = "";
objects = [];
modelStatus = "";


function preload()
{
  img = loadImage('dog_cat.jpg');
}

function setup() 
{
   canvas = createCanvas(380, 380);
   canvas.center();
   video = createCapture(VIDEO);
   video.hide();
}

function start()
{
   objectDetector = ml5.objectDetector('cocossd', modelLoaded);
   document.getElementById("status").innerHTML = "Status: Detectando objetos";
}

function modelLoaded()
{
  console.log("Modelo Carregado!");
  modelStatus = true;
}

function gotResult(error, results)
{
  if(error)
  {
    console.error(error);
  }
    console.log(results);  
    objects = results; 
}
/* 4. Criar variáveis para gerar cores aleatórias 
   dentro da condição if ;
   5. Atualizar as funções fill() e stroke() com essas variáveis;
   6. Atualizar a tag h3 que criamos no html com o id="numberOfObjects" 
   para conter a quantidade de objetos detectados */
   

function draw() 
{
  image(video, 0, 0, 380, 380);
  if(modelStatus != "") 
     {
       r = random(255);
       g = random(255);
       b = random(255);
       objectDetector.detect(video, gotResult);
       for (i = 0; i < objects.length; i++) 
         {  
            document.getElementById("status").innerHTML = "Status: Objeto Detectado";
            document.getElementById("numberOfObjects").innerHTML = "Quantidade de objetos detectados: " + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         }
     }
}
