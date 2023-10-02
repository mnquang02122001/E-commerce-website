import Image from "next/image";
import formatPrice from "@/util/PriceFormat";
import { ProductType } from "@/types/ProductType";
export default function Product({name, image, unit_amount}: ProductType ) {
    return (
        <div>
            <Image src={image} alt={name} width={400} height={400}/>
            <h1>{name}</h1>
            {unit_amount !== null ? formatPrice(unit_amount) : "N/A"}
        </div>
    )
}