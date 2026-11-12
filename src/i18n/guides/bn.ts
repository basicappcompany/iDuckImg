import type { GuideLocale } from './types';
import { bnGuidesA } from './bn-a';
import { bnGuidesB } from './bn-b';
import { bnGuidesC } from './bn-c';

/** Bengali how-to guides: the page chrome and the 25 guides. */
export const bnGuides: GuideLocale = {
  chrome: {
    home: 'হোম',
    guides: 'কীভাবে করবেন গাইড',
    quickAnswer: 'সংক্ষিপ্ত উত্তর',
    openTool: '{tool} খুলুন',
    steps: 'ধাপসমূহ',
    commonQuestions: 'সাধারণ প্রশ্ন',
    writtenBy: 'লিখেছে Basic App Company। {date} তারিখে টুলের সঙ্গে মিলিয়ে শেষবার যাচাই করা হয়েছে। টুলটি আপনার ব্রাউজারে চলে, তাই আপনার ছবি আপলোড হয় না।',
    relatedGuides: 'সম্পর্কিত গাইড',
    allGuides: 'সব কীভাবে করবেন গাইড',
    hubTitle: 'ইমেজের কীভাবে করবেন গাইড: কমপ্রেস, রিসাইজ, কনভার্ট ও আরও',
    hubDescription:
      'সবচেয়ে বেশি খোঁজা ইমেজের কাজগুলোর জন্য ছোট ও ব্যবহারিক গাইড: কমপ্রেস, রিসাইজ, ক্রপ, কনভার্ট, ওয়াটারমার্ক, লুকানো তথ্য সরানো ও আরও। প্রতিটি কাজের বিনামূল্যের টুলের লিঙ্কসহ।',
    hubBefore: 'ইমেজের ',
    hubMark: 'কীভাবে করবেন',
    hubAfter: ' গাইড',
    hubIntro:
      'সবচেয়ে বেশি খোঁজা ইমেজের কাজগুলোর জন্য ছোট ও ব্যবহারিক নির্দেশনা। প্রতিটি আগে উত্তর দেয়, তারপর ধাপগুলো, আর আপনার ব্রাউজারে কাজ করা বিনামূল্যের টুলের লিঙ্ক দেয়।',
    hubListName: 'ইমেজের কীভাবে করবেন গাইড',
    hubListLabel: 'গাইড',
  },
  guides: { ...bnGuidesA, ...bnGuidesB, ...bnGuidesC },
};
