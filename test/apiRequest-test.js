const chai = require('chai')
const spies = require('chai-spies');

chai.use(spies);

const expect = chai.expect;


describe('apiRequest', function() {

  before(function() {
    global.apiRequest = {};
    chai.spy.on(apiRequest, ['getUserData', 'getSleepData', 'getActivityData', 'getHydrationData'], () => {})
  });

    it('should be able to fetch user data', function() {
      apiRequest.getUserData();

      expect(apiRequest.getUserData).to.have.been.called(1);
      expect(apiRequest.getUserData).to.have.been.called.with();
    });

    it('should be able to fetch sleep data', function() {
      apiRequest.getSleepData();

      expect(apiRequest.getSleepData).to.have.been.called(1);
      expect(apiRequest.getSleepData).to.have.been.called.with();
    });

    it('should be able to fetch hydration data', function() {
      apiRequest.getHydrationData();

      expect(apiRequest.getHydrationData).to.have.been.called(1);
      expect(apiRequest.getHydrationData).to.have.been.called.with();
    });

    it('should be able to fetch activity data', function() {
      apiRequest.getActivityData();

      expect(apiRequest.getActivityData).to.have.been.called(1);
      expect(apiRequest.getActivityData).to.have.been.called.with();
    });
  })

  describe('apiRequest', function() {

    before(function() {
      global.apiRequest = {};
      chai.spy.on(apiRequest, ['getUserData', 'getSleepData', 'getActivityData', 'getHydrationData'], () => {})
    });

      it('should be able to fetch user data', function() {
        apiRequest.getUserData();

        expect(apiRequest.getUserData).to.have.been.called(1);
        expect(apiRequest.getUserData).to.have.been.called.with();
      });

      it('should be able to fetch sleep data', function() {
        apiRequest.getSleepData();

        expect(apiRequest.getSleepData).to.have.been.called(1);
        expect(apiRequest.getSleepData).to.have.been.called.with();
      });

      it('should be able to fetch hydration data', function() {
        apiRequest.getHydrationData();

        expect(apiRequest.getHydrationData).to.have.been.called(1);
        expect(apiRequest.getHydrationData).to.have.been.called.with();
      });

      it('should be able to fetch activity data', function() {
        apiRequest.getActivityData();

        expect(apiRequest.getActivityData).to.have.been.called(1);
        expect(apiRequest.getActivityData).to.have.been.called.with();
      });
    })
