/**
 * Code.gs - Google Apps Script Automation Engine
 * Handles Google Form generation, submission trigger, spreadsheet scoring,
 * HTML email generation, and Telegram notification dispatch.
 */

// ==========================================
// 2. SCORING & TRIGGER ENGINE
// ==========================================

/**
 * Main form submission handler.
 * Runs on form submit, scores 112 gifts and 24 DISC questions, updates sheet,
 * emails candidate, and sends Telegram alert.
 */


const personalityAssessmentDetails = "https://drive.google.com/file/d/157kDWwA9EySKB53YYD2NPFpSniWFhFCb/view?usp=sharing";
const spiritualityAssessmentDetails = "https://drive.google.com/file/d/1ED-t5S1hFXBzBAEYxt7VlJwuHRQKHITN/view?usp=sharing";

function onFormSubmit(e) {
  try {
    const sheet = e.range ? e.range.getSheet() : SpreadsheetApp.getActiveSheet();
    const row = e.range ? e.range.getRow() : sheet.getLastRow();

    // const sheet = SpreadsheetApp.getActiveSheet();
    // const row = sheet.getLastRow();

    // Retrieve submission row values
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const values = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];

    const respondent = {
      timestamp: "",
      email: "",
      nameKhmer: "",
      nameLatin: "",
      sex: "",
      telegram: ""
    };

    // Map each header to the corresponding key using specific keywords
    for (let c = 0; c < Math.min(headers.length, 7); c++) {
      const h = (headers[c] || "").toString().toLowerCase();
      const v = values[c] ? values[c].toString().trim() : "";

      if (h.includes("timestamp")) {
        respondent.timestamp = v;
      } else if (h.includes("email") || h.includes("អ៊ីមែល")) {
        respondent.email = v;
      } else if (h.includes("khmer") || h.includes("អក្សរខ្មែរ")) {
        respondent.nameKhmer = v;
      } else if (h.includes("latin") || h.includes("ឡាតាំង")) {
        respondent.nameLatin = v;
      } else if (h.includes("sex") || h.includes("gender") || h.includes("ភេទ")) {
        respondent.sex = v;
      } else if (h.includes("telegram") || h.includes("ទូរស័ព្ទ")) {
        respondent.telegram = v;
      }
    }

    // Convenient fallbacks if needed
    const respondentEmail = respondent.email;
    const respondentName = respondent.nameLatin || respondent.nameKhmer;

    // ----------------------------------------------------
    // 1. EXTRACT & SCORE SPIRITUAL GIFTS 
    // ----------------------------------------------------


    // Extract answers arrays from the submission row
    const giftAnswers = values.slice(6, 118);   // (112 items)
    const discAnswers = values.slice(118, 142); // (24 items)


    const categoryTotals = {};
    for (let cat = 0; cat < 16; cat++) {
      categoryTotals[cat] = 0;
    }
    // categoryTotals = {0:0; --> 15:0}

    for (let i = 0; i < giftAnswers.length; i++) {
      const qNum = i + 1; // 1 to 112
      const score = Number(giftAnswers[i]);

      const catIdx = qNum % 16; // Modular stride of 16
      categoryTotals[catIdx] += score;
    }


    // Rank Gifts
    const rankedGifts = [];
    for (let cat = 0; cat < 16; cat++) {
      rankedGifts.push({
        catIndex: cat,
        code: SPIRITUAL_GIFTS_META[cat].code,
        nameEn: SPIRITUAL_GIFTS_META[cat].nameEn,
        nameKh: SPIRITUAL_GIFTS_META[cat].nameKh,
        ref: SPIRITUAL_GIFTS_META[cat].ref,
        score: categoryTotals[cat]
      });
    }
    rankedGifts.sort((a, b) => b.score - a.score);
    const top3Gifts = rankedGifts.slice(0, 3);

    // sendTelegramNotificationTest(respondent, rankedGifts);
    // return;

    // ----------------------------------------------------
    // 2. EXTRACT & SCORE DISC PERSONALITY  0-based array index: 117 to 141
    // ----------------------------------------------------
    const discScores = { D: 0, I: 0, S: 0, C: 0 };

    for (let i = 0; i < discAnswers.length; i++) {
      const qIdx = i; // 0 to 23 for mapping
      const cellVal = discAnswers[i] ? discAnswers[i].toString().trim() : "";

      // Robustly match choice starting with A, B, C, or D
      const choiceMatch = cellVal.match(/^([A-D])/i)[0];
      if (choiceMatch) {
        const chosenLetter = choiceMatch;
        const mappedTrait = DISC_MAPPING[qIdx][chosenLetter];
        if (mappedTrait) {
          discScores[mappedTrait]++;
        }
      }
    }

    // Determine Dominant DISC Profile
    const sortedDisc = Object.keys(discScores).sort((a, b) => discScores[b] - discScores[a]);
    let dominantProfile = sortedDisc[0];
    if (discScores[sortedDisc[0]] === discScores[sortedDisc[1]]) {
      dominantProfile = `${sortedDisc[0]}/${sortedDisc} (Blend)`;
    }


    // Create docx file

    // Call the function (replace with your actual Google Drive Folder ID)
    const docxUrl = createAssessmentDocx(
      respondent,
      giftAnswers,
      discAnswers,
      rankedGifts,
      discScores
    );

    // ----------------------------------------------------
    // 3. WRITE SCORES BACK TO SPREADSHEET
    // ----------------------------------------------------
    ensureSummaryColumnsAndWrite(sheet, row, headers, {
      top3Gifts: top3Gifts,
      discScores: discScores,
      sortedDisc: sortedDisc,
      dominantProfile: dominantProfile,
      rankedGifts: rankedGifts
    }, docxUrl);


    // ----------------------------------------------------
    // 4. SEND AUTOMATED EMAIL
    // ----------------------------------------------------
    if (respondentEmail) {
      sendAssessmentResultEmail(respondentEmail, respondentName, rankedGifts, discScores, dominantProfile);
    }

    // ----------------------------------------------------
    // 5. DISPATCH TELEGRAM ALERT
    // ----------------------------------------------------
    sendTelegramNotification(respondent, rankedGifts, discScores, dominantProfile, docxUrl);

  } catch (err) {
    Logger.log("Error in onFormSubmit: " + err.toString());
  }
}

