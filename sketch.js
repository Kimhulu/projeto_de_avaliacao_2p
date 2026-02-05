// ///// CUIDADO! MISTUREI MUITO INGLÊS COM PORTUGUÊS \\\\\
// Não conte para a prof Suzi, obd S2


// Tamanho do cavas
let canvasW = 400;
let canvasH = 600;

// Capa (textura auditiva)
let capaX = 50;
let capaY = 50;
let capaSize = 300;

// Tamanho dos circulos e quantidade por linha
let diametro = 26;
let linhaElls;


// Playlist com as musicas em ordem alfabética (foi mais dificil isso que o código em si)
let playlist = [
    "Abracadabra.mp3",
    "Another Brick in the Wall.mp3",
    "Bang Bang.mp3",
    "Boom, Boom, Boom, Boom!!.mp3",
    "Bonde do Brunão.mp3",
    "Butterfly.mp3",
    "Call Me Maybe.mp3",
    "California Gurls.mp3",
    "Dancing In The Dark.mp3",
    "Don't You Forget.mp3",
    "Dream On.mp3",
    "Easy.mp3",
    "Ela só Pensa em Beijar.mp3",
    "Everlong.mp3",
    "Foo Fighters.mp3",
    "Girlfriend.mp3",
    "God Games.mp3",
    "Golden.mp3",
    "Highway to Hell.mp3",
    "I Don't Wanna Miss a Thing.mp3",
    "I Love Rock n Roll.mp3",
    "I Kissed a Girl.mp3",
    "Infinita Highway.mp3",
    "Judas.mp3",
    "Levels.mp3",
    "Loser, Baby.mp3",
    "Love In A Bottle.mp3",
    "Moonwalkin.mp3",
    "Mujeriego.mp3",
    "Nothing Else Matters.mp3",
    "On The Floor.mp3",
    "One Thing.mp3",
    "Party Rock Anthem.mp3",
    "Payphone.mp3",
    "Penelope Uai Suffering.mp3",
    "Rebel Rebel.mp3",
    "Rock You Like A Hurricane.mp3",
    "Satisfaction.mp3",
    "Sina de Ofélia.mp3",
    "Soda Pop.mp3",
    "Starships.mp3",
    "Stop Crying Your Heart Out.mp3",
    "Sugar.mp3",
    "Sweet Child O' Mine.mp3",
    "Sweater Weather.mp3",
    "Taki Taki.mp3",
    "Taste.mp3",
    "The Fate of Ophelia.mp3",
    "The Lazy Song.mp3",
    "There Are Other Ways.mp3",
    "Thunderstruck.mp3",
    "Timber.mp3",
    "Upside Down.mp3",
    "Uptown Funk.mp3",
    "Vagalumes.mp3",
    "Walk This Way.mp3",
    "Wonderwall.mp3",
    "Your Love.mp3"
];

// Nome dos Artistas organizados pela sequencia da playlist S2
let artistas = [
    "Lady Gaga",
    "Pink Floyd",
    "Jessie J ft. Ariana Grande, Nicki Minaj",
    "Vengaboys",
    "Bruno Mars",
    "Smile",
    "Carly Rae Jepsen",
    "Katy Perry",
    "Bruce Springsteen",
    "Hazbin Hotel",
    "Aerosmith",
    "Hazbin Hotel",
    "MC Leozinho",
    "Foo Fighters",
    "Foo Fighters",
    "Avril Lavigne",
    "EPIC: The Musical",
    "Kpop Demon Hunters",
    "AC/DC",
    "Aerosmith",
    "Joan Jett",
    "Katy Perry",
    "Engenheiros do Hawaii",
    "Lady Gaga",
    "Avicii",
    "Hazbin Hotel",
    "Hazbin Hotel",
    "LNGSHOT",
    "Ryan Castro",
    "Metallica",
    "Jennifer Lopez & Pitbull",
    "One Direction",
    "LMFAO",
    "Maroon 5",
    "EPIC: The Musical (Brasil)",
    "David Bowie",
    "Scorpions",
    "The Rolling Stones",
    "IA (Luísa Sonza e TH⁷n)",
    "Kpop Demon Hunters",
    "Nicki Minaj",
    "Oasis",
    "Maroon 5",
    "Guns N' Roses",
    "The Neighbourhood",
    "DJ Snake",
    "Sabrina Carpenter",
    "Taylor Swift",
    "Bruno Mars",
    "EPIC: The Musical",
    "AC/DC",
    "Pitbull",
    "Black Gryph0n ft. Baasik",
    "Bruno Mars ft. Mark Ronson",
    "Ivo Mozart & Pollo",
    "Aerosmith",
    "Oasis",
    "The Outfield"
];


