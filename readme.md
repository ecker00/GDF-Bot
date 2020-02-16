# Game Dev Friends Bot

A Discord bot built for the Game Dev Friends community [https://gamedevfriends.com/](). To give out milestone badges for the #100DaysOfGameDev challenge and automate roles in the Discord community.

Note: this bot is only designed to run on one discord server at the time.

### **Invite bot**
To invite the bot to a server use:
https://discordapp.com/oauth2/authorize?client_id=BOT_CLIENT_ID&scope=bot&permissions=8

### **Run in production**
```sh
npm i
npm run build

cd ./docker
docker-compose up -d
```

### **Run in development**
```sh
npm i
npm run dev
```

### Todo
- Make daily.ts find out if you've reached a daily milestone and send a PM with the badge attached.
