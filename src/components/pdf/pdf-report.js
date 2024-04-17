import PropTypes from 'prop-types';
import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet, Svg, Font, Circle } from '@react-pdf/renderer';
import PDFCanvas from './pdf-canvas';

// PDF Styles
const styles = StyleSheet.create({
    page: {
        dpi: 108,
        style: {
            padding: 56
        }
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 40
    },
    headerText: {
        marginVertical: 'auto',
        color: 'rgb(55 65 81)',
        textTransform: 'capitalize',
        fontSize: 28,
        fontFamily: 'Montserrat',
        fontWeight: 800,
        letterSpacing: -0.8,
        alignSelf: 'middle',
    },
    headerLogo: {
        width: 100,
        height: 100,
        aspectRatio: "16/9",
        alt: "Company site",
        margin: 4
    },
    letterheadView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 56
    },
    text: {
        color: 'rgb(31 41 55)',
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontWeight: 600,
        height: 18,
        marginBottom: 4
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        alignItems: 'center',
    },
    tableHeader: {
        color: '#374151',
        fontWeight: 600,
        backgroundColor: '#D1D5DB',
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    tableCell: {
        fontSize: 14,
        fontFamily: 'Montserrat',
        fontWeight: 300,
        paddingHorizontal: 16,
        paddingVertical: 4,
        textAlign: 'center',
        backgroundColor: 'rgb(229 231 235 / 0.7)'
    },
    tableDescriptionCell: {
        borderRightWidth: 2,
        borderRightColor: 'white',
        textAlign: 'start',
        width: '67%'
    },
    tableQuantityCell: {
        width: '33% - 2px'
    },
    diagramIndicatorsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    indicator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    circle: {
        width: 14,
        height: 14,
        backgroundColor: 'rgb(219 39 119)',
        borderRadius: 7,
        marginRight: 5,
    },
    circleGreen: {
        width: 14,
        height: 14,
        backgroundColor: 'rgb(22 163 74)',
        borderRadius: 7,
        marginRight: 5,
    },
    circleYellow: {
        width: 14,
        height: 14,
        backgroundColor: 'rgb(234 179 8)',
        borderRadius: 7,
        marginRight: 5,
    },
    circleOrange: {
        width: 14,
        height: 14,
        backgroundColor: 'rgb(234 88 12)',
        borderRadius: 7,
        marginRight: 5,
    },
    circleBlue: {
        width: 14,
        height: 14,
        backgroundColor: 'rgb(30 58 138)',
        borderRadius: 7,
        marginRight: 5,
    },
    circleRed: {
        width: 14,
        height: 14,
        backgroundColor: 'rgb(220 38 38)',
        borderRadius: 7,
        marginRight: 5,
    },
    indicatorDescritpionText: {
        fontSize: 12,
        fontWeight: 300,
        color: 'rgb(31, 41, 55)',
        textTransform: 'capitalize',
        marginRight: 10,
    },
    indicatorQuantityText: {
        fontSize: 12,
        color: 'rgb(31, 41, 55)',
        fontWeight: 300,
    },
});

