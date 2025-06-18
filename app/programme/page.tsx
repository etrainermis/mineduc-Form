import Image from "next/image"
import Navbar from "../landing/navbar"
import Footer from "../landing/footer"

export default function Programme() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 md:px-8 pt-8 mb-8 px-5">
        <h1 className="text-4xl font-bold text-center my-12">
          EXPLORE <span className="text-[#00A9DE]">RWANDA FUTURE SKILLS FORUM PROGRAM</span>
        </h1>

        {/* Main Program Grid - Desktop Only */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
          {/* Column headers with dates */}
          <div className="text-center font-medium">2nd June</div>
          <div className="text-center font-medium">3rd June</div>
          <div className="text-center font-medium">4th June</div>
          <div className="text-center font-medium">5th June</div>
          <div className="text-center font-medium">6th June</div>

          {/* 2nd June - TVET Expo - Taller to match Global Skills Connect */}
          <div className="relative rounded-lg overflow-hidden" style={{ gridRow: "span 2", height: "400px" }}>
            <Image src="/tvetbg.jpg" alt="TVET Expo" width={225} height={400} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-[#8B000380]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold">TVET Expo</h3>
            </div>
          </div>

          {/* 3rd June - TVET Expo - Taller to match Global Skills Connect */}
          <div className="relative rounded-lg overflow-hidden" style={{ gridRow: "span 2", height: "400px" }}>
            <Image src="/tvet2.png" alt="TVET Expo" width={225} height={400} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-[#8B000380]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold">TVET Expo</h3>
            </div>
          </div>

          {/* 4th June - TVET Expo */}
          <div className="relative rounded-lg overflow-hidden" style={{ height: "250px" }}>
            <Image src="/bgone.jpg" alt="TVET Expo" width={225} height={250} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-[#8B000380]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold">TVET Expo</h3>
            </div>
          </div>

          {/* 5th June - Skills Competition */}
          <div className="relative rounded-lg overflow-hidden" style={{ height: "250px" }}>
            <Image
              src="/competition.jpg"
              alt="Skills Competition"
              width={225}
              height={250}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#08112980]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold text-center">
                Skills
                <br />
                Competition
              </h3>
            </div>
          </div>

          {/* 6th June - Interministerial Summit */}
          <div className="relative rounded-lg overflow-hidden" style={{ height: "250px" }}>
            <Image
              src="/intermini.jpg"
              alt="Interministerial Summit"
              width={225}
              height={250}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#00A9DE80]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold text-center">
                Interministerial
                <br />
                Summit
              </h3>
            </div>
          </div>

          {/* Global Skills Connect - spans columns 3-4 */}
          <div className="col-start-3 col-span-2 relative rounded-lg overflow-hidden" style={{ height: "120px" }}>
            <Image
              src="/bgthree.jpg"
              alt="Global Skills Connect"
              width={450}
              height={120}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#23AF57B2]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold">Global Skills Connect</h3>
            </div>
          </div>

          {/* Closing Ceremony */}
          <div className="col-start-5 relative rounded-lg overflow-hidden" style={{ height: "120px" }}>
            <Image
              src="/close.jpg"
              alt="Closing Ceremony"
              width={225}
              height={120}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#08112980]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-lg font-bold text-center">
                Closing
                <br />
                Ceremony
              </h3>
            </div>
          </div>
        </div>

        {/* Mobile version - simplified stacked layout */}
        <div className="md:hidden space-y-4">
          {/* Mobile content (simplified) */}
          {/* ... (keeping the mobile version as is) ... */}
        </div>

        {/* GLOBAL SKILLS CONNECT Program Section - Improved Layout */}
        <div className="container mx-auto px-4 md:px-8 py-12">
          {/* Global Skills Connect Program Title */}
          <div className=" p-4 mb-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center">GLOBAL SKILLS CONNECT CONFERENCE PROGRAM</h2>
          </div>

          {/* Main Program Grid - Improved Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Row 1: Global Skills Connect + Interministerial Summit */}
            <div className="md:col-span-8 relative rounded-lg overflow-hidden h-32">
              <Image
                src="/bgthree.jpg"
                alt="Global Skills Connect"
                width={800}
                height={128}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#23AF57B2]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">Global Skills Connect</h3>
              </div>
            </div>

            {/* Interministerial Summit - Right Column (spans 3 rows) */}
            <div className="md:col-span-4 md:row-span-3 relative rounded-lg overflow-hidden h-80 md:h-full">
              <Image
                src="/intermini.jpg"
                alt="Interministerial Summit"
                width={300}
                height={500}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#00A9DE80]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold text-center">
                  Interministerial
                  <br />
                  Summit
                </h3>
              </div>
            </div>

            {/* Row 2: Workshop + Networking 1 + Networking 2 */}
            <div className="md:col-span-3 relative rounded-lg overflow-hidden h-80">
              <Image
                src="/workshop.jpg"
                alt="Workshop"
                width={240}
                height={320}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#8B000380]"></div>
              <div className="absolute inset-0 flex flex-col p-4">
                <h3 className="text-white text-lg font-bold mb-4">Workshop</h3>
                <div className="text-white text-sm space-y-2">
                  <p>WS1 Quality: Excellence in TVET</p>
                  <p>WS2 Relevance: PPP for Skills Development</p>
                  <p>WS3 Access: Inclusion in TVET</p>
                  <p>WS4 Innovation: Digitalisation of TVET</p>
                  <p>WS5: Skills Outlook</p>
                  <p>WS6: TVET and Emerging technologies
                  </p>
                  <p>WS7: Future ready and Inclusive workforce </p>
                  <p>WS8: Nurturing talents to accelerate the Innovation ecosystem</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 relative rounded-lg overflow-hidden h-80">
              <Image
                src="/net1.jpg"
                alt="Networking and Knowledge Exchange 1"
                width={160}
                height={320}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#08112980]"></div>
              <div className="absolute inset-0 flex items-center justify-center p-2">
                <h3 className="text-white text-base font-bold text-center">Networking and Knowledge Exchange 1</h3>
              </div>
            </div>

            <div className="md:col-span-3 relative rounded-lg overflow-hidden h-80">
              <Image
                src="/net2.jpg"
                alt="Networking and Knowledge Exchange 2"
                width={240}
                height={320}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#08112980]"></div>
              <div className="absolute inset-0 flex items-center justify-center p-2">
                <h3 className="text-white text-base font-bold text-center">Networking and Knowledge Exchange 2</h3>
              </div>
            </div>

            {/* Row 3: Plenary Session */}
            <div className="md:col-span-8 relative rounded-lg overflow-hidden h-40">
              <Image
                src="/bgthree.jpg"
                alt="Plenary Session"
                width={640}
                height={160}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#23AF57B2]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">Plenary Session</h3>
              </div>
            </div>

            {/* Row 4: Visit TVET Expo + Skills Competition */}
            <div className="md:col-span-5 relative rounded-lg overflow-hidden h-40">
              <Image
                src="/net1.jpg"
                alt="Visit TVET Expo"
                width={400}
                height={160}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#8B000380]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">Visit TVET Expo</h3>
              </div>
            </div>

            <div className="md:col-span-3 relative rounded-lg overflow-hidden h-40">
              <Image
                src="/skillsco.jpg"
                alt="Skills Competition"
                width={240}
                height={160}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#08112980]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-lg font-bold text-center">Skills Competition</h3>
              </div>
            </div>
            <div className="md:col-span-4 md:row-span-3 relative rounded-lg overflow-hidden h-40">
              <Image
                src="/close.jpg"
                alt="Closing ceremony"
                width={240}
                height={160}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#08112980]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-lg font-bold text-center">Closing Ceremony</h3>
              </div>
            </div>
            
          </div>
          
        </div>

        {/* Day Header */}
        <h2 className="text-2xl font-bold text-center mb-6 mt-8">WEDNESDAY, 4th JUNE</h2>

        {/* Morning Sessions Grid */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          {/* Registration */}
          <div className="col-span-12 md:col-span-4 relative rounded-lg overflow-hidden h-48 md:h-64">
            <Image
              src="/registra.jpg"
              alt="Registration"
              width={320}
              height={256}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#08112980] bg-opacity-40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-white text-xl font-medium">Registration</h3>
              <p className="text-white text-sm mt-2">8:00-9:00</p>
            </div>
          </div>

          {/* Welcome and Opening + Keynote + Presentation */}
          <div className="col-span-12 md:col-span-4 grid grid-rows-3 gap-4 h-48 md:h-64">
            {/* Welcome and Opening Remarks */}
            <div className="row-span-1 relative rounded-lg overflow-hidden">
              <Image
                src="/welcome.jpg"
                alt="Welcome and Opening Remarks"
                width={320}
                height={80}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#8B000380] bg-opacity-70"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="text-white text-sm font-medium text-center">Welcome and Opening Remarks</h3>
                <p className="text-white text-sm text-center mt-1">9:00-10:00</p>
              </div>
            </div>

            {/* Keynote Speech */}
            <div className="row-span-1 relative rounded-lg overflow-hidden">
              <Image
                src="/keynote.jpg"
                alt="Keynote Speech"
                width={320}
                height={80}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#8B000380] bg-opacity-70"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="text-white text-sm font-medium text-center">Keynote speech</h3>
                <p className="text-white text-sm text-center mt-1">9:00-10:00</p>
              </div>
            </div>

            {/* Presentation of the objectives and agenda */}
            <div className="row-span-1 relative rounded-lg overflow-hidden">
              <Image
                src="/presenta.jpg"
                alt="Presentation of the objectives and agenda"
                width={320}
                height={80}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#8B000380] bg-opacity-70"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h3 className="text-white text-sm font-medium text-center">
                  Presentation of the objectives and agenda
                </h3>
                <p className="text-white text-sm text-center mt-1">9:00-10:00</p>
              </div>
            </div>
          </div>

          {/* Panel Discussion */}
          <div className="col-span-12 md:col-span-4 relative rounded-lg overflow-hidden h-48 md:h-64">
            <Image
              src="/panel.jpg"
              alt="Panel Discussion"
              width={320}
              height={256}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#08112980] bg-opacity-40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-white text-xl font-medium">Panel Discussion</h3>
              <p className="text-white text-sm mt-2">10:00-11:00</p>
            </div>
          </div>
        </div>

        {/* Coffee Break */}
        <div className="relative rounded-lg overflow-hidden h-16 mb-4">
          <Image src="/coffee.jpg" alt="Coffee Break" width={1024} height={64} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-[#08112980] bg-opacity-60"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-white text-lg font-medium">Coffee Break</h3>
            <p className="text-white text-sm mt-1">11:00-11:30</p>
          </div>
        </div>

        {/* Morning Workshops */}
        <div className="mb-4 text-center">
          <h3 className="text-lg font-medium">
            Workshops (Parallel Sessions) <span className="text-gray-600 text-sm">11:30-13:00</span>
          </h3>
        </div>
        <div className="grid grid-cols-12 gap-4 mb-4">
          {/* WS1 Quality */}
          <div className="col-span-6 md:col-span-3 relative rounded-lg overflow-hidden h-24">
            <Image src="/ws.jpg" alt="WS1 Quality" width={240} height={96} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-[#23AF57B2] bg-opacity-80"></div>
            <div className="absolute inset-0 flex items-center justify-center p-2">
              <h3 className="text-white text-xs md:text-sm font-medium text-center">
                WS1 QUALITY: Technical and Vocational Excellence
              </h3>
            </div>
          </div>

          {/* WS2 Relevance */}
          <div className="col-span-6 md:col-span-3 relative rounded-lg overflow-hidden h-24">
            <Image src="/ws.jpg" alt="WS2 Relevance" width={240} height={96} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-[#23AF57B2] bg-opacity-80"></div>
            <div className="absolute inset-0 flex items-center justify-center p-2">
              <h3 className="text-white text-xs md:text-sm font-medium text-center">
                WS2 RELEVANCE: Private Sector Engagement in Skills Development
              </h3>
            </div>
          </div>

          {/* WS3 Access */}
          <div className="col-span-6 md:col-span-3 relative rounded-lg overflow-hidden h-24">
            <Image src="/ws.jpg" alt="WS3 Access" width={240} height={96} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-[#23AF57B2] bg-opacity-80"></div>
            <div className="absolute inset-0 flex items-center justify-center p-2">
              <h3 className="text-white text-xs md:text-sm font-medium text-center">
                WS3 INCLUSION: Accessible Skills Ecosystems
              </h3>
            </div>
          </div>

          {/* WS4 Innovation */}
          <div className="col-span-6 md:col-span-3 relative rounded-lg overflow-hidden h-24">
            <Image src="/ws.jpg" alt="WS4 Innovation" width={240} height={96} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-[#23AF57B2] bg-opacity-80"></div>
            <div className="absolute inset-0 flex items-center justify-center p-2">
              <h3 className="text-white text-xs md:text-sm font-medium text-center">
                WS4 INNOVATION: Technology Skills
              </h3>
            </div>
          </div>
        </div>

        {/* Lunch */}
        <div className="relative rounded-lg overflow-hidden h-16 mb-4">
          <Image src="/lunch.jpg" alt="Lunch" width={1024} height={64} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-[#08112980] bg-opacity-60"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-white text-lg font-medium">Lunch</h3>
            <p className="text-white text-sm mt-1">13:00-14:30</p>
          </div>
        </div>

        {/* Afternoon Workshops */}
        <div className="mb-4 text-center">
          <h3 className="text-lg font-medium">
            Workshops (Parallel Sessions) <span className="text-gray-600 text-sm">14:30-16:00</span>
          </h3>
        </div>
        <div className="grid grid-cols-12 gap-4 mb-4">
          {/* WS5 */}
          <div className="col-span-6 md:col-span-3 relative rounded-lg overflow-hidden h-24">
            <Image src="/ws.jpg" alt="WS5" width={240} height={96} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-[#23AF57B2] bg-opacity-80"></div>
            <div className="absolute inset-0 flex items-center justify-center p-2">
              <h3 className="text-white text-xs md:text-sm font-medium text-center">WS5: Skills Outlook</h3>
            </div>
          </div>

          {/* WS6 */}
          <div className="col-span-6 md:col-span-3 relative rounded-lg overflow-hidden h-24">
            <Image src="/ws.jpg" alt="WS6" width={240} height={96} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-[#23AF57B2] bg-opacity-80"></div>
            <div className="absolute inset-0 flex items-center justify-center p-2">
              <h3 className="text-white text-xs md:text-sm font-medium text-center">
                WS6: TVET and Emerging technologies
              </h3>
            </div>
          </div>

          {/* WS7 */}
          <div className="col-span-6 md:col-span-3 relative rounded-lg overflow-hidden h-24">
            <Image src="/ws.jpg" alt="WS7" width={240} height={96} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-[#23AF57B2] bg-opacity-80"></div>
            <div className="absolute inset-0 flex items-center justify-center p-2">
              <h3 className="text-white text-xs md:text-sm font-medium text-center">
                WS7: Future ready and Inclusive workforce
              </h3>
            </div>
          </div>

          {/* WS8 */}
          <div className="col-span-6 md:col-span-3 relative rounded-lg overflow-hidden h-24">
            <Image src="/ws.jpg" alt="WS8" width={240} height={96} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-[#23AF57B2] bg-opacity-80"></div>
            <div className="absolute inset-0 flex items-center justify-center p-2">
              <h3 className="text-white text-xs md:text-sm font-medium text-center">
                WS8: Nurturing talents to accelerate the Innovation ecosystem
              </h3>
            </div>
          </div>
        </div>

        {/* Students Showcase */}
        <div className="relative rounded-lg overflow-hidden h-16 mb-4">
          <Image
            src="/student.jpg"
            alt="Students Showcase"
            width={1024}
            height={64}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-[#08112980] bg-opacity-60"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-white text-lg font-medium">Students Showcase</h3>
            <p className="text-white text-sm mt-1">16:00-17:00</p>
          </div>
        </div>

        {/* Networking Cocktail */}
        <div className="relative rounded-lg overflow-hidden h-16 mb-8">
          <Image
            src="/networking.jpg"
            alt="Networking Cocktail"
            width={1024}
            height={64}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-[#08112980] bg-opacity-60"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-white text-lg font-medium">Networking Cocktail</h3>
            <p className="text-white text-sm mt-1">17:30-18:00</p>
          </div>
        </div>

        {/* Day Header */}
        <h2 className="text-2xl font-bold text-center mb-6">THURSDAY, 5th JUNE</h2>

        {/* Top Row Grid */}
        <div className="grid grid-cols-12 gap-4 mb-5">
          {/* Registration */}
          <div className="col-span-12 md:col-span-6 relative rounded-lg overflow-hidden h-32">
            <Image
              src="/registra.jpg"
              alt="Registration"
              width={320}
              height={128}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#08112980] bg-opacity-40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-white text-xl font-medium">Registration</h3>
              <p className="text-white text-sm mt-2">8:00-8:30</p>
            </div>
          </div>

          {/* Introduction */}
          <div className="col-span-12 md:col-span-6 relative rounded-lg overflow-hidden h-32">
            <Image
              src="/intro.jpg"
              alt="Introduction"
              width={320}
              height={128}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#08112980] bg-opacity-40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-white text-xl font-medium">Key Takeaways from Day 1</h3>
              <p className="text-white text-base mt-1">TBC Presentation from MIFOTRA</p>
              <p className="text-white text-sm mt-1">8:30-9:00</p>
            </div>
          </div>
        </div>

        {/* Networking and Knowledge Exchange Section */}
        <div className="mb-5">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold">Networking and Knowledge Exchange</h3>
            <p className="text-gray-600 text-sm">9:00-13:00</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column - Round Table Expert Exchanges */}
            <div className="relative rounded-lg overflow-hidden shadow-md h-[400px]">
              <Image
                src="/round.jpg"
                alt="Round Table Expert Exchanges"
                width={500}
                height={400}
                className="object-cover w-full h-full absolute"
              />
              <div className="absolute inset-0 bg-[#8B000380]"></div>
              <div className="relative z-10 p-4">
                <h4 className="text-lg font-semibold text-white mb-3">Networking and Knowledge Exchange 1:</h4>
                <h5 className="font-medium mb-2 text-white">Round Table Expert Exchanges:</h5>
                <ul className="space-y-2 pl-5">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-white text-[#8B0003] rounded-full w-5 h-5 text-xs mr-2 flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <span className="text-white">Governance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-white text-[#8B0003] rounded-full w-5 h-5 text-xs mr-2 flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <span className="text-white">Curricula</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-white text-[#8B0003] rounded-full w-5 h-5 text-xs mr-2 flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <span className="text-white">TVET Teachers Capacity Building</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-white text-[#8B0003] rounded-full w-5 h-5 text-xs mr-2 flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <span className="text-white">Assessment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-white text-[#8B0003] rounded-full w-5 h-5 text-xs mr-2 flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <span className="text-white">Innovation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-white text-[#8B0003] rounded-full w-5 h-5 text-xs mr-2 flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <span className="text-white">Labour Market Transition</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-white text-[#8B0003] rounded-full w-5 h-5 text-xs mr-2 flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <span className="text-white">Academia-Industry</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-white text-[#8B0003] rounded-full w-5 h-5 text-xs mr-2 flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <span className="text-white">Dual Training</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Marketplaces */}
            <div className="relative rounded-lg overflow-hidden shadow-md h-[400px]">
              <Image
                src="/bgthree.jpg"
                alt="Marketplaces"
                width={500}
                height={400}
                className="object-cover w-full h-full absolute"
              />
              <div className="absolute inset-0 bg-[#23AF57B2]"></div>
              <div className="relative z-10 p-4">
                <h4 className="text-lg font-semibold text-white mb-3">Networking and Knowledge Exchange 2:</h4>
                <ul className="space-y-4 pl-5">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-white text-[#23AF57] rounded-full w-5 h-5 text-xs mr-2 flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <div>
                      <p className="font-medium text-white">Marketplaces 1: TVET schools and companies for Dual TVET</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-white text-[#23AF57] rounded-full w-5 h-5 text-xs mr-2 flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <div>
                      <p className="font-medium text-white">
                        Marketplace 2: TVET schools and companies for Industrial Attachments
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-white text-[#23AF57] rounded-full w-5 h-5 text-xs mr-2 flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <div>
                      <p className="font-medium text-white">Marketplace 3: TBD by RP</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Lunch */}
        <div className="relative rounded-lg overflow-hidden h-16 mb-4">
          <Image src="/lunch.jpg" alt="Lunch" width={1024} height={64} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-[#08112980] bg-opacity-60"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-white text-lg font-medium">Lunch</h3>
            <p className="text-white text-sm mt-1">13:00-14:30</p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-12 gap-4">
          {/* Visit of the TVET Expo */}
          <div className="col-span-12 md:col-span-6 relative rounded-lg overflow-hidden h-32">
            <Image
              src="/bgone.jpg"
              alt="Visit of the TVET Expo"
              width={320}
              height={128}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#8B000380]"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-white text-lg font-medium">Visit of the TVET Expo and Skills Competition (KCEV)</h3>
              <p className="text-white text-sm mt-1">14:30-17:00</p>
            </div>
          </div>

          {/* Closing Ceremony */}
          <div className="col-span-12 md:col-span-6 relative rounded-lg overflow-hidden h-32">
            <Image
              src="/close.jpg"
              alt="Closing Ceremony"
              width={320}
              height={128}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#08112980]"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-white text-lg font-medium">Closing Ceremony</h3>
              <p className="text-white text-sm mt-1">17:00-17:30</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
