/************************************************************
 * THE CROSSROADS DORMITORY APPLICATION 2026–2027
 *
 * AUTOMATIC SYSTEM:
 *
 * Google Form
 *      ↓
 * Candidate ID
 *      ↓
 * Google Drive Candidate Folder
 *      ├── 01 - Candidate - NAME
 *      ├── 02 - Candidate - NAME.pdf
 *      └── 03 - Photo - NAME
 *      ↓
 * Telegram
 *      ├── Candidate Photo
 *      └── Candidate Information + PDF Link
 ************************************************************/


// ==========================================================
// 1. CONFIGURATION
// ==========================================================

// Google Drive folder where ALL candidates will be stored.
//
// Example:
// https://drive.google.com/drive/folders/1ABCxyz123
//
// Copy only the ID after /folders/

const MAIN_FOLDER_ID =
  "1cbSifeUcRmtTQBQUFinHOHhYYOwQa7Zs";


// Telegram Bot Token
//
// Get this from @BotFather on Telegram.

const TELEGRAM_BOT_TOKEN =
  "8985484347:AAH6P_GYqoDZ-WP4jQFrz19ZdPJ0ADca5UA";


// Telegram Chat ID
//
// This can be your personal chat ID, group ID, or channel ID.

const bRithChatId = "868134930";
const groupChatId = "-1003704335807";

const TELEGRAM_CHAT_ID = groupChatId;

// ==========================================================
// 2. MAIN FUNCTION
// ==========================================================