// Musica começa pela 0, no caso, Abracadabra!! abra u la la!!
let musicaAtual = 0;
let som;

// Faz com que a música não comece direto (amém por isso...)
let tocando = false;

// O Loop e o Random começam desativados também
let loopAtivo = false;
let randomAtivo = false;

// Mapeamento do audio (amo essa palavra "mapeamento")
let amp;

// Fade in começa false e 0 para aumentar o volume aos poucos
let fade = 0;
let fading = false;

// Identidade visual por música, ou seja, cada musica tem uma seed e cor diferente (Minecraft ajuda mais do que parece...)
let seeds = [];
let cores = [];
let corBase = 0;



function preload() {

    // Já carregar direto as musicas da playlist
    som = loadSound(`./playlist/${playlist[musicaAtual]}`);
}



function setup() {
    createCanvas(canvasW, canvasH);

    // O audio só começa quando o "User" (pessoa interagindo) "clicar"
    userStartAudio();

    // Modo de cor HSB (HUE/Matriz, Saturation/Saturação, Bright/Brilho)
    colorMode(HSB, 360, 100, 100);

    // Mapear a amplitude do som para fazer as Ellipses serem reativas a ele (já tinha no projeto passado.) 
    amp = new p5.Amplitude();

    // Mostra qual som tem que ser analisado
    amp.setInput(som);

    // Cria identidade visual única por música. A seeds fica a mesma por musica, ou seja, ela n se altera durante aquela musica, só na próxima ou anterior. As cores são aleatórias mesmo
    for (let i = 0; i < playlist.length; i++) {
        seeds.push(floor(random(100000)));
        cores.push(random(0, 360));
    }

    // Aleatoriza a seed e a cord da musica queestá tocando
    randomSeed(seeds[musicaAtual]);
    corBase = cores[musicaAtual];
}



function draw() {
    background(8);

    // Mouse influencia textura na cor e no diametro das ellipses
    let mouseCor = map(mouseX, 0, width, -20, 20);
    let mouseDiam = map(mouseY, 0, height, -6, 6);

    diametro = 26 + mouseDiam;
    corBase = cores[musicaAtual] + mouseCor;

    // Parte que fica atrás das Ellipses, um cinza mais claro
    noStroke();
    fill(0, 0, 18);
    rect(capaX, capaY, capaSize, capaSize);

    // Utilizando o Push e o Pop da aula
    // Uso o Clip para "recortar" e manter a Textura Auditiva em Carcere privado dentro do quadrado
    push();
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(capaX, capaY, capaSize, capaSize);
    drawingContext.clip();

    // Chamo a próxima função que é a própria Textura Auditiva
    desenharTextura();

    // Fecho o Push e Pop
    drawingContext.restore();
    pop();

    // Chamo as demais funções
    mostrarInfoMusica();
    desenharBarraTempo();
    botoes();

    // Fade in, enquanto ele estiver "True", o volume bai subindo até o 1
    if (fading) {
        fade += 0.05;
        som.setVolume(fade);
        if (fade >= 1) fading = false;
    }
}


