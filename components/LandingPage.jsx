"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Beaker,
  Citrus,
  Droplets,
  Leaf,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Instagram,
  Facebook,
  Twitter,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const navItems = [
  { label: "Shop", href: "#products" },
  { label: "Products", href: "#products" },
  { label: "Nutrition", href: "#nutrition" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const products = [
  {
    title: "OASIS Mango Classic",
    desc: "A silky tropical blend with bright mango sweetness and a juicy finish.",
    image: "/OASIS-EXOTIC-MANGO/assets/product1.png",
  },
  {
    title: "OASIS Mango Gold",
    desc: "A richer and bolder pour crafted for a deep, premium mango character.",
    image: "/OASIS-EXOTIC-MANGO/assets/product2.png",
  },
  {
    title: "OASIS Mango Spark",
    desc: "An uplifting mango profile with a clean, fresh taste for every moment.",
    image: "/OASIS-EXOTIC-MANGO/assets/product3.png",
  },
];

const features = [
  { title: "100% Juice Blend", icon: Droplets },
  { title: "Rich in Vitamin C", icon: Citrus },
  { title: "No Artificial Additives", icon: Leaf },
  { title: "Made with Real Mango", icon: Sparkles },
];

const nutritionFacts = [
  "No Sugar Added",
  "High in Vitamin C",
  "100% Juice Blend",
  "No Artificial Colors or Flavors",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function LandingPage() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const loadedFramesRef = useRef([]);
  const displayedFrameRef = useRef(1);
  const currentFrameValue = useRef(1);
  const targetFrameValue = useRef(1);
  const rafRef = useRef(null);
  const [heroProgress, setHeroProgress] = useState(0);

  const heroFrames = useMemo(
    () =>
      Array.from(
        { length: 192 },
        (_, i) =>
          `/OASIS-EXOTIC-MANGO/hero-section/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`,
      ),
    [],
  );

  useEffect(() => {
    const drawFrame = (frameNumber) => {
      const canvas = canvasRef.current;
      const frame = loadedFramesRef.current[frameNumber - 1];

      if (!canvas || !frame || !frame.complete) {
        return false;
      }

      const context = canvas.getContext("2d");
      if (!context) {
        return false;
      }

      const dpr = window.devicePixelRatio || 1;
      const cssWidth = canvas.clientWidth;
      const cssHeight = canvas.clientHeight;

      if (
        canvas.width !== Math.floor(cssWidth * dpr) ||
        canvas.height !== Math.floor(cssHeight * dpr)
      ) {
        canvas.width = Math.floor(cssWidth * dpr);
        canvas.height = Math.floor(cssHeight * dpr);
      }

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imageRatio = frame.naturalWidth / frame.naturalHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth;
      let drawHeight;
      let offsetX;
      let offsetY;

      if (imageRatio > canvasRatio) {
        drawHeight = canvasHeight;
        drawWidth = drawHeight * imageRatio;
        offsetX = (canvasWidth - drawWidth) * 0.5;
        offsetY = 0;
      } else {
        drawWidth = canvasWidth;
        drawHeight = drawWidth / imageRatio;
        offsetX = 0;
        offsetY = (canvasHeight - drawHeight) * 0.5;
      }

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(frame, offsetX, offsetY, drawWidth, drawHeight);
      return true;
    };

    const preloadFrames = () => {
      loadedFramesRef.current = new Array(heroFrames.length);

      heroFrames.forEach((src, index) => {
        const frame = new window.Image();
        frame.decoding = "async";
        frame.src = src;

        frame.onload = () => {
          loadedFramesRef.current[index] = frame;

          if (index === 0) {
            drawFrame(1);
            displayedFrameRef.current = 1;
          }
        };
      });
    };

    const updateTargetFromScroll = () => {
      const heroEl = heroRef.current;
      if (!heroEl) {
        return;
      }

      const start = heroEl.offsetTop;
      const end = start + heroEl.offsetHeight - window.innerHeight;
      const total = Math.max(1, end - start);
      const progress = Math.min(
        1,
        Math.max(0, (window.scrollY - start) / total),
      );

      const speedMultiplier = 1.28;
      const accelerated = Math.min(1, progress * speedMultiplier);
      const nextTarget = accelerated * (heroFrames.length - 1) + 1;

      targetFrameValue.current = nextTarget;
      setHeroProgress(progress);
    };

    const animateFrames = () => {
      const current = currentFrameValue.current;
      const target = targetFrameValue.current;
      const smoothed = current + (target - current) * 0.15;

      currentFrameValue.current = smoothed;

      const rounded = Math.max(
        1,
        Math.min(heroFrames.length, Math.round(smoothed)),
      );

      if (rounded !== displayedFrameRef.current) {
        const frameWasDrawn = drawFrame(rounded);
        if (frameWasDrawn) {
          displayedFrameRef.current = rounded;
        }
      }

      rafRef.current = window.requestAnimationFrame(animateFrames);
    };

    preloadFrames();
    updateTargetFromScroll();
    rafRef.current = window.requestAnimationFrame(animateFrames);

    const handleResize = () => {
      updateTargetFromScroll();
      drawFrame(displayedFrameRef.current);
    };

    window.addEventListener("scroll", updateTargetFromScroll, {
      passive: true,
    });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", updateTargetFromScroll);
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [heroFrames]);

  const rightParallax = `${-30 * heroProgress}px`;
  const leftParallax = `${24 * heroProgress}px`;

  return (
    <main className="mango-bg min-h-screen text-[#4a2c00]">
      <header className="sticky top-0 z-50 border-b border-white/35 bg-[#fff8e1]/75 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
          <a
            href="#top"
            className="font-display text-2xl font-extrabold tracking-wide text-[#7a3d00]"
          >
            OASIS
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-[#6f3a00] transition hover:text-[#ff8f00]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="rounded-full border border-[#f3c165] bg-white/70 p-2 text-[#8b4a00] transition hover:scale-105 hover:bg-white">
              <ShoppingCart size={18} />
            </button>
            <button className="rounded-full bg-gradient-to-r from-[#ffa726] via-[#ffad33] to-[#ffd54f] px-5 py-2 text-sm font-bold text-[#603000] shadow-glow transition hover:scale-105">
              Login
            </button>
          </div>
        </div>
      </header>

      <section id="top" ref={heroRef} className="relative h-[250vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full bg-[#d98000]"
          />

          <div className="hero-overlay absolute inset-0" />

          <motion.div
            className="absolute -left-24 top-12 h-64 w-64 rounded-full bg-[#fff2ca]/60 blur-3xl"
            animate={{ y: [0, 24, 0], x: [0, 8, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-12 right-4 h-72 w-72 rounded-full bg-[#ffca63]/45 blur-3xl"
            animate={{ y: [0, -18, 0], x: [0, -12, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-cols-1 gap-8 px-5 py-24 md:grid-cols-2 md:px-8">
            <motion.div
              style={{ transform: `translateY(${leftParallax})` }}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col justify-center"
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-[#ffe7b4]">
                Premium tropical blend
              </p>
              <h1 className="font-display text-5xl leading-[0.95] text-[#fff8e1] drop-shadow-[0_7px_16px_rgba(83,40,1,0.5)] sm:text-7xl lg:text-8xl">
                OASIS
                <br />
                EXOTIC MANGO
              </h1>
              <p className="mt-6 max-w-xl text-lg font-medium text-[#fff3d4] md:text-xl">
                Indulge in a refreshing tropical mango experience
              </p>
              <div className="mt-10">
                <button className="rounded-full bg-gradient-to-r from-[#ff8f00] via-[#ffa726] to-[#ffd54f] px-9 py-4 text-lg font-extrabold text-[#5f2f00] shadow-[0_14px_30px_rgba(255,143,0,0.45)] transition duration-300 hover:scale-105 hover:shadow-[0_18px_36px_rgba(255,186,88,0.58)]">
                  Order Now
                </button>
              </div>
            </motion.div>

            <div className="relative flex items-center justify-center">
              <motion.div
                style={{ transform: `translateY(${rightParallax})` }}
                className="relative h-[76vh] w-full max-w-xl"
              >
                <motion.div
                  className="absolute left-[8%] top-[8%] h-16 w-16 rounded-full bg-[#ffde97] shadow-soft"
                  animate={{ y: [0, 20, 0], rotate: [0, 8, 0] }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute right-[9%] top-[18%] h-12 w-12 rounded-full bg-[#fff2cc] shadow-soft"
                  animate={{ y: [0, -18, 0], rotate: [0, -8, 0] }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="glossy-panel absolute left-[4%] top-[22%] w-36 rounded-[1.75rem] p-3 sm:w-44"
                  animate={{ y: [0, -12, 0], rotate: [0, -3, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/OASIS-EXOTIC-MANGO/assets/product1.png"
                    width={200}
                    height={280}
                    alt="OASIS Mango Classic bottle"
                    className="h-auto w-full object-contain"
                    priority
                  />
                </motion.div>

                <motion.div
                  className="glossy-panel absolute right-[5%] top-[4%] w-32 rounded-[1.5rem] p-3 sm:w-40"
                  animate={{ y: [0, 10, 0], rotate: [0, 4, 0] }}
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                >
                  <Image
                    src="/OASIS-EXOTIC-MANGO/assets/product2.png"
                    width={180}
                    height={240}
                    alt="OASIS Mango Gold bottle"
                    className="h-auto w-full object-contain"
                  />
                </motion.div>

                <motion.div
                  className="glossy-panel absolute bottom-[3%] right-[12%] w-40 rounded-[1.8rem] p-4 sm:w-48"
                  animate={{ y: [0, -14, 0], rotate: [0, 2.5, 0] }}
                  transition={{
                    duration: 7.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                >
                  <Image
                    src="/OASIS-EXOTIC-MANGO/assets/product3.png"
                    width={240}
                    height={320}
                    alt="OASIS Mango Spark bottle"
                    className="h-auto w-full object-contain"
                  />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 left-[32%] h-24 w-24 rounded-full border border-[#ffe8b6]/70 bg-gradient-to-br from-[#fff4d4] to-[#ffc252]/80 blur-[1px]"
                  animate={{ y: [0, 12, 0], x: [0, 8, 0] }}
                  transition={{
                    duration: 8.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <motion.section
        id="products"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto mt-20 w-full max-w-7xl px-5 pb-6 sm:px-8"
      >
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#8f4d06]">
              Signature collection
            </p>
            <h2 className="section-title">Choose Your Mango Mood</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, idx) => (
            <motion.article
              key={product.title}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              whileHover={{ y: -10 }}
              className="group glossy-panel rounded-3xl p-5"
            >
              <div className="relative mb-4 h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-[#fff8e1]/85 to-[#ffd182]/70">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-contain p-4 transition duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#6f3a00]">
                {product.title}
              </h3>
              <p className="mt-3 text-[0.98rem] text-[#7d4b08]">
                {product.desc}
              </p>
              <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff8f00] via-[#ffa726] to-[#ffd54f] px-5 py-2.5 text-sm font-bold text-[#5f2f00] shadow-glow transition hover:scale-[1.03]">
                <ShoppingBag size={16} />
                Buy Now
              </button>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="nutrition"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8 }}
        className="mx-auto mt-20 w-full max-w-7xl px-5 sm:px-8"
      >
        <div className="glossy-panel grid overflow-hidden rounded-[2rem] md:grid-cols-2">
          <div className="relative min-h-[380px] bg-gradient-to-br from-[#ffeebf] to-[#ffc95f] p-6">
            <Image
              src="/OASIS-EXOTIC-MANGO/assets/Nutrition facts.png"
              alt="Nutrition fact label"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-6"
            />
          </div>

          <div className="p-8 sm:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#9a5400]">
              What is inside
            </p>
            <h2 className="section-title">Nutrition That Matters</h2>
            <ul className="mt-8 space-y-4">
              {nutritionFacts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-center gap-3 text-lg font-semibold text-[#6f3a00]"
                >
                  <span className="soft-icon">
                    <CheckCircle2 size={20} className="text-[#ff8f00]" />
                  </span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      <section
        id="about"
        className="mx-auto mt-20 w-full max-w-7xl px-5 pb-10 sm:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#8f4d06]">
            Why OASIS
          </p>
          <h2 className="section-title">Crafted For Pure Tropical Enjoyment</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="glossy-panel rounded-3xl p-6"
              >
                <div className="soft-icon">
                  <Icon size={22} className="text-[#ff8f00]" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-[#6f3a00]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#875118]">
                  Clean ingredients, vibrant flavor, and a smooth premium finish
                  in every pour.
                </p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <footer
        id="contact"
        className="mt-16 border-t border-white/40 bg-[#fff4d4]/70 backdrop-blur-md"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-3">
          <div>
            <h3 className="font-display text-3xl font-extrabold text-[#6f3600]">
              OASIS
            </h3>
            <p className="mt-3 max-w-sm text-[#7c4a11]">
              Luxury tropical refreshment with real mango character, crafted to
              brighten every sip.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-[#7a4609]">
            <a href="#shop" className="transition hover:text-[#ff8f00]">
              Shop
            </a>
            <a href="#products" className="transition hover:text-[#ff8f00]">
              Products
            </a>
            <a href="#nutrition" className="transition hover:text-[#ff8f00]">
              Nutrition
            </a>
            <a href="#about" className="transition hover:text-[#ff8f00]">
              About
            </a>
          </div>

          <div className="flex items-start gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="soft-icon text-[#ff8f00]"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="soft-icon text-[#ff8f00]"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="soft-icon text-[#ff8f00]"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              aria-label="Mixology"
              className="soft-icon text-[#ff8f00]"
            >
              <Beaker size={18} />
            </a>
          </div>
        </div>

        <div className="border-t border-white/45 px-5 py-4 text-center text-sm text-[#8e5920] sm:px-8">
          Copyright {new Date().getFullYear()} OASIS Exotic Mango. All rights
          reserved. Made with love ❤️ by KM SHAHRIAR HOSSAIN
        </div>
      </footer>
    </main>
  );
}
