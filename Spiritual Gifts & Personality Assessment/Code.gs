/**
 * Code.gs - Google Apps Script Automation Engine
 * Handles Google Form generation, submission trigger, spreadsheet scoring,
 * HTML email generation, and Telegram notification dispatch.
 */

// ==========================================
// 1. SETUP & FORM GENERATOR
// ==========================================

/**
 * Creates the complete bilingual Spiritual Gifts & DISC Assessment Google Form.
 * Configures response destination to active spreadsheet, collects emails,
 * and distributes questions across sections for high mobile responsiveness.
 */
function createUnifiedAssessmentForm() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const formTitle = "Spiritual Gifts & Personality Assessment | ការវាយតម្លៃអំណោយទានខាងវិញ្ញាណ និង បុគ្គលភាព";
  const form = FormApp.create(formTitle);

  // Configure Form Settings
  form.setDescription(
    "សូមស្វាគមន៍មកកាន់ការវាយតម្លៃអំណោយទានខាងវិញ្ញាណ និងបុគ្គលភាព (DISC)។\n" +
    "Welcome to the Spiritual Gifts and DISC Personality Assessment.\n\n" +
    "ការវាយតម្លៃនេះមានពីរផ្នែក៖\n" +
    "ផ្នែកទី ១៖ ការវាយតម្លៃអំណោយទានខាងវិញ្ញាណ (១១២ សំណួរ)\n" +
    "ផ្នែកទី ២៖ ការវាយតម្លៃបុគ្គលភាព DISC (២៤ សំណួរ)\n\n" +
    "លទ្ធផលនឹងត្រូវផ្ញើជូនលោកអ្នកតាមរយៈអ៊ីមែលដោយស្វ័យប្រវត្តិ។"
  );
  form.setCollectEmail(true);
  form.setAllowResponseEdits(false);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // ----------------------------------------------------
  // SECTION 1: Respondent Information
  // ----------------------------------------------------
  form.addTextItem()
    .setTitle("ឈ្មោះពេញ / Full Name")
    .setRequired(true);

  form.addTextItem()
    .setTitle("លេខទូរស័ព្ទ ឬតេឡេក្រាម / Phone Number or Telegram Handle")
    .setRequired(true);

  // ----------------------------------------------------
  // SECTIONS 2 to 8: Part 1 - Spiritual Gifts (112 Questions)
  // Split into 7 sections of 16 questions each
  // ----------------------------------------------------
  const QUESTIONS_PER_SECTION = 16;
  const TOTAL_GIFT_SECTIONS = 7; // 7 * 16 = 112

  for (let s = 0; s < TOTAL_GIFT_SECTIONS; s++) {
    const startIdx = s * QUESTIONS_PER_SECTION;
    const endIdx = startIdx + QUESTIONS_PER_SECTION;

    form.addPageBreakItem()
      .setTitle(`ផ្នែកទី ១៖ អំណោយទានខាងវិញ្ញាណ (សំណួរ ${startIdx + 1} ដល់ ${endIdx}) / Part 1: Spiritual Gifts (${startIdx + 1}-${endIdx})`)
      .setHelpText(
        "កម្រិតវាយតម្លៃ / Rating Scale:\n" +
        "1 = ស្ទើរតែមិនពិត / Almost Never true\n" +
        "2 = កម្រពិត / Seldom true\n" +
        "3 = ពេលខ្លះពិត / Sometimes true (សូមព្យាយាមជៀសវាង / try to avoid)\n" +
        "4 = ជាញឹកញាប់ពិត / Often true\n" +
        "5 = ស្ទើរតែជានិច្ចពិត / Almost Always true"
      );

    for (let q = startIdx; q < endIdx; q++) {
      const scaleItem = form.addScaleItem();
      scaleItem.setTitle(SPIRITUAL_GIFTS_QUESTIONS[q])
        .setBounds(1, 5)
        .setLabels("Almost Never\nស្ទើរតែមិនពិត", "Almost Always\nស្ទើរតែជានិច្ចពិត")
        .setRequired(true);
    }
  }

  // ----------------------------------------------------
  // SECTION 9: Part 2 - DISC Personality Assessment (24 Questions)
  // ----------------------------------------------------
  form.addPageBreakItem()
    .setTitle("ផ្នែកទី ២៖ ការវាយតម្លៃបុគ្គលភាព DISC / Part 2: DISC Personality Assessment")
    .setHelpText(
      "ការណែនាំ៖ សូមជ្រើសរើសចម្លើយមួយ (A, B, C, ឬ D) ដែលពិពណ៌នាអំពីអ្នកបានល្អបំផុតក្នុងចំណោមជម្រើសទាំងបួនខាងក្រោម។\n" +
      "Instructions: Please select the ONE option (A, B, C, or D) per statement that most accurately describes you."
    );

  for (let i = 0; i < DISC_QUESTIONS.length; i++) {
    const qObj = DISC_QUESTIONS[i];
    const mcItem = form.addMultipleChoiceItem();
    mcItem.setTitle(qObj.title)
      .setChoiceValues(qObj.choices)
      .setRequired(true);
  }

  Logger.log("Form created successfully: " + form.getEditUrl());
  Logger.log("Published Form URL: " + form.getPublishedUrl());
}

