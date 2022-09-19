import React, { FC, useState, useContext } from 'react';
import { Button, Divider, Grid, List, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import useSWR from 'swr';
import { useAbility } from '@casl/react';
import { cloneDeep } from 'lodash';
import palette from '../../theme/palette';
import ScrollToTop from '../utils/ScrollToTop';
import { SessionContext } from '../../context/SessionContext';
import { Item, Order } from '../../types/Order';
import Rk9Api from '../../dataServices/Rk9Api';
import { POST } from '../../constants/requests';
import { AbilityContext } from '../../context/AbilityContext';
import TShirt from '../../assets/images/swag/t_shirt.png';
import BaseballTee from '../../assets/images/swag/baseball_tee.png';
import TankTop from '../../assets/images/swag/tank_top.png';
import PinkTankTop from '../../assets/images/swag/pink_tank_top.png';
import Sweatshirt from '../../assets/images/swag/sweatshirt.png';
import HeatheredSweatshirt from '../../assets/images/swag/heathered_sweatshirt.png';
import SwagItemCard from './SwagItemCard';
import NewOrderItem from './NewOrderItem';
import ClientOrder from './ClientOrder';

export const Swag: FC = () => {
  const [itemsToOrder, setItemsToOrder] = useState<Item[]>([]);
  const [order, setOrder] = useState<Order>({
    client: {
      id: '',
      name: '',
    },
    items: [],
    fulfilled: false,
    total: 0,
  });
  const {
    state: { user },
  } = useContext(SessionContext);
  const { enqueueSnackbar } = useSnackbar();
  const ability = useAbility(AbilityContext);

  const { data: allOrders, mutate } = useSWR<Order[]>('/orders', {
    suspense: true,
  });

  const fulfilledOrders = allOrders?.filter((orderItem) => orderItem.fulfilled);
  const newOrders = allOrders?.filter((orderItem) => !orderItem.fulfilled);

  const swagItems: { title: string; sizes: string[]; price: number; image: string }[] = [
    { title: 'T-Shirt', sizes: ['S', 'M', 'L', '2XL'], price: 20, image: TShirt },
    { title: 'Baseball Tee', sizes: ['M', 'L'], price: 25, image: BaseballTee },
    { title: 'Tank Top', sizes: ['S', 'M', 'L'], price: 20, image: TankTop },
    { title: 'Pink Tank Top', sizes: ['XL'], price: 20, image: PinkTankTop },
    { title: 'Sweatshirt', sizes: ['XL'], price: 40, image: Sweatshirt },
    { title: 'Heathered Sweatshirt', sizes: ['L'], price: 40, image: HeatheredSweatshirt },
  ];

  const submitOrder = async () => {
    if (user && itemsToOrder.length) {
      const newOrder = cloneDeep(order);
      newOrder.client.id = user.id;
      newOrder.client.name = user.name;
      newOrder.items = itemsToOrder;
      newOrder.total = newOrder.items.reduce((partialSum, item) => partialSum + item.price, 0);

      await Rk9Api(POST, '/orders', newOrder)
        .then(() => {
          setOrder({
            client: {
              id: '',
              name: '',
            },
            items: [],
            fulfilled: false,
            total: 0,
          });
          setItemsToOrder([]);
          enqueueSnackbar(
            'Your order was submitted! Allie will be reaching out to you about it shortly.',
            {
              persist: false,
              variant: 'success',
            },
          );
        })
        .catch(() =>
          enqueueSnackbar('There was a problem submitting the order. Please let someone know!', {
            persist: false,
            variant: 'error',
          }),
        );
    }
  };

  return (
    <>
      <ScrollToTop />
      <Grid container>
        <Grid
          item
          container
          style={{
            marginTop: '70px',
            backgroundColor: palette.paper.secondary,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            color: palette.text.contrast,
          }}
        >
          <Typography variant="h4" style={{ fontWeight: 600 }}>
            Swag
          </Typography>
        </Grid>
        {ability.can('read', 'Orders') && (
          <Grid item container>
            <Grid item sm={6} xs={12}>
              <Typography variant="h4" style={{ padding: '20px', fontWeight: 600 }}>
                New Client Orders
              </Typography>
              <List style={{ padding: '20px', marginBottom: '30px' }}>
                {newOrders && newOrders.length ? (
                  newOrders.map((orderItem) => {
                    return (
                      <span key={orderItem.id}>
                        <ClientOrder order={orderItem} mutate={mutate} />
                        <Divider />
                      </span>
                    );
                  })
                ) : (
                  <Typography>No New Orders!</Typography>
                )}
              </List>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Typography variant="h4" style={{ padding: '20px', fontWeight: 600 }}>
                Fulfilled Client Orders
              </Typography>
              <List style={{ padding: '20px', marginBottom: '30px' }}>
                {fulfilledOrders && fulfilledOrders.length ? (
                  fulfilledOrders.map((orderItem) => {
                    return (
                      <span key={orderItem.id}>
                        <ClientOrder order={orderItem} mutate={mutate} />
                        <Divider />
                      </span>
                    );
                  })
                ) : (
                  <Typography>No Fulfilled Orders Yet!</Typography>
                )}
              </List>
            </Grid>
          </Grid>
        )}
        {ability.can('create', 'Orders') && !ability.can('read', 'Orders') && (
          <Grid item container style={{ display: 'flex', flexDirection: 'column' }}>
            <Grid
              item
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h4" style={{ padding: '20px', fontWeight: 600 }}>
                Order New Swag
              </Typography>
              <Typography
                variant="h6"
                style={{ padding: '20px', fontWeight: 600, fontStyle: 'italic' }}
              >
                *Items will appear below, as they are added
              </Typography>
            </Grid>
            <Grid item style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              {swagItems?.map((item) => (
                <SwagItemCard
                  key={item.title}
                  swagItem={item}
                  itemsToOrder={itemsToOrder}
                  setItemsToOrder={setItemsToOrder}
                />
              ))}
            </Grid>
            {itemsToOrder.length ? (
              <Grid item>
                <Divider style={{ width: '100%' }} />
                <Typography variant="h4" style={{ padding: '20px', fontWeight: 600 }}>
                  Your Order
                </Typography>
                <Grid item sm={6} xs={12}>
                  <List style={{ padding: '20px' }}>
                    {itemsToOrder.map((item, itemIndex) => {
                      return (
                        <span key={`${item.name} - ${item.size}`}>
                          <NewOrderItem
                            item={item}
                            itemIndex={itemIndex}
                            itemsToOrder={itemsToOrder}
                            setItemsToOrder={setItemsToOrder}
                          />
                          <Divider />
                        </span>
                      );
                    })}
                  </List>
                </Grid>
                <Grid
                  item
                  sm={6}
                  xs={12}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h5" style={{ paddingLeft: '30px' }}>
                    Total: ${itemsToOrder.reduce((partialSum, item) => partialSum + item.price, 0)}
                  </Typography>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: palette.button.primary,
                      color: palette.text.contrast,
                    }}
                    onClick={submitOrder}
                  >
                    Submit Order
                  </Button>
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Swag;
