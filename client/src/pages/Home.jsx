import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import _ from "lodash";
import "./css/Home.css";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import { FaGithub, FaTelegramPlane } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import ContactHome from "../components/ContactHome";

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  console.log(saleListings);
  console.log(offerListings);

  const lenisRef = useRef();

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      infinite: false,
    });

    function raf(time) {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenisRef.current.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisRef.current.raf(time * 1000);
    });

    // Create animation
    function scrollTrig() {
      gsap.registerPlugin(ScrollTrigger);

      let gsapAnim = gsap.utils.toArray(".gsap__anim");

      gsapAnim.forEach((section) => {
        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
            snap: true,
          },
          yPercent: 100,
          ease: "none",
        });
      });

      let parallaxWrapp = gsap.utils.toArray(".parallax__wrapp");
      parallaxWrapp.forEach((parallax) => {
        gsap.to(parallax, {
          scrollTrigger: {
            trigger: parallax,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          yPercent: -20,
          ease: "none",
        });
      });

      gsap.to(".title-p", {
        scrollTrigger: {
          trigger: "header.header",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        yPercent: 100,
      });

      gsap.to(".title__img img", {
        scrollTrigger: {
          trigger: ".serv",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        rotate: 360,
        ease: "none",
      });

      gsap.to(".title__t", {
        scrollTrigger: {
          trigger: ".serv",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        xPercent: -10,
        ease: "none",
      });

      gsap.to(".serv .stroke", {
        scrollTrigger: {
          trigger: ".serv",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        xPercent: 100,
        ease: "none",
      });

      gsap.to(".serv__item:nth-child(1)", {
        scrollTrigger: {
          trigger: ".serv",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        xPercent: -10,
        ease: "none",
      });

      gsap.to(".serv__item:nth-child(3)", {
        scrollTrigger: {
          trigger: ".serv",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        xPercent: 10,
        ease: "none",
      });

      gsap.to(".listings__list1", {
        scrollTrigger: {
          trigger: ".listings1",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        scale: 1.1,
        ease: "none",
      });

      gsap.to(".listings__list2", {
        scrollTrigger: {
          trigger: ".listings2",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        scale: 1.2,
        ease: "none",
      });

      gsap.to(".listings__list3", {
        scrollTrigger: {
          trigger: ".listings3",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        scale: 1.3,
        ease: "none",
      });

      gsap.to(".approve__star", {
        scrollTrigger: {
          trigger: ".approve",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        rotate: 360,
        ease: "none",
      });
    }
    scrollTrig();

    // resize window
    const debouncedResize = _.debounce(onWindowResize, 500);
    function onWindowResize() {
      console.log("Window resized!");
      window.location.reload();
    }
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  return (
    <div className="wrapp">
      <header className="header  gsap__anim">
        <div className="parallax__wrapp">
          <div className="header__bg">
            <img src="img/1.jpg" alt="" />
            <img src="img/1.jpg" alt="" />
          </div>
          <div className="content title title-p">
            <p className="text-2xl text-[#fff] ">Welcome to our website</p>
            <h1 className="text-[80px] tablet:text-[90px]">
              WE ARE THE BEST<span className="stroke"> Home </span> SHOP
            </h1>
            <button className="hidden tablet:flex text-white p-3 my-8 text-xl bg-[#eb0945]">
              {`Let's explore`}
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        <section className="section gsap__anim serv">
          <div className="parallax__wrapp">
            <div className="content">
              <div className="serv__wrapp">
                <h2 className="title">
                  <span className="title__wrapp">
                    <span className="title__img">
                      <img src="img/star.svg" alt="" />
                    </span>
                    <div className="title__txt">
                      <span className="title__t">Our</span>
                      <span className="stroke">services</span>
                    </div>
                  </span>
                </h2>
                <ul className="serv__list">
                  <li className="serv__item">
                    Creative direction
                    <span className="serv__item-img">
                      <img src="img/s1.png" alt="" />
                    </span>
                  </li>
                  <li className="serv__item">
                    Fast & credible
                    <span className="serv__item-img">
                      <img src="img/s2.png" alt="" />
                    </span>
                  </li>
                  <li className="serv__item">
                    Quality assurance
                    <span className="serv__item-img">
                      <img src="img/s3.png" alt="" />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section gsap__anim  listings1">
          <div className="parallax__wrapp">
            <div className="content">
              {offerListings && offerListings.length > 0 && (
                <div className="mt-[5%] text-white listings__list1">
                  <div className="flex justify-between gap-2 mb-6">
                    <h1 className="text-2xl md:text-3xl font-semibold">
                      Recent offers
                    </h1>
                    <Link
                      to={`/search?offer=true`}
                      className="text-gray-300 underline"
                    >
                      <button className="uppercase text-sm border px-2 md:px-4 text-white font-semibold  py-2">
                        Show more
                      </button>
                    </Link>
                  </div>

                  <div className="flex flex-wrap listings__list mt-[20px] gap-4 justify-between">
                    {offerListings.map((listing) => (
                      <ListingItem listing={listing} key={listing._id} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="section gsap__anim  listings2">
          <div className="parallax__wrapp">
            <div className="content">
              {saleListings && saleListings.length > 0 && (
                <div className="mt-[5%] text-white listings__list2">
                  <div className="flex justify-between gap-2 mb-6">
                    <h1 className="text-2xl md:text-3xl font-semibold">
                      Recent sales
                    </h1>
                    <Link
                      to={`/search?type=sale`}
                      className="text-gray-300 underline"
                    >
                      <button className="text-sm uppercase border px-2 md:px-4 text-white font-semibold  py-2">
                        Show more
                      </button>
                    </Link>
                  </div>

                  <div className="flex flex-wrap listings__list mt-[20px] gap-4 justify-between">
                    {saleListings.map((listing) => (
                      <ListingItem listing={listing} key={listing._id} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="section gsap__anim  listings3">
          <div className="parallax__wrapp">
            <div className="content">
              {rentListings && rentListings.length > 0 && (
                <div className="mt-[5%] text-white listings__list3">
                  <div className="flex justify-between gap-2 mb-6">
                    <h1 className="text-2xl md:text-3xl font-semibold">
                      Recent rents
                    </h1>
                    <Link
                      to={`/search?type=rent`}
                      className="text-gray-300 underline"
                    >
                      <button className="text-sm uppercase border px-2 md:px-4 text-white font-semibold  py-2">
                        Show more
                      </button>
                    </Link>
                  </div>

                  <div className="flex flex-wrap listings__list mt-[20px] gap-4 justify-between">
                    {rentListings.map((listing) => (
                      <ListingItem listing={listing} key={listing._id} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="section gsap__anim approve">
          <div className="parallax__wrapp">
            <div className="content">
              <div className="approve__wrapp">
                <span className="approve__txt">
                  <span className="approve__star">
                    <img src="img/star.svg" alt="" />
                  </span>
                  <span className="approve__ix">BEST QUANTITY</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="header gsap__anim bg-white">
          <div className="parallax__wrapp text-white">
            <div className="flex flex-col md:flex-row justify-between gap-20 max-container">
              <div className="w-full md:w-4/5">
                <ContactHome />
              </div>
              <div className="w-2/5 hidden md:block space-y-4">
                <div>
                  <h1 className="text-lg uppercase">Our address</h1>
                  <p className="mt-4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Possimus fuga iure perferendis est esse id vitae ut
                    voluptatum unde voluptate?
                  </p>
                </div>

                <div>
                  <div className="text-lg uppercase">OUR SOCIAL</div>
                  <ul className="flex space-x-4 mt-4">
                    <li>
                      <a
                        href="https://t.me/nwin2004"
                        className="flex items-center space-x-2"
                      >
                        <FaTelegramPlane />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/nandarwin19"
                        className="flex items-center space-x-2"
                      >
                        <FaGithub />
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:nwin21210@gmail.com"
                        className="flex items-center space-x-2"
                      >
                        <MdEmail />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-4">
              <p className="text-center flex text-sm text-gray-600 font-semibold">
                Created by&nbsp;
                <span className="text-[#acabab] hover:underline font-bold">
                  <a
                    href="https://github.com/nandarwin19"
                    className="flex items-center space-x-2"
                  >
                    nwin
                  </a>
                </span>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
