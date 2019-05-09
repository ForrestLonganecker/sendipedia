module.exports = class ApplicationPolicy {
  constructor(user, record){
    this.user = user;
    this.record = record;
  }

  _isOwner(){
    return this.record && (this.record.userId == this.user.id);
  }

  _isAdmin(){
    return this.user && this.user.role == 'admin';
  }

  _isPremium(){
    return this.user && this.user.role == 'premium';
  }

  _isPremiumOwner(){
    return this._isPremium() && this._isOwner();
  }

  _isCollaborator(){
    console.log('{POLICIES 1 } THIS.RECORD: ', this.record.collaborators);
    return this.user && this.record.collaborators && this.record.collaborators.find((collaborator) => {
      console.log('{POLICIES 2} COLLABID == USERID: ', collaborator.userId == this.user.id);
      return collaborator.userId == this.user.id
    });
  }

  _isPublic(){
    return this.record.private == false;
  }

  new(){
    return this.user != null;
  }

  create(){
    return this.new();
  }

  show(){
    return true;
  }

  edit(){
    return this.new() && this.record;
  }

  update(){
    return this.edit() && this.record;
  }

  destroy(){
    return this.new() && this.record && (this._isOwner() || this._isAdmin());
  }
}