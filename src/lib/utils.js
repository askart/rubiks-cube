export function deepClone(item) {
  if (Array.isArray(item)) {
    return item.map(i => deepClone(i));
  } else if (Object.prototype.toString.call(item) === "[object Date]") {
    return new Date(item);
  } else if (Object.prototype.toString.call(item) === "[object RegExp]") {
    return new RegExp(item);
  } else if (Object.prototype.toString.call(item) === "[object Function]") {
    return function newFunc() {
      return item.apply(this, arguments);
    };
  } else if (Object.prototype.toString.call(item) === "[object Object]") {
    const obj = {};
    Object.keys(item).forEach(key => {
      obj[key] = deepClone(item[key]);
    });
    return obj;
  }
  return item;
}
