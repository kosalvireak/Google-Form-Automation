/**
 * Data.gs - Assessment Metadata, Bilingual Questions, Mapping & Scoring Tables
 */

// 16 Spiritual Gifts Definitions (Indices 0 to 15 corresponding to Q_n % 16)
const SPIRITUAL_GIFTS_META = {
  0: { code: 'A', nameEn: 'Evangelism', nameKh: 'ការផ្សាយដំណឹងល្អ', ref: 'Acts 8:26-40, 21:8; Ephesians 4:11-14; 2 Tim 4:5' },
  1: { code: 'B', nameEn: 'Leadership', nameKh: 'ភាពជាអ្នកដឹកនាំ', ref: 'Romans 12:6-8; Hebrews 13:17; 1 Tim 5:17' },
  2: { code: 'C', nameEn: 'Mercy', nameKh: 'សេចក្ដីមេត្តាករុណា', ref: 'Matthew 20:29-34; Luke 10:33-35; Mark 9:41; Romans 12:8' },
  3: { code: 'D', nameEn: 'Administration', nameKh: 'រដ្ឋបាល/ការគ្រប់គ្រង', ref: 'Luke 14:28-30; Acts 6:1-7; 1 Cor 12:28; Titus 1:5' },
  4: { code: 'E', nameEn: 'Prophecy', nameKh: 'ទំនាយ', ref: 'Acts 15:32; Romans 12:6; 1 Cor 12:10, 28; Eph 4:11-14' },
  5: { code: 'F', nameEn: 'Giving', nameKh: 'ការថ្វាយតង្វាយ/ការឲ្យ', ref: 'Mark 12:41-44; Romans 12:8; 2 Cor 8:1-7, 9:2-8' },
  6: { code: 'G', nameEn: 'Teaching', nameKh: 'ការបង្រៀន', ref: 'Acts 18:24-28; Romans 12:7; 1 Cor 12:28; Eph 4:11-14' },
  7: { code: 'H', nameEn: 'Pastor/Shepherd', nameKh: 'គ្រូគង្វាល/អ្នកគង្វាល', ref: 'John 10:1-18; 1 Peter 5:1-4; Ephesians 4:11-14' },
  8: { code: 'I', nameEn: 'Faith', nameKh: 'ជំនឿ', ref: 'Acts 11:22-24, 27:21-25; Romans 4:18-21; 1 Cor 12:9' },
  9: { code: 'J', nameEn: 'Exhortation/Encouragement', nameKh: 'ការលើកទឹកចិត្ត/ការដាស់តឿន', ref: 'Acts 14:22; Romans 12:8; Hebrews 10:25' },
  10: { code: 'K', nameEn: 'Service', nameKh: 'សេវាកម្ម/ការបម្រើ', ref: 'Acts 6:1-7; Galatians 6:2, 10; Romans 12:7' },
  11: { code: 'L', nameEn: 'Helps', nameKh: 'ជំនួយ', ref: 'Mark 15:40-41; Acts 9:36; Romans 16:1-2; 1 Cor 12:28' },
  12: { code: 'M', nameEn: 'Wisdom', nameKh: 'ប្រាជ្ញា', ref: 'Acts 6:3; 1 Corinthians 2:1-13, 12:8' },
  13: { code: 'N', nameEn: 'Knowledge', nameKh: 'ចំណេះដឹង', ref: '1 Cor 2:14, 12:8; 2 Cor 11:6; Colossians 2:2-3' },
  14: { code: 'O', nameEn: 'Hospitality', nameKh: 'បដិសណ្ឋារកិច្ច', ref: 'Acts 16:14-15; Romans 12:9-13, 16:23; 1 Peter 4:9' },
  15: { code: 'P', nameEn: 'Discernment', nameKh: 'ការយល់ដឹង/ការសម្គាល់', ref: 'Matthew 16:21-23; Acts 5:1-11; 1 Cor 12:10' },
};

/**
 * SPIRITUAL_GIFTS_DESCRIPTION
 * Detailed bilingual definitions, descriptions, and scriptural references 
 * for each of the 16 Spiritual Gifts.
 */
