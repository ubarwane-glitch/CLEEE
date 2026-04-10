/* =========================================================
   CLELIM SERRURERIE — script.js
   Fully static, no modules, no build tools required.
   ========================================================= */

// ---------- Translations ----------
const translations = {
  fr: {
    // Nav
    nav_emergency: "Urgence",
    nav_services: "Services",
    nav_pricing: "Tarifs",
    nav_areas: "Zones",
    nav_faq: "FAQ",

    // Hero
    hero_badge: "DISPONIBLE 24H/24 · 7J/7",
    hero_title: "Dépannage<br/>Serrurerie",
    hero_subtitle: "24h/24 — 7j/7",
    hero_desc: "Intervention rapide dans <span>toute l'île-de-france</span><br/>pour toutes vos urgences de serrurerie.",
    hero_cta_quote: "Devis Gratuit",
    hero_card_title: "Interventions Récentes",
    hero_card_loc1: "Paris 16e - Ouverture",
    hero_card_loc2: "Boulogne - Serrure",
    hero_card_time1: "Terminé il y a 14 min",
    hero_card_time2: "Terminé il y a 45 min",
    hero_rating_label: "Note Google",

    // Areas
    areas_heading: "Zones d'intervention",

    // Emergency banner
    banner_title: "DÉPANNAGE 24H/7J",
    banner_desc: "DÉPLACEMENT DANS TOUTE L'ÎLE-DE-FRANCE · DEVIS GRATUIT · INTERVENTION RAPIDE",

    // Services
    services_badge: "Prix",
    services_title: "Nos <span class=\"text-gold\">tarifs fixes</span> et transparents",
    services_desc: "Pour vous offrir une tranquillité d'esprit dès le premier contact, nos tarifs sont clairs, sans surprise et adaptés à vos besoins.",
    btn_book_intervention: "Réserver votre intervention",
    btn_call_us: "Appelez-nous",

    // Process
    process_title: "Processus Rapide & Sécurisé",
    process_desc: "Des étapes transparentes de votre appel SOS à un domicile sécurisé.",
    btn_call_process: "Appeler un expert",
    step1_title: "Appel d'urgence",
    step1_desc: "Appelez notre hotline 24h/24. Décrivez votre situation et votre position.",
    step2_title: "Diagnostic Rapide",
    step2_desc: "Recevez instantanément une estimation claire basée sur votre type de serrure.",
    step3_title: "Intervention",
    step3_desc: "Un technicien certifié arrive dans un délai de 30 à 45 minutes.",
    step4_title: "Problème Résolu",
    step4_desc: "Votre porte est ouverte, la serrure remplacée et la facture fournie.",

    // About
    about_kicker: "À PROPOS",
    about_title: "L'expertise au service de votre sécurité",
    about_desc: "Intervention rapide, transparence tarifaire et savoir-faire terrain pour toutes vos urgences de serrurerie en Île-de-France.",
    about_stat1_label: "Temps moyen d'intervention",
    about_stat2_label: "Années d'expérience",
    about_stat3_label: "Clients satisfaits",

    // Services cards
    svc1_title: "OUVERTURE PORTE<br/>VÉROUILLÉE",
    svc1_item1: "Ouverture de porte fermée à clé",
    svc1_item2: "Disponibilité 24h/24",
    svc2_title: "OUVERTURE DE PORTE<br/>CLAQUÉE",
    svc2_item1: "Intervention sans destruction",
    svc2_item2: "Urgence absolue : 30min max",
    svc3_title: "REMPLACEMENT<br/>CYLINDRE RENFORCÉ",
    svc3_item1: "Cylindres haute sécurité, anti-perçage et anti-crochetage",
    svc3_item2: "Transparence de prix",
    svc_ttc: "HT",
    svc_from: "DÈS",

    // Reviews
    reviews_title: "Ce que disent nos clients",
    reviews_stats: "4.8/5 basé sur 150+ avis",
    review1_name: "Sara Amrani",
    review1_meta: "Paris 15e • Il y a 2 jours",
    review1_text: "\"Porte claquée à 2h du matin, intervention très rapide et sans dégâts. Service sérieux, technicien rassurant et prix respecté.\"",
    review2_name: "Yassine Nait",
    review2_meta: "Saint-Denis • Il y a 1 semaine",
    review2_text: "\"Très bon serrurier, arrivé vite et tarif annoncé respecté. Travail propre et explications claires du début à la fin.\"",
    review3_name: "Fatou Diop",
    review3_meta: "Boulogne • Il y a 3 semaines",
    review3_text: "\"Service rapide et professionnel après une serrure bloquée. Intervention efficace, artisan poli et très rassurant.\"",
    review4_name: "Mariam Bamba",
    review4_meta: "Créteil • Il y a 5 jours",
    review4_text: "\"J'ai appelé en urgence en soirée, le technicien est arrivé rapidement. Travail propre, devis clair et très bon contact.\"",

    // Quote section
    quote_kicker: "DEVIS RAPIDE",
    quote_main_title: "OBTENEZ UNE ESTIMATION RAPIDE",
    quote_side_title: "Contactez-nous sur WhatsApp",
    quote_side_text: "Discutez directement avec notre équipe pour une réservation rapide ou une urgence. Envoyez votre demande et recevez une réponse rapidement.",
    quote_side_btn: "ENVOYEZ-NOUS UN MESSAGE",

    // Form labels & placeholders
    form_name: "Nom complet",
    form_placeholder_name: "Votre nom complet",
    form_phone: "Numéro de téléphone",
    form_email: "Email",
    form_category_label: "Catégorie",
    form_category_placeholder: "Sélectionnez votre besoin",
    cat1: "Dépannage & ouverture",
    cat2: "Serrures & cylindres",
    cat3: "Sécurisation & effraction",
    cat4: "Portes & blindage",
    cat5: "Équipements & accessoires",
    cat6: "Réglages & maintenance",
    form_service: "Service souhaité",
    form_service_placeholder: "Choisissez une intervention",
    form_message_label: "Décrivez votre demande",
    form_message_placeholder: "Expliquez rapidement votre besoin...",
    btn_submit: "OBTENIR MON DEVIS GRATUIT",
    form_phone_note: "ou 06 77 23 58 39",

    // Form feedback
    form_success: "Votre demande a bien été envoyée ! Nous vous répondons très rapidement.",
    form_error: "Une erreur est survenue. Veuillez réessayer ou nous appeler directement.",

    // FAQ
    faq_title: "Questions Fréquentes",
    faq1_q: "Quel est le délai d'intervention ?",
    faq1_a: "En moyenne, nos techniciens interviennent dans un délai de 30 à 45 minutes sur toute l'Île-de-France, selon les conditions de circulation.",
    faq2_q: "Vos prix sont-ils fixes ?",
    faq2_a: "Oui, nous appliquons une grille tarifaire transparente. Aucun frais caché.",
    faq3_q: "Risquez-vous d'abîmer ma porte ?",
    faq3_a: "Dans 95 % des cas, nous utilisons des techniques non destructives.",
    faq4_q: "Mon assurance couvre-t-elle le coût ?",
    faq4_a: "Oui, la plupart des assurances habitation couvrent ces interventions.",
    faq_side_title: "Vos questions,<br/>nos réponses",
    faq_side_text: "Parce que la confiance passe aussi par la transparence, retrouvez ici les réponses aux questions les plus fréquentes avant toute intervention.",

    // Footer
    footer_copy: "© 2026 Clelim Serrurerie. Tous droits réservés."
  },

  en: {
    // Nav
    nav_emergency: "Emergency",
    nav_services: "Services",
    nav_pricing: "Pricing",
    nav_areas: "Areas",
    nav_faq: "FAQ",

    // Hero
    hero_badge: "AVAILABLE 24/7",
    hero_title: "Express<br/>Locksmith",
    hero_subtitle: "24h/24 — 7j/7",
    hero_desc: "Fast intervention throughout <span>Île-de-France</span><br/>for all your locksmith emergencies.",
    hero_cta_quote: "Free Quote",
    hero_card_title: "Recent Interventions",
    hero_card_loc1: "Paris 16th - Opening",
    hero_card_loc2: "Boulogne - Lock",
    hero_card_time1: "Completed 14 min ago",
    hero_card_time2: "Completed 45 min ago",
    hero_rating_label: "Google Rating",

    // Areas
    areas_heading: "Service Areas",

    // Emergency banner
    banner_title: "24/7 EMERGENCY SERVICE",
    banner_desc: "TRAVEL THROUGHOUT ÎLE-DE-FRANCE • FREE QUOTE • FAST INTERVENTION",

    // Services
    services_badge: "Pricing",
    services_title: "Our <span class=\"text-gold\">fixed and transparent</span> rates",
    services_desc: "To offer you peace of mind from the first contact, our rates are clear, no surprises and adapted to your needs.",
    btn_book_intervention: "Book your intervention",
    btn_call_us: "Call us",

    // Process
    process_title: "Fast & Secure Process",
    process_desc: "Transparent steps from your SOS call to a secured home.",
    btn_call_process: "Call an expert",
    step1_title: "Emergency Call",
    step1_desc: "Call our 24/7 hotline. Describe your situation and location.",
    step2_title: "Rapid Diagnosis",
    step2_desc: "Instantly receive a clear estimate based on your lock type.",
    step3_title: "Intervention",
    step3_desc: "A certified technician arrives within 30 to 45 minutes.",
    step4_title: "Problem Solved",
    step4_desc: "Your door is open, lock replaced and invoice provided.",

    // About
    about_kicker: "ABOUT US",
    about_title: "Expert locksmith service for your security",
    about_desc: "Fast response, transparent pricing and hands-on expertise for all your locksmith emergencies in Île-de-France.",
    about_stat1_label: "Average response time",
    about_stat2_label: "Years of experience",
    about_stat3_label: "Satisfied clients",

    // Services cards
    svc1_title: "LOCKED DOOR<br/>OPENING",
    svc1_item1: "Opening of a locked door",
    svc1_item2: "24/7 availability",
    svc2_title: "SLAMMED DOOR<br/>OPENING",
    svc2_item1: "Non-destructive intervention",
    svc2_item2: "Absolute emergency: 30min max",
    svc3_title: "REINFORCED<br/>CYLINDER REPLACEMENT",
    svc3_item1: "High-security cylinders, anti-drill and anti-pick",
    svc3_item2: "Transparent pricing",
    svc_ttc: "Excl. VAT",
    svc_from: "FROM",

    // Reviews
    reviews_title: "What our clients say",
    reviews_stats: "4.8/5 based on 150+ reviews",
    review1_name: "Sara Amrani",
    review1_meta: "Paris 15th • 2 days ago",
    review1_text: "\"Locked out at 2am, very fast response and no damage. Reliable service, reassuring technician and price honoured.\"",
    review2_name: "Yassine Nait",
    review2_meta: "Saint-Denis • 1 week ago",
    review2_text: "\"Excellent locksmith, arrived quickly and the quoted price was respected. Clean work and clear explanations throughout.\"",
    review3_name: "Fatou Diop",
    review3_meta: "Boulogne • 3 weeks ago",
    review3_text: "\"Fast and professional service after a blocked lock. Efficient intervention, polite and very reassuring craftsman.\"",
    review4_name: "Mariam Bamba",
    review4_meta: "Créteil • 5 days ago",
    review4_text: "\"I called in an evening emergency, the technician arrived quickly. Clean work, clear quote and very good contact.\"",

    // Quote section
    quote_kicker: "QUICK QUOTE",
    quote_main_title: "GET A FAST ESTIMATE",
    quote_side_title: "Contact us on WhatsApp",
    quote_side_text: "Chat directly with our team for a quick booking or emergency. Send your request and get a fast reply.",
    quote_side_btn: "SEND US A MESSAGE",

    // Form labels & placeholders
    form_name: "Full Name",
    form_placeholder_name: "Your full name",
    form_phone: "Phone Number",
    form_email: "Email",
    form_category_label: "Category",
    form_category_placeholder: "Select your need",
    cat1: "Emergency & opening",
    cat2: "Locks & cylinders",
    cat3: "Security & break-in",
    cat4: "Doors & armoring",
    cat5: "Equipment & accessories",
    cat6: "Adjustments & maintenance",
    form_service: "Desired Service",
    form_service_placeholder: "Choose an intervention",
    form_message_label: "Describe your request",
    form_message_placeholder: "Briefly explain your need...",
    btn_submit: "GET MY FREE QUOTE",
    form_phone_note: "or 06 77 23 58 39",

    // Form feedback
    form_success: "Your request has been sent! We will get back to you very quickly.",
    form_error: "An error occurred. Please try again or call us directly.",

    // FAQ
    faq_title: "Frequently Asked Questions",
    faq1_q: "How long until a locksmith arrives?",
    faq1_a: "On average, our technicians arrive within 30 to 45 minutes anywhere in Île-de-France, depending on traffic conditions.",
    faq2_q: "Are your prices fixed?",
    faq2_a: "Yes, we follow a transparent pricing grid. The price announced on the phone is the price you pay. No hidden fees.",
    faq3_q: "Will you damage my door?",
    faq3_a: "In 95% of cases, we use non-destructive opening techniques. We only drill locks as a last resort.",
    faq4_q: "Does my insurance cover the cost?",
    faq4_a: "Most home insurance policies cover emergency locksmith interventions. We provide detailed invoices for all French insurers.",
    faq_side_title: "Your questions,<br/>our answers",
    faq_side_text: "Because trust also comes through transparency, find here the answers to the most frequently asked questions before any intervention.",

    // Footer
    footer_copy: "© 2026 Clelim Serrurerie. All Rights Reserved."
  },

  zh: {
    // Nav
    nav_emergency: "紧急情况",
    nav_services: "服务",
    nav_pricing: "价格",
    nav_areas: "区域",
    nav_faq: "常见问题",

    // Hero
    hero_badge: "24小时 · 每周7天营业",
    hero_title: "快速<br/>锁匠服务",
    hero_subtitle: "24小时 — 每周7天",
    hero_desc: "在整个<span>法兰西岛地区</span><br/>为您的所有锁具紧急情况提供快速干预。",
    hero_cta_quote: "免费报价",
    hero_card_title: "最近的干预",
    hero_card_loc1: "巴黎16区 - 开锁",
    hero_card_loc2: "布洛涅 - 锁具",
    hero_card_time1: "14分钟前完成",
    hero_card_time2: "45分钟前完成",
    hero_rating_label: "谷歌评分",

    // Areas
    areas_heading: "服务区域",

    // Emergency banner
    banner_title: "24小时紧急服务",
    banner_desc: "法兰西岛全境服务 • 免费报价 • 快速干预",

    // Services
    services_badge: "价格",
    services_title: "我们的 <span class=\"text-gold\">固定透明</span> 价格",
    services_desc: "为了让您从第一次接触就安心，我们的价格清晰、无惊喜，并根据您的需求进行调整。",
    btn_book_intervention: "预订您的干预服务",
    btn_call_us: "致电我们",

    // Process
    process_title: "快速安全流程",
    process_desc: "从您的求救电话到安全的家，步骤透明。",
    btn_call_process: "致电专家",
    step1_title: "紧急电话",
    step1_desc: "拨打我们的24/7热线。描述您的情况和位置。",
    step2_title: "快速诊断",
    step2_desc: "根据您的锁具类型立即获得清晰的估价。",
    step3_title: "干预",
    step3_desc: "认证技术人员在15至30分钟内到达。",
    step4_title: "问题解决",
    step4_desc: "您的门已打开，锁已更换，并提供发票。",

    // About
    about_kicker: "关于我们",
    about_title: "专业技术，守护您的安全",
    about_desc: "快速响应、透明报价和丰富的现场经验，为您处理法兰西岛地区所有锁具紧急情况。",
    about_stat1_label: "平均响应时间",
    about_stat2_label: "年从业经验",
    about_stat3_label: "客户满意度",

    // Services cards
    svc1_title: "上锁门<br/>开锁",
    svc1_item1: "打开已上锁的门",
    svc1_item2: "24小时全天候服务",
    svc2_title: "门夹住<br/>紧急开锁",
    svc2_item1: "无损干预",
    svc2_item2: "绝对紧急：最多30分钟",
    svc3_title: "加固型<br/>锁芯更换",
    svc3_item1: "高安全等级锁芯，防钻、防撬",
    svc3_item2: "价格透明",
    svc_ttc: "不含税",
    svc_from: "起价",

    // Reviews
    reviews_title: "客户评价",
    reviews_stats: "基于150+条评论，评分4.8/5",
    review1_name: "Sara Amrani",
    review1_meta: "巴黎15区 • 2天前",
    review1_text: "\"凌晨2点门被夹住，响应非常快且没有损坏。服务认真，技术人员让人放心，价格如实执行。\"",
    review2_name: "Yassine Nait",
    review2_meta: "圣但尼 • 1周前",
    review2_text: "\"很好的锁匠，到得很快，报价与实际一致。工作干净，全程解释清楚。\"",
    review3_name: "Fatou Diop",
    review3_meta: "布洛涅 • 3周前",
    review3_text: "\"锁卡住后快速专业的服务。干预高效，师傅礼貌又让人放心。\"",
    review4_name: "Mariam Bamba",
    review4_meta: "克雷泰伊 • 5天前",
    review4_text: "\"傍晚紧急呼叫，技术人员很快到达。工作干净，报价清晰，联络非常好。\"",

    // Quote section
    quote_kicker: "快速报价",
    quote_main_title: "获取快速估价",
    quote_side_title: "通过WhatsApp联系我们",
    quote_side_text: "直接与我们的团队沟通，快速预约或处理紧急情况。发送您的请求，快速获得回复。",
    quote_side_btn: "发送消息给我们",

    // Form labels & placeholders
    form_name: "姓名",
    form_placeholder_name: "您的姓名",
    form_phone: "电话号码",
    form_email: "电子邮件",
    form_category_label: "类别",
    form_category_placeholder: "选择您的需求",
    cat1: "紧急开锁",
    cat2: "锁具与锁芯",
    cat3: "安全加固与防盗",
    cat4: "门与防盗加固",
    cat5: "设备与配件",
    cat6: "调整与维护",
    form_service: "所需服务",
    form_service_placeholder: "选择干预类型",
    form_message_label: "描述您的需求",
    form_message_placeholder: "简要说明您的需求...",
    btn_submit: "获取免费报价",
    form_phone_note: "或 06 77 23 58 39",

    // Form feedback
    form_success: "您的请求已成功发送！我们将尽快回复您。",
    form_error: "发生错误，请重试或直接致电我们。",

    // FAQ
    faq_title: "常见问题",
    faq1_q: "锁匠多久能到？",
    faq1_a: "平均而言，我们的技术人员在法兰西岛任何地方30至45分钟内到达，具体取决于交通状况。",
    faq2_q: "价格是固定的吗？",
    faq2_a: "是的，我们执行透明的定价表。电话中告知您的价格就是发票上的价格，无隐藏费用。",
    faq3_q: "会损坏我的门吗？",
    faq3_a: "在95%的情况下，我们使用无损开门技术。只有在万不得已并经您同意的情况下才会钻锁。",
    faq4_q: "我的保险能报销吗？",
    faq4_a: "大多数家庭保险保单涵盖紧急锁匠干预。我们提供与所有法国保险公司兼容的详细发票。",
    faq_side_title: "您的问题，<br/>我们的解答",
    faq_side_text: "因为信任也来自透明，在这里您可以找到干预前最常见问题的解答。",

    // Footer
    footer_copy: "© 2026 Clelim Serrurerie. 版权所有。"
  }
};

