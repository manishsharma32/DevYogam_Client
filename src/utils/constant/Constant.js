import avatar1 from "../../assests/avatar1.jpg";
import avatar2 from "../../assests/avatar2.jpg";
import avatar3 from "../../assests/avatar3.jpg";
import avatar4 from "../../assests/avatar4.jpg";
import avatar5 from "../../assests/avatar5.jpg";
// import avatar6 from "../assests/avatar6.jpg";
// import avatar7 from "../assests/avatar7.jpg";
// import avatar8 from "../assests/avatar8.jpg";
// import avatar9 from "../assests/avatar9.jpg";
// import avatar10 from "../assests/avatar10.jpg";

export const baseURL = process.env.REACT_APP_API_BASE_URL_SERVER_V2
// export const baseURL = process.env.REACT_APP_API_BASE_URL_SERVER
// export const baseURL = process.env.REACT_APP_API_BASE_URL_LOCAL;
// export const baseURL = 'http://localhost:5000'

export const reviewsData = [
  { 
    avatar: avatar1,
    name: "Ajay Sharma",
    nameHi: "अजय शर्मा",
    designation: "Software Developer",
    designationHi: "सॉफ्टवेयर डेवलपर",
    mainQuote: "Excellent",
    mainQuoteHi: "उत्कृष्ट",
    review:
      "Booked  the Baba Mahakal Chadhava from Dev Yogam, I clear my job interview. Receiving the video and prasad.",
    reviewHi:
      "देव योगम से बाबा महाकाल चढ़ावा बुक किया, मेरी नौकरी की इंटरव्यू क्लियर हुई। वीडियो और प्रसाद प्राप्त हुआ।",
  },
  {
    avatar: avatar2,
    name: "Priyansh Verma",
    nameHi: "प्रियांश वर्मा",
    designation: "Graphic Designer",
    designationHi: "ग्राफिक डिजाइनर",
    mainQuote: "Life Changing",
    mainQuoteHi: "सुन्दर अनुभव",
    review:
      "The puja services exceeded my expectations and brought peace during challenging times. Every moment felt uplifting and filled with positivity.",
    reviewHi:
      "पूजा सेवाओं ने मेरी अपेक्षाओं से बढ़कर काम किया और कठिन समय में शांति दी। हर पल उत्साहजनक और सकारात्मकता से भरा था।",
  },
  {
    avatar: avatar3,
    name: "Rahul Singh",
    nameHi: "राहुल सिंह",
    designation: "Teacher",
    designationHi: "शिक्षक",
    mainQuote: "Truly Divine",
    mainQuoteHi: "बहुत लाभकारी",
    review:
      "From booking to receiving the prasad, everything was seamless and comforting. I felt deeply connected throughout the entire process.",
    reviewHi:
      "बुकिंग से लेकर प्रसाद प्राप्त करने तक सब कुछ सहज और सांत्वनादायक था। पूरे प्रक्रिया के दौरान गहरा जुड़ाव महसूस किया।",
  },
  {
    avatar: avatar4,
    name: "Nikhil Shah",
    nameHi: "निखिल शाह",
    designation: "Business Owner",
    designationHi: "व्यवसायी",
    mainQuote: "Heart Touching",
    mainQuoteHi: "धन्यवाद देव योगम",
    review:
      "The personal care during the puja made me feel valued and blessed. It’s a service I would happily recommend to every devotee.",
    reviewHi:
      "पूजा के दौरान व्यक्तिगत देखभाल ने मुझे सम्मानित और धन्य महसूस कराया। यह सेवा मैं हर भक्त को खुशी से सुझाऊंगा।",
  },
  {
    avatar: avatar5,
    name: "Amit Chauhan",
    nameHi: "अमित चौहान",
    designation: "Lawyer",
    designationHi: "वकील",
    mainQuote: "Great Experience",
    mainQuoteHi: "शानदार अनुभव",
    review:
      "After the puja, I felt a wave of clarity and spiritual relief. The divine energy and blessings were truly felt even from afar.",
    reviewHi:
      "पूजा के बाद मैंने स्पष्टता और आध्यात्मिक शांति की लहर महसूस की। दिव्य ऊर्जा और आशीर्वाद दूर से भी सचमुच महसूस हुए।",
  },
];
