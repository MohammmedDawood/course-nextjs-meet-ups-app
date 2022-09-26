import { MongoClient, ObjectId } from "mongodb";
import React from "react";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://mohammeddawood:test1234@cluster0.iidfcts.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking", // or true to regenrate pages on the fly but blocking will wait for the page to be generated after data fetched
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),

    // [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    // ],
  };
}

//static generation - pre-rendering SSG
export async function getStaticProps(context) {
  // console.log(context);
  // fetch data from an API
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://mohammeddawood:test1234@cluster0.iidfcts.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();
  // console.log(selectedMeetup);
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
      // {
      //   image:
      //     "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
      //   id: meetupId,
      //   title: "A first meetup",
      //   address: "Meetupstreet 5, 12345 Meetup City",
      //   description: "This is a first meetup",
      // },
    },
    revalidate: 1, // regenerate the page every 1 seconds
  };
}

export default MeetupDetails;