const SPIRITUAL_GIFTS_DESCRIPTION = {
  A: {
    code: "A",
    nameEn: "Evangelism",
    nameKh: "ការផ្សាយដំណឹងល្អ",
    descEn: "The Gift of evangelism is the special attribute given by God's Spirit to members of the Body of Christ to share with non-Christians the way a person becomes a Christian and to create in those people to desire to become a Christian.",
    descKh: "អំណោយទាននៃការផ្សព្វផ្សាយដំណឹងល្អ គឺជាលក្ខណសម្បត្តិពិសេសដែលព្រះវិញ្ញាណរបស់ព្រះប្រទានដល់សមាជិកនៃរូបកាយរបស់ព្រះគ្រីស្ទ ដើម្បីចែករំលែកជាមួយអ្នកមិនមែនជាគ្រីស្ទបរិស័ទអំពីរបៀបដែលមនុស្សម្នាក់ក្លាយជាគ្រីស្ទបរិស័ទ និងដើម្បីបង្កើតអស់អ្នកដែលមនុស្សទាំងនោះឲ្យមានបំណងប្រាថ្នាក្លាយជាគ្រីស្ទបរិស័ទ។",
    ref: "Acts 8:26-40; Acts 21:8; Ephesians 4:11-14; 2 Timothy 4:5"
  },
  B: {
    code: "B",
    nameEn: "Leadership",
    nameKh: "ភាពជាអ្នកដឹកនាំ",
    descEn: "The Gift of leadership is the special attribute given by God's Spirit to members of the Body of Christ to provide direction and goals and bring together resources and people that work together to accomplish those goals.",
    descKh: "អំណោយទាននៃភាពជាអ្នកដឹកនាំ គឺជាលក្ខណសម្បត្តិពិសេសដែលព្រះវិញ្ញាណរបស់ព្រះប្រទានដល់សមាជិកនៃរូបកាយរបស់ព្រះគ្រីស្ទ ដើម្បីផ្តល់ទិសដៅ និងគោលដៅ និងនាំមកនូវធនធាន និងមនុស្សដែលធ្វើការជាមួយគ្នាដើម្បីសម្រេចគោលដៅទាំងនោះ។",
    ref: "Romans 12:6-8; 1 Timothy 5:17; Hebrews 13:17"
  },
  C: {
    code: "C",
    nameEn: "Mercy",
    nameKh: "សេចក្ដីមេត្តាករុណា",
    descEn: "The Gift of mercy is the special attribute given by God's Spirit to members of the Body of Christ to feel the hurt of others and genuinely express sympathy and provide comfort for those people.",
    descKh: "អំណោយទាននៃសេចក្ដីមេត្តាករុណា គឺជាលក្ខណសម្បត្តិពិសេសដែលព្រះវិញ្ញាណរបស់ព្រះប្រទានដល់សមាជិកនៃរូបកាយរបស់ព្រះគ្រីស្ទ ដើម្បីមានអារម្មណ៍ឈឺចាប់របស់អ្នកដទៃ និងបង្ហាញការអាណិតអាសូរដោយស្មោះស្ម័គ្រ និងផ្ដល់ការលួងលោមដល់មនុស្សទាំងនោះ។",
    ref: "Matthew 20:29-34; Mark 9:41; Luke 10:33-35; Romans 12:8"
  },
  D: {
    code: "D",
    nameEn: "Administration",
    nameKh: "រដ្ឋបាល / ការគ្រប់គ្រង",
    descEn: "The Gift of administration is the special attribute given by God's Spirit to members of the Body of Christ to steer God's people into effective channels of service by understanding the resources needed to accomplish goals and plans.",
    descKh: "អំណោយទាននៃការគ្រប់គ្រង គឺជាលក្ខណសម្បត្តិពិសេសដែលព្រះវិញ្ញាណរបស់ព្រះបានប្រទានដល់សមាជិកនៃរូបកាយរបស់ព្រះគ្រីស្ទ ដើម្បីដឹកនាំរាស្ត្ររបស់ព្រះចូលទៅក្នុងបណ្តាញបម្រើដ៏មានប្រសិទ្ធភាព ដោយការយល់ដឹងអំពីធនធានដែលត្រូវការដើម្បីសម្រេចគោលដៅ និងផែនការ។",
    ref: "Luke 14:28-30; Acts 6:1-7; 1 Corinthians 12:28; Titus 1:5"
  },
  E: {
    code: "E",
    nameEn: "Prophecy",
    nameKh: "ទំនាយ",
    descEn: "The Gift of prophecy is the special attribute given by God's Spirit to members of the Body of Christ to proclaim the Word of God boldly and with confidence.",
    descKh: "អំណោយទាននៃទំនាយ គឺជាលក្ខណសម្បត្តិពិសេសដែលព្រះវិញ្ញាណរបស់ព្រះបានប្រទានដល់សមាជិកនៃរូបកាយរបស់ព្រះគ្រីស្ទ ដើម្បីប្រកាសព្រះបន្ទូលរបស់ព្រះដោយក្លាហាន និងដោយទំនុកចិត្ត។",
    ref: "Acts 15:32; Romans 12:6; 1 Corinthians 12:10, 28; Ephesians 4:11-14"
  },
  F: {
    code: "F",
    nameEn: "Giving",
    nameKh: "ការថ្វាយតង្វាយ / ការឲ្យ",
    descEn: "The Gift of giving is the special attribute given by God's Spirit to members of the Body of Christ to give possessions and finances above a tithe to God's work with a cheerful and willing spirit.",
    descKh: "អំណោយទាននៃការឲ្យ គឺជាលក្ខណសម្បត្តិពិសេសដែលព្រះវិញ្ញាណរបស់ព្រះបានប្រទានដល់សមាជិកនៃរូបកាយរបស់ព្រះគ្រីស្ទ ដើម្បីឲ្យទ្រព្យសម្បត្តិ និងហិរញ្ញវត្ថុលើសពីការថ្វាយតង្វាយមួយភាគដប់ដល់កិច្ចការរបស់ព្រះជាម្ចាស់ ដោយស្មារតីរីករាយ និងស្ម័គ្រចិត្ត។",
    ref: "Mark 12:41-44; Romans 12:8; 2 Corinthians 8:1-7; 2 Corinthians 9:2-8"
  },
  G: {
    code: "G",
    nameEn: "Teaching",
    nameKh: "ការបង្រៀន",
    descEn: "The Gift of teaching is the special attribute given by God's Spirit to members of the Body of Christ to communicate Biblical truths in a manner through which others can learn and understand these Biblical truths.",
    descKh: "អំណោយទាននៃការបង្រៀន គឺជាលក្ខណសម្បត្តិពិសេសដែលព្រះវិញ្ញាណរបស់ព្រះបានប្រទានដល់សមាជិកនៃរូបកាយរបស់ព្រះគ្រីស្ទ ដើម្បីទំនាក់ទំនងសេចក្ដីពិតក្នុងព្រះគម្ពីរតាមរបៀបដែលអ្នកដទៃអាចរៀន និងយល់សេចក្ដីពិតក្នុងព្រះគម្ពីរទាំងនេះ។",
    ref: "Acts 18:24-28; Romans 12:7; 1 Corinthians 12:28; Ephesians 4:11-14"
  },
  H: {
    code: "H",
    nameEn: "Pastor/Shepherd",
    nameKh: "គ្រូគង្វាល / អ្នកគង្វាល",
    descEn: "The Gift of pastor/shepherd is the special attribute given by God's Spirit to members of the Body of Christ to guide, protect, nurture, and feed a group of believers into growing spiritually.",
    descKh: "អំណោយទាននៃគ្រូគង្វាល/អ្នកគង្វាល គឺជាលក្ខណសម្បត្តិពិសេសដែលព្រះវិញ្ញាណរបស់ព្រះបានប្រទានដល់សមាជិកនៃរូបកាយរបស់ព្រះគ្រីស្ទ ដើម្បីណែនាំ ការពារ ចិញ្ចឹមបីបាច់ និងថែបំប៉នក្រុមអ្នកជឿឲ្យរីកចម្រើនខាងវិញ្ញាណ។",
    ref: "John 10:1-18; Ephesians 4:11-14; 1 Peter 5:1-4"
  },
  I: {
    code: "I",
    nameEn: "Faith",
    nameKh: "ជំនឿ",
    descEn: "The Gift of faith is the special attribute given by God's Spirit to members of the Body of Christ to believe God's promises and act with unwavering confidence in carrying out His will.",
    descKh: "អំណោយទាននៃជំនឿ គឺជាលក្ខណសម្បត្តិពិសេសដែលព្រះវិញ្ញាណរបស់ព្រះបានប្រទានដល់សមាជិកនៃរូបកាយរបស់ព្រះគ្រីស្ទ ដើម្បីជឿលើសេចក្តីសន្យារបស់ព្រះ ហើយធ្វើសកម្មភាពដោយទំនុកចិត្តយ៉ាងមុតមាំក្នុងការអនុវត្តតាមព្រះហឫទ័យរបស់ទ្រង់។",
    ref: "Acts 11:22-24; Acts 27:21-25; Romans 4:18-21; 1 Corinthians 12:9"
  },
  J: {
    code: "J",
    nameEn: "Exhortation/Encouragement",
    nameKh: "ការលើកទឹកចិត្ត / ការដាស់តឿន",
    descEn: "The Gift of exhortation/encouragement is the special attribute given by God's Spirit to certain members of the Body of Christ to encourage and console the distressed and provide positive and practical steps for others to follow.",
    descKh: "អំណោយទាននៃការលើកទឹកចិត្ត/ការដាស់តឿន គឺជាលក្ខណសម្បត្តិពិសេសដែលព្រះវិញ្ញាណរបស់ព្រះបានប្រទានដល់សមាជិកមួយចំនួននៃរូបកាយរបស់ព្រះគ្រីស្ទ ដើម្បីលើកទឹកចិត្ត និងលួងលោមអ្នកដែលមានបញ្ហា និងផ្តល់ជំហានវិជ្ជមាន និងជាក់ស្តែងសម្រាប់អ្នកដទៃឱ្យធ្វើតាម។",
    ref: "Acts 14:22; Romans 12:8; Hebrews 10:25"
  },
  K: {
    code: "K",
    nameEn: "Service",
    nameKh: "សេវាកម្ម / ការបម្រើ",
    descEn: "The Gift of service is the special attribute given by God's Spirit to certain members of the Body of Christ to identify, assist and support ministries within the Body thereby allowing those ministries to effectively accomplish their desired results.",
    descKh: "អំណោយទាននៃការបម្រើ គឺជាលក្ខណសម្បត្តិពិសេសដែលព្រះវិញ្ញាណរបស់ព្រះបានប្រទានដល់សមាជិកមួយចំនួននៃរូបកាយរបស់ព្រះគ្រីស្ទ ដើម្បីកំណត់អត្តសញ្ញាណ ជួយ និងគាំទ្រដល់ពន្ធកិច្ចនានានៅក្នុងរូបកាយ ដោយហេតុនេះអនុញ្ញាតឱ្យពន្ធកិច្ចទាំងនោះសម្រេចបានលទ្ធផលដែលចង់បានរបស់ពួកគេប្រកបដោយប្រសិទ្ធភាព។",
    ref: "Acts 6:1-7; Romans 12:7; Galatians 6:2, 10"
  },
  L: {
    code: "L",
    nameEn: "Helps",
    nameKh: "ជំនួយ",
    descEn: "The Gift of helps is the special attribute given by God's Spirit to certain members of the Body of Christ to help other members be more effective in using their Gift(s) within the Body.",
    descKh: "អំណោយទាននៃជំនួយ គឺជាលក្ខណសម្បត្តិពិសេសដែលព្រះវិញ្ញាណរបស់ព្រះបានប្រទានដល់សមាជិកមួយចំនួននៃរូបកាយរបស់ព្រះគ្រីស្ទ ដើម្បីជួយសមាជិកដទៃទៀតឱ្យមានប្រសិទ្ធភាពជាងមុនក្នុងការប្រើប្រាស់អំណោយទានរបស់ពួកគេនៅក្នុងរូបកាយ។",
    ref: "Mark 15:40-41; Acts 9:36; Romans 16:1-2; 1 Corinthians 12:28"
  },
  M: {
    code: "M",
    nameEn: "Wisdom",
    nameKh: "ប្រាជ្ញា",
    descEn: "The Gift of wisdom is the special attribute given by God's Spirit to certain members of the Body of Christ to practically understand and discern Biblical truths and apply them.",
    descKh: "អំណោយទាននៃប្រាជ្ញា គឺជាលក្ខណសម្បត្តិពិសេសដែលព្រះវិញ្ញាណរបស់ព្រះបានប្រទានដល់សមាជិកមួយចំនួននៃរូបកាយរបស់ព្រះគ្រីស្ទ ដើម្បីយល់ និងសម្គាល់សេចក្ដីពិតក្នុងព្រះគម្ពីរ និងអនុវត្តវា។",
    ref: "Acts 6:3; 1 Corinthians 2:1-13; 1 Corinthians 12:8"
  },
  N: {
    code: "N",
    nameEn: "Knowledge",
    nameKh: "ចំណេះដឹង",
    descEn: "The Gift of knowledge is the special attribute given by God's Spirit to certain members of the Body of Christ to acquire deep insights into God's Word and bring illumination of these insights that cannot be explained through human reason.",
    descKh: "អំណោយទាននៃចំណេះដឹង គឺជាលក្ខណសម្បត្តិពិសេសដែលព្រះវិញ្ញាណរបស់ព្រះបានប្រទានដល់សមាជិកមួយចំនួននៃរូបកាយរបស់ព្រះគ្រីស្ទ ដើម្បីទទួលបានការយល់ដឹងស៊ីជម្រៅអំពីព្រះបន្ទូលរបស់ព្រះ និងនាំមកនូវការបំភ្លឺអំពីការយល់ដឹងទាំងនេះ ដែលមិនអាចពន្យល់បានតាមរយៈហេតុផលរបស់មនុស្ស។",
    ref: "1 Corinthians 2:14; 1 Corinthians 12:8; 2 Corinthians 11:6; Colossians 2:2-3"
  },
  O: {
    code: "O",
    nameEn: "Hospitality",
    nameKh: "បដិសណ្ឋារកិច្ច",
    descEn: "The Gift of hospitality is the special attribute given by God's Spirit to certain members of the Body of Christ to cheerfully provide an open house to those in need of food and lodging.",
    descKh: "អំណោយទាននៃបដិសណ្ឋារកិច្ច គឺជាលក្ខណសម្បត្តិពិសេសដែលព្រះវិញ្ញាណរបស់ព្រះបានប្រទានដល់សមាជិកមួយចំនួននៃរូបកាយរបស់ព្រះគ្រីស្ទ ដើម្បីផ្តល់ផ្ទះបើកចំហដល់អ្នកដែលត្រូវការអាហារ និងកន្លែងស្នាក់នៅដោយរីករាយ។",
    ref: "Acts 16:14-15; Romans 12:9-13; Romans 16:23; 1 Peter 4:9"
  },
  P: {
    code: "P",
    nameEn: "Discernment",
    nameKh: "ការយល់ដឹង / ការសម្គាល់",
    descEn: "The Gift of discernment is the special attribute given by God's Spirit to certain members of the Body of Christ to know with confidence if individuals, teachings, or motives are from God.",
    descKh: "អំណោយទាននៃការយល់ដឹង គឺជាលក្ខណសម្បត្តិពិសេសដែលព្រះវិញ្ញាណរបស់ព្រះបានប្រទានដល់សមាជិកមួយចំនួននៃរូបកាយរបស់ព្រះគ្រីស្ទ ដើម្បីដឹងដោយទំនុកចិត្តថាតើបុគ្គល ការបង្រៀន ឬហេតុផលនោះ មកពីព្រះឬអត់។",
    ref: "Matthew 16:21-23; Acts 5:1-11; Acts 16:16-18; 1 Corinthians 12:10"
  }
};

