let isPortrait;

const DrawInstallationStructure = (canvasRef, data) => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // A4: [595.28, 841.89],
    // Define constants for A4 paper dimensions in millimeters
    const A4_WIDTH_MM = 210;
    const A4_HEIGHT_MM = 297;

    // Determine canvas dimensions based on orientation
    let width, height;
    if (data.orientation === 'Portrait') {
        width = A4_WIDTH_MM;
        height = A4_HEIGHT_MM;
        canvas.width = width;
        canvas.height = height;
    } else {
        width = A4_HEIGHT_MM;
        height = A4_WIDTH_MM;
        canvas.width = width;
        canvas.height = height;
    }

    // Convert millimeters to pixels based on desired DPI (dots per inch)
    const DPI = 96; // Adjust DPI as needed
    canvas.width = width * DPI / 25.4;
    canvas.height = height * DPI / 25.4;

    // Draw splices
    drawSplices({ ctx: ctx, numSplices: data.splices, spliceWidth: 50, spliceHeight: 50, padding: 10 });

    // Draw rails
    drawRails(
        { ctx: ctx, numRails: data.rails, railHeight: 10, canvasWidth: canvas.width, canvasHeight: canvas.height }
    );

    // Draw panels based on the data
    drawPanels({ ctx: ctx, numPanels: data.solarPanels, width: 50, height: 100, orientation: data.orientation });


    // Draw end clamps
    drawEndClamps(
        { ctx: ctx, numClamps: data.endClamps, clampSize: 10, canvasHeight: canvas.height, railHeight: 10, panelHeight: 100, padding: 10 }
    );

    // Draw centre clamps
    drawCentreClamps({ ctx: ctx, numClamps: data.endClamps, clampSize: 10, canvasHeight: canvas.height, padding: 10 })

    // Draw roof hooks
    drawRoofHooks({ ctx: ctx, numHooks: data.endHooks, hookSize: 10, padding: 10 });
};

const drawCentreClamps = ({ ctx, numClamps, clampSize, canvasHeight, padding = 10 }) => {
    const clampY = canvasHeight / 2 - clampSize / 2; // Clamps are drawn in the middle of the canvas

    for (let i = 0; i < numClamps; i++) {
        const x = padding + i * (clampSize + padding);

        // Draw a rectangle representing the centre clamp
        ctx.fillStyle = 'purple';
        ctx.fillRect(x, clampY, clampSize, clampSize);
    }
}

const drawEndClamps = ({ ctx, numClamps, clampSize = 10, canvasHeight, railHeight, panelHeight, padding = 10 }) => {
    const clampY = canvasHeight - panelHeight - railHeight - padding * 2;

    for (let i = 0; i < numClamps; i++) {
        const x = padding + i * (clampSize + padding);

        // Draw a rectangle representing the end clamp
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x, clampY, clampSize, clampSize);
    }
}

const drawPanels = ({ ctx, numPanels, width = 50, height = 100, padding = 10, orientation }) => {
    for (let i = 0; i < numPanels; i++) {
        const x = padding + i * (width + padding);
        const y = padding;

        // Draw a rectangle representing the panel
        ctx.fillStyle = '#2563EB';
        ctx.fillRect(x, y, width, height);
    }
}

const drawRails = ({ ctx, numRails, railHeight = 10, canvasWidth, canvasHeight, padding = 10 }) => {
    const railWidth = canvasWidth;
    const railY = canvasHeight - railHeight - padding; // Rail is drawn at the bottom of the canvas

    for (let i = 0; i < numRails; i++) {
        const x = padding;
        const y = railY;

        // Draw a rectangle representing the rail
        ctx.fillStyle = 'green';
        ctx.fillRect(x, y, railWidth, railHeight);
    }
}

const drawRoofHooks = ({ ctx, numHooks, hookSize, padding = 10 }) => {
    const hookY = 0; // Hooks are drawn at the top of the canvas

    for (let i = 0; i < numHooks; i++) {
        const x = padding + i * (hookSize + padding);

        // Draw a rectangle representing the hook
        ctx.fillStyle = 'red';
        ctx.fillRect(x, hookY, hookSize, hookSize);
    }
}

const drawSplices = ({ ctx: ctx, numSplices, spliceWidth, spliceHeight, canvasHeight, padding }) => {
    const spliceY = canvasHeight / 2 - spliceHeight / 2; // Splices are drawn in the middle of the canvas

    for (let i = 0; i < numSplices; i++) {
        const x = padding + i * (spliceWidth + padding);

        // Draw a rectangle representing the splice
        ctx.fillStyle = 'orange';
        ctx.fillRect(x, spliceY, spliceWidth, spliceHeight);
    }
}

const getMaxPanelsInAString = (data) => {
    console.log(data);
}

export default DrawInstallationStructure;