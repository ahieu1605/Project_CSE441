// app/page.jsx or pages/index.jsx
import Image from "next/image";
import Link from 'next/link';
import { getCurrentUser } from './auth/actions';
import { db } from '../db';

export default async function HomePage() {
  // Server component: get user info from session
  let user = await getCurrentUser();

  // If not authenticated, fetch the owner user by id
  if (!user) {
    user = await db.user.findUnique({
      where: { id: '2e8d18c0-7b54-49ac-b87f-7a813c760f80' },
    });
  }

  // Fetch latest 4 blogs (public or user's own, adjust as needed)
  const blogs = await db.blog.findMany({
    orderBy: { created_at: 'desc' },
    take: 4,
    include: { user: true },
  });

  // Fetch latest 4 portfolios (public, no auth required)
  const portfolios = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/portfolio`, { cache: 'no-store' })
    .then(res => res.json())
    .catch(() => []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fffafc] via-[#f7f7fd] to-[#e7fbff] font-sans text-[#181925]">
      {/* Navbar */}
      <nav className="flex items-center justify-between max-w-6xl mx-auto py-6 px-4">
        <div className="flex items-center space-x-2">
          {user?.avarterurl ? (
            <Image src={user.avarterurl} alt="Avatar" width={48} height={48} className="rounded-full w-12 h-12 object-cover" />
          ) : (
            <span className="bg-purple-600 w-12 h-12 rounded-full inline-block"></span>
          )}
          <span className="font-bold text-lg">{user?.name || 'Brooklyn'}</span>
          {user?.github_url && (
            <a href={user.github_url} target="_blank" rel="noopener noreferrer" className="ml-2">
              <svg width="20" height="20" fill="currentColor" className="text-gray-700 hover:text-black" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" /></svg>
            </a>
          )}
          {user?.linkedin_url && (
            <a href={user.linkedin_url} target="_blank" rel="noopener noreferrer" className="ml-2">
              <svg width="20" height="20" fill="currentColor" className="text-blue-700 hover:text-blue-900" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" /></svg>
            </a>
          )}
        </div>
        <ul className="hidden md:flex space-x-8 text-gray-700">
          <li><a href="#about" className="hover:text-purple-600">About</a></li>
          <li><a href="#portfolio" className="hover:text-purple-600">Portfolio</a></li>
          <li><a href="#blog" className="hover:text-purple-600">Blog</a></li>
          <li><a href="#contact" className="hover:text-purple-600">Contact</a></li>
        </ul>
        <div className="flex gap-2">
          {user && (await getCurrentUser()) ? (
            <>
              <Link href="/dashboard" className="bg-blue-500 text-white rounded-xl px-5 py-2 font-medium hover:bg-blue-600 transition">Dashboard</Link>
              <form action="/api/signout" method="POST">
                <button type="submit" className="bg-red-500 text-white rounded-xl px-5 py-2 font-medium hover:bg-red-600 transition">Sign Out</button>
              </form>
            </>
          ) : (
            <Link href="/signin" className="bg-purple-600 text-white rounded-xl px-5 py-2 font-medium hover:bg-purple-700 transition">Sign In</Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 py-12 px-4">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Hello, I’m <br />
            <span className="text-purple-600">{user?.name || 'Brooklyn Gilbert'}</span>
          </h1>
          <p className="text-gray-700 mb-6 max-w-md">
            {user?.bio || (
              <>
                I’m a UI/UX Designer &amp; Developer based in London, UK. <br />
                I design &amp; build modern websites, apps &amp; experiences. <br />
                Let’s work together!
              </>
            )}
          </p>
          <a
            href="#portfolio"
            className="inline-block bg-purple-600 text-white rounded-xl px-6 py-2 font-medium hover:bg-purple-700 transition"
          >
            Hire Me
          </a>
          {/* Stats */}
          <div className="flex gap-4 mt-8">
            <div className="bg-white/70 backdrop-blur rounded-lg px-6 py-3 flex flex-col items-center">
              <span className="text-xl font-bold text-purple-600">1Y.</span>
              <span className="text-xs text-gray-500">Experience</span>
            </div>
            <div className="bg-white/70 backdrop-blur rounded-lg px-6 py-3 flex flex-col items-center">
              <span className="text-xl font-bold text-purple-600">5</span>
              <span className="text-xs text-gray-500">Projects Done</span>
            </div>

          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            src={user?.avarterurl || "https://randomuser.me/api/portraits/men/12.jpg"}
            alt="Profile"
            width={260}
            height={320}
            className="rounded-2xl shadow-xl object-cover"
          />
        </div>
      </section>

      {/* About Card */}
      <section id="about" className="max-w-4xl mx-auto bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8 -mt-10 z-10 relative">
        <Image
          src={user?.avarterurl || "https://randomuser.me/api/portraits/men/12.jpg"}
          alt="Profile"
          width={120}
          height={120}
          className="rounded-xl shadow"
        />
        <div>
          <h3 className="text-lg font-semibold mb-2">I am a dedicated developer</h3>
          <p className="text-gray-600 mb-4">
            With a strong passion for solving customer problems, I am committed to delivering high-quality, cost-effective solutions that truly meet their needs
          </p>
          <a href="#contact" className="bg-purple-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-purple-700 transition">
            Contact Me
          </a>
        </div>
      </section>

      {/* Work Process */}
      <section className="bg-[#f6f6fc] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-semibold text-xl mb-6">Work Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-5 shadow text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-lg text-purple-600">1</span>
              </div>
              <h4 className="font-semibold mb-1">Research</h4>
              <p className="text-xs text-gray-500">Understand the project and client needs.</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-lg text-purple-600">2</span>
              </div>
              <h4 className="font-semibold mb-1">Analyze</h4>
              <p className="text-xs text-gray-500">Gather data and insights to plan effectively.</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-lg text-purple-600">3</span>
              </div>
              <h4 className="font-semibold mb-1">Design</h4>
              <p className="text-xs text-gray-500">Create visually pleasing, user-focused designs.</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow text-center">
              <div className="w-10 h-10 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-lg text-purple-600">4</span>
              </div>
              <h4 className="font-semibold mb-1">Launch</h4>
              <p className="text-xs text-gray-500">Deliver and monitor the final product.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-xl font-semibold mb-6">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {portfolios.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">No portfolios found.</div>
          ) : (
            portfolios.map((item: any) => (
              <Link key={item.id} href={`/portfolio/${item.id}`} className="block">
                <div className="bg-white rounded-xl shadow p-3 cursor-pointer hover:shadow-lg transition">
                  <Image
                    src={item.thumbnail || 'https://source.unsplash.com/400x240/?portfolio,design'}
                    alt={item.title}
                    width={400}
                    height={240}
                    className="rounded-lg mb-3 object-cover w-full h-40"
                  />
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-xs text-gray-500 mb-2">{item.description || 'No description.'}</p>
                  <span className="block text-xs text-gray-400 mb-1">By {item.user?.name || 'Unknown'}</span>
                  <span className="text-purple-600 font-medium text-xs hover:underline">View Details &rarr;</span>
                </div>
              </Link>
            ))
          )}
        </div>
        <div className="flex justify-center">
          <a href="#portfolio" className="bg-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-purple-700 transition">
            See More
          </a>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#22273b] py-12 text-center text-white">
        <h2 className="text-xl font-semibold mb-2">Do you have Project Idea? <br /> Let's discuss your project!</h2>
        <p className="mb-4 text-gray-200">I’m available for freelance & remote work. Let's build something great together!</p>
        <a href="#contact" className="bg-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-purple-800 transition">
          Let's Work Together
        </a>
      </section>

      {/* Blog Section */}
      <section id="blog" className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-xl font-semibold mb-6">Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {blogs.length === 0 ? (
            <div className="col-span-4 text-center text-gray-500">No blogs found.</div>
          ) : (
            blogs.map((blog: any) => (
              <Link key={blog.id} href={`/blogs/${blog.id}`} className="block">
                <div className="bg-white rounded-xl shadow p-3 cursor-pointer hover:shadow-lg transition">
                  <Image
                    src={blog.thumbnail || 'https://source.unsplash.com/400x200/?blog,ui'}
                    alt={blog.title}
                    width={400}
                    height={200}
                    className="rounded-lg mb-3 object-cover w-full h-28"
                  />
                  <h4 className="font-semibold mb-2 text-base">{blog.title}</h4>
                  <p className="text-xs text-gray-500 mb-2">{blog.description || 'No description.'}</p>
                  <span className="block text-xs text-gray-400 mb-1">By {blog.user?.name || 'Unknown'}</span>
                  <span className="text-purple-600 font-medium text-xs hover:underline">Read More &rarr;</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* What I Do */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">What I do?</h2>
            <p className="text-gray-600 mb-4">UX/UI Design, Web Development, and more. I bring digital products to life with great design and clean code.</p>
            <a href="#" className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
              My Skills
            </a>
          </div>
          <div className="bg-white rounded-xl shadow p-4 md:col-span-2">
            <h4 className="font-semibold mb-2">User Experience (UX)</h4>
            <p className="text-xs text-gray-500 mb-2">Design thinking, wireframes, user flows, and more.</p>
            <h4 className="font-semibold mb-2 mt-4">Web Development</h4>
            <p className="text-xs text-gray-500 mb-2">Modern, performant websites with React/Next.js and Node.js.</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="max-w-4xl mx-auto bg-white/90 rounded-2xl shadow-lg p-8 my-16">
        <h2 className="text-xl font-semibold mb-4">Let's discuss your Project</h2>
        <p className="mb-6 text-gray-600">Share your details & project idea. I’ll get back soon!</p>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="Your Name" className="bg-gray-100 rounded-lg px-4 py-3" />
          <input type="email" placeholder="Your Email" className="bg-gray-100 rounded-lg px-4 py-3" />
          <textarea placeholder="Project Details" rows={4} className="bg-gray-100 rounded-lg px-4 py-3 md:col-span-2" />
          <button type="submit" className="bg-purple-600 text-white rounded-xl px-6 py-3 font-medium hover:bg-purple-700 transition md:col-span-2">
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