// Register fonts
Font.register({
    family: 'Montserrat',
    fonts: [
        { src: '/fonts/montserrat/Montserrat-Thin.ttf', fontStyle: 'normal', fontWeight: 100 },
        { src: '/fonts/montserrat/Montserrat-ExtraLight.ttf', fontStyle: 'normal', fontWeight: 200 },
        { src: '/fonts/montserrat/Montserrat-Light.ttf', fontStyle: 'normal', fontWeight: 300 },
        { src: '/fonts/montserrat/Montserrat-Regular.ttf', fontStyle: 'normal', fontWeight: 400 },
        { src: '/fonts/montserrat/Montserrat-Medium.ttf', fontStyle: 'normal', fontWeight: 500 },
        { src: '/fonts/montserrat/Montserrat-SemiBold.ttf', fontStyle: 'normal', fontWeight: 600 },
        { src: '/fonts/montserrat/Montserrat-Bold.ttf', fontStyle: 'normal', fontWeight: 700 },
        { src: '/fonts/montserrat/Montserrat-ExtraBold.ttf', fontStyle: 'normal', fontWeight: 800 },
        { src: '/fonts/montserrat/Montserrat-Black.ttf', fontStyle: 'normal', fontWeight: 900 },
        { src: '/fonts/montserrat/Montserrat-ThinItalic.ttf', fontStyle: 'italic', fontWeight: 100 },
        { src: '/fonts/montserrat/Montserrat-ExtraLightItalic.ttf', fontStyle: 'italic', fontWeight: 200 },
        { src: '/fonts/montserrat/Montserrat-LightItalic.ttf', fontStyle: 'italic', fontWeight: 300 },
        { src: '/fonts/montserrat/Montserrat-Italic.ttf', fontStyle: 'italic', fontWeight: 400 },
        { src: '/fonts/montserrat/Montserrat-MediumItalic.ttf', fontStyle: 'italic', fontWeight: 500 },
        { src: '/fonts/montserrat/Montserrat-SemiBoldItalic.ttf', fontStyle: 'italic', fontWeight: 600 },
        { src: '/fonts/montserrat/Montserrat-BoldItalic.ttf', fontStyle: 'italic', fontWeight: 700 },
        { src: '/fonts/montserrat/Montserrat-ExtraBoldItalic.ttf', fontStyle: 'italic', fontWeight: 800 },
        { src: '/fonts/montserrat/Montserrat-BlackItalic.ttf', fontStyle: 'italic', fontWeight: 900 },
    ]
});

Font.register({
    family: 'Noto',
    fonts: [
        { src: '/fonts//noto/NotoSans-Thin.ttf', fontStyle: 'normal', fontWeight: 100 },
        { src: '/fonts//noto/NotoSans-ExtraLight.ttf', fontStyle: 'normal', fontWeight: 200 },
        { src: '/fonts//noto/NotoSans-Light.ttf', fontStyle: 'normal', fontWeight: 300 },
        { src: '/fonts//noto/NotoSans-Regular.ttf', fontStyle: 'normal', fontWeight: 400 },
        { src: '/fonts//noto/NotoSans-Medium.ttf', fontStyle: 'normal', fontWeight: 500 },
        { src: '/fonts//noto/NotoSans-SemiBold.ttf', fontStyle: 'normal', fontWeight: 600 },
        { src: '/fonts//noto/NotoSans-Bold.ttf', fontStyle: 'normal', fontWeight: 700 },
        { src: '/fonts//noto/NotoSans-ExtraBold.ttf', fontStyle: 'normal', fontWeight: 800 },
        { src: '/fonts//noto/NotoSans-Black.ttf', fontStyle: 'normal', fontWeight: 900 },
        { src: '/fonts//noto/NotoSans-ThinItalic.ttf', fontStyle: 'italic', fontWeight: 100 },
        { src: '/fonts//noto/NotoSans-ExtraLightItalic.ttf', fontStyle: 'italic', fontWeight: 200 },
        { src: '/fonts//noto/NotoSans-LightItalic.ttf', fontStyle: 'italic', fontWeight: 300 },
        { src: '/fonts//noto/NotoSans-Italic.ttf', fontStyle: 'italic', fontWeight: 400 },
        { src: '/fonts//noto/NotoSans-MediumItalic.ttf', fontStyle: 'italic', fontWeight: 500 },
        { src: '/fonts//noto/NotoSans-SemiBoldItalic.ttf', fontStyle: 'italic', fontWeight: 600 },
        { src: '/fonts//noto/NotoSans-BoldItalic.ttf', fontStyle: 'italic', fontWeight: 700 },
        { src: '/fonts//noto/NotoSans-ExtraBoldItalic.ttf', fontStyle: 'italic', fontWeight: 800 },
        { src: '/fonts//noto/NotoSans-BlackItalic.ttf', fontStyle: 'italic', fontWeight: 900 },
    ]
});


