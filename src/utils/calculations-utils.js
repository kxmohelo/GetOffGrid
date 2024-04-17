import { generateProjectId, generateReportNumber, getCurrentDate } from "./app-utils";

const PANEL_WIDTH_PORTRAIT = 1; // meters
const PANEL_WIDTH_LANDSCAPE = 2; // meters

/**
 * The orientation of the installation structure.
 */
let isPortrait = true;

let maxPanelsInRailSet;

/**
 * The length of the panel based on the given orientation. 
 */
let panelLength;

/**
 * The number of panels per string (rail set).
 * 
 * **Note:** The number of panels will fill equally per string and the remaining set to the last string.
 */
let panelsPerString;

/**
 * The remaining panels after the "panelsPerString" property is set.
 */
let panelsPerStringRemainder;

/**
 * The number of cojoined rail sets.
 */
let cojoinedRailSets;

/**
 * Calculates the installation components needed and returns the structured data.
 */
const calculateInstallationComponents = ({ clientName, numPanels, numStrings, orientation }) => {
    // set the orientation
    isPortrait = orientation === 'Portrait';

    setPanelLength();

    setMaxPanelsPerString({ numPanels: numPanels, numStrings: numStrings });

    const numRails = getNumRails({ numPanels: numPanels, numStrings: numStrings });
    const numRoofHooks = getNumRoofHooks({ numRails: numRails, numStrings: numStrings });

    const report = {
        clientName: clientName,
        reportNumber: generateReportNumber(),
        projectId: generateProjectId(),
        reportDate: getCurrentDate(),
        endClamps: getNumEndClamps(numStrings),
        rails: numRails,
        centreClamps: getNumCentreClamps({ numPanels: numPanels, numStrings: numStrings }),
        splices: cojoinedRailSets * 2,
        solarPanels: numPanels,
        roofHooks: numRoofHooks,
        orientation: orientation,
        numStrings: numStrings,
    };

    return report;
};

/**
 * Gets the number of centre clamps.
 */
const getNumCentreClamps = ({ numPanels: numPanels, numStrings: numStrings }) => {
    if (numPanels === 1 || (numPanels === numStrings)) {
        return 0;
    } else if (panelsPerStringRemainder === 0) {
        if (panelsPerString !== numPanels) {
            const numPanelGroups = numPanels / panelsPerString;
            return (panelsPerString - 1) * numPanelGroups * 2;
        } else {
            return (panelsPerString - 1) * 2;
        }
    } else {
        const numPanelGroupsWithoutRemainderGroup = Math.floor(numPanels / panelsPerString) - 1;

        const numPanelsInRemainderGroup = panelsPerString + panelsPerStringRemainder;

        const numClampsInPanelGroupsWithoutRemainderGroup =
            (panelsPerString - 1) * numPanelGroupsWithoutRemainderGroup * 2;

        const numClampsInPanelWithRemainderGroup = (numPanelsInRemainderGroup - 1) * 2;

        // TODO: remove this if tests are added

        // console.log('Panel groups count WO group containing rem: ', numPanelGroupsWithoutRemainderGroup);
        // console.log('Number of panels in panel group with remainder: ', numPanelsInRemainderGroup);

        // console.log('Number of clamps in panel groups without remainder: ', numClampsInPanelGroupsWithoutRemainderGroup);
        // console.log('Number of clamps in panel group with remainder: ', numClampsInPanelWithRemainderGroup);

        return numClampsInPanelGroupsWithoutRemainderGroup + numClampsInPanelWithRemainderGroup;
    }
};

/**
 * Gets the number of end clamps.
 * 
 * **Note:** *number of end clamps* = *number of strings* (rail set) multiplied by the *4 corner ends*.
 */
const getNumEndClamps = (numStrings) => numStrings * 4;

/**
 * Gets the number of rails.
 */
const getNumRails = ({ numPanels: numPanels, numStrings: numStrings }) => {
    if (numPanels === 1) {
        return 2;
    } else if (numPanels === numStrings) {
        return numPanels * 2;
    } else {
        const numRailBasedOnStrings = numStrings * 2;

        const numRailSetsWithoutRemainderPanels = Math.ceil(numPanels / maxPanelsInRailSet);

        let numRailSetsWithRemainderPanels = 0;

        if ((numPanels % maxPanelsInRailSet) > 0 &&
            (maxPanelsInRailSet * numRailSetsWithoutRemainderPanels < numPanels)) {
            numRailSetsWithRemainderPanels = 1;
        }

        const numRailsBasedOnPanels = (numRailSetsWithoutRemainderPanels + numRailSetsWithRemainderPanels) * 2;

        // TODO: remove this if tests are added

        // console.log('Num rails based on num of strings: ', numRailBasedOnStrings);

        // console.log('Num rail sets without rem panels: ', numRailSetsWithoutRemainderPanels);
        // console.log('Num rail sets with rem panels: ', numRailSetsWithRemainderPanels);
        // console.log('Num rails based on panels: ', numRailsBasedOnPanels);

        return numRailBasedOnStrings > numRailsBasedOnPanels ? numRailBasedOnStrings : numRailsBasedOnPanels;
    }
};

/**
 * Gets the number of rails.
 */
const getNumRoofHooks = ({ numRails: numRails, numStrings: numStrings }) => {
    const railSets = numRails / 2;
    
    cojoinedRailSets = railSets - numStrings;
    
    // TODO: remove this if tests are added

    // console.log('Num of rail sets: ', railSets);
    // console.log('Num of cojoined rail sets: ', cojoinedRailSets);

    return numRails * 5 - (cojoinedRailSets * 2);
};

/**
 * Sets the length of the panel based on the given orientation.
 */
const setPanelLength = () => panelLength = isPortrait ? PANEL_WIDTH_PORTRAIT : PANEL_WIDTH_LANDSCAPE;

/**
 * Sets the "panelsPerString" property.
 */
const setMaxPanelsPerString = ({ numStrings: numStrings, numPanels: numPanels }) => {
    maxPanelsInRailSet = 4 / panelLength;

    // TODO: remove this if tests are added

    // panelsPerString = numStrings > 1 ? Math.ceil(numPanels / maxPanelsInRailSet) : numPanels;
    // panelsPerStringRemainder = numStrings > 1 ? numPanels % maxPanelsInRailSet : 0;

    panelsPerString = numStrings > 1 ? Math.floor(numPanels / numStrings) : numPanels;
    panelsPerStringRemainder = numStrings > 1 ? numPanels % numStrings : 0;

    // TODO: remove this if tests are added

    // console.log('Panels per string: ' + panelsPerString);
    // console.log('Panels per string remainder: ' + panelsPerStringRemainder);
};

export default calculateInstallationComponents;

// Test the function
// Note: comment out import and code using import if running this locally
// const input1 = { clientName: "Client One", numPanels: 6, numStrings: 1, orientation: "Portrait" };
// const input2 = { clientName: "Client Two", numPanels: 6, numStrings: 1, orientation: "Portrait" };

// const output1 = calculateInstallationComponents({ ...input2 });

// console.log("Generated structure components:");
// console.log(output1);