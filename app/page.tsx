'use client'

import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
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
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Your Final Destination To Become
                    <span className="block text-6xl text-blue-500">
                      Software Developer
                    </span>
                  </h1>
                  <div
                    className="py-4"
                    style={{
                      borderRadius: '0.25rem',
                      border: '1px solid #0080ff',
                      maxWidth: '100%',
                      height: '100%',
                    }}
                  >
                    <div data-vimeo-initialized="true">
                      <div
                        style={{
                          padding: '56.25% 0 0 0',
                          position: 'relative',
                        }}
                      >
                        <iframe
                          src="https://player.vimeo.com/video/918539099?pip=0&quality=undefined&app_id=58479&texttrack=undefined"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                          }}
                          title="11-vimeo"
                          data-ready="true"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-lg text-blueGray-200">
                    <span className="block font-semibold text-2xl">
                      Embark on a Journey:
                    </span>
                    <span className="block text-xl">
                      Master Projects from Beginner to Advanced Levels
                    </span>
                  </p>
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
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        {/* Features Section */}
        <section className="pb-10 bg-blueGray-200 -mt-24">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Features
          </h2>
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {/* Feature Card 1 */}
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold text-indigo-700">
                      Empowering Knowledge Growth
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Our platform offers comprehensive instruction in various
                      programming languages and technologies, empowering users
                      to expand their knowledge and skills.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <i className="fas fa-retweet"></i>
                    </div>
                    <h6 className="text-xl font-semibold text-indigo-700">
                      Free Revisions
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      We focus on providing quality information over quantity.
                      Everything you learn is designed to prepare you for
                      online testing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <i className="fas fa-fingerprint"></i>
                    </div>
                    <h6 className="text-xl font-semibold text-indigo-700">
                      Verified Learning Site
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Explore meticulously researched content thoughtfully
                      curated for your learning journey on our platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}