// Gets the Table Data 
const getTableData = (structureData) => {
    return [
        { item: "End clamps", qty: structureData.endClamps },
        { item: "Rails", qty: structureData.rails },
        { item: "Centre clamps", qty: structureData.centreClamps },
        { item: "Splices", qty: structureData.splices },
        { item: "Solar panels", qty: structureData.solarPanels },
        { item: "Roof hooks", qty: structureData.roofHooks },
    ];
};

function PDFReport({ structureData }) {
    return (
        <Document
            title={`Solar Installation Report - ${structureData.reportNumber}`}
            author="kxmo@dev.gmail.com"
            subject={
                `Solar Installation Report - ${structureData.reportNumber} for Project (${structureData.project})`
            }
        >
            <Page {...styles.page} >
                {/* Header */}
                <View style={styles.headerView}>
                    <Image style={styles.headerLogo} src="/images/pdf-logo.png" />
                    <Text style={styles.headerText}>Installation Report</Text>
                </View>

                {/* Letterhead */}
                <View style={styles.letterheadView}>
                    {/* Address */}
                    <View>
                        <Text style={styles.text}>Randburg</Text>
                        <Text style={styles.text}>Northriding Commercial Park,</Text>
                        <Text style={styles.text}>251 Aintree Ave, Northriding,</Text>
                        <Text style={styles.text}>Randburg, 2169</Text>
                    </View>

                    {/* Report details */}
                    <View>
                        <Text style={styles.text}>
                            Report No.:
                            <Text style={{ fontWeight: 400, textTransform: 'capitalize' }}>
                                &nbsp;{structureData.reportNumber}
                            </Text>
                        </Text>
                        <Text style={styles.text}>
                            Report Date:
                            <Text style={{ fontWeight: 400, textTransform: 'capitalize' }}>
                                &nbsp;{structureData.reportDate}
                            </Text>
                        </Text>
                        <Text style={styles.text}>
                            Project ID:
                            <Text style={{ fontWeight: 400, textTransform: 'capitalize' }}>
                                &nbsp;{structureData.projectId}
                            </Text>
                        </Text>
                        <Text style={styles.text}>
                            Client Name:
                            <Text style={{ fontWeight: 400, textTransform: 'capitalize' }}>
                                &nbsp;{structureData.clientName}
                            </Text>
                        </Text>
                    </View>
                </View>

                {/* Summary of inputs */}
                <View>
                    <Text style={[styles.text, { marginBottom: 8 }]}>Summary of inputs:</Text>

                    <View style={{ marginLeft: 8 }}>
                        <Text>
                            <Text style={{ marginBottom: 4, fontWeight: 900, color: "rgb(55 65 81)" }}>
                                {'\u2022' + " "}
                            </Text>
                            <Text style={[styles.text, { fontWeight: 500 }]}>
                                &nbsp;Number of Panels:
                                <Text style={[styles.text, { fontWeight: 400 }]}>
                                    &nbsp;{structureData.solarPanels}
                                </Text>
                            </Text>
                        </Text>
                    </View>
                    <View style={{ marginLeft: 8 }}>
                        <Text>
                            <Text style={{ marginBottom: 4, fontWeight: 900, color: "rgb(55 65 81)" }}>
                                {'\u2022' + " "}
                            </Text>
                            <Text style={[styles.text, { fontWeight: 500 }]}>
                                &nbsp;Number of Strings:
                                <Text style={[styles.text, { fontWeight: 400 }]}>
                                    &nbsp;{structureData.numStrings}
                                </Text>
                            </Text>
                        </Text>
                    </View>
                    <View style={{ marginLeft: 8 }}>
                        <Text>
                            <Text style={{ marginBottom: 4, fontWeight: 900, color: "rgb(55 65 81)" }}>
                                {'\u2022' + " "}
                            </Text>
                            <Text style={[styles.text, { fontWeight: 500 }]}>
                                &nbsp;Orientation of Strings:
                                <Text style={[styles.text, { fontWeight: 400 }]}>
                                    &nbsp;{structureData.orientation} Orientation
                                </Text>
                            </Text>
                        </Text>
                    </View>
                </View>

                {/* Summary of components */}
                <View style={{ paddingTop: 32, paddingBottom: 1, borderBottomWidth: 2, borderColor: '#D1D5DB' }}>
                    <Text style={[styles.text, { marginBottom: 8 }]}>Structure Components</Text>

                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, styles.tableHeader, styles.tableDescriptionCell]}>Item</Text>
                        <Text style={[styles.tableCell, styles.tableHeader, styles.tableQuantityCell]}>Qty</Text>
                    </View>

                    {getTableData(structureData).map((entry, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={[styles.tableCell, styles.tableDescriptionCell]}>{entry.item}</Text>
                            <Text style={[styles.tableCell, styles.tableQuantityCell]}>{entry.qty}</Text>
                        </View>
                    ))}
                </View>

                {/* Structure diagram */}
                <View style={{ paddingTop: 32, paddingBottom: 56, width: "100%"}}>
                    {/* Diagram header  */}
                    <Text style={styles.text}>Structure diagram:</Text>

                    {/*Diagram */}
                    <PDFCanvas data={{
                        endClamps: structureData.endClamps,
                        rails: structureData.rails,
                        centreClamps: structureData.centreClamps,
                        splices: structureData.splices,
                        solarPanels: structureData.solarPanels,
                        roofHooks: structureData.roofHooks,
                        orientation: structureData.orientation,
                        numStrings: structureData.numStrings,
                    }} />

                    {/* Diagram figure structures indicators */}
                    <View style={styles.diagramIndicatorsContainer}>
                        {/* End Clamps */}
                        <View style={styles.indicator}>
                            <View style={styles.circle} />
                            <Text style={styles.indicatorDescritpionText}>End Clamps</Text>
                            <Text style={styles.indicatorQuantityText}>{structureData.endClamps}</Text>
                        </View>

                        {/* Rails */}
                        <View style={styles.indicator}>
                            <View style={styles.circleGreen} />
                            <Text style={styles.indicatorDescritpionText}>Rails</Text>
                            <Text style={styles.indicatorQuantityText}>{structureData.rails}</Text>
                        </View>

                        {/* Centre Clamps */}
                        <View style={styles.indicator}>
                            <View style={styles.circleYellow} />
                            <Text style={styles.indicatorDescritpionText}>Centre Clamps</Text>
                            <Text style={styles.indicatorQuantityText}>{structureData.centreClamps}</Text>
                        </View>

                        {/* Splices */}
                        <View style={styles.indicator}>
                            <View style={styles.circleOrange} />
                            <Text style={styles.indicatorDescritpionText}>Splices</Text>
                            <Text style={styles.indicatorQuantityText}>2</Text>
                        </View>

                        {/* Solar Panels */}
                        <View style={styles.indicator}>
                            <View style={styles.circleBlue} />
                            <Text style={styles.indicatorDescritpionText}>Solar Panels</Text>
                            <Text style={styles.indicatorQuantityText}>{structureData.solarPanels}</Text>
                        </View>

                        {/* Roof Hooks */}
                        <View style={styles.indicator}>
                            <View style={styles.circleRed} />
                            <Text style={styles.indicatorDescritpionText}>Roof Hooks</Text>
                            <Text style={styles.indicatorQuantityText}>{structureData.roofHooks}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default PDFReport;

PDFReport.propTypes = {
    structureData: PropTypes.shape({
        clientName: PropTypes.string.isRequired,
        reportNumber: PropTypes.number.isRequired,
        projectId: PropTypes.number.isRequired,
        reportDate: PropTypes.string.isRequired,
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