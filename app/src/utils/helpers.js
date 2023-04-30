function isObject(variable) {
  return Object.prototype.toString.apply(variable) === "[object Object]";
}
const modifyObject = (
  objectToModify,
  propsToDelete,
  modifiedKeyValuePairs = {}
) => {
  const objectToModifyCopy = JSON.parse(JSON.stringify(objectToModify));
  if (propsToDelete !== undefined) {
    for (const prop of propsToDelete) {
      delete objectToModifyCopy[prop];
    }
  }
  return Object.assign({}, objectToModifyCopy, modifiedKeyValuePairs);
};

export const modifyNestedObject = (
  parentObject,
  objectToModifyId,
  propsToDelete,
  modifiedKeyValuePairs
) => {
  const parentObjectCopy = JSON.parse(JSON.stringify(parentObject));
  if (parentObjectCopy.id === objectToModifyId) {
    return modifyObject(parentObjectCopy, propsToDelete, modifiedKeyValuePairs);
  }
  for (const prop in parentObjectCopy) {
    if (
      isObject(parentObjectCopy[prop]) &&
      parentObjectCopy[prop].id === objectToModifyId
    ) {
      parentObjectCopy[prop] = modifyObject(
        parentObjectCopy[prop],
        propsToDelete,
        modifiedKeyValuePairs
      );
    }
    if (
      isObject(parentObjectCopy[prop]) &&
      parentObjectCopy[prop].id !== objectToModifyId
    ) {
      parentObjectCopy[prop] = modifyNestedObject(
        parentObjectCopy[prop],
        objectToModifyId,
        propsToDelete,
        modifiedKeyValuePairs
      );
    }
    if (Array.isArray(parentObjectCopy[prop])) {
      parentObjectCopy[prop] = parentObjectCopy[prop].map((elmt) =>
        modifyNestedObject(
          elmt,
          objectToModifyId,
          propsToDelete,
          modifiedKeyValuePairs
        )
      );
    }
  }
  return parentObjectCopy;
};

export const findNestedObject = (parentObject, id) => {
  // I copy the object to avoid problems
  // just in case I have to mutate the returned value
  const parentObjectCopy = JSON.parse(JSON.stringify(parentObject));
  let result;

  if (parentObjectCopy.id === id) {
    return parentObjectCopy;
  }

  if (Array.isArray(parentObjectCopy)) {
    for (const obj of parentObjectCopy) {
      if (obj.id === id) {
        result = obj;
      } else {
        result = findNestedObject(obj, id);
        if (result) {
          return result;
        }
      }
    }
  }

  for (const prop in parentObjectCopy) {
    if (isObject(parentObjectCopy[prop]) && parentObjectCopy[prop].id === id) {
      return parentObjectCopy[prop];
    }
    if (isObject(parentObjectCopy[prop]) && parentObjectCopy[prop].id !== id) {
      return findNestedObject(parentObjectCopy[prop], id);
    }
    if (Array.isArray(parentObjectCopy[prop])) {
      for (const object of parentObjectCopy[prop]) {
        result = findNestedObject(object, id);

        if (result) return result;
      }
    }
  }
  return null;
};

export const findParentColumnId = (activeBoard, taskStatus) => {
  for (let column of activeBoard.columns) {
    if (column.name === taskStatus) {
      return column.id;
    }
  }
};
