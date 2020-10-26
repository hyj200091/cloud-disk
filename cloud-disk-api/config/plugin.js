/* eslint-disable eggache/no-unexpected-plugin-keys */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // 跨域插件配置
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // 用于联表查询
  sequelize: {
    enabled: true,
    package: 'egg-sequelize',
  },
  // 参数校验
  valparams: {
    enable: true,
    package: 'egg-valparams',
  },
  // redis缓存服务
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  // jwt 认证鉴权
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  // 阿里云oss 用于文件上传
  oss: {
    enable: true,
    package: 'egg-oss',
  },
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
};
