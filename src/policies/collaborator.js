const ApplicationPolicy = require('./application');

module.exports = class CollaboratorPolicy extends ApplicationPolicy {
  create() {
    return this._isPremiumOwner() || this._isAdmin();
  }

  destroy() {
    return this._isPremiumOwner() || this._isAdmin();
  }
}