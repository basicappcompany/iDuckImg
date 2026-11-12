import type { GuideLocale } from './types';
import { hiGuidesA } from './hi-a';
import { hiGuidesB } from './hi-b';
import { hiGuidesC } from './hi-c';

export const hiGuides: GuideLocale = {
  chrome: {
    home: `होम`,
    guides: `कैसे करें गाइड`,
    quickAnswer: `संक्षिप्त उत्तर`,
    openTool: `{tool} खोलें`,
    steps: `चरण`,
    commonQuestions: `अक्सर पूछे जाने वाले सवाल`,
    writtenBy: `Basic App Company द्वारा लिखा गया। {date} को टूल से मिलाकर आख़िरी बार जाँचा गया। टूल आपके ब्राउज़र में चलता है, इसलिए आपकी तस्वीरें अपलोड नहीं होतीं।`,
    relatedGuides: `संबंधित गाइड`,
    allGuides: `सभी कैसे करें गाइड`,
    hubTitle: `इमेज कैसे करें गाइड: कंप्रेस, रीसाइज़, कन्वर्ट और बहुत कुछ`,
    hubDescription: `सबसे ज़्यादा खोजे जाने वाले इमेज कामों के लिए छोटी, व्यावहारिक गाइड: कंप्रेस, रीसाइज़, क्रॉप, कन्वर्ट, वॉटरमार्क, छिपा डेटा हटाना और बहुत कुछ। हर गाइड उस मुफ़्त टूल से जुड़ी है जो काम करता है।`,
    hubBefore: `इमेज `,
    hubMark: `कैसे करें`,
    hubAfter: ` गाइड`,
    hubIntro: `सबसे ज़्यादा खोजे जाने वाले इमेज कामों के लिए छोटे, व्यावहारिक निर्देश। हर एक पहले उत्तर देता है, फिर चरण, और उस मुफ़्त टूल से जुड़ता है जो आपके ब्राउज़र में काम करता है।`,
    hubListName: `इमेज कैसे करें गाइड`,
    hubListLabel: `गाइड`,
  },
  guides: { ...hiGuidesA, ...hiGuidesB, ...hiGuidesC },
};
