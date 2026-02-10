// Tamanho do canvas
let canvasW = 400;
let canvasH = 600;

// Área da capa (onde vai ficar a textura auditiva futuramente)
let capaX = 50;
let capaY = 50;
let capaSize = 300;

// Configurações das bolinhas
let diametro = 26;
let linhaElls = 0;

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


    // Faz com que a música não comece direto (amém por isso...)
    tocando: false,


    // O Loop e o Random começam desativados também
    loopAtivo: false,
    randomAtivo: false,


    // Mapeamento do audio (amo essa palavra "mapeamento") começa "vazio", esperando o sensor de volume do som
    amp: null,


    // Fade in (e volume)
    // Para o volume ir subindo de vagar do 0 ao 1
    fade: 0,
    fading: false,
    volumeDesejado: 1.0,


    // Identidade visual por música
    seeds: [], // "Forma" aleatória, mas com uma "identidade", ou seja, sempre que tocar a musica X, vai ter a seeds Y, mas nenhuma musica tem a mesma seeds
    cores: [],
    corBase: 0,

    preload() {
        // Futuramente: carregar a música aqui
        // this.som = loadSound(...)
    },

    setup() {
        // Futuramente:
        // - iniciar áudio
        // - configurar amplitude
        // - gerar seeds e cores
    },

    musicaPlay() {
        // Aqui vai entrar o controle de play/pause
        // Ainda não funcional
    },

    trocarMusica(dir) {
        // Controle de troca de músicas
        // Falta implementar lógica
    },

    nomeMusica() {
        // Retorna o nome da música atual
        return tracks[this.musicaAtual].file.replace(".mp3", "");
    },

    nomeArtista() {
        return tracks[this.musicaAtual].artist;
    }
};


const desenho = {

    desenharTextura() {
        // Futuramente:
        // - usar amplitude do som
        // - desenhar ellipses reativas
        // Por enquanto só estrutura
    },

    mostrarInfoMusica() {
        fill(255);
        textAlign(CENTER);
        textSize(16);

        text(
            player.nomeMusica(),
            width / 2,
            capaY + capaSize + 40
        );

        textSize(12);
        fill(180);
        text(
            player.nomeArtista(),
            width / 2,
            capaY + capaSize + 60
        );
    },

    desenharBarraTempo() {
        // Barra de progresso da música
        // Ainda não implementada
    },

    botoes() {
        // Desenho dos botões (play, pause, etc)
        // Ainda sem interação
        fill(255);
        textSize(32);

        text("⏮", 100, 520);
        text("▶", 200, 520);
        text("⏭", 300, 520);
    }
};

// ===== FUNÇÕES DO P5 =====

function preload() {
    player.preload();
}

function setup() {
    createCanvas(canvasW, canvasH);
    colorMode(HSB, 360, 100, 100);

    player.setup();
}

function draw() {
    background(8);

    // Área da capa
    noStroke();
    fill(0, 0, 20);
    rect(capaX, capaY, capaSize, capaSize);

    // Textura (ainda vazia)
    desenho.desenharTextura();

    // Infos da música
    desenho.mostrarInfoMusica();

    // Botões
    desenho.botoes();
}

function mousePressed() {
    // Futuramente: detectar clique nos botões
}