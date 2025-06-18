import Image from "next/image"
import Navbar from "../landing/navbar"
import Footer from "../landing/footer"

export default function Programme() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 md:px-8 pt-8 mb-8">
        <h1 className="text-4xl font-bold text-center my-12">
          4TH EAC <span className="text-[#00A9DE]">WORLD KISWAHILI LANGUAGE DAY</span> CELEBRATIONS
        </h1>
        <p className="text-center text-lg text-gray-600 mb-8">Serena Hotel • July 5-6, 2025</p>

        {/* Main Program Overview Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-12">
          {/* Day One - Media Briefing */}
          <div className="relative rounded-lg overflow-hidden h-80">
            <Image
              src="/panel.jpg"
              alt="Media Briefing"
              width={400}
              height={320}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#8B000380]"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <h3 className="text-white text-2xl font-bold text-center mb-2">DAY ONE</h3>
              <h4 className="text-white text-xl font-semibold text-center mb-2">July 5th, 2025</h4>
              <h5 className="text-white text-lg font-medium text-center">Media Briefing</h5>
              <p className="text-white text-sm text-center mt-2">15:00 - 16:00</p>
            </div>
          </div>

          {/* Day Two - Youth Engagement Symposium */}
          <div className="relative rounded-lg overflow-hidden h-80">
            <Image
              src="/bgthree.jpg"
              alt="Youth Engagement Symposium"
              width={400}
              height={320}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#23AF57B2]"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <h3 className="text-white text-2xl font-bold text-center mb-2">DAY TWO</h3>
              <h4 className="text-white text-xl font-semibold text-center mb-2">July 6th, 2025</h4>
              <h5 className="text-white text-lg font-medium text-center">Youth Engagement Symposium</h5>
              <p className="text-white text-sm text-center mt-2">07:00 - 17:00</p>
            </div>
          </div>

          {/* Day Three - Main Celebrations */}
          <div className="relative rounded-lg overflow-hidden h-80">
            <Image
              src="/intermini.jpg"
              alt="Main Celebrations"
              width={400}
              height={320}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#00A9DE80]"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <h3 className="text-white text-2xl font-bold text-center mb-2">DAY THREE</h3>
              <h4 className="text-white text-xl font-semibold text-center mb-2">July 7th, 2025</h4>
              <h5 className="text-white text-lg font-medium text-center">Main Celebrations</h5>
              <p className="text-white text-sm text-center mt-2">09:00 - 13:00</p>
            </div>
          </div>
        </div>

        {/* Mobile version */}
        <div className="md:hidden space-y-4 mb-12">
          <div className="relative rounded-lg overflow-hidden h-48">
            <Image
              src="/panel.jpg"
              alt="Media Briefing"
              width={400}
              height={192}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#8B000380]"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-white text-xl font-bold">DAY ONE - July 5th</h3>
              <p className="text-white text-center">Media Briefing</p>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden h-48">
            <Image
              src="/bgthree.jpg"
              alt="Youth Engagement Symposium"
              width={400}
              height={192}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#23AF57B2]"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-white text-xl font-bold">DAY TWO - July 6th</h3>
              <p className="text-white text-center">Youth Engagement Symposium</p>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden h-48">
            <Image
              src="/intermini.jpg"
              alt="Main Celebrations"
              width={400}
              height={192}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#00A9DE80]"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-white text-xl font-bold">DAY THREE - July 7th</h3>
              <p className="text-white text-center">Main Celebrations</p>
            </div>
          </div>
        </div>

        {/* DAY ONE - JULY 5TH, 2025 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#8B0003]">DAY ONE • JULY 5TH, 2025</h2>
          <h3 className="text-xl font-semibold text-center mb-8 text-gray-700">Media Briefing</h3>

          {/* Media Briefing Section */}
          <div className="bg-gradient-to-r from-[#8B0003] to-[#8B000380] rounded-lg p-8 mb-6">
            <div className="max-w-6xl mx-auto">
              <h4 className="text-white text-3xl font-bold mb-6 text-center">MEDIA BRIEFING</h4>
              <p className="text-white text-xl text-center mb-8">15:00 - 16:00</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-lg p-6">
                  <h5 className="text-[#8B0003] text-xl font-semibold mb-4">Distinguished Speakers:</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center bg-[#8B0003] text-white rounded-full w-6 h-6 text-sm mr-3 flex-shrink-0 mt-0.5">
                        •
                      </span>
                      <span className="text-gray-800 text-base">Ministers: MINAFFET, MINEDUC, and MINUBUMWE</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center bg-[#8B0003] text-white rounded-full w-6 h-6 text-sm mr-3 flex-shrink-0 mt-0.5">
                        •
                      </span>
                      <span className="text-gray-800 text-base">EAC Secretary General</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center bg-[#8B0003] text-white rounded-full w-6 h-6 text-sm mr-3 flex-shrink-0 mt-0.5">
                        •
                      </span>
                      <span className="text-gray-800 text-base">Judge President EACJ</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h5 className="text-[#8B0003] text-xl font-semibold mb-4">Additional Speakers:</h5>
                  <ul className="space-y-3 mb-4">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center bg-[#8B0003] text-white rounded-full w-6 h-6 text-sm mr-3 flex-shrink-0 mt-0.5">
                        •
                      </span>
                      <span className="text-gray-800 text-base">Speaker EALA</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center bg-[#8B0003] text-white rounded-full w-6 h-6 text-sm mr-3 flex-shrink-0 mt-0.5">
                        •
                      </span>
                      <span className="text-gray-800 text-base">Executive Secretary EAKC</span>
                    </li>
                  </ul>

                  <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                    <p className="text-gray-800 text-sm font-medium">Responsible: MINEDUC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Day One Summary */}
          <div className="bg-gray-50 rounded-lg p-6 text-center mb-8">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Pre-Event Media Engagement</h4>
            <p className="text-gray-600">
              Setting the stage for the 4th EAC World Kiswahili Language Day celebrations with key stakeholder briefings
              and media engagement.
            </p>
          </div>
        </div>

        {/* DAY TWO - JULY 6TH, 2025 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#23AF57]">DAY TWO • JULY 6TH, 2025</h2>
          <h3 className="text-xl font-semibold text-center mb-8 text-gray-700">Youth Engagement Symposium</h3>

          {/* Morning Sessions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Registration */}
            <div className="relative rounded-lg overflow-hidden h-48">
              <Image
                src="/registra.jpg"
                alt="Registration"
                width={320}
                height={192}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#08112980]"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <h4 className="text-white text-lg font-bold text-center">Arrival and Registration</h4>
                <p className="text-white text-sm mt-2">07:00 - 09:00</p>
                <p className="text-white text-xs text-center mt-1">For Symposium</p>
              </div>
            </div>

            {/* Open Entertainment */}
            <div className="relative rounded-lg overflow-hidden h-48">
              <Image
                src="/welcome.jpg"
                alt="Open Entertainment"
                width={320}
                height={192}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#8B000380]"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <h4 className="text-white text-lg font-bold text-center">Open Entertainment</h4>
                <p className="text-white text-sm mt-2">09:00 - 10:00</p>
                <p className="text-white text-xs text-center mt-1">MC & DJ</p>
              </div>
            </div>

            {/* Coffee Break */}
            <div className="relative rounded-lg overflow-hidden h-48">
              <Image
                src="/coffee.jpg"
                alt="Coffee Break"
                width={320}
                height={192}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#08112980]"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <h4 className="text-white text-lg font-bold text-center">Coffee Break</h4>
                <p className="text-white text-sm mt-2">10:00 - 10:30</p>
              </div>
            </div>
          </div>

          {/* Opening Remarks Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative rounded-lg overflow-hidden h-32">
              <Image
                src="/keynote.jpg"
                alt="Opening Remarks"
                width={400}
                height={128}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#23AF57B2]"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center">
                  <h4 className="text-white text-lg font-bold">Opening Remarks</h4>
                  <p className="text-white text-sm">MINISTER/MINEDUC OR MINAFFET</p>
                  <p className="text-white text-xs">10:30 - 10:40</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden h-32">
              <Image
                src="/presenta.jpg"
                alt="EAKC Remarks"
                width={400}
                height={128}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#00A9DE80]"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center">
                  <h4 className="text-white text-lg font-bold">EAKC Executive Secretary</h4>
                  <p className="text-white text-sm">Remarks</p>
                  <p className="text-white text-xs">10:40 - 10:50</p>
                </div>
              </div>
            </div>
          </div>

          {/* EAC Remarks and Artistic Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative rounded-lg overflow-hidden h-32">
              <Image
                src="/panel.jpg"
                alt="EAC Remarks"
                width={400}
                height={128}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#8B000380]"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center">
                  <h4 className="text-white text-lg font-bold">EAC Remarks</h4>
                  <p className="text-white text-sm">Secretary General</p>
                  <p className="text-white text-xs">10:50 - 11:00</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden h-32">
              <Image
                src="/student.jpg"
                alt="Kiswahili Artistic Performance"
                width={400}
                height={128}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#23AF57B2]"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center">
                  <h4 className="text-white text-lg font-bold">Kiswahili Artistic Performance</h4>
                  <p className="text-white text-sm">Titi Brown, Indaro Groupe</p>
                  <p className="text-white text-xs">11:00 - 11:30</p>
                </div>
              </div>
            </div>
          </div>

          {/* Keynote Address */}
          <div className="relative rounded-lg overflow-hidden h-24 mb-6">
            <Image
              src="/keynote.jpg"
              alt="Keynote Address"
              width={1024}
              height={96}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#00A9DE80]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h4 className="text-white text-xl font-bold">Keynote Address - Senator Prof. NIYOMUGABO Cyprian</h4>
                <p className="text-white text-sm mt-1">Introduction of the Theme • 11:30 - 11:40</p>
              </div>
            </div>
          </div>

          {/* Youth Engagement Symposium Main Sessions */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h4 className="text-2xl font-bold text-center mb-6 text-[#23AF57]">YOUTH ENGAGEMENT SYMPOSIUM</h4>
            <p className="text-center text-lg font-semibold mb-4">Theme Chair Moderators: Prof. Inyani Simala</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Panel - AI and Education */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/workshop.jpg"
                    alt="AI and Education"
                    width={400}
                    height={192}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#8B0003] to-transparent"></div>
                </div>
                <div className="p-6">
                  <h5 className="text-xl font-bold mb-3 text-[#8B0003]">
                    Kiswahili, Artificial Intelligence, and Inclusive Education
                  </h5>
                  <p className="text-gray-700 mb-3">Accelerating a culture of Peace in the EAC</p>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Speaker:</strong> Janvier Popote NSHIMIYIMANA / MINUBUMWE
                  </p>
                  <p className="text-sm font-semibold text-[#23AF57] mb-4">11:40 - 12:10</p>

                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-gray-800 mb-2">Panel Discussion - Partner States:</p>
                    <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                      <div>• Republic of Burundi</div>
                      <div>• Republic of Kenya</div>
                      <div>• DR Congo</div>
                      <div>• Republic of Rwanda</div>
                      <div>• Somalia</div>
                      <div>• South Sudan</div>
                      <div>• Republic of Uganda</div>
                      <div>• United Republic of Tanzania</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Youth Innovations */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/bgthree.jpg"
                    alt="Youth Innovations"
                    width={400}
                    height={192}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#23AF57] to-transparent"></div>
                </div>
                <div className="p-6">
                  <h5 className="text-xl font-bold mb-3 text-[#23AF57]">
                    Kiswahili, Inclusive Education and Sustainable Development
                  </h5>

                  <div className="space-y-4">
                    <div className="border-l-4 border-[#23AF57] pl-4">
                      <p className="font-semibold text-gray-800">12:20 - 13:00</p>
                      <p className="text-sm text-gray-700">Pitching of Kiswahili Youth Innovations</p>
                    </div>

                    <div className="border-l-4 border-[#00A9DE] pl-4">
                      <p className="font-semibold text-gray-800">14:00 - 14:30</p>
                      <p className="text-sm text-gray-700 mb-2">
                        Building Youth Competencies in Kiswahili for Regional Integration and Employment
                      </p>
                      <p className="text-xs text-gray-600">
                        <strong>Speaker:</strong> Dr. Rusanganwa Joseph
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lunch Break */}
          <div className="relative rounded-lg overflow-hidden h-20 mb-6">
            <Image src="/lunch.jpg" alt="Lunch" width={1024} height={80} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-[#08112980]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h4 className="text-white text-xl font-bold">Lunch Break</h4>
                <p className="text-white text-sm">13:00 - 14:00</p>
              </div>
            </div>
          </div>

          {/* Afternoon Sessions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative rounded-lg overflow-hidden h-32">
              <Image
                src="/panel.jpg"
                alt="Discussion"
                width={400}
                height={128}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#00A9DE80]"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center">
                  <h4 className="text-white text-lg font-bold">Discussion: Questions and Answers</h4>
                  <p className="text-white text-sm">All Participants</p>
                  <p className="text-white text-xs">14:30 - 15:00</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden h-32">
              <Image
                src="/close.jpg"
                alt="Closing Remarks"
                width={400}
                height={128}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#8B000380]"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center">
                  <h4 className="text-white text-lg font-bold">Closing Remarks</h4>
                  <p className="text-white text-sm">Minister/MOYA & EAKC</p>
                  <p className="text-white text-xs">15:00 - 15:15</p>
                </div>
              </div>
            </div>
          </div>

          {/* Memorial Visit */}
          <div className="relative rounded-lg overflow-hidden h-24">
            <Image
              src="/memorial.jpeg"
              alt="Memorial Visit"
              width={1024}
              height={150}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#23AF57B2]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h4 className="text-white text-xl font-bold">Kigali Genocide Memorial Visit</h4>
                <p className="text-white text-sm">15:30 - 17:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* DAY THREE - JULY 7TH, 2025 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#00A9DE]">DAY THREE • JULY 7TH, 2025</h2>
          <h3 className="text-xl font-semibold text-center mb-8 text-gray-700">Main Celebrations</h3>

          {/* Morning Arrival and Setup */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative rounded-lg overflow-hidden h-48">
              <Image
                src="/student.jpg"
                alt="Kiswahili March"
                width={320}
                height={192}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#23AF57B2]"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <h4 className="text-white text-lg font-bold text-center">Kiswahili March</h4>
                <p className="text-white text-sm mt-2">Arrival of Guests</p>
                <p className="text-white text-xs">09:00 - 10:00</p>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden h-48">
              <Image
                src="/registra.jpg"
                alt="Guest of Honor Arrival"
                width={320}
                height={192}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#00A9DE80]"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <h4 className="text-white text-lg font-bold text-center">Arrival of Guest of Honor</h4>
                <p className="text-white text-sm mt-2">Republic of Rwanda</p>
                <p className="text-white text-xs">09:00 - 09:30</p>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden h-48">
              <Image
                src="/net1.jpg"
                alt="Tour of Exhibitions"
                width={320}
                height={192}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#8B000380]"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <h4 className="text-white text-lg font-bold text-center">Tour of Exhibitions</h4>
                <p className="text-white text-sm mt-2">Protocol Team</p>
                <p className="text-white text-xs">09:30 - 10:00</p>
              </div>
            </div>
          </div>

          {/* Ceremony Opening */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative rounded-lg overflow-hidden h-32">
              <Image src="/welcome.jpg" alt="Anthems" width={400} height={128} className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-[#08112980]"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center">
                  <h4 className="text-white text-lg font-bold">National Anthems</h4>
                  <p className="text-white text-sm">Rwandan Anthem, EAC Anthem</p>
                  <p className="text-white text-xs">10:00 - 10:10</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden h-32">
              <Image
                src="/student.jpg"
                alt="Entertainment"
                width={400}
                height={128}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#23AF57B2]"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center">
                  <h4 className="text-white text-lg font-bold">Entertainment</h4>
                  <p className="text-white text-sm">Inganzo Ngali</p>
                  <p className="text-white text-xs">10:10 - 10:20</p>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Presentations */}
          <div className="relative rounded-lg overflow-hidden h-24 mb-6">
            <Image
              src="/presenta.jpg"
              alt="Guest Presentations"
              width={1024}
              height={96}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#00A9DE80]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h4 className="text-white text-xl font-bold">Presentation of Guests and Goodwill Messages</h4>
                <p className="text-white text-sm mt-1">UNESCO Statement • All Partner States • 10:20 - 11:00</p>
              </div>
            </div>
          </div>

          {/* Official Speeches */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h4 className="text-2xl font-bold text-center mb-6 text-[#00A9DE]">OFFICIAL SPEECHES</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative rounded-lg overflow-hidden h-32">
                <Image
                  src="/keynote.jpg"
                  alt="EAKC Speech"
                  width={400}
                  height={128}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-[#8B000380]"></div>
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="text-center">
                    <h5 className="text-white text-lg font-bold">Executive Secretary EAKC</h5>
                    <p className="text-white text-xs">11:00 - 11:10</p>
                  </div>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden h-32">
                <Image
                  src="/panel.jpg"
                  alt="EAC Secretary General"
                  width={400}
                  height={128}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-[#23AF57B2]"></div>
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="text-center">
                    <h5 className="text-white text-lg font-bold">Secretary General EAC</h5>
                    <p className="text-white text-xs">11:10 - 11:20</p>
                  </div>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden h-32">
                <Image
                  src="/keynote.jpg"
                  alt="Minister Speech"
                  width={400}
                  height={128}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-[#00A9DE80]"></div>
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="text-center">
                    <h5 className="text-white text-lg font-bold">Minister</h5>
                    <p className="text-white text-sm">MINEDUC/MINAFFET</p>
                    <p className="text-white text-xs">11:20 - 11:30</p>
                  </div>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden h-32">
                <Image
                  src="/intermini.jpg"
                  alt="Council Chairperson"
                  width={400}
                  height={128}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-[#8B000380]"></div>
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="text-center">
                    <h5 className="text-white text-lg font-bold">Chairperson</h5>
                    <p className="text-white text-sm">EAC Council of Ministers</p>
                    <p className="text-white text-xs">11:30 - 11:40</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guest of Honor Speech */}
          <div className="relative rounded-lg overflow-hidden h-32 mb-6">
            <Image
              src="/close.jpg"
              alt="Guest of Honor"
              width={1024}
              height={128}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-[#23AF57B2]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h4 className="text-white text-2xl font-bold">Guest of Honor Speech</h4>
                <p className="text-white text-lg mt-2">Republic of Rwanda</p>
                <p className="text-white text-sm">11:40 - 11:50</p>
              </div>
            </div>
          </div>

          {/* Closing Activities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative rounded-lg overflow-hidden h-32">
              <Image
                src="/networking.jpg"
                alt="Photo Session"
                width={400}
                height={128}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#00A9DE80]"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center">
                  <h4 className="text-white text-lg font-bold">Photo Session & Media Brief</h4>
                  <p className="text-white text-sm">Protocol Team</p>
                  <p className="text-white text-xs">11:50 - 12:00</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden h-32">
              <Image
                src="/lunch.jpg"
                alt="Lunch and Departures"
                width={400}
                height={128}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#8B000380]"></div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center">
                  <h4 className="text-white text-lg font-bold">Lunch and Departures</h4>
                  <p className="text-white text-xs">12:00 - 13:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Information Footer */}
        <div className="bg-gradient-to-r from-[#23AF57] to-[#00A9DE] rounded-lg p-8 text-center">
          <h3 className="text-white text-2xl font-bold mb-4">4th EAC World Kiswahili Language Day</h3>
          <p className="text-white text-lg mb-2">Celebrating Unity Through Language</p>
          <p className="text-white text-sm">Serena Hotel • July 6-7, 2025</p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
