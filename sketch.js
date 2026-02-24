

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
    "fire.mp3",
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
    "...",
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
    // Se a musica não tiver artista "artistas[i]" (raro pq revisei isso algumas milhares de vezes, mas pode acontecer) ele subistitui por uma string vazia "", evitando que o "undefined" apareça na tela... o "[i]" representa a posição do artista na fila
    artist: artistas[i] || ""
}));
// Const para ser algo constante (básico ne...Const ser Constante) que não se altera....Class cria um modelo para ser recriado de forma mais fácil, e eu não quero vários players, só o meu mesmo. Por isso escolhi a "const" para ter uma lista pronta... Também como só existe um player no sistema, não há necessidade de instanciar múltiplos objetos. Um objeto literal resolve o problema de forma mais simples e evita complexidade desnecessária.
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


    // Fade in para o volume ir subindo gradualmente do 0 ao 1
    // Fading começa falso já que n tem nenhuma musica tocando ainda
    fade: 0,
    fading: false,
    volumeDesejado: 1.0,


    // Identidade visual por música
    seeds: [], // "Forma" aleatória, mas com uma "identidade", ou seja, sempre que tocar a musica X, vai ter a seeds Y, mas nenhuma musica tem a mesma seeds
    cores: [],
    corBase: 0,

    // trava clique durante as trocas de musicas
    trocando: false,


    // "senha" pra invalidar loads antigos
    trocaId: 0,


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

        // Cria identidade visual única por música
        for (let i = 0; i < tracks.length; i++) {
            this.seeds.push(floor(random(100000)));
            this.cores.push(random(0, 360));
        }


        // Aleatoriza a seed e a cor da musica que está tocando
        randomSeed(this.seeds[this.musicaAtual]);
        this.corBase = this.cores[this.musicaAtual];
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

            // Começa com 0 pra ter o fade in
            this.som.setVolume(0);

            // A musica já começou a tocar, mas para ficar melhor, o fade começa em 0 e vai subindo até 1
            this.fade = 0;
            this.fading = true;

            // Atualiza para "tocando"
            this.tocando = true;
        } else {
            // Se já está tocando, ela pausa
            this.som.pause();

            // "tocando" passa a ser falso já que a musica está pausada
            this.tocando = false;
        }
    },


    // Fade in (volume sobe até volumeDesejado) responsável pelo fade de volume
    updateFade() {

        // Se o fadeing for falso, a função para e não exacuta mais nada
        if (!this.fading) return;

        // O volume do fade sóbe 0.05 a cada frame
        this.fade += 0.05;

        // Verifica se o fade já chegou no volume desejado
        if (this.fade >= this.volumeDesejado) {
            // Trava o volume no valor final (1.0) e evita passar do limete por conta da soma (+= 0.05)
            this.fade = this.volumeDesejado;
            // A partir daqui, o fade para de subir e o updateFate não faz mais nada, apenas deixa o som estável
            this.fading = false;
        }
        // Aplica o valor cauculado em fade no som que escutamos
        this.som.setVolume(this.fade);
    },


    // Controle do volume (setas)

    // Utilizei o "delta" para ajustar quanto o volume vai aumentar ou diminuir naquele momento
    mudaVolume(delta) {
        // Aqui, soma o volume desejado (0.5) + o delta (+/- 0.1)
        this.volumeDesejado += delta;
        if (this.volumeDesejado > 1) this.volumeDesejado = 1;
        if (this.volumeDesejado < 0) this.volumeDesejado = 0;


        // Se o som, tocando estiverem ativos e o fading "false" for verdadeiro 
        if (this.som && this.tocando && !this.fading) {
            // Vira o volume real, não só desejado
            this.som.setVolume(this.volumeDesejado);
        }
    },


    // Trocar música
    // Dir para saber a direção, se vai ser -1 ou +1 (anterior e proxima)
    trocarMusica(dir) {

        // evita travar se clicar igual doido
        if (this.trocando) return;
        this.trocando = true;


        // invalida loads antigos e da um ID quando muda de musica (trocarID = 3, mudei de musica, então trocarID = 4) evitando que toque outra musica caso clique várias vezes, ignorando a musica anterior, já que não é o mesmo ID
        this.trocaId++;
        const minhaTroca = this.trocaId;

        // Para a música que estava tocando
        if (this.som) this.som.stop();

        // Atualiza a música atual, parando a anterior e começando a próxima
        this.musicaAtual += dir;// Se o random está ativo ele escolhe uma musica aleatoria
        if (this.randomAtivo) {
            // Usa Math.random() para evitar conflito com randomSeed()
            let novo = this.musicaAtual;


            // evita repetir a mesma música (se der)
            if (tracks.length > 1) {
                while (novo === this.musicaAtual) {
                    novo = Math.floor(Math.random() * tracks.length);
                }
            } else {
                novo = 0;
            }


            this.musicaAtual = novo;
        } else {
            // Se n estiver, vai para a proxima ou a anterior do Array
            this.musicaAtual += dir;


            // Se passar do fim, volta pro começo
            if (this.musicaAtual >= tracks.length) this.musicaAtual = 0;


            // Se passar do começo, vai pro fim
            if (this.musicaAtual < 0) this.musicaAtual = tracks.length - 1;
        }


        // Carrega a nova musica e o callback roda quando ela termina de carregar
        this.som = loadSound(`./playlist/${tracks[this.musicaAtual].file}`, () => {

            // Essas linhas criam um identificador único para cada troca de música, garantindo que apenas a última música solicitada seja carregada e reproduzida, evitando conflitos de carregamento assíncrono.
            if (minhaTroca !== this.trocaId) return;


            // muda a seed e a cor pra outra, já que mudou de musica
            randomSeed(this.seeds[this.musicaAtual]);
            this.corBase = this.cores[this.musicaAtual];


            // Mostra qual som tem que ser analisado
            if (this.amp) this.amp.setInput(this.som);


            // Se já estava tocando musica antes, a nova musica continua tocando
            if (this.tocando) {
                if (this.loopAtivo) this.som.loop();
                else this.som.play();


                // Fade in dnv
                this.som.setVolume(0);
                this.fade = 0;
                this.fading = true;
            }


            this.trocando = false;
        });


        // fallback: se der ruim no load, destrava depois de um tempo
        setTimeout(() => {
            if (minhaTroca === this.trocaId) this.trocando = false;
        }, 1500);
    },


    nomeMusica() {
        return tracks[this.musicaAtual].file.replace(".mp3", "");
    },


    nomeArtista() {
        return tracks[this.musicaAtual].artist;
    },


    // Progresso da música (0 a 1)
    progresso() {
        if (!this.som || !this.som.isLoaded()) return 0;
        return this.som.currentTime() / this.som.duration();
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


        // A textura não muda durante a música
        randomSeed(player.seeds[player.musicaAtual]);


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

    // Function para mostrar as infos da música (Nome e o/os Artistas)
    mostrarInfoMusica() {
        textAlign(CENTER);

        fill(255);
        textSize(18);
        text(player.nomeMusica(), width / 2, capaY + capaSize + 35);

        fill(60);
        textSize(13);
        text(player.nomeArtista(), width / 2, capaY + capaSize + 55);
    },


    // A barrinha que aparece em baixo dos nomes para mostrar aonde a música anda
    desenharBarraTempo() {
        // Se, por algum acaso do destino ou internet, a música não carregou, a barrinha não aparece
        if (!player.som || !player.som.isLoaded()) return;


        // Progresso (0..1)
        let progresso = player.progresso();


        // Tamanho e posição da barra
        let barraW = 260;
        let x = 70;
        let y = capaY + capaSize + 75;


        // A parte q já tocou fica com a cor igual a da Textura Auditiva
        noStroke();
        fill(player.corBase, 80, 40);
        rect(x, y, barraW * progresso, 4, 2);


        // A parte q n tocou fica cinza mesmo
        fill(0, 0, 30);
        rect(x + barraW * progresso, y, barraW * (1 - progresso), 4, 2);
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


        // Botões pequenos
        textSize(20);


        // loop se estiver ativo fica com a cor igual a da capa e se estiver desativado fica branco. O ? substitui o "if e else if"
        fill(player.loopAtivo ? color(player.corBase, 80, 40) : 150);
        text("⟲", 120, y + 40);


        // Random se estiver ativo fica com a cor igual a da capa e se estiver desativado fica branco
        fill(player.randomAtivo ? color(player.corBase, 80, 40) : 150);
        text("⇆", 280, y + 40);
    },


    // Clique nos botões
    cliqueBotoes() {
        // play/pause
        if (mouseY > 485 && mouseY < 535 && mouseX > 170 && mouseX < 230) player.musicaPlay();


        // musica anterior
        if (mouseY > 485 && mouseY < 535 && mouseX > 70 && mouseX < 130) player.trocarMusica(-1);


        // proxima musica
        if (mouseY > 485 && mouseY < 535 && mouseX > 270 && mouseX < 330) player.trocarMusica(1);


        // loop e random ;)
        if (mouseY > 535 && mouseY < 565 && mouseX < 200) player.loopAtivo = !player.loopAtivo;
        if (mouseY > 535 && mouseY < 565 && mouseX > 200) player.randomAtivo = !player.randomAtivo;
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

    // Mouse influencia textura na cor e no diametro das ellipses
    let mouseCor = map(mouseX, 0, width, -20, 20);
    let mouseDiam = map(mouseY, 0, height, -6, 6);


    diametro = 26 + mouseDiam;
    player.corBase = player.cores[player.musicaAtual] + mouseCor;


    // Parte que fica atrás das Ellipses, um cinza mais claro
    noStroke();
    fill(0, 0, 18);
    rect(capaX, capaY, capaSize, capaSize);

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
    desenho.desenharBarraTempo();
    desenho.botoes();

    // Fade in
    player.updateFade();
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


// Acabouuu!!!!
// Deus me livre... 696 linhas, 50% é comentário e espaçamento das linhas, crtz