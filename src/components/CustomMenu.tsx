import { Menu } from "@headlessui/react";
import Image from "next/image";

type Props = {
  title: string;
  state: string;
  filters: string[];
  setState: (value: string) => void;
};
const CustomMenu = ({ title, state, filters, setState }: Props) => {
  return (
    <div className="flex-start flex-col w-full gap-7 relative">
      <label htmlFor={title} className="w-full text-gray-100">
        {title}
      </label>
      <Menu as={"div"} className={"flexCenter custom_menu-btn"}>
        <div className="">
          <Menu.Button>
            {state || "Select a category"}
            <Image
              src={"/arrow-down.svg"}
              alt="arrow-down-icon"
              width={10}
              height={5}
            />
          </Menu.Button>
        </div>
        <Menu.Items className={"flexStart custom_menu-items"}>
          {filters.map((tag) => (
            <Menu.Item key={tag}>
              <button
                type="button"
                value={tag}
                className="custom_menu-item"
                onClick={(e) => setState(e.currentTarget.value)}
              >
                {tag}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default CustomMenu;
