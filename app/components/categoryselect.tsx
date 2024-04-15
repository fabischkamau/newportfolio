import React, { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import Select from "react-select";

interface Category {
  value: string;
  label: string;
}

interface Props {
  categories: Category[];
  setValue: UseFormSetValue<{
    title: string;
    description: string;
    categories: string;
    content: string;
  }>;
}

const SearchableCategorySelector: React.FC<Props> = ({
  categories,
  setValue,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleCategoryChange = (selectedOption: any) => {
    setSelectedCategories((selectedOption as Category[]) || []);
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
    }),
  };
  useEffect(() => {
    setValue(
      "categories",
      selectedCategories.map((cat) => cat.value).join(",")
    );
  }, [selectedCategories]);
  return (
    <div>
      <Select
        options={categories}
        isMulti
        closeMenuOnSelect={false}
        onChange={handleCategoryChange}
        styles={customStyles}
        placeholder="Search and select categories..."
        className="max-w-md border-slate-400 border-2 rounded-lg outline-none ring-0  focus:outline-none focus:ring-0 first-letter:uppercase"
      />
    </div>
  );
};

export default SearchableCategorySelector;
