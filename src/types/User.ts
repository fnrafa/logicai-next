import Identifiable from "@/types/Identifiable";

interface User extends Identifiable {
    fullname: string,
    email?: string,
    username: string,
    phone?: string,
    role: string,
    token?: string,
}

export default User;
