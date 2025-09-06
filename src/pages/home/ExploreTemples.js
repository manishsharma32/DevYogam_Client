import React from "react";
import Grid from "@mui/material/Grid";
import ServiceCard from "../../component/ServiceCard";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SpaIcon from "@mui/icons-material/Spa";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CustomCarousel from "../../component/CustomCarousel";
import TempleCard from "../../component/TempleCardCarousal";
const services = [
  {
    id: 54,
    slug: "kamtanath-temple-chitrakoot",
    is_active: true,
    sequence_number: 54,
    benefit_tags: [
      {
        id: 321,
        desc: "Professional growth",
        types: "temple_benefit_tag",
        lang_type: "english",
        benefit_tag: 2,
      },
      {
        id: 323,
        desc: "Limitless success",
        types: "temple_benefit_tag",
        lang_type: "english",
        benefit_tag: 3,
      },
    ],
    deity: [
      {
        id: 27,
        name: "Lord Kamtanath",
        types: "deity",
        lang_type: "english",
        deity: 41,
      },
    ],
    creatives: [
      {
        id: 1,
        image_md:
          "https://d1e93yen0ejier.cloudfront.net/uploads/temple/creatives/images/md/Kaamadgiri_Temple_thumbnail__size_._jpg.jpg",
        lang_type: "english",
        types: "main",
        video_url: null,
      },
    ],
    multilingual_data: [
      {
        id: 109,
        name: "Kamatanath Temple",
        tag: null,
        short_name: "Kamatanath Temple",
        location: "Chitrakoot Dham",
        types: "temple",
        cta_text: "Visit Temple",
        lang_type: "english",
        temple: 54,
      },
    ],
  },
  {
    id: 134,
    slug: "kali-mata-mandir-haridwar",
    is_active: true,
    sequence_number: 133,
    benefit_tags: [
      {
        id: 351,
        desc: "Inner Peace",
        types: "temple_benefit_tag",
        lang_type: "english",
        benefit_tag: 4,
      },
      {
        id: 349,
        desc: "Joyful parenthood",
        types: "temple_benefit_tag",
        lang_type: "english",
        benefit_tag: 6,
      },
      {
        id: 425,
        desc: "Timely Marriage",
        types: "temple_benefit_tag",
        lang_type: "english",
        benefit_tag: 10,
      },
    ],
    deity: [
      {
        id: 44,
        name: "Goddess Kali",
        types: "deity",
        lang_type: "english",
        deity: 35,
      },
    ],
    creatives: [
      {
        id: 98,
        image_md:
          "https://d1e93yen0ejier.cloudfront.net/uploads/temple/creatives/images/md/Kaali_Mata_Temple_thumbnail__size_.jpg",
        lang_type: "english",
        types: "main",
        video_url: null,
      },
    ],
    multilingual_data: [
      {
        id: 266,
        name: "Kali Mata Temple, Shyampur",
        tag: null,
        short_name: "Kali Mata Temple",
        location: "Haridwar",
        types: "temple",
        cta_text: "Visit Temple",
        lang_type: "english",
        temple: 134,
      },
    ],
  },
  {
    id: 2,
    slug: "pashupatinath-teerth-kshetra",
    is_active: true,
    sequence_number: 2,
    benefit_tags: [
      {
        id: 425,
        desc: "Timely Marriage",
        types: "temple_benefit_tag",
        lang_type: "english",
        benefit_tag: 10,
      },
      {
        id: 427,
        desc: "Happy Relationship",
        types: "temple_benefit_tag",
        lang_type: "english",
        benefit_tag: 11,
      },
      {
        id: 429,
        desc: "Emotional Healing",
        types: "temple_benefit_tag",
        lang_type: "english",
        benefit_tag: 12,
      },
    ],
    deity: [
      {
        id: 1,
        name: "Mahadev",
        types: "deity",
        lang_type: "english",
        deity: 1,
      },
    ],
    creatives: [
      {
        id: 290,
        image_md:
          "https://d1e93yen0ejier.cloudfront.net/uploads/temple/creatives/images/md/Pashupatinath_Temple_thumbnail__size_.jpg",
        lang_type: "english",
        types: "main",
        video_url: null,
      },
    ],
    multilingual_data: [
      {
        id: 5,
        name: "Pashupatinath Teerth Kshetra",
        tag: null,
        short_name: "Pashupatinath Teerth Kshetra",
        location: "Nepal",
        types: "temple",
        cta_text: "Visit Temple",
        lang_type: "english",
        temple: 2,
      },
    ],
  },
  {
    id: 31,
    slug: "shaktipeeth-varahi-devi-temple",
    is_active: true,
    sequence_number: 31,
    benefit_tags: [
      {
        id: 425,
        desc: "Timely Marriage",
        types: "temple_benefit_tag",
        lang_type: "english",
        benefit_tag: 10,
      },
      {
        id: 427,
        desc: "Happy Relationship",
        types: "temple_benefit_tag",
        lang_type: "english",
        benefit_tag: 11,
      },
      {
        id: 479,
        desc: "Free from bad vibes",
        types: "temple_benefit_tag",
        lang_type: "english",
        benefit_tag: 15,
      },
    ],
    deity: [
      {
        id: 42,
        name: "Goddess Varahi",
        types: "deity",
        lang_type: "english",
        deity: 31,
      },
    ],
    creatives: [
      {
        id: 90,
        image_md:
          "https://d1e93yen0ejier.cloudfront.net/uploads/temple/creatives/images/md/Varahi_Mata_Temple_thumbnail__size_.jpg",
        lang_type: "english",
        types: "main",
        video_url: null,
      },
    ],
    multilingual_data: [
      {
        id: 63,
        name: "Shaktipeeth Varahi Devi Temple",
        tag: null,
        short_name: "Varahi Devi Temple",
        location: "Devi Dhura, Uttarakhand",
        types: "temple",
        cta_text: "Visit Temple",
        lang_type: "english",
        temple: 31,
      },
    ],
  },

];

const slides = [
  {
    image:
      "https://media.istockphoto.com/id/1440523094/photo/bagan.jpg?s=1024x1024&w=is&k=20&c=YmXxVVM735yatgpIi4qYLPdVXf9CS-HB04dfSmJj5jc=",
    title: "Welcome to DevYogam",
    description: "A divine journey begins here.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1732552146864-857c7d1db9e0?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Spiritual Pooja Services",
    description: "Book sacred rituals online anytime.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1676731790152-fe6f3b9eb025?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Visit Mandir",
    description: "Explore famous temples and holy places.",
  },
];

export default function ExploreTemples() {
  return (
    <Box sx={{ width: "88%", maxWidth: 1300, mx: "auto", my: 5 }}>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: "2.5rem",
          fontWeight: 600,
          mb: 4,
          textAlign: "center",
        }}
      >
        Explore Temples
      </Typography>
      <Grid container spacing={1} py={4} justifyContent={"center"}>
        {services.map((service, idx) => (
          <Grid sx={{}} spacing={0} item size={{ xs: 6, md: 6, sm: 4, lg: 3 }}>
            <TempleCard items={slides} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
