

// ///// CUIDADO! MISTUREI MUITO INGLÊS COM PORTUGUÊS \\\\\
// Não conte para a prof Suzi, obd S2



// Tamanho do canvas
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


// Junta música + artista no mesmo lugar pra não bagunçar... A musica na posição 0 usa o Artista na posição 0...


// O => é uma "arrow function" pra substituir o "function" ou "return".   No caso do meu código "Recebo (file, i) => devolvo (file + i)" para juntar a musica e o artista correspondente
const tracks = playlist.map((file, i) => ({


    // File = música
    file,
    // Se a musica não tiver artista "artistas[i]" (raro mas pode acontecer) ele subistitui por uma string vazia "", evitando que o "undefined" apareça na tela... o "[i]" representa a posição do artista na fila
    artist: artistas[i] || ""
}));
// Const para ser algo constante (básico ne...Const ser Constante) que não se altera....Class cria um modelo para ser recriado de forma mais fácil, e eu não quero vários players, só o meu mesmo. Por isso escolhi a "const" para ter uma lista pronta.
// Coloquei os {} dentro de () para informar ao código que isso é um objeto e não um bloco





const player = {
    // Musica começa pela 0, no caso, Abracadabra!! abra u la la!!
    // Utilizei o "null" para informar ao código que: "existe uma "caixinha" lá, está vazia, mas ela existe"
    musicaAtual: 0,
    som: null,

    tocando: false,


    // Identidade visual por música
    seeds: [], // "Forma" aleatória, mas com uma "identidade", ou seja, sempre que tocar a musica X, vai ter a seeds Y, mas nenhuma musica tem a mesma seeds
    cores: [], // Cores e Seeds ainda não utilizei no meu codigo
    corBase: 160,


    preload() {
        // Já carregar direto as musicas da playlist
        this.som = loadSound(`./playlist/${tracks[this.musicaAtual].file}`);
        // utilizei o `...${}...` pq permite juntar o texto (nome da musica atual) com as váriaveis
    },

    setup() {
        // O audio só começa quando o "User" (pessoa interagindo) "clicar"
        userStartAudio();


        // Mapear a amplitude do som para fazer as Ellipses serem reativas a ele
        this.amp = new p5.Amplitude();


        // Mostra qual som tem que ser "analisado"
        this.amp.setInput(this.som);



    },

    // Iniciar o audio a partir da interação do usuário
    comecaMusica() {
        userStartAudio();

        // Aqui informa para o código que: se a musica existe e se o amp existe, a amp vai "medir" o volume da musica que está no "som" do player
        if (this.som && this.amp) this.amp.setInput(this.som);
    },


    // Controla a musica se está tocando ou se esta pausada
    musicaPlay() {
        if (!this.tocando) {
            // se n está tocando, ela começa a tocar
            if (this.loopAtivo) this.som.loop();
            else this.som.play();

            // Atualiza para "tocando"
            this.tocando = true;
        } else {
            // Se já está tocando, ela pausa
            this.som.pause();

            // "tocando" passa a ser falso já que a musica está pausada
            this.tocando = false;
        }
    },

    // Trocar música
    // Dir para saber a direção, se vai ser -1 ou +1 (anterior e proxima)
    trocarMusica(dir) {

        // Para a música que estava tocando
        if (this.som) this.som.stop();

        // Atualiza a música atual, parando a anterior e começando a próxima
        this.musicaAtual += dir;

        // Se passar do fim, volta pro começo
        if (this.musicaAtual >= tracks.length) this.musicaAtual = 0;

        // Se passar do começo, vai pro fim
        if (this.musicaAtual < 0) this.musicaAtual = tracks.length - 1;

        // Carrega a música nova se o "tocando" estiver ativo
        this.som = loadSound(`./playlist/${tracks[this.musicaAtual].file}`, () => {
            if (this.tocando) {
                if (this.loopAtivo) this.som.loop();
                else this.som.play();
            }
            this.trocando = false; // Só deixa trocar a musica depois de carregar
        });
    },


    nomeMusica() {
        return tracks[this.musicaAtual].file.replace(".mp3", "");
    },

    nomeArtista() {
        return tracks[this.musicaAtual].artist;
    },

    // Pego o volume da música e transformo para um nº de 0 a 100
    levelMapeado() {
        let level = this.amp.getLevel();
        return map(level, 0, 0.3, 0, 100);
    }
};


