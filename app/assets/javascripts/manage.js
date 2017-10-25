var Manage = function () {
  var self = this;

  self.initialize = function () {
    bindHandlers();
  };

  // private

  var bindHandlers = function () {
    $(document).on("click", ".change-address", changeAddress);
    $(document).on("input", ".address", addressChanged);
    $(document).on("click", ".cancel-address", cancelAddress);
    $(document).on("keyup", ".address", addressKeypress);
    $(document).on("click", ".save-address", saveAddress);
    $(document).on("click", ".undo-address", undoAddress);

    $(document).on("click", ".unsubscribe", unsubscribe);
    $(document).on("click", ".undo-unsubscribe", undoUnsubscribe);

    $(document).on("click", ".frequency", changeFrequency);
    $(document).on("click", ".channel", changeChannel);
    $(document).on("change", ".dropdown", dropdownChanged);
    $(document).on("focusout", ".dropdown", dropdownChanged);
  };

  var changeAddress = function (element) {
    self.originalEmail = $(".address").val();
    $(".address").prop("disabled", false);
    $(".address").select();
    $(".cancel-address").show();
  };

  var saveAddress = function (element) {
    $(".error").text("");

    if ($(".address").val().indexOf("@") === -1) {
      $(".error").text("Please enter a valid email address.");
      $(".address").select();
      return;
    }

    $(".address").prop("disabled", true);
    $(".save-address").replaceWith(addressSavedElement);
    $(".cancel-address").hide();
  };

  var addressChanged = function (element) {
    if ($(".change-address").length !== 0) {
      self.changeAddress = $(".change-address").replaceWith(saveAddressElement);
    }
  };

  var addressKeypress = function (event) {
    if (event.keyCode === 13) {
      saveAddress();
      event.preventDefault();
      return false;
    }
  };

  var cancelAddress = function (event) {
    $(".address").val("");
    $(".address").val(self.originalEmail);
    $(".address").prop("disabled", true);

    $(".save-address").replaceWith(self.changeAddress);
    $(".error").text("");
    $(".cancel-address").hide();
  };

  var undoAddress = function (element) {
    $(".address").val(self.originalEmail);
    $(".address-saved").replaceWith(self.changeAddress);
  };

  var unsubscribe = function (element) {
    var button = element.target;
    self.unsubButton = $(button).replaceWith(unsubscribedElement);
  };

  var undoUnsubscribe = function (element) {
    var span = $(element.target).closest(".unsubscribed");
    span.replaceWith(self.unsubButton);
  };

  var changePreference = function (event) {
    chooseFrom(["separately", "together"], event, "preference");
  };

  var changeFrequency = function (event) {
    chooseFrom(["immediately", "daily", "weekly"], event, "frequency");
  };

  var changeChannel = function (event) {
    chooseFrom(["email", "text message"], event, "channel");
  };

  var dropdownChanged = function (event) {
    var dropdown = $(event.target);
    var container = dropdown.closest(".dropdown-container");

    var type = dropdown.data("type");
    var selected = dropdown.find(":selected").val();

    var html = "<a class='" + type + "' href='javascript:void(0);'>" + selected + "</a>";
    container.replaceWith(html);
  };

  var unsubscribedElement = function () {
    var undo = "<span class='undo-unsubscribe'> (<a href='javascript:void(0);'>undo</a>)</span>";
    var html = "<span class='unsubscribed'>Unsubscribed successfully." + undo + "</span>";

    return html;
  };

  var saveAddressElement = function () {
    return "<button class='button save-address'>Save changes</button>";
  };

  var addressSavedElement = function () {
    var undo = "<span class='undo-address'> (<a href='javascript:void(0);'>undo</a>)</span>";
    var text = "We've sent a <strong>verification email</strong> to your new address.";
    var html = "<p class='address-saved'>" + text + undo + "</p>";

    return html;
  };

  var chooseFrom = function (options, event, type) {
    var link = $(event.target);

    var dropdown = buildDropdown(options, link.text(), type);
    link.replaceWith(dropdown);

    $(".dropdown").focus();
  };

  var buildDropdown = function (options, selected, type) {
    var html = "<div class='dropdown-container'>";
    html += "<select size='" + options.length + "'";
    html += "class='form-control dropdown' data-type='" + type + "'>";

    for (var i = 0; i < options.length; i += 1) {
      var option = options[i];
      html += "<option value='" + option + "'";

      if (option == selected) {
        html += "selected='selected'";
      }

      html += ">" + option + "</option>";
    }

    html += "</select>";
    html += "</div>";

    return html;
  };
};

if ($(".manage").length !== 0) {
  new Manage().initialize();
}
