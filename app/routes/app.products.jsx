import React from "react";
import { Page, Layout, Card } from "@shopify/polaris";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";

export async function loader({ request }) {
    const { admin } = await authenticate.admin(request);

    const response = await admin.graphql(
      `#graphql
      query {
        products(first: 10, reverse: true) {
          edges {
            node {
              id
              title
              handle
              resourcePublicationOnCurrentPublication {
                publication {
                  name
                  id
                }
                publishDate
                isPublished
              }
            }
          }
        }
      }`,
    );
    
    const data = await response.json();

  const {
    data: {
      products: { edges },
    },
  } = data;

  return edges;
}

const Products = () => {
    const getProducts = useLoaderData();
  
    return (
      <Page fullWidth>
        <Layout>
          <Layout.Section>
            {getProducts.map((product) => {  
              return (
                <Card
                  title="Online store dashboard"  
                  sectioned
                  key={product.node.id}
                >
                  <p>{product.node.title}</p>
                </Card>
              );
            })}
          </Layout.Section>
        </Layout>
      </Page>
    );
  };
  
  export default Products;