// Full 112 Questions for Spiritual Gifts
const SPIRITUAL_GIFTS_QUESTIONS = [
  "1. នៅពេលដែលខ្ញុំឮសារផ្សព្វផ្សាយសាសនា ខ្ញុំអធិស្ឋានសម្រាប់មនុស្សដែលមិនស្គាល់ព្រះគ្រីស្ទ។\nWhen I hear evangelistic messages, I pray for people who don't know Christ.",
  "2. ខ្ញុំត្រូវបានទាក់ទាញដោយឱកាសដែលខ្ញុំអាចផ្តល់ទិសដៅដល់អ្នកដទៃ។\nI am drawn to opportunities where I can give direction to others.",
  "3. នៅពេលដែលអ្នកដទៃប្រាប់ខ្ញុំពីបញ្ហារបស់ពួកគេ ខ្ញុំអាចមានអារម្មណ៍ឈឺចាប់យ៉ាងខ្លាំង។\nWhen others tell me their problems, I can deeply feel their hurt.",
  "4. ខ្ញុំមានអំណោយទានក្នុងការរៀបចំភារកិច្ចតាមរបៀបជាប្រព័ន្ធ។\nI am gifted at organizing tasks in a systematic manner.",
  "5. នៅពេលដែលខ្ញុំឃើញខុស ខ្ញុំមានអារម្មណ៍ថាត្រូវបង្ខំចិត្តនិយាយ។\nWhen I see wrong, I feel compelled to speak.",
  "6. ខ្ញុំចូលចិត្តផ្តល់ធនធានហិរញ្ញវត្ថុ និងសម្ភារៈដោយមិនឱ្យអ្នកទទួលដឹងថាអ្នកណាជាអ្នកផ្តល់។\nI enjoy giving financial and material resources without the recipient knowing who gave.",
  "7. ខ្ញុំអាចពន្យល់ពីសេចក្តីពិតយ៉ាងច្បាស់ និងមានប្រសិទ្ធភាពនៅក្នុងព្រះបន្ទូលរបស់ព្រះ។\nI am able to clearly and effectively explain truths within God's Word.",
  "8. អ្នកជឿដែលវង្វេងចេញពីជំនឿពិតជាយកចិត្តទុកដាក់ចំពោះខ្ញុំ ហើយខ្ញុំខិតខំយ៉ាងសកម្មដើម្បីនាំពួកគេត្រឡប់មកវិញ។\nBelievers who stray from the faith really concern me and I actively seek to bring them back.",
  "9. ចំពោះខ្ញុំ វាងាយស្រួលក្នុងការទុកចិត្តលើព្រះចំពោះអ្វីដែលមិនអាចទៅរួច។\nFor me, it's easy to trust God for the impossible.",
  "10. ខ្ញុំតែងតែឃើញខ្លួនឯងលើកទឹកចិត្តអ្នកដែលមានបញ្ហា លួងលោមអ្នកដែលមានបញ្ហា និងធានាដល់អ្នកដែលរង្គោះរង្គើ។\nI frequently find myself encouraging the troubled, comforting the distressed, and reassuring the wavering.",
  "11. នៅពេលដែលនរណាម្នាក់សុំឱ្យខ្ញុំធ្វើការងារមួយ ខ្ញុំមានអារម្មណ៍រំភើបសូម្បីតែពេលដែលការងារនោះមិនអាចមើលឃើញយ៉ាងច្បាស់ចំពោះអ្នកដទៃក៏ដោយ។\nWhen someone asks me to do a job, I get excited even when the job isn't highly visible to others.",
  "12. ការចូលរួមជាមួយបុគ្គលម្នាក់ៗ និងការគាំទ្រពួកគេនៅក្នុងកិច្ចបម្រើរបស់ពួកគេនាំមកនូវការពេញចិត្តយ៉ាងខ្លាំងដល់ខ្ញុំ។\nComing alongside individuals and supporting them in their ministries brings me great satisfaction.",
  "13. នៅពេលដែលខ្ញុំរកឃើញសេចក្តីពិតនៃព្រះគម្ពីរ ខ្ញុំអនុវត្តវាយ៉ាងប៉ិនប្រសប់ និងជាក់ស្តែងទៅក្នុងស្ថានភាពជីវិតរបស់ខ្ញុំ។\nWhen I discover Biblical truths, I make skillful and practical applications of them into my life situations.",
  "14. ខ្ញុំយល់ឃើញ និងយល់ពីសេចក្តីពិតនៃព្រះបន្ទូលរបស់ព្រះ។\nI perceive and understand the truths of God's Word.",
  "15. ខ្ញុំសប្បាយចិត្តជាងជាមួយភ្ញៀវជាញឹកញាប់នៅក្នុងផ្ទះរបស់ខ្ញុំជាងពេលខ្ញុំនៅម្នាក់ឯង។\nI am happier with guests frequently in my home than when I am alone.",
  "16. មនុស្សប្រាប់ខ្ញុំថា ខ្ញុំអាចមើលឃើញការបោកប្រាស់មុនអ្នកដទៃ។\nPeople tell me that I can see through phonies before others do.",
  "17. ខ្ញុំរីករាយនឹងការកសាងទំនាក់ទំនង និងចំណាយពេលជាមួយអ្នកមិនមែនជាគ្រីស្ទបរិស័ទ។\nI enjoy building relationships and spending time with non-Christians.",
  "18. បញ្ហាក្រុមគឺគួរឱ្យចាប់អារម្មណ៍ជាងបញ្ហាបុគ្គល។\nGroup problems are more interesting to me than individual problems.",
  "19. ខ្ញុំមានទំនោរអាណិតអាសូរចំពោះអ្នកដែល ត្រូវបានអ្នកដទៃបដិសេធ។\nI tend to have compassion for those who are rejected by others.",
  "20. ខ្ញុំរៀបចំផែនការលម្អិតនៃព្រឹត្តិការណ៍យ៉ាងហ្មត់ចត់ ដោយវិភាគ និងមុនថ្ងៃផុតកំណត់។\nI plan details of an event thoroughly, analytically, and well in advance of the deadline.",
  "21. នៅពេលដែលបុគ្គល ឬក្រុមនានាងាកចេញពីព្រះបន្ទូលរបស់ព្រះ ខ្ញុំអាចដឹងពីគ្រោះថ្នាក់ដែលនឹងមកដល់ ហើយមានឆន្ទៈក្នុងការព្រមាន។\nWhen individuals or groups depart from God's Word, I can sense the coming danger and am willing to voice a warning.",
  "22. ខ្ញុំនឹងលះបង់សម្ភារៈដើម្បីឱ្យធនធានរបស់ខ្ញុំកាន់តែច្រើន ត្រូវបានប្រើប្រាស់សម្រាប់បុព្វហេតុគ្រីស្ទបរិស័ទ។\nI would sacrifice materially in order for more of my resources to go to Christian causes.",
  "23. វាធ្វើឱ្យខ្ញុំខឹងនៅពេលដែលអ្នកនិយាយប្រើខគម្ពីរព្រះគម្ពីរ ចេញក្រៅពីបរិបទ។\nIt irritates me when a speaker uses a Bible verse out of context.",
  "24. ខ្ញុំចូលចិត្តទំនាក់ទំនងជាមួយក្រុមអ្នកជឿជាក់លាក់មួយ ក្នុងរយៈពេលយូរ។\nI enjoy relating to a specific group of believers over an extended period of time.",
  "25. ខ្ញុំអាចស្រមៃមើលការដឹកនាំរបស់ព្រះក្នុងកាលៈទេសៈដែលមិនទំនង ហើយខិតខំដើម្បីសម្រេចអ្វីដែលខ្ញុំជឿថាជាព្រះហឫទ័យរបស់ទ្រង់។\nI am able to envision God's leading in unlikely circumstances, and work to accomplish what I believe is His will.",
  "26. ខ្ញុំចូលចិត្តណែនាំជំហានជាក់ស្តែងសម្រាប់មនុស្សដើម្បី យកឈ្នះលើបញ្ហាប្រឈម ប៉ុន្តែផ្តោតលើការវិនិយោគខ្លួនឯងលើអ្នកដែលចាត់វិធានការតាមដំបូន្មានរបស់ខ្ញុំ។\nI like to suggest practical steps for people to overcome challenges, but focus on investing myself in those who take action on my advice.",
  "27. ខ្ញុំចូលចិត្តធ្វើកិច្ចការដែលអ្នកដទៃច្រើនតែមិនមានបំណងចង់ធ្វើ។\nI enjoy doing tasks that others tend to have no desire to do.",
  "28. ខ្ញុំស្ម័គ្រចិត្តធ្វើកិច្ចការដែលហាក់ដូចជាទម្លាប់ ប៉ុន្តែអាចឱ្យអ្នកដទៃមានប្រសិទ្ធភាពក្នុងការដឹកនាំ។\nI volunteer for tasks that appear routine, but which enable others to be more effective in leading.",
  "29. ខ្ញុំអាចដឹង យល់ និងអនុវត្តព្រះបន្ទូលរបស់ព្រះជាម្ចាស់ក្នុងការទំនាក់ទំនងជាមួយអ្នកដទៃ។\nI am able to know, understand and apply God's Word in communicating to others.",
  "30. ខ្ញុំចូលចិត្តសិក្សាព្រះគម្ពីរ អង្កេតអត្ថន័យពេញលេញនៃអត្ថបទ និងស្វែងយល់ពីបរិបទនៃពាក្យ និងឃ្លានីមួយៗ។\nI enjoy studying the Bible, investigating the full meaning of a text, and exploring the context of individual words and phrases.",
  "31. ខ្ញុំត្រូវបានគេប្រាប់ថា ខ្ញុំធ្វើឱ្យមនុស្សចម្លែកមានអារម្មណ៍ស្វាគមន៍នៅពេលពួកគេមកលេង ឬស្នាក់នៅក្នុងផ្ទះរបស់ខ្ញុំ។\nI have been told that I make strangers feel welcome when they visit or stay in my home.",
  "32. ពេលខ្ញុំអានសៀវភៅសាសនា ខ្ញុំអាចរកឃើញកំហុសឆ្គងទាំងស្រុងពីការពិត។\nWhen I read a religious book, I'm able to detect outright errors from the truth.",
  "33. ការប្រាប់អ្នកដទៃពីរបៀបដែលខ្ញុំបានទទួលយកព្រះគ្រីស្ទគឺជាផ្នែកធម្មតានៃរបៀបរស់នៅរបស់ខ្ញុំ។\nTelling others how I came to accept Christ is a regular part of my lifestyle.",
  "34. ព្រះជាម្ចាស់ប្រើខ្ញុំដើម្បីជំរុញអ្នកដទៃឱ្យមើលឃើញចក្ខុវិស័យរបស់ទ្រង់សម្រាប់ក្រុម។\nGod uses me to motivate others to see His vision for the group.",
  "35. មនុស្សដែលឈឺចាប់ និងខ្វះខាតទាក់ទាញការចាប់អារម្មណ៍ និងពេលវេលារបស់ខ្ញុំ។\nPeople who are hurting and in need attract my attention and time.",
  "36. \"ការធ្វើកិច្ចការច្រើនក្នុងពេលតែមួយ\" ឬធ្វើការងារច្រើនក្នុងពេលតែមួយ គឺជាអ្វីដែលខ្ញុំធ្វើប្រកបដោយប្រសិទ្ធភាព។\n\"Multi-tasking,\" or doing multiple jobs simultaneously, is something I do efficiently.",
  "37. ខ្ញុំនឹងលាតត្រដាងអំពើបាប ទោះបីជាវាមិនពេញនិយម ឬគ្មាននរណាម្នាក់យល់ស្របនឹងជំនឿរបស់ខ្ញុំក៏ដោយ។\nI will expose sin even when it is unpopular or no one agrees with my conviction.",
  "38. ចំពោះខ្ញុំ វាងាយស្រួលក្នុងការបរិច្ចាគដល់កិច្ចការរបស់ព្រះលើសពីការថ្វាយតង្វាយ 10%។\nFor me, it's easy to give to God's work beyond the 10% tithe.",
  "39. មនុស្សសរសើរខ្ញុំចំពោះការធ្វើឱ្យប្រធានបទពិបាកៗងាយយល់។\nPeople compliment me on making difficult subjects easy to understand.",
  "40. ការទទួលខុសត្រូវដែលខ្ញុំអាចសន្មត់ថាការត្រួតពិនិត្យខាងវិញ្ញាណរបស់ក្រុមមនុស្សទាក់ទាញពេលវេលា និងការយកចិត្តទុកដាក់របស់ខ្ញុំ។\nResponsibilities where I can assume the spiritual oversight of a group of people draw my time and attention.",
  "41. ខ្ញុំប្រគល់ឧបសគ្គលំបាកៗដល់ព្រះក្នុងការអធិស្ឋានហើយមិនបារម្ភអំពីការឆ្លើយតបរបស់ទ្រង់ចំពោះការអធិស្ឋានទាំងនោះទេ។\nI commit difficult obstacles to God in prayer and am not anxious about His answering those prayers.",
  "42. វិធីដែលខ្ញុំចូលចិត្តក្នុងការបង្រៀន និងត្រូវបានបង្រៀនគឺតាមរយៈការអនុវត្តជាក់ស្តែង និងឧទាហរណ៍ព្រះគម្ពីរ។\nMy preferred ways to teach and be taught are through practical application and Biblical illustrations.",
  "43. នៅក្នុងការកំណត់ក្រុម ខ្ញុំវាយតម្លៃតម្រូវការយ៉ាងឆាប់រហ័ស ហើយមិនស្ទាក់ស្ទើរក្នុងការជួយបំពេញតម្រូវការទាំងនោះទេ។\nIn a group setting, I quickly assess needs and don't hesitate to help meet those needs.",
  "44. ប្រសិនបើខ្ញុំដឹងថាអ្នកដទៃកំពុងបានជួយ ខ្ញុំចូលចិត្តធ្វើរឿងនៅពីក្រោយឆាក។\nIf I know others are being helped, I enjoy doing things behind the scenes.",
  "45. ខ្ញុំយល់សេចក្ដីពិតពីព្រះបន្ទូលរបស់ព្រះ រៀបចំវា និងភ្ជាប់វាទៅនឹងតម្រូវការជាក់ស្តែង និងបញ្ហានៃជីវិត។\nI grasp truths from God's Word, organize them, and relate them to the practical needs and problems of life.",
  "46. នៅពេលដែលអ្នកនិយាយផ្តល់ព័ត៌មានលម្អិតអំពីពាក្យព្រះគម្ពីរ ការសិក្សា និងបុរាណវិទ្យា ខ្ញុំឃើញថាខ្លួនឯងកំពុងស្តាប់ដោយយកចិត្តទុកដាក់។\nWhen a speaker gives details of Biblical words, studies and archeology, I find myself listening intently.",
  "47. ផ្ទះរបស់ខ្ញុំគឺជាកន្លែងសុវត្ថិភាពសម្រាប់អ្នកដែលខ្វះខាត ហើយខ្ញុំរីករាយដែលមានពួកគេ។\nMy home is a safe place for those in need and I enjoy having them.",
  "48. ខ្ញុំមានអារម្មណ៍ថានៅពេលដែលបរិយាកាសនៅក្នុងការថ្វាយបង្គំគ្រាន់តែជាអារម្មណ៍ ទល់នឹងអារម្មណ៍ដែលដឹកនាំដោយព្រះវិញ្ញាណបរិសុទ្ធ។\nI sense when the atmosphere in a worship service is mere emotion, versus emotion directed by the Holy Spirit.",
  "49. ខ្ញុំអាចទំនាក់ទំនងដំណឹងល្អទៅកាន់អ្នកដែលមិនមែនជាគ្រីស្ទបរិស័ទបានយ៉ាងច្បាស់លាស់ សង្ខេប និងមានប្រសិទ្ធភាព។\nI can clearly, concisely, and effectively communicate the gospel to non-Christians.",
  "50. ខ្ញុំមានសមត្ថភាពបំផុសគំនិត និងលើកទឹកចិត្តអ្នកដទៃឲ្យអនុវត្តនៅកម្រិតខ្ពស់។\nI have an ability to inspire and encourage others to perform at a high level.",
  "51. ខ្ញុំមិនព្យាយាមផ្តល់ជំហានដើម្បីដោះស្រាយបញ្ហារបស់មនុស្សទេ។ ខ្ញុំគ្រាន់តែចង់មានវត្តមានសម្រាប់ពួកគេនៅពេលពួកគេត្រូវការ។\nI do not try to provide steps to solve people's problems; I just want to be available to them in their time of need.",
  "52. ខ្ញុំអាចរៀបចំ និងដឹកនាំឆ្ពោះទៅរកគោលដៅជាក់លាក់និងតាមរបៀបដែលមានសណ្តាប់ធ្នាប់។\nI can organize and direct toward specific goals and in an orderly manner.",
  "53. មនុស្សប្រាប់ខ្ញុំថា ខ្ញុំជាមនុស្សនិយាយត្រង់ៗ និងមានគំនិតផ្ទាល់ខ្លួន ជាពិសេសលើបញ្ហាគោលលទ្ធិ។\nPeople tell me that I am outspoken and opinionated, especially on doctrinal issues.",
  "54. ការទទួលស្គាល់ជាសាធារណៈចំពោះការផ្តល់អំណោយជាហិរញ្ញវត្ថុ គឺមិនមែនជាអ្វីដែលខ្ញុំចូលចិត្តនោះទេ។\nPublic recognition for giving a financial gift is not something I enjoy.",
  "55. ខ្ញុំស្រាវជ្រាវយ៉ាងហ្មត់ចត់អំពីប្រធានបទណាមួយមុនពេលនិយាយអំពីវា។\nI thoroughly research a subject before speaking about it.",
  "56. ខ្ញុំឃើញថាខ្លួនឯងខិតខំជួយអ្នកដទៃឱ្យរីកចម្រើនខាងវិញ្ញាណ។\nI find myself working hard to help others grow spiritually.",
  "57. ខ្ញុំតែងតែព្យាយាមលើកទឹកចិត្តអ្នកដទៃឱ្យជឿលើព្រះក្នុងស្ថានភាពលំបាក ឬមិនអាចទៅរួច។\nI regularly attempt to motivate others to believe God in difficult or impossible situations.",
  "58. ខ្ញុំពិតជាយល់ចិត្តអ្នកនិយាយដែលផ្តល់ជំហានជាក់ស្តែងសម្រាប់ការអនុវត្តគោលការណ៍គ្រីស្ទសាសនា។\nI really relate to speakers who give practical steps for applying Christian principles.",
  "59. ដើម្បីជួយពន្ធកិច្ច ខ្ញុំចូលចិត្តធ្វើគម្រោងដែលផ្តោតលើភារកិច្ចជាជាងធ្វើការមួយទល់នឹងមួយជាមួយមនុស្ស។\nTo help out a ministry, I prefer doing task-oriented projects rather than working one-on-one with people.",
  "60. វាជាចំណង់ចំណូលចិត្តរបស់ខ្ញុំក្នុងការបម្រើពន្ធកិច្ចដោយធ្វើការដោយផ្ទាល់ជាមួយមនុស្សជាជាងនៅក្នុងគម្រោងដែលផ្តោតលើភារកិច្ច។\nIt is my preference to serve ministries by working directly with people rather than in task-oriented projects.",
  "61. នៅក្នុងបទពិសោធន៍ប្រចាំថ្ងៃរបស់ខ្ញុំ ខ្ញុំតែងតែប្រើប្រាស់ចំណេះដឹងព្រះគម្ពីរឱ្យមានប្រសិទ្ធភាព។\nIn my daily experience, I regularly put Bible knowledge to work.",
  "62. មនុស្សប្រាប់ខ្ញុំថា ខ្ញុំជួយពួកគេឱ្យយល់ពីការពិតសំខាន់ៗពីព្រះគម្ពីរ។\nPeople tell me that I help them understand important facts from Scripture.",
  "63. មនុស្សសរសើរខ្ញុំចំពោះភាពបើកចំហរបស់ខ្ញុំ ចំពោះការអនុញ្ញាតឱ្យអ្នកដទៃស្នាក់នៅផ្ទះរបស់ខ្ញុំ។\nPeople compliment me on my openness toward allowing others to stay at my home.",
  "64. ខ្ញុំអាចមើលឃើញភ្លាមៗនូវការបង្រៀនរបស់និកាយដែលលាយបញ្ចូលគ្នានូវ សេចក្តីពិតមួយចំនួនជាមួយនឹងការបង្រៀនមិនពិតជាច្រើន។\nI can immediately spot cult teachings that mix some truth with many false teachings.",
  "65. ខ្ញុំជឿថាព្រះវិហារភាគច្រើនមិនបានសង្កត់ធ្ងន់លើ ការផ្សព្វផ្សាយសាសនាគ្រប់គ្រាន់ទេ។\nI believe most churches do not emphasize evangelism enough.",
  "66. នៅពេលនិយាយអំពីគោលដៅ ខ្ញុំអាចផ្គូផ្គងមនុស្ស និងធនធានដើម្បីសម្រេចបានជោគជ័យ។\nWhen it comes to goals, I can match people and resources to achieve success.",
  "67. វាពិបាកសម្រាប់ខ្ញុំក្នុងការនិយាយថា \"ទេ\" ចំពោះអ្នកដែល ឈឺចាប់ និងខ្វះខាត។\nIt's hard for me to say \"no\" to those who are hurting and in need.",
  "68. ប្រភេទឱកាសស្ម័គ្រចិត្តដែលខ្ញុំស្វែងរក ពាក់ព័ន្ធនឹងការរៀបចំរូបភាពធំទៅជាផ្នែកតូចៗដែលអាចធ្វើបាន។\nThe kind of volunteer opportunities I look for involve organizing the big picture into small, do-able parts.",
  "69. ខ្ញុំមើលឃើញសកម្មភាពជាខ្មៅ ឬស ត្រូវ ឬខុសសម្រាប់គ្រីស្ទបរិស័ទចូលរួម។\nI view activities as black or white, right or wrong for Christians to participate in.",
  "70. ខ្ញុំចូលចិត្តផ្តល់ធនធានហិរញ្ញវត្ថុរបស់ខ្ញុំ ជាជាងពេលវេលារបស់ខ្ញុំ ទៅការងាររបស់ព្រះអម្ចាស់។\nI prefer to give my financial resources, rather than my time, to the Lord's work.",
  "71. ខ្ញុំចូលចិត្តបង្រៀនអ្នកដទៃអំពីសេចក្តីពិតព្រះគម្ពីរ ដើម្បីឲ្យពួកគេអនុវត្តសេចក្តីពិតទាំងនេះ។\nI enjoy teaching others Biblical truths in order for them to apply these truths.",
  "72. ព្រះជាម្ចាស់បានប្រើខ្ញុំដើម្បីនាំគ្រីស្ទបរិស័ទដែលវង្វេងចេញពីទ្រង់ត្រឡប់ទៅរកទំនាក់ទំនងកាន់តែរីកចម្រើនជាមួយទ្រង់ និងប្រជាជនរបស់ទ្រង់វិញ។\nGod has used me to bring Christians who stray away from Him back into a growing relationship with Him and His people.",
  "73. សូម្បីតែក្នុងស្ថានភាពអវិជ្ជមានក៏ដោយ ខ្ញុំចាត់ទុកខ្លួនឯងថាជាអ្នកសុទិដ្ឋិនិយម។\nEven in negative situations, I view myself as an optimist.",
  "74. ការធ្វើឱ្យមនុស្សចូលរួមក្នុងកិច្ចបម្រើតាមរយៈការលើកទឹកចិត្តវិជ្ជមាន គឺជាអ្វីដែលខ្ញុំធ្វើបានយ៉ាងមានប្រសិទ្ធភាព។\nGetting people involved in ministry through positive motivation is something I do effectively.",
  "75. ខ្ញុំត្រូវការមានអារម្មណ៍ថាត្រូវបានកោតសរសើរចំពោះការចូលរួមចំណែករបស់ខ្ញុំចំពោះកិច្ចបម្រើ។\nI need to feel appreciated for my contribution to a ministry.",
  "76. ខ្ញុំចង់ធ្វើការនៅពីក្រោយឆាកដោយមិនមានការទទួលស្គាល់ជាសាធារណៈ។\nI'd rather work behind the scenes without public recognition.",
  "77. ការអនុវត្តការយល់ដឹងខាងវិញ្ញាណទៅលើអ្វីដែលត្រឹមត្រូវ ឬខុសនៃស្ថានភាពស្មុគស្មាញ គឺជាអ្វីដែលខ្ញុំធ្វើបានល្អ។\nExercising spiritual insight into the right or wrong of complicated situations is something I do well.",
  "78. ខ្ញុំជួយអ្នកដទៃក្នុងការសិក្សាព្រះគម្ពីររបស់ពួកគេ ដោយចែករំលែកការរកឃើញរបស់ខ្ញុំអំពីរបៀបដែលព័ត៌មានលម្អិតផ្សេងៗនៃពាក្យ និងឃ្លានីមួយៗសមនឹងគំនិតចម្បងនៃអត្ថបទ។\nI help others in studying their Bible by sharing my discoveries of how various details of individual words and phrases fit into the passage's main idea.",
  "79. ខ្ញុំចាត់ទុកថាវាជាឯកសិទ្ធិក្នុងការមានភ្ញៀវនៅផ្ទះ ហើយខ្ញុំចង់ថែរក្សាតម្រូវការបែបនេះជាអាហារសម្រាប់ពួកគេ។\nI consider it a privilege to have houseguests, and I desire to take care of such needs as food for them.",
  "80. នៅពេលដែលអ្នកដទៃកំពុងបោកបញ្ឆោតក្នុងសកម្មភាព និងហេតុផលរបស់ពួកគេ ជាធម្មតាខ្ញុំដឹងអំពីវា។\nWhen others are being deceptive in their actions and motives, I am usually aware of it.",
  "81. វាធ្វើឱ្យខ្ញុំរំភើបយ៉ាងខ្លាំងនៅពេលដែលនរណាម្នាក់ស្គាល់ព្រះគ្រីស្ទ។\nIt excites me tremendously when someone comes to know Christ.",
  "82. មនុស្សច្រើនតែងាកមករកខ្ញុំដើម្បីសុំទិសដៅ នៅពេលដែលមិនមានអ្នកដឹកនាំដែលបានបង្កើតឡើងយ៉ាងច្បាស់លាស់នៅក្នុងក្រុម។\nPeople often look to me for direction when there is no clearly established leader in the group.",
  "83. ការជួយអ្នកដទៃគឺជាអ្វីមួយដែលខ្ញុំមានកម្លាំងចិត្តយ៉ាងខ្លាំងក្នុងការធ្វើ។\nHelping others is something I have a strong inner drive to do.",
  "84. ខ្ញុំខិតខំបង្កើតភាពសុខដុមរមនានៅពេលដែលខ្ញុំទទួលបន្ទុកក្នុងការរៀបចំព្រឹត្តិការណ៍មួយ។\nI strive to create harmony when I am in charge of planning an event.",
  "85. អ្នកដែលនិយាយត្រង់ៗទាក់ទាញចំណាប់អារម្មណ៍ និងពេលវេលារបស់ខ្ញុំ។\nThose who speak straightforwardly draw my attention and time.",
  "86. ខ្ញុំជឿថាការទទួលខុសត្រូវផ្នែកហិរញ្ញវត្ថុគឺមានសារៈសំខាន់។\nI believe financial accountability is vital.",
  "87. មិនថាខ្ញុំមានកាតព្វកិច្ចអ្វីផ្សេងទៀតទេ ខ្ញុំតែងតែចំណាយពេលសិក្សាព្រះគម្ពីរ។\nNo matter what other commitments I have, I always make time to study the Bible.",
  "88. នៅពេលនិយាយអំពីការថែរក្សាតម្រូវការរបស់អ្នកដទៃ ខ្ញុំសុខចិត្តលះបង់តម្រូវការ និងបំណងប្រាថ្នាផ្ទាល់ខ្លួនរបស់ខ្ញុំ។\nWhen it comes to taking care of others' needs, I willingly sacrifice my own needs and desires.",
  "89. ខ្ញុំតែងតែស្តីបន្ទោសគ្រីស្ទបរិស័ទដទៃទៀតចំពោះការខ្វះជំនឿរបស់ពួកគេ។\nI often scold other Christians for their lack of faith.",
  "90. អ្នកដែលត្រូវការការលើកទឹកចិត្តនៅពេលដែលពួកគេបានជួបប្រទះនឹងការខកចិត្តទាក់ទាញចំណាប់អារម្មណ៍របស់ខ្ញុំ។\nThose who need encouragement when they have encountered disappointment draw my time and attention.",
  "91. នៅពេលដែលមនុស្សឃើញច្បាស់ពីតម្រូវការមួយ ហើយមិនស្ម័គ្រចិត្តជួយដោះស្រាយវាទេ នោះធ្វើឱ្យខ្ញុំខឹង។\nWhen people obviously see a need and don't volunteer to help solve it, that makes me angry.",
  "92. ខ្ញុំយល់ថាវាមានប្រយោជន៍ក្នុងការទទួលយកការទទួលខុសត្រូវជំនួសអ្នកដទៃ ដូច្នេះពួកគេមានសេរីភាពក្នុងការផ្តោតលើទិដ្ឋភាពផ្សេងទៀតនៃពន្ធកិច្ច។\nI find it rewarding to take on responsibilities for others so they are free to concentrate on other aspects of ministry.",
  "93. ខ្ញុំយល់ថាវាងាយស្រួលក្នុងការទាញយកការយល់ដឹងពីការសិក្សាព្រះគម្ពីររបស់ខ្ញុំផ្ទាល់ និងពីការសិក្សារបស់អ្នកប្រាជ្ញព្រះគម្ពីរផ្សេងទៀត។\nI find it easy to draw insight from my own study of the Scriptures and from the studies of other Bible scholars.",
  "94. មនុស្សច្រើនតែស្វែងរកខ្ញុំសម្រាប់ការយល់ដឹងរបស់ខ្ញុំអំពីអត្ថបទព្រះគម្ពីរដែលពួកគេចាប់អារម្មណ៍។\nPeople often seek me out for my understanding of Biblical passages of interest to them.",
  "95. ខ្ញុំនឹងក្លាយជាមនុស្សម្នាក់ក្នុងចំណោមអ្នកស្ម័គ្រចិត្តដំបូងគេ នៅពេលដែលព្រះវិហារសុំជំនួយដើម្បីផ្តល់ជម្រកដល់ក្រុមដែលកំពុងឆ្លងកាត់ និងត្រូវការកន្លែងស្នាក់នៅមួយ ឬពីរយប់។\nI would be one of the first to volunteer when the church asks for help to house groups that are passing through and need lodging for a night or two.",
  "96. ខ្ញុំទទួលស្គាល់យ៉ាងឆាប់រហ័សនូវភាពមិនស៊ីសង្វាក់គ្នាក្នុងការបង្រៀនដែលពោរពេញទៅដោយកំហុស និងមិនមែនជាព្រះគម្ពីរ។\nI quickly recognize inconsistencies in teaching that is filled with error and is not Biblical.",
  "97. ខ្ញុំពិតជាមានថាមពលខ្លាំងបន្ទាប់ពីចែករំលែកព្រះគ្រីស្ទជាមួយអ្នកដែលមិនមែនជាគ្រីស្ទបរិស័ទ។\nI'm really energized after sharing Christ with a non-Christian.",
  "98. ខ្ញុំចូលចិត្តបញ្ហាប្រឈមថ្មីៗ ហើយធុញទ្រាន់នឹងការរក្សាគម្រោង ។ល។\nI like new challenges and get bored with maintaining projects.",
  "99. ខ្ញុំស្ម័គ្រចិត្តធ្វើការជាមួយអ្នកក្រីក្រ និងទុក្ខលំបាក។\nI volunteer to work with the underprivileged and poor.",
  "100. ខ្ញុំអាចកំណត់អត្តសញ្ញាណ និងដកចេញព័ត៌មានលម្អិតដែលមិនចាំបាច់ នៅពេលរៀបចំមនុស្ស ឬគម្រោង។\nI can identify and remove unnecessary details when organizing people or projects.",
  "101. ខ្ញុំមានទំនោរសង្ស័យ និងរិះគន់វប្បធម៌សហសម័យ។\nI tend to be suspicious and critical of contemporary culture.",
  "102. ខ្ញុំមិនមានបំណងលាក់កំបាំង ឬរបៀបវារៈសម្ងាត់ នៅពេលខ្ញុំបរិច្ចាគផ្នែកហិរញ្ញវត្ថុទេ។\nI do not have hidden motives or secret agendas when I give financially.",
  "103. ខ្ញុំផ្អៀងទៅរកការពន្យល់ពីសេចក្តីពិតនៃព្រះគម្ពីរ ជាជាងការអនុវត្តវា។\nI lean more toward explaining Biblical truths than applying them.",
  "104. នៅពេលណាដែលគ្រីស្ទបរិស័ទស្ថិតនៅក្រោមការថែទាំ និងឥទ្ធិពលរបស់ខ្ញុំ ខ្ញុំការពារពួកគេដោយធម្មជាតិពីការបង្រៀនមិនពិត\nAny time Christians are under my care and influence, I naturally guard them from false teaching.",
  "105. នៅពេលដែលខ្ញុំជឿជាក់យ៉ាងមុតមាំថាព្រះចង់សម្រេចរឿងដ៏អស្ចារ្យនៅក្នុងក្រុម ខ្ញុំច្រើនតែជាអ្នកដែលលើកទឹកចិត្តមនុស្សឱ្យបោះជំហានចេញដោយជំនឿ ហើយមិនប្រុងប្រយ័ត្ន។\nWhen I strongly believe God wants to accomplish great things in a group, I am often the one who encourages people to step out in faith and not be cautious.",
  "106. ខ្ញុំមើលឃើញការល្បងលជាឱកាសពីព្រះសម្រាប់ការរីកចម្រើនខាងវិញ្ញាណ។\nI see trials as opportunities from God for spiritual growth.",
  "107. ខ្ញុំមិនមានអារម្មណ៍ស្រួលក្នុងការដឹកនាំ ឬផ្ទេរភារកិច្ចដែលត្រូវធ្វើនៅក្នុងពន្ធកិច្ចទេ។\nI do not feel comfortable leading or delegating tasks to be done within a ministry.",
  "108. មនុស្សទទួលស្គាល់ខ្ញុំចំពោះឆន្ទៈរបស់ខ្ញុំក្នុងការជួយអ្នកដទៃ ដើម្បីឲ្យពួកគេអាចកាន់តែមានប្រសិទ្ធភាពក្នុងពន្ធកិច្ចរបស់ពួកគេ\nPeople recognize me for my willingness to assist others so they can become more effective in their ministries.",
  "109. នៅពេលនិយាយអំពីការដឹកនាំមនុស្ស ខ្ញុំមានអំណោយទានក្នុងការឆាប់ដឹង ការយល់ដឹង និងការអនុវត្តព្រះបន្ទូលរបស់ព្រះ។\nWhen it comes to leading people, I am gifted at knowing, understanding, and applying God's Word.",
  "110. ខ្ញុំយកចិត្តទុកដាក់យ៉ាងខ្លាំងចំពោះបញ្ញត្តិរបស់ព្រះក្នុងការ «បង្កើនចំណេះដឹង» ហើយយល់ថាវាងាយស្រួលក្នុងការលះបង់ពេលវេលាជាប្រចាំដើម្បីបំពេញបញ្ញត្តិនេះ។\nI take seriously God's command to \"increase in knowledge,\" and find it easy to commit regular blocks of time to fulfill this command.",
  "111. វាជារឿងសំខាន់សម្រាប់គ្រីស្ទបរិស័ទក្នុងការបើកផ្ទះរបស់ពួកគេនៅពេលដែលមានតម្រូវការ។\nIt is important for Christians to open their homes when there is a need.",
  "112. គ្រីស្ទបរិស័ទតែងតែបញ្ជាក់ពីសមត្ថភាពរបស់ខ្ញុំក្នុងការ «សម្គាល់សេចក្តីពិតពីការកុហក ឬក្លែងក្លាយ»។\nChristians frequently affirm my ability to discern truth from lies and/or counterfeits."
];

