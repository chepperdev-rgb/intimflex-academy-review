"use client";

import Image from "next/image";
import { Check, Menu, X } from "lucide-react";
import { cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactElement, ReactNode } from "react";
import { createPortal } from "react-dom";
import CourseLanguageModal from "./CourseLanguageModal";

type Lang = "EN" | "RU" | "ES";
const basePath = "/intimflex-academy-review";
const asset = (path: string) => `${basePath}${path}`;

function normalizeCopy(value: unknown, lang: Lang): unknown {
  if (isValidElement(value)) {
    const element = value as ReactElement<{ children?: ReactNode }>;
    return cloneElement(element, {}, normalizeCopy(element.props.children, lang) as ReactNode);
  }
  if (typeof value !== "string") {
    if (Array.isArray(value)) return value.map((item) => normalizeCopy(item, lang));
    if (value && typeof value === "object" && !("$$typeof" in value)) {
      return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeCopy(item, lang)]));
    }
    return value;
  }
  let copy = value.replaceAll("AXS IntimFlex", "AXS INTIMFLEX");
  const heroCopy = lang === "EN"
    ? [["AXS INTIMFLEX · TRAINER CERTIFICATION", "AXS INTIMFLEX® ACADEMY"], ["Become a certified", "Become an"], ["Master the professional method, learn to teach it and prepare to lead your own online or offline sessions.", "Learn the method. Get certified. Start teaching."]]
    : lang === "RU"
      ? [["AXS INTIMFLEX · СЕРТИФИКАЦИЯ ТРЕНЕРОВ", "AXS INTIMFLEX® ACADEMY"], ["Стань сертифицированным", "СТАНЬ ТРЕНЕРОМ"], ["тренером AXS INTIMFLEX.", "AXS INTIMFLEX"], ["Освой профессиональную методику, научись преподавать её и подготовься проводить собственные онлайн- и офлайн-тренировки.", "Освой методику. Получи сертификат. Начни преподавать."]]
      : [["AXS INTIMFLEX · CERTIFICACIÓN DE TRAINERS", "AXS INTIMFLEX® ACADEMY"], ["Conviértete en trainer certificado", "CONVIÉRTETE EN TRAINER"], ["de AXS INTIMFLEX.", "AXS INTIMFLEX"], ["Domina el método profesional, aprende a enseñarlo y prepárate para dirigir tus propias sesiones online o presenciales.", "Aprende el método. Consigue tu certificado. Empieza a enseñar."]];
  heroCopy.forEach(([from, to]) => { copy = copy.replaceAll(from, to); });
  const practiceCopy = lang === "EN"
    ? [["THE METHOD IN PRACTICE", "MORE THAN A METHOD"], ["Teach what you", "Club for the"], ["can see.", "modern woman."], ["Observation is the trainer skill that turns movement knowledge into useful guidance: demonstrate clearly, notice the detail and help a client find the right technique.", "We are creating a new generation of healthy, beautiful, confident and sexual women who know their power and change the world. Become part of the AXS INTIMFLEX team and carry this ideology with us around the world."], ["See certification paths", "BECOME PART OF AXS INTIMFLEX ↗"]]
    : lang === "RU"
      ? [["МЕТОДИКА В ПРАКТИКЕ", "БОЛЬШЕ, ЧЕМ МЕТОДИКА"], ["Учи тому, что", "Клуб современной"], ["видишь.", "женщины."], ["Наблюдение превращает знание движения в точную помощь: покажи упражнение, заметь детали и помоги клиентке найти правильную технику.", "Мы создаём новое поколение здоровых, красивых, уверенных и сексуальных женщин, которые знают свою силу и меняют мир. Стань частью команды AXS INTIMFLEX и неси эту идеологию вместе с нами по всему миру."], ["Узнай о статусах после сертификации", "СТАТЬ ЧАСТЬЮ AXS INTIMFLEX ↗"]]
      : [["EL MÉTODO EN PRÁCTICA", "MÁS QUE UN MÉTODO"], ["Enseña lo que", "Club de la"], ["puedes ver.", "mujer moderna."], ["La observación convierte el conocimiento del movimiento en una guía útil: demuestra con claridad, detecta el detalle y ayuda a la clienta a encontrar la técnica correcta.", "Creamos una nueva generación de mujeres sanas, bellas, seguras y sexuales, que conocen su fuerza y cambian el mundo. Forma parte del equipo AXS INTIMFLEX y lleva esta ideología con nosotras por todo el mundo."], ["Ver las vías de certificación", "FORMAR PARTE DE AXS INTIMFLEX ↗"]];
  practiceCopy.forEach(([from, to]) => { copy = copy.replaceAll(from, to); });
  return copy;
}

