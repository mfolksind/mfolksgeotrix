// Test script to check what product data is being returned
import { wpFetch, PRODUCT_BY_SLUG_QUERY } from './src/lib/wp.ts';

const testProduct = async () => {
  const data = await wpFetch(PRODUCT_BY_SLUG_QUERY, { slug: 'copper-bonded-earthing-rod' });
  console.log('Full product data:');
  console.log(JSON.stringify(data, null, 2));
  
  const variants = data?.product?.productData?.productVariants || [];
  console.log('\nVariants:');
  console.log(JSON.stringify(variants, null, 2));
  
  const prices = variants
    .map((v: any) => v.variantPrice ? parseFloat(String(v.variantPrice)) : null)
    .filter((p: number | null) => p !== null && !isNaN(p) && p > 0) as number[];
  
  console.log('\nExtracted prices:');
  console.log(prices);
};

testProduct();
