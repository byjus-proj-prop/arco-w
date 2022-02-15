var arco , flecha,  planoFundo,pontos = 0         ;
var imagemArco, imagemFlecha,grupoFlecha, imagem_balaoVerde, imagem_balao, imagemPlanoFundo,grupoBalao;

function preload(){
  
  imagemPlanoFundo = loadImage("background0.png");
  imagemFlecha = loadImage("arrow0.png");
  imagemArco = loadImage("bow0.png");
  imagem_balao = [loadImage("red_balloon0.png"),loadImage("blue_balloon0.png"),loadImage("green_balloon0.png"),loadImage("pink_balloon0.png")];
  
}



function setup() {
  createCanvas(400, 400);
  
  //criando plano de fundo background
  cenario = createSprite(0,0,400,400);
  cenario.addImage(imagemPlanoFundo);
  cenario.scale = 2.5
  
  // criando arco para lançar a fecha
  arco = createSprite(380,220,20,50);
  arco.addImage(imagemArco); 
  arco.scale = 1;
  
  grupoBalao = [new Group(), new Group(), new Group(), new Group()];
  grupoFlecha = new Group();
  
}

function draw() {
 background(0);
  // movendo o solo
    cenario.velocityX = -3 

    if (cenario.x < 0){
      cenario.x = cenario.width/2;
    }
  
  //movendo o arco
  arco.y = World.mouseY
  
   // lançar flecha quando tecla de espaço é pressionada
  if (keyDown("space")) {
    criarFlecha();
    
  }
  
  grupoBalao.forEach((balao, i) => {
    if(grupoFlecha.isTouching(balao)) {
      balao.destroyEach();
      grupoFlecha.destroyEach();
      pontos += i+1;
    }
  });
  
  if (World.frameCount % 100 == 0) {
    balao(Math.round(random(0,3)))
  }
  
  drawSprites();
  text("pontuação: "+pontos,300,50);
}


// Criando flechas para o arco
 function criarFlecha() {
  var flecha= createSprite(100, 100, 60, 10);
  flecha.addImage(imagemFlecha);
  flecha.x = 360;
  flecha.y=arco.y;
  flecha.velocityX = -4;
  flecha.lifetime = 100;
  flecha.scale = 0.3;
  grupoFlecha.add(flecha);
}


function balao(v) {
  var balao = createSprite(0,Math.round(random(20, 370)), 10, 10);
  balao.addImage(imagem_balao[v]);
  balao.velocityX = 3;
  balao.lifetime = 150;
  balao.scale = v==3 ? 1 : 0.1;
  grupoBalao[v].add(balao);

}