import { AdditionalService } from './additionalService';
import { Car } from './car';

export class CartItem {
  car: Car;
  totalPrice: number;
  additionalService: AdditionalService[];
}
