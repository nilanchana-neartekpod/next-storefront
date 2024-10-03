import { getProduct, getProductId } from "../../utils/shopify";

export default async function ProductPage({ params }) {
    
    let product = null;
    let pid = await getProductId(params.id);
    if(pid.productByHandle.id){
        product = await getProduct(pid.productByHandle.id);
    }

    return (
        <>
            <p>Product Title: {product.title}</p>
            Product Description:<div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></div>
        </>
    )
}