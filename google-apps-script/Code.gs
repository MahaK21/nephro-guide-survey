function doPost(e) {
  try {
    // Log the incoming request
    Logger.log("Received request");
    Logger.log("Request contents:", e.postData.contents);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Log the parsed data
    Logger.log("Parsed data:", data);
    Logger.log("Demographics:", data.demographics);
    Logger.log("NASA-TLX:", data.nasaTlx);
    Logger.log("Post-Eval:", data.postEval);

    // Flatten the data structure
    const row = [
      data.timestamp, // timestamp
      // Demographics
      data.demographics.participantId,
      data.demographics.trainingLevel,
      data.demographics.otherTrainingLevel || "",
      data.demographics.ultrasoundExperience,
      data.demographics.needlePlacements,
      // NASA-TLX Freehand
      data.nasaTlx.freehand.mentalDemand,
      data.nasaTlx.freehand.physicalDemand,
      data.nasaTlx.freehand.temporalDemand,
      data.nasaTlx.freehand.performance,
      data.nasaTlx.freehand.effort,
      data.nasaTlx.freehand.frustration,
      // NASA-TLX In-Plane Guide
      data.nasaTlx.inPlaneGuide.mentalDemand,
      data.nasaTlx.inPlaneGuide.physicalDemand,
      data.nasaTlx.inPlaneGuide.temporalDemand,
      data.nasaTlx.inPlaneGuide.performance,
      data.nasaTlx.inPlaneGuide.effort,
      data.nasaTlx.inPlaneGuide.frustration,
      // NASA-TLX Out-of-Plane Guide
      data.nasaTlx.outOfPlaneGuide.mentalDemand,
      data.nasaTlx.outOfPlaneGuide.physicalDemand,
      data.nasaTlx.outOfPlaneGuide.temporalDemand,
      data.nasaTlx.outOfPlaneGuide.performance,
      data.nasaTlx.outOfPlaneGuide.effort,
      data.nasaTlx.outOfPlaneGuide.frustration,
      // Post-Evaluation
      data.postEval.preferredTechnique,
      data.postEval.preferredTechniqueReason,
      data.postEval.mostAccurateTechnique,
      data.postEval.mostAccurateReason,
      data.postEval.clinicalChoice,
      data.postEval.clinicalChoiceReason,
    ];

    // Add the row to the sheet
    sheet.appendRow(row);
    Logger.log("Row added successfully");

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        result: "success",
        message: "Survey submitted successfully",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Log the error
    Logger.log("Error in doPost:", error);
    Logger.log("Error stack:", error.stack);

    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        result: "error",
        message: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle CORS preflight requests
function doOptions(e) {
  return ContentService.createTextOutput("").setMimeType(
    ContentService.MimeType.TEXT
  );
}
