import React from "react";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }) {
  const { admin, session } = await authenticate.admin(request);

  try {
    const response = await admin.rest.resources.InventoryLevel.all({
      session: session,
      location_ids: "71945126065",
    });

    if (response) {
      console.log("hit");

      const data = response.data;
      console.log(data, "data");

      return json({
        inventory: data,
      });


    }


    return null;

  } catch (error) {
    console.log(error, "error");
  }
}

const Inventory = () => {
  const data = useLoaderData();
  console.log(data, "data");
  return <div>this is inventoryItems</div>;
};

export default Inventory;


