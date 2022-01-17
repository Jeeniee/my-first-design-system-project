export const openNewTab = (url: string) => {
  window.open(url, "_blank");
};

export const goTab = (url: string) => {
  window.open(url, "_self");
};

// ios에서 execCommand('copy')가 제대로 작동하지 않아서 우회하는 방법을 찾아서 씀
// https://stackoverflow.com/questions/39960212/copy-button-for-ios-safari
const copyAtInput = (inputElement: HTMLInputElement) => {
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    const el = inputElement;
    const editable = el.contentEditable;
    const readOnly = el.readOnly;
    el.contentEditable = "true";
    el.readOnly = false;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    if (sel === null) {
      return;
    }
    sel.removeAllRanges();
    sel.addRange(range);
    el.setSelectionRange(0, 999999);
    el.contentEditable = editable;
    el.readOnly = readOnly;
    document.execCommand("copy");
    el.blur();
  } else {
    const copyTextarea = inputElement;
    copyTextarea.select();
    document.execCommand("copy");
  }
};

const fallbackCopyTextToClipboard = (text: string) => {
  const input = document.createElement("input");
  input.value = text;
  document.body.appendChild(input);
  input.focus();
  input.select();
  copyAtInput(input);

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(input);
};

export const copy = async (text: string) => {
  const clipboard: any = (window.navigator as any).clipboard;
  if (!clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }

  try {
    await clipboard.writeText(text);
    console.log("Async: Copying to clipboard was successful!");
  } catch (error) {
    console.error("Async: Could not copy text: ", error);
  }
};

export const lastTextMasking = (text: string, size: number, mask = "*") => {
  return text.substring(0, text.length - size) + new Array(size + 1).join(mask);
};

export const convertQueryStr = (query: any) => {
  let queryStr = "";
  let queryList = [];

  for (let key in query) {
    if (query[key] !== undefined) {
      queryList.push(`${key}=${query[key]}`);
    }
  }
  if (queryList.length > 0) {
    queryStr = "?" + queryList.join("&");
  }

  return queryStr;
};

export const getAuthorization = (jwt: string) => {
  return "Bearer " + jwt;
};
