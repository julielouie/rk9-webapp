import React, { FC, useState } from 'react';
import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  List,
  Collapse,
  Divider,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { cloneDeep } from 'lodash';
import { KeyedMutator } from 'swr';
import { useSnackbar } from 'notistack';
import palette from '../../theme/palette';
import Rk9Api from '../../dataServices/Rk9Api';
import { PUT } from '../../constants/requests';
import { Order } from '../../types/Order';

interface ClientOrderProps {
  order: Order;
  mutate: KeyedMutator<Order[]>;
}

export const ClientOrder: FC<ClientOrderProps> = (props) => {
  const { order, mutate } = props;
  const [showItems, setShowItems] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const markOrderAsFulfilled = async () => {
    const fulfilledOrder = cloneDeep(order);
    fulfilledOrder.fulfilled = true;

    await Rk9Api(PUT, `/orders/${order.id}`, fulfilledOrder)
      .then(async () => {
        enqueueSnackbar('The order has been marked fulfilled!.', {
          persist: false,
          variant: 'success',
        });
        await mutate();
      })
      .catch(() =>
        enqueueSnackbar('There was a problem fulfilling the order. Please let someone know!', {
          persist: false,
          variant: 'error',
        }),
      );
  };

  return (
    <>
      <ListItem
        style={{ display: 'flex', justifyContent: 'space-between' }}
        onClick={() => setShowItems(!showItems)}
      >
        <ListItemIcon>{showItems ? <ExpandLess /> : <ExpandMore />}</ListItemIcon>
        <ListItemText style={{ width: '40%' }} primary={order.client.name} />
        <ListItemText
          style={{ width: '45%' }}
          primary={`Total: $${order.total}`}
          secondary={`Items: ${order.items.length}`}
        />
        <ListItemSecondaryAction style={{ display: 'flex', width: '15%' }}>
          <Button
            size="small"
            variant="outlined"
            style={{
              borderColor: order.fulfilled ? palette.disabled : palette.button.primary,
              color: order.fulfilled ? palette.disabled : palette.button.primary,
            }}
            onClick={markOrderAsFulfilled}
            disabled={order.fulfilled}
          >
            {order.fulfilled ? 'Fulfilled' : 'Fulfill'}
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      {order.items.length ? (
        <Collapse in={showItems} timeout="auto" unmountOnExit>
          <List>
            {order.items.map((item, itemIndex) => (
              <>
                <ListItem style={{ paddingLeft: '50px' }}>
                  <ListItemText
                    style={{ width: '50%' }}
                    primary={item.name}
                    secondary={`Size: ${item.size}`}
                  />
                  <ListItemText
                    style={{ width: '50%' }}
                    primary={`Price: $${item.price}`}
                    secondary={`Quantity: ${item.quantity}`}
                  />
                </ListItem>
                {itemIndex !== order.items.length - 1 ? <Divider /> : null}
              </>
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  );
};

export default ClientOrder;
