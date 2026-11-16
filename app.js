  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); btn.setAttribute('aria-expanded', false); }
  });

  /* ===== تكبير صور المعرض ===== */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  document.querySelectorAll('.shot').forEach(b => b.addEventListener('click', () => {
    const img = b.querySelector('img');
    if (!img) return;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lb.showModal();
  }));
  document.getElementById('lbClose').addEventListener('click', () => lb.close());
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });

  /* ===== تسجيل الدخول =====
     الحسابات تُحفظ في متصفح الزائر فقط (localStorage).
     للحسابات الحقيقية المشتركة بين الأجهزة نحتاج خادمًا (مثل Firebase). */
  const mem = {};
  const store = {
    get(k, d){ try{ const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); }catch(e){ return k in mem ? mem[k] : d; } },
    set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){ mem[k] = v; } },
    del(k){ try{ localStorage.removeItem(k); }catch(e){ delete mem[k]; } }
  };
  async function hashPass(p){
    if (window.crypto && crypto.subtle) {
      const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('lina:' + p));
      return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join('');
    }
    return btoa(encodeURIComponent('lina:' + p));
  }


  /* ===== اللغة / Langue =====
     النصوص العربية في الصفحة هي الأصل، والقاموس FR يحمل الترجمة الفرنسية.
     اللغة تُحفظ في المتصفح، وفي حساب المستخدم إن كان مسجّلًا. */
  const FR = {
 "نسيت كلمة السر؟": "Mot de passe oublié ?",
 "حسابك محفوظ على الإنترنت: ادخل ببريدك وكلمة السر من أي هاتف أو متصفح.": "Votre compte est enregistré en ligne : connectez-vous avec votre e-mail et votre mot de passe depuis n’importe quel téléphone ou navigateur.",
 "تعذّر الاتصال بالخادم. تحقق من الإنترنت ثم أعد المحاولة.": "Connexion au serveur impossible. Vérifiez votre connexion internet puis réessayez.",
 "محاولات كثيرة. انتظر قليلًا ثم أعد المحاولة.": "Trop de tentatives. Patientez un instant puis réessayez.",
 "حدث خطأ. أعد المحاولة بعد قليل.": "Une erreur est survenue. Réessayez dans un instant.",
 "اكتب بريدك الإلكتروني أولًا.": "Saisissez d’abord votre adresse e-mail.",
 "أرسلنا لك رابط إعادة تعيين كلمة السر على بريدك.": "Nous vous avons envoyé un lien de réinitialisation du mot de passe par e-mail.",
 "ادفع العربون عبر بريدي موب": "Payer l’acompte via BaridiMob",
 "دفع العربون عبر بريدي موب": "Paiement de l’acompte via BaridiMob",
 "افتح تطبيق بريدي موب واختر «تحويل».": "Ouvrez l’application BaridiMob et choisissez « Virement ».",
 "أدخل بيانات الحساب أدناه والمبلغ.": "Saisissez les coordonnées du compte ci-dessous et le montant.",
 "صوّر وصل التحويل وأرسله لنا على واتساب.": "Prenez en photo le reçu du virement et envoyez-le-nous sur WhatsApp.",
 "صاحب الحساب": "Titulaire du compte",
 "الحساب البريدي (CCP)": "Compte postal (CCP)",
 "نسخ": "Copier",
 "مبلغ العربون (دج)": "Montant de l’acompte (DA)",
 "مثال: 20000": "Ex. : 20000",
 "أرسل وصل الدفع عبر واتساب": "Envoyer le reçu via WhatsApp",
 "لا يُعتبر الحجز مؤكدًا إلا بعد التحقق من وصل الدفع.": "La réservation n’est confirmée qu’après vérification du reçu de paiement.",
 "تم النسخ": "Copié",
 "قاعة الحفلات لينا | بئر توتة": "Salle des Fêtes Lina | Birtouta",
 "قاعة الحفلات لينا": "Salle des Fêtes Lina",
 "القائمة": "Menu",
 "القائمة الرئيسية": "Menu principal",
 "الرئيسية": "Accueil",
 "المعرض": "Galerie",
 "الحجز": "Réservation",
 "حسابي": "Mon compte",
 "الأسعار": "Tarifs",
 "تواصل معنا": "Contact",
 "تسجيل الدخول": "Se connecter",
 "أفضل قاعة حفلات في المنطقة، بدون منازع": "La meilleure salle des fêtes de la région, sans rival",
 "احجز موعدك": "Réserver ma date",
 "شاهد القاعة": "Voir la salle",
 "قاعة لينا، بئر توتة": "Salle Lina, Birtouta",
 "قاعة لينا من الداخل": "L’intérieur de la salle Lina",
 "مناسباتنا": "Nos événements",
 "أعراس": "Mariages",
 "خطوبة": "Fiançailles",
 "أعياد ميلاد": "Anniversaires",
 "ختان": "Circoncisions",
 "حفلات تخرج": "Fêtes de remise de diplômes",
 "القاعة، الموائد، وأطباق مطبخنا. اضغط على أي صورة لتكبيرها.": "La salle, les tables et les plats de notre cuisine. Cliquez sur une image pour l’agrandir.",
 "القاعة من الداخل": "L’intérieur de la salle",
 "فريق المطبخ": "L’équipe de cuisine",
 "طبق سلطة مزين بالورود": "Assiette de salade décorée de fleurs",
 "طبق اللحم بالزيتون والكفتة المحشوة": "Plat de viande aux olives et kefta farcie",
 "مائدة مجهزة بالأطباق والخبز": "Table dressée avec plats et pain",
 "صفوف أطباق السلطة": "Rangées d’assiettes de salade",
 "حلوى بالمكسرات مع العسل": "Pâtisserie aux noix et au miel",
 "حلوى بالمكسرات والكراميل": "Pâtisserie aux noix et au caramel",
 "إغلاق": "Fermer",
 "اختر الصيغة الأقرب لمناسبتك، ونعدّلوها معك حسب الحاجة.": "Choisissez la formule la plus proche de votre événement, nous l’adaptons avec vous selon vos besoins.",
 "الأساسية": "Essentielle",
 "المميزة": "Premium",
 "200 شخص": "200 personnes",
 "100 رجل و100 امرأة": "100 hommes et 100 femmes",
 "400 شخص": "400 personnes",
 "200 رجل و200 امرأة": "200 hommes et 200 femmes",
 "500 شخص": "500 personnes",
 "300 رجل و200 امرأة": "300 hommes et 200 femmes",
 "دج": "DA",
 "القاعة مع الطاولات والكراسي": "La salle avec tables et chaises",
 "الإضاءة العادية": "Éclairage standard",
 "الصوتيات": "Sonorisation",
 "كل ما في الأساسية": "Tout ce qui est inclus dans l’Essentielle",
 "ديكور المنصة": "Décor de l’estrade",
 "إضاءة الأفراح": "Éclairage de fête",
 "استقبال الضيوف": "Accueil des invités",
 "كل ما في المميزة": "Tout ce qui est inclus dans la Premium",
 "تنسيق كامل للمناسبة": "Coordination complète de l’événement",
 "خدمة الضيافة": "Service de réception",
 "أولوية في اختيار التاريخ": "Priorité dans le choix de la date",
 "احجز هذه الصيغة": "Réserver cette formule",
 "الأسعار تختلف حسب التاريخ وعدد المدعوين.": "Les tarifs varient selon la date et le nombre d’invités.",
 "احجز تاريخ مناسبتك": "Réservez la date de votre événement",
 "تعمّر الاستمارة": "Vous remplissez le formulaire",
 "تُرسل لنا الرسالة على واتساب": "Vous nous envoyez le message sur WhatsApp",
 "نأكدو لك التاريخ ونحددو موعد الزيارة": "Nous confirmons la date et fixons un rendez-vous de visite",
 "الاسم الكامل": "Nom complet",
 "رقم الهاتف": "Numéro de téléphone",
 "نوع المناسبة": "Type d’événement",
 "تاريخ المناسبة": "Date de l’événement",
 "عدد المدعوين تقريبًا": "Nombre d’invités (approximatif)",
 "الفترة": "Période",
 "ملاحظات (اختياري)": "Remarques (facultatif)",
 "مثال: أمينة بن علي": "Ex. : Amina Benali",
 "مثال: 250": "Ex. : 250",
 "أي طلب خاص: ديكور، صوتيات، منصة...": "Toute demande particulière : décor, sono, estrade…",
 "اختر...": "Choisir…",
 "عرس": "Mariage",
 "عيد ميلاد": "Anniversaire",
 "حفل تخرج": "Remise de diplômes",
 "مناسبة أخرى": "Autre événement",
 "نهارًا": "En journée",
 "مساءً": "En soirée",
 "ليلاً": "De nuit",
 "أرسل الطلب عبر واتساب": "Envoyer la demande via WhatsApp",
 "لا يتم الحجز نهائيًا إلا بعد التأكيد منا.": "La réservation n’est définitive qu’après notre confirmation.",
 "بياناتك الشخصية وحجوزاتك في مكان واحد.": "Vos informations personnelles et vos réservations au même endroit.",
 "سجّل الدخول باش تشوف حجوزاتك وتعدّل بياناتك.": "Connectez-vous pour voir vos réservations et modifier vos informations.",
 "تسجيل الدخول أو حساب جديد": "Se connecter ou créer un compte",
 "بياناتي": "Mes informations",
 "البريد الإلكتروني": "E-mail",
 "حفظ التعديلات": "Enregistrer les modifications",
 "حجوزاتي": "Mes réservations",
 "ما عندك حتى حجز دابا. عمّر فورم الحجز وراه يظهر هنا.": "Vous n’avez aucune réservation pour le moment. Remplissez le formulaire de réservation et elle apparaîtra ici.",
 "التأكيد النهائي للحجز يتم من القاعة عبر واتساب.": "La confirmation définitive de la réservation est faite par la salle via WhatsApp.",
 "حسابك في قاعة لينا": "Votre compte à la salle Lina",
 "حساب جديد": "Nouveau compte",
 "كلمة السر": "Mot de passe",
 "دخول": "Connexion",
 "كلمة السر (6 أحرف على الأقل)": "Mot de passe (6 caractères minimum)",
 "إنشاء الحساب": "Créer le compte",
 "الحساب يُحفظ في هذا المتصفح فقط. إذا غيّرت الهاتف أو المتصفح، تحتاج تنشئ حسابًا من جديد.": "Le compte est enregistré uniquement dans ce navigateur. Si vous changez de téléphone ou de navigateur, vous devrez recréer un compte.",
 "الاسم": "Nom",
 "الهاتف": "Téléphone",
 "البريد": "E-mail",
 "حجوزاتي وبياناتي": "Mes réservations et informations",
 "احجز الآن": "Réserver maintenant",
 "تسجيل الخروج": "Se déconnecter",
 "واتساب": "WhatsApp",
 "حساب إنستغرام": "Compte Instagram",
 "صفحة فيسبوك": "Page Facebook",
 "حساب تيك توك": "Compte TikTok",
 "تابعنا على إنستغرام": "Suivez-nous sur Instagram",
 "تابعنا على فيسبوك": "Suivez-nous sur Facebook",
 "تابعنا على تيك توك": "Suivez-nous sur TikTok",
 "راسلنا على واتساب": "Écrivez-nous sur WhatsApp",
 "© قاعة الحفلات لينا، بئر توتة": "© Salle des Fêtes Lina, Birtouta",
 "مرحبًا": "Bonjour",
 "حذف": "Supprimer",
 "تأكيد الحذف": "Confirmer la suppression",
 "أُرسل عبر واتساب، بانتظار التأكيد": "Envoyé via WhatsApp, en attente de confirmation",
 "عمّر الاسم والهاتف.": "Veuillez renseigner le nom et le téléphone.",
 "تم حفظ التعديلات.": "Modifications enregistrées.",
 "عمّر كل الخانات بشكل صحيح.": "Veuillez remplir correctement tous les champs.",
 "هذا البريد مسجّل من قبل. جرّب تسجيل الدخول.": "Cet e-mail est déjà enregistré. Essayez de vous connecter.",
 "البريد أو كلمة السر غير صحيحة.": "E-mail ou mot de passe incorrect.",
 "تم تسجيل الخروج.": "Vous êtes déconnecté.",
 "عمّر الخانات المطلوبة من فضلك.": "Merci de remplir les champs obligatoires.",
 "تم فتح واتساب وسجّلنا الطلب في حسابي. اضغط إرسال باش توصلنا الرسالة.": "WhatsApp est ouvert et la demande a été enregistrée dans votre compte. Appuyez sur Envoyer pour nous transmettre le message.",
 "تم فتح واتساب. اضغط إرسال باش توصلنا الرسالة. سجّل الدخول باش تتابع طلباتك في حسابي.": "WhatsApp est ouvert. Appuyez sur Envoyer pour nous transmettre le message. Connectez-vous pour suivre vos demandes dans Mon compte."
};
  const FR_HTML = {
    heroP: "Au cœur de <strong>Birtouta</strong>, là où la famille se réunit et où la joie est complète, la salle Lina est la destination idéale pour une fête dont on se souviendra longtemps. De la première entrée des mariés jusqu’au dernier éclat de rire, nous soignons chaque détail.",
    bookIntro: "Remplissez les informations : en cliquant sur le bouton, vous êtes redirigé vers WhatsApp avec un message prêt à envoyer, et nous revenons vers vous pour confirmer la date."
  };
  let lang = store.get('lina_lang', 'ar') === 'fr' ? 'fr' : 'ar';
  const t = k => (lang === 'fr' && FR[k] !== undefined) ? FR[k] : k;
  const norm = x => x.replace(/\s+/g, ' ').trim();

  const i18nText = [], i18nAttr = [], i18nHtml = [];
  (function collect(){
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      if (n.parentElement.closest('script,style,[data-i18n-html]')) continue;
      const k = norm(n.nodeValue);
      if (k && FR[k] !== undefined) i18nText.push({ n, k, orig: n.nodeValue });
    }
    document.querySelectorAll('[placeholder],[alt],[aria-label],[title]').forEach(e => {
      ['placeholder', 'alt', 'aria-label', 'title'].forEach(a => {
        const v = e.getAttribute(a);
        if (v && FR[norm(v)] !== undefined) i18nAttr.push({ e, a, k: norm(v), orig: v });
      });
    });
    document.querySelectorAll('[data-i18n-html]').forEach(e => i18nHtml.push({ e, key: e.dataset.i18nHtml, orig: e.innerHTML }));
  })();
  const origTitle = document.title;

  function applyLang(l){
    lang = l === 'fr' ? 'fr' : 'ar';
    const fr = lang === 'fr';
    document.documentElement.lang = lang;
    document.documentElement.dir = fr ? 'ltr' : 'rtl';
    document.title = fr ? FR[norm(origTitle)] : origTitle;
    i18nText.forEach(o => { o.n.nodeValue = fr ? o.orig.replace(o.k, FR[o.k]) : o.orig; });
    i18nAttr.forEach(o => o.e.setAttribute(o.a, fr ? FR[o.k] : o.orig));
    i18nHtml.forEach(o => { o.e.innerHTML = fr ? FR_HTML[o.key] : o.orig; });
    const lb = document.getElementById('langBtn');
    lb.textContent = fr ? 'العربية' : 'Français';
    lb.lang = fr ? 'ar' : 'fr';
    lb.setAttribute('aria-label', fr ? 'العربية' : 'Français');
    updateWA();
    authMsg.textContent = '';
    status.textContent = '';
    refreshAuthUI();
  }
  function setLang(l){
    store.set('lina_lang', l);
    const u = currentUser();
    if (u) { const users = store.get('lina_users', {}); users[u.email].lang = l; store.set('lina_users', users); cloudPush(u.email); }
    applyLang(l);
  }
  /* بعد الدخول أو إنشاء الحساب: نستعمل اللغة المحفوظة في حساب المستخدم */
  function afterAuth(){
    const u = currentUser();
    if (u) {
      const users = store.get('lina_users', {});
      if (users[u.email].lang) { store.set('lina_lang', users[u.email].lang); applyLang(users[u.email].lang); return; }
      users[u.email].lang = lang; store.set('lina_users', users);
    }
    applyLang(lang);
  }
  document.getElementById('langBtn').addEventListener('click', () => setLang(lang === 'fr' ? 'ar' : 'fr'));

  /* ===== حسابات على الإنترنت (Firebase) =====
     بدون إعدادات: الحسابات تبقى في متصفح الزائر فقط.
     مع الإعدادات: الحساب والحجوزات واللغة تُحفظ على الخادم، فيدخل الزبون من أي هاتف.
     الخطوات: console.firebase.google.com ← مشروع جديد ← Authentication (البريد وكلمة السر)
     ← Firestore Database ← Project settings ← Your apps ← Web، وانسخ القيم هنا.
     ملاحظة: يعمل فقط حين يُرفع الموقع على استضافة عادية (Firebase Hosting أو Netlify أو غيرهما). */
  const FIREBASE_CONFIG = { apiKey: "", authDomain: "", projectId: "", appId: "" };
  const CLOUD = !!(FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.projectId);
  let fbAuth = null, fbDb = null, signingUp = false;

  if (CLOUD) {
    document.getElementById('forgotBtn').hidden = false;
    document.getElementById('noteLocal').hidden = true;
    document.getElementById('noteCloud').hidden = false;
  }
  function loadScript(src){
    return new Promise((ok, ko) => {
      const el = document.createElement('script');
      el.src = src; el.onload = ok; el.onerror = () => ko(new Error('load ' + src));
      document.head.appendChild(el);
    });
  }
  function cloudErr(err){
    const c = (err && err.code) || '';
    if (c === 'auth/email-already-in-use') return t('هذا البريد مسجّل من قبل. جرّب تسجيل الدخول.');
    if (['auth/invalid-credential','auth/wrong-password','auth/user-not-found','auth/invalid-login-credentials'].includes(c)) return t('البريد أو كلمة السر غير صحيحة.');
    if (['auth/weak-password','auth/invalid-email','auth/missing-email'].includes(c)) return t('عمّر كل الخانات بشكل صحيح.');
    if (c === 'auth/too-many-requests') return t('محاولات كثيرة. انتظر قليلًا ثم أعد المحاولة.');
    if (!c || c === 'auth/network-request-failed') return t('تعذّر الاتصال بالخادم. تحقق من الإنترنت ثم أعد المحاولة.');
    return t('حدث خطأ. أعد المحاولة بعد قليل.');
  }
  function dropLocal(email){
    if (!email) return;
    const users = store.get('lina_users', {}); delete users[email]; store.set('lina_users', users);
    const all = store.get('lina_bookings', {}); delete all[email]; store.set('lina_bookings', all);
  }
  /* نسخة الخادم ← الذاكرة المحلية (التي تعتمد عليها بقية الصفحة) */
  async function pullCloud(fu){
    if (signingUp) return;
    const email = (fu.email || '').toLowerCase();
    let data = {};
    try { const snap = await fbDb.collection('users').doc(fu.uid).get(); if (snap.exists) data = snap.data() || {}; }
    catch (e) { console.warn('cloud read failed', e); }
    const users = store.get('lina_users', {});
    const old = users[email] || {};
    users[email] = { name: data.name || old.name || '', phone: data.phone || old.phone || '', lang: data.lang || old.lang || lang, uid: fu.uid };
    store.set('lina_users', users);
    const all = store.get('lina_bookings', {});
    all[email] = data.bookings || all[email] || [];
    store.set('lina_bookings', all);
    store.set('lina_session', email);
    if (data.lang && data.lang !== lang) { store.set('lina_lang', data.lang); applyLang(data.lang); }
  }
  /* الذاكرة المحلية ← الخادم، بعد كل تعديل */
  function cloudPush(email){
    if (!CLOUD || !fbAuth || !fbAuth.currentUser) return;
    const u = store.get('lina_users', {})[email]; if (!u) return;
    const all = store.get('lina_bookings', {});
    fbDb.collection('users').doc(fbAuth.currentUser.uid)
      .set({ name: u.name, phone: u.phone, lang: u.lang || lang, bookings: all[email] || [], updatedAt: Date.now() }, { merge: true })
      .catch(e => console.warn('cloud sync failed', e));
  }
  async function initCloud(){
    if (!CLOUD) return;
    try {
      if (!window.firebase) {
        const base = 'https://cdn.jsdelivr.net/npm/firebase@10.12.2/';
        await loadScript(base + 'firebase-app-compat.js');
        await Promise.all([loadScript(base + 'firebase-auth-compat.js'), loadScript(base + 'firebase-firestore-compat.js')]);
      }
      if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
      fbAuth = firebase.auth(); fbDb = firebase.firestore();
      fbAuth.onAuthStateChanged(async fu => {
        if (fu) await pullCloud(fu);
        else if (store.get('lina_session', null)) { dropLocal(store.get('lina_session', null)); store.del('lina_session'); }
        refreshAuthUI();
      });
    } catch (e) { console.warn('cloud unavailable', e); fbAuth = null; }
  }
  async function cloudSignup(email){
    if (!fbAuth) { say(t('تعذّر الاتصال بالخادم. تحقق من الإنترنت ثم أعد المحاولة.')); return; }
    const name = document.getElementById('suName').value.trim();
    const phone = document.getElementById('suPhone').value.trim();
    signingUp = true;
    try {
      const cred = await fbAuth.createUserWithEmailAndPassword(email, document.getElementById('suPass').value);
      const users = store.get('lina_users', {});
      users[email] = { name, phone, lang, uid: cred.user.uid }; store.set('lina_users', users);
      const all = store.get('lina_bookings', {}); all[email] = []; store.set('lina_bookings', all);
      store.set('lina_session', email);
      await fbDb.collection('users').doc(cred.user.uid).set({ name, phone, lang, bookings: [], createdAt: Date.now() });
      signupForm.reset(); afterAuth();
    } catch (err) { say(cloudErr(err)); }
    finally { signingUp = false; }
  }
  async function cloudLogin(email){
    if (!fbAuth) { say(t('تعذّر الاتصال بالخادم. تحقق من الإنترنت ثم أعد المحاولة.')); return; }
    try {
      const cred = await fbAuth.signInWithEmailAndPassword(email, document.getElementById('liPass').value);
      await pullCloud(cred.user);
      loginForm.reset(); afterAuth();
    } catch (err) { say(cloudErr(err)); }
  }
  function cloudLogout(){
    if (!CLOUD) return;
    const email = store.get('lina_session', null);
    if (fbAuth) fbAuth.signOut().catch(() => {});
    dropLocal(email);   // لا نترك بيانات الزبون في متصفح مشترك
  }

  const authDlg = document.getElementById('authDialog');
  const authMsg = document.getElementById('authMsg');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const tabLogin = document.getElementById('tabLogin');
  const tabSignup = document.getElementById('tabSignup');

  function say(text, ok){ authMsg.textContent = text || ''; authMsg.classList.toggle('ok', !!ok); }
  function showTab(which){
    const login = which === 'login';
    loginForm.hidden = !login; signupForm.hidden = login;
    tabLogin.setAttribute('aria-selected', login); tabSignup.setAttribute('aria-selected', !login);
    say('');
  }
  function currentUser(){
    const email = store.get('lina_session', null);
    const users = store.get('lina_users', {});
    return email && users[email] ? Object.assign({ email }, users[email]) : null;
  }
  function refreshAuthUI(){
    const u = currentUser();
    document.querySelectorAll('.login').forEach(a => {
      a.textContent = u ? t('مرحبًا') + ' ' + u.name.split(' ')[0] : t('تسجيل الدخول');
    });
    document.getElementById('viewAuth').hidden = !!u;
    document.getElementById('viewAccount').hidden = !u;
    if (u) {
      document.getElementById('acName').textContent = u.name;
      document.getElementById('acPhone').textContent = u.phone;
      document.getElementById('acEmail').textContent = u.email;
      const n = document.getElementById('name'), p = document.getElementById('phone');
      if (n && !n.value) n.value = u.name;
      if (p && !p.value) p.value = u.phone;
    }
    renderAccount();
  }

  /* ===== حسابي: البيانات والحجوزات ===== */
  function getBookings(email){ return (store.get('lina_bookings', {})[email]) || []; }
  function addBooking(email, b){
    const all = store.get('lina_bookings', {});
    all[email] = [b].concat(all[email] || []);
    store.set('lina_bookings', all);
    cloudPush(email);
  }
  function removeBooking(email, id){
    const all = store.get('lina_bookings', {});
    all[email] = (all[email] || []).filter(x => x.id !== id);
    store.set('lina_bookings', all);
    cloudPush(email);
  }
  function el(tag, cls, text){
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }
  function renderAccount(){
    const u = currentUser();
    document.getElementById('accOut').hidden = !!u;
    document.getElementById('accIn').hidden = !u;
    if (!u) return;
    document.getElementById('pfName').value = u.name;
    document.getElementById('pfPhone').value = u.phone;
    document.getElementById('pfEmail').value = u.email;
    const list = document.getElementById('bkList');
    list.textContent = '';
    const items = getBookings(u.email);
    document.getElementById('bkEmpty').hidden = items.length > 0;
    items.forEach(b => {
      const li = el('li', 'bk');
      const fr = lang === 'fr';
      li.appendChild(el('strong', '', t(b.type) + (fr ? ', ' : '، ') + b.date));
      li.appendChild(el('span', 'meta', fr ? t(b.time) + ', environ ' + b.guests + ' personnes' : b.time + '، حوالي ' + b.guests + ' شخص'));
      li.appendChild(el('span', 'badge', t('أُرسل عبر واتساب، بانتظار التأكيد')));
      const del = el('button', 'del', t('حذف'));
      del.type = 'button';
      let timer;
      del.addEventListener('click', () => {
        if (del.classList.contains('sure')) { removeBooking(u.email, b.id); renderAccount(); return; }
        del.classList.add('sure'); del.textContent = t('تأكيد الحذف');
        timer = setTimeout(() => { del.classList.remove('sure'); del.textContent = t('حذف'); }, 3000);
      });
      li.appendChild(del);
      list.appendChild(li);
    });
  }

  document.getElementById('profileForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, msg = document.getElementById('pfMsg');
    if (!f.checkValidity()) { f.reportValidity(); msg.textContent = t('عمّر الاسم والهاتف.'); return; }
    const u = currentUser(); if (!u) return;
    const users = store.get('lina_users', {});
    users[u.email].name = document.getElementById('pfName').value.trim();
    users[u.email].phone = document.getElementById('pfPhone').value.trim();
    store.set('lina_users', users);
    cloudPush(u.email);
    refreshAuthUI();
    document.getElementById('pfMsg').textContent = t('تم حفظ التعديلات.');
  });

  document.querySelectorAll('[data-auth]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    nav.classList.remove('open'); btn.setAttribute('aria-expanded', false);
    refreshAuthUI(); showTab('login');
    authDlg.showModal();
  }));
  document.getElementById('authClose').addEventListener('click', () => authDlg.close());
  authDlg.addEventListener('click', e => { if (e.target === authDlg) authDlg.close(); });
  ['acBook','acGo'].forEach(id => document.getElementById(id).addEventListener('click', () => authDlg.close()));
  tabLogin.addEventListener('click', () => showTab('login'));
  tabSignup.addEventListener('click', () => showTab('signup'));

  signupForm.addEventListener('submit', async e => {
    e.preventDefault();
    if (!signupForm.checkValidity()) { signupForm.reportValidity(); say(t('عمّر كل الخانات بشكل صحيح.')); return; }
    const email = document.getElementById('suEmail').value.trim().toLowerCase();
    if (CLOUD) { await cloudSignup(email); return; }
    const users = store.get('lina_users', {});
    if (users[email]) { say(t('هذا البريد مسجّل من قبل. جرّب تسجيل الدخول.')); return; }
    users[email] = {
      name: document.getElementById('suName').value.trim(),
      phone: document.getElementById('suPhone').value.trim(),
      hash: await hashPass(document.getElementById('suPass').value),
      lang: lang
    };
    store.set('lina_users', users);
    store.set('lina_session', email);
    signupForm.reset(); afterAuth();
  });

  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('liEmail').value.trim().toLowerCase();
    if (CLOUD) { await cloudLogin(email); return; }
    const users = store.get('lina_users', {});
    const h = await hashPass(document.getElementById('liPass').value);
    if (!users[email] || users[email].hash !== h) { say(t('البريد أو كلمة السر غير صحيحة.')); return; }
    store.set('lina_session', email);
    loginForm.reset(); afterAuth();
  });

  document.getElementById('forgotBtn').addEventListener('click', async () => {
    const email = document.getElementById('liEmail').value.trim().toLowerCase();
    if (!email) { say(t('اكتب بريدك الإلكتروني أولًا.')); return; }
    if (!fbAuth) { say(t('تعذّر الاتصال بالخادم. تحقق من الإنترنت ثم أعد المحاولة.')); return; }
    try { await fbAuth.sendPasswordResetEmail(email); say(t('أرسلنا لك رابط إعادة تعيين كلمة السر على بريدك.'), true); }
    catch (err) { say(cloudErr(err)); }
  });

  document.getElementById('logoutBtn').addEventListener('click', () => {
    cloudLogout();
    store.del('lina_session'); refreshAuthUI(); showTab('login'); say(t('تم تسجيل الخروج.'), true);
  });
  /* ===== الحجز عبر واتساب =====
     بدّل الرقم بالرقم الحقيقي للقاعة، بصيغة دولية بدون + ولا 00
     مثال: 0555123456 يصبح 213555123456 */
  const WA_NUMBER = "213555166137";

  function updateWA(){
    const hello = lang === 'fr'
      ? "Bonjour, je souhaite me renseigner sur la salle Lina."
      : "السلام عليكم، حبيت نستفسر على قاعة لينا.";
    const url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(hello);
    document.getElementById('waFloat').href = url;
    document.getElementById('waFooter').href = url;
  }

  /* ===== الدفع عبر بريدي موب =====
     املأ بيانات حساب القاعة هنا (اترك الخانة فارغة لتختفي من النافذة):
       name   اسم صاحب الحساب البريدي
       ccp    رقم الحساب البريدي مع المفتاح (مثال: 0012345678 25)
       rip    رقم RIP (20 رقمًا)
       deposit مبلغ العربون الافتراضي بالدينار (اختياري) */
  const PAY = { name: "", ccp: "", rip: "", deposit: "" };

  const payDlg = document.getElementById('payDialog');
  const payAmount = document.getElementById('payAmount');
  function fillPay(){
    ['name','ccp','rip'].forEach(k => {
      const v = (PAY[k] || '').trim();
      document.getElementById('pay' + k[0].toUpperCase() + k.slice(1)).textContent = v;
      payDlg.querySelectorAll('[data-row="' + k + '"]').forEach(e => e.hidden = !v);
    });
    if (!payAmount.value && PAY.deposit) payAmount.value = PAY.deposit;
  }
  document.getElementById('payOpen').addEventListener('click', () => { fillPay(); payDlg.showModal(); });
  document.getElementById('payClose').addEventListener('click', () => payDlg.close());
  payDlg.addEventListener('click', e => { if (e.target === payDlg) payDlg.close(); });

  payDlg.querySelectorAll('.copy').forEach(btn => btn.addEventListener('click', async () => {
    const text = document.getElementById(btn.dataset.copy).textContent.trim();
    try { await navigator.clipboard.writeText(text); }
    catch (_) {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta);
      ta.select(); try { document.execCommand('copy'); } catch (__) {} ta.remove();
    }
    btn.textContent = t('تم النسخ');
    setTimeout(() => { btn.textContent = t('نسخ'); }, 1600);
  }));

  document.getElementById('paySend').addEventListener('click', () => {
    const u = currentUser();
    const name = document.getElementById('name').value.trim() || (u && u.name) || '';
    const phone = document.getElementById('phone').value.trim() || (u && u.phone) || '';
    const date = document.getElementById('date').value;
    const amount = payAmount.value.trim();
    const fr = lang === 'fr';
    const lines = fr ? [
      "Bonjour, j’ai payé l’acompte de réservation via BaridiMob :",
      name && "Nom : " + name, phone && "Téléphone : " + phone, date && "Date de l’événement : " + date,
      amount && "Montant : " + amount + " DA", "Je vous envoie le reçu du virement."
    ] : [
      "السلام عليكم، دفعت عربون الحجز عبر بريدي موب:",
      name && "الاسم: " + name, phone && "الهاتف: " + phone, date && "تاريخ المناسبة: " + date,
      amount && "المبلغ: " + amount + " دج", "وصل التحويل مرفق."
    ];
    const url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(lines.filter(Boolean).join("\n"));
    window.open(url, "_blank", "noopener");
  });

  const form = document.getElementById('bookingForm');
  const status = document.getElementById('status');
  const dateInput = document.getElementById('date');
  dateInput.min = new Date().toISOString().split('T')[0];

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = t("عمّر الخانات المطلوبة من فضلك.");
      return;
    }
    const d = Object.fromEntries(new FormData(form));
    const msg = (lang === 'fr' ? [
      "Bonjour, je souhaite réserver la salle Lina :",
      "Nom : " + d.name,
      "Téléphone : " + d.phone,
      "Événement : " + t(d.type),
      "Date : " + d.date,
      "Période : " + t(d.time),
      "Nombre d’invités : " + d.guests,
      d.notes ? "Remarques : " + d.notes : ""
    ] : [
      "السلام عليكم، حبيت نحجز في قاعة لينا:",
      "الاسم: " + d.name,
      "الهاتف: " + d.phone,
      "المناسبة: " + d.type,
      "التاريخ: " + d.date,
      "الفترة: " + d.time,
      "عدد المدعوين: " + d.guests,
      d.notes ? "ملاحظات: " + d.notes : ""
    ]).join("\n").trim();

    window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    const user = currentUser();
    if (user) {
      addBooking(user.email, {
        id: Date.now().toString(36), name: d.name, phone: d.phone, type: d.type,
        date: d.date, time: d.time, guests: d.guests, notes: d.notes || '', createdAt: Date.now()
      });
      renderAccount();
      status.textContent = t("تم فتح واتساب وسجّلنا الطلب في حسابي. اضغط إرسال باش توصلنا الرسالة.");
    } else {
      status.textContent = t("تم فتح واتساب. اضغط إرسال باش توصلنا الرسالة. سجّل الدخول باش تتابع طلباتك في حسابي.");
    }
  });

  applyLang(lang);
  initCloud();
