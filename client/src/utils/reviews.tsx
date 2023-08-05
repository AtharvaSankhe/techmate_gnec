import rebeccaPic from "../assets/rebecca.svg"
import johnPic from "../assets/john.svg"
import jessicaPic from "../assets/jessica.svg"
interface UserReview {
    id: number;
    name: string;
    review: string;
    pic: string
  }
  
  const userReviews: UserReview[] = [
    {
      id: 1,
      name: "Rebbeca",
      review: "The real-time messaging feature is fantastic! I can engage in meaningful conversations effortlessly, and the privacy controls give me peace of mind. A top-notch app for social connections.",
      pic:rebeccaPic,
    },
    {
      id: 2,
      name: "John",
      review: "I love how this app keeps me informed about local technical events. It's a great way to network and stay updated with the latest in the tech world. Highly useful!",
      pic:johnPic,
    },
    {
      id: 3,
      name: "Jessica",
      review: "As a tech enthusiast, this app is a goldmine! It keeps me informed about local tech events, allowing me to network and expand my knowledge. A must-have for tech-savvy individuals!",
      pic:jessicaPic,
    },
  ];
  
  export default userReviews;
  