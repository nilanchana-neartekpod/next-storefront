import { gql, GraphQLClient } from "graphql-request";

const storefrontAccessToken = process.env.TOKEN;
const endpoint = process.env.SHOPURL;

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken
  }
});

const getAllProductsQuery = gql`
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            featuredImage {
              altText
              url
            }
          }
        }
      }
    }
  `;

export async function getProducts() {
  try {
    return await graphQLClient.request(getAllProductsQuery);
  } catch (error) {
    throw new Error(error);
  }
}

export const getProduct = async (id) => {
  const productQuery = gql`
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        handle
        title
        descriptionHtml
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
        variants(first: 10) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `;
  const variables = {
    id,
  };
  try {
    const data = await graphQLClient.request(productQuery, variables);
    return data.product;
  } catch (error) {
    throw new Error(error);
  }
};

export const getProductId = async (handle) => {
  let getPid = gql`
      {
      productByHandle(handle: "${handle}") {
        id
      }
    }
  `;

  try {
    return await graphQLClient.request(getPid);
  } catch (error) {
    throw new Error(error);
  }
}
