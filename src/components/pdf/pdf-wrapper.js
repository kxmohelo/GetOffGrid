import PropTypes from 'prop-types';
import React, { useRef, useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';

function PDFWrapper({ children, style, className, width, height, showToolbar = true }) {
    const pdfWrapperRef = useRef(null);
    const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (pdfWrapperRef.current) {
            const { width, height } = pdfWrapperRef.current.getBoundingClientRect();
            setWrapperSize({ width, height });
        }
    }, []);


    const wrapperHasHeight = !(wrapperSize.height === 0 || wrapperSize.height === undefined);

    return (
        <div ref={pdfWrapperRef} className='w-full h-screen'>
            <PDFViewer
                className={className}
                width={width ? width : wrapperSize.width}
                height={height ? height : wrapperHasHeight ? wrapperSize.height : null}
                style={style}
                showToolbar={false}
            >
                {children}
            </PDFViewer>
        </div>
    );
};

export default PDFWrapper;

PDFWrapper.ropTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    showToolbar: PropTypes.bool
};