// ---------- Service options multilingues ----------
var serviceOptionsAll = {
  fr: {
    "depannage-ouverture": ["Ouverture de porte claquée","Ouverture de porte verrouillée","Ouverture de porte blindée verrouillée","Ouverture boîte aux lettres","Autre"],
    "serrures-cylindres": ["Remplacement de cylindre standard","Remplacement de cylindre renforcé","Remplacement serrure multipoints","Installation serrure sécurisée A2P","Dépose de l'ancien cylindre","Autre"],
    "securisation-effraction": ["Réparation après effraction","Pose de verrou de sécurité","Pose de verrou de centralisation","Autre"],
    "portes-blindage": ["Installation porte blindée","Installation serrure blindée 3 points","Installation poignée renforcée","Autre"],
    "equipements-accessoires": ["Pose de judas / œilleton","Pose boîte à clé extérieure","Autre"],
    "reglage-maintenance": ["Réglage porte / serrure","Test de fonctionnement et ajustement final","Diagnostic du site","Autre"]
  },
  en: {
    "depannage-ouverture": ["Slammed door opening","Locked door opening","Armored locked door opening","Mailbox opening","Other"],
    "serrures-cylindres": ["Standard cylinder replacement","Reinforced cylinder replacement","Multipoint lock replacement","A2P certified lock installation","Old cylinder removal","Other"],
    "securisation-effraction": ["Post-break-in repair","Security bolt installation","Central locking bolt installation","Other"],
    "portes-blindage": ["Armored door installation","3-point armored lock installation","Reinforced handle installation","Other"],
    "equipements-accessoires": ["Door viewer / peephole installation","External key safe installation","Other"],
    "reglage-maintenance": ["Door / lock adjustment","Function test and final adjustment","Site diagnosis","Other"]
  },
  zh: {
    "depannage-ouverture": ["夹门开锁","上锁门开锁","防盗上锁门开锁","信箱开锁","其他"],
    "serrures-cylindres": ["标准锁芯更换","加强型锁芯更换","多点锁更换","A2P认证锁安装","旧锁芯拆除","其他"],
    "securisation-effraction": ["入室盗窃后修复","安全插销安装","集中锁插销安装","其他"],
    "portes-blindage": ["防盗门安装","3点防盗锁安装","加固把手安装","其他"],
    "equipements-accessoires": ["门孔 / 猫眼安装","外置钥匙盒安装","其他"],
    "reglage-maintenance": ["门 / 锁调整","功能测试和最终调整","现场诊断","其他"]
  }
};

