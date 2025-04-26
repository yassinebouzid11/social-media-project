import '../styles/search.css';



export const PostSearch = ({ searchInput, setSearchInput }) => {
  return (
    <input
      type="text"
      placeholder="Search posts..."
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      className="  post-search"
    />
  );
};