/**
 * Ensures dedicated summary columns exist at the end of the sheet and writes calculated values.
 */
function ensureSummaryColumnsAndWrite(sheet, row, headers, calculatedData, url) {
  const summaryHeaders = [
    "Spiritual Gift 1", "Spiritual Gift 2", "Spiritual Gift 3",
    "Personality 1", "Personality 2", "File url"
  ];

  let startCol = headers.length + 1;
  const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  // Check if columns already exist
  let found = false;
  for (let i = 0; i < headerRange.length; i++) {
    if (headerRange[i] === "Spiritual Gift 1") {
      startCol = i + 1;
      found = true;
      break;
    }
  }

  if (!found) {
    sheet.getRange(1, startCol, 1, summaryHeaders.length).setValues([summaryHeaders]);
  }

  const top1DiscCode = calculatedData.sortedDisc[0];
  const top2DiscCode = calculatedData.sortedDisc[1];
  const top1Disc = `${top1DiscCode}-${DISC_PROFILES_META[top1DiscCode].name} (${calculatedData.discScores[top1DiscCode]})`;
  const top2Disc = `${top2DiscCode}-${DISC_PROFILES_META[top2DiscCode].name} (${calculatedData.discScores[top2DiscCode]})`;

  const rowValues = [
    `${calculatedData.top3Gifts[0].nameEn} (${calculatedData.top3Gifts[0].score}/35)`,
    `${calculatedData.top3Gifts[1].nameEn} (${calculatedData.top3Gifts[1].score}/35)`,
    `${calculatedData.top3Gifts[2].nameEn} (${calculatedData.top3Gifts[2].score}/35)`,
    top1Disc,
    top2Disc,
    url
  ];

  sheet.getRange(row, startCol, 1, summaryHeaders.length).setValues([rowValues]);
}

