import { NavLinks } from "@/constants";
import { metaDesc } from "@/constants/metaDesc";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import AuthProvider from "./AuthProvider";
import Button from "./ui/Button";
import ProfileMenu from "./ProfileMenu";

const Header = async () => {
  const session = await getCurrentUser();
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={116} height={43} alt={metaDesc.title} />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.text}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />

            <Link href="/create-project">
              <Button title="Share work" />
            </Link>
          </>
        ) : (
          <AuthProvider />
        )}
      </div>
    </nav>
  );
};

export default Header;
