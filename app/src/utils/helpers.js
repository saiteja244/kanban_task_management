const isObject = (value) => {
  return Object.prototype.toString.apply(value) === "[object Object]";
};

const modifyObject = (objectToModify, propsToDelete, newValue = {}) => {
  const objectToModifyCopy = JSON.parse(JSON.stringify(objectToModify));

  if (propsToDelete !== undefined) {
    for (let prop in propsToDelete) {
      delete objectToModifyCopy[prop];
    }
  }

  return Object.assign({}, objectToModifyCopy, newValue);
};

const modifyNestedObject = (
  parentObject,
  objectToModifyID,
  propsToDelete,
  newValue
) => {
  const parentObjectCopy = JSON.parse(JSON.stringify(parentObject));

  if (parentObjectCopy.id === objectToModifyID) {
    return modifyObject(parentObjectCopy, propsToDelete, newValue);
  }

  for (const prop in parentObjectCopy) {
    if (isObject(parentObjectCopy[prop])) {
      if (parentObjectCopy[prop].id === objectToModifyID) {
        parentObjectCopy[prop] = modifyObject(
          parentObjectCopy[prop],
          propsToDelete,
          newValue
        );
      } else {
        parentObjectCopy[prop] = modifyNestedObject(
          parentObjectCopy[prop],
          objectToModifyID,
          propsToDelete,
          newValue
        );
      }
    } else if (Array.isArray(parentObjectCopy[prop])) {
      parentObjectCopy[prop] = parentObjectCopy[prop].map((el) => {
        return modifyNestedObject(
          el,
          objectToModifyID,
          propsToDelete,
          newValue
        );
      });
    }
  }

  return parentObjectCopy;
};

const findNestedObject = (parentObject, id) => {
  const parentObjectCopy = JSON.parse(JSON.stringify(parentObject));

  if (parentObjectCopy.id === id) {
    return parentObjectCopy;
  }

  for (const prop in parentObjectCopy) {
    if (isObject(parentObjectCopy[prop])) {
      if (parentObjectCopy[prop].id === id) {
        return parentObjectCopy[prop];
      } else {
        return findNestedObject(parentObjectCopy[prop], id);
      }
    } else if (Array.isArray(parentObjectCopy[prop])) {
      for (const object of parentObjectCopy[prop]) {
        let result = findNestedObject(object, id);
        if (result) return result;
      }
    }
  }
  return null;
};

const findParentColumnData = (activeBoard, columnName) => {
  for (const column of activeBoard.columns) {
    if (column.name === columnName) {
      return {
        columnID: column.id,
        columnStatus: column.name,
      };
    }
  }

  return null;
};

export {
  modifyObject,
  modifyNestedObject,
  findNestedObject,
  findParentColumnData,
};