const desenho = {
    // Minha textura Auditiva turbinada
    desenharTextura() {
        // As linhas sendo o valor da capa dividida pelo diametro para saber quantas cabem
        linhaElls = capaSize / diametro;


        // Volume do som
        let level = player.levelMapeado();


        // Auto explicativo (cx/cy = centro do quadrado)
        let cx = capaX + capaSize / 2;
        let cy = capaY + capaSize / 2;


        // Distância máxima até onde as bolinhas podem ir
        let maxDist = dist(capaX, capaY, cx, cy);





        // Loop para as bolinhas
        for (let i = 0; i < linhaElls; i++) {
            for (let j = 0; j < capaSize; j += diametro) {


                // Posicionamento das ellipses
                let x = capaX + i * diametro;
                let y = capaY + j;


                // Distância até o centro
                let d = dist(x, y, cx, cy);


                // Influência do centro (centro reage mais)
                let inf = map(d, 0, maxDist, 1, 0);


                // O tamanho das bolinhas variam com o volume da música
                let size = diametro + level * inf * 0.4;


                // Brilho do centro para bordas + música
                let brilho = map(inf, 0, 1, 30, 85);
                brilho = constrain(brilho + level * 0.4, 0, 100);


                // HSB!!!
                fill(player.corBase, 100, brilho);

                noStroke();

                // Bolinha 🤏❤️
                ellipse(x, y, size);
            }
        }

    },

    mostrarInfoMusica() {
        textAlign(CENTER);

        fill(255);
        textSize(18);
        text(player.nomeMusica(), width / 2, capaY + capaSize + 35);

        fill(180);
        textSize(13);
        text(player.nomeArtista(), width / 2, capaY + capaSize + 55);
    },


    // Os botões!!! OBS: Não gostei de como as imagens ficaram e estavam me estressando.
    botoes() {
        let y = 520;


        // Botões maiores
        textSize(40);
        fill(255);


        // Musica anterior
        text("⏮", 100, y);
        // pause e play
        text(player.tocando ? "⏸" : "▶", 200, y);
        // proxima musica
        text("⏭", 300, y);


    },

    // Clique nos botões
    cliqueBotoes() {
        // play/pause
        if (mouseY > 485 && mouseY < 535 && mouseX > 170 && mouseX < 230) player.musicaPlay();


        // musica anterior
        if (mouseY > 485 && mouseY < 535 && mouseX > 70 && mouseX < 130) player.trocarMusica(-1);


        // proxima musica
        if (mouseY > 485 && mouseY < 535 && mouseX > 270 && mouseX < 330) player.trocarMusica(1);

    }
};


function preload() {
    player.preload();
}


function setup() {
    createCanvas(canvasW, canvasH);


    // Modo de cor HSB (HUE/Matriz, Saturation/Saturação, Bright/Brilho)
    colorMode(HSB, 360, 100, 100);


    player.setup();
}



function draw() {
    background(0, 0, 18);

    // Textura dentro da capa
    push();

    //tipo um canva dentro do canva
    drawingContext.save(); // Tipo um push, mas para o clip
    drawingContext.beginPath(); // Fala pro código "ignorar" o que estava antes, começando a densenhar a partir dele 
    drawingContext.rect(capaX, capaY, capaSize, capaSize); // Textura
    drawingContext.clip(); // Define que, tudo que for desenhado depois, só fica visivel dentro do retangulo

    desenho.desenharTextura();

    drawingContext.restore();
    pop(); // A partir daqui, tudo o que estava fora antes, não fica limitado só no triangulo para que as próximas coisas não aparecessem no retangulo também

    // Info e botões
    desenho.mostrarInfoMusica();
    desenho.botoes();
}


function mousePressed() {
    // Chamo a função pra "liberar" o audio e juntar o amp
    player.comecaMusica();


    // Clique nos botões
    desenho.cliqueBotoes();
}



function keyPressed() {
    // Controle do volume
    if (keyCode === UP_ARROW) { // aumenta o volume
        player.mudaVolume(+0.1);
        console.log("Volume:", player.volumeDesejado.toFixed(2));
    }


    if (keyCode === DOWN_ARROW) { // diminui o volume
        player.mudaVolume(-0.1);
        console.log("Volume:", player.volumeDesejado.toFixed(2));
    }
}