// Minha textura Auditiva turbinada
function desenharTextura() {

    // As linhas sendo o valor da capa dividida pelo diametro para saber quantas cabem
    linhaElls = capaSize / diametro;

    // Volume do som
    let level = amp.getLevel();

    // Ajusta pra ficar uma escala melhor (0 a 100) igual já tinha na minha textura anterior
    level = map(level, 0, 0.3, 0, 100);

    // Auto explicativo (cx = o x da capa definido anteriormente + o tamanho da capa definido anteriormente / por 2 ( pro Y é a mesma coisa)). Variaveis diferentes para não coflitar com o "background" da capa em si
    let cx = capaX + capaSize / 2;
    let cy = capaY + capaSize / 2;

    // Distância máxima até onde as bolinhas podem ir 
    let maxDist = dist(capaX, capaY, cx, cy);

    // A textura não muda durante a música
    randomSeed(seeds[musicaAtual]);

    // Loop para as bolinhas
    for (let i = 0; i < linhaElls; i++) {
        for (let j = 0; j < capaSize; j += diametro) {


            // Posicionamento das ellipses
            let x = capaX + i * diametro;
            let y = capaY + j;

            // Distância até o centro
            let d = dist(x, y, cx, cy);

            // Inf = a Influência, ou seja, as ellipses do centro vão reagir mais que as ellipses das bordas. Como se realmente fosse uma explosão ou pulsação
            let inf = map(d, 0, maxDist, 1, 0);

            // O tamanho das bolinhas variam com o volume da música e com a inf do centro
            let size = diametro + level * inf * 0.4;

            // As ellipess ficam mais claras no centro e mais escuras na borda (obviamente influenciadas pela música)
            let brilho = map(inf, 0, 1, 30, 85);
            brilho = constrain(brilho + level * 0.4, 0, 100);

            // HSB!!!
            fill(corBase, 100, brilho);

            // Bolinha 🤏❤️
            ellipse(x, y, size);
        }
    }
}



// Function para mostrar as infos da música (Nome e o/os Artistas)
function mostrarInfoMusica() {
    textAlign(CENTER);

    fill(255);
    textSize(18);
    text(

        // Tira o .mp3 do final da música e substitue por ""
        playlist[musicaAtual].replace(".mp3", ""),
        width / 2,
        capaY + capaSize + 35
    );


    // Os artistas!!
    fill(180);
    textSize(13);
    text(
        artistas[musicaAtual],
        width / 2,
        capaY + capaSize + 55
    );
}


// A barrinha que aparece em baixo dos nomes para mostrar aonde a música anda
function desenharBarraTempo() {

    // Se, por algum acaso do destino ou internet, a música não carregou, a barrinha não aparece
    if (!som.isLoaded()) return;

    // O tempo atual da musica e a duração ("tamanho" da barrinha +/-). Até onde a música já foi. Meio que a velocidade do "progresso" em relação ao tamanho da barra, a duração da musica e até onde já "tocou"
    let progresso = som.currentTime() / som.duration();

    // Tamanho e posição da barra
    let barraW = 260;
    let x = 70;
    let y = capaY + capaSize + 75;

    // A parte q já tocou fica com a cor igual a da Textura Auditiva
    noStroke();
    fill(corBase, 80, 40);
    rect(x, y, barraW * progresso, 4, 2);

    // A parte q n tocou fica cinza mesmo. Toda xoxa e capenga
    fill(0, 0, 30);
    rect(x + barraW * progresso, y, barraW * (1 - progresso), 4, 2);
}


// Os botões!!! OBS: Não gostei de como as imagens ficaram e estavam me estressando. Peguei os síbolos na internet mesmo e dei Ctrl C + Ctrl V e funcionou (felizmente)
function botoes() {
    let y = 520;

    // Botões maiores (ia ficar muito apertado e com muito espaço vazio, ent deixei os "principais" maiores e os "adendos" menores
    textSize(40);
    fill(255);

    // Musica anterior
    text("⏮", 100, y);
    // pause e play
    text(tocando ? "⏸" : "▶", 200, y);
    // prxoima musica
    text("⏭", 300, y);


    // Botões pequenos
    textSize(20);

    // loop se estiver ativo fica com a cor igual a da capa e se estiver desativado fica branco
    fill(loopAtivo ? color(corBase, 80, 40) : 150);
    text("⟲", 120, y + 40);

    // Random se estiver ativo fica com a cor igual a da capa e se estiver desativado fica branco
    fill(randomAtivo ? color(corBase, 80, 40) : 150);
    text("⇆", 280, y + 40);
}

