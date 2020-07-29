import axios from "axios";

const URL = "https://fullstack-web-course.ew.r.appspot.com/tweet";

export function getTweets() {
  return axios.get(URL);
}

export function postTweet(tweet) {
  return axios.post(URL, tweet);
}
