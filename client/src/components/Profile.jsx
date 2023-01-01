import React, { useEffect, useState } from "react";
import { getConvertifyProfile } from "../spotify";
import User from "./User";
import Playlists from "./Playlists";
import Loader from './Loader';
import Footer from './Footer';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(0);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      getConvertifyProfile()
        .then((response) => {
          const { profile, followedArtists, playlists } = response;

          setProfile(profile);
          setFollowedArtists(followedArtists);
          setPlaylists(playlists);
        })
        .catch((error) => {
          console.log(error);
        })
    };

    fetchData();

    document.title = "Convertify | Profile";
  }, []);

  return (
    <>
      {(profile && followedArtists && playlists) ? (
        <>
          <User
            user={profile}
            statistics={[
              { number: playlists.length, label: "Playlists" },
              { number: profile.followers.total, label: "Followers" },
              { number: followedArtists, label: "Following" }
            ]}
          />
          <Playlists playlists={playlists} />
          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Profile;
