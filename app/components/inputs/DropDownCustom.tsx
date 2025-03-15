import { Objects } from "@/app/interface/app_interface";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { Fragment, useEffect, useRef, useState } from "react";

interface DropdownProps {
  previousSelcted?: string | object;
  selected: string | Objects | undefined;
  items: { [key: string]: any }[]; // Flexibility for item structure
  setSelected: (value: string | object | undefined) => void;
  label?: string;
  placeholder: string;
  objectKey: string;
  className?: string;
  isAll?: boolean;
  disabled?: boolean;
  requiredField?: boolean;
  allDisplay?: string;
}

const DropdownCustom = ({
  previousSelcted,
  selected,
  items,
  setSelected,
  label,
  placeholder,
  objectKey,
  className = "",
  isAll = false,
  disabled = false,
  requiredField = false,
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (inputSearch.trim()) {
      const filtered = items.filter((item) =>
        item[objectKey]?.toLowerCase().includes(inputSearch.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  }, [inputSearch, items, objectKey]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setInputSearch("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const displayValue =
    typeof selected === "string" ? selected : selected?.[objectKey];

  return (
    <div className="h-full">
      <div className="flex flex-row">
        {label && <p className="block mb-2 text-base-900">{label}</p>}
        {requiredField && <p className="ml-2 text-red-900">*</p>}
      </div>
      <Menu as="div" className="relative inline-block w-full" ref={dropdownRef}>
        <Menu.Button
          disabled={
            (previousSelcted !== undefined && !previousSelcted) || disabled
          } // Disable only if previousSelcted is explicitly passed and falsy
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex w-full justify-between p-2.5 border border-base-50 truncate h-[44px] ${
            disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"
          } rounded-lg outline-none text-base-500 ${className}`}
        >
          {displayValue || placeholder}
          <ChevronDownIcon
            className="w-5 h-5 text-base-500"
            aria-hidden="true"
          />
        </Menu.Button>

        {isOpen && (
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
              static
            >
              <div className="p-2 border-b border-gray-200">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  placeholder="Search..."
                  value={inputSearch}
                  onChange={(e) => setInputSearch(e.target.value)}
                />
              </div>
              {isAll && (
                <Menu.Item>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 z-50"
                    onClick={() => {
                      setSelected(undefined);
                      setIsOpen(false);
                    }}
                  >
                    {placeholder}
                  </button>
                </Menu.Item>
              )}
              {filteredItems.map((item, index) => (
                <Menu.Item key={index}>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 z-50"
                    onClick={() => {
                      setSelected(item);
                      setIsOpen(false);
                    }}
                  >
                    {item[objectKey]}
                  </button>
                </Menu.Item>
              ))}
              {filteredItems.length === 0 && (
                <div className="p-4 text-gray-500 text-sm text-center z-50">
                  No results found
                </div>
              )}
            </Menu.Items>
          </Transition>
        )}
      </Menu>
    </div>
  );
};

export default DropdownCustom;
