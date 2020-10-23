/* eslint-disable no-unreachable */
'use strict';

module.exports = (option, app) => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
      // 404 处理
      if (ctx.status === 404 && !ctx.body) {
        ctx.body = {
          msg: 'fail',
          data: '404 错误',
        };
      }
    } catch (err) {
      // 记录一条错误日志
      app.emit('error', err, ctx);

      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      let error =
        status === 500 && app.config.env === 'prod'
          ? 'Internal Server Error'
          : err.message;

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = {
        msg: 'fail',
        data: error,
      };

      // 参数验证异常
      if (status === 422 && err.message === 'Validation Failed') {
        if (err.errors && Array.isArray(err.errors)) {
          error = err.errors[0].err[0]
            ? err.errors[0].err[0]
            : err.errors[0].err[1];
        }
        ctx.body = {
          msg: 'fail',
          data: error,
        };
      }

      ctx.status = status;
    }
    return async (ctx, next) => {
      // 1. 获取 header 头token
      const { token } = ctx.header;
      if (!token) {
        ctx.throw(400, '没有权限访问该接口!');
      }
      // 2. 根据token解密，换取用户信息
      let user = {};
      try {
        user = app.jwt.verify(token, app.config.jwt.secret);
      } catch (err) {
        const fail =
          err.name === 'TokenExpiredError'
            ? 'token 已过期! 请重新获取令牌'
            : 'Token 令牌不合法!';
        ctx.throw(400, fail);
      }
      // 3. 判断当前用户是否登录
      const t = await ctx.service.cache.get('user_' + user.id);
      if (!t || t !== token) {
        ctx.throw(400, 'Token 令牌不合法!');
      }
      // 4. 获取当前用户，验证当前用户是否存在
      user = await app.model.User.findOne({
        where: {
          id: user.id,
        },
      });
      if (!user) {
        ctx.throw(400, '当前用户不存在！');
      }
      // 5. 把 user 信息挂载到全局ctx上
      ctx.authUser = user;
      await next();
    };
  };
};