const content = {
  EN: {
    nav: ["Program", "Certification", "Investment", "FAQ"],
    enroll: "Enroll", enrollNow: "Enroll now", reserve: "Reserve", reserveSpot: "Reserve your spot",
    heroEyebrow: "AXS INTIMFLEX · TRAINER CERTIFICATION", heroTitle: <>Become an<br /><em>AXS INTIMFLEX</em> trainer.</>,
    heroLede: "Master the professional method, learn to teach it and prepare to lead your own online or offline sessions.",
    cohort: "FIRST INTERNATIONAL COHORT", date: "OCTOBER 12, 2026", places: "ONLY 10 PLACES", full: "FULL PROGRAM", reserveYour: "Reserve your place",
    facts: ["Learn the method", "Practice with feedback", "Pass the exam", "Receive your certificate"],
    strip: "One method. One focused cohort.", stripSub: "A direct path from learning to leading.", seeLearn: "See what you learn",
    programEyebrow: "THE PROGRAM", programTitle: <>Learn it.<br /><em>Lead it.</em></>,
    programIntro: "The complete method, trainer-level technique, teaching structure, practice and assessment in one professional program.",
    curriculum: [
      ["The AXS IntimFlex Method", "Learn the complete system from a trainer’s point of view.", "Work through the core AXS IntimFlex training blocks and understand the logic behind the system, so you can teach the method rather than only perform it for yourself."],
      ["Technique", "See, demonstrate and correct every exercise at trainer level.", "Study correct technique, execution details and common mistakes. Learn what to watch for, how to demonstrate movement and how to explain and correct a client’s technique."],
      ["Teaching", "Turn your understanding into a clear client experience.", "Learn how to explain, demonstrate, observe and correct exercises. The program prepares you to teach the method to other women with a clear professional structure."],
      ["Training structure", "Build a complete AXS IntimFlex session.", "Understand the sequence of a full class: warm-up, main training blocks, exercise order, technique, work with the client and the close of the session."],
      ["Formats", "Prepare for individual, group, online and offline work.", "Prepare for 1:1 Personal Training and Group Classes delivered online or offline. The program is designed for trainers who want to conduct their own sessions."],
      ["Practice, feedback & assessment", "Apply the method, receive feedback and complete the final exam.", "Complete practical assignments and demonstrate the technique you have learned. Receive technique checks, error corrections and recommendations. Certification requires successful completion of the final assessment and exam."],
    ],
    path: ["Learn", "Practice", "Assessment", "Certificate"],
    practiceEyebrow: "MORE THAN A METHOD", practiceTitle: <>Club for the<br /><em>modern woman.</em></>, practiceCopy: "We are creating a new generation of healthy, beautiful, confident and sexual women who know their power and change the world. Become part of the AXS INTIMFLEX team and carry this ideology with us around the world.", seePaths: "BECOME PART OF AXS INTIMFLEX ↗",
    after: "AFTER CERTIFICATION", pathsTitle: <>One certificate.<br /><em>Two paths.</em></>, pathsIntro: "Passing the exam gives you Certified Trainer status. An optional membership is the separate route into the official active network.", required: "CERTIFICATION · REQUIRED", optional: "LICENSE · OPTIONAL", certifiedTitle: <>Certified<br />Trainer</>, activeTitle: <>Active Licensed<br />Trainer</>, certifiedCopy: "Complete the program and successfully pass the final exam. Your certificate confirms professional preparation in the AXS IntimFlex method.", confirms: "What it confirms", confirmsCopy: "You receive an AXS IntimFlex Certified Trainer Certificate with an individual certificate number. The certificate remains yours if you later stop membership.", activeCopy: "A certified trainer who chooses the separate $150/month Trainer License & Membership and joins the official AXS IntimFlex network.", adds: "What membership adds", membership: ["Official Active Licensed Trainer status", "Brand use under the license terms", "Official website listing and trainer profile", "Country and city display and potential client enquiries", "Current trainer materials, updates and resources", "Academy materials, playlists, community and support"], royalties: "There are 0% royalties from your independently conducted classes.", founderEyebrow: "THE METHOD · ILONA CHERNOBAI", founderTitle: <>While others are just learning, you are already teaching and earning.</>, founderCopy: "AXS INTIMFLEX is a method created by Ilona Chernobai. The Academy prepares trainers to master its principles, confidently demonstrate and explain exercises, lead training sessions, and, after certification, launch their own practice anywhere in the world with the potential to earn thousands of dollars.", explore: "Explore AXS IntimFlex",
    investment: "INVESTMENT", investTitle: <>Make the<br /><em>method yours.</em></>, investCopy: "The first international cohort is limited to ten trainers so each participant can receive technique checks, feedback and support during preparation.", royaltyShort: "0% royalties from independently conducted classes.", ten: "10 PLACES", cert: "Trainer Certification", fullSmall: "Full program investment · starts October 12, 2026 · 100% online", includes: ["Full AXS IntimFlex method", "Trainer-level technique and teaching", "Practice, feedback and assessment", "Final exam and certificate", "Preparation for online and offline work", "Individual and group training formats"], deposit: "Non-refundable reservation deposit. Credited toward the $2,499 total. Remaining balance before the program begins: $2,000.",
    faqEyebrow: "FAQ", faqTitle: <>Before you<br /><em>enroll.</em></>, faqs: [["When does the program start?", "The first cohort starts October 12, 2026."], ["How many places are available?", "Only 10 places are available in the first cohort."], ["How much is the certification?", "Full Trainer Certification is $2,499. You can reserve a place with a $499 non-refundable deposit, credited toward the total; the remaining balance is $2,000."], ["Is the training fully online?", "Yes. The program is 100% online."], ["Do I need the regular AXS IntimFlex course first?", "No. The full core method is included in the Trainer Certification Program and is taught at a deeper professional level."], ["Does every participant receive a certificate?", "No. The certificate is issued only after completing the program and successfully passing the final exam. Payment alone does not guarantee a certificate."], ["What can I do after certification?", "The program prepares you to conduct personal and group sessions online and offline, set your own schedule and pricing, and build your own client base. AXS IntimFlex brand use is governed by a separate Trainer License."], ["Is Trainer License & Membership required?", "No. It is a separate, optional choice after certification. It costs $150/month, with no free period after the exam."], ["What does membership provide?", "Active Licensed Trainer status, licensed brand use, official website listing and profile, country and city display, potential client enquiries, current trainer materials, updates, resources, Academy materials and playlists, community and support. The official directory includes trainers with active membership."], ["Are there royalties on my classes?", "No. There are 0% royalties from independently conducted classes. You set your own training price and keep the income from your work."], ["What happens if membership ends?", "Your certificate remains. Active Licensed Trainer status, directory listing, updated trainer materials, membership benefits and the right to present yourself as an active licensed trainer end; brand and licensed-material use remains governed by the Trainer License Agreement."]],
    finalEyebrow: "AXS INTIMFLEX TRAINER CERTIFICATION", finalTitle: <>Your city could<br /><em>be next.</em></>, finalCopy: "Learn the method, become certified and potentially bring AXS IntimFlex training to women in your city under the applicable certification and license conditions.", footer: "AXS IntimFlex Trainer Certification", language: "Language", close: "Close menu", open: "Open menu"
  },
  RU: {
    curriculum: [["Методика AXS IntimFlex", "Освой систему с позиции тренера.", "Пройди основные тренировочные блоки AXS IntimFlex и пойми логику системы, чтобы преподавать методику, а не только выполнять её для себя."], ["Техника", "Видеть, показывать и исправлять упражнения.", "Разбери правильную технику, детали выполнения и распространённые ошибки. Научись демонстрировать движения и корректировать технику клиентки."], ["Преподавание", "Преврати знания в понятный опыт клиентки.", "Научись объяснять, показывать, наблюдать и исправлять упражнения. Программа даёт ясную профессиональную структуру преподавания."], ["Структура тренировки", "Собери полноценное занятие AXS IntimFlex.", "Пойми последовательность занятия: разминка, основные блоки, порядок упражнений, техника, работа с клиенткой и завершение."], ["Форматы", "Индивидуальная, групповая, онлайн- и офлайн-работа.", "Подготовься к 1:1 Personal Training и Group Classes онлайн или офлайн. Программа создана для самостоятельного проведения занятий."], ["Практика, feedback и аттестация", "Примени методику и сдай финальный экзамен.", "Выполняй практические задания, демонстрируй технику, получай проверки, исправления ошибок и рекомендации. Сертификация требует успешной аттестации и экзамена."]], path: ["Обучение", "Практика", "Аттестация", "Сертификат"],
    nav: ["Программа", "Сертификация", "Стоимость", "FAQ"], enroll: "Записаться", enrollNow: "Запишись", reserve: "Забронируй", reserveSpot: "Забронируй место", heroEyebrow: "AXS INTIMFLEX · СЕРТИФИКАЦИЯ ТРЕНЕРОВ", heroTitle: <>Стань тренером<br /><em>AXS INTIMFLEX</em></>, heroLede: "Освой профессиональную методику, научись преподавать её и подготовься проводить собственные онлайн- и офлайн-тренировки.", cohort: "ПЕРВЫЙ МЕЖДУНАРОДНЫЙ ПОТОК", date: "12 ОКТЯБРЯ 2026", places: "ТОЛЬКО 10 МЕСТ", full: "ПОЛНАЯ ПРОГРАММА", reserveYour: "Забронируй место", facts: ["Освоить методику", "Практика с обратной связью", "Сдать экзамен", "Получить сертификат"], strip: "Одна методика. Один сфокусированный поток.", stripSub: "Прямой путь от обучения к преподаванию.", seeLearn: "Узнай, что ты изучишь", programEyebrow: "ПРОГРАММА", programTitle: <>Освой.<br /><em>Преподавай.</em></>, programIntro: "Полная методика, техника на уровне тренера, структура преподавания, практика и аттестация в одной профессиональной программе.", practiceEyebrow: "МЕТОДИКА В ПРАКТИКЕ", practiceTitle: <>Учи тому, что<br /><em>видишь.</em></>, practiceCopy: "Наблюдение превращает знание движения в точную помощь: покажи упражнение, заметь детали и помоги клиентке найти правильную технику.", seePaths: "Узнай о статусах после сертификации", after: "ПОСЛЕ СЕРТИФИКАЦИИ", pathsTitle: <>Один сертификат.<br /><em>Два пути.</em></>, pathsIntro: "После успешного экзамена ты получаешь статус Certified Trainer. Дополнительное membership — отдельный путь в официальную активную сеть.", required: "СЕРТИФИКАЦИЯ · ОБЯЗАТЕЛЬНО", optional: "ЛИЦЕНЗИЯ · ОПЦИОНАЛЬНО", certifiedTitle: <>Certified<br />Trainer</>, activeTitle: <>Active Licensed<br />Trainer</>, certifiedCopy: "Пройди программу и успешно сдай финальный экзамен. Сертификат подтверждает профессиональную подготовку по методике AXS IntimFlex.", confirms: "Что подтверждает сертификат", confirmsCopy: "Ты получаешь AXS IntimFlex Certified Trainer Certificate с индивидуальным номером. Сертификат сохраняется, даже если позднее ты прекратишь membership.", activeCopy: "Сертифицированный тренер, который отдельно выбирает Trainer License & Membership за $150 в месяц и присоединяется к официальной сети AXS IntimFlex.", adds: "Что даёт membership", membership: ["Официальный статус Active Licensed Trainer", "Право использовать бренд на условиях лицензии", "Размещение на официальном сайте и профиль тренера", "Отображение страны и города и потенциальные заявки клиентов", "Актуальные материалы, обновления и ресурсы тренера", "Материалы Академии, плейлисты, сообщество и поддержка"], royalties: "0% royalties с самостоятельно проводимых тренировок.", founderEyebrow: "МЕТОДИКА · ILONA CHERNOBAI", founderTitle: <>Пока другие только узнают, ты уже преподаёшь и зарабатываешь.</>, founderCopy: "AXS INTIMFLEX – методика, созданная Илоной Чернобай. Академия готовит тренеров, которые понимают её принципы, уверенно показывают и объясняют упражнения, проводят тренировки, а после получения сертификата могут начать собственную практику в любой точке мира с возможностью зарабатывать тысячи долларов.", explore: "Изучи AXS IntimFlex", investment: "СТОИМОСТЬ", investTitle: <>Сделай<br /><em>методику своей.</em></>, investCopy: "Первый международный поток ограничен десятью тренерами, чтобы каждый получил проверку техники, обратную связь и поддержку.", royaltyShort: "0% royalties с самостоятельно проводимых тренировок.", ten: "10 МЕСТ", cert: "Trainer Certification", fullSmall: "Полная стоимость · старт 12 октября 2026 · 100% онлайн", includes: ["Полная методика AXS IntimFlex", "Техника и преподавание на уровне тренера", "Практика, обратная связь и аттестация", "Финальный экзамен и сертификат", "Подготовка к онлайн- и офлайн-работе", "Индивидуальные и групповые форматы"], deposit: "Невозвратный reservation deposit. Входит в общую стоимость $2,499. Остаток до начала программы: $2,000.", faqEyebrow: "FAQ", faqTitle: <>Перед<br /><em>записью.</em></>, faqs: [["Когда начинается программа?", "Первый поток начинается 12 октября 2026 года."], ["Сколько мест доступно?", "В первом потоке доступно только 10 мест."], ["Сколько стоит сертификация?", "Полная Trainer Certification стоит $2,499. Место можно забронировать невозвратным депозитом $499, который входит в общую стоимость; остаток — $2,000."], ["Обучение полностью онлайн?", "Да. Программа проходит 100% онлайн."], ["Нужно ли сначала покупать обычный курс AXS IntimFlex?", "Нет. Полная основная методика входит в Trainer Certification Program и изучается на более глубоком профессиональном уровне."], ["Каждая ли участница получает сертификат?", "Нет. Сертификат выдаётся только после прохождения программы и успешной сдачи финального экзамена. Оплата сама по себе не гарантирует сертификат."], ["Что можно делать после сертификации?", "Программа готовит к персональным и групповым занятиям онлайн и офлайн, собственному расписанию и ценообразованию. Использование бренда AXS IntimFlex регулируется отдельной Trainer License."], ["Обязательно ли Trainer License & Membership?", "Нет. Это отдельный выбор после сертификации. Стоимость — $150 в месяц; бесплатного периода после экзамена нет."], ["Что даёт membership?", "Статус Active Licensed Trainer, использование бренда по лицензии, каталог и профиль, отображение страны и города, потенциальные заявки, материалы и обновления, ресурсы Академии, плейлисты, сообщество и поддержку. В каталоге находятся тренеры с активным membership."], ["Есть ли royalties с моих занятий?", "Нет. Royalties с самостоятельно проводимых тренировок — 0%. Ты сам устанавливаешь стоимость и сохраняешь доход от работы."], ["Что будет при прекращении membership?", "Сертификат сохраняется. Прекращаются статус Active Licensed Trainer, профиль в каталоге, доступ к обновляемым материалам и benefits membership; право представляться действующим лицензированным тренером и использование бренда регулируются Trainer License Agreement."]], finalEyebrow: "AXS INTIMFLEX · СЕРТИФИКАЦИЯ ТРЕНЕРОВ", finalTitle: <>Твой город может<br /><em>стать следующим.</em></>, finalCopy: "Освой методику, получи сертификацию и потенциально проводи AXS IntimFlex-тренировки в своём городе на условиях сертификации и лицензии.", footer: "AXS IntimFlex Trainer Certification", language: "Язык", close: "Закрой меню", open: "Открой меню"
  },
  ES: {
    name: "ILONA CHERNOBAI",
    curriculum: [["Método AXS IntimFlex", "Aprende el sistema desde la perspectiva de una trainer.", "Recorre los bloques principales y comprende la lógica del sistema para enseñar el método, no solo practicarlo para ti."], ["Técnica", "Ve, demuestra y corrige cada ejercicio.", "Estudia la técnica correcta, los detalles de ejecución y los errores habituales. Aprende a demostrar y corregir la técnica de una clienta."], ["Enseñanza", "Convierte tus conocimientos en una experiencia clara.", "Aprende a explicar, demostrar, observar y corregir ejercicios con una estructura profesional."], ["Estructura de la sesión", "Construye una sesión completa.", "Comprende la secuencia: calentamiento, bloques principales, orden de ejercicios, técnica, trabajo con la clienta y cierre."], ["Formatos", "Trabajo individual, grupal, online y presencial.", "Prepárate para 1:1 Personal Training y Group Classes online o presenciales, conduciendo tus propias sesiones."], ["Práctica, feedback y evaluación", "Aplica el método y supera el examen final.", "Realiza tareas prácticas, demuestra la técnica y recibe revisiones, correcciones y recomendaciones. La certificación requiere superar la evaluación y el examen."]], path: ["Aprendizaje", "Práctica", "Evaluación", "Certificado"],
    nav: ["Programa", "Certificación", "Inversión", "FAQ"], enroll: "Inscribirme", enrollNow: "Inscríbete", reserve: "Reservar", reserveSpot: "Reserva tu plaza", heroEyebrow: "AXS INTIMFLEX · CERTIFICACIÓN DE TRAINERS", heroTitle: <>Conviértete en trainer<br /><em>AXS INTIMFLEX</em></>, heroLede: "Domina el método profesional, aprende a enseñarlo y prepárate para dirigir tus propias sesiones online o presenciales.", cohort: "PRIMERA PROMOCIÓN INTERNACIONAL", date: "12 DE OCTUBRE DE 2026", places: "SOLO 10 PLAZAS", full: "PROGRAMA COMPLETO", reserveYour: "Reserva tu plaza", facts: ["Aprende el método", "Practica con feedback", "Supera el examen", "Recibe tu certificado"], strip: "Un método. Una promoción enfocada.", stripSub: "Un camino directo del aprendizaje al liderazgo.", seeLearn: "Ver lo que aprenderás", programEyebrow: "EL PROGRAMA", programTitle: <>Apréndelo.<br /><em>Enséñalo.</em></>, programIntro: "El método completo, técnica a nivel de trainer, estructura de enseñanza, práctica y evaluación en un programa profesional.", practiceEyebrow: "EL MÉTODO EN PRÁCTICA", practiceTitle: <>Enseña lo que<br /><em>puedes ver.</em></>, practiceCopy: "La observación convierte el conocimiento del movimiento en una guía útil: demuestra con claridad, detecta el detalle y ayuda a la clienta a encontrar la técnica correcta.", seePaths: "Ver las vías de certificación", after: "DESPUÉS DE LA CERTIFICACIÓN", pathsTitle: <>Un certificado.<br /><em>Dos vías.</em></>, pathsIntro: "Aprobar el examen te da el estatus Certified Trainer. La membresía opcional es la vía separada hacia la red oficial activa.", required: "CERTIFICACIÓN · REQUERIDA", optional: "LICENCIA · OPCIONAL", certifiedTitle: <>Certified<br />Trainer</>, activeTitle: <>Active Licensed<br />Trainer</>, certifiedCopy: "Completa el programa y supera el examen final. Tu certificado confirma tu preparación profesional en el método AXS IntimFlex.", confirms: "Qué confirma", confirmsCopy: "Recibes el AXS IntimFlex Certified Trainer Certificate con un número individual. El certificado permanece contigo aunque después canceles la membresía.", activeCopy: "Una trainer certificada que elige el Trainer License & Membership separado de $150/mes y se une a la red oficial AXS IntimFlex.", adds: "Qué añade la membresía", membership: ["Estatus oficial Active Licensed Trainer", "Uso de la marca según los términos de licencia", "Perfil y presencia en la web oficial", "País y ciudad visibles y posibles consultas de clientes", "Materiales, actualizaciones y recursos profesionales", "Materiales de la Academia, playlists, comunidad y soporte"], royalties: "0% de royalties de tus clases realizadas de forma independiente.", founderEyebrow: "EL MÉTODO · ILONA CHERNOBAI", founderTitle: <>Mientras otras apenas están aprendiendo, tú ya estás enseñando y ganando.</>, founderCopy: "AXS INTIMFLEX es un método creado por Ilona Chernobai. La Academia prepara a entrenadores para dominar sus principios, demostrar y explicar los ejercicios con confianza, impartir sesiones de entrenamiento y, después de obtener la certificación, comenzar su propia práctica en cualquier parte del mundo con la posibilidad de generar miles de dólares.", explore: "Explorar AXS IntimFlex", investment: "INVERSIÓN", investTitle: <>Haz tuyo<br /><em>el método.</em></>, investCopy: "La primera promoción internacional está limitada a diez trainers para que cada participante reciba revisiones de técnica, feedback y apoyo.", royaltyShort: "0% de royalties de tus clases independientes.", ten: "10 PLAZAS", cert: "Trainer Certification", fullSmall: "Inversión total · comienza el 12 de octubre de 2026 · 100% online", includes: ["Método completo AXS IntimFlex", "Técnica y enseñanza a nivel trainer", "Práctica, feedback y evaluación", "Examen final y certificado", "Preparación para trabajo online y presencial", "Formatos individuales y grupales"], deposit: "Depósito de reserva no reembolsable. Se descuenta del total de $2,499. Saldo restante antes de comenzar: $2,000.", faqEyebrow: "FAQ", faqTitle: <>Antes de<br /><em>inscribirte.</em></>, faqs: [["¿Cuándo empieza el programa?", "La primera promoción empieza el 12 de octubre de 2026."], ["¿Cuántas plazas hay?", "Solo hay 10 plazas en la primera promoción."], ["¿Cuál es el precio?", "La Trainer Certification completa cuesta $2,499. Puedes reservar tu plaza con un depósito no reembolsable de $499, descontado del total; el saldo es $2,000."], ["¿La formación es totalmente online?", "Sí. El programa es 100% online."], ["¿Necesito comprar primero el curso normal?", "No. El método completo está incluido en el Trainer Certification Program y se estudia a un nivel profesional más profundo."], ["¿Todas reciben un certificado?", "No. Se emite solo después de completar el programa y superar el examen final. El pago por sí solo no garantiza el certificado."], ["¿Qué puedo hacer después de certificarme?", "El programa te prepara para sesiones individuales y grupales, online y presenciales, con tu propio horario, precios y base de clientes. El uso de la marca se rige por una Trainer License separada."], ["¿Es obligatoria la Trainer License & Membership?", "No. Es una elección separada después de la certificación. Cuesta $150/mes y no hay periodo gratuito tras el examen."], ["¿Qué incluye la membresía?", "Estatus Active Licensed Trainer, uso licenciado de la marca, perfil y directorio oficiales, país y ciudad visibles, posibles consultas, materiales y actualizaciones, recursos de Academy, playlists, comunidad y soporte. El directorio incluye trainers con membresía activa."], ["¿Hay royalties sobre mis clases?", "No. Hay 0% de royalties sobre clases realizadas de forma independiente. Tú fijas el precio y conservas los ingresos de tu trabajo."], ["¿Qué ocurre si termina la membresía?", "Tu certificado permanece. Terminan el estatus Active Licensed Trainer, el perfil del directorio, el acceso a materiales actualizados y los beneficios de membresía; la marca y los materiales licenciados se rigen por el Trainer License Agreement."]], finalEyebrow: "AXS INTIMFLEX · CERTIFICACIÓN DE TRAINERS", finalTitle: <>Tu ciudad podría<br /><em>ser la siguiente.</em></>, finalCopy: "Aprende el método, certifícate y potencialmente lleva el entrenamiento AXS IntimFlex a mujeres de tu ciudad bajo las condiciones de certificación y licencia aplicables.", footer: "AXS IntimFlex Trainer Certification", language: "Idioma", close: "Cerrar menú", open: "Abrir menú"
  }
} as const;

