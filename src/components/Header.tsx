import { NavLinks } from "@/constants";
import { metaDesc } from "@/constants/metaDesc";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const session = {};
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href={"/"}>
          <Image
            src={"/logo.svg"}
            width={115}
            height={43}
            alt={metaDesc.title}
          />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link key={link.key} href={link.href}>
              {link.text}
            </Link>
          ))}
        </ul>
        {session ? (
          //TODO: userPhoto
          <Link href={"/create-project"}>share work</Link>
        ) : (

            //TODO: <AuthProviders/>
          <button>login</button>
        )}
      </div>
    </nav>
  );
};

export default Header;
