import React, { Dispatch, FC, SetStateAction } from 'react';
import {
  Button,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { cloneDeep } from 'lodash';
import palette from '../../theme/palette';
import { Item } from '../../types/Order';

interface NewOrderItemProps {
  item: Item;
  itemIndex: number;
  itemsToOrder: Item[];
  setItemsToOrder: Dispatch<SetStateAction<Item[]>>;
}

export const NewOrderItem: FC<NewOrderItemProps> = (props) => {
  const { item, itemIndex, itemsToOrder, setItemsToOrder } = props;

  const changeItemQuantity = (e: React.BaseSyntheticEvent) => {
    const newQuantity = +e.target.value;
    const newItemsToOrder = cloneDeep(itemsToOrder);
    newItemsToOrder[itemIndex].quantity = newQuantity;
    setItemsToOrder(newItemsToOrder);
  };

  const deleteItemFromOrder = () => {
    const newItemsToOrder = cloneDeep(itemsToOrder);
    newItemsToOrder.splice(itemIndex, 1);
    setItemsToOrder(newItemsToOrder);
  };

  return (
    <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
      <ListItemText style={{ width: '40%' }} primary={item.name} secondary={`Size: ${item.size}`} />
      <ListItemText style={{ width: '50%' }}>
        <FormControl>
          <InputLabel>Quantity</InputLabel>
          <Select value={item.quantity} onChange={(e) => changeItemQuantity(e)}>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
          </Select>
        </FormControl>
      </ListItemText>
      <ListItemSecondaryAction style={{ display: 'flex', width: '10%' }}>
        <Button
          size="small"
          variant="outlined"
          style={{
            borderColor: palette.button.primary,
            color: palette.button.primary,
          }}
          onClick={deleteItemFromOrder}
        >
          Delete
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default NewOrderItem;