const faqOverrides = {
  EN: [
    ["When does the program start?", "The first cohort starts October 12, 2026."],
    ["How many places are available?", "Only 10 places are available in the first cohort. This allows us to give attention to every participant, check technique and provide personal feedback."],
    ["How much do training and certification cost?", "The full program costs $2,499. You can pay the full amount upfront or reserve a place with a $499 non-refundable deposit, credited toward the tuition. The remaining balance is $2,000."],
    ["Is the training fully online?", "Yes. The training, practical assignments, feedback and final assessment are 100% online."],
    ["Do I need to buy the regular AXS INTIMFLEX course first?", "No. The full core method is already included in the trainer preparation program. You study it from an instructor’s perspective: how to perform exercises, explain them to clients, correct technique and structure sessions."],
    ["How do I receive the certificate?", "Complete the program, fulfil the required assignments and successfully pass the final exam. You will then receive an AXS INTIMFLEX Certified Trainer certificate with an individual number. Payment alone does not guarantee a certificate."],
    ["What happens after payment?", "After payment, you will receive access to a private WhatsApp group with Ilona, where information about the training start and next steps will be shared."],
    ["What can I do after certification?", "After successfully completing the training and exam, you can conduct personal and group sessions online and offline, set your own schedule and prices, and build your client base. The right to use the brand to promote your sessions is granted separately through AXS INTIMFLEX Trainer Membership."],
    ["Is Trainer License & Membership required after training?", "No. Membership is voluntary and activated separately after certification. It costs $150 per month and no free period is provided. It is not included in the training cost."],
    ["What does membership provide?", "Official AXS INTIMFLEX Active Licensed Trainer status; the right to use the approved name and logo for your sessions under the membership terms; and a personal profile in the trainer directory with your city, country and contact details. The directory gives you the opportunity to receive enquiries from prospective clients through the official website: the AXS INTIMFLEX team actively brings international traffic from social media, so prospective clients may find a trainer in their city or for online sessions and contact them directly. The subscription also includes professional materials, method updates, a private trainer community and Academy support."],
    ["Does AXS INTIMFLEX charge a percentage of my sessions?", "No. Royalties on personal and group sessions you conduct yourself are 0%. You set your own prices and collect payment from your clients."],
    ["What happens if I end my membership?", "Your training certificate remains valid. You can continue working independently and state your qualification. Your Active Licensed Trainer status is removed, your official directory profile is taken down, and access to additional materials, updates and other membership benefits ends. Use of the licensed logo and presenting sessions under the brand must stop within the period set by the membership terms."],
  ],
  RU: [
    ["Когда начинается программа?", "Первый поток начинается 12 октября 2026 года."],
    ["Сколько мест доступно?", "В первом потоке доступно только 10 мест. Это позволяет уделить внимание каждой участнице, проверять технику и давать персональную обратную связь."],
    ["Сколько стоит обучение и сертификация?", "Полная стоимость программы составляет $2,499. Можно оплатить всю сумму сразу или забронировать место невозвратным депозитом $499, который входит в стоимость обучения. Остаток к оплате составляет $2,000."],
    ["Обучение полностью онлайн?", "Да. Обучение, практические задания, обратная связь и финальная аттестация 100% проходят онлайн."],
    ["Нужно ли сначала покупать обычный курс AXS INTIMFLEX?", "Нет. Полная основная методика уже входит в программу подготовки тренеров. Ты изучаешь её с позиции преподавателя: как выполнять упражнения, объяснять их клиенткам, корректировать технику и выстраивать занятия."],
    ["Как получить сертификат?", "Пройди программу, выполни обязательные задания и успешно сдай финальный экзамен. После этого ты получишь сертификат AXS INTIMFLEX Certified Trainer с индивидуальным номером. Оплата обучения сама по себе не гарантирует получение сертификата."],
    ["Что происходит после оплаты?", "После оплаты ты получишь доступ к закрытой группе Telegram с Илоной, где будет размещена информация о начале обучения и дальнейших действиях."],
    ["Что можно делать после сертификации?", "После успешного завершения обучения и экзамена ты можешь проводить персональные и групповые занятия онлайн и офлайн, формировать собственное расписание, устанавливать цены и развивать клиентскую базу. Право использовать бренд для продвижения своих занятий предоставляется отдельно в рамках подписки AXS INTIMFLEX Trainer Membership."],
    ["Обязательно ли подписка Trainer License & Membership после обучения?", "Нет. Подписка добровольная и подключается отдельно после сертификации. Стоимость составляет $150 в месяц. Она не входит в стоимость обучения, бесплатный период не предусмотрен."],
    ["Что даёт подписка?", "Официальный статус AXS INTIMFLEX Active Licensed Trainer, право использовать утверждённые название и логотип для своих занятий на условиях подписки, персональный профиль в каталоге тренеров с городом, страной и контактами. Размещение в каталоге даёт возможность получать обращения потенциальных клиенток через официальный сайт: команда AXS INTIMFLEX привлекает международный трафик из социальных сетей, поэтому потенциальные клиентки могут найти тренера в своём городе или для онлайн-занятий и связаться с ним напрямую. В подписку также входят дополнительные профессиональные материалы, обновления методики, закрытое сообщество тренеров и поддержка Академии."],
    ["Берёт ли AXS INTIMFLEX процент с моих занятий?", "Нет. Роялти с персональных и групповых занятий, которые ты проводишь лично, составляют 0%. Ты самостоятельно устанавливаешь цены и принимаешь оплату от клиенток."],
    ["Что будет, если я прекращу подписку?", "Сертификат о прохождении обучения сохраняется. Ты можешь продолжать самостоятельную работу и указывать полученную квалификацию. После прекращения действия подписки снимается статус Active Licensed Trainer, профиль убирается из официального каталога и прекращается доступ к дополнительным материалам, обновлениям и другим преимуществам подписки. Использование лицензируемого логотипа и оформление занятий под брендом необходимо прекратить в сроки, установленные условиями подписки."],
  ],
  ES: [
    ["¿Cuándo empieza el programa?", "La primera promoción comienza el 12 de octubre de 2026."],
    ["¿Cuántas plazas hay disponibles?", "Solo hay 10 plazas en la primera promoción. Esto nos permite prestar atención a cada participante, revisar la técnica y ofrecer feedback personalizado."],
    ["¿Cuánto cuestan la formación y la certificación?", "El programa completo cuesta $2,499. Puedes pagar el importe total por adelantado o reservar tu plaza con un depósito no reembolsable de $499, que se descuenta del coste de la formación. El saldo restante es de $2,000."],
    ["¿La formación es totalmente online?", "Sí. La formación, las tareas prácticas, el feedback y la evaluación final se realizan 100% online."],
    ["¿Necesito comprar primero el curso normal de AXS INTIMFLEX?", "No. El método principal completo ya está incluido en el programa de preparación de trainers. Lo estudias desde la perspectiva de una instructora: cómo realizar los ejercicios, explicarlos a tus clientas, corregir la técnica y estructurar las sesiones."],
    ["¿Cómo obtengo el certificado?", "Completa el programa, realiza las tareas obligatorias y supera el examen final. Después recibirás el certificado AXS INTIMFLEX Certified Trainer con un número individual. El pago de la formación por sí solo no garantiza la obtención del certificado."],
    ["¿Qué ocurre después del pago?", "Después del pago, recibirás acceso a un grupo privado de WhatsApp con Ilona, donde se compartirá la información sobre el inicio de la formación y los siguientes pasos."],
    ["¿Qué puedo hacer después de certificarme?", "Después de completar con éxito la formación y el examen, puedes impartir sesiones individuales y grupales online y presenciales, crear tu propio horario, fijar tus precios y desarrollar tu base de clientas. El derecho a usar la marca para promocionar tus sesiones se concede por separado mediante AXS INTIMFLEX Trainer Membership."],
    ["¿Es obligatoria la Trainer License & Membership después de la formación?", "No. La membresía es voluntaria y se activa por separado después de la certificación. Cuesta $150 al mes y no se ofrece ningún periodo gratuito. No está incluida en el coste de la formación."],
    ["¿Qué ofrece la membership?", "El estatus oficial AXS INTIMFLEX Active Licensed Trainer; el derecho a usar el nombre y el logotipo aprobados para tus sesiones según los términos de la membresía; y un perfil personal en el directorio de trainers con tu ciudad, país y datos de contacto. El directorio te da la oportunidad de recibir consultas de potenciales clientas a través de la web oficial: el equipo de AXS INTIMFLEX atrae activamente tráfico internacional desde las redes sociales, por lo que las clientas potenciales pueden encontrar una trainer en su ciudad o para sesiones online y contactarla directamente. La suscripción también incluye materiales profesionales adicionales, actualizaciones del método, una comunidad privada de trainers y soporte de la Academia."],
    ["¿AXS INTIMFLEX se queda con un porcentaje de mis sesiones?", "No. Los royalties de las sesiones individuales y grupales que impartes personalmente son del 0%. Tú fijas tus precios y cobras directamente a tus clientas."],
    ["¿Qué ocurre si cancelo mi membership?", "Tu certificado de formación se conserva. Puedes seguir trabajando de forma independiente e indicar tu cualificación. Al finalizar la suscripción, se retira el estatus Active Licensed Trainer, tu perfil se elimina del directorio oficial y termina el acceso a materiales adicionales, actualizaciones y otras ventajas de la membresía. El uso del logotipo licenciado y la presentación de sesiones bajo la marca deben cesar dentro del plazo establecido en los términos de la membresía."],
  ],
} as const;