function onFormSubmit(e) {

  try {

    // ------------------------------------------------------
    // Check event
    // ------------------------------------------------------

    if (!e || !e.namedValues) {
      throw new Error(
        "This function must be triggered by a Form Submit trigger."
      );
    }


    const responses = e.namedValues;

    // ------------------------------------------------------
    // Registration date
    // ------------------------------------------------------

    const registerDate = getTimestamp(e);

    // ------------------------------------------------------
    // Candidate ID
    // ------------------------------------------------------

    const candidateID = createCandidateID();

    // ------------------------------------------------------
    // Get candidate name
    // ------------------------------------------------------

    const khmerName = getAnswer(responses, ["Full name in Khmer"]);
    const latinName = getAnswer(responses, ["Full name in Latin"]);

    const sex = getAnswer(responses, ["Sex"]);
    const nationality = getAnswer(responses, ["Nationality"]);
    const dateOfBirth = getAnswer(responses, ["Candidate's Date of Birth"]);
    const placeOfBirth = getAnswer(responses, ["Place of Birth"]);
    const currentAddress = getAnswer(responses, ["Current Address"]);
    const telegramContact = getAnswer(responses, ["Telegram​ Contact"]);

    const highSchool = getAnswer(responses, ["High School"]);
    const majorAcademicStreams = getAnswer(responses, ["ប្រភេទថ្នាក់សិក្សា (Major academic streams )"]);
    const grade = getAnswer(responses, ["Examination Result"]);
    const gradeExpectation = getAnswer(responses, ["Grade Expectation from BacII"]);

    const selectaUniversity = getAnswer(responses, ["Select a University or College in Phnom Penh for Further Studies"]);
    const major = getAnswer(responses, ["ជំនាញឯកទេស (Major.)"]);
    const studyShift = getAnswer(responses, ["Study Shift"]);
    const year = getAnswer(responses, ["Year"]);
    const futurePlan = getAnswer(responses, ["Future Plan &Why"]);

    const addressinPhnomPenh = getAnswer(responses, ["Address of Sibling(s) or Relative(s) in Phnom Penh"]);
    const emergencyContact = getAnswer(responses, ["Emergency Contact Person in Phnom Penh"]);
    const occupation = getAnswer(responses, ["Occupation."]);
    const phoneNumber = getAnswer(responses, ["Phone Number"]);
    const relationship = getAnswer(responses, ["Relationship to Contact Person"]);
    const healthCondition = getAnswer(responses, ["Do you have any chronic illness or health condition?"]);

    const spiritually = getAnswer(responses, ["How do you identify spiritually?"]);
    const church = getAnswer(responses, ["Local Church Name"]);
    const baptized = getAnswer(responses, ["Baptized?"]);

    const livewith = getAnswer(responses, ["Who do you currently live with?"]);
    const fathername = getAnswer(responses, ["Father's Full Name"]);
    const dateofBirth1 = getAnswer(responses, ["Father's Date of Birth"]);
    const currentStatus1 = getAnswer(responses, ["Father's Current Status"]);
    const occupation1 = getAnswer(responses, ["Father's Occupation"]);
    const contactNumber1 = getAnswer(responses, ["Father's Contact Number"]);

    const mothername = getAnswer(responses, ["Mother's Full Name"]);
    const dateofBirth2 = getAnswer(responses, ["Mother's Date of Birth"]);
    const currentStatus2 = getAnswer(responses, ["Mother's Current Status"]);
    const occupation2 = getAnswer(responses, ["Mother's Occupation"]);
    const contactNumber2 = getAnswer(responses, ["Mother's Contact Number"]);

    const siblings = getAnswer(responses, ["How many siblings do you have?"]);
    const brothers = getAnswer(responses, ["បងប្អូនប្រុស / Brothers"]);
    const sisters = getAnswer(responses, ["បងប្អូនស្រី / Sisters"]);
    const birthorder = getAnswer(responses, ["What is your birth order in the family?"]);

    const whyhere = getAnswer(responses, ["Why do you want to live in this church-run dormitory? What do you expect from community life here?"]);
    const howhandle = getAnswer(responses, ["Living with many students as community life setting requires high mutual understanding. How do you handle conflicts or differing lifestyle habits with roommates?"]);
    const feelings = getAnswer(responses, ["Our dormitory has regular weekly programs of worship, Bible study, and prayer, based on Christian faith and following Jesus Christ. As a member of this community, how do you feel about participating in these activities and respecting the community's rules and guidelines?"]);
    const declaration = getAnswer(responses, ["Declaration and Confirmation of Information"]);

    const candidateName =
      latinName ||
      khmerName ||
      "Candidate-" + candidateID;


    const safeName =
      cleanFileName(candidateName);


    // ------------------------------------------------------
    // Main Drive folder
    // ------------------------------------------------------

    const mainFolder =
      DriveApp.getFolderById(
        MAIN_FOLDER_ID
      );


    // ------------------------------------------------------
    // Candidate folder
    // ------------------------------------------------------

    const candidateFolder =
      mainFolder.createFolder(
        candidateID + " - " + safeName
      );


    // ------------------------------------------------------
    // Find candidate photo
    // ------------------------------------------------------

    const photoQuestion =
      findQuestion(
        responses,
        [
          "ID Photo"
        ]
      );


    let photoFile = null;


    if (photoQuestion) {

      const photoId =
        extractDriveFileId(
          responses[photoQuestion]
        );


      if (photoId) {

        try {

          photoFile =
            DriveApp.getFileById(
              photoId
            );

        } catch (error) {

          Logger.log(
            "Photo could not be found: " +
            error
          );

        }

      }

    }


    // ------------------------------------------------------
    // Create Google Document
    // ------------------------------------------------------

    const doc =
      DocumentApp.create(
        safeName +
        " - " +
        candidateID
      );


    const docFile =
      DriveApp.getFileById(
        doc.getId()
      );


    // Move document into candidate folder

    candidateFolder.addFile(
      docFile
    );


    DriveApp
      .getRootFolder()
      .removeFile(docFile);


    // ------------------------------------------------------
    // A4 PAGE SETTINGS
    // ------------------------------------------------------

    const body =
      doc.getBody();


    // A4 dimensions in points

    body.setPageWidth(
      595.28
    );

    body.setPageHeight(
      841.89
    );


    // Margins

    body.setMarginTop(40);
    body.setMarginBottom(40);
    body.setMarginLeft(45);
    body.setMarginRight(45);


    // ------------------------------------------------------
    // DOCUMENT HEADER
    // ------------------------------------------------------

    const title =
      body.appendParagraph(
        "APPLICATION FORM 2026-2027"
      );


    title.setHeading(
      DocumentApp.ParagraphHeading.HEADING1
    );


    title.setAlignment(
      DocumentApp.HorizontalAlignment.CENTER
    );

    // Candidate ID

    const idParagraph =
      body.appendParagraph(
        "Candidate ID: " +
        candidateID
      );


    idParagraph.setAlignment(
      DocumentApp.HorizontalAlignment.CENTER
    );


    idParagraph.setBold(true);


    body.appendHorizontalRule();


    // ------------------------------------------------------
    // PHOTO
    // ------------------------------------------------------

    if (photoFile) {

      try {

        // const image =
        //   body.appendImage(
        //     photoFile.getBlob()
        //   );


        // // 4 x 6 style display

        // image.setWidth(120);
        // image.setHeight(160);

        const blob = photoFile.getBlob();
        const image = body.appendImage(blob);

        const origWidth = image.getWidth();
        const origHeight = image.getHeight();

        // Define max boundaries
        const maxWidth = 160;
        const maxHeight = 160;

        // Determine scaling factor to fit within boundaries
        const scale = Math.min(maxWidth / origWidth, maxHeight / origHeight);

        // Set proportional dimensions
        image.setWidth(origWidth * scale);
        image.setHeight(origHeight * scale);

        image
          .getParent()
          .asParagraph()
          .setAlignment(
            DocumentApp.HorizontalAlignment.CENTER
          );


        // Copy photo to candidate folder

        photoFile.makeCopy( 
          safeName +
          " - " +
          candidateID,
          candidateFolder
        );
      } catch (error) {
        Logger.log(
          "Could not insert/copy photo: " +
          error
        );
      }
    }


    // ------------------------------------------------------
    // BASIC INFORMATION
    // ------------------------------------------------------

    addDocumentSubSection(body, "I. ព័ត៌មានអំពីបេក្ខជន  (Personal Info)");


    addField(body, "ឈ្មោះពេញជាអក្សរខ្មែរ (Full name in Khmer)", khmerName);

    addField(body, "ឈ្មោះពេញជាអក្សរខ្មែរ (Full name in Khmer)", latinName);

    addField(body, "ភេទ (Sex)", sex);

    addField(body, "ជនជាតិ (Nationality)", nationality);

    addField(body, "ថ្ងៃខែឆ្នាំ កំណើត (Day of Birth)", dateOfBirth);

    addField(body, "ទីកន្លែងកំណើត (Place of Birth)", placeOfBirth);

    addField(body, "អាសយដ្ឋានបច្ចុប្បន្ន (Current Address)", currentAddress);

    addField(body, "លេខទូរស័ព្ទផ្ទាល់ខ្លួន (Telegram​ Contact)", telegramContact);

    addField(body, "មកពីវិទ្យាល័យឈ្មោះ (High School)", highSchool);

    addField(body, "ប្រភេទថ្នាក់សិក្សា (Major Academic Streams) ", majorAcademicStreams);

    addField(body, "លទ្ធផលប្រឡងទទួលបាន (Grade)", grade);

    addField(body, "និទ្ទេសរំពឹងថានឹងទទួលបាន ឬអាចទទួលបាន (Grade Expectation from BacII)", gradeExpectation);

    addField(body, "ជ្រើសរើសសាកលវិទ្យាល័យ ឬមហាវិទ្យាល័យនៅភ្នំពេញ សម្រាប់បន្តការសិក្សា", selectaUniversity);

    addField(body, "ជំនាញឯកទេស (Major)", major);

    addField(body, "វេនសិក្សា (Study Shift)", studyShift);

    addField(body, "ជានិស្សិតឆ្នាំទី (Year)", year);

    addField(body, "តើអ្នកមានគម្រោងចង់ធ្វើអ្វីនៅពេលអនាគត? ហេតុអ្វី? (Future Plan &Why)", futurePlan);

    addField(body, "អាសយដ្ឋានបងប្អូន ឬសាច់ញាតិនៅភ្នំពេញ (ប្រសិនបើមាន)", addressinPhnomPenh);

    addField(body, "បុគ្គលទំនាក់ទំនងក្នុងករណីមានអាសន្ននៅភ្នំពេញ", emergencyContact);

    addField(body, "មុខរបរ (Occupation.)", occupation);

    addField(body, "លេខទូរស័ព្ទ (Phone Number)", phoneNumber);

    addField(body, "តើបុគ្គលខាងលើមានទំនាក់ទំនងអ្វីជាមួយអ្នក?", relationship);

    addField(body, "តើអ្នកមានជំងឺប្រចាំកាយ ឬបញ្ហាសុខភាពណាមួយដែរឬទេ? បើមាន សូមបញ្ជាក់អំពីជំងឺ ឬអាការៈរោគ។", healthCondition);

    addDocumentSubSection(body, "II. ស្ថានភាពជំនឿសាសនា (Spiritual & Religious Background)");


    addField(body, "តើអ្នកកំណត់អត្តសញ្ញាណខ្លួនឯងក្នុងជំនឿសាសនាមួយណា? (How do you identify spiritually?", spiritually);

    addField(body, "ឈ្មោះព្រះវិហារបច្ចុប្បន្ន (Local Church Name)", church);

    addField(body, "តើអ្នកបានទទួលបុណ្យជ្រមុជទឹកហើយឬនៅ? (Baptized?)", baptized);

    addDocumentSubSection(body, "III. ប្រវត្តិគ្រួសារ (Family Background)");


    addField(body, "តើបច្ចុប្បន្ន អ្នករស់នៅជាមួយអ្នកណា? Who do you currently live with?", livewith);

    addField(body, "ឈ្មោះពេញរបស់ឪពុក (Father's Full Name)", fathername);

    addField(body, "ថ្ងៃ ខែ ឆ្នាំកំណើត (Date of Birth)", dateofBirth1);

    addField(body, "ស្ថានភាពរស់នៅ (Current Status)", currentStatus1);

    addField(body, "មុខរបរ (Occupation)", occupation1);

    addField(body, "លេខទំនាក់ទំនង (Contact Number", contactNumber1);

    addField(body, "ឈ្មោះពេញរបស់ម្តាយ (Mother's Full Name)", mothername);

    addField(body, "ថ្ងៃ ខែ ឆ្នាំកំណើត (Date of Birth)", dateofBirth2);

    addField(body, "ស្ថានភាពរស់នៅ (Current Status)", currentStatus2);

    addField(body, "មុខរបរ (Occupation)", occupation2);

    addField(body, "លេខទំនាក់ទំនង (Contact Number)", contactNumber2);

    addField(body, "តើអ្នកមានបងប្អូនប៉ុន្មាននាក់?", siblings);

    addField(body, "បងប្អូនប្រុស (Brothers)", brothers);

    addField(body, "បងប្អូនស្រី (Sisters)", sisters);

    addField(body, "តើអ្នកជាកូនទីប៉ុន្មានក្នុងគ្រួសារ?", birthorder);

    addDocumentSubSection(body, "IV. សំណួរឆ្លុះបញ្ចាំងពីបុគ្គលិកលក្ខណៈ (Written Reflection Questions)");

    addField(body, "ហេតុអ្វីបានជាអ្នកចង់មកស្នាក់នៅក្នុងអន្តេវាសិកដ្ឋានដែលគ្រប់គ្រងដោយព្រះវិហារគ្រីស្ទបរិស័ទនេះ? តើអ្នករំពឹងអ្វីខ្លះពីការរស់នៅជាសហគមន៍នៅទីនេះ?", whyhere);

    addField(body, "ការរស់នៅជុំគ្នាច្រើននាក់ជាសហគមន៍ អាចមានភាពស្មុគស្មាញ និងទាមទារការយោគយល់គ្នាខ្ពស់។ តើអ្នកមានវិធីសាស្ត្រដោះស្រាយយ៉ាងណា ប្រសិនបើមានទាស់ទែងពាក្យសម្តី ឬទម្លាប់រស់នៅជាមួយមិត្តរួមសយនដ្ឋាន?", howhandle);

    addField(body, "អន្តេវាសិកដ្ឋានរបស់យើងមានកម្មវិធីថ្វាយបង្គំ ការរៀនព្រះបន្ទូល និងការអធិស្ឋានជាប្រចាំសប្តាហ៍ ដែលផ្អែកលើជំនឿ និងការរស់នៅតាមព្រះយេស៊ូវគ្រីស្ទ។ ក្នុងនាមជាសមាជិកនៃសហគមន៍នេះ តើអ្នកមានឆន្ទៈ និងអារម្មណ៍យ៉ាងដូចម្តេចចំពោះការចូលរួមក្នុងកម្មវិធីទាំងនេះ និងការគោរពបទប្បញ្ញត្តិនៃការរស់នៅរួមគ្នា?", feelings);


    // ------------------------------------------------------
    // REGISTRATION DATE
    // ------------------------------------------------------

    addField(body, "ចុះឈ្មោះនៅថ្ងៃទី (Register date)", registerDate);


    // ------------------------------------------------------
    // SAVE DOCUMENT
    // ------------------------------------------------------

    doc.saveAndClose();


    // ------------------------------------------------------
    // CREATE PDF
    // ------------------------------------------------------

    const pdfBlob = docFile.getAs(MimeType.PDF);


    pdfBlob.setName(
      safeName +
      " - " +
      candidateID +
      ".pdf"
    );


    const pdfFile = candidateFolder.createFile(pdfBlob);


    // ------------------------------------------------------
    // PDF LINK
    // ------------------------------------------------------

    const pdfLink = pdfFile.getUrl();


    // ------------------------------------------------------
    // TELEGRAM MESSAGE
    // ------------------------------------------------------

    const telegramMessage = createTelegramMessage(
      candidateID,
      khmerName,
      latinName,
      sex,
      nationality,
      telegramContact,
      majorAcademicStreams,
      grade,
      gradeExpectation,
      selectaUniversity,
      major,
      studyShift,
      emergencyContact,
      phoneNumber,
      pdfLink,
      registerDate
    );


    // ------------------------------------------------------
    // SEND PHOTO TO TELEGRAM
    // ------------------------------------------------------

    if (photoFile) {
      sendTelegramPhoto(photoFile, telegramMessage);
    } else {
      sendTelegramMessage(telegramMessage);
    }

    // ------------------------------------------------------
    // UPDATE GOOGLE SHEET
    // ------------------------------------------------------

    const sheet = e.range.getSheet();
    const row = e.range.getRow();

    // Set headers AX:BC
    sheet.getRange(1, 50, 1, 6).setValues([[
      "Candidate ID",
      "Google Docs Link",
      "PDF Form Link",
      "Candidate Folder Link",
      "Telegram Status",
      "System Status"
    ]]);

    // Add candidate information to the submitted row
    sheet.getRange(row, 50, 1, 6).setValues([[
      candidateID,              // AX
      docFile.getUrl(),         // AY
      pdfFile.getUrl(),         // BZ
      candidateFolder.getUrl(), // BA
      "Sent",                   // BB
      "Completed"               // BC
    ]]);

    // ------------------------------------------------------
    // LOG
    // ------------------------------------------------------

    Logger.log("SUCCESS");


    Logger.log("Candidate ID: " + candidateID);


    Logger.log("Candidate: " + candidateName);


    Logger.log("PDF: " + pdfLink);

  } catch (error) {
    Logger.log("ERROR: " + error.stack);
    throw error;
  }

}

