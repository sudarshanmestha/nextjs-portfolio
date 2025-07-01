'use client'

import Head from 'next/head'
import { useEffect } from 'react'
import AOS from 'aos'
// import useSWR from 'swr';
import 'aos/dist/aos.css'

// const fetcher = (...args) => fetch(...args).then(res => res.json())


export default function Page() {
  // const {data, error, isLoading} = useSWR("http://127.0.0.1:8001/api/hello", fetcher)
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])
  
  // if (error) return <div>failed to load</div>
  // if (isLoading) return <div>loading...</div>
  

  return (
    <>
      <Head>
        <title>Become a Software Developer | JustPython</title>
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
        />
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
        />
      </Head>

      <section className="relative bg-blueGray-50">
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80')",
            }}
          >
            <div className="w-full h-full absolute bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
          </div>

          <div className="container relative mx-auto" data-aos="fade-up">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 mx-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-bold text-5xl leading-tight">
                    Your Final Destination To Become
                    <span className="block text-6xl text-blue-400 mt-2">
                      Software Developer
                    </span>
                  </h1>
                  {/* <div>{JSON.stringify(data)}</div>       */}


                  <div
                    className="my-6 rounded-lg border-2 border-blue-500 overflow-hidden shadow-lg"
                    data-aos="zoom-in"
                  >
                    <div className="relative pb-[56.25%]">
                      <iframe
                        src="https://player.vimeo.com/video/918539099?pip=0&quality=1080p&app_id=58479"
                        className="absolute top-0 left-0 w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        title="Intro Video"
                      />
                    </div>
                  </div>

                  <p className="mt-6 text-lg text-blueGray-200">
                    <span className="block font-semibold text-2xl text-white">
                      Embark on a Journey:
                    </span>
                    <span className="block text-xl text-blueGray-100">
                      Master Projects from Beginner to Advanced Levels
                    </span>
                  </p>

                  <button onClick={() => window.open('https://forms.gle/4K42hcZPtomfHYUZ9', '_blank')} className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300">
                    Get Started Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: 'translateZ(0px)' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              viewBox="0 0 2560 100"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        {/* Features Section */}
        <section className="pb-16 bg-blueGray-200 -mt-24">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12" data-aos="fade-down">
            Why Choose Us
          </h2>
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {[
                {
                  icon: 'fas fa-award',
                  title: 'Empowering Knowledge Growth',
                  color: 'bg-red-500',
                  desc: 'Comprehensive courses to elevate your programming journey.',
                },
                {
                  icon: 'fas fa-retweet',
                  title: 'Free Revisions',
                  color: 'bg-blue-400',
                  desc: 'High-quality, exam-ready content with revision support.',
                },
                {
                  icon: 'fas fa-fingerprint',
                  title: 'Verified Learning Site',
                  color: 'bg-emerald-500',
                  desc: 'Expert-curated content trusted by learners across the globe.',
                },
              ].map((feature, i) => (
                <div
                  className="w-full md:w-4/12 px-4 text-center"
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={`${i * 100}`}
                >
                  <div className="bg-white rounded-lg shadow-lg p-6 mb-8 hover:shadow-xl transition duration-300">
                    <div
                      className={`text-white p-4 inline-flex items-center justify-center w-14 h-14 mb-4 rounded-full shadow-lg ${feature.color}`}
                    >
                      <i className={feature.icon}></i>
                    </div>
                    <h6 className="text-xl font-semibold text-gray-800">{feature.title}</h6>
                    <p className="mt-3 text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </>
  )
}
