import { useMutation } from "@apollo/client";
import {
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  StarIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ADD_TWEET } from "../graphql/Mutation";
import { GET_ALL_TWEETS } from "../graphql/Query";
import TweetButton from "./TweetButton";

function TweetBox() {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string>("");
  const [isImageSeleted, setIsImageSeleted] = useState(false);
  const [addTweet, { data, error, loading }] = useMutation(ADD_TWEET);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (description.length <= 5) {
      const x = toast("Please write atleast 6 characters", {
        duration: 2500,
      });
      return;
    }
    const x = toast("Tweeting...", {});
    const id = localStorage.getItem("authId");
    const response = await addTweet({
      variables: {
        addTweetId: parseFloat(id!),
        tweetInput: {
          description,
          image,
          isRepost: false,
        },
      },
      refetchQueries: [GET_ALL_TWEETS, "getTweets"],
    });
    if (response.data.addTweet) {
      toast("Tweeted Successfully", {
        duration: 2000,
        id: x,
      });
      setDescription("");
      setImage("");
    } else {
      toast("Error Ocurred! :(", {
        duration: 2000,
      });
      setDescription("");
      setImage("");
    }
  };

  return (
    <div className="bg-black w-full h-fit pb-4">
      <Toaster />
      <div className="w-full flex flex-row items-center justify-between text-textWhiteH px-8 py-4">
        <p className="text-2xl font-bold">Home</p>
        <div className="h-10 w-10 sm:h-8 sm:w-8">
          <StarIcon />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center lg:items-start lg:justify-between w-full h-full px-0 lg:px-5">
        <img
          className="w-0 h-0 lg:w-[55px] lg:h-[55px] rounded-full mt-5"
          src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
        />
        <div className="h-full w-[87%]">
          <form className="flex flex-col space-y-5" onSubmit={onFormSubmit}>
            <input
              placeholder="What's Happening?"
              inputMode="text"
              style={{ textTransform: "capitalize" }}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-black w-full h-14 lg:h-16 text-textWhiteH border-textWhiteH border-b-2 font-semibold text-lg focus:outline-none focus:border-b-textWhiteH caret-twitterBlue px-4"
            />
            <div className="flex items-center justify-between">
              <div
                className={"h-fit w-fit flex flex-row text-textWhiteH gap-1"}
              >
                <div
                  className={
                    !isImageSeleted ? "h-6 w-6" : "h-6 w-6 text-twitterBlue"
                  }
                >
                  <PhotographIcon
                    name="tweetImage"
                    onClick={() => setIsImageSeleted(!isImageSeleted)}
                  />
                </div>
                <div className="h-6 w-6">
                  <ChartBarIcon />
                </div>
                <div className="h-6 w-6">
                  <EmojiHappyIcon />
                </div>
                <div className="h-6 w-6">
                  <LocationMarkerIcon />
                </div>
              </div>
              <input
                className={!isImageSeleted ? "hidden" : "my-2 text-textWhite"}
                type={"text"}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
              <TweetButton styles="text-black bg-twitterBlue h-12 w-[20%] text-center rounded-full text-lg md:text-xl text-bold" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TweetBox;
