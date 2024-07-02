// InputSearch
import "./InputSearch.css";

export default function InputSearch({
  className,
  searchValue,
  setSearchValue,
  handleFilter,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleFilter(event, searchValue, setSearchValue);
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Search note..."
        className="input-search"
      />
    </form>
  );
}
