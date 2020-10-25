/* eslint-disable eggache/no-unexpected-plugin-keys */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  sequelize: {
    enabled: true,
    package: 'egg-sequelize',
  },
  valparams: {
    enable: true,
    package: 'egg-valparams',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  oss: {
    enable: true,
    package: 'egg-oss',
  },
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
};
