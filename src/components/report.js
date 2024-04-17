import Table from './table';
import Canvas from './canvas';
import useStructureDataFetcher from '../hooks/use-structure-data-fetcher';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PDFReport from './pdf/pdf-report';
import PDFWrapper from './pdf/pdf-wrapper';
import { saveAs } from 'file-saver'
import { pdf } from '@react-pdf/renderer';

function Report() {
    const navigate = useNavigate();

    const location = useLocation();

    const [isDownload, setIsDownload] = useState(false);

    const { clientName, numPanels, numStrings, orientation } = location.state.data;

    const reportStyle = "bg-white rounded-3xl shadow shadow-gray-500 w-full " +
        "text-yellow-500 relative text-yellow-500 container max-sm:px-5";

    const buttonStyle = "font-semibold py-2 mt-8 px-4 rounded-md";

    const dismissButtonStyle = "absolute max-sm:-right-2 -right-5 max-sm:-top-3 -top-5 rounded-full text-lg " +
        "max-sm:text-base max-sm:size-8 size-10 bg-blue-900 hover:text-gray-700 text-gray-100 hover:bg-yellow-500/95";

    // Use the custom hook to fetch structure data
    const structureData = useStructureDataFetcher({
        clientName: clientName,
        numPanels: parseInt(numPanels),
        numStrings: parseInt(numStrings),
        orientation: orientation
    });

    if (!structureData) {
        return (
            // need to set minimum width and height
            <div className="justify-center">
                <div className="text-yellow-500 w-full rounded-2xl bg-gray-100">
                    Calculating...
                </div>
            </div>
        );
    }

    const onDismissReport = () => {
        navigate('/');
    };

    const handleDownload = async () => {
        const blob = await pdf(<PDFReport structureData={structureData} />).toBlob();
        saveAs(blob, 'untitled.pdf');
    };

    return (
        <div className="justify-center">
            {/* Header */}
            <h2 className="text-[26px] text-center font-bold pb-14 pt-2 text-yellow-500 capitalise">
                Installation Report
            </h2>

            {/* Report content */}
            <div className={reportStyle} id="report">
                {/* Dismiss button */}
                <button
                    type="button"
                    className={`${dismissButtonStyle}  text-center`}
                    onClick={onDismissReport}
                    style={{ display: isDownload ? "hidden" : "" }}
                >
                    &#x2715;
                </button>

                {/* Company logo and report header */}
                <div className="flex flex-row justify-between py-14 ">
                    {/* Company logo */}
                    <a className="brightness-125"
                        href="https://www.getoffgrid.co.za/"
                        target="_blank"
                        rel="noopener"
                    >
                        <img src="/images/logo-lg.png" alt="Company site" aspect-ratio="16/9" width={100} height={57} />
                    </a>

                    {/* Report header */}
                    <div className="my-auto text-gray-700 capitalize text-lg font-bold py-1 tracking-tighter">
                        Installation Report
                    </div>
                </div>

                {/* Client name - only visible on small screen */}
                <h3 className="text-gray-700 font-semibold text-xs h-[18px] sm:hidden">
                    Client name:
                    <span className="capitalise text-gray-800 max-sm:text-xs "> {clientName}</span>
                </h3>

                {/* Letterhead */}
                <div className="flex flex-row justify-between pb-[100px] max-sm:pb-20 max-sm:hidden">
                    {/* Address */}
                    <a
                        href="geo:-26.041211445280215,27.95438879814999;u=35"
                        className="text-gray-700 font-semibold text-sm max-sm:text-xs"
                    >
                        <h3 className="h-[18px] mb-1">Randburg</h3>
                        <h3 className="h-[18px] mb-1">Northriding Commercial Park,</h3>
                        <h3 className="h-[18px] mb-1">251 Aintree Ave, Northriding,</h3>
                        <h3 className="h-[18px]">Randburg, 2169</h3>
                    </a>

                    {/* Report Details */}
                    <div className="text-gray-700 font-semibold text-sm max-sm:text-xs">
                        <h3 className="h-[18px] mb-1">
                            Report No.:
                            <span className="capitalise text-gray-800 max-sm:text-xs">
                                &nbsp;{structureData.reportNumber}
                            </span>
                        </h3>
                        <h3 className="h-[18px] mb-1">
                            Report Date:
                            <span className="capitalise text-gray-800 max-sm:text-xs">
                                &nbsp;{structureData.reportDate}
                            </span>
                        </h3>
                        <h3 className="h-[18px] mb-1">
                            Project ID:
                            <span className="capitalise text-gray-800 max-sm:text-xs">
                                &nbsp;{structureData.projectId}
                            </span>
                        </h3>
                        <h3 className="h-[18px]">
                            Client Name:
                            <span className="capitalise text-gray-800 max-sm:text-xs">
                                &nbsp;{structureData.clientName}
                            </span>
                        </h3>
                    </div>
                </div>

                {/* Summary of inputs for structure */}
                <div className="text-gray-600 font-semibold text-sm max-sm:text-xs">
                    <h3 className="mb-2 text-gray-700">Summary of inputs:</h3>

                    <ul className="list-disc pl-5">
                        <li className="font-medium text-sm max-sm:text-xs">Number of Panels:
                            <span className="text-sm max-sm:text-xs font-light text-gray-800"> {numPanels}</span>
                        </li>
                        <li className="font-medium text-sm max-sm:text-xs">Number of Strings:
                            <span className="text-sm max-sm:text-xs  font-light text-gray-800"> {numStrings}</span>
                        </li>
                        <li className="font-medium text-sm max-sm:text-xs">Orientation of Strings:
                            <span className="text-sm capitalise max-sm:text-xs font-light text-gray-800">
                                &nbsp; {orientation} Orientation
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Summary of components needed for structure */}
                <div className="py-14">
                    <Table data={[
                        { item: "End clamps", qty: structureData.endClamps },
                        { item: "Rails", qty: structureData.rails },
                        { item: "Centre clamps", qty: structureData.centreClamps },
                        { item: "Splices", qty: structureData.splices },
                        { item: "Solar panels", qty: structureData.solarPanels },
                        { item: "Roof hooks", qty: structureData.roofHooks },
                    ]} />
                </div>

                {/* Structure diagram */}
                <div className="pb-14">
                    <Canvas data={{
                        numStrings: structureData.numStrings,
                        endClamps: structureData.endClamps,
                        centreClamps: structureData.centreClamps,
                        splices: structureData.splices,
                        rails: structureData.rails,
                        solarPanels: structureData.solarPanels,
                        roofHooks: structureData.roofHooks
                    }} />
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-between">
                {/* Download button */}
                <button
                    type="button"
                    className={`${buttonStyle} bg-blue-900 hover:text-gray-700 hover:bg-yellow-500/95`}
                    onClick={handleDownload}
                >
                    Download
                </button>
                
                {/* Generate new report button */}
                <Link
                    to="/"
                    className={`${buttonStyle} bg-gray-400 text-gray-700 hover:text-inherit hover:bg-yellow-500/95`}
                >
                    New Report
                </Link>
            </div>

            <PDFWrapper showToolbar={false}>
                <PDFReport structureData={structureData} />
            </PDFWrapper>
        </div>
    );
};

export default Report