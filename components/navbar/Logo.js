'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import Logoo from '../../public/logo.png'
const Logo = () => {
    const router = useRouter();

    return (
        <Image
            onClick={() => router.push('/')}
            className="hidden md:block cursor-pointer"
            src={Logoo}
            height="100"
            width="100"
            alt="Logo"
        />
    );
}

export default Logo;