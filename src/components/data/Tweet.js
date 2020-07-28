class Tweet {
  constructor(body, user) {
    this.date = Date.now();
    this.body = body;
    this.user = user;
  }
}

export default Tweet;
