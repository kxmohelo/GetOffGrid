import PropTypes from 'prop-types';
import { generateTableRows } from '../utils/app-utils';

function Table({ data }) {
    const tableStyle = "w-full text-gray-700 border-none";

    const tableHeadContainerStyle = "border-b-2 border-b-white";

    const column1TableHeadStyle = "px-4 py-1 bg-gray-300 border-r-white border-r-2 font-semibold " +
        "text-sm text-start max-sm:text-xs";
    
    const column2TableHeadStyle = "px-4 py-1 bg-gray-300 font-semibold text-sm max-sm:text-xs";

    const headerStyle = "text-sm text-gray-700 font-semibold mb-2 capitalise max-sm:text-xs";

    return (
        <div className="border-b-2 pb-1 border-gray-300">
            {/* Header */}
            <h1 className={headerStyle}>Structure components</h1>

            <table className={tableStyle}>
                <thead className={tableHeadContainerStyle}>
                    <tr>
                        <th className={column1TableHeadStyle}>Item</th>
                        <th className={column2TableHeadStyle}>Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {generateTableRows(data)}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(
        { item: PropTypes.string.isRequired, qty: PropTypes.number.isRequired },
    )).isRequired
}