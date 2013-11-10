API.setVolume(0);

API.on(API.DJ_ADVANCE,  autoWoot);
API.on(API.DJ_ADVANCE,  sendSongStartMessage);
API.on(API.VOTE_UPDATE, removeFromWaitlistIfVoteWasMeh);
API.on(API.USER_JOIN,   sendUserJoinMessage);

function autoWoot()
{
    $("#woot").click();
}

function sendSongStartMessage()
{
    var messages = new Array(
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

    API.sendChat(getRandomArrayValue(messages));
}

function removeFromWaitlistIfVoteWasMeh(vote)
{
    var message = "Meh-ing is frowned upon here. If you think a song is gay, please do as the gay community would do, and be positive. Thanks.";

    if (vote.vote === -1) { // if vote is 'meh'
        if (API.getWaitListPosition(vote.user.id) !== -1) { // if user is in waitlist
            API.sendChat("@" + vote.user.username + " You have been removed from the DJ Wait List. " + message + " (was: " + (API.getWaitListPosition(vote.user.id)+1) + "/" + API.getWaitList().length + ")");
            API.moderateRemoveDJ(vote.user.id);
        } else {
            API.sendChat("@" + vote.user.username + " " + message);
        }
    }
}

function sendUserJoinMessage(user)
{
    API.sendChat("@" + user.username + " welcome to " + getRoomName());
}

function getRoomName()
{
    var roomnames = new Array(
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
        return getRandomArrayValue(roomnames);
    else
        return "Hitler & The AIDS, Live!!";
}

function getRandomArrayValue(array)
{
    var randomIndex = Math.floor(Math.random()*array.length);
    return array[randomIndex];
}