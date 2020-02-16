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
        day: 10, 
        emoji: '',
        image: '',
        message: '123',
      }
    ]
  }
};
