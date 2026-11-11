const tfiData = {
  heroes: [
    {
      id: "prabhas",
      name: "Prabhas",
      title: "Rebel Star / Pan-India Superstar",
      debut: "Eeswar (2002)",
      totalGross: 4850,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
      description: "Redefined Indian cinema box office boundaries with the Baahubali franchise, Kalki 2898 AD, and Salaar."
    },
    {
      id: "mahesh",
      name: "Mahesh Babu",
      title: "Superstar",
      debut: "Rajakumarudu (1999)",
      totalGross: 2400,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
      description: "King of Nizam box office, known for charismatic screen presence, iconic dialogue delivery, and record openings."
    },
    {
      id: "allu_arjun",
      name: "Allu Arjun",
      title: "Icon Star",
      debut: "Gangotri (2003)",
      totalGross: 2900,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
      description: "National Award winner and global icon famous for unparalleled dance style, swagger, and Pushpa phenomenon."
    },
    {
      id: "ram_charan",
      name: "Ram Charan",
      title: "Global Star",
      debut: "Chirutha (2007)",
      totalGross: 2750,
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=80",
      description: "Powerhouse performer renowned for Magadheera, Rangasthalam, and the Oscar-winning RRR."
    },
    {
      id: "jr_ntr",
      name: "Jr NTR",
      title: "Man of Masses",
      debut: "Ninnu Choodalani (2001)",
      totalGross: 2600,
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80",
      description: "Master of dialogue delivery, high-octane emotion, and breathtaking screen presence across generations."
    },
    {
      id: "chiranjeevi",
      name: "Megastar Chiranjeevi",
      title: "Megastar",
      debut: "Pranam Khareedu (1978)",
      totalGross: 1850,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
      description: "The undisputed pillar of Tollywood for over 4 decades with unparalleled mass craze and record hits."
    },
    {
      id: "pawan_kalyan",
      name: "Pawan Kalyan",
      title: "Power Star",
      debut: "Akkada Ammayi Ikkada Abbayi (1996)",
      totalGross: 1650,
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80",
      description: "Cult icon with an unmatched fan following, defined Youth trends with Tholi Prema, Kushi, and Gabbar Singh."
    },
    {
      id: "nani",
      name: "Nani",
      title: "Natural Star",
      debut: "Ashta Chamma (2008)",
      totalGross: 1100,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80",
      description: "Versatile actor loved for relatable storytelling, emotional depth, and consistent box office performance."
    }
  ],

  movies: [
    { title: "Kalki 2898 AD", hero: "Prabhas", director: "Nag Ashwin", year: 2024, gross: 1100, verdict: "All-Time Blockbuster" },
    { title: "Baahubali 2: The Conclusion", hero: "Prabhas", director: "S. S. Rajamouli", year: 2017, gross: 1810, verdict: "Industry Hit" },
    { title: "Baahubali: The Beginning", hero: "Prabhas", director: "S. S. Rajamouli", year: 2015, gross: 650, verdict: "Industry Hit" },
    { title: "Salaar: Part 1 - Ceasefire", hero: "Prabhas", director: "Prashanth Neel", year: 2023, gross: 715, verdict: "Blockbuster" },
    { title: "Saaho", hero: "Prabhas", director: "Sujeeth", year: 2019, gross: 435, verdict: "Hit" },
    { title: "Mirchi", hero: "Prabhas", director: "Koratala Siva", year: 2013, gross: 80, verdict: "Super Hit" },
    
    { title: "RRR", hero: "Ram Charan", director: "S. S. Rajamouli", year: 2022, gross: 1380, verdict: "Industry Hit" },
    { title: "Rangasthalam", hero: "Ram Charan", director: "Sukumar", year: 2018, gross: 216, verdict: "Blockbuster" },
    { title: "Magadheera", hero: "Ram Charan", director: "S. S. Rajamouli", year: 2009, gross: 150, verdict: "Industry Hit" },
    { title: "Dhruva", hero: "Ram Charan", director: "Surender Reddy", year: 2016, gross: 88, verdict: "Super Hit" },

    { title: "Devara: Part 1", hero: "Jr NTR", director: "Koratala Siva", year: 2024, gross: 520, verdict: "Blockbuster" },
    { title: "Janatha Garage", hero: "Jr NTR", director: "Koratala Siva", year: 2016, gross: 135, verdict: "Blockbuster" },
    { title: "Aravinda Sametha", hero: "Jr NTR", director: "Trivikram Srinivas", year: 2018, gross: 165, verdict: "Super Hit" },
    { title: "Temper", hero: "Jr NTR", director: "Puri Jagannadh", year: 2015, gross: 75, verdict: "Super Hit" },

    { title: "Pushpa 2: The Rule", hero: "Allu Arjun", director: "Sukumar", year: 2024, gross: 1400, verdict: "All-Time Blockbuster" },
    { title: "Pushpa: The Rise", hero: "Allu Arjun", director: "Sukumar", year: 2021, gross: 360, verdict: "Blockbuster" },
    { title: "Ala Vaikunthapurramuloo", hero: "Allu Arjun", director: "Trivikram Srinivas", year: 2020, gross: 280, verdict: "All-Time Blockbuster" },
    { title: "Sarrainodu", hero: "Allu Arjun", director: "Boyapati Srinu", year: 2016, gross: 128, verdict: "Blockbuster" },

    { title: "Guntur Kaaram", hero: "Mahesh Babu", director: "Trivikram Srinivas", year: 2024, gross: 230, verdict: "Hit" },
    { title: "Sarkaru Vaari Paata", hero: "Mahesh Babu", director: "Parasuram", year: 2022, gross: 230, verdict: "Hit" },
    { title: "Sarileru Neekevvaru", hero: "Mahesh Babu", director: "Anil Ravipudi", year: 2020, gross: 260, verdict: "Blockbuster" },
    { title: "Maharshi", hero: "Mahesh Babu", director: "Vamshi Paidipally", year: 2019, gross: 200, verdict: "Super Hit" },
    { title: "Bharat Ane Nenu", hero: "Mahesh Babu", director: "Koratala Siva", year: 2018, gross: 225, verdict: "Super Hit" },
    { title: "Srimanthudu", hero: "Mahesh Babu", director: "Koratala Siva", year: 2015, gross: 200, verdict: "Industry Hit" },
    { title: "Dookudu", hero: "Mahesh Babu", director: "Srinu Vaitla", year: 2011, gross: 101, verdict: "Industry Hit" },

    { title: "Waltair Veerayya", hero: "Megastar Chiranjeevi", director: "K. S. Ravindra", year: 2023, gross: 236, verdict: "Blockbuster" },
    { title: "Sye Raa Narasimha Reddy", hero: "Megastar Chiranjeevi", director: "Surender Reddy", year: 2019, gross: 240, verdict: "Hit" },
    { title: "Khaidi No. 150", hero: "Megastar Chiranjeevi", director: "V. V. Vinayak", year: 2017, gross: 164, verdict: "Blockbuster" },
    { title: "Indra", hero: "Megastar Chiranjeevi", director: "B. Gopal", year: 2002, gross: 55, verdict: "Industry Hit" },

    { title: "Bheemla Nayak", hero: "Pawan Kalyan", director: "Saagar K Chandra", year: 2022, gross: 192, verdict: "Super Hit" },
    { title: "Vakeel Saab", hero: "Pawan Kalyan", director: "Venu Sriram", year: 2021, gross: 137, verdict: "Hit" },
    { title: "Attarintiki Daredi", hero: "Pawan Kalyan", director: "Trivikram Srinivas", year: 2013, gross: 131, verdict: "Industry Hit" },
    { title: "Gabbar Singh", hero: "Pawan Kalyan", director: "Harish Shankar", year: 2012, gross: 110, verdict: "Industry Hit" },

    { title: "Dasara", hero: "Nani", director: "Srikanth Odela", year: 2023, gross: 118, verdict: "Blockbuster" },
    { title: "Hi Nanna", hero: "Nani", director: "Shouryuv", year: 2023, gross: 75, verdict: "Super Hit" },
    { title: "Saripodhaa Sanivaram", hero: "Nani", director: "Vivek Athreya", year: 2024, gross: 100, verdict: "Super Hit" },
    { title: "Eega", hero: "Nani", director: "S. S. Rajamouli", year: 2012, gross: 125, verdict: "Blockbuster" },
    { title: "Jersey", hero: "Nani", director: "Gowtam Tinnanuri", year: 2019, gross: 70, verdict: "Super Hit" }
  ]
};