API.setVolume(0);

var bot = {
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

    sendSongStartMessage: function ()
    {
        var self = this,
            user = API.getDJ(),
            song = API.getMedia(),
            messages = [
                    "here we go rock out",
                    "here we go guys",
                    "here is a good video",
                    "here is a great song",
                    "here we go everyone",
                    "hell yeahh",
                ],
            messagesUncommon = [
                    "GREAT SONG",
                    "you guys always ROCK﻿",
                    "I LOVE YOUR MUSIC ,,,,,,,,,I WAS IN MY 20S .....WHEN I STAYED UP ALNIGHT ---))﻿",
                    "AWESOME SONG",
                    "motley crue﻿",
                    "HERE WE GO SOME DR FEEL GOOD!!!!!.....LETS ROCK !",
                    "HERE WE GO !!!..GOTTA LOVE PARTYS",
                ],
            messagesRare = [
                    "saddle up, pardner, you are about to hear a good song",
                    "to be perfectly honest, i'm not into this next one all that much",
                    "fucking piece of my dick.....",
                    "listen, i know the start of this track is gay, but bear with me, just wait for the drop, it's worth it",
                    "in a way, {{artist_lower}}s songs are all sad, because they all have an ending",
                    "thanks for 1mil views! {{artist_lower}} ftw",
                    "omgomgom i cna't beliee ppl are liking this song",
                    "{{artist_lower}} are alright..... but not as good as type o negative",
                    "{{artist_lower}} were such a great band, r.i.p. kurt kobain >:",
                    "Now Playing: {{artist}} - {{title}} ({{dubstep}} remix)",
                    "a steampunk fantasy based on the new {{artist_lower}} album",
                    "look here you dumb slut. don't you ever say {{artist_lower}} is for fags and losers. {{artist_lower}} is legendary. they created and change what we call music.",
                    "{{artist_lower}} is for fags, the beatles arn't for fags!!! got it!!!",
                    "I feel like too many people these days only take {{artist}} for face value, only know their radio hits, and just haven't dug into this band nearly as much as I have.",
                    "Come To {{country}}!!!!!!",
                    [ "I'm on the phone wit the CEO of iTunes he's telling me {{artist_lower}} #{{title_no_spaces}} only been on iTunes for 1hour and u selling like crazy my staff is telling me the server is about to shut down", "I gave the ok to add the most powerful servers to handle this #{{title_no_spaces}} congrats looks like more plaks for U {{artist_lower}} #sufferingfromsuccess" ],
                ],
            messagesNDAD = [
                    "wow hydropolis who's this exciting new band I don't think you've ever played them before??",
                    "i've never heard anything like this, why haven't you played this band here before",
                ];


        if (Math.random() < 1/10) { //       10% chance to use uncommon messages (increase when we have more messages)
            messages = messagesUncommon;
        } else if (Math.random() < 1/9) { // 10% chance to use rare messages
            messages = messagesRare;
        }

        //own Hydropolis
        var artistCheck = new RegExp("/nero's day at disneyland|neros day at disneyland|bousfield|ndad");
        if (artistCheck.test( song.author.toLowerCase() ) && user.id == "50aeb38cd6e4a94f7747b604") {
            self.sendChat(self.getRandomArrayValue(messagesNDAD), user);
            return;
        }

        self.sendChat(self.getRandomArrayValue(messages));
    },

    removeFromWaitlistIfVoteWasMeh: function (vote)
    {
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

    sendUserJoinMessage: function (user)
    {
        var self = this;

        self.sendChat("Welcome to " + self.getRoomName(), user);
    },

    getRoomName: function ()
    {
        var self = this,
            roomnames = [
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
                    "THE HATALLUMINATI",
                    "[T]rance [H]ouse [C]hill",
                    "Video Game Music [+--oo]",
                    "高登音樂台",
                    "{{artist}} 24/7",
                    "{{artist}}VEVO",
                    "★{{country}} EDM Community★",
                    "{{dubstep}} 24/7",
                ];

        if (Math.random() < 1/10) // 10% chance to use funny joke room name
            return self.getRandomArrayValue(roomnames);
        else
            return "Hitler & The AIDS, Live!!";
    },

    sendChat: function (messages, user)
    {
        var self = this;

        if (!self.isArray(messages)) {
            messages = [ messages ];
        }

        messages.forEach(function(message) {
            if (typeof user === "object") {
                message = "@" + user.username + " " + message;
            }

            message = self.sparseTeenMustache(message);

            API.sendChat(message);
        });
    },

    isArray: function (someVar)
    {
        return (Object.prototype.toString.call( someVar ) === '[object Array]');
    },

    sparseTeenMustache: function (text) //templating the hard way
    {
        var self = this,
            song = API.getMedia(),
            countries = [
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
            dubstep = [
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
                ];

        return text
            .replace(/{{artist}}/g,           song.author)
            .replace(/{{artist_lower}}/g,     song.author.toLowerCase())
            .replace(/{{artist_no_spaces}}/g, song.author.toLowerCase().replace(/ /g, ""))
            .replace(/{{country}}/g, self.getRandomArrayValue(countries))
            .replace(/{{dubstep}}/g, self.getRandomArrayValue(dubstep))
            .replace(/{{dubstep_lower}}/g, self.getRandomArrayValue(dubstep).toLowerCase())
            .replace(/{{title}}/g,           song.title)
            .replace(/{{title_lower}}/g,     song.title.toLowerCase())
            .replace(/{{title_no_spaces}}/g, song.title.toLowerCase().replace(/ /g, ""))
        ;
    },

    getRandomArrayValue: function (array)
    {
        var randomIndex = Math.floor(Math.random()*array.length);
        return array[randomIndex];
    }
};

API.on(API.CHAT,        bot.pointBreakdownCommand, bot);
API.on(API.DJ_ADVANCE,  function(){$("#woot").click();});
API.on(API.DJ_ADVANCE,  bot.sendSongStartMessage, bot);
//API.on(API.VOTE_UPDATE, bot.removeFromWaitlistIfVoteWasMeh, bot);
API.on(API.USER_JOIN,   bot.sendUserJoinMessage, bot);
