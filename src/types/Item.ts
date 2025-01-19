import Identifiable from "@/types/Identifiable";
import ItemType from "@/types/ItemType";
import Category from "@/types/Category";

interface Item extends Identifiable {
    name: string;
    description: string;
    url: string;
    category?: Category;
    itemType?: ItemType[]
}

export default Item;
