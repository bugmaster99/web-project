export const getHomepageData = (url) => {
  let homepageData = {};
  homepageData.cta = "Book a Demo";

  homepageData.hero = [
    {
      heroImage: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/hero.png`,
      heroImageMobile: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/hero.png`,
      heroHeadline: `Find your <b>Dream Career in Healthcare</b> at Virohan`,
      heroSubText: `with India's highest rated paramedical courses. Certified by
    the Government of India.`,
      leadGenFormTitle: "Book a Demo",
      leadGenFormDescription: `Experience our classrooms for free. Our admission <br /> experts will answer all your questions!`,
    },
  ];

  homepageData.features = [
    {
      id: "f1",
      imagePath: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/govt-approved.svg`,
      width: 40.34,
      height: 51.2,
      title: "govt. <br/> certified <br/> programs",
    },
    {
      id: "f2",
      width: 48.75,
      height: 48.75,
      imagePath: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/placement-assistance.svg`,
      title: "100% <br /> placement <br /> support",
    },
    {
      id: "f3",
      width: 65.49,
      height: 47.43,
      imagePath: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/hospital-tie-ups.svg`,
      title: "650+ <br /> hospital </br /> Tie-Ups",
    },
    {
      id: "f4",
      width: 56.12,
      height: 62.39,
      imagePath: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/successful-students.svg`,
      title: "5500+ <br/> successful <br /> students",
    },
  ];

  homepageData.courses = {
    title: "Our Courses",
    courseList: [
      {
        id: "c1",
        imagePath: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/mlt.png`,
        title: "Medical Laboratory Technician",
        description:
          "Become an expert with diagnosis, treatment and prevention through use of clinical laboratory tests. Specialise in Haematology, Immunology, Serology, Clinical Pathology, Pre & Post Analytical Lab procedures and more!",
        tags: "Govt. Approved Program | Internship Training |100% Placement Support",
      },
      {
        id: "c2",
        imagePath: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/ott.png`,
        title: "Operation Theatre Technician",
        description:
          "Become a Hospital Administrator in Mumbai with expertise in administering departmental activities in a hospital, evaluation of hospital staff, maintaining policies, evaluating quality assurance, managing patient relationships, public relations and more!",
        tags: "Govt. Approved Program | Internship Training |100% Placement Support",
      },
      {
        id: "c3",
        imagePath: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/ha.png`,
        title: "Hospital Administration",
        description:
          "Become an Operating Theatre Technician in Mumbai and acquire expertise in pre, intra and post surgery duties in a hospital. Specialise in Anaesthesia & pre-medication, management of equipment in OT, usage of drugs in OT and more!",
        tags: "Govt. Approved Program | Internship Training |100% Placement Support",
      },
      {
        id: "c4",
        imagePath: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/emt.png`,
        title: "Emergency Medical Technician",
        description:
          "The Emergency Medical Technician training program, helps healthcare professionals to develop necessary skills needed to be respond in basic emergency lifesaving situations.",
        tags: "Govt. Approved Program | Internship Training |100% Placement Support",
      },
      {
        id: "c5",
        imagePath: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/rt.png`,
        title: "Radiology Technician",
        description:
          "Radiography is concerned with operating radio imaging machines like X-ray and interpreting results. Radiology technologists facilitate diagnosis & management through the creation of images using medical imaging modalities like X-ray, Ultrasound etc.",
        tags: "Govt. Approved Program | Internship Training |100% Placement Support",
      },
    ],
  };

  homepageData.whatSetsUsApart = {
    whatSetsUsApartImg: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/what-sets-us-apart.png`,
    whatSetsUsApartArr: [
      {
        id: "wsua1",
        title: "Take the classroom with you",
        description: "Learn with the myCareer app anywhere you go!",
        imagePath: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/take-classroom-with-you.svg`,
        width: 47,
        height: 49,
      },
      {
        id: "wsua2",
        title: "Get practical work experience",
        description: `${
          url === "/course/bba-in-hospital-management" ? 12 : 6
        } months internship experience with world class hospitals`,
        imagePath: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/get-practical-work-exp.svg`,
        width: 55,
        height: 57,
      },
      {
        id: "wsua3",
        title: "Enhance your personality",
        description:
          "With power skills training in English communication, Digital Literacy, etc.",
        imagePath: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/ench-your-personality.svg`,
        width: 59,
        height: 33,
      },
      {
        id: "wsua4",
        title: "Become interview-ready",
        description:
          "Learn resume building skills and get trained for internship & final recruitment processes with mock-interviews",
        imagePath: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/become-interview-ready.svg`,
        width: 52,
        height: 53,
      },
      {
        id: "wsua5",
        title: "Get recognized everywhere",
        description: "With global leaders like GE, IMA & Unicef",
        imagePath: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/get-recognized-everywhere.svg`,
        width: 54,
        height: 38,
      },
    ],
  };

  homepageData.studentJourney = {
    theoryImg: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/theory.png`,
    internshipImg: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/internship.png`,
    placementImg: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/placement.png`,
  };

  homepageData.watchUsYourself = [
    {
      id: "v1",
      videoUrl: "https://www.youtube.com/embed/kVLueJI8tuI",
      videoId: "kVLueJI8tuI",
    },
    {
      id: "v2",
      videoUrl: "https://www.youtube.com/embed/WuSrRf2U5bk",
      videoId: "WuSrRf2U5bk",
    },
    {
      id: "v3",
      videoUrl: "https://www.youtube.com/embed/H0b4xDs7Wyc",
      videoId: "H0b4xDs7Wyc",
    },
  ];

  homepageData.whyStudentsLoveUs = [
    {
      id: "vt1",
      videoUrl:
        "https://www.youtube.com/watch?v=OSPelqGcxKI&list=PLjdQpOPCWc-qEssS6aHaojkT9PwBwVQkO&ab_channel=Virohan",
      imagePath: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/testimonial1.png`,
      title: "Archana Gautam",
      subTitle: "COTT, Faridabad",
    },
    {
      id: "vt2",
      videoUrl:
        "https://www.youtube.com/watch?v=z6fgGbbcPAo&list=PLjdQpOPCWc-qEssS6aHaojkT9PwBwVQkO&index=3&ab_channel=Virohan",
      imagePath: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/testimonial2.png`,
      title: "Pragati Roy",
      subTitle: "OTT, Faridabad",
    },
  ];

  if (
    url === "/course/bba-in-hospital-management" ||
    url === "/course/master-of-hospital-administration"
  ) {
    homepageData.hero[0].heroImage = `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/bba-mha/hero.png`;
    homepageData.hero[0].heroImageMobile = `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/bba-mha/heroMobile.jpg`;
    homepageData.hero[0].leadGenFormTitle = "Apply Now";
    homepageData.hero[0].leadGenFormDescription =
      "Our Admission Counselor will call you to understand your eligibility and help you with the admission process";
    homepageData.courses = {
      title: "Course Highlights",
      courseList: [
        {
          id: "c1",
          imagePath: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/bba-mha/bba-mha-course.png`,
        },
      ],
    };

    homepageData.whatSetsUsApart.whatSetsUsApartImg = `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/bba-mha/what-sets-us-apart.png`;
    homepageData.studentJourney.theoryImg = `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/bba-mha/theory.png`;
    homepageData.studentJourney.internshipImg = `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/bba-mha/internship.png`;
    homepageData.studentJourney.placementImg = `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/bba-mha/placement.png`;
    homepageData.url = url;
    homepageData.cta = "Apply Now";
  }
  if (url === "/course/master-of-hospital-administration") {
    homepageData.hero[0].heroHeadline = `<b>Master</b> <br/> In <br /> <b>Hospital Administration</b>`;
    homepageData.hero[0].heroSubText = `For future <span style="font-weight: 800">LEADERS</span> in Healthcare Industry`;

    homepageData.courses = {
      title: "Course Highlights",
      courseList: [
        {
          id: "c1",
          imagePath: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/bba-mha/bba-mha-course.png`,
          title: "MHA, SSPU University, Bhilai",
          description:
            "Shri Shankaracharya Professional University (SSPU) has world class infrastructure & student facilities. The lush green campus is located in Bhilai, the steel city of India.",
        },
      ],
    };
  }
  if (url === "/course/bba-in-hospital-management") {
    homepageData.hero[0].heroHeadline = `<b>BBA</b> <br/> In <br /> <b>Hospital Administration</b>`;
    homepageData.hero[0].heroSubText = `For future <span style="font-weight: 800">LEADERS</span> in Healthcare Industry`;

    homepageData.courses = {
      title: "Course Highlights",
      courseList: [
        {
          id: "c1",
          imagePath: `${process.env.NEXT_PUBLIC_BASE_PATH}assets/images/bba-mha/bba-mha-course.png`,
          title: "BBA in HA, GNA University, Jalandhar",
          description:
            "GNA University is ranked as one of the top universities in Punjab. It was awarded as 'Best University ATC 2017' by PTC University USA. It has a state of the art campus in Phagwara, Jalandhar",
        },
      ],
    };
  }

  return homepageData;
};
