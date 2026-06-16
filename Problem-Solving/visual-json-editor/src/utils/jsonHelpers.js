// Deep clone any value
export const deepClone = (val) => JSON.parse(JSON.stringify(val));

// Get value at path: ['users', '0', 'name']
export const getByPath = (obj, path) => {
  return path.reduce((acc, key) => acc?.[key], obj);
};

// Set value at path (immutably)
export const setByPath = (obj, path, value) => {
  const clone = deepClone(obj);
  let cur = clone;
  for (let i = 0; i < path.length - 1; i++) {
    cur = cur[path[i]];
  }
  cur[path[path.length - 1]] = value;
  return clone;
};

// Delete key at path
export const deleteByPath = (obj, path) => {
  const clone = deepClone(obj);
  let cur = clone;
  for (let i = 0; i < path.length - 1; i++) {
    cur = cur[path[i]];
  }
  const lastKey = path[path.length - 1];
  if (Array.isArray(cur)) {
    cur.splice(Number(lastKey), 1);
  } else {
    delete cur[lastKey];
  }
  return clone;
};

// Add a field at path
export const addByPath = (obj, path, key, value) => {
  const clone = deepClone(obj);
  const target = path.length === 0 ? clone : getByPath(clone, path);
  if (Array.isArray(target)) {
    target.push(value);
  } else {
    target[key] = value;
  }
  return clone;
};

// Detect value type for UI
export const getType = (val) => {
  if (val === null) return "null";
  if (Array.isArray(val)) return "array";
  return typeof val;
};

// Parse typed input
export const parseValue = (raw, type) => {
  if (type === "number") return isNaN(Number(raw)) ? 0 : Number(raw);
  if (type === "boolean") return raw === "true";
  if (type === "null") return null;
  if (type === "object") return {};
  if (type === "array") return [];
  return raw;
};