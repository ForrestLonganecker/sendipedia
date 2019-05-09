const ApplicationPolicy = require('./application');

module.exports = class WikiPolicy extends ApplicationPolicy {

  show(){
    return this._isPremiumOwner() || this._isAdmin() || this._isCollaborator();
  }

  edit(){
    return this.show();
  }

  update(){
    return this.edit();
  }
}