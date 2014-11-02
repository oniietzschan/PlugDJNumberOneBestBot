API.setVolume(0);
$("#woot").click();

var bot = {
    messages: [
        "here we go rock out",
        "here we go guys",
        "here is a good video",
        "here is a great song",
        "here we go everyone",
        "hell yeahh",
    ],
    messagesUncommon: [
        "GREAT SONG",
        "you guys always ROCK﻿",
        "AWESOME SONG",
        "motley crue﻿",
        "HERE WE GO SOME DR FEEL GOOD!!!!!.....LETS ROCK !",
        "HERE WE GO SOME {{artist_upper}}!!!!!.....LETS ROCK !",
        "HERE WE GO !!!..GOTTA LOVE PARTYS",
        "Now Playing: {{artist}} - {{title}} ({{dubstep}} remix)",
        "Now Playing: {{artist}} - {{title}} ({{genre}} remix)",
    ],
    messagesRare: [
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
    ],
    roomnames: [
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
    ],
    countries: [
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
    ],
    dubstep: [
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
    ],
    genres: [
        "Chillwave",
        "Classic Rock",
        "Donk",
        "Dubstep",
        "EBM",
        "Electroclash",
        "IDM",
        "Indie",
        "House",
        "New Orleans Bounce",
        "Nu Rave",
        "Noise",
        "Rave",
        "Techno",
        "Trance",
        "Witch House",
    ],

    woot: function () {
        $("#woot").click();
    },

    pointBreakdownCommand: function (chatObj) {
        var self = this,
            user = API.getUser(chatObj.fromID),
            totalPoints = user.curatorPoints + user.djPoints + user.listenerPoints;

        if (chatObj.message === "!points") {
            self.sendChat(
                "Your points breakdown is: " +
                    "Curates: "   + user.curatorPoints  + " (" + (user.curatorPoints  / totalPoints * 100).toFixed(1) + "%) " +
                    "DJing: "     + user.djPoints       + " (" + (user.djPoints       / totalPoints * 100).toFixed(1) + "%) " +
                    "Listening: " + user.listenerPoints + " (" + (user.listenerPoints / totalPoints * 100).toFixed(1) + "%)",
                user
            );
        }
    },

    sendSongStartMessage: function () {
        var self = this,
            user = API.getDJ(),
            song = API.getMedia();

        if (Math.random() < 3/20) { //        15% chance to use uncommon messages (increase when we have more messages)
            messages = self.messagesUncommon;
        } else if (Math.random() < 2/17) { // 10% chance to use rare messages
            messages = self.messagesRare;
        } else { //                           75% common messages
            messages = self.messages;
        }

        self.sendChat(self.getRandomArrayValue(messages));
    },

    removeFromWaitlistIfVoteWasMeh: function (vote) {
        var self = this,
            message = "Meh-ing is frowned upon here. If you think a song is gay, please do as the gay community would do, and be positive. Thanks.";


        if (vote.vote === -1) { // if vote is 'meh'
            self.sendChat(message, vote.user);
            // if (API.getWaitListPosition(vote.user.id) !== -1) { // if user is in waitlist
            //     self.sendChat("You have been removed from the DJ Wait List. " + message + " (was: " + (API.getWaitListPosition(vote.user.id)+1) + "/" + API.getWaitList().length + ")", vote.user);
            //     API.moderateRemoveDJ(vote.user.id);
            // } else {
            //     self.sendChat(message, vote.user);
            // }
        }
    },

    sendUserJoinMessage: function (user) {
        var self = this;

        self.sendChat("Welcome to " + self.getRoomName(), user);
    },

    getRoomName: function () {
        var self = this;

        if (Math.random() < 1/10) // 10% chance to use funny joke room name
            return self.getRandomArrayValue(self.roomnames);
        else
            return "Hitler & The AIDS, Live!!";
    },

    sendChat: function (messages, user) {
        var self = this;

        if (!self.isArray(messages)) {
            messages = [ messages ];
        }

        messages.forEach(function(message) {
            if (typeof user === "object") {
                message = "@" + user.username + " " + message;
            }

            API.sendChat(
                self.sparseTeenMustache(message)
            );
        });
    },

    isArray: function (someVar) {
        return (Object.prototype.toString.call( someVar ) === '[object Array]');
    },

    sparseTeenMustache: function (text) {
        var self = this,
            song = API.getMedia();

        return text
            .replace(/{{artist}}/g,           song.author)
            .replace(/{{artist_lower}}/g,     song.author.toLowerCase())
            .replace(/{{artist_no_spaces}}/g, song.author.toLowerCase().replace(/ /g, ""))
            .replace(/{{artist_upper}}/g,     song.author.toUpperCase())
            .replace(/{{country}}/g,       self.getRandomArrayValue(self.countries))
            .replace(/{{country_lower}}/g, self.getRandomArrayValue(self.countries).toLowerCase())
            .replace(/{{country_upper}}/g, self.getRandomArrayValue(self.countries).toUpperCase())
            .replace(/{{dubstep}}/g,       self.getRandomArrayValue(self.dubstep))
            .replace(/{{dubstep_lower}}/g, self.getRandomArrayValue(self.dubstep).toLowerCase())
            .replace(/{{dubstep_upper}}/g, self.getRandomArrayValue(self.dubstep).toUpperCase())
            .replace(/{{genre}}/g,       self.getRandomArrayValue(self.genres))
            .replace(/{{genre_lower}}/g, self.getRandomArrayValue(self.genres).toLowerCase())
            .replace(/{{genre_upper}}/g, self.getRandomArrayValue(self.genres).toUpperCase())
            .replace(/{{title}}/g,           song.title)
            .replace(/{{title_lower}}/g,     song.title.toLowerCase())
            .replace(/{{title_no_spaces}}/g, song.title.toLowerCase().replace(/ /g, ""))
            .replace(/{{title_upper}}/g,     song.title.toUpperCase())
        ;
    },

    getRandomArrayValue: function (array) {
        var randomIndex = Math.floor(Math.random()*array.length);
        return array[randomIndex];
    }
};

API.on(API.ADVANCE,     bot.woot, bot);
API.on(API.ADVANCE,     bot.sendSongStartMessage, bot);
API.on(API.CHAT,        bot.pointBreakdownCommand, bot);
API.on(API.USER_JOIN,   bot.sendUserJoinMessage, bot);
// API.on(API.VOTE_UPDATE, bot.removeFromWaitlistIfVoteWasMeh, bot);

// API.on(API.ADVANCE, function(){$("#woot").click();});
