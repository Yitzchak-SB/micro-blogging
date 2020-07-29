class Tweet {
  constructor(body, user) {
    this.date = Date.now().toISOString();
    this.content = body;
    this.user = user;
  }
}

export default Tweet;
