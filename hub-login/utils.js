const removeEmptyValues = obj => Object.keys(obj).forEach((k) => obj[k] == null && delete obj[k]);

export {removeEmptyValues}