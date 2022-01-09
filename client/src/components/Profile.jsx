import React, { useEffect, useState } from "react";
import { getUserProfile } from "../spotify";
import User from "./User";
import Playlists from "./Playlists";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { user, playlists, followedArtists } = await getUserProfile();
      setUser(user);
      setPlaylists(playlists);
      setFollowedArtists(followedArtists);
    };
    fetchData();

    document.title = "Convertify | Profile";
  }, []);

  const userStatistics = [
    { number: playlists ? playlists.items.length : 0, label: "Playlists" },
    { number: user ? user.followers.total : 0, label: "Followers" },
    { number: followedArtists ? followedArtists.artists.items.length : 0, label: "Following" }
  ];

  return (
    <>
      {user && playlists && followedArtists && (
        <>
          <User imageUrl={user.images[0].url} profileUrl={user.external_urls.spotify} name={user.display_name} statistics={userStatistics} />
          <Playlists playlists={playlists} />
        </>
      )}
    </>
  );
};

export default Profile;
