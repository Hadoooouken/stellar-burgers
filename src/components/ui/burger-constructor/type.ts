import { TOrder } from '@utils-types';
import { IConstructorState } from '../../../services/slices/ConstructorSlice';

export type BurgerConstructorUIProps = {
  constructorItems: IConstructorState;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
