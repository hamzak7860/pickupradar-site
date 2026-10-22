// PickupRadar website: header, page language, and the back-to-top control.
// Page copy lives in SITE_TEXT below. English is the source. Other languages are
// optional files in i18n-web/site/, published with tools/web-translations.js.
// Labels shared with the app are read from i18n/<code>.json and are not translated again.
// The phone preview keeps its own language rendering and its own right-to-left layout.
(function () {
  var SITE_TEXT =
  /* SITE_TEXT_START */
  (function () {
    var text = {};
    function app(id, en, appKey, note) {
      text[id] = { en: en, app: appKey, note: note };
    }
    function line(id, en, note, extra) {
      var entry = { en: en, note: note };
      if (extra && extra.appSlots) entry.appSlots = extra.appSlots;
      if (extra && extra.domSlots) entry.domSlots = extra.domSlots;
      text[id] = entry;
    }
    var appLabel = 'App dictionary label. Do not translate it in the website file.';

    app('shared.term.reportWait', 'Report wait', 'home.reportWait', appLabel);
    app('shared.term.currentWait', 'Current wait', 'report.currentWait', appLabel);
    app('shared.term.likelyFast', 'Likely fast', 'home.likelyFast', appLabel);
    app('shared.term.likelySlow', 'Likely slow', 'home.likelySlow', appLabel);
    app('shared.term.radarPoints', 'RadarPoints', 'radar.balance', appLabel);
    app('shared.term.reportNeeded', 'Report needed', 'radar.earning.reportNeeded', appLabel);
    app('shared.term.reportProblem', 'Report a problem', 'problem.report', appLabel);
    app('shared.term.nearby', 'Nearby', 'home.tab.nearby', appLabel);
    app('shared.term.fast', 'Fast', 'home.tab.fast', appLabel);
    app('shared.term.slow', 'Slow', 'home.tab.slow', appLabel);
    app('shared.term.saved', 'Saved', 'home.tab.saved', appLabel);
    app('shared.term.search', 'Search pickup points', 'home.search', appLabel);
    app('shared.term.suggest', 'Suggest pickup point', 'missing.button', appLabel);
    app('shared.term.profile', 'Profile', 'radar.title', appLabel);
    app('shared.term.messages', 'Messages', 'radar.messages.title', appLabel);
    app('shared.term.deleteAccount', 'Delete account', 'radar.delete.protected.action', appLabel);
    app('shared.term.deleteProfile', 'Delete Radar profile', 'radar.delete.anonymous.action', appLabel);
    app('shared.term.comingSoon', 'Coming soon', 'common.comingSoon', appLabel);
    app('shared.term.comingNext', 'Coming next', 'city.comingNext', appLabel);
    app('shared.term.notify', 'Notify me when live', 'cityAlert.notifyLine', appLabel);
    app('shared.term.how', 'How it works', 'home.help.howItWorks', appLabel);
    app('shared.term.support', 'Support', 'home.help.support', appLabel);
    app('shared.term.madeOnArrival', 'Made when driver arrives', 'home.badge.madeOnArrival', appLabel);
    app('shared.term.systemIssue', 'Tablet/server issue reported', 'home.badge.systemIssue', appLabel);
    app('shared.term.closedNow', 'Closed now', 'problem.closedNow', appLabel);
    app('shared.term.notReceiving', 'Not receiving orders', 'problem.notReceiving', appLabel);
    app('shared.term.otherIssue', 'Other issue', 'problem.otherIssue', appLabel);
    app('shared.term.wrongAddress', 'Wrong address', 'issue.wrong_address', appLabel);
    app('shared.term.wrongBranch', 'Wrong branch/name', 'issue.wrong_branch', appLabel);
    app('shared.term.duplicate', 'Duplicate venue', 'issue.duplicate_venue', appLabel);
    app('shared.term.closedPermanently', 'Permanently closed', 'issue.closed_permanently', appLabel);
    app('shared.term.waitReport', 'Valid wait report', 'radar.earning.waitReport', appLabel);
    app('shared.term.waitRp', '+10 RP', 'radar.earning.waitReportRp', appLabel);
    app('shared.term.neededRp', '+15 RP', 'radar.earning.reportNeededRp', appLabel);
    app('shared.term.firstBonus', 'First report bonus', 'radar.earning.firstBonus', appLabel);
    app('shared.term.firstRp', '+10 RP extra', 'radar.earning.firstBonusRp', appLabel);
    app('shared.term.approved', 'Pickup point approved', 'radar.history.pickupPointApproved', appLabel);
    app('shared.term.approvedRp', '+20 RP', 'radar.earning.pickupPointApprovedRp', appLabel);
    app('shared.term.referral', 'Driver referral', 'radar.history.driverReferral', appLabel);
    app('shared.term.referralRp', '+50 RP', 'radar.earning.driverReferralRp', appLabel);
    app('shared.term.rewards', 'Rewards coming soon', 'radar.rewards.comingSoon', appLabel);
    app('shared.term.under5', '<5 min', 'wait.range.under5', appLabel);
    app('shared.term.fiveToTen', '5–10 min', 'wait.range.fiveToTen', appLabel);
    app('shared.term.tenToFifteen', '10–15 min', 'wait.range.tenToFifteen', appLabel);
    app('shared.term.fifteenPlus', '15+ min', 'wait.range.fifteenPlus', appLabel);
    app('shared.term.backToTop', 'Back to top', 'common.backToTop', appLabel);
    app('shared.ui.language', 'Language', 'language.title', 'Accessible name and dialog title for the website language button. ' + appLabel);
    app('shared.ui.close', 'Close', 'common.close', appLabel);
    app('shared.ui.search', 'Search languages', 'language.search', appLabel);
    app('shared.ui.more', 'More languages', 'language.more', appLabel);
    app('shared.ui.active', 'Active', 'common.active', appLabel);
    app('shared.ui.noResults', 'No languages found', 'language.noResults', appLabel);

    line('shared.skip', 'Skip to content', 'Skip link at the start of every translated page. Not shown until it is focused.');
    line('shared.homeLabel', 'PickupRadar home', 'Accessible name for the PickupRadar logo link. Keep the name PickupRadar.');
    line('shared.navLabel', 'Site', 'Accessible name for the header navigation. Not shown on screen.');
    line('shared.nav.privacy', 'Privacy', 'Header and footer link to the privacy policy. The policy page itself stays in English.');
    line('shared.nav.preview', 'Live preview', 'Header button and footer link to the live preview page.');
    line('shared.footer.app', 'App', 'Footer heading above the preview and how-it-works links.');
    line('shared.footer.help', 'Help', 'Footer heading above support and the email address.');
    line('shared.footer.legal', 'Legal', 'Footer heading above privacy and delete account. Do not change the legal pages.');
    line('shared.tagline', 'Know the wait before you walk in.', 'Homepage heading and the short line under the footer logo.');
    line('shared.footer.copyright', '© 2026 PickupRadar. Independent and not affiliated with Uber Eats, Deliveroo or Just Eat.', 'Footer copyright line. Keep PickupRadar, Uber Eats, Deliveroo, Just Eat and 2026.');
    line('shared.scale.aria', 'Wait ranges', 'Accessible name for the four wait-range examples. Not shown on screen.');
    line('shared.scale.quick', 'Quick', 'Caption under the shortest wait range.');
    line('shared.scale.short', 'Short wait', 'Caption under the 5–10 minute range.');
    line('shared.scale.long', 'Long wait', 'Caption under the 10–15 minute range.');
    line('shared.scale.veryLong', 'Very long wait', 'Caption under the 15+ minute range.');
    line('shared.scale.estimate', 'No recent reports? PickupRadar may show {likelyFast} or {likelySlow}:', 'Line above the Likely fast and Likely slow examples. {likelyFast} and {likelySlow} are the app labels.', { appSlots: { likelyFast: 'home.likelyFast', likelySlow: 'home.likelySlow' } });

    line('home.meta.title', 'PickupRadar (Pickup Radar): pickup wait times for delivery drivers in the UK', 'Browser title and social title for the homepage. Keep both PickupRadar and Pickup Radar.');
    line('home.meta.description', 'See how long drivers wait at restaurants and shops before you go in. For Uber Eats, Deliveroo and Just Eat drivers in the UK. No sign-up needed.', 'Homepage description for search and social cards. Keep Uber Eats, Deliveroo and Just Eat.');
    line('home.meta.imageAlt', 'PickupRadar. Know the wait before you walk in.', 'Description of the homepage share image. Keep PickupRadar.');
    line('home.hero.lede', 'Do you deliver for Uber Eats, Deliveroo or Just Eat? See recent pickup waits at restaurants and shops. Avoid long waits. Tap {reportWait} and earn {radarPoints}. No sign-up needed.', 'Homepage introduction. Keep the delivery-app names. {reportWait} and {radarPoints} are the app labels.', { appSlots: { reportWait: 'home.reportWait', radarPoints: 'radar.balance' } });
    line('home.hero.try', 'Try it with real data', 'Button that jumps to the live preview on the homepage.');
    line('home.hero.availability', 'Availability', 'Accessible name for the Milton Keynes and app-status notes. Not shown on screen.');
    line('home.hero.cities', 'Now in Milton Keynes. London is next.', 'Homepage status line and the cities heading. Keep the city names Milton Keynes and London.');
    line('home.hero.apps', 'The iPhone and Android apps are coming soon.', 'Homepage note under the city status. Do not say the apps can be downloaded.');
    line('home.example.aria', 'Example PickupRadar Home screen with the {nearby} tab open, showing pickup points coloured by their wait', 'Accessible description of the example phone picture. British spelling. {nearby} is the app label.', { appSlots: { nearby: 'home.tab.nearby' } });
    line('home.example.banner', 'Example screen: sample waits, not live driver reports', 'Banner on the example phone. These waits are samples.');
    line('home.example.sampleWait', 'Sample wait', 'Label on example cards that show a sample wait time.');
    line('home.example.sampleEstimate', 'Sample estimate', 'Label on the example card that shows an estimate.');
    line('home.example.evidence', '1 report · 4m ago', 'Sample evidence chip. Keep the digit 1, the digit 4 and the · character.');
    line('home.example.caption', 'Example screen. These are sample wait times, not live reports. {live} with real data.', 'Caption under the example phone. {live} is the link text.', { domSlots: ['live'] });
    line('home.example.live', 'Try the live preview', 'Link under the example phone. It jumps to the live preview on this page.');
    line('home.scale.title', 'See how long you may wait.', 'Heading for the wait-range section.');
    line('home.scale.body', 'Drivers report how long they waited. The current wait comes from reports in the last 2 hours. You can see fast and slow pickups quickly.', 'Explanation of the wait ranges. Use the same idea as the app label Current wait.');
    line('home.live.aria', 'Live PickupRadar app preview with real Milton Keynes data', 'Accessible name for the homepage phone preview. Keep PickupRadar and Milton Keynes.');
    line('home.live.title', 'Try PickupRadar with real Milton Keynes data.', 'Heading beside the homepage phone preview. Keep PickupRadar and Milton Keynes.');
    line('home.live.body', 'See real pickup points in Milton Keynes. Check recent waits, or {likelyFast} and {likelySlow}. You can try the report screen, but nothing is sent.', 'Introduction to the homepage preview. {likelyFast} and {likelySlow} are the app labels. Keep Milton Keynes.', { appSlots: { likelyFast: 'home.likelyFast', likelySlow: 'home.likelySlow' } });
    line('home.try.tabLead', 'Pick a tab.', 'Bold start of the first preview instruction.');
    line('home.try.tab', '{lead} Use {nearby} to find pickup points close to you when location is on. Use {fast} and {slow} to check waits and estimates.', 'First preview instruction. {lead} stays bold. The other placeholders are app labels.', { appSlots: { nearby: 'home.tab.nearby', fast: 'home.tab.fast', slow: 'home.tab.slow' }, domSlots: ['lead'] });
    line('home.try.searchLead', 'Search pickup points.', 'Bold start of the second preview instruction. Same words as the app search label, with a full stop.');
    line('home.try.search', '{lead} Try a name, area or postcode, like KFC or Bletchley.', 'Second preview instruction. {lead} stays bold. Keep KFC and Bletchley.', { domSlots: ['lead'] });
    line('home.try.openLead', 'Open a pickup point.', 'Bold start of the third preview instruction.');
    line('home.try.open', '{lead} The {reportWait} screen opens. Choose a wait time. Nothing is sent.', 'Third preview instruction. {lead} stays bold. {reportWait} is the app label.', { appSlots: { reportWait: 'home.reportWait' }, domSlots: ['lead'] });
    line('home.live.big', 'Open the big preview', 'Link from the homepage preview to the full preview page.');
    line('home.signals.title', 'What you can see before you go in', 'Heading for the section that explains the labels on a pickup point.');
    line('home.signals.intro', 'You see the same labels in the app. Drivers report them, not the delivery apps.', 'Introduction under that heading.');
    line('home.signals.current.body', 'Drivers choose a wait time. You see the current wait and how many drivers reported it in the last 2 hours.', 'Explains the current-wait label. Use the same idea as the app label Current wait.');
    line('home.signals.likely.title', '{likelyFast} and {likelySlow}', 'Heading for the estimate labels. Both placeholders are app labels.', { appSlots: { likelyFast: 'home.likelyFast', likelySlow: 'home.likelySlow' } });
    line('home.signals.likely.body', 'Shown only when there are no recent reports. These are estimates, not live reports.', 'Explains Likely fast and Likely slow.');
    line('home.signals.closed.pill', 'Reported closed recently', 'Sample pill for a recent closure report. It is not the same as the app label Closed now.');
    line('home.signals.closed.title', '{closedNow} or {notReceiving}', 'Heading for closure labels. Both placeholders are app labels.', { appSlots: { closedNow: 'problem.closedNow', notReceiving: 'problem.notReceiving' } });
    line('home.signals.closed.body', 'Drivers tap {reportProblem} to report this. You see their report before you drive there.', 'Explains closure reports. {reportProblem} is the app label.', { appSlots: { reportProblem: 'problem.report' } });
    line('home.signals.tablet.body', 'See when drivers report that a restaurant\'s tablet or system is not working.', 'Explains the tablet or server issue label.');
    line('home.signals.arrival.title', 'Order starts after arrival', 'Heading for places that start the order when the driver arrives.');
    line('home.signals.arrival.body', 'Some places only start the order when you arrive. Drivers can turn this on when they report.', 'Explains the made-when-driver-arrives label.');
    line('home.signals.missing.title', 'Missing or wrong pickup points', 'Heading for suggesting or correcting a pickup point. Also used on the support page.');
    line('home.signals.missing.body', 'Missing a pickup point? Tap {suggest}. Something wrong? Tap {reportProblem}, then {otherIssue}: {wrongAddress}, {wrongBranch}, {duplicate} or {closedPermanently}.', 'Explains how to suggest or correct a pickup point. Every placeholder is an app label.', { appSlots: { suggest: 'missing.button', reportProblem: 'problem.report', otherIssue: 'problem.otherIssue', wrongAddress: 'issue.wrong_address', wrongBranch: 'issue.wrong_branch', duplicate: 'issue.duplicate_venue', closedPermanently: 'issue.closed_permanently' } });
    line('home.how.intro', 'Three easy steps. Reporting takes a few seconds.', 'Introduction under How it works.');
    line('home.how.step1.title', 'Open the app', 'First step heading.');
    line('home.how.step1.body', 'No password. The app gives you a Radar profile automatically. You don\'t need to sign up.', 'First step. Radar profile is the app\'s name for the profile.');
    line('home.how.step2.title', 'Check before you go in', 'Second step heading.');
    line('home.how.step2.body', 'Find the pickup point. See the current wait, or {likelyFast} or {likelySlow} if there are no recent reports.', 'Second step. {likelyFast} and {likelySlow} are the app labels.', { appSlots: { likelyFast: 'home.likelyFast', likelySlow: 'home.likelySlow' } });
    line('home.how.step3.title', 'Report your wait', 'Third step heading.');
    line('home.how.step3.body', 'After you collect the order, tap {reportWait}. It takes seconds. Your report helps other drivers, and you earn {radarPoints}.', 'Third step. {reportWait} and {radarPoints} are the app labels.', { appSlots: { reportWait: 'home.reportWait', radarPoints: 'radar.balance' } });
    line('home.points.title', 'Earn {radarPoints}', 'RadarPoints section heading. {radarPoints} is the app label.', { appSlots: { radarPoints: 'radar.balance' } });
    line('home.points.body', 'Tap {reportWait} to earn {radarPoints}. You can start without an account. Protect your {radarPoints} with your email, so they are safe if you change or reset your phone. No password needed. The app emails you a 6-digit code.', 'Explains earning and protecting points. Placeholders are app labels. {radarPoints} appears twice.', { appSlots: { reportWait: 'home.reportWait', radarPoints: 'radar.balance' } });
    line('home.points.noteSoon', 'Rewards coming soon.', 'Bold note. Same words as the app phrase Rewards coming soon, with a full stop.');
    line('home.points.note', '{soon} You can\'t redeem {radarPoints} yet.', 'Note under the points explanation. {soon} stays bold. {radarPoints} is the app label.', { appSlots: { radarPoints: 'radar.balance' }, domSlots: ['soon'] });
    line('home.points.aria', 'How to earn {radarPoints}', 'Accessible name for the points table. {radarPoints} is the app label.', { appSlots: { radarPoints: 'radar.balance' } });
    line('home.points.neededLine', '{reportNeeded}{help}', 'Report needed row. {reportNeeded} is the app label. {help} is the smaller explanation.', { appSlots: { reportNeeded: 'radar.earning.reportNeeded' }, domSlots: ['help'] });
    line('home.points.neededHelp', 'An eligible pickup point near you with no recent wait and no {likelyFast} or {likelySlow}. You earn 15 RP for the report instead of 10.', 'Smaller explanation under Report needed. {likelyFast} and {likelySlow} are the app labels. Keep 15 and 10.', { appSlots: { likelyFast: 'home.likelyFast', likelySlow: 'home.likelySlow' } });
    line('home.points.firstLine', '{firstBonus}{help}', 'First report bonus row. {firstBonus} is the app label. {help} is the smaller explanation.', { appSlots: { firstBonus: 'radar.earning.firstBonus' }, domSlots: ['help'] });
    line('home.points.firstHelp', 'Extra points on your first valid wait report. If it is also {reportNeeded}, you earn 25 RP in total.', 'Smaller explanation under the first-report bonus. {reportNeeded} is the app label. Keep 25.', { appSlots: { reportNeeded: 'radar.earning.reportNeeded' } });
    line('home.points.approvedLine', '{approved}{help}', 'Approved pickup point row. {approved} is the app label. {help} is the smaller explanation.', { appSlots: { approved: 'radar.history.pickupPointApproved' }, domSlots: ['help'] });
    line('home.points.approvedHelp', 'When we approve a pickup point you suggest', 'Smaller explanation under Pickup point approved.');
    line('home.points.referralLine', '{referral}{help}', 'Driver referral row. {referral} is the app label. {help} is the smaller explanation.', { appSlots: { referral: 'radar.history.driverReferral' }, domSlots: ['help'] });
    line('home.points.referralHelp', 'You each earn it when your friend makes 3 valid wait reports, on at least 2 different days (UTC time), at 2 different pickup points. You both need protected Radar accounts (add your email). Your friend must enter your code before their first valid wait report.', 'Referral rules. Keep the numbers 3 and 2, and keep UTC.');
    line('home.points.referralEach', '{referralRp} each', 'Points shown for a referral. {referralRp} is the app amount. Translate the word each.', { appSlots: { referralRp: 'radar.earning.driverReferralRp' } });
    line('home.cities.body', 'These are the UK cities in the app. Can\'t find your city? Request it in the app. Or tap {notify} on a {comingSoon} city. We\'ll email you when it\'s live.', 'Text beside the city list. {notify} and {comingSoon} are app labels. Do not translate the city names in the list.', { appSlots: { notify: 'cityAlert.notifyLine', comingSoon: 'common.comingSoon' } });
    line('home.cities.live', 'Live now', 'Heading for cities where PickupRadar is available.');
    line('home.trust.title', 'Not part of any delivery app', 'Heading for the independence section.');
    line('home.trust.body', 'PickupRadar is independent. It is not part of Uber Eats, Deliveroo, Just Eat or any other delivery app. It never uses your accounts with them.', 'Explains that PickupRadar is independent. Keep the delivery-app names and PickupRadar.');
    line('home.trust.privacy', 'Read the privacy policy', 'Link to the English privacy policy.');
    line('home.trust.loginLead', 'No delivery app logins.', 'Bold start of the first trust point.');
    line('home.trust.login', '{lead} We never ask for your Uber Eats, Deliveroo or Just Eat username or password.', 'First trust point. {lead} stays bold. Keep the delivery-app names.', { domSlots: ['lead'] });
    line('home.trust.detailsLead', 'No customer or order details.', 'Bold start of the second trust point.');
    line('home.trust.details', '{lead} No names, addresses or order numbers.', 'Second trust point. {lead} stays bold.', { domSlots: ['lead'] });
    line('home.trust.skipLead', 'You can skip the delivery app.', 'Bold start of the third trust point.');
    line('home.trust.skip', '{lead} Choosing the delivery app is optional.', 'Third trust point. {lead} stays bold.', { domSlots: ['lead'] });
    line('home.trust.controlLead', 'You are in control.', 'Bold start of the fourth trust point.');
    line('home.trust.control', '{lead} Delete your account or Radar profile in the app at any time.', 'Fourth trust point. {lead} stays bold.', { domSlots: ['lead'] });
    line('home.faq.title', 'Questions from drivers', 'Frequently asked questions heading.');
    line('home.faq.account.q', 'Do I need an account?', 'FAQ question.');
    line('home.faq.account.a', 'No. The app gives you a Radar profile automatically. You can report waits straight away. To protect your {radarPoints}, add your email later. No password needed. The app emails you a 6-digit code.', 'FAQ answer. {radarPoints} is the app label.', { appSlots: { radarPoints: 'radar.balance' } });
    line('home.faq.where.q', 'Where does PickupRadar work?', 'FAQ question. Keep PickupRadar.');
    line('home.faq.where.a', 'PickupRadar works in Milton Keynes now. London is next. Then more cities, like Manchester, Birmingham, Leeds, Liverpool and Glasgow. See {cities}.', 'FAQ answer. Keep PickupRadar and every city name. {cities} is the link.', { domSlots: ['cities'] });
    line('home.faq.where.cities', 'all the cities', 'Link text to the city list on this page.');
    line('home.faq.download.q', 'When can I download the app?', 'FAQ question. Do not say the app can be downloaded today.');
    line('home.faq.download.a', 'The iPhone and Android apps are coming soon. For now, the {preview} shows real Milton Keynes pickup points and waits.', 'FAQ answer. {preview} is the link. Keep Milton Keynes. Do not say the apps are in the stores.', { domSlots: ['preview'] });
    line('home.faq.download.link', 'live preview', 'Link text inside the download answer. It opens the live preview page.');
    line('home.faq.wait.q', 'How is the current wait worked out?', 'FAQ question. Use the same idea as the app label Current wait.');
    line('home.faq.wait.a', 'It comes from driver reports in the last 2 hours. Reports older than 2 hours do not affect the current wait.', 'FAQ answer. Keep 2 hours.');
    line('home.faq.likely.q', 'What do {likelyFast} and {likelySlow} mean?', 'FAQ question. Both placeholders are app labels.', { appSlots: { likelyFast: 'home.likelyFast', likelySlow: 'home.likelySlow' } });
    line('home.faq.likely.a', 'These are estimates, not live reports. They appear when there are no recent wait reports.', 'FAQ answer for Likely fast and Likely slow.');
    line('home.faq.track.q', 'Does it track my location?', 'FAQ question.');
    line('home.faq.track.a', 'No background tracking. The app uses your location while you use it, to show nearby pickup points and check you are at a pickup point when reporting. The website asks for location only when you choose to use it. Read the {privacy} for more.', 'FAQ answer. {privacy} is the link to the English privacy policy.', { domSlots: ['privacy'] });
    line('home.faq.track.privacy', 'privacy policy', 'Link text to the English privacy policy.');
    line('home.faq.delete.q', 'How do I delete my data?', 'FAQ question.');
    line('home.faq.delete.a', 'In the app, open {profile}. Tap {deleteAccount}. If you did not add an email, tap {deleteProfile}. You can also email us. See {page} for the steps.', 'FAQ answer. {profile}, {deleteAccount} and {deleteProfile} are app labels. {page} is the link.', { appSlots: { profile: 'radar.title', deleteAccount: 'radar.delete.protected.action', deleteProfile: 'radar.delete.anonymous.action' }, domSlots: ['page'] });
    line('home.closer.title', 'Explore Milton Keynes pickup points.', 'Closing heading. Keep Milton Keynes.');
    line('home.closer.body', 'Explore real pickup points in Milton Keynes. Search for a place and try the report screen. Nothing you tap is sent.', 'Closing text. Keep Milton Keynes.');
    line('home.closer.cta', 'Open the live preview', 'Closing button. It opens the live preview page.');

    line('app.meta.title', 'Live app preview — PickupRadar', 'Browser title and social title for the live preview page. Keep PickupRadar.');
    line('app.meta.description', 'Try the PickupRadar app with real Milton Keynes data. Look around, search for pickup points and see the report screen.', 'Description for the live preview page. Keep PickupRadar and Milton Keynes.');
    line('app.hero.lede', 'This is PickupRadar with real Milton Keynes data. Look around. Search for a pickup point and open it. Nothing you tap here is sent. You can only report in the mobile app.', 'Introduction on the live preview page. Keep PickupRadar and Milton Keynes.');
    line('app.preview.aria', 'Full PickupRadar app preview with real Milton Keynes data', 'Accessible name for the full phone preview. Keep PickupRadar and Milton Keynes.');

    line('support.meta.title', 'Support — PickupRadar', 'Browser title for the support page. Keep PickupRadar.');
    line('support.meta.description', 'Get help with PickupRadar: contact support, report a pickup point problem, and find answers about your Radar profile, {radarPoints} and deleting your account.', 'Description for the support page. Keep PickupRadar. {radarPoints} is the app label.', { appSlots: { radarPoints: 'radar.balance' } });
    line('support.hero.lede', 'Need help? Email us about the app, a pickup point, your {radarPoints} or your privacy.', 'Support page introduction. {radarPoints} is the app label.', { appSlots: { radarPoints: 'radar.balance' } });
    line('support.contact.aria', 'Contact', 'Accessible name for the contact cards. Not shown on screen.');
    line('support.contact.title', 'Contact support', 'Heading on the contact card.');
    line('support.contact.body', 'Email us for help, ideas, pickup point problems or privacy questions:', 'Line above the support email address. Do not translate the email address.');
    line('support.address.title', 'Business correspondence address', 'Heading above the postal address. Do not translate the address lines.');
    line('support.address.note', 'For letters only. Email is the fastest way to reach us.', 'Note under the postal-address heading.');
    line('support.include.title', 'What to include', 'Heading for the list of details to send with a problem report.');
    line('support.include.body', 'If you report a problem, please tell us:', 'Line above that list.');
    line('support.include.name', 'The pickup point name', 'First detail to include.');
    line('support.include.area', 'The area or postcode, if you know it', 'Second detail to include.');
    line('support.include.wrong', 'What went wrong', 'Third detail to include.');
    line('support.include.phone', 'Your phone model, if the app has a problem', 'Fourth detail to include.');
    line('support.topics.title', 'Common questions', 'Heading for the support topics.');
    line('support.topics.profile.title', 'Radar profile and email', 'Support topic heading.');
    line('support.topics.profile.body', 'The app gives you a Radar profile automatically. You do not need to log in to use PickupRadar or earn {radarPoints}. Adding your email is optional. It protects your {radarPoints} if you change or reset your phone. No password needed. The app emails you a 6-digit code.', 'Support topic. Keep PickupRadar. {radarPoints} is the app label and appears twice.', { appSlots: { radarPoints: 'radar.balance' } });
    line('support.topics.points.title', '{radarPoints} and referrals', 'Support topic heading. {radarPoints} is the app label.', { appSlots: { radarPoints: 'radar.balance' } });
    line('support.topics.points.body', 'You earn {radarPoints} for valid wait reports ({waitRp}, or {neededRp} when it says {reportNeeded}), a first report bonus ({firstRp}) and pickup points we approve ({approvedRp}). You can invite a driver from {profile}. You both need protected Radar accounts (add your email). Your friend enters your code before their first valid wait report. When your friend makes 3 valid wait reports, on at least 2 different days (UTC time), at 2 different pickup points, you each earn {referralRp}. {rewards} You can\'t redeem {radarPoints} yet.', 'Support topic with the points rules. Every placeholder is an app label. {radarPoints} appears twice. Keep 3, 2 and UTC.', { appSlots: { radarPoints: 'radar.balance', waitRp: 'radar.earning.waitReportRp', neededRp: 'radar.earning.reportNeededRp', reportNeeded: 'radar.earning.reportNeeded', firstRp: 'radar.earning.firstBonusRp', approvedRp: 'radar.earning.pickupPointApprovedRp', profile: 'radar.title', referralRp: 'radar.earning.driverReferralRp', rewards: 'radar.rewards.comingSoon' } });
    line('support.topics.messages.title', 'Driver messages', 'Support topic heading.');
    line('support.topics.messages.body', '{profile} has {messages}: announcements, alerts and personal messages for your city or Radar profile. Old or removed messages may no longer appear.', 'Support topic. {profile} and {messages} are app labels.', { appSlots: { profile: 'radar.title', messages: 'radar.messages.title' } });
    line('support.topics.delete.title', 'Delete your account', 'Support topic heading.');
    line('support.topics.delete.body', 'Delete your account in the app: {profile} → {deleteAccount}. Or email {email}. If you did not add an email, the app shows {deleteProfile} instead. See the {page} page for the steps.', 'Support topic. Keep the arrow → and the email address. {profile}, {deleteAccount} and {deleteProfile} are app labels. {email} and {page} stay links.', { appSlots: { profile: 'radar.title', deleteAccount: 'radar.delete.protected.action', deleteProfile: 'radar.delete.anonymous.action' }, domSlots: ['email', 'page'] });
    line('support.topics.missing.body', 'Is a pickup point missing? Tap {suggest} in the app. Is one wrong? Tap {reportProblem}. Or email us and we will check it.', 'Support topic. {suggest} and {reportProblem} are app labels.', { appSlots: { suggest: 'missing.button', reportProblem: 'problem.report' } });
    line('support.topics.delivery.title', 'Your delivery app accounts', 'Support topic heading.');
    line('support.topics.delivery.body', 'PickupRadar does not connect to your Uber Eats, Deliveroo, Just Eat or other delivery app accounts. We never ask for your delivery app logins, passwords, account details, customer details or order details. Drivers only share pickup reports, like wait times and pickup point problems.', 'Support topic. Keep PickupRadar, Uber Eats, Deliveroo and Just Eat.');
    line('support.closer.title', 'Try PickupRadar before the app launches.', 'Closing heading on the support page. Keep PickupRadar.');
    line('support.closer.body', 'The live preview shows real Milton Keynes pickup points and waits. Reporting and {radarPoints} are only in the mobile app.', 'Closing text. Keep Milton Keynes. {radarPoints} is the app label.', { appSlots: { radarPoints: 'radar.balance' } });

    line('notfound.meta.title', 'Page not found — PickupRadar', 'Browser title for the not-found page. Keep PickupRadar.');
    line('notfound.meta.description', 'That page is not on the PickupRadar website.', 'Description for the not-found page. Keep PickupRadar.');
    line('notfound.title', 'This page is off the radar.', 'Heading on the not-found page.');
    line('notfound.body', 'That address isn\'t on the PickupRadar website. These pages are:', 'Text on the not-found page. Keep PickupRadar.');
    line('notfound.home', 'Home', 'Button back to the homepage.');
    return text;
  })()
  /* SITE_TEXT_END */
  ;

  var header = document.querySelector('[data-site-header]');
  if (header) {
    var update = function () {
      header.classList.toggle('is-scrolled', (window.scrollY || window.pageYOffset) > 8);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  var examples = document.querySelectorAll('.w-example .preview-root');
  if (examples.length) {
    var fit = function () {
      var viewportWidth = document.documentElement.clientWidth || window.innerWidth;
      for (var i = 0; i < examples.length; i++) {
        var phoneWidth = examples[i].offsetWidth || 418;
        var scale = Math.min(1, Math.max(0.5, (viewportWidth - 24) / phoneWidth));
        examples[i].style.setProperty('--preview-fit-scale', String(scale));
      }
    };
    fit();
    window.addEventListener('resize', fit);
  }
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var questions = document.querySelectorAll('.w-faq details');
  for (var q = 0; q < questions.length; q++) {
    questions[q].addEventListener('toggle', function (event) {
      var item = event.currentTarget;
      if (!item.open) return;
      var box = item.getBoundingClientRect();
      if (box.bottom > window.innerHeight) {
        item.scrollIntoView({ block: box.height > window.innerHeight ? 'start' : 'end', behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    });
  }

  var topButton = null;
  if (!document.body.classList.contains('page-live-preview')) {
    topButton = document.createElement('button');
    topButton.type = 'button';
    topButton.className = 'w-top';
    topButton.hidden = true;
    topButton.setAttribute('aria-label', 'Back to top');
    topButton.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M11 20V7.4l-5.6 5.7L4 11.7 12 3.6l8 8.1-1.4 1.4L13 7.4V20z"/></svg>';
    topButton.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      var skip = document.querySelector('.w-brand');
      if (skip) skip.focus({ preventScroll: true });
    });
    document.body.appendChild(topButton);
    var updateTop = function () {
      var y = window.scrollY || window.pageYOffset;
      topButton.hidden = y <= window.innerHeight;
    };
    updateTop();
    window.addEventListener('scroll', updateTop, { passive: true });
  }

  if (!document.body.hasAttribute('data-site-i18n-page')) return;

  var STORAGE_KEY = 'pickupradar_language_v1';
  var I18N_VERSION = '5dcfec4';
  var CC = window.PickupRadarLogic && window.PickupRadarLogic.countryConfig;
  var RTL = (CC && CC.RTL_LANGUAGE_CODES) || ['ur', 'ar', 'fa', 'ps', 'prs'];
  var LANGUAGE_ENTRIES = CC && CC.getAllLanguageEntries
    ? CC.getAllLanguageEntries()
    : [{ name: 'English', code: 'en', display: 'English' }];
  var CODE_SET = {};
  for (var n = 0; n < LANGUAGE_ENTRIES.length; n++) CODE_SET[LANGUAGE_ENTRIES[n].code] = true;
  var APP_ENGLISH = {};
  Object.keys(SITE_TEXT).forEach(function (id) {
    if (SITE_TEXT[id].app) APP_ENGLISH[SITE_TEXT[id].app] = SITE_TEXT[id].en;
  });

  var dictionaryCache = {};
  var siteManifestRequest = null;
  var siteDictionaryCache = {};
  var languageCode = 'en';
  var requestedCode = null;
  var dict = null;
  var englishDict = null;
  var siteDict = null;
  var requestId = 0;
  var moreExpanded = false;
  var focusExtra = false;
  var activeOpener = null;

  function isRtl(code) {
    return RTL.indexOf(code) !== -1;
  }

  function displayName(code) {
    for (var i = 0; i < LANGUAGE_ENTRIES.length; i++) {
      if (LANGUAGE_ENTRIES[i].code === code) return LANGUAGE_ENTRIES[i].display;
    }
    return 'English';
  }

  function known(code) {
    return !!CODE_SET[code];
  }

  function readSaved() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      return saved && known(saved) ? saved : null;
    } catch (error) {
      return null;
    }
  }

  function save(code) {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch (error) {
      // Storage blocked: the choice still applies until the page is closed.
    }
  }

  function dispatch(code) {
    try {
      window.dispatchEvent(new CustomEvent('pickupradar-language', { detail: { code: code } }));
    } catch (error) {
      // The saved choice still applies on the next load.
    }
  }

  // Same mapping as the phone preview and the app (mapPhoneLocaleToPickupRadarCode).
  function mapLocale(tag) {
    var parts = String(tag || '').replace(/_/g, '-').toLowerCase().split('-').filter(Boolean);
    var lang = parts[0];
    if (!lang) return null;
    function has(part) { return parts.indexOf(part) !== -1; }
    if (lang === 'tl' || lang === 'fil') return 'tl';
    if (lang === 'prs') return 'prs';
    if (lang === 'fa' && has('af')) return 'prs';
    if (lang === 'zh') return has('hant') || has('tw') || has('hk') || has('mo') ? 'zh-Hant' : 'zh-Hans';
    if (lang === 'pa') {
      if (has('arab')) return null;
      if (has('guru')) return 'pa';
      if (has('pk')) return null;
      return 'pa';
    }
    if (lang === 'no' || lang === 'nn') return CODE_SET.nb ? 'nb' : null;
    return CODE_SET[lang] ? lang : null;
  }

  function detectBrowser() {
    var list = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]) || [];
    for (var i = 0; i < list.length; i++) {
      var code = mapLocale(list[i]);
      if (code) return code;
    }
    return null;
  }

  function loadDict(code) {
    if (dictionaryCache[code]) return Promise.resolve(dictionaryCache[code]);
    return fetch('/i18n/' + encodeURIComponent(code) + '.json?v=' + I18N_VERSION, { credentials: 'omit' })
      .then(function (response) {
        if (!response.ok) throw new Error('Language file unavailable');
        return response.json();
      })
      .then(function (data) {
        if (!data || typeof data !== 'object') throw new Error('Language file unavailable');
        dictionaryCache[code] = data;
        return data;
      });
  }

  function placeholderList(text) {
    return (String(text).match(/\{\w+\}/g) || []).slice().sort().join(',');
  }

  function loadSiteManifest() {
    if (!siteManifestRequest) {
      siteManifestRequest = fetch('/i18n-web/site/manifest.json', { credentials: 'omit', cache: 'no-cache' })
        .then(function (response) { return response.ok ? response.json() : null; })
        .then(function (manifest) {
          return manifest && manifest.languages && typeof manifest.languages === 'object' ? manifest.languages : {};
        })
        .catch(function () {
          siteManifestRequest = null;
          return {};
        });
    }
    return siteManifestRequest;
  }

  function readSiteStrings(file) {
    var strings = {};
    var source = file && file.strings;
    if (!source || typeof source !== 'object') return strings;
    Object.keys(SITE_TEXT).forEach(function (id) {
      var entry = SITE_TEXT[id];
      if (!entry || entry.app) return;
      var item = source[id];
      if (!item || typeof item.text !== 'string' || !item.text.trim()) return;
      if (item.en !== entry.en || placeholderList(item.text) !== placeholderList(entry.en)) return;
      strings[id] = item.text;
    });
    return strings;
  }

  function loadSiteDict(code) {
    if (code === 'en') return Promise.resolve(null);
    return loadSiteManifest().then(function (languages) {
      var entry = languages[code];
      if (!entry || typeof entry.v !== 'string') return null;
      var cacheKey = code + '@' + entry.v;
      if (!siteDictionaryCache[cacheKey]) {
        siteDictionaryCache[cacheKey] = fetch('/i18n-web/site/' + encodeURIComponent(code) + '.json?v=' + encodeURIComponent(entry.v), { credentials: 'omit' })
          .then(function (response) {
            if (!response.ok) throw new Error('Website language file unavailable');
            return response.json();
          })
          .then(readSiteStrings)
          .catch(function (error) {
            delete siteDictionaryCache[cacheKey];
            throw error;
          });
      }
      return siteDictionaryCache[cacheKey];
    }).catch(function () {
      return null;
    });
  }

  // The website shows another language only once its website translation is published.
  // Until then the whole marketing page stays English (app labels too), so a page never
  // mixes languages. The phone preview still follows the chosen language on its own.
  function siteActive() {
    return languageCode !== 'en' && !!siteDict && Object.keys(siteDict).length > 0;
  }

  function pageLanguage() {
    return siteActive() ? languageCode : 'en';
  }

  function englishAppString(appKey) {
    if (englishDict && typeof englishDict[appKey] === 'string') return englishDict[appKey];
    return APP_ENGLISH[appKey] || '';
  }

  function appString(appKey, english) {
    if (!english && siteActive() && dict && typeof dict[appKey] === 'string') return dict[appKey];
    return englishAppString(appKey);
  }

  // translated: true when the text is in the page language (English counts on an English page).
  function resolve(key) {
    var entry = SITE_TEXT[key];
    if (!entry) return null;
    var active = siteActive();
    if (entry.app) {
      var fromApp = active && dict && typeof dict[entry.app] === 'string';
      return { text: appString(entry.app) || entry.en, translated: !active || fromApp };
    }
    var template = entry.en;
    var translated = !active;
    if (active && siteDict && typeof siteDict[key] === 'string') {
      template = siteDict[key];
      translated = true;
    }
    // An English sentence keeps English app labels, so it is never half translated.
    var englishSlots = !translated || !active;
    if (entry.appSlots) {
      template = template.replace(/\{(\w+)\}/g, function (match, name) {
        if (!entry.appSlots[name]) return match;
        return appString(entry.appSlots[name], englishSlots) || match;
      });
    }
    return { text: template, translated: translated };
  }

  // Wait ranges such as "10–15 min" and "15+ min" read left to right in every language.
  var LTR_KEYS = {
    'shared.term.under5': true,
    'shared.term.fiveToTen': true,
    'shared.term.tenToFifteen': true,
    'shared.term.fifteenPlus': true,
  };

  function mark(el, translated, key) {
    if (el.tagName === 'META' || el.tagName === 'TITLE') return;
    if (pageLanguage() === 'en') {
      el.removeAttribute('lang');
      el.removeAttribute('dir');
      return;
    }
    if (translated) {
      el.setAttribute('lang', languageCode);
      el.setAttribute('dir', key && LTR_KEYS[key] ? 'ltr' : isRtl(languageCode) ? 'rtl' : 'ltr');
    } else {
      el.setAttribute('lang', 'en');
      el.setAttribute('dir', 'ltr');
    }
  }

  function appendText(parent, text) {
    var parts = String(text).split(/(\+?\d+ RP)/);
    for (var i = 0; i < parts.length; i++) {
      if (!parts[i]) continue;
      if (/^\+?\d+ RP$/.test(parts[i])) {
        var bdi = document.createElement('bdi');
        bdi.setAttribute('dir', 'ltr');
        bdi.textContent = parts[i];
        parent.appendChild(bdi);
      } else {
        parent.appendChild(document.createTextNode(parts[i]));
      }
    }
  }

  function fillElement(el, text) {
    if (!/\d+ RP/.test(text)) {
      el.textContent = text;
      return;
    }
    el.textContent = '';
    appendText(el, text);
  }

  function applyText(el, key) {
    var info = resolve(key);
    if (!info) return;
    var slots = {};
    for (var c = 0; c < el.children.length; c++) {
      var slotName = el.children[c].getAttribute('data-site-slot');
      if (slotName) slots[slotName] = el.children[c];
    }
    var slotNames = Object.keys(slots);
    if (slotNames.length) {
      var parts = info.text.split(/(\{\w+\})/);
      var frag = document.createDocumentFragment();
      for (var p = 0; p < parts.length; p++) {
        var found = /^\{(\w+)\}$/.exec(parts[p]);
        if (found && slots[found[1]]) frag.appendChild(slots[found[1]]);
        else if (parts[p]) appendText(frag, parts[p]);
      }
      el.textContent = '';
      el.appendChild(frag);
    } else if (el.tagName === 'META') {
      el.setAttribute('content', info.text);
    } else {
      fillElement(el, info.text);
    }
    mark(el, info.translated, key);
  }

  function depth(el) {
    var count = 0;
    while (el) {
      count += 1;
      el = el.parentElement;
    }
    return count;
  }

  function updateLanguageLabels() {
    var name = displayName(languageCode);
    var labels = document.querySelectorAll('[data-site-language-label]');
    for (var i = 0; i < labels.length; i++) {
      labels[i].textContent = name;
      labels[i].setAttribute('lang', languageCode);
      labels[i].setAttribute('dir', isRtl(languageCode) ? 'rtl' : 'ltr');
    }
    var word = resolve('shared.ui.language');
    var openers = document.querySelectorAll('[data-site-language-open]');
    for (var j = 0; j < openers.length; j++) {
      openers[j].setAttribute('aria-label', (word ? word.text : 'Language') + ', ' + name);
    }
  }

  function render() {
    // English until this language's website translation is published. Structured data stays
    // en-GB: the pages have one English URL each.
    var page = pageLanguage();
    document.documentElement.lang = page;
    document.documentElement.dir = page !== 'en' && isRtl(page) ? 'rtl' : 'ltr';
    // The homepage example is a fixed left-to-right mock. Translated labels set their own
    // direction. The interactive preview sets direction on its own phone screen.
    var samplePhones = document.querySelectorAll('.w-example .phone-screen');
    for (var p = 0; p < samplePhones.length; p++) {
      samplePhones[p].setAttribute('lang', 'en');
      samplePhones[p].setAttribute('dir', 'ltr');
    }
    var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-site-i18n], [data-site-i18n-aria]'));
    nodes.sort(function (a, b) { return depth(b) - depth(a); });
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute('data-site-i18n');
      if (key) applyText(nodes[i], key);
      var aria = nodes[i].getAttribute('data-site-i18n-aria');
      if (aria) {
        var info = resolve(aria);
        if (info) {
          nodes[i].setAttribute('aria-label', info.text);
          if (!key) mark(nodes[i], info.translated);
        }
      }
    }
    updateLanguageLabels();
    if (topButton) {
      var back = resolve('shared.term.backToTop');
      if (back) topButton.setAttribute('aria-label', back.text);
    }
    updateDialogChrome();
    if (dialog && !dialog.hidden) renderList();
  }

  function applyLanguage(code, settings) {
    if (!known(code)) return;
    if (code === languageCode && requestedCode === code && englishDict) return;
    var id = ++requestId;
    requestedCode = code;
    var persist = !!(settings && settings.persist);
    var notify = !!(settings && settings.notify);
    Promise.all([
      code === 'en' ? Promise.resolve(null) : loadDict(code),
      loadDict('en'),
      loadSiteDict(code),
    ]).then(function (parts) {
      if (id !== requestId) return;
      englishDict = parts[1];
      dict = code === 'en' ? englishDict : parts[0];
      siteDict = parts[2];
      languageCode = code;
      if (persist) save(code);
      render();
      if (notify) dispatch(code);
    }).catch(function () {
      if (id !== requestId) return;
      requestedCode = languageCode;
    });
  }

  var dialog = document.createElement('div');
  dialog.className = 'w-lang-dialog';
  dialog.id = 'site-language-dialog';
  dialog.hidden = true;
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-labelledby', 'site-language-title');
  var panel = document.createElement('div');
  panel.className = 'w-lang-panel';
  var dialogHead = document.createElement('div');
  dialogHead.className = 'w-lang-head';
  var dialogTitle = document.createElement('h2');
  dialogTitle.id = 'site-language-title';
  dialogTitle.className = 'w-lang-title';
  var closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'w-lang-close';
  dialogHead.appendChild(dialogTitle);
  dialogHead.appendChild(closeButton);
  var search = document.createElement('input');
  search.className = 'w-lang-search';
  search.type = 'search';
  search.setAttribute('autocomplete', 'off');
  search.setAttribute('autocapitalize', 'off');
  search.setAttribute('spellcheck', 'false');
  search.setAttribute('enterkeyhint', 'search');
  var list = document.createElement('div');
  list.className = 'w-lang-list';
  list.setAttribute('role', 'listbox');
  list.setAttribute('aria-labelledby', 'site-language-title');
  panel.appendChild(dialogHead);
  panel.appendChild(search);
  panel.appendChild(list);
  dialog.appendChild(panel);
  document.body.appendChild(dialog);

  function updateDialogChrome() {
    var title = resolve('shared.ui.language');
    var close = resolve('shared.ui.close');
    var searchLabel = resolve('shared.ui.search');
    if (title) dialogTitle.textContent = title.text;
    if (close) closeButton.textContent = close.text;
    if (searchLabel) {
      search.setAttribute('placeholder', searchLabel.text);
      search.setAttribute('aria-label', searchLabel.text);
    }
    mark(dialogTitle, title ? title.translated : true);
    mark(closeButton, close ? close.translated : true);
  }

  function normalize(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  function optionButtons() {
    return Array.prototype.slice.call(list.querySelectorAll('[data-site-language-code], [data-site-language-more]'));
  }

  function renderList() {
    var query = normalize(search.value);
    var rows = [];
    var showMore = false;
    var moreCodes = {};
    if (query) {
      rows = LANGUAGE_ENTRIES.filter(function (entry) {
        return normalize(entry.name).indexOf(query) !== -1 ||
          normalize(entry.display).indexOf(query) !== -1 ||
          normalize(entry.code).indexOf(query) !== -1;
      });
    } else if (!CC || !CC.buildLanguagePickerSections) {
      rows = LANGUAGE_ENTRIES.slice();
    } else {
      var sections = CC.buildLanguagePickerSections('Milton Keynes', LANGUAGE_ENTRIES, languageCode, function () { return true; });
      sections.more.forEach(function (entry) { moreCodes[entry.code] = true; });
      if (moreExpanded) rows = sections.recommended.concat(sections.more);
      else {
        rows = sections.recommended;
        showMore = sections.more.length > 0;
      }
    }
    var previous = document.activeElement && document.activeElement.getAttribute && list.contains(document.activeElement)
      ? document.activeElement.getAttribute('data-site-language-code')
      : '';
    list.textContent = '';
    if (!rows.length) {
      var empty = document.createElement('p');
      empty.className = 'w-lang-empty';
      var emptyInfo = resolve('shared.ui.noResults');
      empty.textContent = emptyInfo ? emptyInfo.text : 'No languages found';
      mark(empty, emptyInfo ? emptyInfo.translated : true);
      list.appendChild(empty);
    }
    var activeWord = resolve('shared.ui.active');
    rows.forEach(function (entry) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'w-lang-option';
      button.setAttribute('role', 'option');
      button.setAttribute('data-site-language-code', entry.code);
      if (moreCodes[entry.code]) button.setAttribute('data-site-language-extra', 'true');
      var selected = entry.code === languageCode;
      button.setAttribute('aria-selected', selected ? 'true' : 'false');
      var name = document.createElement('span');
      name.className = 'w-lang-option-name';
      name.textContent = entry.display;
      name.setAttribute('lang', entry.code);
      name.setAttribute('dir', isRtl(entry.code) ? 'rtl' : 'ltr');
      button.appendChild(name);
      if (selected) {
        var active = document.createElement('span');
        active.className = 'w-lang-active';
        active.textContent = activeWord ? activeWord.text : 'Active';
        mark(active, activeWord ? activeWord.translated : true);
        button.appendChild(active);
      }
      button.addEventListener('click', function () { selectLanguage(entry.code); });
      list.appendChild(button);
    });
    if (showMore) {
      var more = document.createElement('button');
      more.type = 'button';
      more.className = 'w-lang-more';
      more.setAttribute('data-site-language-more', 'true');
      var moreInfo = resolve('shared.ui.more');
      more.textContent = moreInfo ? moreInfo.text : 'More languages';
      mark(more, moreInfo ? moreInfo.translated : true);
      var chevron = document.createElement('span');
      chevron.className = 'w-lang-chevron';
      chevron.setAttribute('aria-hidden', 'true');
      chevron.textContent = isRtl(languageCode) ? '‹' : '›';
      more.appendChild(chevron);
      more.addEventListener('click', function () {
        moreExpanded = true;
        focusExtra = true;
        renderList();
      });
      list.appendChild(more);
    }
    if (focusExtra) {
      focusExtra = false;
      var extra = list.querySelector('[data-site-language-extra]');
      if (extra) extra.focus();
    } else if (previous) {
      var again = list.querySelector('[data-site-language-code="' + previous + '"]');
      if (again) again.focus();
    }
  }

  function openDialog(opener) {
    activeOpener = opener || activeOpener;
    moreExpanded = false;
    search.value = '';
    dialog.hidden = false;
    document.body.classList.add('w-lang-open');
    if (activeOpener) activeOpener.setAttribute('aria-expanded', 'true');
    updateDialogChrome();
    renderList();
    var selected = list.querySelector('[aria-selected="true"]');
    if (selected && selected.scrollIntoView) selected.scrollIntoView({ block: 'nearest' });
    search.focus();
  }

  function closeDialog() {
    if (dialog.hidden) return;
    dialog.hidden = true;
    document.body.classList.remove('w-lang-open');
    var openers = document.querySelectorAll('[data-site-language-open]');
    for (var i = 0; i < openers.length; i++) openers[i].setAttribute('aria-expanded', 'false');
    if (activeOpener && document.contains(activeOpener)) activeOpener.focus();
  }

  function selectLanguage(code) {
    closeDialog();
    if (!code || code === languageCode) return;
    applyLanguage(code, { persist: true, notify: true });
  }

  function focusable() {
    return Array.prototype.filter.call(panel.querySelectorAll('button, input'), function (el) {
      return !el.closest('[hidden]');
    });
  }

  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) closeDialog();
  });
  closeButton.addEventListener('click', closeDialog);
  search.addEventListener('input', function () { renderList(); });
  document.addEventListener('keydown', function (event) {
    if (dialog.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDialog();
      return;
    }
    var options = optionButtons();
    var index = options.indexOf(document.activeElement);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Home' || event.key === 'End') {
      if (!options.length) return;
      event.preventDefault();
      var next = 0;
      if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = options.length - 1;
      else if (event.key === 'ArrowDown') {
        if (index === -1) next = 0;
        else next = Math.min(options.length - 1, index + 1);
      } else if (index <= 0) {
        search.focus();
        return;
      } else next = index - 1;
      options[next].focus();
      return;
    }
    if (event.key !== 'Tab') return;
    var items = focusable();
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  var openers = document.querySelectorAll('[data-site-language-open]');
  for (var o = 0; o < openers.length; o++) {
    openers[o].addEventListener('click', function (event) { openDialog(event.currentTarget); });
  }

  window.addEventListener('pickupradar-language', function (event) {
    var code = event.detail && event.detail.code;
    if (!code || code === languageCode || code === requestedCode || !known(code)) return;
    applyLanguage(code, { persist: false, notify: false });
  });
  window.addEventListener('storage', function (event) {
    if (event.key !== STORAGE_KEY || !event.newValue || event.newValue === languageCode || !known(event.newValue)) return;
    applyLanguage(event.newValue, { persist: false, notify: false });
  });

  var savedLanguage = readSaved();
  var initialLanguage = savedLanguage || detectBrowser() || 'en';
  if (initialLanguage === 'en') applyLanguage('en', { persist: false, notify: false });
  else applyLanguage(initialLanguage, { persist: false, notify: false });
})();
