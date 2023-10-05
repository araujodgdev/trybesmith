import { ProductInputtableTypes } from '../../database/models/product.model';

function hasInfoToRegister(info: ProductInputtableTypes): boolean {
  if (!info.name || !info.price || !info.orderId) return false;
  return true;
}

export default {
  hasInfoToRegister,  
};