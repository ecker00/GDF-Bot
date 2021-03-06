# **Game Dev Friends Bot**

A Discord bot built for the Game Dev Friends community [https://gamedevfriends.com/](). To give out milestone badges for the #100DaysOfGameDev challenge and automate roles in the Discord community.

**Notes**
- This bot is only designed to run on one discord server at the time.
- AutoRoles can only work with role names that don't have spaces.

# **Server Setup**
Make a copy of `bot-config-example.js` named `bot-config.js` to configure the bot.

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

# **Discord Setup**

### **Invite bot**

Invite the bot to your server (replace BOT_CLIENT_ID):

https://discordapp.com/oauth2/authorize?client_id=BOT_CLIENT_ID&scope=bot&permissions=8

### **Set bot roles**
![Bot role](readme-access.png)

# Todo
- Test if dailyChallenge supports bolding / italic day formatting
