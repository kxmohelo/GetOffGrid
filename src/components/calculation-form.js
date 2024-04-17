import { useForm } from "react-hook-form";
import { capitalise } from "../utils/app-utils";
import { useNavigate } from "react-router-dom";

function CalculationForm() {
    const { register, handleSubmit, watch, formState: { errors }, reset, } = useForm();
    const navigate = useNavigate();

    const clientName = watch("clientName");
    const numPanels = watch("numPanels");
    const numStrings = watch("numStrings");
    const orientation = watch("orientation");

    const hasClientName = clientName && clientName.trim() !== "";
    const hasNumPanels = numPanels && numPanels.trim() !== "";
    const hasNumStrings = numStrings && numStrings.trim() !== "";
    const hasOrientation = orientation && orientation.trim() !== "";

    const errorClientName = errors.clientName;
    const errorNumPanels = errors.numPanels;
    const errorNumStrings = errors.numStrings;
    const errorOrientation = errors.orientation;

    const errorMessageStyle = "absolute text-red-600 text-xs pt-[1px] pl-[6px] pb-4 tracking-tighter ";

    const formControlBorderStyle = "border-b border-black/50 active:border-opacity-100 rounded-t-lg " +
        "focus:border-b-2 focus:border-yellow-500";

    const formControlErrorStyle = "border-b-2 border-red-600 bg-[rgb(220,38,38,0.08)] ";

    const formControlStyle = "form-control w-full text-gray-900 bg-white/50 px-[6px] h-8 focus:outline-none ";

    const formLabelStyle = "uppercase font-medium text-xs ml-[6px] tracking-tighter pointer-events-none " +
        "transition-all duration-700 ease-in-out absolute mt-2 ";

    const formStyle = "bg-gray-100/30 rounded-2xl shadow shadow-gray-500 px-[100px] " +
        "max-2md:px-[12.5%] py-14 text-yellow-500 max-w-lg relative";

    const submitButtonStyle = "bg-blue-900 hover:bg-yellow-500/95 text-gray-100 " +
        "font-semibold hover:text-gray-700 py-2 mt-4 px-4 rounded-md";

    function capitaliseInput(event) {
        const input = event.target;

        input.value = capitalise(input.value)
    }

    const limitNumInputToMin1 = (event) => {
        let value = parseInt(event.target.value);

        // If the value is less than 1, set it to 1
        if (value < 1) {
            event.target.value = 1;
        }
    };

    const onSubmit = (data) => {
        // Navigate to the report page and push JSON object as state
        navigate('/report', { state: { data } });

        reset();
    };

    return (
        <div className="flex justify-center">
            <form id="calculationForm" onSubmit={handleSubmit(onSubmit)} className={formStyle}>
                {/* Form Content */}
                <div className="max-w-md mx-auto">
                    {/* Form header */}
                    <h2 className="text-xl text-center font-semibold pb-9">
                        Calculate Installation Structure
                    </h2>

                    {/* Client name */}
                    <div className={`relative ${errorClientName ? "mb-10 " : hasNumPanels ? "mb-10" : "mb-6"}`}>
                        <label
                            htmlFor="clientName"
                            className={
                                `${formLabelStyle} 
                                ${hasClientName ? "font-semibold text-gray-700/85 mt-[-17px]" : "text-gray-600/70"}`
                            }
                        >
                            Client Name
                        </label>
                        <input
                            type="text"
                            id="clientName"
                            name="clientName"
                            onKeyDown={capitaliseInput}
                            className={
                                `${formControlStyle} capitalise 
                                ${hasClientName ? "border-b border-yellow-500" : ""} 
                                ${errorClientName ? formControlErrorStyle : formControlBorderStyle}`
                            }
                            maxLength={100}
                            {...register("clientName", {
                                required: 'Client name is required',
                                pattern: {
                                    value: /[a-zA-Z]/,
                                    message: 'Invalid client name'
                                },
                                maxLength: {
                                    value: 100,
                                    message: "Name exceeds max length 100 charcarters"
                                }
                            })}
                        />
                        {errors.clientName && <p className={errorMessageStyle}>{errors.clientName.message}</p>}
                    </div>

                    {/* Number of panels */}
                    <div className={`relative ${errorNumPanels ? "mb-10 " : hasNumStrings ? "mb-10" : "mb-6"}`}>
                        <label
                            htmlFor="numPanels"
                            className={
                                `${formLabelStyle} 
                                ${hasNumPanels ? "font-semibold text-gray-700/85 mt-[-17px]" : "text-gray-600/70"}`
                            }
                        >
                            Number of Panels
                        </label>
                        <input
                            type="number"
                            id="numPanels"
                            name="numPanels"
                            className={
                                `${formControlStyle} 
                                ${hasNumPanels ? "border-b border-yellow-500" : ""} 
                                ${errorNumPanels ? formControlErrorStyle : formControlBorderStyle}`
                            }
                            {...register("numPanels", {
                                required: 'Number of panels is required',
                                min: {
                                    value: 1,
                                    message: 'Number of panels must be at least 1'
                                }
                            })}
                        />
                        {errors.numPanels && <p className={errorMessageStyle}>{errors.numPanels.message}</p>}
                    </div>

                    {/* Number of strings */}
                    <div className={`relative ${errorNumStrings ? "mb-10 " : hasOrientation ? "mb-10" : "mb-6"}`}>
                        <label
                            htmlFor="numStrings"
                            className={
                                `${formLabelStyle} 
                                ${hasNumStrings ? "font-semibold text-gray-700/85 mt-[-17px]" : "text-gray-600/70"} `
                            }
                        >
                            Number of Strings
                        </label>
                        <input
                            type="number"
                            id="numStrings"
                            name="numStrings"
                            className={
                                `${formControlStyle} 
                                ${hasNumStrings ? "border-b border-yellow-500" : ""} 
                                ${errorNumStrings ? formControlErrorStyle : formControlBorderStyle}`
                            }
                            {...register("numStrings", {
                                required: 'Number of strings is required',
                                min: {
                                    value: 1,
                                    message: 'Number of strings must be at least 1'
                                },
                                validate: value =>
                                    parseInt(value) <= parseInt(numPanels) ||
                                    'Number of strings must be smaller or equal to number of panels'
                            })}
                            onInput={limitNumInputToMin1}
                        />
                        {errors.numStrings && <p className={errorMessageStyle}>{errors.numStrings.message}</p>}
                    </div>

                    {/* Orientation */}
                    <div className={`relative ${errorOrientation ? "mb-10 " : "mb-6 "}`}>
                        <label
                            htmlFor="orientation"
                            className={
                                `${formLabelStyle} 
                                ${hasOrientation ? "font-semibold text-gray-700/85 mt-[-17px]" : "text-gray-600/70"}`
                            }
                        >
                            Orientation of Strings
                        </label>
                        <select
                            id="orientation"
                            name="orientation"
                            defaultValue=""
                            className={
                                `${formControlStyle} cursor-pointer pl-[2px]
                                ${hasOrientation ? "border-b border-yellow-500" : "text-gray-00"} 
                                ${errorOrientation ? formControlErrorStyle : formControlBorderStyle}`
                            }
                            style={{ paddingRight: "10px" }}
                            {...register("orientation", { required: 'Orientation is required' })}
                        >
                            <option value="" className="bg-gray-200 max-sm:text-sm hidden" disabled={true}>{/*Select Orientation*/}</option>
                            <option value="Portrait" className="bg-gray-200 max-sm:text-sm">Portrait</option>
                            <option value="Landscape" className="bg-gray-200 max-sm:text-sm">Landscape</option>
                        </select>
                        {errors.orientation && <p className={errorMessageStyle}>{errors.orientation.message}</p>}
                    </div>

                    {/* Submit buttom */}
                    <button className={submitButtonStyle} type="submit">
                        Calculate
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CalculationForm;