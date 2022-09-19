import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import { Typography, Grid, Box, Button, FormControl, Select, MenuItem } from '@material-ui/core';
import Card from '@mui/material/Card';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { cloneDeep } from 'lodash';
import palette from '../../theme/palette';
import { Item } from '../../types/Order';

interface SwagItemCardProps {
  swagItem: { title: string; sizes: string[]; price: number; image: string };
  itemsToOrder: Item[];
  setItemsToOrder: Dispatch<SetStateAction<Item[]>>;
}

const SwagItemCard: FC<SwagItemCardProps> = (props) => {
  const { swagItem, itemsToOrder, setItemsToOrder } = props;
  const [size, setSize] = useState('');

  const addItemToOrder = () => {
    if (size) {
      const newItem = {
        name: swagItem.title,
        size,
        quantity: 1,
        price: swagItem.price,
      };
      const newItemsToOrder = cloneDeep(itemsToOrder);
      newItemsToOrder.push(newItem);
      setItemsToOrder(newItemsToOrder);

      setSize('');
    }
  };

  return (
    <Grid item container md={4} sm={6} xs={12}>
      <Grid item style={{ padding: '50px 50px 50px 50px', width: '100%' }}>
        <Card
          style={{
            boxShadow: 'none',
            borderRadius: 0,
          }}
        >
          {swagItem.image ? (
            <CardMedia
              style={{ borderRadius: '3px', objectFit: 'contain' }}
              component="img"
              height="250"
              image={swagItem.image}
              alt={swagItem.title}
            />
          ) : (
            <Box
              style={{
                width: '100%',
                height: '250px',
                backgroundColor: palette.disabled,
                color: palette.white,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '3px',
              }}
            >
              <ImageNotSupportedIcon style={{ fontSize: '4rem' }} /> <span>No Photo</span>
            </Box>
          )}
          <CardContent style={{ width: '100%', padding: '20px 0' }}>
            <Typography
              variant="h6"
              style={{
                width: '100%',
                borderBottom: `5px solid ${palette.paper.secondary}`,
                paddingBottom: '20px',
                fontWeight: 'bold',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {swagItem.title}: ${swagItem.price}
            </Typography>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="subtitle2"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <span> Available in:</span>
                <FormControl>
                  <Select
                    style={{ marginLeft: '10px' }}
                    displayEmpty
                    value={size}
                    onChange={(e) => setSize(e.target.value as string)}
                  >
                    <MenuItem value="">
                      <em>Size</em>
                    </MenuItem>
                    {swagItem.sizes.map((sizeItem) => (
                      <MenuItem key={`${swagItem.title} - ${sizeItem}`} value={sizeItem}>
                        {sizeItem}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Typography>
              <Button
                variant="outlined"
                style={{ borderColor: palette.paper.secondary, color: palette.paper.secondary }}
                onClick={addItemToOrder}
              >
                Add to Order
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SwagItemCard;