// ==========================================
// 3. AUTOMATED EMAIL DISPATCH
// ==========================================

/**
 * Builds a styled HTML report and sends it to the participant.
 */
function sendAssessmentResultEmail(email, name, rankedGifts, discScores, dominantProfile) {
  const primaryTraitKey = dominantProfile.charAt(0);
  const profileInfo = DISC_PROFILES_META[primaryTraitKey] || DISC_PROFILES_META['D'];

  const subject = `Your Assessment Results: Spiritual Gifts & DISC Profile | លទ្ធផលវាយតម្លៃរបស់អ្នក`;

  let giftsHtml = "";
  rankedGifts.forEach((gift, idx) => {
    giftsHtml += `
      <div style="background: #f8fafc; border-left: 4px solid #2563eb; padding: 12px 16px; margin-bottom: 12px; border-radius: 4px;">
        <h3 style="margin: 0 0 6px 0; color: #1e293b; font-size: 16px;">
          #${idx + 1}. ${gift.nameKh} / ${gift.nameEn} — <span style="color: #2563eb;">${gift.score}/35 Points</span>
        </h3>
        <p style="margin: 0; color: #64748b; font-size: 13px;">
          <strong>ខព្រះគម្ពីរយោង / Biblical References:</strong> ${gift.ref}
        </p>
      </div>
    `;
  });


  const top1GiftDesc = SPIRITUAL_GIFTS_DESCRIPTION[rankedGifts[0].code]


  let scripturesHtml = "";
  profileInfo.scriptures.forEach(sc => {
    scripturesHtml += `
      <li style="margin-bottom: 8px; color: #334155;">
        <em>"${sc.text}"</em> — <strong>${sc.ref}</strong>
      </li>
    `;
  });

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background: #ffffff;">
      <div style="text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="color: #1e293b; font-size: 22px; margin: 0 0 6px 0;">របាយការណ៍លទ្ធផលវាយតម្លៃ / Assessment Report</h1>
        <p style="color: #64748b; margin: 0; font-size: 14px;">Spiritual Gifts & DISC Personality Profile</p>
      </div>

      <p style="font-size: 15px; color: #334155;">សួស្តី / Dear <strong>${name || 'Participant'}</strong>,</p>
      <p style="font-size: 14px; color: #475569; line-height: 1.6;">
        សូមអរគុណសម្រាប់ការចូលរួមក្នុងការវាយតម្លៃអំណោយទានខាងវិញ្ញាណ និងបុគ្គលភាព។ ខាងក្រោមនេះជាលទ្ធផលលម្អិតរបស់អ្នក៖<br>
        Thank you for completing the assessment. Below is the summary of your spiritual gifts and behavioral personality profile.
      </p>

      <!-- PART 1: SPIRITUAL GIFTS -->
      <h2 style="color: #1e293b; font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 24px;">
        អំណោយទានខាងវិញ្ញាណ / Spiritual Gifts 
      </h2>
      ${giftsHtml}

      <div style="margin-bottom: 16px;">
        <h4 style="margin: 0 0 6px 0; color: #1e293b;">
          ការ​ពិពណ៌នា​អំពី​អំណោយទាន​ខាង​វិញ្ញាណ​ / Description of spiritual gifts: 
          <span style="color: #2563eb;"> ${rankedGifts[0].nameKh} / ${rankedGifts[0].nameEn} </span>
        </h4>
        <p style="margin: 0 0 6px 0; color: #475569; font-size: 13px;">${top1GiftDesc.descKh}</p>
        <p style="margin: 0; color: #64748b; font-size: 13px;">
          <strong>ខព្រះគម្ពីរយោង:</strong> ${top1GiftDesc.refKh}
        </p>
        <p style="margin: 0; color: #64748b; font-size: 13px;"><em>${top1GiftDesc.descEn}</em></p>
        <p style="margin: 0; color: #64748b; font-size: 13px;">
          <strong>Biblical References:</strong> ${top1GiftDesc.refEn}
        </p>
      </div>

      <!-- PART 2: DISC PERSONALITY -->
      <h2 style="color: #1e293b; font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 28px;">
        បុគ្គលភាព / DISC Personality Profile
      </h2>

      <div style="background: #f1f5f9; padding: 14px; border-radius: 6px; margin-bottom: 16px;">
        <p style="margin: 0 0 6px 0; font-size: 15px; color: #0f172a;">
          <strong>Dominant Profile:</strong> <span style="color: #0284c7; font-weight: bold;">${primaryTraitKey} ${dominantProfile}</span> (${profileInfo.name})
        </p>
        <p style="margin: 0; font-size: 14px; color: #334155;">
          <strong>Score Breakdown:</strong> D: <b>${discScores.D}</b> | I: <b>${discScores.I}</b> | S: <b>${discScores.S}</b> | C: <b>${discScores.C}</b> (Total: 24)
        </p>
      </div>

      <div style="margin-bottom: 16px;">
        <h4 style="margin: 0 0 6px 0; color: #1e293b;">លក្ខណៈសម្គាល់ / Core Traits:</h4>
        <p style="margin: 0 0 6px 0; color: #475569; font-size: 13px;">${profileInfo.traitsKh}</p>
        <p style="margin: 0; color: #64748b; font-size: 13px;"><em>${profileInfo.traitsEn}</em></p>
      </div>

      <div style="margin-bottom: 16px;">
        <h4 style="margin: 0 0 8px 0; color: #1e293b;">ព្រះបន្ទូល និងការដាស់តឿនខាងវិញ្ញាណ / Biblical Growth Exhortations:</h4>
        <ul style="padding-left: 20px; margin: 0; font-size: 13px;">
          ${scripturesHtml}
        </ul>
      </div>

      <!-- START: Read More Section -->
      <div style="padding: 20px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center;">
        <h3 style="margin: 0 0 8px 0; color: #1e293b; font-size: 16px; font-weight: 600;">
          ស្វែងយល់បន្ថែម / Read More & Resources
        </h3>
        <p style="margin: 0 0 16px 0; color: #64748b; font-size: 13px; line-height: 1.5;">
          ចុចលើតំណភ្ជាប់ខាងក្រោមដើម្បីអានព័ត៌មានលម្អិតបន្ថែម៖<br>
          Click the links below to view more in-depth guides and materials:
        </p>

        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: 100%; max-width: 500px;">
          <tr>
            <!-- Button 1 -->
            <td align="center" style="padding: 6px;">
              <a href="${spiritualityAssessmentDetails}" target="_blank" rel="noopener noreferrer"
                style="display: block; padding: 12px 20px; background-color: #2563eb; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: bold; border-radius: 6px;">
                📖 អំណោយទានខាងវិញ្ញាណ<br>
                <span style="font-size: 11px; font-weight: normal; opacity: 0.9;">Spiritual Gifts Guide</span>
              </a>
            </td>
            <!-- Button 2 -->
            <td align="center" style="padding: 6px;">
              <a href="${personalityAssessmentDetails}" target="_blank" rel="noopener noreferrer"
                style="display: block; padding: 12px 20px; background-color: #32cd39; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: bold; border-radius: 6px;">
                🧠 បុគ្គលភាព DISC<br>
                <span style="font-size: 11px; font-weight: normal; opacity: 0.9;">DISC Profile Insights</span>
              </a>
            </td>
          </tr>
        </table>
      </div>
      <!-- END: Read More Section -->

      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">
        Crossroads Church Assessment Automation System. All rights reserved.
      </p>
    </div>
  `;

  GmailApp.sendEmail(email, subject, "", {
    htmlBody: htmlBody,
    name: "Assessment Center"
  });
}


function createAssessmentDocx(respondent, giftAnswers, discAnswers, rankedGifts, discScores) {
  const folder = DriveApp.getFolderById('16cMBYOPOk9aX0ncpDFzqE26LysnBEKLg');
  const fileName = `${respondent.nameLatin} SG&DISC Assessment`;

  // 1. Create a temporary Google Doc to populate content
  const doc = DocumentApp.create(fileName);
  const body = doc.getBody();
  body.clear();

  // Header
  body.appendParagraph(`Assessment Responses & Results`)
    .setHeading(DocumentApp.ParagraphHeading.HEADING1)
    .setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  body.appendParagraph(`Name: ${respondent.nameKhmer} / ${respondent.nameLatin}`)
    .setHeading(DocumentApp.ParagraphHeading.HEADING1)
    .setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  body.appendParagraph(`Sex: ${respondent.sex}`)
    .setHeading(DocumentApp.ParagraphHeading.HEADING2)
    .setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  body.appendParagraph(`Email: ${respondent.email}`)
    .setHeading(DocumentApp.ParagraphHeading.HEADING2)
    .setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  body.appendParagraph(`Phone number: ${respondent.telegram}`)
    .setHeading(DocumentApp.ParagraphHeading.HEADING2)
    .setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  body.appendParagraph(`Date: ${new Date().toISOString()}`)
    .setHeading(DocumentApp.ParagraphHeading.HEADING2)
    .setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  body.appendHorizontalRule();

  // ----------------------------------------------------
  // 4.1 Questions and Answers line by line
  // ----------------------------------------------------
  body.appendParagraph("Part 1: Spiritual Gifts Assessment (112 Questions)").setHeading(DocumentApp.ParagraphHeading.HEADING2);

  for (let i = 0; i < 112; i++) {
    const qText = (typeof SPIRITUAL_GIFTS_QUESTIONS !== 'undefined' && SPIRITUAL_GIFTS_QUESTIONS[i])
      ? SPIRITUAL_GIFTS_QUESTIONS[i].replace(/\n/g, " ")
      : `Question ${i + 1}`;
    const ans = giftAnswers && giftAnswers[i] !== undefined ? giftAnswers[i] : "N/A";

    body.appendParagraph(`Q${qText}`);
    body.appendParagraph(`Answer: ${ans}`);
  }

  body.appendHorizontalRule();
  body.appendParagraph("Part 2: DISC Personality Assessment (24 Questions)").setHeading(DocumentApp.ParagraphHeading.HEADING2);

  for (let i = 0; i < 24; i++) {
    const qTitle = (typeof DISC_QUESTIONS !== 'undefined' && DISC_QUESTIONS[i])
      ? DISC_QUESTIONS[i].title.replace(/\n/g, " ")
      : `Question ${i + 1}`;
    const ans = discAnswers && discAnswers[i] !== undefined ? discAnswers[i] : "N/A";

    body.appendParagraph(`Q${qTitle}`);
    body.appendParagraph(`Answer: ${ans}`);
  }

  // ----------------------------------------------------
  // 4.2 Raw Results: 16 Spiritual Gifts & DISC Scores
  // ----------------------------------------------------
  body.appendHorizontalRule();
  body.appendParagraph("Calculated Results").setHeading(DocumentApp.ParagraphHeading.HEADING2);

  body.appendParagraph("Spiritual Gifts Scores (16 Categories):").setHeading(DocumentApp.ParagraphHeading.HEADING3);
  rankedGifts.forEach(item => {
    body.appendParagraph(`${item.code} - ${item.nameKh} / ${item.nameEn} — ${item.score}/35`);
  });

  body.appendParagraph("DISC Personality Scores:").setHeading(DocumentApp.ParagraphHeading.HEADING3);
  body.appendParagraph(`D: ${DISC_PROFILES_META[D].name} ${discScores.D}`);
  body.appendParagraph(`I: ${DISC_PROFILES_META[I].name} ${discScores.I}`);
  body.appendParagraph(`S: ${DISC_PROFILES_META[S].name} ${discScores.S}`);
  body.appendParagraph(`C: ${DISC_PROFILES_META[C].name} ${discScores.C}`);

  // set Font Family
  body.editAsText().setFontFamily("Roboto");

  // 2. Save and flush doc content
  doc.saveAndClose();

  // 3. Convert and export as a true .docx file via Drive export
  const exportUrl = `https://docs.google.com/document/d/${doc.getId()}/export?format=docx`;
  const response = UrlFetchApp.fetch(exportUrl, {
    headers: {
      Authorization: `Bearer ${ScriptApp.getOAuthToken()}`
    },
    muteHttpExceptions: true
  });

  const docxBlob = response.getBlob().setName(`${fileName}.docx`);
  const docxFile = folder.createFile(docxBlob);
  const docxUrl = docxFile.getUrl();

  // 4. Trash temporary Google Doc
  DriveApp.getFileById(doc.getId()).setTrashed(true);

  return docxUrl;
}

