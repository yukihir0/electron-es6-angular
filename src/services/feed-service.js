"use strict";

import superagent from "superagent";
import FeedParser from "feedparser";

export default class FeedService {
  constructor() {

  }

  parse(url) {
    return new Promise((resolve, reject) => {
      let items = [];
      
      superagent
        .get(url)
        .pipe(new FeedParser([]))
        .on("error", function(error) {
          reject(error);
        })
        .on("meta", function(meta) {
          //console.log(meta);
        })
        .on("readable", function() {
          let stream = this;
          let item;
          while(item = stream.read()) {
            items.push(item);
          }
          stream.end = () => {
            resolve(items);
          };
        });
      }); 
  }

  static activate() {
    FeedService.instance = new FeedService();
    return FeedService.instance;
  }
}

FeedService.activate.$inject = [];
