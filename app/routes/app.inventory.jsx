import React from 'react'
import { authenticate } from '../shopify.server';
import { useLoaderData } from '@remix-run/react';

export async function loader({request}) {
    const { admin } = await authenticate.admin(request);

    const response = await admin.graphql(
      `#graphql
      query {
        inventoryLevel(id: "gid://shopify/InventoryLevel/523463154?inventory_item_id=30322695") {
          id
          quantities(names: ["available", "incoming", "committed", "damaged", "on_hand", "quality_control", "reserved", "safety_stock"]) {
            name
            quantity
          }
          item {
            id
            sku
          }
          location {
            id
            name
          }
        }
      }`,
    );

    const data = await response.json();


    const inventoryItem = data.data.inventoryLevel;
    return inventoryItem;
}

const Inventory = () => {
    const getInventory = useLoaderData();
    console.log(getInventory );
  return (
    <div> 
        this is inventoryItems
    </div>
  )
}

export default Inventory