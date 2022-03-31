# Product Metafield Script

## Setup
Setup `.env` base on `.env.sample`
```
SHOPIFY_SHOP_NAME=
SHOPIFY_API_ACCESS_TOKEN=
```

Install yarn packages
```
yarn install
```

## Testing 
Run 
```
yarn run start
```
Or 
```
node index
```
## Support
If you want to re-test creating metafield, please update this line code `index.js:16`

Replace
```
metafield ? await updateProductMetafield(metafield) : await createProductMetafield(product);
```
With 
```
metafield ? await deleteProductMetafield(metafield) : await createProductMetafield(product);
```
