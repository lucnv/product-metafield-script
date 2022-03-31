require('dotenv').config();
const Shopify = require('shopify-api-node');

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_SHOP_NAME,
  accessToken: process.env.SHOPIFY_API_ACCESS_TOKEN
});

async function execute() {
  try {
    const products = await shopify.product.list();
    console.log(`Start create/update metafield for ${products.length} product(s)`);
    for(const product of products) {
      console.log(`- Processing product ${product.id}`);
      const metafield = await getProductMetafield(product);
      metafield ? await updateProductMetafield(metafield) : await createProductMetafield(product);
    }
    console.log(`Finished create/update metafield for ${products.length} product(s)`);
  }
  catch(error) {
    console.log(error);
  }  
}

async function getProductMetafield(product) {
  const metafields = await shopify.metafield.list({ 
    metafield: { 
      owner_resource: 'product', 
      owner_id: product.id
    } 
  });

  return metafields.find(metafield => metafield.namespace == 'global' && metafield.key == 'test');
}

async function createProductMetafield(product) {
  const response = await shopify.metafield.create({
    key: 'test',
    value: 0,
    value_type: 'integer',
    namespace: 'global',
    owner_resource: 'product',
    owner_id: product.id
  });
  console.log(`\tCreated metafield`);
}

async function updateProductMetafield(metafield) {
  const response = await shopify.metafield.update(
    metafield.id,
    {
      value: metafield.value + 1
    }
  );
  console.log(`\tUpdated metafield with value ${response.value}`);
}

async function deleteProductMetafield(metafield) {
  await shopify.metafield.delete(metafield.id);
  console.log(`\tDeleted metafield`);
}

execute();
