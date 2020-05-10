const woot = () => {
  $(".btn-like")[0].click()
}

const sendSongStartMessage = () => sendChat(getSongStartMessage())

const getSongStartMessage = () => {
  let messages
  if (Math.random() < 70/100) { //       70% Common
    messages = MESSAGES_COMMON
  } else if (Math.random() < 15/30) { // 15% Uncommon
    messages = MESSAGES_UNCOMMON
  } else { //                            15% Rare
    messages = MESSAGES_RARE
  }
  return sample(messages)
}

const sendUserJoinMessage = (user) => sendChat("Welcome to " + getRoomName(), user)

const getRoomName = () => (Math.random() < 1/10)
  ? sample(ROOM_NAMES)
  : "Hitler & The AIDS, Live!!"

const sendChat = (messages, user) => {
  messages = isArray(messages) ? messages : [messages]
  messages.forEach((message, i) => {
    if (typeof user === "object") {
      message = "@" + user.username + " " + message
    }

    const text = processMessage(message)
    const sendDelay = i * 1050
    setTimeout(() => API.sendChat(text), sendDelay)
  })
}

const processMessage = (text) => {
  const song = API.getMedia()

  return text
    .replace(/{{artist}}/g,           song.author)
    .replace(/{{artist_lower}}/g,     song.author.toLowerCase())
    .replace(/{{artist_no_spaces}}/g, song.author.toLowerCase().replace(/ /g, ""))
    .replace(/{{artist_upper}}/g,     song.author.toUpperCase())
    .replace(/{{country}}/g,       sample(COUNTRIES))
    .replace(/{{country_lower}}/g, sample(COUNTRIES).toLowerCase())
    .replace(/{{country_upper}}/g, sample(COUNTRIES).toUpperCase())
    .replace(/{{dubstep}}/g,       sample(DUBSTEP))
    .replace(/{{dubstep_lower}}/g, sample(DUBSTEP).toLowerCase())
    .replace(/{{dubstep_upper}}/g, sample(DUBSTEP).toUpperCase())
    .replace(/{{genre}}/g,       sample(GENRES))
    .replace(/{{genre_lower}}/g, sample(GENRES).toLowerCase())
    .replace(/{{genre_upper}}/g, sample(GENRES).toUpperCase())
    .replace(/{{title}}/g,           song.title)
    .replace(/{{title_lower}}/g,     song.title.toLowerCase())
    .replace(/{{title_no_spaces}}/g, song.title.toLowerCase().replace(/ /g, ""))
    .replace(/{{title_upper}}/g,     song.title.toUpperCase())
}

const sample = (array) => array[ Math.floor(Math.random() * array.length) ]
const isArray = (someVar) => (Object.prototype.toString.call( someVar ) === '[object Array]')