// Imiciar o audio a partir da interação do usuário
function comecaMusica() {
    userStartAudio();

    // se tiver som e amplitude, junta os dois
    if (som && amp) amp.setInput(som);
}


function mousePressed() {

    // Chamo a função pra "liberar" o audio e juntar o amp
    comecaMusica();


    // Todos o mouse estiver próximo dos botões eles funcionam, mesmo se não clicar no meio

    // play/pause 
    if (mouseY > 485 && mouseY < 535 && mouseX > 170 && mouseX < 230) musicaPlay();

    // musica anterior
    if (mouseY > 485 && mouseY < 535 && mouseX > 70 && mouseX < 130) trocarMusica(-1);

    // musica anteriosi
    if (mouseY > 485 && mouseY < 535 && mouseX > 270 && mouseX < 330) trocarMusica(1);

    // loop e random ;)
    if (mouseY > 535 && mouseY < 565 && mouseX < 200) loopAtivo = !loopAtivo;
    if (mouseY > 535 && mouseY < 565 && mouseX > 200) randomAtivo = !randomAtivo;

}

function keyPressed() {

    // Controle do volume
    if (keyCode === UP_ARROW) { // aumenta o volume
        let vol = som.getVolume(); // volume atual
        vol += 0.1;                // aumenta 10% do volume
        if (vol > 1) vol = 1;      // limite máximo (surdo)
        som.setVolume(vol);
        console.log("Volume:", vol.toFixed(2));
    }

    if (keyCode === DOWN_ARROW) { // diminui o volume
        let vol = som.getVolume();
        vol -= 0.1;                // diminui 10% do volume
        if (vol < 0) vol = 0;      // limite mínimo (mudo)
        som.setVolume(vol);
    }
}


// Controla a musica se está tocando ou se esta pausada
function musicaPlay() {
    if (!tocando) {
        //se n está tocando, ela começa a tocar
        som.play();

        // começa com 0 pra ter o fadde in
        som.setVolume(0);
        fade = 0;
        fading = true;

        // Atualiza para "tocando"
        tocando = true;
    } else {
        // Se já está tocando, ela pausa
        som.pause();
        tocando = false;
    }
}

// Usa o Dir = direção, para mudar as musicas
function trocarMusica(dir) {
    // para a musica q tava
    som.stop();

    // Se o rando está ativo ele (o código) escolhe uma musica aleatoria 
    if (randomAtivo) {
        musicaAtual = floor(random(playlist.length));
    } else {
        // Se n estiver,  vai para a proxima ou a anterior do Aray
        musicaAtual += dir;

        // Se a musica que vier depois, for a ultima da playlist, as musicas reiniciam e voltam 0 (Abracadabra! Abra u la la!!)
        if (musicaAtual >= playlist.length) musicaAtual = 0;

        // Se estamos voltando e vamos mais para trás da primeira musica, ela passa para a ultima (muito boa inclusive)
        if (musicaAtual < 0) musicaAtual = playlist.length - 1;
    }

    // Carrega a nova musica e o codigo do "callback" roda quando ela termina de quarregar
    som = loadSound(`./playlist/${playlist[musicaAtual]}`, () => {
        //muda a seed e a cor pra outra, já que mudou de musica
        randomSeed(seeds[musicaAtual]);
        corBase = cores[musicaAtual];

        // Se já estava tocando musica antes, a nova musica continua tocando, sem precisar dar "play" dnv
        if (tocando) {
            if (loopAtivo) som.loop();
            else som.play();

            // Fade in dnv
            som.setVolume(0);
            fade = 0;
            fading = true;
        }
    });
}

// Acabouuu!!!!
// Deus me livre...474 linhas... 50% é comentário, crtz