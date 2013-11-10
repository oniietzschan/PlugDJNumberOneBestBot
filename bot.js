API.setVolume(0);

var bot =
{
    pointBreakdownCommand: function(chatObj)
    {
        var self = this,
            user = API.getUser(chatObj.fromID);

        if (chatObj.message == "!points") {
            var totalPoints = user.curatorPoints + user.djPoints + user.listenerPoints;

            self.sendChat(
                "Your points breakdown is: " +
                "Curates: "   + user.curatorPoints  + " (" + (user.curatorPoints /totalPoints*100).toFixed(1) + "%) " +
                "DJing: "     + user.djPoints       + " (" + (user.djPoints      /totalPoints*100).toFixed(1) + "%) " +
                "Listening: " + user.listenerPoints + " (" + (user.listenerPoints/totalPoints*100).toFixed(1) + "%)",
                user
            );
        }
    },

    sendSongStartMessage: function()
    {
        var self = this,
            messages = new Array(
                "here we go rock out",
                "here we go guys",
                "here is a good video",
                "here is a great song",
                "here we go everyone",
                "hell yeahh"
            ),
            messagesRare = new Array(
                "saddle up, pardner, you are about to hear a good song",
                "to be perfectly honest, i'm not into this next one all that much"
            );

        // 10% chance to use rare messages
        if (Math.random() < 0.10)
            messages = messagesRare;

        self.sendChat(self.getRandomArrayValue(messages));
    },

    removeFromWaitlistIfVoteWasMeh: function(vote)
    {
        var self = this,
            message = "Meh-ing is frowned upon here. If you think a song is gay, please do as the gay community would do, and be positive. Thanks.";

        if (vote.vote === -1) { // if vote is 'meh'
            if (API.getWaitListPosition(vote.user.id) !== -1) { // if user is in waitlist
                self.sendChat("You have been removed from the DJ Wait List. " + message + " (was: " + (API.getWaitListPosition(vote.user.id)+1) + "/" + API.getWaitList().length + ")", vote.user);
                API.moderateRemoveDJ(vote.user.id);
            } else {
                sendChat(message, vote.user);
            }
        }
    },

    sendUserJoinMessage: function(user)
    {
        var self = this;

        self.sendChat("Welcome to " + self.getRoomName(), user);
    },

    getRoomName: function()
    {
        var self = this,
            roomnames = new Array(
            "★Anime Games Music★",
            "★Brazil Eletro Music ★",
            "██►Dubstep For Your Nipples◄██",
            "Drum & Bass (NoDrumstep)",
            "ϟ Electro,Dυbรтєρ & Techno ϟ",
            "FiM: Your daily ponies",
            "Monstercat + Tasty = #Tastycat",
            "/r/music",
            "Rock Wins",
            "高登音樂台"
        );

        // 5% chance to use funny joke room name
        if (Math.random() < 0.1)
            return self.getRandomArrayValue(roomnames);
        else
            return "Hitler & The AIDS, Live!!";
    },

    getRandomArrayValue: function(array)
    {
        var randomIndex = Math.floor(Math.random()*array.length);
        return array[randomIndex];
    },

    sendChat: function(message, user)
    {
        if (typeof user === "object")
            message = "@" + user.username + " " + message;

        API.sendChat(message);
    }
};

API.on(API.CHAT,        bot.pointBreakdownCommand, bot);
API.on(API.DJ_ADVANCE,  function(){$("#woot").click();});
API.on(API.DJ_ADVANCE,  bot.sendSongStartMessage, bot);
API.on(API.VOTE_UPDATE, bot.removeFromWaitlistIfVoteWasMeh, bot);
API.on(API.USER_JOIN,   bot.sendUserJoinMessage, bot);