var FORMSPREE_ENDPOINT = window.siteConfig?.forms?.formspreeEndpoint || 'https://formspree.io/f/VOTRE_ID_ICI';

// ---------- Init on DOM Ready ----------
document.addEventListener('DOMContentLoaded', function () {

  // -------------------------------------------------------
  // 1. HEADER SCROLL EFFECT
  // -------------------------------------------------------
  var header = document.getElementById('main-header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header && header.classList.add('scrolled');
    } else {
      header && header.classList.remove('scrolled');
    }
  });

  // -------------------------------------------------------
  // 2. SMOOTH SCROLL
  // -------------------------------------------------------
  function smoothScrollTo(targetY, duration) {
    var startY = window.scrollY;
    var distance = targetY - startY;
    var startTime = null;

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      var timeElapsed = currentTime - startTime;
      var progress = Math.min(timeElapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutQuad(progress));
      if (progress < 1) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href').substring(1);
      var targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        var hdr = document.getElementById('main-header');
        var offset = hdr ? hdr.offsetHeight + 20 : 80;
        smoothScrollTo(targetEl.getBoundingClientRect().top + window.pageYOffset - offset, 1000);
      }
    });
  });

  // -------------------------------------------------------
  // 3. LANGUAGE SWITCHER
  // -------------------------------------------------------
  var langBtns      = document.querySelectorAll('.lang-btn');
  var currentLangEl = document.getElementById('current-lang');
  var langDropdown  = document.querySelector('.lang-dropdown');
  var langToggle    = document.querySelector('.lang-toggle');

  function setLanguage(lang) {
    var t = translations[lang];
    if (!t) return;

    document.documentElement.setAttribute('lang', lang);

    // Translate innerHTML
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.setAttribute('placeholder', t[key]);
    });

    // Translate <option> elements
    document.querySelectorAll('option[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });

    if (currentLangEl) currentLangEl.textContent = lang.toUpperCase();

    // Reload service options if a category is already selected
    var catSel = document.getElementById('service-category');
    var svcSel = document.getElementById('service-detail');
    if (catSel && svcSel && catSel.value) {
      var opts = serviceOptionsAll[lang] || serviceOptionsAll['fr'];
      svcSel.innerHTML = '<option value="">' + (t.form_service_placeholder || 'Choisissez une intervention') + '</option>';
      if (opts[catSel.value]) {
        opts[catSel.value].forEach(function (s) {
          var o = document.createElement('option');
          o.value = s; o.textContent = s;
          svcSel.appendChild(o);
        });
        svcSel.disabled = false;
      }
    }

    try { localStorage.setItem('preferred-lang', lang); } catch (e) {}
  }

  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setLanguage(this.getAttribute('data-lang'));
      if (langDropdown) langDropdown.classList.remove('open');
    });
  });

  if (langToggle && langDropdown) {
    langToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      langDropdown.classList.toggle('open');
    });
    langDropdown.addEventListener('click', function (e) { e.stopPropagation(); });
    document.addEventListener('click', function () { langDropdown.classList.remove('open'); });
  }

  // Load saved language
  var savedLang = 'fr';
  try { savedLang = localStorage.getItem('preferred-lang') || 'fr'; } catch (e) {}
  setLanguage(savedLang);

  // -------------------------------------------------------
  // 4. REVIEW CAROUSEL
  // -------------------------------------------------------
  var reviewsViewport    = document.querySelector('.reviews-viewport');
  var reviewsContainer   = document.getElementById('reviews-container');
  var prevBtn            = document.getElementById('prev-review');
  var nextBtn            = document.getElementById('next-review');
  var currentIdx         = 0;
  var autoReviewInterval = null;
  var isCloned           = false;

  function getCarouselParams() {
    var isMobile = window.matchMedia('(max-width: 767px)').matches;
    var visible  = isMobile ? 1 : 3;
    var gapPx    = isMobile ? 0 : 32; // 2rem = 32px
    var vpWidth  = reviewsViewport ? reviewsViewport.offsetWidth : window.innerWidth;
    var cardW    = (vpWidth - gapPx * (visible - 1)) / visible;
    return { visible: visible, gapPx: gapPx, cardW: cardW };
  }

  function setSizeCards() {
    if (!reviewsContainer) return;
    var p = getCarouselParams();
    var cards = reviewsContainer.children;
    for (var i = 0; i < cards.length; i++) {
      cards[i].style.width    = p.cardW + 'px';
      cards[i].style.minWidth = p.cardW + 'px';
      cards[i].style.flexShrink = '0';
    }
  }

  function setupInfiniteLoop() {
    if (!reviewsContainer || isCloned) return;
    var items = Array.prototype.slice.call(reviewsContainer.children);
    var visible = getCarouselParams().visible;
    for (var i = 0; i < visible && i < items.length; i++) {
      reviewsContainer.appendChild(items[i].cloneNode(true));
    }
    isCloned = true;
  }

  function updateCarousel() {
    if (!reviewsContainer) return;
    var p      = getCarouselParams();
    var offset = currentIdx * (p.cardW + p.gapPx);
    reviewsContainer.style.transform = 'translateX(-' + offset + 'px)';
  }

  function goToNextReview() {
    if (!reviewsContainer) return;
    var total   = reviewsContainer.children.length;
    var visible = getCarouselParams().visible;
    currentIdx++;
    updateCarousel();
    if (currentIdx >= total - visible) {
      setTimeout(function () {
        reviewsContainer.style.transition = 'none';
        currentIdx = 0;
        updateCarousel();
        setTimeout(function () {
          reviewsContainer.style.transition = 'transform 0.40s ease';
        }, 30);
      }, 400);
    }
  }

  function goToPrevReview() {
    if (!reviewsContainer) return;
    var total     = reviewsContainer.children.length;
    var visible   = getCarouselParams().visible;
    var realTotal = total - visible;
    if (currentIdx > 0) {
      currentIdx--;
      updateCarousel();
    } else {
      reviewsContainer.style.transition = 'none';
      currentIdx = realTotal;
      updateCarousel();
      setTimeout(function () {
        reviewsContainer.style.transition = 'transform 0.40s ease';
        currentIdx = realTotal - 1;
        updateCarousel();
      }, 30);
    }
  }

  function startAutoReviews() {
    if (!reviewsContainer) return;
    clearInterval(autoReviewInterval);
    autoReviewInterval = setInterval(goToNextReview, 3500);
  }

  function stopAutoReviews() { clearInterval(autoReviewInterval); }

  setupInfiniteLoop();
  setSizeCards();
  updateCarousel();
  startAutoReviews();

  if (nextBtn) nextBtn.addEventListener('click', function () { stopAutoReviews(); goToNextReview(); startAutoReviews(); });
  if (prevBtn) prevBtn.addEventListener('click', function () { stopAutoReviews(); goToPrevReview(); startAutoReviews(); });
  if (reviewsContainer) {
    reviewsContainer.addEventListener('mouseenter', stopAutoReviews);
    reviewsContainer.addEventListener('mouseleave', startAutoReviews);
  }
  window.addEventListener('resize', function () {
    setSizeCards();
    updateCarousel();
  });

  // -------------------------------------------------------
  // 5. DYNAMIC SERVICE SELECT
  // -------------------------------------------------------
  var categorySelect = document.getElementById('service-category');
  var serviceSelect  = document.getElementById('service-detail');

  function getCurrentLang() {
    var lang = 'fr';
    try { lang = localStorage.getItem('preferred-lang') || 'fr'; } catch (e) {}
    return lang;
  }

  if (categorySelect && serviceSelect) {
    categorySelect.addEventListener('change', function () {
      var selectedCategory = this.value;
      var lang = getCurrentLang();
      var opts = serviceOptionsAll[lang] || serviceOptionsAll['fr'];
      var t = translations[lang] || translations['fr'];
      serviceSelect.innerHTML = '<option value="">' + (t.form_service_placeholder || 'Choisissez une intervention') + '</option>';
      if (!selectedCategory || !opts[selectedCategory]) {
        serviceSelect.disabled = true;
        return;
      }
      opts[selectedCategory].forEach(function (service) {
        var option = document.createElement('option');
        option.value = service; option.textContent = service;
        serviceSelect.appendChild(option);
      });
      serviceSelect.disabled = false;
    });
  }

  // -------------------------------------------------------
  // 6. FORM SUBMISSION
  // -------------------------------------------------------
  var form        = document.getElementById('quote-form');
  var formSuccess = document.getElementById('form-success');
  var formError   = document.getElementById('form-error');
  var honeypot    = document.getElementById('honeypot');

  if (form) {
    var isSubmitting = false;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      console.log('[FORM] Submit triggered');

      if (isSubmitting) {
        console.log('[FORM] Already submitting, ignoring duplicate');
        return;
      }

      if (honeypot && honeypot.value !== '') {
        console.log('[FORM] Honeypot triggered, ignoring');
        return;
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      isSubmitting = true;

      var submitBtn = form.querySelector('.form-submit-btn');
      var lang = getCurrentLang();
      var t = translations[lang] || translations['fr'];

      if (formSuccess) formSuccess.style.display = 'none';
      if (formError)   formError.style.display   = 'none';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
      }

      var clientData = {
        name:       (document.getElementById('quote-name') || {}).value ? document.getElementById('quote-name').value.trim() : '',
        phone:      (document.getElementById('quote-phone') || {}).value ? document.getElementById('quote-phone').value.trim() : '',
        email:      (document.getElementById('quote-email') || {}).value ? document.getElementById('quote-email').value.trim() : '',
        address:    (document.getElementById('quote-address') || {}).value ? document.getElementById('quote-address').value.trim() : '',
        postalCode: (document.getElementById('quote-postal') || {}).value ? document.getElementById('quote-postal').value.trim() : '',
        city:       (document.getElementById('quote-city') || {}).value ? document.getElementById('quote-city').value.trim() : '',
        category:   (document.getElementById('service-category') || {}).value || '',
        service:    (document.getElementById('service-detail') || {}).value || '',
        urgency:    (document.getElementById('quote-urgency') || {}).value || 'normal',
        message:    (document.getElementById('quote-message') || {}).value ? document.getElementById('quote-message').value.trim() : '',
      };

      console.log('[FORM] Payload built for:', clientData.name, '|', clientData.email);

      var apiEndpoint = '/.netlify/functions/send-quote';
      console.log('[FORM] Sending request to:', apiEndpoint, '| Host:', window.location.hostname);

      var resetBtn = function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = t.btn_submit || 'OBTENIR MON DEVIS GRATUIT';
        }
        isSubmitting = false;
      };

      var timeout = setTimeout(function () {
        console.error('[FORM] Timeout: no response after 20s');
        resetBtn();
        if (formError) formError.style.display = 'flex';
      }, 20000);

      fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ clientData: clientData })
      })
      .then(function (response) {
        clearTimeout(timeout);
        console.log('[FORM] Response status:', response.status, response.statusText);

        if (!response.ok) {
          console.error('[FORM] HTTP error:', response.status);
          resetBtn();
          if (formError) formError.style.display = 'flex';
          return;
        }

        return response.text().then(function (text) {
          console.log('[FORM] Response body:', text);
          var result;
          try {
            result = JSON.parse(text);
          } catch (parseErr) {
            console.error('[FORM] JSON parse error:', parseErr.message, '| Raw:', text);
            result = { success: true };
          }

          if (result && result.success === false) {
            console.error('[FORM] Server returned success:false —', result.error);
            resetBtn();
            if (formError) formError.style.display = 'flex';
          } else {
            console.log('[FORM] Success confirmed');
            form.reset();
            if (serviceSelect) serviceSelect.disabled = true;
            resetBtn();
            if (formSuccess) {
              formSuccess.style.display = 'flex';
              formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }
        });
      })
      .catch(function (error) {
        clearTimeout(timeout);
        console.error('[FORM] Fetch error:', error.name, '|', error.message);
        resetBtn();
        if (formError) formError.style.display = 'flex';
      });
    });
  }

  // -------------------------------------------------------
  // 7. HERO INTERVENTIONS ANIMATION
  // -------------------------------------------------------
  var heroRow1 = document.getElementById('hero-row-1');
  var heroRow2 = document.getElementById('hero-row-2');

  var heroItems = [
    { title: "Paris 16e - Ouverture",          time: "Terminé il y a 14 min" },
    { title: "Boulogne - Serrure",             time: "Terminé il y a 45 min" },
    { title: "Neuilly - Porte claquée",        time: "Terminé il y a 8 min"  },
    { title: "Créteil - Cylindre changé",      time: "Terminé il y a 21 min" },
    { title: "Saint-Denis - Mise en sécurité", time: "Terminé il y a 31 min" },
    { title: "Versailles - Porte blindée",     time: "Terminé il y a 12 min" },
    { title: "Issy - Serrure multipoints",     time: "Terminé il y a 27 min" }
  ];

  function setHeroRowContent(row, data) {
    if (!row) return;
    var titleEl = row.querySelector('.intervention-title');
    var timeEl  = row.querySelector('.intervention-time');
    if (titleEl) titleEl.textContent = data.title;
    if (timeEl)  timeEl.textContent  = data.time;
  }

  function animateHeroRow(row, newData) {
    if (!row) return;
    row.classList.remove('is-enter', 'is-exit', 'is-show');
    row.classList.add('is-done');
    setTimeout(function () { row.classList.add('is-exit'); }, 900);
    setTimeout(function () {
      row.classList.remove('is-done', 'is-exit');
      row.classList.add('is-enter');
      setHeroRowContent(row, newData);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          row.classList.remove('is-enter');
          row.classList.add('is-show');
        });
      });
    }, 1450);
  }

  if (heroRow1 && heroRow2) {
    heroRow1.classList.add('is-show');
    heroRow2.classList.add('is-show');
    var heroIndex = 2;
    var heroTurn  = 0;
    setInterval(function () {
      var nextItem  = heroItems[heroIndex % heroItems.length];
      var targetRow = heroTurn % 2 === 0 ? heroRow1 : heroRow2;
      animateHeroRow(targetRow, nextItem);
      heroIndex++;
      heroTurn++;
    }, 2800);
  }

  // -------------------------------------------------------
  // 8. FAQ ACCORDION
  // -------------------------------------------------------
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('active');
      faqItems.forEach(function (i) { i.classList.remove('active'); });
      if (!isOpen) item.classList.add('active');
    });
  });

  // -------------------------------------------------------
  // 9. ABOUT STATS COUNT-UP
  // -------------------------------------------------------
  var statNumbers   = document.querySelectorAll('.count-up');
  var aboutSection  = document.getElementById('about');
  var aboutAnimated = false;

  function animateCount(el) {
    var target    = parseInt(el.getAttribute('data-target'), 10) || 0;
    var duration  = 1200;
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  function triggerAboutStats() {
    if (!aboutSection || aboutAnimated) return;
    if (aboutSection.getBoundingClientRect().top < window.innerHeight * 0.85) {
      aboutAnimated = true;
      statNumbers.forEach(animateCount);
    }
  }

  window.addEventListener('scroll', triggerAboutStats);
  triggerAboutStats();

  // -------------------------------------------------------
  // 10. AREAS HIGHLIGHT ANIMATION
  // -------------------------------------------------------
  var areaTags = document.querySelectorAll('.area-tag');
  if (areaTags.length) {
    var areaIndex = 0;
    areaTags[areaIndex].classList.add('is-highlighted');
    setInterval(function () {
      areaTags[areaIndex].classList.remove('is-highlighted');
      areaIndex = (areaIndex + 1) % areaTags.length;
      areaTags[areaIndex].classList.add('is-highlighted');
    }, 1400);
  }

  // -------------------------------------------------------
  // 11. LAZY LOADING IMAGES
  // -------------------------------------------------------
  if ('loading' in HTMLImageElement.prototype) {
    var images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(function(img) {
      img.src = img.dataset.src || img.src;
    });
  } else {
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }

}); // END DOMContentLoaded
