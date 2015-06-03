"use strict";

import clipboard from "clipboard";

export default class ItemListPanelController {
  constructor($scope, feedService) {
    this.$scope = $scope;
    this.feedService = feedService;
    this.url = "https://feeds.feedburner.com/hatena/b/hotentry";
    this.items = [];
  }

  handleKeyDown($event) {
    //console.log($event.keyCode);
    let urlbox = document.getElementsByName("urlbox")[0];
    let start = urlbox.selectionStart;
    let end = urlbox.selectionEnd;
    let selectedText = urlbox.value.substring(start, end);
    
    // Ctrl + a
    if ($event.ctrlKey === true && $event.keyCode === 65) {
      urlbox.select();
      $event.preventDefault();
    }

    // Ctrl + c
    if ($event.ctrlKey === true && $event.keyCode === 67) {
      clipboard.writeText(selectedText);
      $event.preventDefault();
    }

    // Ctrl + v
    if ($event.ctrlKey === true && $event.keyCode === 86) {
      this.url = urlbox.value.substring(0, start) + clipboard.readText() + urlbox.value.substring(end, urlbox.value.length);
    } 
  }

  handleClearButton($event) {
    this.url = "";
  }

  handleResetButton($event) {
    this.url = "https://feeds.feedburner.com/hatena/b/hotentry";
    this.items = [];
  }

  handleParseButton($event) {
    this.feedService.parse(this.url)
      .then((items) => {
        this.$scope.$apply(() => {
          this.items = items;
        });
      })
      .catch((error) => {
        console.log(error); 
      });
  }
}

ItemListPanelController.$inject = ["$scope", "FeedService"];
