import React from "react";
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const JobPage = ({ deleteJob }) => {
  const navigAte = useNavigate();
  const { id } = useParams();
  const job = useLoaderData();

  const onDeleteClick = (jobId) => {
    const confirm = window.confirm(
      "Are You Sure You Want to delete Job Listing? "
    );
    if (!confirm) return;

    deleteJob(jobId);
    toast.success("Job deleted successfully");
    navigAte("/jobs");
  };

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className=" text-lg text-orange-700 mr-2" />
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>
                <p className="mb-4">{job.description}</p>
                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>
                <p className="mb-4">{job.salary} / Year</p>
              </div>
            </main>
            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>
                <h2 className="text-2xl">{job.company.name}</h2>
                <p className="my-2">{job.company.description}</p>
                <hr className="my-4" />
                <h3 className="text-xl">Contact Email:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactEmail}
                </p>
                <h3 className="text-xl">Contact Phone:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactPhone || "Not specified"}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link
                  to={`/edit-job/${job.id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>
                <button
                  onClick={() => onDeleteClick(job.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

// دالة jobLoader محسنة تماماً
const jobLoader = async ({ params }) => {
  // بيانات وهمية شاملة
  const mockJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      type: "Full-Time",
      location: "Remote",
      description:
        "We are looking for a skilled Frontend Developer with React experience to join our team. You will be responsible for building modern web applications using the latest technologies and best practices.",
      salary: "$70,000 - $90,000",
      company: {
        name: "Tech Solutions Inc.",
        description:
          "Leading technology company specializing in web solutions and digital transformation for businesses worldwide.",
        contactEmail: "contact@techsolutions.com",
        contactPhone: "+1 (555) 123-4567",
      },
    },
    {
      id: 2,
      title: "React Developer",
      type: "Part-Time",
      location: "New York, NY",
      description:
        "Join our innovative team as a React Developer. You'll work on cutting-edge web applications using React, TypeScript, and modern frontend tools. Experience with state management and API integration required.",
      salary: "$60,000 - $80,000",
      company: {
        name: "Web Innovators",
        description:
          "Creative web development agency focused on innovation, user experience, and delivering exceptional digital products.",
        contactEmail: "jobs@webinnovators.com",
        contactPhone: "+1 (555) 987-6543",
      },
    },
    {
      id: 3,
      title: "UI/UX Designer",
      type: "Contract",
      location: "San Francisco, CA",
      description:
        "Design beautiful and intuitive user interfaces for our digital products. We're looking for a creative designer proficient in Figma, user research, and creating exceptional user experiences.",
      salary: "$50,000 - $70,000",
      company: {
        name: "Design Studio Pro",
        description:
          "Award-winning design team creating exceptional user experiences for top brands and startups worldwide.",
        contactEmail: "hello@designstudiopro.com",
        contactPhone: "+1 (555) 456-7890",
      },
    },
    {
      id: 4,
      title: "Full Stack Developer",
      type: "Full-Time",
      location: "Austin, TX",
      description:
        "We need a Full Stack Developer proficient in both frontend and backend technologies. You'll work on our complete product stack from database design to user interface implementation.",
      salary: "$80,000 - $110,000",
      company: {
        name: "Digital Solutions Co.",
        description:
          "Comprehensive digital agency offering end-to-end solutions for businesses of all sizes.",
        contactEmail: "career@digitalsolutions.com",
        contactPhone: "+1 (555) 234-5678",
      },
    },
  ];

  try {
    const jobId = parseInt(params.id);
    console.log("Loading job with ID:", jobId);

    // أولاً: حاول استخدام البيانات الوهمية مباشرة (للتطوير)
    if (process.env.NODE_ENV === "development") {
      const mockJob = mockJobs.find((job) => job.id === jobId);
      if (mockJob) {
        console.log("Using mock data for development");
        return mockJob;
      }
    }

    // ثانياً: حاول الاتصال بالخادم مع معالجة الأخطاء
    const apiURL = `http://localhost:8000/jobs/${jobId}`;

    // إضافة timeout للطلب
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(apiURL, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`Server returned ${res.status}, using mock data`);
      // استخدم البيانات الوهمية إذا كان الخادم يعيد خطأ
      const mockJob = mockJobs.find((job) => job.id === jobId);
      if (mockJob) return mockJob;
      throw new Error(`Job not found: ${res.status}`);
    }

    const data = await res.json();
    console.log("Successfully loaded from server:", data);
    return data;
  } catch (error) {
    console.log("Fetch failed, using mock data:", error.message);

    // دائماً استخدم البيانات الوهمية كحل بديل
    const jobId = parseInt(params.id);
    const mockJob = mockJobs.find((job) => job.id === jobId);

    if (mockJob) {
      console.log("Returning mock job data");
      return mockJob;
    }

    // إذا لم توجد الوظيفة في البيانات الوهمية
    console.error("Job not found in mock data:", jobId);
    throw new Response("Job not found", {
      status: 404,
      statusText: "The job you're looking for doesn't exist.",
    });
  }
};

// Error Boundary مخصص
export function JobErrorBoundary() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Job Not Found</h1>
        <p className="text-gray-600 mb-6">
          The job you're looking for doesn't exist or couldn't be loaded.
        </p>
        <div className="space-y-3">
          <Link
            to="/jobs"
            className="block w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition text-center"
          >
            Back to Jobs
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobPage;
export { jobLoader };
