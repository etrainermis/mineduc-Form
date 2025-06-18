import Navbar from "./navbar"
import HeroSection from "./hero-section"
import Events from "./events"
import Stats from "./stats-section"
import Footer from "./footer"
import Coming from "./coming"
// import Speakers from "./speakers"
// import Programme from "./programme"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col w-full overflow-hidden">
      <Navbar />
      <HeroSection />
      <Coming/>
     {/* <Speakers/> */}
      <Events/>
      <Stats/>
      {/* <Programme/> */}
      <Footer/>

    </main>
  )
}