// DISC Questions (24 Questions with options A, B, C, D)
const DISC_QUESTIONS = [
  {
    title: "1. នៅពេលនិយាយអំពីការបំពេញកិច្ចការ... / When it comes to working on tasks ...",
    choices: [
      "A. ខ្ញុំដឹងថាខ្ញុំត្រូវការជំនួយពីអ្នក ប៉ុន្តែខ្ញុំចូលចិត្តធ្វើការដោយឯករាជ្យ។ / I know I need your help, but I prefer to operate independently.",
      "B. ខ្ញុំចូលចិត្តបង្កើតគំនិតទាំងនោះ ប៉ុន្តែខ្ញុំមិនចង់ធ្វើវាឲ្យកើតឡើងទេ។ / I love coming up with the ideas, but I prefer not to have to make it happen.",
      "C. ខ្ញុំដឹងថាខ្ញុំជាមនុស្សមានឧត្តមគតិ និងមានទ្រឹស្តី។ ភាពល្អឥតខ្ចោះរបស់ខ្ញុំអាចធ្វើឲ្យអ្នកឆ្កួត ឬធ្វើឲ្យអ្នករីករាយព្រោះខ្ញុំនៅក្នុងក្រុម។ / I know I'm idealistic and theoretical. My perfectionism may drive you nuts or make you glad I'm on the team.",
      "D. គោលដៅរបស់ខ្ញុំគឺត្រូវមានភាពយុត្តិធម៌ និងមិនបង្កគ្រោះថ្នាក់ដល់អ្នកដទៃតាមដែលអាចធ្វើទៅបាន។ / My goal is to be as fair and inoffensive to others as possible."
    ]
  },
  {
    title: "2. ឃ្លាដែលខ្ញុំអាចនិយាយឡើងវិញញឹកញាប់បំផុតគឺ ... / The phrase I might repeat most often is ...",
    choices: [
      "A. \"ខ្ញុំនឹងធ្វើវាដោយខ្លួនឯង\"។ / \"I'll do it myself.\"",
      "B. \"ហេតុអ្វីបានជាមនុស្សគ្រប់គ្នាមិនអាចចូលរួមបាន?\" / \"Why can't everyone get involved?\"",
      "C. \"ប្រសិនបើវាមានតម្លៃធ្វើ នោះវាមានតម្លៃធ្វើបានត្រឹមត្រូវ\"។ / \"If it's worth doing, it's worth doing right.\"",
      "D. \"កាន់តែច្រើន កាន់តែល្អ\"។ / \"The more the merrier.\""
    ]
  },
  {
    title: "3. ខគម្ពីរដែលខ្ញុំចូលចិត្តបំផុតពីសុភាសិតអាចជា ... / My favorite verse from Proverbs could be ...",
    choices: [
      "A. 17:22; \"ការមានចិត្តរីករាយធ្វើឱ្យអ្នកមានសុខភាពល្អ\" / 17:22; \"Being cheerful keeps you healthy\"",
      "B. 27:12; \"មនុស្សដែលមានប្រាជ្ញាតែងតែមើលបញ្ហានៅខាងមុខ ហើយត្រៀមខ្លួនដើម្បីជួបបញ្ហាទាំងនោះ ... \" / 27:12; \"A sensible man watches for problems ahead and prepares to meet them ... \"",
      "C. 15:4; \"ពាក្យសម្ដីទន់ភ្លន់នាំមកនូវសេចក្តីស្លាប់និងរស់ ... \" / 15:4; \"Gentle words cause life and health ... \"",
      "D. 11:14; \"បើគ្មានភាពជាអ្នកដឹកនាំដ៏ឈ្លាសវៃទេ ប្រទេសជាតិនឹងជួបបញ្ហា... \" / 11:14; \"Without wise leadership, a nation is in trouble ... \""
    ]
  },
  {
    title: "4. វាធ្វើឱ្យថ្ងៃរបស់ខ្ញុំ... / It makes my day...",
    choices: [
      "A. ដឹងថាខ្ញុំរក្សាភាពស្ងប់ស្ងាត់នៅពេលដែលអ្នកដទៃកំពុងបាត់បង់ថ្ងៃរបស់ពួកគេ។ / To know that I kept my cool when others were losing theirs.",
      "B. ឈ្នះ។ ខ្ញុំគ្រាន់តែចូលចិត្តយកឈ្នះលើការប្រកួតប្រជែង។ / To win. I just love beating the competition.",
      "C. ធ្វើឱ្យនរណាម្នាក់សើច ឬដើម្បីឱ្យនរណាម្នាក់កោតសរសើររឿងរ៉ាវរបស់ខ្ញុំ។ / To make someone laugh, or to have someone appreciate my story.",
      "D. ដើម្បីឱ្យអ្វីៗគ្រប់យ៉ាងស្ថិតក្នុងលំដាប់ល្អឥតខ្ចោះ។ / To have everything in perfect order."
    ]
  },
  {
    title: "5. ខ្ញុំពិតជាស្អប់... / I absolutely hate ...",
    choices: [
      "A. មិនអាចមានឥទ្ធិពលលើការផ្លាស់ប្តូរ។ / Not being able to affect changes.",
      "B. មានអារម្មណ៍ថាខ្ញុំត្រូវការ \"ក្រោកឈរ\" គ្រប់ពេល។ / Feeling like I need to be \"up\" all the time.",
      "C. ត្រូវបានគេរុញច្រាន ឬបង្ខំ។ / Being pushed.",
      "D. នៅម្នាក់ឯង ឬមិនអាចនិយាយបាន។ / Being alone or not being able to talk."
    ]
  },
  {
    title: "6. នៅក្នុងអាកប្បកិរិយាទូទៅរបស់ខ្ញុំ ខ្ញុំច្រើនជា... / In my overall attitude, I am more ...",
    choices: [
      "A. គ្មានអារម្មណ៍ និងផ្តោតលើសកម្មភាពជាងមនុស្សភាគច្រើន។ / Unemotional and action-oriented than most.",
      "B. ចូលចិត្តនៅម្នាក់ឯង និងគិតពិចារណាជាងមនុស្សភាគច្រើន។ / Introverted and reflective than most.",
      "C. ស្ងប់ស្ងាត់ និងទទួលយកជាងមនុស្សភាគច្រើន។ / Low-key and accepting than most.",
      "D. ចូលចិត្តបង្ហាញភាពទាក់ទាញ និងសុទិដ្ឋិនិយមជាងមនុស្សភាគច្រើន។ / Extroverted and optimistic than most."
    ]
  },
  {
    title: "7. ជាការពិតណាស់... / Of course ...",
    choices: [
      "A. ពួកគេប្រហែលជាខឹងនឹងខ្ញុំ - ពួកគេបានដើរកាត់ព្រះវិហារព្រឹកនេះ ហើយមិនបាននិយាយរកខ្ញុំបន្តិចសោះ! / They must be upset with me - they passed me at church this morning and didn't even speak!",
      "B. ខ្ញុំនឹងមិនដែលអន្ទះសារឡើយ ប្រសិនបើអ្នកដទៃគ្រាន់តែធ្វើអ្វីដែលខ្ញុំបានប្រាប់ពួកគេឱ្យធ្វើ នៅពេលដែលខ្ញុំបានប្រាប់ពួកគេឱ្យធ្វើវា! / I would never get impatient if others would just do what I told them to do when I told them to do it!",
      "C. ខ្ញុំរំភើប។ នេះជារបៀបដែលខ្ញុំមើលទៅឃើញរំភើប។ / I am excited. This is just how excited looks on me.",
      "D. វាមិនមែនជាការកុហកទេ! ប្រហែលជាគ្រាន់តែជាការបំផ្លើសបន្តិចបន្តួចប៉ុណ្ណោះ! / It's not a lie! Well, maybe just a teeny bit of an exaggeration!"
    ]
  },
  {
    title: "8. នៅពេលនិយាយអំពីការបំពេញកិច្ចការ ... / When it comes to working on tasks ...",
    choices: [
      "A. ខ្ញុំបង្កើតថាមពល និងការរំភើបជាច្រើន សូម្បីតែលើកិច្ចការដ៏គួរឱ្យធុញទ្រាន់ក៏ដោយ។ / I create lots of energy and excitement, even on the boring tasks.",
      "B. ខ្ញុំមានទំនោរដឹងពីវិធីល្អបំផុតដើម្បីសម្រេចកិច្ចការ ហើយមិនស្ទាក់ស្ទើរក្នុងការប្រាប់អ្នកដទៃពីរបៀបធ្វើវាទេ។ / I tend to know the best way to accomplish things and don't hesitate in telling others how to do it.",
      "C. ខ្ញុំតែងតែជាប់គាំងនៅក្នុងព័ត៌មានលម្អិត ដែលខ្ញុំអាចមានអារម្មណ៍ខកចិត្ត និងព្រងើយកន្តើយចំពោះគម្រោង។ / I often get so bogged down in the details that I can get frustrated and indifferent about the project.",
      "D. ជាធម្មតាខ្ញុំដឹងពីវិធីធ្វើអ្វីៗ ប៉ុន្តែស្ទាក់ស្ទើរក្នុងការចែករំលែកគំនិតរបស់ខ្ញុំ។ / I usually sense how to do things, but am hesitant about sharing my ideas."
    ]
  },
  {
    title: "9. ការងារស្រមើស្រមៃអស្ចារ្យរបស់ខ្ញុំគឺ ... / My fantasy job would be ...",
    choices: [
      "A. ការងារណាមួយដែលខ្ញុំធ្វើជាប្រធាន ឬនាយកប្រតិបត្តិ។ / Any job where I'm president or CEO.",
      "B. ជួលខ្លួនឯងជា \"ភ្ញៀវពិធីជប់លៀងដ៏ល្អឥតខ្ចោះ\"។ / Renting myself out as the \"perfect party guest.\"",
      "C. អ្នកសម្របសម្រួល ឬអ្នកប្រឹក្សា។ / A mediator or counselor.",
      "D. ការងារមួយដែលតម្រូវឱ្យនាំយកការរៀបចំ និងរចនាសម្ព័ន្ធមកដាក់ក្នុងក្រុម។ / One that requires bringing organization and structure to a group."
    ]
  },
  {
    title: "10. ចំណុចខ្សោយពីរដែលខ្ញុំមានគឺ ... / Two weaknesses I have are ...",
    choices: [
      "A. ខ្វះការតាមដាន និងការប្តេជ្ញាចិត្តហួសហេតុពេក។ / Lack of follow-through and over-committing.",
      "B. មានអារម្មណ៍ឆេវឆាវ និងទុទិដ្ឋិនិយម។ / Being moody and pessimistic.",
      "C. មានភាពរឹងរូស និងបង្ខំ។ / Being overbearing and pushy.",
      "D. ខ្វះការរៀបចំ និងវិន័យ។ / Lack of organization and discipline."
    ]
  },
  {
    title: "11. នៅកន្លែងធ្វើការ ... / At work ...",
    choices: [
      "A. ខ្ញុំតែងតែកំណត់ស្តង់ដារខ្ពស់ពេកសម្រាប់ខ្លួនខ្ញុំ និងអ្នកដទៃ។ / I often set the standards too high for myself and others.",
      "B. ខ្ញុំងាយនឹងរំខាន ហើយពិបាកកំណត់អាទិភាព។ / I'm easily distracted, and find it difficult to prioritize.",
      "C. ខ្ញុំច្រើនតែខ្វះការលើកទឹកចិត្ត និងពិបាកកំណត់គោលដៅ។ / I often lack motivation and find it difficult to set goals.",
      "D. ខ្ញុំមានទំនោរជាមនុស្សងប់ការងារ ហើយងាយនឹងធុញទ្រាន់នឹងព័ត៌មានលម្អិត។ / I tend to be a workaholic, and get bored easily with details."
    ]
  },
  {
    title: "12. ចំណុចលេចធ្លោមួយដែលខ្ញុំត្រូវបានគេស្គាល់គឺ ... / A hallmark I'm known for is my ...",
    choices: [
      "A. អសមត្ថភាពក្នុងការទទួលយកការផ្លាស់ប្តូរយ៉ាងឆាប់រហ័ស។ / Inability to accept change quickly.",
      "B. ស្មារតីផ្សងព្រេង និងឆន្ទៈក្នុងការប្រថុយប្រថានច្រើនជាងមនុស្សធម្មតា។ / Adventurous spirit and willingness to take more risks than the average person.",
      "C. ការគិតស៊ីជម្រៅ និងការប្រុងប្រយ័ត្នមុនពេលធ្វើការសម្រេចចិត្ត។ / Deep thinking and cautiousness before making a decision.",
      "D. ជាគំនូរជីវចល និងការនិទានរឿង។ / Animation and storytelling."
    ]
  },
  {
    title: "13. រឿងមួយដែលអ្នកគួរតែដឹងអំពីខ្ញុំគឺ ... / One thing you should know about me is ...",
    choices: [
      "A. ខ្ញុំមានភាពកក់ក្តៅ ទាក់ទាញ និងសប្បាយក្នុងការនៅមានមនុស្សជុំវិញ។ / I'm warm, engaging, and fun to be around.",
      "B. ពេលខ្លះខ្ញុំអាចប្រើកម្លាំងខ្លាំងពេកក្នុងការព្យាយាមធ្វើអ្វីមួយឲ្យបានសម្រេច។ / At times I can be too forceful in trying to get something done.",
      "C. ប្រសិនបើខ្ញុំប្រាប់អ្នកថាខ្ញុំនឹងធ្វើអ្វីមួយ ខ្ញុំអាចធានាបានថាខ្ញុំនឹងធ្វើវា! / If I tell you I will do something, you can rest assured I'll do it!",
      "D. ទោះបីជាខ្ញុំចូលចិត្តបង្កើតមិត្តភក្តិថ្មីក៏ដោយ ខ្ញុំតែងតែត្រូវការអ្នកផ្សេងធ្វើការទាក់ទងជាមុន។ / As much as I love making new friends, I often need the other person to make the first move."
    ]
  },
  {
    title: "14. ប្រសិនបើអ្នកមើលខ្ញុំក្នុងស្ថានភាពមានមនុស្សច្រើន អ្នកប្រហែលជាឃើញខ្ញុំឈរ ... / If you watch me in a crowded situation, you'll probably see me standing ...",
    choices: [
      "A. កន្លែងណាដែលខ្ញុំត្រូវបានគេប្រាប់ឲ្យឈរ។ / Wherever I'm told to stand.",
      "B. តែម្នាក់ឯង ឬផ្លាស់ទីហ្វូងមនុស្សទៅកន្លែងដែលខ្ញុំនៅ។ / Alone, or moving the crowd over to where I am.",
      "C. នៅជាយម្ខាង នៅខាងក្រៅសកម្មភាព។ / On the fringes, just outside of the action.",
      "D. នៅកណ្តាលហ្វូងមនុស្ស។ / In the center of the crowd."
    ]
  },
  {
    title: "15. ក្នុងនាមជាមិត្តភក្តិ ... / As a friend ...",
    choices: [
      "A. ជាធម្មតាខ្ញុំមានប្រជាប្រិយភាព ប៉ុន្តែអាចគ្របដណ្ដប់លើការសន្ទនា។ / I'm usually popular, but might dominate conversations.",
      "B. ខ្ញុំមានទំនាក់ទំនងធម្មតាជាច្រើន ហើយអាចមានទំនោរប្រើប្រាស់មនុស្ស។ / I have many casual relationships, and might tend to use people.",
      "C. ខ្ញុំស្មោះត្រង់ណាស់ ហើយអាចហាក់ដូចជាមិនមានសុវត្ថិភាពក្នុងសង្គម។ / I'm fairly loyal, and may seem insecure socially.",
      "D. ខ្ញុំមានទំនាក់ទំនងស៊ីជំរៅ និងពិបាកបង្កើតមិត្តភក្តិថ្មី។ / I have deep relationships and struggle making new friends."
    ]
  },
  {
    title: "16. ចំពោះភាពជាអ្នកដឹកនាំរបស់ខ្ញុំចំពោះមនុស្ស ... / As far as my leadership of people ...",
    choices: [
      "A. ខ្ញុំចូលចិត្តក្លាយជាផ្នែកមួយនៃក្រុម និងធ្វើឱ្យប្រាកដថាគ្មាននរណាម្នាក់ធ្វើឱ្យពួកគេឈឺចាប់នោះទេ។ / I enjoy being part of a team and making sure no one gets their feelings hurt.",
      "B. ខ្ញុំចូលចិត្តបន្ធូរបន្ថយរឿងក្រុម - ជួយមនុស្សឱ្យសម្រាក និងមានពេលវេលាល្អ។ / I prefer to loosen things up on the team - help people relax and have a good time.",
      "C. ខ្ញុំរីកចម្រើនក្នុងតួនាទីជាអ្នកដឹកនាំ ហើយមានភាពឯករាជ្យ និងមានទំនុកចិត្តលើខ្លួនឯងខ្លាំង។ / I thrive in leadership roles and am very independent and self-confident.",
      "D. ខ្ញុំក្លាយជាអ្នកដើរតាមបានល្អជាងអ្នកដឹកនាំ ហើយពិតជាចូលចិត្តវាតាមរបៀបនោះ។ / I make a better follower than a leader, and actually prefer it that way."
    ]
  },
  {
    title: "17. ឃ្លាទូទៅបំផុតដែលខ្ញុំឮអំពីខ្លួនខ្ញុំគឺ ... / The most common phrase I hear about myself is ...",
    choices: [
      "A. \"គាត់ តែងតែគិត និងរៀបចំផែនការ\"។ / \"He/She is always thinking and planning.\"",
      "B. \"គាត់ពិតជារីករាយណាស់ដែលបាននៅជុំវិញមនុស្ស\"។ / \"He/She is just a blast to be around.\"",
      "C. \"គាត់អត់ធ្មត់ និងស្ងប់ស្ងាត់ណាស់\"។ / \"He/She is so patient and calm.\"",
      "D. \"កុំបារម្ភ គាត់នឹងដោះស្រាយអ្វីៗគ្រប់យ៉ាង\"។ / \"Don't worry, he/she will handle everything.\""
    ]
  },
  {
    title: "18. ខ្ញុំពិតជារីកចម្រើនលើ ... / I really thrive on ...",
    choices: [
      "A. បង្កើតភាពសប្បាយរីករាយ និងរំភើបសម្រាប់អ្នកដទៃ។ / Creating fun and excitement for others.",
      "B. យកចិត្តទុកដាក់ជាពិសេសជាមួយនឹងព័ត៌មានលម្អិត និងភស្តុភារ។ / Taking special care with the details and logistics.",
      "C. ដឹកនាំអ្នកដទៃទៅកាន់គោលដៅរួម។ / Leading others to a mutual goal.",
      "D. ភាពសុខដុមរមនា និងអវត្តមាននៃជម្លោះ។ / Harmony and absence of conflict."
    ]
  },
  {
    title: "19. ក្រុមគ្រួសារ មិត្តភក្តិ និងមិត្តរួមការងាររបស់ខ្ញុំទំនងជាពណ៌នាខ្ញុំថាជា ... / My family, friends, and co-workers would likely describe me as being ...",
    choices: [
      "A. ជឿជាក់លើរឿងដែលខ្ញុំជឿ។ / Persuasive about things I believe in.",
      "B. លេងសើច និងធ្វើដោយឯកឯងភ្លាមៗ។ / Playful and spontaneous.",
      "C. មិនប្រឈមមុខដាក់គ្នាអំពីបញ្ហា។ / Non-confrontational about issues.",
      "D. តស៊ូនៅពេលដែលខ្ញុំប្រាកដអំពីអ្វីមួយ។ / Persistent when I am sure about something."
    ]
  },
  {
    title: "20. មនុស្សកោតសរសើរខ្ញុំបំផុតចំពោះ... / People admire me most for ...",
    choices: [
      "A. ភាពកក់ក្តៅ ភាពរីករាយ ការលេងសើច និងជំនាញទំនាក់ទំនងខាងមនុស្សរបស់ខ្ញុំ។ / My warmth, enthusiasm, humor, and people skills.",
      "B. ការយកចិត្តទុកដាក់ និងការអាណិតអាសូរយ៉ាងជ្រាលជ្រៅរបស់ខ្ញុំ និងការប្រុងប្រយ័ត្ន និងសន្សំសំចៃ។ / My deep concern and compassion, and for being cautious and economical.",
      "C. ការរក្សាភាពស្ងប់ស្ងាត់ កក់ក្តៅ និងប្រមូលផ្តុំរបស់ខ្ញុំ ព្រមទាំងមានសុភមង្គល និងមានតុល្យភាពល្អ។ / My staying calm, cool, and collected, and being happy and well-balanced.",
      "D. ភាពជាអ្នកដឹកនាំដ៏មុតមាំ ការសម្រេចចិត្ត និងការផ្តោតលើគោលដៅរបស់ខ្ញុំ។ / My strong-willed leadership, decisiveness, and being goal-oriented."
    ]
  },
  {
    title: "21. មនុស្សប្រហែលជាចូលចិត្តរឿងនេះអំពីរបៀបដែលខ្ញុំទំនាក់ទំនងជាមួយពួកគេ... / People probably like this about the way I communicate with them ...",
    choices: [
      "A. ខ្ញុំនិយាយត្រង់ៗ ហើយមិនប្រកាន់ក្នុងការនិយាយការពិតទេ។ / I am direct and don't mind speaking the truth.",
      "B. ខ្ញុំអាចស្តាប់បានល្អ និងផ្តល់ដំបូន្មានល្អ។ / I can listen well and give good counsel.",
      "C. ខ្ញុំបង្ហាញពីគំនិត និងយោបល់របស់ខ្ញុំតាមរបៀបច្បាស់លាស់ និងលម្អិត។ / I express my thoughts and opinions in a precise and detailed way.",
      "D. ពួកគេចូលចិត្តរឿងរ៉ាវរបស់ខ្ញុំ ហើយនៅពេលដែលខ្ញុំមានអារម្មណ៍វិជ្ជមាន វាផ្តល់ឱ្យការលើកទឹកចិត្តដល់ពួកគេ។ / They love my stories, and when I am in a positive mood, it gives them encouragement."
    ]
  },
  {
    title: "22. ប្រសិនបើនរណាម្នាក់ប្រាប់ខ្ញុំថាគំនិតរបស់ខ្ញុំមិនអាចធ្វើបាន... / If someone tells me my idea can't be done ...",
    choices: [
      "A. ខ្ញុំគ្រាន់តែមិនអាចរង់ចាំដើម្បីបញ្ជាក់ថាពួកគេខុស ហើយខ្ញុំបន្តដោយការតាំងចិត្តកាន់តែខ្លាំង។ / I just can't wait to prove them wrong, and I proceed with even more determination.",
      "B. ខ្ញុំបាក់ទឹកចិត្ត ហើយព្រួយបារម្ភអំពីពេលវេលាទាំងអស់ដែលខ្ញុំបានខ្ជះខ្ជាយក្នុងការរៀបចំផែនការ។ / I get discouraged, and worry about all of the time I've wasted in planning.",
      "C. ជាធម្មតាខ្ញុំរីករាយ ព្រោះវាស្តាប់ទៅដូចជាការងារច្រើនពេកហើយ។ / I'm usually glad, because it sounded like too much work anyway.",
      "D. ខ្ញុំគ្រាន់តែអរគុណពួកគេយ៉ាងជ្រាលជ្រៅ ហើយឈប់ដោយរីករាយ។ / I just thank them profusely and cheerfully quit."
    ]
  },
  {
    title: "23. នៅពេលដែលនរណាម្នាក់ធ្វើឱ្យខ្ញុំអាក់អន់ចិត្ត គំនិតដំបូងដែលចូលក្នុងខួរក្បាលរបស់ខ្ញុំគឺ ... / When someone offends me, the first thought that might run through my head would be ...",
    choices: [
      "A. ខ្ញុំប្រាកដថាពួកគេមិនមានបំណងធ្វើបែបនោះចំពោះខ្ញុំទេ ... / I'm sure they didn't mean to do that to me ...",
      "B. អូ វាមិនសំខាន់ទេ ... ពិតមែន! / Oh, it doesn't matter ... really!",
      "C. ពួកគេនឹងមិនរួចខ្លួនពីរឿងនោះទេ! / They're not going to get away with that!",
      "D. ហេតុអ្វីបានជាពួកគេបន្តធ្វើបែបនោះចំពោះខ្ញុំ? / Why do they keep doing that to me?"
    ]
  },
  {
    title: "24. ទស្សនវិជ្ជារបស់ខ្ញុំអំពីការអត់ទោសគឺ ... / My philosophy about forgiveness is ...",
    choices: [
      "A. \"ដូច្នេះ ... តើមានអ្វីត្រូវអត់ទោស?\" / \"So ... what's there to forgive anyway?\"",
      "B. \"នោះមិនអាចអត់ទោសបានទេ ... \" / \"That was unforgivable ... \"",
      "C. \"ភ្នែកសម្រាប់ភ្នែក(តបវិញដូចគ្នា)។\" / \"An eye for an eye.\"",
      "D. \"អ្វីក៏ដោយ ... កុំបារម្ភអំពីវា។\" / \"Whatever ... don't worry about it.\""
    ]
  }
];

