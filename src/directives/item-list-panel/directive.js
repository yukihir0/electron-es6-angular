"use strict";

import ItemListPanelController from "./controller";

export default class ItemListPanelDirective{
  static activate() {
    return {
      restrict: "E",
      controller: ItemListPanelController,
      controllerAs: "ctrl",
      scope: {},
      templateUrl: "./directives/item-list-panel/directive.html"
    };
  }
}
