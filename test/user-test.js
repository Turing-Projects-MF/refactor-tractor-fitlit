import { expect } from 'chai';

import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('User', function() {
  let user;
  let user2;

  beforeEach(() => {
    user = new User({
      id: 1,
      name: "Alex Roth",
      address: "1234 Turing Street, Denver CO 80301-1697",
      email: "alex.roth1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [2]
    });
    
    user2 = new User({
      id: 2,
      name: "Allie McCarthy",
      address: "1235 Turing Street, Denver CO 80301-1697",
      email: "allie.mcc1@hotmail.com",
      strideLength: 3.3,
      dailyStepGoal: 9000,
      friends: [1]
    });
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function() {
    expect(user).to.be.an.instanceof(User);
  });

  it('should take a user data object', function() {
    expect(user.id).to.equal(1);
    expect(user.name).to.equal("Alex Roth");
  });

  it('should take a different user data object', function() {
    expect(user2.id).to.equal(2);
    expect(user2.name).to.equal("Allie McCarthy");
  });

  it('should return user first name', function() {
    expect(user2.getFirstName()).to.equal("Allie");
  });

  it('should return list of friend names from user repository', function() {
    const users = [user, user2];
    const userRepo = new UserRepo(users);
    expect(user2.getFriendsNames(userRepo)).to.deep.equal(['Alex Roth']);
  });
});