const certificationCopy = {
  EN: {
    eyebrow: "CERTIFICATION", titleLead: "Your path to becoming", titleAccent: "a trainer",
    cardEyebrow: "TRAINING & CERTIFICATION", cardTitle: "Trainer Certification",
    description: "Master the AXS INTIMFLEX method, refine your technique and learn to lead personal and group sessions.",
    certificateNote: "After successfully completing the training and exam, you receive an AXS INTIMFLEX trainer certificate with an individual number.",
    items: [
      ["How to receive your certificate", "Complete the training, refine your technique, complete the practical assignments and successfully pass the final exam. You will receive an AXS INTIMFLEX trainer certificate with an individual number confirming your preparation to teach."],
      ["Independent work after training", "After certification, you can independently conduct personal and group sessions online and offline, create your schedule and build your client base. The certificate remains yours. Membership is not required for independent work."],
      ["AXS INTIMFLEX representation", "If you want to grow with AXS INTIMFLEX, after training you can join the trainer community separately and represent the brand in your city under special terms.\n\nYou will receive the right to conduct branded sessions under agreed terms, a profile in the trainer directory on the official website and the opportunity to receive enquiries from potential clients. Our team brings an international audience to the website through social media, so women can find a trainer in their city or online.\n\nYou will also have access to additional professional materials and Academy support. Participation is voluntary and arranged separately after certification."],
    ],
    optional: "By choice, after certification",
  },
  RU: {
    eyebrow: "СЕРТИФИКАЦИЯ", titleLead: "Твой путь к", titleAccent: "тренерству",
    cardEyebrow: "ОБУЧЕНИЕ И СЕРТИФИКАЦИЯ", cardTitle: "Trainer Certification",
    description: "Освой методику AXS INTIMFLEX, отработай технику и научись проводить персональные и групповые занятия.",
    certificateNote: "После успешного обучения и экзамена ты получаешь сертификат тренера AXS INTIMFLEX с индивидуальным номером.",
    items: [
      ["Как получить сертификат", "Пройди обучение, отработай технику, выполни практические задания и успешно сдай финальный экзамен. Ты получишь сертификат тренера AXS INTIMFLEX с индивидуальным номером, который подтверждает твою подготовку к преподаванию."],
      ["Самостоятельная работа после обучения", "После сертификации ты можешь самостоятельно проводить персональные и групповые занятия онлайн и офлайн, составлять расписание и развивать свою клиентскую базу. Сертификат остаётся у тебя. Для самостоятельной работы подключать подписку не обязательно."],
      ["Представительство AXS INTIMFLEX", "Если ты захочешь развиваться вместе с AXS INTIMFLEX, после обучения можно отдельно присоединиться к сообществу тренеров и представлять бренд в своём городе на специальных условиях.\n\nТы получишь право проводить занятия под брендом на согласованных условиях, профиль в каталоге тренеров на официальном сайте и возможность получать обращения потенциальных клиенток. Наша команда привлекает на сайт международную аудиторию из социальных сетей, чтобы женщины могли найти тренера для занятий в своём городе или онлайн.\n\nТакже тебе будут доступны дополнительные профессиональные материалы и поддержка Академии. Участие добровольное и оформляется отдельно после сертификации."],
    ],
    optional: "По желанию, после сертификации",
  },
  ES: {
    eyebrow: "CERTIFICACIÓN", titleLead: "Tu camino para convertirte en", titleAccent: "entrenadora",
    cardEyebrow: "FORMACIÓN Y CERTIFICACIÓN", cardTitle: "Trainer Certification",
    description: "Domina el método AXS INTIMFLEX, perfecciona la técnica y aprende a dirigir sesiones individuales y grupales.",
    certificateNote: "Después de completar con éxito la formación y el examen, recibes un certificado de trainer AXS INTIMFLEX con un número individual.",
    items: [
      ["Cómo obtener el certificado", "Completa la formación, perfecciona la técnica, realiza las tareas prácticas y supera con éxito el examen final. Recibirás un certificado de trainer AXS INTIMFLEX con un número individual que confirma tu preparación para enseñar."],
      ["Trabajo independiente después de la formación", "Después de la certificación, puedes impartir de forma independiente sesiones individuales y grupales online y presenciales, crear tu horario y desarrollar tu base de clientas. El certificado sigue siendo tuyo. La membresía no es necesaria para trabajar de forma independiente."],
      ["Representación de AXS INTIMFLEX", "Si quieres crecer junto a AXS INTIMFLEX, después de la formación puedes unirte por separado a la comunidad de trainers y representar la marca en tu ciudad bajo condiciones especiales.\n\nTendrás derecho a impartir sesiones bajo la marca en las condiciones acordadas, un perfil en el directorio de trainers de la web oficial y la posibilidad de recibir consultas de clientas potenciales. Nuestro equipo atrae a la web una audiencia internacional desde las redes sociales, para que las mujeres puedan encontrar una trainer en su ciudad o para sesiones online.\n\nTambién tendrás acceso a materiales profesionales adicionales y al apoyo de la Academia. La participación es voluntaria y se formaliza por separado después de la certificación."],
    ],
    optional: "Opcional, después de la certificación",
  },
} as const;

