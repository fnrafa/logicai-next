import Identifiable from "@/types/Identifiable";

interface ItemType extends Identifiable {
    type: string;
    price: number;
    url: string;
    refill: boolean;
}

export default ItemType;
