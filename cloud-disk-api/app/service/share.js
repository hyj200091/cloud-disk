'user strict'

const Service = require('egg').Service

class shareService extends Service {
  async isExist(sharedurl, options = {}) {
    let s =  await this.app.model.Share.findOne({
      where: {
        sharedurl,
        iscancel: 0,
      },
      ...options,
    })

    if(!s) {
      return this.ctx.throw(404, '该分享已经失效')
    }

    return s
  }
}

module.exports = ShareService