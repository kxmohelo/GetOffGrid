import calculateInstallationComponents from "./calculations-utils";

/**
 * Capitalises the text.
 */
export const capitalise = (text) => {
    // Split the text into words
    const words = text.split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    // Return the capitalized words back together
    return capitalizedWords.join(' ');
}

/**
 * Fetches the solar installation structure components data from the server.
 */
export const fetchStructureData = async (inputData, timeout = 10000) => {
    return new Promise((resolve, reject) => {
        // Set a timeout to reject the promise if it takes too long to resolve
        const timer = setTimeout(() => {
            reject(new Error('Failed to fetch structured data.')); // Reject with a timeout error
        }, timeout);

        try {
            const data = calculateInstallationComponents(inputData);
            resolve(data);
        } catch (error) {
            reject(error); // Reject the promise if an error occurs
        }
    });
}

/**
 * Generates a random number between the min and max values.
 */
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random report number between 1000 and 9999.
 */
export const generateReportNumber = () => {
    return generateRandomNumber(1000, 9999);
}

/**
 * Generates a random project ID between 100000 and 999999.
 */
export const generateProjectId = () => {
    return generateRandomNumber(100000, 999999);
}

/**
 * Generates table rows.
 */
export const generateTableRows = (data) => {
    return data.map((entry, index) => {
        const { item, qty } = entry;

        return (
            <tr key={index} className="text-gray-800">
                <td
                    className={
                        `border-b-2 border-white px-4 py-1 text-sm 
                        max-sm:text-xs bg-gray-200/70 border-r-white border-r-2`
                    }
                >
                    {item}
                </td>
                <td className="border-b-2 border-white px-4 py-1 text-center text-sm bg-gray-200/70 max-sm:text-xs">
                    {qty}
                </td>
            </tr>
        );
    });
}

/**
 * Gets the current date.
 */
export const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    return `${dd}-${mm}-${yyyy}`;
}