/**
 * Automates the creation of the installable onFormSubmit trigger.
 */
function setupTriggers() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Remove existing submit triggers to prevent duplicates
  const triggers = ScriptApp.getUserTriggers(ss);
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "onFormSubmit") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  ScriptApp.newTrigger("onFormSubmit")
    .forSpreadsheet(ss)
    .onFormSubmit()
    .create();

  Logger.log("Installable onFormSubmit trigger registered successfully.");
}

// ==========================================
// 2. SCORING & TRIGGER ENGINE
// ==========================================

/**
 * Main form submission handler.
 * Runs on form submit, scores 112 gifts and 24 DISC questions, updates sheet,
 * emails candidate, and sends Telegram alert.
 */
function onFormSubmit(e) {
  try {
    const sheet = e.range ? e.range.getSheet() : SpreadsheetApp.getActiveSheet();
    const row = e.range ? e.range.getRow() : sheet.getLastRow();

    // Retrieve submission row values
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const values = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];

    let respondentEmail = "";
    let respondentName = "";

    for (let c = 0; c < Math.min(headers.length, 5); c++) {
      const h = headers[c].toString().toLowerCase();
      const v = values[c] ? values[c].toString().trim() : "";
      if (h.includes("email") || h.includes("អ៊ីមែល")) {
        respondentEmail = v;
      } else if (h.includes("full name") || h.includes("ឈ្មោះ")) {
        respondentName = v;
      }
    }

    // Fallback: If form auto-collected email in Col B (index 1)
    if (!respondentEmail && values && values.toString().includes("@")) {
      respondentEmail = values.toString().trim();
    }
    if (!respondentName && values[2]) {
      respondentName = values[2].toString().trim();
    }

    // ----------------------------------------------------
    // 1. EXTRACT & SCORE SPIRITUAL GIFTS (Col D to DK)
    // 0-based array index: 3 (Col D) to 114 (Col DK)
    // ----------------------------------------------------
    const categoryTotals = {};
    for (let cat = 0; cat < 16; cat++) {
      categoryTotals[cat] = 0;
    }

    const GIFT_START_IDX = 3; // Column D
    for (let i = 0; i < 112; i++) {
      const qNum = i + 1; // 1 to 112
      const colVal = values[GIFT_START_IDX + i];
      const score = Number(colVal) || 0;

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

    // ----------------------------------------------------
    // 2. EXTRACT & SCORE DISC PERSONALITY (Col DL to EI)
    // 0-based array index: 115 (Col DL) to 138 (Col EI)
    // ----------------------------------------------------
    const discScores = { D: 0, I: 0, S: 0, C: 0 };
    const DISC_START_IDX = 115; // Column DL

    for (let i = 0; i < 24; i++) {
      const qIdx = i; // 0 to 23 for mapping
      const cellVal = values[DISC_START_IDX + i] ? values[DISC_START_IDX + i].toString().trim() : "";

      // Robustly match choice starting with A, B, C, or D
      const choiceMatch = cellVal.match(/^([A-D])/i)[0];
      if (choiceMatch) {
        const chosenLetter = choiceMatch;
        const mappedTrait = DISC_MAPPING[qIdx][chosenLetter];
        if (mappedTrait && discScores[mappedTrait] !== undefined) {
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

    // ----------------------------------------------------
    // 3. WRITE SCORES BACK TO SPREADSHEET
    // ----------------------------------------------------
    // ensureSummaryColumnsAndWrite(sheet, row, headers, {
    //   top3Gifts: top3Gifts,
    //   discScores: discScores,
    //   dominantProfile: dominantProfile,
    //   rankedGifts: rankedGifts
    // });

    // ----------------------------------------------------
    // 4. SEND AUTOMATED EMAIL
    // ----------------------------------------------------
    if (respondentEmail) {
      sendAssessmentResultEmail(respondentEmail, respondentName, rankedGifts, discScores, dominantProfile);
    }

    // ----------------------------------------------------
    // 5. DISPATCH TELEGRAM ALERT
    // ----------------------------------------------------
    sendTelegramNotification(respondentName, respondentEmail, rankedGifts, discScores, dominantProfile);

  } catch (err) {
    Logger.log("Error in onFormSubmit: " + err.toString());
  }
}

/**
 * Ensures dedicated summary columns exist at the end of the sheet and writes calculated values.
 */
function ensureSummaryColumnsAndWrite(sheet, row, headers, calculatedData) {
  const summaryHeaders = [
    "Primary Gift 1", "Primary Gift 2", "Primary Gift 3",
    "DISC Dominant", "Score D", "Score I", "Score S", "Score C",
    "Full Gifts Breakdown"
  ];

  let startCol = headers.length + 1;
  const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  // Check if columns already exist
  let found = false;
  for (let i = 0; i < headerRange.length; i++) {
    if (headerRange[i] === "Primary Gift 1") {
      startCol = i + 1;
      found = true;
      break;
    }
  }

  if (!found) {
    sheet.getRange(1, startCol, 1, summaryHeaders.length).setValues([summaryHeaders]);
  }

  const giftsBreakdownString = calculatedData.rankedGifts
    .map(g => `${g.code}: ${g.score}/35`)
    .join(" | ");

  const rowValues = [
    `${calculatedData.top3Gifts[0].nameEn} (${calculatedData.top3Gifts[0].score}/35)`,
    `${calculatedData.top3Gifts.nameEn} (${calculatedData.top3Gifts.score}/35)`,
    `${calculatedData.top3Gifts[2].nameEn} (${calculatedData.top3Gifts[2].score}/35)`,
    calculatedData.dominantProfile,
    calculatedData.discScores.D,
    calculatedData.discScores.I,
    calculatedData.discScores.S,
    calculatedData.discScores.C,
    giftsBreakdownString
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
          <strong>Biblical References / ខព្រះគម្ពីរយោង:</strong> ${gift.ref}
        </p>
      </div>
    `;
  });

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
        <h1 style="color: #1e293b; font-size: 22px; margin: 0 0 6px 0;">Assessment Report | របាយការណ៍លទ្ធផលវាយតម្លៃ</h1>
        <p style="color: #64748b; margin: 0; font-size: 14px;">Spiritual Gifts & DISC Personality Profile</p>
      </div>

      <p style="font-size: 15px; color: #334155;">សួស្តី / Dear <strong>${name || 'Participant'}</strong>,</p>
      <p style="font-size: 14px; color: #475569; line-height: 1.6;">
        សូមអរគុណសម្រាប់ការចូលរួមក្នុងការវាយតម្លៃអំណោយទានខាងវិញ្ញាណ និងបុគ្គលភាព។ ខាងក្រោមនេះជាលទ្ធផលលម្អិតរបស់អ្នក៖<br>
        Thank you for completing the assessment. Below is the summary of your spiritual gifts and behavioral personality profile.
      </p>

      <!-- PART 1: SPIRITUAL GIFTS -->
      <h2 style="color: #1e293b; font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 24px;">
        Spiritual Gifts / អំណោយទានខាងវិញ្ញាណ
      </h2>
      ${giftsHtml}

      <!-- PART 2: DISC PERSONALITY -->
      <h2 style="color: #1e293b; font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 28px;">
        DISC Personality Profile / បុគ្គលភាព
      </h2>

      <div style="background: #f1f5f9; padding: 14px; border-radius: 6px; margin-bottom: 16px;">
        <p style="margin: 0 0 6px 0; font-size: 15px; color: #0f172a;">
          <strong>Dominant Profile:</strong> <span style="color: #0284c7; font-weight: bold;">${dominantProfile}</span> (${profileInfo.name})
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

// ==========================================
// 4. TELEGRAM GROUP DISPATCH
// ==========================================

/**
 * Sends markdown formatted assessment summary directly to Telegram group.
 */
function sendTelegramNotification(name, email, rankedGifts, discScores, dominantProfile) {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty("TELEGRAM_BOT_TOKEN");
  const chatId = props.getProperty("TELEGRAM_CHAT_ID");

  if (!token || !chatId) {
    Logger.log("Telegram credentials not found in ScriptProperties. Skipping alert.");
    return;
  }

  const giftsText = rankedGifts
    .map((g, idx) => `${idx + 1}. ${g.nameEn} (${g.nameKh}) - ${g.score}/35`)
    .join("\n");

  const message =
    `📋 *New Assessment Completed*\n` +
    `👤 *Name:* ${name || "Anonymous"}\n` +
    `📧 *Email:* ${email || "Not Provided"}\n\n` +
    `🕊  *Spiritual Gifts:*\n${giftsText}\n\n` +
    `🧠 *DISC Personality Result:*\n` +
    `• *Dominant Profile:* ${dominantProfile}\n` +
    `• *Breakdown:* D: ${discScores.D} | I: ${discScores.I} | S: ${discScores.S} | C: ${discScores.C}`;


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


function sendTelegramNotificationTest(name, email, rankedGifts, discScores, dominantProfile) {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty("TELEGRAM_BOT_TOKEN");
  const chatId = props.getProperty("TELEGRAM_CHAT_ID");

  if (!token || !chatId) {
    Logger.log("Telegram credentials not found in ScriptProperties. Skipping alert.");
    return;
  }
  const message =
    `📋 *New Assessment Completed*\n` +
    `👤 *Name:* ${name || "Anonymous"}\n` +
    `📧 *Email:* ${email || "Not Provided"}\n\n` +
    `🕊 *Top 3 Spiritual Gifts:*\n Nothing \n\n` +
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
