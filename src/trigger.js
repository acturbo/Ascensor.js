function scrollStart(from, to) {
  var floor = {
    from: from,
    to: to
  };
  node.trigger("scrollStart", floor);
}

function scrollEnd(from, to) {
  var floor = {
    from: from,
    to: to
  };
  node.trigger("scrollEnd", floor);
}

node.on("scrollToDirection", function(event, direction) {
  handleDirection(direction);
});

node.on("scrollToStage", function(event, floor) {
  if (typeof floor == 'string') {
    var floorId = $.inArray(floor, self.options.ascensorFloorName);
    if (floorId !== -1) scrollToStage(floorId, self.options.time);
  } else if (typeof floor == 'number') {
    if (floor > floorCounter) return;
    scrollToStage(floor, self.options.time);
  }
});

node.on("next", function(event, floor) {
  self.next();
});

node.on("prev", function(event, floor) {
  self.prev();
});

node.on("refresh", function() {
  if (node.children().length > nodeChildren.length || node.children().length < nodeChildren.length) {
    nodeChildren = node.children(self.options.childType);

    nodeChildren.css({
      "position": "absolute",
      "overflow": "auto",
      "top": "0",
      "left": "0",
      "width": "100%",
      "height": "100%"
    });

    floorCounter = -1;
    nodeChildren.each(function(index) {
      floorCounter += 1;
    });

    childrenLenght = node.children().length;
    node.trigger("refresh");
    resize();
    generateFloorMap();
  }
});