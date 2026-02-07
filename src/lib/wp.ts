// WordPress GraphQL Integration for Astro
// ✅ EXACT QUERIES - NO HALLUCINATIONS, NO INVENTED FIELDS

const WP_URL = import.meta.env.PUBLIC_WORDPRESS_URL || 'https://geotrix.mfolks.com/graphql';

export async function wpFetch(query: string, variables = {}) {
  try {
    const res = await fetch(WP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
      console.error('WordPress GraphQL request failed:', res.status);
      return getMockData(query);
    }

    const json = await res.json();
    
    if (json.errors) {
      console.error('GraphQL Errors:', json.errors);
      return getMockData(query);
    }
    
    return json.data;
  } catch (error) {
    console.warn('WordPress fetch failed, using mock data:', error);
    return getMockData(query);
  }
}

// ===================================================================
// 1️⃣ GET ALL PRODUCTS (FOR /products PAGE)
// Use for: Product listing, cards, category filtering
// ===================================================================
export const ALL_PRODUCTS_QUERY = `
  query GetAllProducts {
    products(first: 100) {
      nodes {
        id
        title
        slug

        featuredImage {
          node {
            sourceUrl
            altText
          }
        }

        productCategories {
          nodes {
            name
            slug
          }
        }

        productData {
          shortDescription
        }
      }
    }
  }
`;

// ===================================================================
// 2️⃣ GET SINGLE PRODUCT BY SLUG (FOR /products/[slug])
// Most important query - drives product detail, variants, cart
// ===================================================================
export const PRODUCT_BY_SLUG_QUERY = `
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      title
      slug

      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }

      productCategories {
        nodes {
          name
          slug
        }
      }

      productData {
        shortDescription

        technicalSpecs {
          specName
          specValue
          specUnit
        }

        productVariants {
          variantLabel
          variantDiameter
          variantLength
          variantCoating
          variantSku
          variantPriceType
          variantPrice
          variantPriceUnit
          variantAvailability
        }

        benefits {
          benefitText
        }

        applicationsUsedIn
      }
    }
  }
`;

// ===================================================================
// 3️⃣ GET ALL CATEGORIES
// ===================================================================
export const ALL_CATEGORIES_QUERY = `
  query GetAllCategories {
    productCategories {
      nodes {
        name
        slug
      }
    }
  }
`;

// ===================================================================
// 4️⃣ GET PRODUCTS BY CATEGORY (OPTIONAL)
// ===================================================================
export const PRODUCTS_BY_CATEGORY_QUERY = `
  query GetProductsByCategory($categorySlug: String!) {
    productCategories(where: { slug: [$categorySlug] }) {
      nodes {
        name
        products(first: 100) {
          nodes {
            id
            title
            slug

            featuredImage {
              node {
                sourceUrl
                altText
              }
            }

            productData {
              shortDescription
            }
          }
        }
      }
    }
  }
`;

// ===================================================================
// MOCK DATA FALLBACK (FOR DEVELOPMENT/TESTING)
// ===================================================================
function getMockData(query: string) {
  if (query.includes('GetAllProducts')) {
    return {
      products: {
        nodes: [
          {
            id: '1',
            title: 'Copper Bonded Earthing Rod',
            slug: 'copper-bonded-earthing-rod',
            featuredImage: null,
            productCategories: { 
              nodes: [{ name: 'Earthing Solutions', slug: 'earthing-solutions' }] 
            },
            productData: { 
              shortDescription: 'High-purity copper bonded grounding rod for superior conductivity and corrosion resistance.' 
            }
          },
          {
            id: '2',
            title: 'ESE Lightning Arrestor',
            slug: 'ese-lightning-arrestor',
            featuredImage: null,
            productCategories: { 
              nodes: [{ name: 'Lightning Protection', slug: 'lightning-protection' }] 
            },
            productData: { 
              shortDescription: 'Early Streamer Emission arrestor for large-scale structure protection.' 
            }
          },
          {
            id: '3',
            title: 'GI Earthing Strip',
            slug: 'gi-earthing-strip',
            featuredImage: null,
            productCategories: { 
              nodes: [{ name: 'Earthing Solutions', slug: 'earthing-solutions' }] 
            },
            productData: { 
              shortDescription: 'Galvanized iron earthing strip for industrial grounding systems.' 
            }
          }
        ]
      }
    };
  }
  
  if (query.includes('GetProductBySlug')) {
    return {
      product: {
        id: '1',
        title: 'Copper Bonded Earthing Rod',
        slug: 'copper-bonded-earthing-rod',
        featuredImage: null,
        productCategories: { 
          nodes: [{ name: 'Earthing Solutions', slug: 'earthing-solutions' }] 
        },
        productData: {
          shortDescription: 'High-purity copper bonded grounding rod for superior conductivity and corrosion resistance.',
          technicalSpecs: [
            { specName: 'Material', specValue: 'High Tensile Steel Core', specUnit: '' },
            { specName: 'Bonding', specValue: '99.9% Pure Copper', specUnit: '' },
            { specName: 'Coating Thickness', specValue: '250', specUnit: 'Microns' }
          ],
          productVariants: [
            { 
              variantLabel: '14mm x 3m (250 Microns)', 
              variantDiameter: '14mm',
              variantLength: '3m',
              variantCoating: '250 Microns',
              variantSku: 'CB-14-3-250', 
              variantPriceType: 'indicative', 
              variantPrice: 1500, 
              variantPriceUnit: 'piece',
              variantAvailability: 'in_stock'
            },
            { 
              variantLabel: '17mm x 3m (250 Microns)', 
              variantDiameter: '17mm',
              variantLength: '3m',
              variantCoating: '250 Microns',
              variantSku: 'CB-17-3-250', 
              variantPriceType: 'on_request',
              variantPrice: null,
              variantPriceUnit: null,
              variantAvailability: 'in_stock'
            }
          ],
          benefits: [
            { benefitText: 'Superior electrical conductivity' },
            { benefitText: 'Corrosion resistant copper bonding' },
            { benefitText: 'Easy installation' }
          ],
          applicationsUsedIn: 'Solar power plants, industrial facilities, substations'
        }
      }
    };
  }

  if (query.includes('GetAllCategories')) {
    return {
      productCategories: {
        nodes: [
          { name: 'Earthing Solutions', slug: 'earthing-solutions' },
          { name: 'Lightning Protection', slug: 'lightning-protection' },
          { name: 'Conductors & Cables', slug: 'conductors-cables' }
        ]
      }
    };
  }

  return {};
}

// ===================================================================
// FIELD NAME TRUTH TABLE (ACF → GraphQL)
// ===================================================================
// ACF Field              | GraphQL Field
// ---------------------- | --------------------------
// short_description      | shortDescription
// technical_specs        | technicalSpecs
// spec_name              | specName
// spec_value             | specValue
// spec_unit              | specUnit
// product_variants       | productVariants
// variant_price_type     | variantPriceType
// variant_price_unit     | variantPriceUnit
// applications_used_in   | applicationsUsedIn
// ===================================================================

// ❌ DO NOT INVENT FIELDS
// ❌ DO NOT FLATTEN productData
// ❌ DO NOT QUERY SPECS ON PRODUCT DIRECTLY
// ✅ ALWAYS GO THROUGH productData { ... }
// ✅ TRUST GRAPHIQL SCHEMA, NOT INTUITION