// ==========================================================
// CREATE CANDIDATE ID
// ==========================================================

function createCandidateID() {

  const properties =
    PropertiesService
      .getScriptProperties();


  let number =
    parseInt(
      properties.getProperty(
        "CANDIDATE_NUMBER"
      ) || "0",
      10
    );


  number++;


  properties.setProperty(
    "CANDIDATE_NUMBER",
    number.toString()
  );


  const paddedNumber =
    String(number)
      .padStart(4, "0");


  return (
    "CR-" +
    "2026-2027" +
    "-" +
    paddedNumber
  );

}

// ==========================================================
// GET TIMESTAMP
// ==========================================================

function getTimestamp(e) {


  let date;


  if (
    e &&
    e.values &&
    e.values.length > 0
  ) {

    date =
      new Date(
        e.values[0]
      );

  }


  if (
    !date ||
    isNaN(date.getTime())
  ) {

    date =
      new Date();

  }


  return Utilities.formatDate(
    date,
    Session.getScriptTimeZone(),
    "dd MMMM yyyy, hh:mm a"
  );

}

// ==========================================================
// CREATE TELEGRAM MESSAGE
// ==========================================================
function createTelegramMessage(
  candidateID,
  khmerName,
  latinName,
  sex,
  nationality,
  telegramContact,
  majorAcademicStreams,
  grade,
  gradeExpectation,
  selectaUniversity,
  major,
  studyShift,
  emergencyContact,
  phoneNumber,
  pdfLink,
  registerDate
) {
  return (
    "📋 Candidate ID: " + candidateID + "\n\n" +
    "- ឈ្មោះ(Khmer): " + khmerName + "\n" +
    "- ឈ្មោះ(English): " + latinName + "\n" +
    "- ភេទ: " + sex + "\n" +
    "- សញ្ជាតិ: " + nationality + "\n" +
    "- លេខទូរស័ព្ទផ្ទាល់ខ្លួន: " + telegramContact + "\n" +
    "- ប្រភេទថ្នាក់សិក្សា: " + majorAcademicStreams + "\n" +
    "- និទ្ទេស: " + grade + "\n" +
    "- និទ្ទេសរំពឹងទុក: " + gradeExpectation + "\n" +
    "- សាកលវិទ្យាល័យ: " + selectaUniversity + "\n" +
    "- ជំនាញឯកទេស: " + major + "\n" +
    "- វេនសិក្សា: " + studyShift + "\n" +
    "- បុគ្គលទំនាក់ទំនងក្នុងករណីមានអាសន្ននៅភ្នំពេញ: " + emergencyContact + "(" + phoneNumber + ")\n\n" +
    "📄 PDF Form:\n" + pdfLink + "\n\n" +
    "ចុះឈ្មោះនៅថ្ងៃទី (Register date): " + registerDate
  );
}