// ==========================================
// 4. TELEGRAM GROUP DISPATCH
// ==========================================

/**
 * Sends markdown formatted assessment summary directly to Telegram group.
 */

// const respondent = {
//   timestamp: "",
//   email: "",
//   nameKhmer: "",
//   nameLatin: "",
//   sex: "",
//   telegram: ""
// };
function sendTelegramNotification(respondent, rankedGifts, discScores, dominantProfile, docxUrl) {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty("TELEGRAM_BOT_TOKEN");
  const chatId = props.getProperty("TELEGRAM_CHAT_ID");

  if (!token || !chatId) {
    Logger.log("Telegram credentials not found in ScriptProperties. Skipping alert.");
    return;
  }

  const giftsText = rankedGifts
    .map((g, idx) => `${idx + 1}. ${g.nameKh} / ${g.nameEn} — ${g.score}/35`)
    .join("\n");

  const dominantInfo = DISC_PROFILES_META[dominantProfile.charAt(0)].name;

  const message =
    `📋 *New Assessment Completed*\n` +
    `👤 *Name:* ${respondent.nameKhmer} / ${respondent.nameLatin}\n` +
    `⚥ *Sex:* ${respondent.sex || "Not Provided"}\n` +
    `📧 *Email:* ${respondent.email || "Not Provided"}\n` +
    `📨 *Telegram:* ${respondent.telegram || "Not Provided"}\n\n` +
    `🕊  *Spiritual Gifts:*\n${giftsText}\n\n` +
    `🧠 *DISC Personality Result:*\n` +
    `*Dominant Profile:* ${dominantInfo}\n` +
    `*Breakdown:* D — ${discScores.D} | I — ${discScores.I} | S — ${discScores.S} | C — ${discScores.C}\n\n` +
    `📋 *Docx Url*: ${docxUrl}\n`;


  const payload = {
    chat_id: chatId,
    text: message,
    parse_mode: "Markdown"
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const res = UrlFetchApp.fetch(`https://api.telegram.org/bot${token}/sendMessage`, options);
    Logger.log("Telegram response: " + res.getContentText());
  } catch (e) {
    Logger.log("Telegram dispatch failed: " + e.toString());
  }
}


function sendTelegramNotificationTest(respondent, rankedGifts) {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty("TELEGRAM_BOT_TOKEN");
  const chatId = "880158374"; // Kosalvireak Telegram

  if (!token || !chatId) {
    Logger.log("Telegram credentials not found in ScriptProperties. Skipping alert.");
    return;
  }


  const giftsText = rankedGifts
    .map((g, idx) => `${idx + 1}. ${g.nameEn} (${g.nameKh}) - ${g.score}/35`)
    .join("\n");


  const message =
    `📋 *New Assessment Completed*\n` +
    `📧 *Email:* ${respondent.email || "Not Provided"}\n` +
    `👤 *Name in English:* ${respondent.nameLatin || "Anonymous"}\n` +
    `🕊 *Spiritual Gifts:* ${giftsText} \n\n` +
    `🧠 *DISC Personality Result:*\n`

  const payload = {
    chat_id: chatId,
    text: message,
    parse_mode: "Markdown"
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const res = UrlFetchApp.fetch(`https://api.telegram.org/bot${token}/sendMessage`, options);
    Logger.log("Telegram response: " + res.getContentText());
  } catch (e) {
    Logger.log("Telegram dispatch failed: " + e.toString());
  }
}