const MESSAGES_COMMON = [
  "here we go rock out",
  "here we go guys",
  "here is a good video",
  "here is a great song",
  "here we go everyone",
  "hell yeahh",
]
const MESSAGES_UNCOMMON = [
  "GREAT SONG",
  "you guys always ROCK﻿",
  "AWESOME SONG",
  "motley crue﻿",
  "HERE WE GO SOME DR FEEL GOOD!!!!!.....LETS ROCK !",
  "HERE WE GO SOME {{artist_upper}}!!!!!.....LETS ROCK !",
  "HERE WE GO !!!..GOTTA LOVE PARTYS",
  "Now Playing: {{artist}} - {{title}} ({{dubstep}} remix)",
  "Now Playing: {{artist}} - {{title}} ({{genre}} remix)",
]
const MESSAGES_RARE = [
  "saddle up, pardner, you are about to hear a good song",
  "to be perfectly honest, i'm not into this next one all that much",
  "fucking piece of my dick.....",
  "listen, i know the start of this track is gay, but bear with me, just wait for the drop, it's worth it",
  "in a way, {{artist_lower}}s songs are all sad, because they all have an ending",
  "thanks for 1mil views! {{artist_lower}} ftw",
  "omgomgom i cna't beliee ppl are liking this song",
  "{{artist_lower}} are alright..... but not as good as type o negative",
  "{{artist_lower}} were such a great band, r.i.p. kurt kobain >:",
  "a steampunk fantasy based on the new {{artist_lower}} album",
  "look here you dumb slut. don't you ever say {{artist_lower}} is for fags and losers. {{artist_lower}} is legendary. they created and change what we call music.",
  "{{artist_lower}} is for fags, the beatles arn't for fags!!! got it!!!",
  "I feel like too many people these days only take {{artist}} for face value, only know their radio hits, and just haven't dug into this band nearly as much as I have.",
  "Come To {{country}}!!!!!!",
  "I LOVE YOUR MUSIC ,,,,,,,,,I WAS IN MY 20S .....WHEN I STAYED UP ALNIGHT ---))﻿",
  [ "I'm on the phone wit the CEO of iTunes he's telling me {{artist_lower}} #{{title_no_spaces}} only been on iTunes for 1hour and u selling like crazy my staff is telling me the server is about to shut down", "I gave the ok to add the most powerful servers to handle this #{{title_no_spaces}} congrats looks like more plaks for U {{artist_lower}} #sufferingfromsuccess" ],
  "in 1991 year my town is completly destroyed in war butt in my basemant alweys play {{artist_lower}}",
  "turn up you're speakers for this next one :troll:",
  "{{artist_upper}} GREATEST HITS!!! BEST SONGS OF {{artist_upper}} !!",
  ["1987,I was left in a deep,deep coma with massive brain damage.After three months in my coma,doctors said they were going to turn my life support off !!!", "After {{artist}}s music was played beside my Hospital Bed,my vital signs improved and I was left turned on..", "After thirty years of hell going through a massive recovery I am so happy to listen to {{artist}}s music with a new outlook on life.Thanking you dear {{artist}} ,your music helpped to save my life."],
]
const ROOM_NAMES = [
  "★Anime Games Music★",
  "███►Anime Music Music {{country}}◄███",
  "★Brazil Eletro Music ★",
  "♪ K-Pop Fans {{country}} ♪",
  "██►Dubstep For Your Nipples◄██",
  "Deathcore / Metalcore / Hardcore",
  "Drum & Bass (NoDrumstep)",
  "Electro {{country}}",
  "ϟ Electro, Dυbรтєρ & Techno ϟ",
  "FiM: Your daily ponies",
  "HilterとAIDS",
  "I ♥ the 90's and 00's",
  "Just a chill room...",
  "Monstercat + Tasty = #Tastycat",
  "♫Music Nation™♫ #AnyGenre!",
  "♥ ☆ Nightcore ☆ ♥",
  "/r/music",
  "Rock, Animes & Dubstep",
  "Rock Wins",
  "♪ϟ☆ Self-Help Audiobooks Den ☆ϟ♪",
  "The Bone Garden",
  "THE HATALLUMINATI",
  "♫ Ｔｈｅ Ｗｅａｔｈｅｒ Ｃｈａｎｎｅｌ ウェザーチャンネル",
  "[T]rance [H]ouse [C]hill",
  "Video Game Music [+--oo]",
  "高登音樂台",
  "{{artist}} 24/7",
  "{{artist}} VEVO",
  "★{{country}} {{genre}} Community★",
  "{{dubstep}} 24/7",
  "{{genre}} 24/7",
  "ϟ {{genre}} {{country}} ϟ",
]
const COUNTRIES = [
  "Argentina",
  "Bosnia",
  "Brasil",
  "Brazil",
  "Bulgaria",
  "Cambodia",
  "Chile",
  "Colombia",
  "Croatia",
  "Indonesia",
  "Kosovo",
  "Latvia",
  "Malaysia",
  "North Korea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Romania",
  "Serbia",
  "Slovakia",
  "Turkey",
  "Venezuela",
  "Vietnam",
]
const DUBSTEP = [
  "Borgore",
  "Datsik",
  "Deadmau5",
  "Excision",
  "Flux Pavilion",
  "Knife Party",
  "Nero",
  "Owl City",
  "Skream",
  "Skrillex",
  "ϟƘƦƖןןΣx﻿",
  "Zomboy",
]
const GENRES = [
  "Chillwave",
  "Classic Rock",
  "Donk",
  "Dubstep",
  "EBM",
  "Electroclash",
  "IDM",
  "Indie",
  "Future Bass",
  "Future Beats",
  "House",
  "New Orleans Bounce",
  "Nu Rave",
  "Noise",
  "Rave",
  "Techno",
  "Trance",
  "Trap",
  "Witch House",
]

API.on(API.ADVANCE,   woot)
API.on(API.ADVANCE,   sendSongStartMessage)
API.on(API.USER_JOIN, sendUserJoinMessage)

woot()
API.setVolume(0)
