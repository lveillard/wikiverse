const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // Fake async
  },
  signOut(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100); // Fake async
  }
};

export default fakeAuth;
