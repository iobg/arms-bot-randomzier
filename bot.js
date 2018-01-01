var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var arms = require('./arms.json')
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';
// Initialize Discord Bot

var bot = new Discord.Client();

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
});
bot.on('message', function (message) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    var text= message.content;
    if (text.substring(0, 1) == '!') {
        var args = text.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                message.channel.send('pong');
            break;
            case 'armstest':
            var randomArms ="";
            for (var i=0; i<3; i++){
                if(i!=0)randomArms += ", ";
                randomArms += arms.list[Math.round(Math.random() * arms.list.length-1)];
            }
                console.log(randomArms);
                message.channel.send(randomArms);
                break;
            case 'character':
            message.channel.send(arms.characters[Math.round(Math.random() * arms.characters.length-1)]);
            break;
         }
     }
});
bot.login(auth.token);

