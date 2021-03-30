export const getFormData = (target) => {
  const res = {};

  const elements = target.elements;
  if (elements.length > 0) {
    for (let item of elements) {
      if (item.name === "photoFile") {
        res[item.name] = "";
      }
      if (item.name !== "") {
        if (item.name !== "displayName") {
          const val = item.value.replace(/\s+/g, "");
          res[item.name] = val;
          continue;
        }
        res[item.name] = item.value;
      }
    }
  }

  return res;
};

export const clearData = (target) => {
  const elements = target.elements;

  for (let item of elements) {
    if (item.name !== "") {
      item.value = "";
    }
  }
};

const formatBytes = (bytes, decimals = 2, isNum) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  if (isNum) {
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  }
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const getFileUrl = (target, alert, callBack) => {
  const file = target.files[0];

  const size = formatBytes(file.size, 2, true);

  if (size >= 71) {
    alert("Size of your image should be less than 70 Kb");
    return;
  }

  const reader = new FileReader();

  reader.onloadend = (e) => {
    const src = e.target.result;

    callBack(src);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};

export const createData = (prop = {}, state = {}) => {
  const res = {
    ...state,
  };

  if (Object.keys(prop).length > 0) {
    for (let item in prop) {
      if (res[item] !== undefined) {
        res[item].value = prop[item] === "" ? "Not Set" : prop[item];
      } else {
        res[item] = {
          name: item,
          value: prop[item] === "" ? "Not Set" : prop[item],
        };
      }
    }
  }

  return res;
};

export const debounce = (fn, delay) => {
  let timer;

  return (props) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(props);
    }, delay);
  };
};
