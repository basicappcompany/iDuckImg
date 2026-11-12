import type { GuideLocale } from './types';
import { ruGuidesA } from './ru-a';
import { ruGuidesB } from './ru-b';
import { ruGuidesC } from './ru-c';

/** Russian: the words on a guide page and every guide, keyed by slug. */
export const ruGuides: GuideLocale = {
  chrome: {
    home: 'Главная',
    guides: 'Практические руководства',
    quickAnswer: 'Краткий ответ',
    openTool: 'Открыть: {tool}',
    steps: 'Шаги',
    commonQuestions: 'Частые вопросы',
    writtenBy:
      'Автор: Basic App Company. Последняя проверка по инструменту: {date}. Инструмент работает в вашем браузере, поэтому ваши изображения не загружаются на сервер.',
    relatedGuides: 'Похожие руководства',
    allGuides: 'Все практические руководства',
    hubTitle: 'Практические руководства по изображениям: сжатие, размер, конвертация',
    hubDescription:
      'Короткие практические руководства по самым частым задачам с изображениями: сжатие, изменение размера, обрезка, конвертация, водяные знаки, удаление скрытых данных и другое. К каждому есть ссылка на бесплатный инструмент.',
    hubBefore: 'Практические ',
    hubMark: 'руководства',
    hubAfter: ' по изображениям',
    hubIntro:
      'Короткие практические инструкции для самых частых задач с изображениями. В каждой сначала дан ответ, затем шаги и ссылка на бесплатный инструмент, который выполняет работу в вашем браузере.',
    hubListName: 'Практические руководства по изображениям',
    hubListLabel: 'Руководства',
  },
  guides: { ...ruGuidesA, ...ruGuidesB, ...ruGuidesC },
};
