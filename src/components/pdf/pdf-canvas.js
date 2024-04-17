import PropTypes from 'prop-types';
import React from 'react';
import { View, Canvas, StyleSheet } from '@react-pdf/renderer';

function PDFCanvas({ data }) {
    // page size
    // A4: [595.28, 841.89],
    return (
        <View style={{ marginHorizontal: "auto", width: "100%", paddingBottom: 20 }}>
            <Canvas
                debug={true}
                style={{ backgroundColor: "black", width: "100%", maxWidth: 600, maxHeight: 842 }}
                paint={
                    (painterObject) =>
                        painterObject
                            .save()
                            .moveTo(100, 100) //move to position 100,100
                            .lineTo(300, 100) //draw a line till 300, 100
                            .lineTo(300, 300) //draw another line till 300,300
                            .fill("red") //when the diagram is drawn, set the background color to pink
                }
            />
        </View>
    );
};

export default PDFCanvas;

PDFCanvas.propTypes = {
    data: PropTypes.shape({
        endClamps: PropTypes.number.isRequired,
        rails: PropTypes.number.isRequired,
        centreClamps: PropTypes.number.isRequired,
        splices: PropTypes.number.isRequired,
        solarPanels: PropTypes.number.isRequired,
        roofHooks: PropTypes.number.isRequired,
        orientation: PropTypes.string.isRequired,
        numStrings: PropTypes.number.isRequired,
    }).isRequired
};