const ilonaCopy = {
  EN: {
    name: "ILONA CHERNOBAI",
    role: "Founder of AXS INTIMFLEX",
    paragraphs: [
      "I am an Intim Flex trainer, a Master of Sport in artistic gymnastics, and I have worked with women, their bodies and movement for more than 10 years.",
      "I created AXS INTIMFLEX to shape a new generation of healthy, beautiful, confident and sexual women.",
      "Today, I pass my method on to other trainers and build an international AXS team.",
      "I invite you to become part of it — master the method, start teaching, and carry this ideology with me.",
    ],
    open: "Open information about Ilona Chernobai",
    close: "Close information about Ilona Chernobai",
  },
  RU: {
    name: "ИЛОНА ЧЕРНОБАЙ",
    role: "Основатель AXS INTIMFLEX",
    paragraphs: [
      "Я — тренер по Intim Flex, мастер спорта по спортивной гимнастике и более 10 лет работаю с женщинами, их телом и движением.",
      "Я создала AXS INTIMFLEX, чтобы формировать новое поколение здоровых, красивых, уверенных и сексуальных женщин.",
      "Сегодня я передаю свою методику другим тренерам и создаю международную команду AXS.",
      "Я приглашаю тебя стать её частью — освоить методику, начать преподавать и нести эту идеологию вместе со мной.",
    ],
    open: "Открыть информацию об Илоне Чернобай",
    close: "Закрыть информацию об Илоне Чернобай",
  },
  ES: {
    name: "ILONA CHERNOBAI",
    role: "Fundadora de AXS INTIMFLEX",
    paragraphs: [
      "Soy entrenadora de Intim Flex, maestra del deporte en gimnasia artística y llevo más de 10 años trabajando con mujeres, sus cuerpos y el movimiento.",
      "Creé AXS INTIMFLEX para formar una nueva generación de mujeres sanas, bellas, seguras y sexuales.",
      "Hoy transmito mi método a otras entrenadoras y creo un equipo internacional de AXS.",
      "Te invito a formar parte de él: dominar el método, empezar a enseñar y llevar esta ideología conmigo.",
    ],
    open: "Abrir información sobre Ilona Chernobai",
    close: "Cerrar información sobre Ilona Chernobai",
  },
} as const;

