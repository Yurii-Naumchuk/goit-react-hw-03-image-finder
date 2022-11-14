import PropTypes from 'prop-types';
import axios from 'axios';

const fetchRequest = async (searchName, page) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '29397538-d4347fe79bd92696eb0b247a2';
  const URL = `${BASE_URL}?q=${searchName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12&`;
  const response = await axios.get(URL);
  return response.data;
};

export default fetchRequest;

fetchRequest.propTypes = {
  searchName: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