// Strict DISC Mapping Table (Indices 0 to 23 for Q1 to Q24)
// Mapping from selected Option (A, B, C, D) to DISC Dimension
const DISC_MAPPING = [
  { A: 'D', B: 'I', C: 'C', D: 'S' }, // Q1
  { A: 'D', B: 'S', C: 'C', D: 'I' }, // Q2
  { A: 'I', B: 'C', C: 'S', D: 'D' }, // Q3
  { A: 'S', B: 'D', C: 'I', D: 'C' }, // Q4
  { A: 'D', B: 'C', C: 'S', D: 'I' }, // Q5
  { A: 'D', B: 'C', C: 'S', D: 'I' }, // Q6
  { A: 'C', B: 'D', C: 'S', D: 'I' }, // Q7
  { A: 'I', B: 'D', C: 'C', D: 'S' }, // Q8
  { A: 'D', B: 'I', C: 'S', D: 'C' }, // Q9
  { A: 'I', B: 'C', C: 'D', D: 'S' }, // Q10
  { A: 'C', B: 'I', C: 'S', D: 'D' }, // Q11
  { A: 'S', B: 'D', C: 'C', D: 'I' }, // Q12
  { A: 'I', B: 'D', C: 'C', D: 'S' }, // Q13
  { A: 'S', B: 'D', C: 'C', D: 'I' }, // Q14
  { A: 'I', B: 'D', C: 'C', D: 'S' }, // Q15
  { A: 'S', B: 'I', C: 'D', D: 'C' }, // Q16
  { A: 'C', B: 'I', C: 'S', D: 'D' }, // Q17
  { A: 'I', B: 'C', C: 'D', D: 'S' }, // Q18
  { A: 'D', B: 'I', C: 'S', D: 'C' }, // Q19
  { A: 'I', B: 'C', C: 'S', D: 'D' }, // Q20
  { A: 'D', B: 'S', C: 'C', D: 'I' }, // Q21
  { A: 'D', B: 'C', C: 'S', D: 'I' }, // Q22
  { A: 'I', B: 'S', C: 'D', D: 'C' }, // Q23
  { A: 'I', B: 'C', C: 'D', D: 'S' }  // Q24
];

