/* eslint-disable */
import { PRODUCTS, PRODUCT_KEYS } from '../productCatalog';

export const fetchProductList = () => {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        const catalogData = Object.entries(PRODUCTS);
        resolve(catalogData);
      },
      500
    )
  });
};

export const fetchProductDetails = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        const catalogData = Object.entries(PRODUCTS);
        const details = catalogData.find(([key, element]) => key === id)
        if (details) {
          resolve(details);
        }
        reject('error');
      },
      500
    )
  });
}

export const addItemToCart = (obj1) => {
  localStorage.setItem(obj1.id, JSON.stringify(obj1));
};

export const getTotalQuantity = () => {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        let iQuantity = 0;
        let storedData = Object.values(localStorage);
        if (storedData.length === 0) {
          resolve(0);
        }
        storedData = storedData.map(data => JSON.parse(data));
        storedData.forEach(d => {
          iQuantity += d.quantity;
        });
        resolve(iQuantity);
      },
      500
    )
  })
}