// ==========================================================
// SEND TELEGRAM MESSAGE
// ==========================================================

function sendTelegramMessage(message) {
  const url =
    "https://api.telegram.org/bot" +
    TELEGRAM_BOT_TOKEN +
    "/sendMessage";


  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
    disable_web_page_preview: false
  };


  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };


  const response = UrlFetchApp.fetch(url, options);

  Logger.log(response.getContentText());
}


// ==========================================================
// SEND PHOTO + MESSAGE TO TELEGRAM
// ==========================================================

function sendTelegramPhoto(photoFile, caption) {
  const url =
    "https://api.telegram.org/bot" +
    TELEGRAM_BOT_TOKEN +
    "/sendPhoto";


  const blob = photoFile.getBlob();

  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    caption: caption,
    photo: blob
  };

  const options = {
    method: "post",
    payload: payload,
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);

  Logger.log(response.getContentText());
}


// ==========================================================
// GET ANSWER
// ==========================================================

function getAnswer(responses, possibleNames) {

  const keys = Object.keys(responses);

  for (let i = 0; i < possibleNames.length; i++) {

    const wanted =
      possibleNames[i]
        .toLowerCase()
        .trim();


    for (let j = 0; j < keys.length; j++) {
      const actual = keys[j].toLowerCase().trim();

      if (
        actual === wanted ||
        actual.includes(wanted) ||
        wanted.includes(actual)

      ) {
        const value = responses[keys[j]];

        if (Array.isArray(value)) {
          return value[0] || "";
        }
        return value || "";
      }
    }
  }
  return "";
}


