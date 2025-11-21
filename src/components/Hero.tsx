// src/components/Hero.tsx
export default function Hero() {
  // using uploaded image path as hero banner per instructions
  const img = "/images/Homepage.jpg";
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">
            Find Electronics That Match Your Needs
          </h1>
          <p className="mt-4 text-gray-600">
            Carefully curated collection of laptops, storage, servers and more.
          </p>
          <div className="mt-6">
            <button className="px-6 py-3 rounded-full bg-black text-white">
              Shop Now
            </button>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden bg-white">
          <img src={img} alt="Hero" className="w-full h-64 object-cover" />
        </div>
      </div>
    </section>
  );
}
