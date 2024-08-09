import { useState, useEffect } from "react";

interface SearchBoxProps {
  data: { firstName: string }[]; 
  onSearch: (filteredData: any[]) => void;
}

function SearchBox({ data, onSearch }: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredItems = data.filter(item =>
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onSearch(filteredItems);
  }, [searchTerm, data, onSearch]);

  return (
    <div>
      <input
         className="border-gray-600 border-2 h-11 rounded-md text-xl pl-3 text-black"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBox;
