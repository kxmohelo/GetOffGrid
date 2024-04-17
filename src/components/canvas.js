import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import DrawInstallationStructure from '../utils/canvas-utils';

function Canvas({ data }) {
    const canvasRef = useRef(null);

    // Call the drawPanelsOnCanvas function
    useEffect(() => {
        DrawInstallationStructure(canvasRef, data);
    }, [canvasRef, data]);

    return (
        <div className="text-gray-700">
            <h1 className="text-sm text-gray-700 font-semibold pb-2 capitalise max-sm:text-xs">Structure diagram</h1>

            <canvas ref={canvasRef} className="mb-14 mt-8 max-sm:mb-8 max-sm:mt-4 w-full border-4 border-black">Canvas</canvas>

            <div className="grid max-sm:grid-cols-2 grid-cols-3 gap-4">
                <div className="flex">
                    <div className="max-sm:size-[14px] size-5 bg-pink-600 rounded-full"></div>
                    <div className="max-sm:text-xs text-sm tracking-tighter text-gray-900 pl-5 capitalise">
                        End Clamps
                        <span className="max-sm:text-xs text-sm tracking-tighter pl-3 font-sans text-gray-700">
                            &nbsp;{data.endClamps}
                        </span>
                    </div>
                </div>
                <div className="flex">
                    <div className="max-sm:size-[14px] size-5 bg-green-600 rounded-full"></div>
                    <div className="max-sm:text-xs text-sm tracking-tighter text-gray-900 pl-5 capitalise">
                        Rails
                        <span className="max-sm:text-xs text-sm tracking-tighter pl-3 font-sans text-gray-700">
                            &nbsp;{data.rails}
                        </span>
                    </div>
                </div>
                <div className="flex">
                    <div className="max-sm:size-[14px] size-5 bg-yellow-500 rounded-full"></div>
                    <div className="max-sm:text-xs text-sm tracking-tighter text-gray-900 pl-5 capitalise">
                        Centre Clamps
                        <span className="max-sm:text-xs text-sm tracking-tighter pl-3 font-sans text-gray-700">
                            &nbsp;{data.centreClamps}
                        </span>
                    </div>
                </div>
                <div className="flex">
                    <div className="max-sm:size-[14px] size-5 bg-orange-600 rounded-full"></div>
                    <div className="max-sm:text-xs text-sm tracking-tighter text-gray-900 pl-5 capitalise">
                        Splices
                        <span className="max-sm:text-xs text-sm tracking-tighter pl-3 font-sans text-gray-700">2</span>
                    </div>
                </div>
                <div className="flex">
                    <div className="max-sm:size-[14px] size-5 bg-blue-600 rounded-full"></div>
                    <div className="max-sm:text-xs text-sm tracking-tighter text-gray-900 pl-5 capitalise">
                        Solar Panels
                        <span className="max-sm:text-xs text-sm tracking-tighter pl-3 font-sans text-gray-700">
                            &nbsp;{data.solarPanels}
                        </span>
                    </div>
                </div>
                <div className="flex">
                    <div className="max-sm:size-[14px] size-5 bg-red-600 rounded-full"></div>
                    <div className="max-sm:text-xs text-sm tracking-tighter text-gray-900 pl-5 capitalise">
                        Roof Hooks
                        <span className="max-sm:text-xs text-sm tracking-tighter pl-3 font-sans text-gray-700">
                            {data.roofHooks}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Canvas;

Canvas.propTypes = {
    data: PropTypes.shape({
        numStrings: PropTypes.number.isRequired,
        rails: PropTypes.number.isRequired,
        endClamps: PropTypes.number.isRequired,
        centreClamps: PropTypes.number.isRequired,
        splices: PropTypes.number.isRequired,
        solarPanels: PropTypes.number.isRequired,
        roofHooks: PropTypes.number.isRequired,
        orientation: PropTypes.string,
    }).isRequired
}