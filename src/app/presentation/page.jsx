"use client";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
const slides = [
  {
    title: "Хронология Великой российской революции",
    subtitle:
      "От февральских событий до окончания гражданской войны (1917–1922)",
    text: "Этот проект посвящён одному из самых драматичных и значимых периодов в истории России. Мы проследим ключевые этапы революции, её причины, ход событий и последствия, которые сформировали облик XX века.",
    image:
      "https://sotni.ru/wp-content/uploads/2023/08/grazhdanskaia-voina-v-rossii-19171922-2.webp",
  },
  {
    title: "Почему это важно?",
    text: "Революция 1917 года стала поворотным моментом не только в российской, но и в мировой истории. Она уничтожила старый порядок, породила новую политическую реальность и повлияла на весь XX век. Понимание этих событий необходимо, чтобы осмыслить природу власти, общества и перемен.",
    image: "https://img.gefter.ru/2018/03/lenin_trotsky.jpg",
  },
  {
    title: "Предпосылки революции",
    text: "Россия начала XX века — это страна контрастов: бурно развивающаяся промышленность и нищета крестьянства, амбициозная интеллигенция и автократия. Неудачи в Русско-японской войне и Первая мировая война лишь усилили недовольство. Самодержавие казалось безнадёжно устаревшим.",
    image:
      "https://icdn.lenta.ru/images/2015/05/27/15/20150527153610478/detail_326f227b05ea88fa86f3482e99ae6c7f.jpg",
  },
  {
    title: "Первая мировая война и её последствия",
    text: "Массовые потери, голод, инфляция и усталость от войны усилили недовольство царской властью и ускорили приближение революции.",
    image:
      "https://homsk.com/upload/media/posts/2017-11/04/d6431b5b70573c616086836b377e6101_1509785188-b.jpg",
  },
  {
    title: "Февральская революция (1917)",
    text: "В феврале 1917 года в Петрограде вспыхнули массовые демонстрации, вызванные нехваткой продовольствия, усталостью от войны и общим недовольством властью. Армия перешла на сторону восставших. Николай II отрёкся от престола. Было образовано Временное правительство.",
    image: "https://aquaviva.ru/upload/iblock/c99/fevral.jpg",
  },
  {
    title: "Двоевластие и кризис управления",
    text: "После февраля в стране установилось двоевластие: с одной стороны — Временное правительство, с другой — Советы, опирающиеся на поддержку рабочих и солдат. Эта нестабильность, а также продолжение войны, вызвали быстрое разочарование в новой власти.",
    image:
      "https://s0.rbk.ru/v6_top_pics/ampresize/media/img/0/68/754998769913680.jpg",
  },
  {
    title: "Апрельские тезисы Ленина",
    text: "Ленин по возвращении из эмиграции провозгласил лозунги, направленные на свержение Временного правительства и переход к социалистической революции.",
    image:
      "https://lh5.googleusercontent.com/proxy/B7ebgwtZ42VFBxuNSKxSLux14lU319_zV3jzWnsAG8xOKx5V7loqgA94ORFkVdkE1uvT86agaHXu4mbJomjTCrKS_AscwBL-c9Jqye76OaNia2W1OAsIEVmb0eTdFDHs5UkU50PcdekUTRoifOW0RUiY-pI-7x6VfnRKqA0WNzq9D2IrOj8OZSnHm_I4HKAxDoR-qQuF5p6tqeR1HKnC5GHsLLKB6jB0CLWLpt4Cy3Ef3Z4",
  },
  {
    title: "Июльские дни и подавление большевиков",
    text: "Массовые протесты в июле 1917 года были подавлены, большевики объявлены вне закона, однако это не остановило рост их популярности.",
    image:
      "https://upload.wikimedia.org/wikipedia/ru/thumb/5/57/%D0%9F%D0%BE%D1%85%D0%BE%D1%80%D0%BE%D0%BD%D1%8B_%D0%B4%D0%BE%D0%BD%D1%86%D0%BE%D0%B2.jpg/500px-%D0%9F%D0%BE%D1%85%D0%BE%D1%80%D0%BE%D0%BD%D1%8B_%D0%B4%D0%BE%D0%BD%D1%86%D0%BE%D0%B2.jpg",
  },
  {
    title: "Корниловский мятеж",
    text: "Попытка генерала Корнилова установить военную диктатуру была пресечена при помощи большевиков, что укрепило их авторитет.",
    image:
      "https://msk.kprf.ru/wp-content/uploads/2017/09/yzbhulyrnrgskjlwgvpjlbnpuvgkzrwxryfmjdewukpfuabawr.jpg",
  },
  {
    title: "Октябрьская революция (1917)",
    text: "В октябре 1917 года большевики во главе с Лениным свергли Временное правительство. Это был вооружённый переворот, но подготовленный глубокой политической и социальной почвой. Была провозглашена власть Советов. Началась социалистическая перестройка страны.",
    image:
      "https://i.bigenc.ru/resizer/resize?sign=B4c88Q64uTPVPRwCuM66Lg&filename=vault/000243ac8ed9a0710e959c43e4957e90.webp&width=1200",
  },
  {
    title: "Декреты новой власти",
    text: "Декрет о мире, земле, рабочем контроле и создании ВЧК стали первыми шагами советской власти. Началась национализация.",
    image: "https://www.grandars.ru/images/1/review/id/234/3eb7a2ed3e.jpg",
  },
  {
    title: "Гражданская война (1918–1922)",
    text: "Сразу после революции началась кровопролитная гражданская война между сторонниками старого порядка (белыми), революционерами (красными), национальными движениями и иностранными интервентами. Война охватила всю территорию бывшей империи и унесла миллионы жизней.",
    image:
      "https://afb4a530-22b8-416e-b47b-cdbbbe63bf2f.selstorage.ru/files/IJ5tynU79Nedz4Rg5qMzyqpvNnxT9UCFcosrbTlr.jpg",
  },
  {
    title: "Военный коммунизм и продразвёрстка",
    text: "Политика жёсткого контроля над экономикой и реквизиций у крестьян вызывала массовое недовольство и повстанческие движения.",
    image:
      "https://centr-intellect.ru/wp-content/uploads/2019/02/%D0%93%D1%80%D0%B0%D0%B6%D0%B4%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F-%D0%B2%D0%BE%D0%B9%D0%BD%D0%B0-3.jpg",
  },
  {
    title: "НЭП и стабилизация",
    text: "После окончания войны большевики перешли к Новой экономической политике (НЭП), что позволило частично восстановить экономику и сдержать кризис.",
    image:
      "https://secretmag.ru/imgs/2024/03/02/19/6379928/4b9ef6a665b06acda18b8f9399932a1d50f0d5ef.jpg",
  },
  {
    title: "Итоги и последствия",
    text: "Победа большевиков привела к образованию СССР. Были национализированы фабрики и земля, разрушена старая элита, установлена однопартийная диктатура. Страна пережила голод, разруху и массовые репрессии, но одновременно началась индустриализация и модернизация.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqzv5aSRvKC1sqh5YIUZf3auMrecqkYJHWPg&s",
  },
  // {
  //   title: "Культурные изменения",
  //   text: "Новая власть провозгласила курс на просвещение, ликвидацию безграмотности и развитие советской культуры. Формировались новые художественные направления, такие как конструктивизм и соцреализм.",
  //   image: "/images/culture.jpg",
  // },
  // {
  //   title: "Международное влияние",
  //   text: "Революция вдохновила левые движения по всему миру и вызвала страх у буржуазных режимов. Возникло Коминтерновское движение, а Запад усилил репрессии против коммунистов.",
  //   image: "/images/international.jpg",
  // },
  {
    // title: "Спасибо за внимание!",
    // subtitle: "История не для забвения — она для осмысления.",
    // text: "Революция — это не только череда фактов, но и урок для будущих поколений. Изучая её, мы лучше понимаем, что происходит сегодня и как избежать повторения трагических ошибок прошлого.",
    width: "800px",

    image:
      "https://risovach.ru/upload/2016/02/mem/hitryj-lenin_105026957_orig_.jpg",
  },
];

