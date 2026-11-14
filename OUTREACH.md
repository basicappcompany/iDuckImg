# iDuckIMG outreach drafts

Nothing here has been posted. Each entry is a draft for you to send under your own name. I did not check any community's current rules while writing this, so **read the rules of each place before posting** and follow them: many ban self-promotion, require a minimum account age or karma, or want you to disclose that you made the thing. Every draft discloses that you made it. Do not post the same text in many places on the same day, and answer questions that come back.

Facts you can say (all true today): free; no sign-up; no watermark; images are processed in your browser and are not uploaded; made by Basic App Company; sister of iDuckPDF; exam photo sizes come from official notices, each with a source link and the date it was read; the site has security headers graded A+ by securityheaders.com and Mozilla Observatory.
Facts to avoid: anything about numbers of users, rankings, "best", or other tools being worse.

Link to use: https://iduckimg.com/ (or the specific page named in the entry).

## A. Product and tool directories

### 1. AlternativeTo
- Why: people search "alternative to iLoveIMG / TinyPNG / Squoosh".
- Rules to check: you add a new app with a description, platform tags and "alternative to" links; they may ask for a real description and screenshots.
- Draft: **iDuckIMG** is a free set of image tools that run in your browser: compress to a target size in KB, resize, crop, convert (including iPhone HEIC), remove EXIF data and resize photos and signatures to exam form sizes. No sign-up, no watermark, and pictures are processed on your device instead of being uploaded.

### 2. Product Hunt
- Why: a launch gives backlinks and a one-day audience.
- Rules to check: launch page, tagline, first comment from the maker. Choose a day you can answer comments.
- Tagline (60 characters): Free image tools that never upload your photos.
- First comment draft: Hi, I made iDuckIMG. It compresses, resizes and converts images entirely in your browser, so photos never leave your device. I built it after seeing how many people struggle to get a photo under 50 KB for a form. The exam pages use sizes copied from official notices with a source link and a date. Happy to hear what is missing.

### 3. SaaSHub
- Why: comparison pages that rank for "X alternatives".
- Rules to check: free listing; review step.
- Draft: Browser-based image tools: compress to a target KB, resize, crop, convert HEIC, remove EXIF. Free, no sign-up, no uploads.

### 4. BetaList
- Why: early-product audience.
- Rules to check: they prefer products not yet widely known; there may be a queue or fee for fast listing (do not pay unless you decide to).
- Draft: Free image tools that run in your browser, with exam photo sizes from official sources.

### 5. Uneed or a similar free tools directory
- Why: curated "tools of the day" lists.
- Rules to check: free listing and any submission limits.
- Draft: iDuckIMG: image compressor, resizer and converter that works offline-style in your browser. No upload, no account.

## B. Developer and maker communities

### 6. Hacker News (Show HN)
- Why: technical readers care that the work is done in the browser.
- Rules to check: the Show HN guidelines (it must be something people can try without sign-up, which it is). Do not ask for upvotes.
- Title: Show HN: Image tools that run entirely in your browser (WASM, no upload)
- Text draft: I made a set of image tools (compress to a target size in KB, resize, crop, HEIC and AVIF input, EXIF removal) that run in the browser with jSquash and libheif compiled to WebAssembly in web workers. Nothing is uploaded. The page ships a strict Content-Security-Policy with no unsafe-inline or unsafe-eval scripts. I would like feedback on speed on low-end Android phones.

### 7. Indie Hackers
- Why: makers share small products and revenue notes.
- Rules to check: post format in the product section.
- Draft: I run a small family of tool sites (iDuckPDF, iDuckIMG and others). iDuckIMG does image jobs in the browser, so hosting costs almost nothing. I am working on search visibility for form-related jobs such as "compress image to 100 KB". Here is what I have learned so far: [two or three real lessons you choose].

### 8. DEV Community article
- Why: a technical write-up links back and lasts.
- Rules to check: front matter, tags, no pure promotion.
- Title idea: How we read the photo rules in 17 official notices (and what we could not read)
- Outline: the problem; reading PDFs with pdftotext; why some official sites block automated readers; how we store source, page and date with every number; the test that fails if a page has no source.

### 9. GitHub "awesome" list for privacy tools (for example awesome-privacy)
- Why: privacy-minded readers.
- Rules to check: the list's contribution guide: required fields, licence and whether closed-source sites are accepted. iDuckIMG's source is in a private repository; if the list requires open source, do not submit.
- Draft entry: iDuckIMG: image compression, resizing and conversion that run in your browser; files are not uploaded.

