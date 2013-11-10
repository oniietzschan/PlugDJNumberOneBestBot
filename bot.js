API.setVolume(0);

API.on(API.DJ_ADVANCE, function() {
    setTimeout(function() {
        var self = this;
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

        var randomIndex = Math.floor(Math.random()*messages.length)
        API.sendChat(messages[randomIndex]);

        $("#woot").click();

    }, 3500);
});