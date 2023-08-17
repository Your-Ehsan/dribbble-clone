import Link from "next/link";
import { Menu } from "@headlessui/react";
const MenuItem = ({
  text,
  userId,
}: {
  text: string;
  userId: string | null;
}) => {
  return (
    <Menu.Item>
      <Link href={`/profile/${userId}`} className="text-sm">
        {text}
      </Link>
    </Menu.Item>
  );
};

export default MenuItem;
