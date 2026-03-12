export default function AlumniPage() {
  return (
    <section className="w-full px-4 py-16 bg-background-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className=" uppercase tracking-widest text-primary-600 mb-2">
            Share Your Experience
          </h1>
          <p className="mt-4 text-background-600 max-w-2xl mx-auto">
            We value your feedback. Please take a moment to share your
            experience with us. Your testimonial helps future students and
            strengthens our community.
          </p>
        </div>

        {/* Form Card */}
        <div className="flex justify-center">
          <div
            className="
              w-full
              max-w-4xl
              bg-white
              rounded-xl
              shadow-lg
              border
              border-background-200
              overflow-hidden
            "
          >
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdmMxGNq57glbvq8htLks0ZFAm5kWkx6RqxfrusfKHESp5FCg/viewform?embedded=true"
              className="
                w-full
                h-[75vh]
                min-h-[700px]
              "
              title="Alumni Testimonial Form"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
export async function generateMetadata() {
  return {
    title: "Alumni",
    description: "Alumni SOMES IOE Purwanchal Campus ERC",
  };
}
