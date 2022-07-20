const Layout = (props) => {
  const { children, title, loading, descript, img, canonicalUrl } = props;
  return (
    <>
      {loading ? (
        <div id="preloder">
          <div className="loader">Loading....</div>
        </div>
      ) : (
        children
      )}
    </>
  );
};
export default Layout;
