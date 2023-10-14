'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import Logoo from '../../public/blue.jpeg'
const Logo = () => {
    const router = useRouter();

    return (
        <Image
            onClick={() => router.push('/')}
            className="hidden md:block cursor-pointer rounded"
            src={Logoo}
            height="50"
            width="50"
            alt="Logo"
        />
    );
}

export default Logo;