export default function RevolutionPresentation() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error enabling fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const slide = slides[index];

  return (
    <div
      ref={containerRef}
      className="group w-screen h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white flex flex-col items-center justify-center px-4 relative overflow-hidden font-sans"
    >
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full max-h-[80vh] overflow-auto text-center p-4 md:p-6 rounded-2xl shadow-2xl bg-zinc-900/70 backdrop-blur-sm border border-zinc-700"
      >
        <div className="flex justify-center mb-6">
          <img
            src={slide.image}
            alt="slide image"
            className={`max-w-full object-contain rounded-xl border border-zinc-700 shadow-md ${
              slide.width ? "w-[380px]" : "w-auto"
            }`}
          />
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold mb-4 text-white tracking-tight">
          {slide.title}
        </h1>

        {slide.subtitle && (
          <h2 className="text-lg md:text-xl mb-3 text-zinc-300 font-medium">
            {slide.subtitle}
          </h2>
        )}

        {slide.text && (
          <p className="text-base md:text-lg text-zinc-400 leading-relaxed text-left break-words whitespace-pre-wrap">
            {slide.text}
          </p>
        )}
      </motion.div>

      <div className="absolute bottom-6 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button
          onClick={prev}
          className="bg-white text-black px-4 py-2 text-base rounded-full shadow-lg hover:bg-zinc-200 transition-all"
        >
          ⬅ Назад
        </button>
        <button
          onClick={next}
          className="bg-white text-black px-4 py-2 text-base rounded-full shadow-lg hover:bg-zinc-200 transition-all"
        >
          Вперёд ➡
        </button>
        <button
          onClick={toggleFullscreen}
          className="bg-zinc-700 text-white px-4 py-2 text-base rounded-full shadow-lg hover:bg-zinc-600 transition-all"
        >
          ⛶ Полноэкранный режим
        </button>
      </div>
    </div>
  );
}