type IlonaPhase = "closed" | "opening" | "open" | "closing";

function IlonaCard({ lang, eyebrow, cohort, spotsLabel }: { lang: Lang; eyebrow: ReactNode; cohort: string; spotsLabel: string }) {
  const [phase, setPhase] = useState<IlonaPhase>("closed");
  const [motionStyle, setMotionStyle] = useState<CSSProperties>({});
  const [desktopMode, setDesktopMode] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const restoreFocusRef = useRef(false);
  const copy = ilonaCopy[lang];
  const expanded = phase !== "closed";

  const openCard = () => {
    if (expanded || !slotRef.current) return;
    const rect = slotRef.current.getBoundingClientRect();
    scrollPositionRef.current = window.scrollY;
    setDesktopMode(window.matchMedia("(min-width: 801px)").matches);
    const targetWidth = Math.min(560, window.innerWidth - 48);
    const targetHeight = Math.min(680, window.innerHeight - 48);
    setMotionStyle({
      "--ilona-from-x": `${rect.left + rect.width / 2 - window.innerWidth / 2}px`,
      "--ilona-from-y": `${rect.top + rect.height / 2 - window.innerHeight / 2}px`,
      "--ilona-from-scale-x": rect.width / targetWidth,
      "--ilona-from-scale-y": rect.height / targetHeight,
    } as CSSProperties);
    setPhase("opening");
  };

  const closeCard = () => {
    if (!expanded || phase === "closing") return;
    if (desktopMode && slotRef.current) {
      const rect = slotRef.current.getBoundingClientRect();
      const targetWidth = Math.min(560, window.innerWidth - 48);
      const targetHeight = Math.min(680, window.innerHeight - 48);
      setMotionStyle({
        "--ilona-from-x": `${rect.left + rect.width / 2 - window.innerWidth / 2}px`,
        "--ilona-from-y": `${rect.top + rect.height / 2 - window.innerHeight / 2}px`,
        "--ilona-from-scale-x": rect.width / targetWidth,
        "--ilona-from-scale-y": rect.height / targetHeight,
      } as CSSProperties);
    }
    setPhase("closing");
  };

  useEffect(() => {
    if (phase === "opening") {
      const timer = window.setTimeout(() => {
        setPhase("open");
        closeRef.current?.focus({ preventScroll: true });
      }, 520);
      return () => window.clearTimeout(timer);
    }
    if (phase === "closing") {
      const timer = window.setTimeout(() => {
        restoreFocusRef.current = true;
        setPhase("closed");
        setMotionStyle({});
        setDesktopMode(false);
        window.scrollTo({ top: scrollPositionRef.current, behavior: "auto" });
      }, 520);
      return () => window.clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "closed" || !restoreFocusRef.current) return;
    restoreFocusRef.current = false;
    triggerRef.current?.focus({ preventScroll: true });
  }, [phase]);

  useEffect(() => {
    if (!expanded) return;
    const previousOverflow = document.body.style.overflow;
    const desktop = window.matchMedia("(min-width: 801px)").matches;
    if (desktop) document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPhase((current) => current === "closed" || current === "closing" ? current : "closing");
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [expanded, phase]);

  const card = <>
    {expanded && <button className={`ilona-backdrop ilona-backdrop--${phase}`} type="button" tabIndex={-1} aria-label={copy.close} onClick={closeCard} />}
    <div
      ref={cardRef}
      className={`ilona-card ilona-card--${phase}`}
      style={motionStyle}
      role={expanded ? "dialog" : undefined}
      aria-modal={expanded ? "true" : undefined}
      aria-labelledby={expanded ? "ilona-card-title" : undefined}
    >
      <div className="ilona-card-inner">
        <div className="ilona-card-face ilona-card-front">
          <Image className="hero-visual-image" src={asset("/img/academy-hero-training-v20260906-new.jpg")} alt="Ilona Chernobai" fill sizes="(max-width: 800px) 100vw, 40vw" priority />
          <div className="visual-caption"><span>{eyebrow}</span><b>{cohort} · {spotsLabel}</b></div>
          <button ref={triggerRef} className="ilona-open" type="button" tabIndex={expanded ? -1 : 0} aria-label={copy.open} aria-expanded={expanded} onClick={openCard}>
            <span>Ilona Chernobai ⓘ</span>
          </button>
        </div>
        <div className="ilona-card-face ilona-card-back">
          <button ref={closeRef} className="ilona-close" type="button" aria-label={copy.close} onClick={closeCard}><X aria-hidden="true" size={20} /></button>
          <div className="ilona-card-copy">
            <h2 id="ilona-card-title">{copy.name}</h2>
            <h3>{copy.role}</h3>
            {copy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </div>
    </div>
  </>;

  return <div ref={slotRef} className={`hero-visual ilona-card-slot${expanded ? " ilona-card-slot--expanded" : ""}`}>
    {expanded && desktopMode ? createPortal(card, document.body) : card}
  </div>;
}

function Logo() { return <a className="brand" href="#top" aria-label="AXS INTIMFLEX Academy"><Image src={asset("/img/axs-logo-original.png")} alt="AXS" width={635} height={415} priority /><span className="brand-name">IntimFlex</span></a>; }

export default function Home() {
  const [lang, setLang] = useState<Lang>("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const [paymentModal, setPaymentModal] = useState<"deposit" | "full" | null>(null);
  const [certOpen, setCertOpen] = useState<number | null>(null);
  const t = normalizeCopy(content[lang], lang) as typeof content[typeof lang];
  const certification = certificationCopy[lang];
  const programIntro = lang === "EN"
    ? "Complete preparation from the ground up: from mastering the method to leading sessions independently. Practise with personal feedback from Ilona and finish with a live online exam."
    : lang === "RU"
      ? "Полная подготовка с нуля: от освоения методики до самостоятельного проведения занятий. Практика с персональной проверкой Илоны и финальный онлайн-экзамен"
      : "Preparación completa desde cero: desde dominar el método hasta dirigir sesiones de forma independiente. Practica con la revisión personalizada de Ilona y completa un examen online en tiempo real.";
  const curriculum = lang === "EN"
    ? [
        ["The AXS INTIMFLEX Method", "Pelvic floor, breathing, movement and flexibility.", "Study the pelvic floor muscles, breathing, movement and flexibility as components of the AXS INTIMFLEX method. The program also covers nutrition basics and women’s psychology, self-confidence and body image."],
        ["Execution technique", "Master the exercises and control your movements.", "Break down starting positions, movement sequences and how exercises combine with breathing. Learn to notice mistakes in your own execution and correct your technique."],
        ["Working with a client", "Explain, observe and correct.", "Learn to explain and demonstrate exercises clearly, observe their execution and give helpful cues. Adapt the workload to the client’s level and account for training limitations and contraindications."],
        ["Building a workout", "Create a session from warm-up to finish.", "Learn to organise the sequence of exercises, combine them into training blocks and distribute the workload throughout the session. Build a complete workout with a warm-up, main section and finish."],
        ["Teaching formats", "One-to-one and group, online and in person.", "Explore the specifics of personal and group sessions. Learn to organise exercise demonstration and observation when working in a studio and through a screen."],
        ["Practice and exam", "Personal technique check with Ilona and a live online exam.", "Submit video recordings of your exercise performance. Ilona personally checks your technique and gives feedback. Complete your preparation with a live online final exam."],
      ]
    : lang === "RU"
      ? [
          ["Методика AXS INTIMFLEX", "Тазовое дно, дыхание, пластика и гибкость.", "Изучи работу мышц тазового дна, дыхание, пластику и гибкость как составляющие методики AXS INTIMFLEX. В программу также входят основы питания и темы женской психологии, уверенности в себе и отношения к своему телу."],
          ["Техника выполнения", "Освой упражнения и контроль движений.", "Разбери исходные положения, последовательность движений и сочетание упражнений с дыханием. Научись замечать ошибки в собственном выполнении и корректировать технику."],
          ["Работа с клиенткой", "Объясняй, наблюдай и корректируй.", "Научись понятно объяснять и показывать упражнения, наблюдать за выполнением и давать подсказки. Подбирай нагрузку под уровень клиентки, учитывай ограничения и противопоказания к тренировкам."],
          ["Построение тренировки", "Составляй занятие от разминки до завершения.", "Научись выстраивать последовательность упражнений, соединять их в тренировочные блоки и распределять нагрузку в течение занятия. Собирай полноценную тренировку с разминкой, основной частью и завершением."],
          ["Форматы преподавания", "Персонально и в группе, онлайн и офлайн.", "Разбери особенности персональных и групповых занятий. Научись организовывать показ упражнений и наблюдение за клиентками при работе в зале и через экран."],
          ["Практика и экзамен", "Персональная проверка Илоны и онлайн-экзамен.", "Отправляй видеозаписи выполнения упражнений. Илона лично проверяет технику и даёт обратную связь. Заверши подготовку финальным онлайн-экзаменом в прямом эфире."],
        ]
      : [
          ["Método AXS INTIMFLEX", "Suelo pélvico, respiración, movimiento y flexibilidad.", "Estudia el trabajo de los músculos del suelo pélvico, la respiración, el movimiento y la flexibilidad como componentes del método AXS INTIMFLEX. El programa también incluye nociones básicas de nutrición y temas de psicología femenina, confianza y relación con el propio cuerpo."],
          ["Técnica de ejecución", "Domina los ejercicios y el control de los movimientos.", "Analiza las posiciones iniciales, la secuencia de movimientos y la combinación de ejercicios con la respiración. Aprende a detectar errores en tu propia ejecución y a corregir la técnica."],
          ["Trabajo con la clienta", "Explica, observa y corrige.", "Aprende a explicar y mostrar los ejercicios con claridad, observar su ejecución y dar indicaciones útiles. Adapta la carga al nivel de la clienta y ten en cuenta sus limitaciones y contraindicaciones para entrenar."],
          ["Construcción de la sesión", "Crea una sesión desde el calentamiento hasta el cierre.", "Aprende a organizar la secuencia de ejercicios, unirlos en bloques de entrenamiento y distribuir la carga durante la sesión. Crea una sesión completa con calentamiento, parte principal y cierre."],
          ["Formatos de enseñanza", "Individual y grupal, online y presencial.", "Analiza las particularidades de las sesiones individuales y grupales. Aprende a organizar la demostración y la observación de los ejercicios al trabajar en sala y a través de una pantalla."],
          ["Práctica y examen", "Revisión personalizada de Ilona y examen online en tiempo real.", "Envía grabaciones en vídeo de la ejecución de los ejercicios. Ilona revisa personalmente tu técnica y te da feedback. Completa tu preparación con un examen final online en tiempo real."],
        ];
  const stripCopy = lang === "EN"
    ? "MASTER THE METHOD → PRACTICE IT → GET CERTIFIED → START TEACHING"
    : lang === "RU"
      ? "ОСВОЙ МЕТОДИКУ → ПРОЙДИ ПРАКТИКУ → ПОЛУЧИ СЕРТИФИКАТ → НАЧНИ ПРЕПОДАВАТЬ"
      : "DOMINA EL MÉTODO → PRACTICA → OBTÉN TU CERTIFICADO → EMPIEZA A ENSEÑAR";
  const spotsLabel = lang === "EN" ? "10 SPOTS" : lang === "RU" ? "10 МЕСТ" : "10 PLAZAS";
  const paymentCopy = lang === "EN"
    ? { reserveTitle: "Reserve your place", part: "Part of the $2,499 total", balance: "Remaining balance $2,000", deposit: "Non-refundable deposit", details: "Details", pay: "Pay", reserve: "Reserve" }
    : lang === "RU"
      ? { reserveTitle: "Бронирование места", part: "Часть стоимости $2,499", balance: "Остаток к оплате $2,000", deposit: "Депозит невозвратный", details: "Подробнее", pay: "Оплатить", reserve: "Забронировать" }
      : { reserveTitle: "Reserva tu plaza", part: "Parte del total de $2,499", balance: "Saldo restante $2,000", deposit: "Depósito no reembolsable", details: "Más información", pay: "Pagar", reserve: "Reservar" };
  const close = () => setMenuOpen(false);
  const navIds = ["program", "outcome", "investment", "faq"];
  useEffect(() => { document.documentElement.lang = lang.toLowerCase(); }, [lang]);
  return <main id="top">
    <header className="site-header"><Logo /><nav className="desktop-nav" aria-label="Main navigation">{t.nav.map((item, i) => <a href={`#${navIds[i]}`} key={item}>{item}</a>)}</nav><div className="header-actions"><div className="languages" role="group" aria-label={t.language}>{(["EN", "RU", "ES"] as Lang[]).map((item) => <button className={lang === item ? "selected" : ""} type="button" aria-pressed={lang === item} onClick={() => { setLang(item); setCertOpen(null); close(); }} key={item}>{item}</button>)}</div><a className="header-cta" href="#investment">{t.enroll}</a><button className="menu-button" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? t.close : t.open} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div>{menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{t.nav.map((item, i) => <a onClick={close} href={`#${navIds[i]}`} key={item}>{item}</a>)}<a className="mobile-nav-cta" onClick={close} href="#investment">{t.enrollNow}</a></nav>}</header>
    <section className="hero" aria-labelledby="hero-title"><video className="hero-video" autoPlay muted loop playsInline poster={asset("/img/hero-m.jpg")} aria-hidden="true"><source src={asset("/video/hero.mp4")} type="video/mp4" /></video><div className="hero-overlay" aria-hidden="true" /><div className="shell hero-grid"><div className="hero-copy"><p className="eyebrow pink">{t.heroEyebrow}</p><h1 id="hero-title">{t.heroTitle}</h1><p className="hero-lede">{t.heroLede}</p><div className="hero-meta"><span>{t.cohort}</span><span>{t.date}</span><span>{t.places}</span></div><div className="hero-actions"><a className="button button-primary" href="#investment">{t.enrollNow}</a><a className="button button-ghost" href="#investment">{t.reserveSpot}</a></div></div><IlonaCard lang={lang} eyebrow={t.heroEyebrow} cohort={t.cohort} spotsLabel={spotsLabel} /></div><div className="shell hero-facts">{t.facts.map((fact, i) => <span key={fact} className={i === 3 ? "last-fact" : ""}>{fact}</span>).flatMap((node, i, all) => i < all.length - 1 ? [node, <i key={`arrow-${i}`}>→</i>] : [node])}</div></section>
    <section className="brand-strip" aria-label="Academy path">
      <div className="brand-strip-viewport">
        <div className="brand-strip-track">
          {[0, 1].map((i) => <span key={i} aria-hidden={i === 1}>{stripCopy} <b aria-hidden> · </b></span>)}
        </div>
      </div>
    </section>
    <section className="section" id="program"><div className="shell"><div className="section-intro"><div><p className="eyebrow">{t.programEyebrow}</p><h2>{t.programTitle}</h2></div><p>{programIntro}</p></div><div className="program-list">{curriculum.map(([title, summary, detail], i) => <details className="program-item" key={title}><summary><span>0{i + 1}</span><div><h3>{title}</h3><p>{summary}</p></div><b>+</b></summary><div className="program-detail"><p>{detail}</p></div></details>)}</div><div className="path">{t.path.map((item, i) => <span key={item} className={i === 3 ? "path-final" : ""}>{item}</span>).flatMap((node, i, all) => i < all.length - 1 ? [node, <i key={`path-${i}`}>→</i>] : [node])}</div></div></section>
    <section className="method-visual"><div className="shell method-visual-grid"><div className="method-video-shell"><div className="method-image method-video-wrap"><video key={lang} className="method-video" controls preload="metadata" playsInline poster={asset("/img/practice-ru-poster.jpg")} aria-label="AXS INTIMFLEX trainer academy video" src={asset(`/video/practice-${lang.toLowerCase()}.mp4`)}>Your browser does not support video playback.</video></div></div><div><p className="eyebrow pink">{t.practiceEyebrow}</p><h2>{t.practiceTitle}</h2><p>{t.practiceCopy}</p><a className="text-link" href="#outcome">{t.seePaths}</a></div></div></section>
    <section className="section certification" id="outcome" aria-labelledby="certification-title"><div className="shell"><div className="certification-heading"><p className="eyebrow pink">{certification.eyebrow}</p><h2 id="certification-title">{certification.titleLead} <em>{certification.titleAccent}</em></h2></div><div className="certification-grid"><article className="certification-card"><p className="eyebrow pink">{certification.cardEyebrow}</p><h3>{certification.cardTitle}</h3><p className="certification-description">{certification.description}</p><div className="certification-accordion">{certification.items.map(([title, body], index) => <div className={`certification-item${certOpen === index ? " is-open" : ""}`} key={title}><button id={`certification-trigger-${index}`} type="button" aria-expanded={certOpen === index} aria-controls={`certification-panel-${index}`} onClick={() => setCertOpen(certOpen === index ? null : index)}><span>{title}</span><b aria-hidden="true">{certOpen === index ? "−" : "+"}</b>{index === 2 && <small>{certification.optional}</small>}</button><div id={`certification-panel-${index}`} className="certification-panel" role="region" aria-labelledby={`certification-trigger-${index}`}><div><p>{body}</p></div></div></div>)}</div></article><div className="certificate-visual"><div className="certificate-shell"><Image src={asset("/img/academy-certificate-watermarked.jpg")} alt="AXS INTIMFLEX Trainer certificate" width={1280} height={853} sizes="(max-width: 800px) 100vw, 42vw" priority /></div><p>{certification.certificateNote}</p></div></div></div></section>
    <section className="section investment" id="investment"><div className="shell investment-grid"><div className="investment-copy"><p className="eyebrow pink">{t.investment}</p><h2>{t.investTitle}</h2><p>{t.investCopy}</p><div className="royalty-note"><Check size={16} /><span>{t.royaltyShort}</span></div><article className="payment-card reserve-card"><Image src={asset("/img/class-1-20260728.jpg")} alt="AXS INTIMFLEX training" fill sizes="(max-width: 800px) 100vw, 45vw" /><div className="payment-card-shade" /><div className="payment-card-content"><h3>{paymentCopy.reserveTitle}</h3><div className="reserve-copy"><span>{paymentCopy.part}</span><span>{paymentCopy.balance}</span><span>{paymentCopy.deposit}</span></div><div className="payment-card-bottom"><strong>$499</strong><button className="button button-primary" type="button" onClick={() => setPaymentModal("deposit")}>{paymentCopy.reserve}</button><details className="payment-details"><summary>{paymentCopy.details}</summary><p>{t.deposit}</p><ul>{t.includes.map((item) => <li key={item}>{item}</li>)}</ul></details></div></div></article></div><article className="payment-card full-card"><Image src={asset("/img/academy-hero-training-v20260906-new.jpg")} alt="AXS INTIMFLEX Trainer Certification" fill sizes="(max-width: 800px) 100vw, 55vw" /><div className="payment-card-shade" /><div className="payment-card-content"><div className="full-card-heading"><h3><span>Trainer</span> <em>Certification</em></h3><p>{lang === "RU" ? "Онлайн-обучение" : lang === "ES" ? "Formación online" : "Online training"}</p><p>{lang === "RU" ? "Полная оплата" : lang === "ES" ? "Pago completo" : "Full payment"}</p></div><div className="payment-card-bottom"><strong>$2,499</strong><button className="button button-primary" type="button" onClick={() => setPaymentModal("full")}>{paymentCopy.pay}</button><details className="payment-details"><summary>{paymentCopy.details}</summary><p>{t.fullSmall}</p><ul>{t.includes.map((item) => <li key={item}>{item}</li>)}</ul></details></div></div></article></div><div className="shell faq" id="faq"><div><p className="eyebrow pink">{t.faqEyebrow}</p><h3>{t.faqTitle}</h3></div><div>{faqOverrides[lang].map(([question, answer]) => <details className="accordion" key={question}><summary>{question}<b>+</b></summary><p>{answer}</p></details>)}</div></div></section>
    <section className="final-cta"><div className="shell"><p className="eyebrow">{t.finalEyebrow}</p><h2>{t.finalTitle}</h2><p>{t.finalCopy}</p><div className="final-actions"><button className="button button-dark" type="button" onClick={() => setPaymentModal("full")}>{t.enrollNow}</button><button className="button button-dark-outline" type="button" onClick={() => setPaymentModal("deposit")}>{t.reserveSpot}</button></div></div></section>
    <footer className="footer"><div className="shell footer-top"><Logo /><div className="languages" role="group" aria-label={t.language}>{(["EN", "RU", "ES"] as Lang[]).map((item) => <button className={lang === item ? "selected" : ""} type="button" aria-pressed={lang === item} onClick={() => { setLang(item); setCertOpen(null); }} key={item}>{item}</button>)}</div><a href="mailto:academy@axsintimflex.com">academy@axsintimflex.com</a></div><div className="shell footer-bottom"><span>{t.footer}</span><span>© {new Date().getFullYear()} AXS INTIMFLEX</span></div></footer>
    {paymentModal && <CourseLanguageModal variant={paymentModal} siteLang={lang} onClose={() => setPaymentModal(null)} />}
  </main>;
}
