import React from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <MeetupDetail
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
      title="A first meetup"
      address="Meetupstreet 5, 12345 Meetup City"
      description="This is a first meetup"
    />
  );
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

//static generation - pre-rendering SSG
export async function getStaticProps(context) {
  // console.log(context);
  // fetch data from an API
  const meetupId = context.params.meetupId;
  // console.log(meetupId);
  return {
    props: {
      meetupData: {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
        id: meetupId,
        title: "A first meetup",
        address: "Meetupstreet 5, 12345 Meetup City",
        description: "This is a first meetup",
      },
    },
    revalidate: 1, // regenerate the page every 1 seconds
  };
}

export default MeetupDetails;