// ==========================================================
// FIND QUESTION
// ==========================================================

function findQuestion(responses, possibleNames) {

  const keys =
    Object.keys(responses);


  for (
    let i = 0;
    i < keys.length;
    i++
  ) {


    const key =
      keys[i].toLowerCase();


    for (
      let j = 0;
      j < possibleNames.length;
      j++
    ) {


      if (
        key.includes(
          possibleNames[j]
            .toLowerCase()
        )
      ) {

        return keys[i];

      }

    }

  }
  return null;
}


// ==========================================================
// EXTRACT GOOGLE DRIVE FILE ID
// ==========================================================

function extractDriveFileId(value) {
  if (!value) {
    return null;
  }

  const text =
    Array.isArray(value)
      ? value.join(",")
      : String(value);


  const match = text.match(/[-\w]{25,}/);

  if (match) {
    return match[0];
  }
  return null;
}


// ==========================================================
// CLEAN FILE NAME
// ==========================================================

function cleanFileName(name) {
  return String(name)
    .replace(
      /[\\\/:*?"<>|#%{}]/g,
      ""
    )
    .trim()
    .substring(0, 100);
}


// ==========================================================
// ADD DOCUMENT SECTION
// ==========================================================

function addDocumentSubSection(body, title) {
  const paragraph = body.appendParagraph(title);
  paragraph.setHeading(DocumentApp.ParagraphHeading.HEADING3);
  paragraph.editAsText().setForegroundColor("#000000");
  paragraph.setBold(true);
  body.appendParagraph("");
}


// ==========================================================
// ADD FIELD
// ==========================================================

function addField(body, label, value) {
  const paragraph = body.appendParagraph("");

  paragraph.appendText("- " + label + ": ");

  paragraph.appendText(value || "N/A");
  body.appendParagraph("");
}


// ==========================================================
// ADD ALL FORM RESPONSES
// ==========================================================

function addAllResponses(body, responses) {
  Object.keys(
    responses
  ).forEach(
    function (question) {

      // Don't duplicate the uploaded photo field

      if (question.includes("photo")) {
        return;
      }


      const answer =
        Array.isArray(
          responses[question]
        )
          ? responses[question].join(", ")
          : responses[question];


      addField(
        body,
        question,
        answer
      );
    }
  );
}
