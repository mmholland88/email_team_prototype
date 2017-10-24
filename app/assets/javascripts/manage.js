var Manage = function () {
  var self = this;

  self.initialize = function () {
    bindHandlers();
  };

  // private

  var bindHandlers = function () {
    $(document).on("click", ".change-address", changeAddress);
    $(document).on("click", ".change-content", changeContent);
    $(document).on("click", ".unsubscribe", unsubscribe);
    $(document).on("click", ".undo", undo);
  };

  var changeAddress = function (element) {
    alert("changeAddress");
  };

  var changeContent = function (element) {
    alert("changeContent");
  };

  var unsubscribe = function (element) {
    var button = element.target;
    self.originalElement = $(button).replaceWith(unsubscribedElement);
  };

  var undo = function (element) {
    var span = $(element.target).closest(".unsubscribed");
    span.replaceWith(self.originalElement);
  };

  var unsubscribedElement = function () {
    var undo = "<span class='undo'> (<a href='#'>undo</a>)</span>";
    var html = "<span class='unsubscribed'>Unsubscribed successfully." + undo + "</span>";

    return html;
  };
};

if ($(".manage").length !== 0) {
  new Manage().initialize();
}
