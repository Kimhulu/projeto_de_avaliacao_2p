let linhaElls = 10;
let diametro = 30;

let playlist = [
  "abracadabra.mp3",
  "bang.mp3",
  "beijar.mp3",
  "best.mp3",
  "boom.mp3",
  "bottle.mp3",
  "brick.mp3",
  "brunão.mp3",
  "bruninho.mp3",
  "butterfly.mp3",
  "california.mp3",
  "crying.mp3",
  "dancing.mp3",
  "dream.mp3",
  "easy.mp3",
  "everlong.mp3",
  "fire.mp3",
  "floor.mp3",
  "forget.mp3",
  "girlfriend.mp3",
  "golden.mp3",
  "god.mp3",
  "hurricane.mp3",
  "hell.mp3",
  "infinita.mp3",
  "judas,mp3",
  "kissed.mp3",
  "lazy.mp3",
  "levels.mp3",
  "love.mp3",
  "matters.mp3",
  "mine.mp3",
  "miss.mp3",
  "moonwalking.mp3",
  "mujeriego.mp3",
  "ophelia.mp3",
  "payphone.mp3",
  "persuasion.mp3",
  "rebel.mp3",
  "rock.mp3",
  "rockn.mp3",
  "satisfaction.mp3",
  "sina.mp3",
  "soda.mp3",
  "starships.mp3",
  "sweaterweather.mp3",
  "taste.mp3",
  "takitaki.mp3",
  "thing.mp3",
  "thunderstruck.mp3",
  "timber.mp3",
  "uai.mp3",
  "upside.mp3",
  "vagalumes.mp3",
  "way.mp3",
  "wonderwall.mp3"
];

let artistas = [
    
]

let musicaAtual = 0;
let som;
let play = false;

let amp;

let fade = 0;
let fading = false;

// Carrega a primeira musica (musica 0) no caso, abracadabra
function preload() {
  som = loadSound(`./playlist/${playlist[musicaAtual]}`);
}