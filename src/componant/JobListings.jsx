import { useEffect, useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import JobListing from "./JobListing";
import Spinner from "../componant/Spinner";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // بيانات وهمية للاستخدام عندما يكون الخادم غير متاح
  const mockJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      type: "Full-Time",
      location: "Remote",
      description:
        "We are looking for a skilled Frontend Developer with React experience to join our team.",
      salary: "$70,000 - $90,000",
      company: {
        name: "Tech Solutions Inc.",
        description:
          "Leading technology company specializing in web solutions.",
        contactEmail: "contact@techsolutions.com",
      },
    },
    {
      id: 2,
      title: "React Developer",
      type: "Part-Time",
      location: "New York, NY",
      description:
        "Join our team as a React Developer to build amazing user interfaces and web applications.",
      salary: "$60,000 - $80,000",
      company: {
        name: "Web Innovators",
        description: "Creative web development agency focused on innovation.",
        contactEmail: "jobs@webinnovators.com",
      },
    },
    {
      id: 3,
      title: "UI/UX Designer",
      type: "Contract",
      location: "San Francisco, CA",
      description:
        "Design beautiful and intuitive user interfaces for our digital products.",
      salary: "$50,000 - $70,000",
      company: {
        name: "Design Studio Pro",
        description:
          "Award-winning design team creating exceptional user experiences.",
        contactEmail: "hello@designstudiopro.com",
      },
    },
    {
      id: 4,
      title: "Full Stack Developer",
      type: "Full-Time",
      location: "Austin, TX",
      description:
        "We need a Full Stack Developer proficient in both frontend and backend technologies.",
      salary: "$80,000 - $110,000",
      company: {
        name: "Digital Solutions Co.",
        description:
          "Comprehensive digital agency offering end-to-end solutions.",
        contactEmail: "career@digitalsolutions.com",
      },
    },
    {
      id: 5,
      title: "JavaScript Developer",
      type: "Remote",
      location: "Remote",
      description:
        "Looking for a JavaScript expert to work on our cutting-edge web applications.",
      salary: "$75,000 - $95,000",
      company: {
        name: "Code Masters",
        description:
          "Software development company focused on modern web technologies.",
        contactEmail: "info@codemasters.dev",
      },
    },
    {
      id: 6,
      title: "Senior React Engineer",
      type: "Full-Time",
      location: "Boston, MA",
      description:
        "Senior role for experienced React developers to lead our frontend team.",
      salary: "$100,000 - $130,000",
      company: {
        name: "Enterprise Tech",
        description:
          "Large enterprise company building scalable software solutions.",
        contactEmail: "talent@enterprisetech.com",
      },
    },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const apiURL = isHome
          ? "http://localhost:8000/jobs?_limit=3"
          : "http://localhost:8000/jobs";

        // إضافة timeout للطلب
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(apiURL, {
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log("Error fetching data, using mock data instead", error);

        // استخدام البيانات الوهمية كحل بديل
        const fallbackData = isHome ? mockJobs.slice(0, 3) : mockJobs;
        setJobs(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
