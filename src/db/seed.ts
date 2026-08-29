import { db, admins, enquiries, universities, testimonials, faqs, services, blogPosts, settings, consultations } from './index';
import { hashPassword } from '../lib/adminAuth';

async function seed() {
  console.log('🌱 Starting FlyAustria Executive CRM Seed Process...');

  const now = new Date().toISOString();

  // 1. Seed Default Admin User
  const defaultAdminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const defaultAdminEmail = process.env.ADMIN_EMAIL || 'admin@flyaustria.in';
  
  await db.insert(admins).values({
    id: 'admin_default_01',
    email: defaultAdminEmail,
    passwordHash: hashPassword(defaultAdminPassword),
    name: 'Faiz I. (Lead Executive Counselor)',
    role: 'Executive Director & Senior Advisor',
    createdAt: now,
  }).onConflictDoNothing().catch(() => {});

  console.log(`✅ Default Executive Admin Created: ${defaultAdminEmail}`);

  // 2. Seed Sample Enquiries / Leads
  const sampleEnquiries = [
    {
      id: 'enq_arjun_01',
      fullName: 'Arjun S. Nair',
      whatsappNumber: '+91 98765 43210',
      email: 'arjun.nair@gmail.com',
      highestQualification: 'B.Tech Computer Science (CGPA 8.4)',
      targetDegree: 'Master\'s Degree in Data Science',
      preferredIntake: 'Winter Semester 2026 (Oct)',
      additionalNotes: 'Passed IELTS with 7.5. Interested in TU Graz and Uni Vienna. Needs MEA apostille guidance.',
      source: 'hero_form',
      status: 'converted',
      destination: 'Austria',
      adminNotes: 'Admission offer letter received from TU Graz. Visa file locked for VFS Delhi.',
      followUpDate: '2026-09-05',
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      updatedAt: now,
    },
    {
      id: 'enq_pooja_02',
      fullName: 'Pooja Menon',
      whatsappNumber: '+91 98470 11223',
      email: 'pooja.menon@outlook.com',
      highestQualification: 'B.Sc Biotechnology (CGPA 7.9)',
      targetDegree: 'Master\'s Degree in Molecular Biology',
      preferredIntake: 'Winter Semester 2026 (Oct)',
      additionalNotes: 'Has Medium of Instruction (MOI) certificate from MG University. Asking about OEAD dorm deposit.',
      source: 'modal',
      status: 'follow_up',
      destination: 'Austria',
      adminNotes: 'Requested updated MOI certificate stamp from MG Uni Kottayam before portal submission.',
      followUpDate: '2026-08-31',
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      updatedAt: now,
    },
    {
      id: 'enq_rohan_03',
      fullName: 'Rohan Varghese',
      whatsappNumber: '+91 97450 99887',
      email: 'rohan.varghese@yahoo.com',
      highestQualification: 'B.Com Finance (72%)',
      targetDegree: 'Master\'s Degree in International Business',
      preferredIntake: 'Summer Semester 2027 (March)',
      additionalNotes: 'Targeting WU Vienna (Vienna University of Economics). Wants info on spouse dependent visa.',
      source: 'service_enquiry',
      status: 'new',
      destination: 'Austria',
      adminNotes: 'New lead submitted today from Kochi services page.',
      followUpDate: '2026-08-30',
      createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      updatedAt: now,
    },
    {
      id: 'enq_ananya_04',
      fullName: 'Ananya Pillai',
      whatsappNumber: '+91 94471 22334',
      email: 'ananya.p@gmail.com',
      highestQualification: 'B.E. Electronics & Communication',
      targetDegree: 'Master\'s Degree in Embedded Systems',
      preferredIntake: 'Winter Semester 2026 (Oct)',
      additionalNotes: 'Checking JKU Linz and FH Upper Austria. Wants advice on bank savings proof vs blocked account.',
      source: 'checklist',
      status: 'contacted',
      destination: 'Austria',
      adminNotes: 'Conducted 20-min WhatsApp consultation. Shared Austrian embassy financial document checklist.',
      followUpDate: '2026-09-02',
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      updatedAt: now,
    },
    {
      id: 'enq_sidharth_05',
      fullName: 'Sidharth K. Prabhu',
      whatsappNumber: '+91 96330 55443',
      email: 'sidharth.prabhu@gmail.com',
      highestQualification: 'B.Sc Mechanical Engineering',
      targetDegree: 'Master\'s Degree in Automotive Engineering',
      preferredIntake: 'Winter Semester 2026 (Oct)',
      additionalNotes: 'Application sent to TU Wien. Awaiting syllabus match evaluation.',
      source: 'hero_form',
      status: 'in_progress',
      destination: 'Austria',
      adminNotes: 'Portal submission complete. Uni Wien portal ID #88912.',
      followUpDate: '2026-09-10',
      createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
      updatedAt: now,
    }
  ];

  for (const enq of sampleEnquiries) {
    await db.insert(enquiries).values(enq).onConflictDoNothing().catch(() => {});
  }
  console.log(`✅ ${sampleEnquiries.length} Sample Enquiries Seeded.`);

  // 3. Seed Sample Consultations
  const sampleConsultations = [
    {
      id: 'cons_01',
      leadId: 'enq_arjun_01',
      leadName: 'Arjun S. Nair',
      dateTime: '2026-09-01T10:30',
      mode: 'In-Person Kochi',
      notes: 'Final document check & MEA Apostille submission at MG Road office.',
      outcome: 'Apostille documents collected.',
      status: 'scheduled',
      createdAt: now,
    },
    {
      id: 'cons_02',
      leadId: 'enq_pooja_02',
      leadName: 'Pooja Menon',
      dateTime: '2026-08-31T15:00',
      mode: 'WhatsApp Call',
      notes: 'Clarify OEAD dormitory deposit payment via Indian forex card.',
      outcome: 'Pending MOI verification.',
      status: 'scheduled',
      createdAt: now,
    }
  ];

  for (const cons of sampleConsultations) {
    await db.insert(consultations).values(cons).onConflictDoNothing().catch(() => {});
  }
  console.log(`✅ Sample Consultations Seeded.`);

  // 4. Seed Services
  const sampleServices = [
    {
      id: 'srv_01',
      title: 'Public University Admissions Guidance',
      description: 'Personalized shortlisting and formal portal application filing for English-taught Master\'s and Bachelor\'s programs across Austria\'s top public universities.',
      highlights: JSON.stringify([
        'Kerala B.Tech / B.Sc CGPA and syllabus evaluation',
        'Direct portal filing to Uni Vienna, TU Graz, TU Wien, JKU Linz',
        'IELTS exemption / Medium of Instruction (MOI) verification',
        'Official University Admission Letter acquisition'
      ]),
      icon: '🏛️',
      displayOrder: 1,
      isActive: 1,
      createdAt: now,
    },
    {
      id: 'srv_02',
      title: 'MEA Apostille & Legalization',
      description: 'Complete document attestation workflow for educational credentials required by Austrian public universities and Embassy New Delhi.',
      highlights: JSON.stringify([
        'Kerala Home Dept attestation in Trivandrum',
        'MEA Apostille sticker in New Delhi',
        'Certified German translations by sworn translators',
        'Embassy verification support'
      ]),
      icon: '📜',
      displayOrder: 2,
      isActive: 1,
      createdAt: now,
    },
    {
      id: 'srv_03',
      title: 'Student Residence Permit Visa Filing',
      description: 'Expert preparation of Aufenthaltsbewilligung Studierende visa application for VFS New Delhi.',
      highlights: JSON.stringify([
        'Indian bank savings proof (No Sperrkonto required)',
        'Sponsorship affidavit formatting',
        'VFS appointment scheduling & interview prep',
        'Austrian student health insurance'
      ]),
      icon: '🛂',
      displayOrder: 3,
      isActive: 1,
      createdAt: now,
    }
  ];

  for (const srv of sampleServices) {
    await db.insert(services).values(srv).onConflictDoNothing().catch(() => {});
  }
  console.log(`✅ Sample Services Seeded.`);

  // 5. Seed Blog Posts
  const sampleBlogPosts = [
    {
      id: 'blog_01',
      title: 'Austrian Student Visa Document Checklist 2026 for Kerala Students',
      slug: 'austria-student-visa-checklist-2026',
      excerpt: 'Complete guide on MEA apostille attestation, OEAD accommodation proof, and Indian savings bank balance requirement for VFS New Delhi.',
      content: `# Austrian Student Visa Checklist 2026\n\nStudying in Austria offers Kerala graduates a unique opportunity...`,
      coverImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&auto=format&fit=crop&q=80',
      author: 'Faiz I. (Executive Counselor)',
      status: 'published',
      publishedAt: '2026-08-28',
      tags: 'Visa, Checklist, Austria, Kochi',
      createdAt: now,
    },
    {
      id: 'blog_02',
      title: 'Cost of Living in Austria vs Germany for Indian Students',
      slug: 'cost-of-living-austria-kerala-students',
      excerpt: 'Detailed breakdown of student dorm rent, public transport passes, monthly groceries, and €726 semester tuition in Vienna and Graz.',
      content: `# Cost of Living in Austria vs Germany\n\nWhen planning higher studies in Central Europe...`,
      coverImage: 'https://images.unsplash.com/photo-1520520119347-7509139360a0?w=800&auto=format&fit=crop&q=80',
      author: 'FlyAustria Admissions Team',
      status: 'published',
      publishedAt: '2026-08-25',
      tags: 'Living Cost, Vienna, Graz, Budget',
      createdAt: now,
    }
  ];

  for (const post of sampleBlogPosts) {
    await db.insert(blogPosts).values(post).onConflictDoNothing().catch(() => {});
  }
  console.log(`✅ Sample Blog Posts Seeded.`);

  // 6. Seed Global Settings
  const sampleSettings = [
    { id: 'set_01', key: 'hero_headline', value: 'Kerala\'s Exclusive Gateway to Austrian Public Universities', updatedAt: now },
    { id: 'set_02', key: 'hero_subheadline', value: 'Study in Vienna, Graz, or Linz with €726/semester tuition and 100% transparent admission & visa support from Kochi.', updatedAt: now },
    { id: 'set_03', key: 'whatsapp_number', value: '+919876543210', updatedAt: now },
    { id: 'set_04', key: 'trust_visa_rate', value: '99.2%', updatedAt: now },
    { id: 'set_05', key: 'trust_students_count', value: '450+', updatedAt: now }
  ];

  // 7. Seed Universities
  const sampleUniversities = [
    {
      id: 'uni_01',
      name: 'University of Vienna',
      germanName: 'Universität Wien',
      city: 'Vienna',
      tuitionFee: '€726.72 / semester',
      ranking: '#1 in Austria • World Top 130',
      popularCourses: 'Computer Science, Data Science, Molecular Biology, Economics',
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
      websiteUrl: 'https://www.univie.ac.at',
      description: 'Founded in 1365, one of Europe\'s oldest and most prestigious research public universities with top English-taught Master\'s degrees.',
      isFeatured: 1,
      displayOrder: 1,
    },
    {
      id: 'uni_02',
      name: 'TU Graz (Graz University of Technology)',
      germanName: 'Technische Universität Graz',
      city: 'Graz',
      tuitionFee: '€726.72 / semester',
      ranking: '#1 Engineering Tech Uni in Austria',
      popularCourses: 'Software Engineering, Computer Science, Automotive Engineering, Biomedical Engineering',
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80',
      websiteUrl: 'https://www.tugraz.at',
      description: 'Austria\'s premier technical university known for world-class AI, Robotics, and Computer Science research with direct industry links.',
      isFeatured: 1,
      displayOrder: 2,
    },
    {
      id: 'uni_03',
      name: 'TU Wien (Vienna University of Technology)',
      germanName: 'Technische Universität Wien',
      city: 'Vienna',
      tuitionFee: '€726.72 / semester',
      ranking: 'World Top 180 Engineering',
      popularCourses: 'Data Science, Embedded Systems, Architecture, Mechanical Engineering',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
      websiteUrl: 'https://www.tuwien.at',
      description: 'Located in the heart of Vienna, TU Wien combines high-tech innovation with affordable public European tuition.',
      isFeatured: 1,
      displayOrder: 3,
    },
    {
      id: 'uni_04',
      name: 'JKU Linz (Johannes Kepler University)',
      germanName: 'Johannes Kepler Universität Linz',
      city: 'Linz',
      tuitionFee: '€726.72 / semester',
      ranking: 'Top Innovation Hub',
      popularCourses: 'Artificial Intelligence, Business Informatics, Management',
      imageUrl: 'https://images.unsplash.com/photo-1592285850223-87ee1427fefb?w=800&auto=format&fit=crop&q=80',
      websiteUrl: 'https://www.jku.at',
      description: 'Pioneer of Artificial Intelligence degree programs in Europe with modern campus facilities and industry internships.',
      isFeatured: 1,
      displayOrder: 4,
    }
  ];

  for (const uni of sampleUniversities) {
    await db.insert(universities).values(uni).onConflictDoNothing().catch(() => {});
  }
  console.log(`✅ Sample Universities Seeded.`);

  // 8. Seed Testimonials
  const sampleTestimonials = [
    {
      id: 'test_01',
      studentName: 'Arjun S. Nair',
      homeCity: 'Kochi, Kerala',
      universityName: 'TU Graz',
      course: 'M.Sc. Computer Science',
      graduationYear: '2026 Batch',
      quote: 'FlyAustria handled my MEA apostille, university admission at TU Graz, and OEAD dorm booking smoothly from Kochi. Zero blocked account headache!',
      imageUrl: '/images/students/arjun.png',
      visaApprovedDate: 'July 2025',
      rating: 5,
    },
    {
      id: 'test_02',
      studentName: 'Pooja Menon',
      homeCity: 'Trivandrum, Kerala',
      universityName: 'University of Vienna',
      course: 'M.Sc. Molecular Biology',
      graduationYear: '2026 Batch',
      quote: 'The team guided my Medium of Instruction certificate verification with Uni Vienna. Tuition is just €726/sem and Vienna is super safe for female students.',
      imageUrl: '/images/students/pooja.png',
      visaApprovedDate: 'August 2025',
      rating: 5,
    }
  ];

  for (const test of sampleTestimonials) {
    await db.insert(testimonials).values(test).onConflictDoNothing().catch(() => {});
  }
  console.log(`✅ Sample Testimonials Seeded.`);

  // 9. Seed FAQs
  const sampleFaqs = [
    {
      id: 'faq_01',
      category: 'Tuition & Fees',
      question: 'Are public universities in Austria really free or €726 per semester?',
      answer: 'Yes! For non-EU/EEA students (including Indian nationals), tuition fees at Austrian public universities are fixed by federal law at €726.72 per semester (~₹70,000 INR) plus €22.70 ÖH student union membership.',
      order: 1,
      isPublished: 1,
    },
    {
      id: 'faq_02',
      category: 'Visa & Bank Proof',
      question: 'Do I need a Sperrkonto (Blocked Account) like Germany?',
      answer: 'No! Austria does NOT require a blocked account. You can show proof of sufficient funds in a standard Indian savings bank account or fixed deposit in your or your parent\'s name.',
      order: 2,
      isPublished: 1,
    },
    {
      id: 'faq_03',
      category: 'Language & IELTS',
      question: 'Can I study Master\'s in Austria in English without knowing German?',
      answer: 'Yes. Top public universities like University of Vienna, TU Graz, TU Wien, and JKU Linz offer over 50+ fully English-taught Master\'s programs. A Medium of Instruction (MOI) certificate from a recognized Kerala university or IELTS 6.5+ is accepted.',
      order: 3,
      isPublished: 1,
    },
    {
      id: 'faq_04',
      category: 'Part-Time Work',
      question: 'Can Indian students work part-time while studying in Austria?',
      answer: 'Yes! International students holding an Aufenthaltsbewilligung Studierende permit are legally allowed to work up to 20 hours per week during semesters with full work permit rights.',
      order: 4,
      isPublished: 1,
    },
    {
      id: 'faq_05',
      category: 'Apostille & Legalization',
      question: 'What is MEA Apostille and degree attestation in Kerala?',
      answer: 'Before submitting your application to Austrian universities or Embassy Delhi, your Kerala degree certificates and transcripts must undergo Home Department attestation in Trivandrum followed by MEA Apostille sticker from New Delhi.',
      order: 5,
      isPublished: 1,
    }
  ];

  for (const faq of sampleFaqs) {
    await db.insert(faqs).values(faq).onConflictDoNothing().catch(() => {});
  }
  console.log(`✅ Sample FAQs Seeded.`);

  console.log('🎉 FlyAustria Executive CRM Seed Completed Successfully!');
}

seed().catch((err) => {
  console.error('❌ Seed Failed:', err);
});
