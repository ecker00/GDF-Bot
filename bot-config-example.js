module.exports = {

  // Bot login token
  token: '123',

  // Auto roles config
  autoRoles: {
    listenChannel: 'myRoleRequestl',
    availableRoles: ['Role1', 'Role2', 'Role3'] // Roles users can give themselves
  },

  // Daily challenge config
  dailyChallenge: {
    listenChannel: 'myChallengeLog',
    responseChannel: 'myChallengeChat',
    milestones: [
      {
        day: 7, 
        image: '/images/Day 7 badge.png',
        personalMessage: 'Congratulations on reaching day 7, good going!',
        publicMessage: '%s just reached day 7! Let\'s cheer them on! 💪'
      }
    ]
  }
};
