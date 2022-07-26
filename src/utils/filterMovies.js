const filterMovies = (movies, search) => {
  const filteredMovies = movies.filter((item) => {
    return (
      (item?.nameRU
          ?.toLowerCase()
          .includes(search?.query?.toLowerCase().trim()) ||
        item?.nameEN
          ?.toLowerCase()
          .includes(search?.query?.toLowerCase().trim())) &&
      (search.isShort ? item.duration <= 40 : true)
    );
  });
  return filteredMovies;
}
export default filterMovies;
