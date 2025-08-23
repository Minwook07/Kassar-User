class MessageHandler {
  static show(toastInstance, type, key, toastMessageRef, toastIconRef) {
    // import messages inside
    const { messages } = require("@/utils/messages");

    // get nested message
    const msg = key.split(".").reduce((o, i) => o[i], messages) || messages.generic_error;

    const icon =
      type === "success" ? "bi-check2-circle text-success" : "bi-x-circle text-danger";

    // assign to refs passed from component
    toastMessageRef.value = msg;
    toastIconRef.value = `bi ${icon}`;
    toastInstance.show();
  }
}

export default MessageHandler;

