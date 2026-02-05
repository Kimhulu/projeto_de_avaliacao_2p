let canvasW = 400;
let canvasH = 600;

// Área da capa (textura auditiva)
let capaX = 50;
let capaY = 50;
let capaSize = 300;


let diametro = 26;
let linhaElls;


// Playlist
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
    "I Love Rock ’n’ Roll.mp3",
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
    "Penélope Uai - Suffering.mp3",
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

let artistas = [
    "Lady Gaga", "Pink Floyd", "Jessie J ft. Ariana Grande, Nicki Minaj", "Vengaboys",
    "Bruno Mars", "Smile", "Carly Rae Jepsen", "Katy Perry", "Bruce Springsteen",
    "Hazbin Hotel", "Aerosmith", "Hazbin Hotel", "MC Leozinho", "Foo Fighters",
    "Foo Fighters", "Avril Lavigne", "EPIC: The Musical", "Kpop Demon Hunters",
    "AC/DC", "Aerosmith", "Joan Jett", "Katy Perry", "Engenheiros do Hawaii",
    "Lady Gaga", "Avicii", "Hazbin Hotel", "Hazbin Hotel", "LNGSHOT", "Ryan Castro",
    "Metallica", "Jennifer Lopez & Pitbull", "One Direction", "LMFAO", "Maroon 5",
    "EPIC: The Musical (Brasil)", "David Bowie", "Scorpions", "The Rolling Stones",
    "IA (Luísa Sonza e TH⁷n)", "Kpop Demon Hunters", "Nicki Minaj", "Oasis",
    "Maroon 5", "Guns N' Roses", "The Neighbourhood", "DJ Snake", "Sabrina Carpenter",
    "Taylor Swift", "Bruno Mars", "EPIC: The Musical", "AC/DC", "Pitbull",
    "Black Gryph0n ft. Baasik", "Bruno Mars ft. Mark Ronson", "Ivo Mozart & Pollo",
    "Aerosmith", "Oasis"
];



let musicaAtual = 0;
let som;
let tocando = false;

let loopAtivo = false;
let randomAtivo = false;

// Áudio
let amp;

// Fade in
let fade = 0;
let fading = false;

// Identidade visual por música
let seeds = [];
let cores = [];
let corBase = 0;



function preload() {
    som = loadSound(`./playlist/${playlist[musicaAtual]}`);
}



function setup() {
    createCanvas(canvasW, canvasH);

    colorMode(HSB, 360, 100, 100);

    amp = new p5.Amplitude();

    // Gera identidade visual única por música
    for (let i = 0; i < playlist.length; i++) {
        seeds.push(floor(random(100000)));
        cores.push(random(0, 360));
    }

    randomSeed(seeds[musicaAtual]);
    corBase = cores[musicaAtual];
}



function draw() {
    background(0);

    // Mouse influencia textura
    let offsetCor = map(mouseX, 0, width, -20, 20);
    let offsetDiam = map(mouseY, 0, height, -6, 6);

    diametro = 26 + offsetDiam;
    corBase = cores[musicaAtual] + offsetCor;

    // Fundo da capa
    noStroke();
    fill(0, 0, 18);
    rect(capaX, capaY, capaSize, capaSize, 16);


    push();
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(capaX, capaY, capaSize, capaSize);
    drawingContext.clip();

    desenharTextura();

    drawingContext.restore();
    pop();

    mostrarInfoMusica();
    desenharBarraTempo();
    desenharBotoes();

    // Fade in
    if (fading) {
        fade += 0.05;
        som.setVolume(fade);
        if (fade >= 1) fading = false;
    }
}



function desenharTextura() {
    linhaElls = capaSize / diametro;

    let level = amp.getLevel();
    level = map(level, 0, 0.3, 0, 100);

    let cx = capaX + capaSize / 2;
    let cy = capaY + capaSize / 2;
    let maxDist = dist(capaX, capaY, cx, cy);

    randomSeed(seeds[musicaAtual]);

    for (let i = 0; i < linhaElls; i++) {
        for (let j = 0; j < capaSize; j += diametro) {

            let x = capaX + i * diametro;
            let y = capaY + j;

            let d = dist(x, y, cx, cy);
            let inf = map(d, 0, maxDist, 1, 0);

            let size = diametro + level * inf * 0.4;
            let brilho = map(inf, 0, 1, 30, 85);
            brilho = constrain(brilho + level * 0.4, 0, 100);

            fill(corBase, 100, brilho);
            ellipse(x, y, size);
        }
    }
}




function mostrarInfoMusica() {
    textAlign(CENTER);

    fill(255);
    textSize(18);
    text(
        playlist[musicaAtual].replace(".mp3", ""),
        width / 2,
        capaY + capaSize + 35
    );

    fill(180);
    textSize(13);
    text(
        artistas[musicaAtual],
        width / 2,
        capaY + capaSize + 55
    );
}



function desenharBarraTempo() {
    if (!som.isLoaded()) return;

    let progresso = som.currentTime() / som.duration();

    let barraW = 260;
    let x = 70;
    let y = capaY + capaSize + 75;

    noStroke();
    fill(corBase, 80, 40);
    rect(x, y, barraW * progresso, 4, 2);

    fill(0, 0, 30);
    rect(x + barraW * progresso, y, barraW * (1 - progresso), 4, 2);
}



function desenharBotoes() {
    let y = 520;

    textSize(20);
    fill(255);

    text("⏮", 100, y);
    text(tocando ? "⏸" : "▶", 200, y);
    text("⏭", 300, y);

    textSize(14);
    fill(loopAtivo ? color(140, 100, 80) : 150);
    text("LOOP", 120, y + 30);

    fill(randomAtivo ? color(140, 100, 80) : 150);
    text("RND", 280, y + 30);
}



function mousePressed() {

    comecaMusica();

    if (dist(mouseX, mouseY, 200, 520) < 20) musicaPlay();
    if (dist(mouseX, mouseY, 100, 520) < 20) trocarMusica(-1);
    if (dist(mouseX, mouseY, 300, 520) < 20) trocarMusica(1);

    if (mouseY > 530 && mouseX < 200) loopAtivo = !loopAtivo;
    if (mouseY > 530 && mouseX > 200) randomAtivo = !randomAtivo;
}



function musicaPlay() {
    if (!tocando) {
        som.play();
        som.setVolume(0);
        fade = 0;
        fading = true;
        tocando = true;
    } else {
        som.pause();
        tocando = false;
    }
}

function trocarMusica(dir) {
    som.stop();

    if (randomAtivo) {
        musicaAtual = floor(random(playlist.length));
    } else {
        musicaAtual += dir;
        if (musicaAtual >= playlist.length) musicaAtual = 0;
        if (musicaAtual < 0) musicaAtual = playlist.length - 1;
    }

    som = loadSound(`./playlist/${playlist[musicaAtual]}`, () => {
        randomSeed(seeds[musicaAtual]);
        corBase = cores[musicaAtual];

        if (tocando) {
            if (loopAtivo) som.loop();
            else som.play();

            som.setVolume(0);
            fade = 0;
            fading = true;
        }
    });
}