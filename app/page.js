import { Navbar } from "@/components/navbar"
import { BookingForm } from "@/components/booking-form"
import { DownloadSection } from "@/components/download-section"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div>
          <h1 className="text-3xl mt-20 pl-52 font-bold text-black mb-8">
            Your global chauffeur service
          </h1>
        </div>
        <section className="relative h-[50vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <img
              src="/Hero_02c.webp"
              alt="Luxury Car Service"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container relative bottom-36 left-[800px] z-10 pt-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <BookingForm />
              </div>
            </div>
          </div>
        </section>
        <DownloadSection />
      </main>
    </>
  )
}