// Detailed Descriptions & Exhortations for Profiles
const DISC_PROFILES_META = {
  D: {
    name: 'Dominance (Choleric / ងាយនឹងឆេវឆាវ)',
    traitsKh: 'ជំរុញពីក្នុង, ចូលចិត្តផ្សងព្រេង, និយាយត្រង់ៗ, ក្លាហាន, សម្រេចចិត្តបាន, តាំងចិត្តខ្ពស់, ផ្តោតលើគោលដៅ និងកិច្ចការ។',
    traitsEn: 'Driven, adventuresome, bold, decisive, strong-willed, goal-oriented, competitive.',
    scriptures: [
      { text: 'មនុស្សគ្រប់រូបគួរតែរហ័សស្តាប់ យឺតនិយាយ ហើយយឺតនឹងខឹង / Everyone should be quick to listen, slow to speak and slow to become angry.', ref: 'យ៉ាកុប / James 1:19' },
      { text: 'បុរសអត់ធ្មត់ប្រសើរជាងអ្នកចម្បាំង / Better a patient person than a warrior.', ref: 'សុភាសិត / Proverbs 16:32' },
      { text: 'ចូររត់តាមរបៀបដើម្បីទទួលបានរង្វាន់ / Run in such a way as to get the prize.', ref: '១ កូរិនថូស / 1 Corinthians 9:24-27' }
    ]
  },
  I: {
    name: 'Influence (Sanguine / មានទឹកមុខរីករាយ)',
    traitsKh: 'បំផុសគំនិត, រីករាយ, រួសរាយរាក់ទាក់, និយាយច្រើន, បង្ហាញអារម្មណ៍, ចូលចិត្តមនុស្ស, សុទិដ្ឋិនិយម។',
    traitsEn: 'Inspiring, cheerful, charismatic, people-centered, enthusiastic, persuasive, spontaneous.',
    scriptures: [
      { text: 'ចូរនៅស្ងៀម ហើយដឹងថាខ្ញុំជាព្រះ / Be still, and know that I am God.', ref: 'ទំនុកតម្កើង / Psalm 46:10' },
      { text: 'ចូរឲ្យអ្វីៗទាំងអស់ត្រូវបានធ្វើបានត្រឹមត្រូវ និងមានរបៀបរៀបរយ / Let all things be done decently and in order.', ref: '១ កូរិនថូស / 1 Corinthians 14:40' },
      { text: 'ដ្បិតយើងមិនអាចឈប់និយាយអ្វីដែលយើងបានឃើញ និងឮបានទេ / We cannot help speaking about what we have seen and heard.', ref: 'កិច្ចការ / Acts 4:20' }
    ]
  },
  S: {
    name: 'Steadiness (Phlegmatic / ស្ងប់ស្ងាត់)',
    traitsKh: 'ស្ងប់ស្ងាត់, ជៀសវាងជម្លោះ, ស្មោះត្រង់, អត់ធ្មត់, អាចទុកចិត្តបាន, ផ្អែមល្ហែម, ផ្តោតលើក្រុម និងការចុះសម្រុង។',
    traitsEn: 'Peaceful, calm, loyal, patient, consistent, dependable, supportive team player.',
    scriptures: [
      { text: 'ចម្លើយទន់ភ្លន់បង្វែរកំហឹង / A gentle answer turns away wrath.', ref: 'សុភាសិត / Proverbs 15:1' },
      { text: 'មិត្តភ័ក្តិស្រឡាញ់គ្រប់ពេលវេលា / A friend loves at all times.', ref: 'សុភាសិត / Proverbs 17:17' },
      { text: 'ព្រះបានបែងចែកដល់មនុស្សម្នាក់ៗនូវកម្រិតនៃជំនឿ / God has distributed a measure of faith to each.', ref: 'រ៉ូម / Romans 12:3' }
    ]
  },
  C: {
    name: 'Conscientiousness (Melancholy / សោកសៅ/ហ្មត់ចត់)',
    traitsKh: 'វិភាគ, ហ្មត់ចត់, លម្អិត, ស្វែងរកភាពល្អឥតខ្ចោះ, ស្មោះត្រង់, ស្រាវជ្រាវស៊ីជម្រៅ, មានសណ្តាប់ធ្នាប់ខ្ពស់។',
    traitsEn: 'Analytical, detailed, conscientious, orderly, high standards, systematic, deep thinker.',
    scriptures: [
      { text: 'អ្វីដែលពិត អ្វីដែលត្រឹមត្រូវ អ្វីដែលបរិសុទ្ធ... ចូរឱ្យចិត្តរបស់អ្នកគិតអំពីរឿងទាំងនេះ / Whatever is true, noble, right, pure... think about such things.', ref: 'ភីលីព / Philippians 4:8' },
      { text: 'ចូរធ្វើអ្វីៗទាំងអស់ឱ្យបានត្រឹមត្រូវ និងមានសណ្តាប់ធ្នាប់ / Let all things be done properly and in an orderly manner.', ref: '១ កូរិនថូស / 1 Corinthians 14:40' },
      { text: 'ចូរដោះស្រាយព្រះបន្ទូលនៃសេចក្ដីពិតឱ្យបានត្រឹមត្រូវ / Rightly handling the word of truth.', ref: '២ ធីម៉ូថេ / 2 Timothy 2:15' }
    ]
  }
};