### 10. GitHub "awesome" list for WebAssembly (for example awesome-wasm)
- Why: a real-world WASM use.
- Rules to check: category fit, and whether sites without public source are allowed.
- Draft entry: iDuckIMG: image tools using jSquash (Squoosh codecs) and libheif in web workers.

## C. Reddit

For each subreddit read the sidebar rules and check the account age or karma needed. Use the "I made this" or self-promotion flair where one exists. Post once.

### 11. r/webdev (Showoff Saturday thread)
- Draft: I made free image tools that run entirely in the browser (WASM in workers, strict CSP, no upload). Try the compress and HEIC pages and tell me what breaks on your phone.

### 12. r/InternetIsBeautiful
- Rules to check: they want a site that is useful or fun with no sign-up, which fits. Posts must be the site itself.
- Title: Free image tools that never upload your photos (compress, resize, HEIC to JPG)

### 13. r/privacy
- Rules to check: usually strict on promotion. Consider asking in a comment on a thread about image metadata instead of posting.
- Comment draft: If you want to strip location data from photos without uploading them anywhere, this tool does it in your browser: https://iduckimg.com/remove-exif-data/ (I made it; you can check in the Network tab that nothing is sent).

### 14. Exam-preparation subreddits (for example r/JEENEETards, r/UPSC)
- Why: form photo and signature size questions come up every application season.
- Rules to check: most ban promotion in posts but allow helpful comments. Search for threads asking how to reduce a photo to 50 KB or how big a signature must be.
- Comment draft: For a size limit like 50 KB you can compress in the browser without uploading the picture: https://iduckimg.com/compress-image-to-50kb/ . For exam photo and signature sizes we list the numbers from official notices with links: https://iduckimg.com/photo-and-signature-requirements/ . (I made it. Always check your own notice, because rules change each year.)

### 15. r/iphone or r/applehelp
- Why: "HEIC photo will not open or upload" questions.
- Rules to check: no self-promotion posts; answer questions in comments with a disclosure.
- Comment draft: Settings, Camera, Formats, Most Compatible saves JPG from now on. For photos you already have, this converts HEIC to JPG in your browser without uploading them: https://iduckimg.com/heic-to-jpg/ (I made it).

## D. Q and A sites and messaging groups

### 16. Quora
- Why: questions such as "How do I reduce an image to 100 KB" get steady traffic.
- Rules to check: answers must be useful on their own; disclose that you made the tool.
- Draft answer: Short version: open a compressor that works in your browser, set the target to 100 KB and download the result. Steps: 1. Drop the photo. 2. Set the target size. 3. Press Resize. If the photo is very large you may also need a smaller width. I made one that does not upload your picture: https://iduckimg.com/compress-image-to-100kb/

### 17. Stack Exchange (for example Super User, Photography)
- Why: questions on image size and metadata.
- Rules to check: self-promotion needs clear disclosure and the answer must stand alone.
- Draft: Explain the method (quality versus pixel size, why PNG cannot be tuned by quality) and mention the tool once at the end with disclosure.

### 18. Telegram and WhatsApp exam-preparation groups
- Why: candidates share form help in groups.
- Rules to check: **ask the group admin first**; many groups remove links. Never post in groups that forbid links.
- Draft message: Form photo or signature too big? This site resizes to the exact pixels and KB from the official notice and does not upload your picture. Sources are shown on each page: https://iduckimg.com/photo-and-signature-requirements/

### 19. Student and bank-exam forums
- Why: long-running forums where form questions repeat.
- Rules to check: each forum's link policy. Reply to a real question; do not start a promotion thread.
- Draft: same as entry 14, adapted to the question.

## E. Your own channels

### 20. The iDuck family sites and newsletter
- Why: iDuckPDF, iDuckCalculator and iDuckConvert already link to each other; add a short "new: image tools" line to their footers and any newsletter.
- Rules to check: none; your own sites.
- Draft: Also from iDuck: iDuckIMG, free image tools that run in your browser. Compress to a target size, convert HEIC, remove EXIF data and resize exam photos.

## Order I would try

1. Ask for the links that cost nothing and take minutes: entries 1, 3, 5, 20.
2. Write the DEV article (8): it builds a page that other sites can link to.
3. In exam season, answer real questions (14, 16, 18) instead of posting.
4. Launch on Product Hunt (2) and Show HN (6) only when you can answer comments for a day.
