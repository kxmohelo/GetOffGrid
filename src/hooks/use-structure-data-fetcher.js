import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { fetchStructureData } from '../utils/app-utils';

function useStructureDataFetcher(inputData) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchStructureData(inputData).then((result) => {
            setData(result);
        });
    }, []);

    return data;
}

useStructureDataFetcher.propTypes = {
    inputData: PropTypes.shape({
        clientName: PropTypes.string.isRequired,
        numPanels: PropTypes.number.isRequired,
        numStrings: PropTypes.number.isRequired,
        orientation: PropTypes.oneOf(['Portrait', 'Landscape']).isRequired,
    }).isRequired,
};

export default useStructureDataFetcher;