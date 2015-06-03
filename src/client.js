"use strict";

import FeedService from "./services/feed-service";
import ItemListPanelDirective from "./directives/item-list-panel/directive";

let app = angular.module("App", []);

app.factory("FeedService", FeedService.activate);
app.directive("itemListPanel", ItemListPanelDirective.activate);
