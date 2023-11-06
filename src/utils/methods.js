export function checkDataEqual(arr1, arr2) {
    
    if (!arr1|| !arr2) {
      return
    }

    if (arr1.length !== arr2.length) {
      return false;
    }
  
    for (let i = 0; i < arr1.length; i++) {
      const obj1 = arr1[i];
      const obj2 = arr2[i];
  
      for (const key in obj1) {
        if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
    }
  
    return true;
}


export const checkPage = (arr, id) => {

    const isPage = arr.some(el => {
        return el.id === id;
    });

    return isPage;
}


export function hasEmptyKey(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === "") {
      return true;
    }
  }
  return false;
}