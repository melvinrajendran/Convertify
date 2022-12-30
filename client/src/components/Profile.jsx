import React, { useEffect, useState } from "react";
import { getDataByUrl, getConvertifyProfile } from "../spotify";
import User from "./User";
import Playlists from "./Playlists";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [followedArtists, setFollowedArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { user, followedArtists, playlists } = await getConvertifyProfile();
      setUser(user);

      const artistArr = [];
      let nextAUrl = followedArtists.artists.href;
      do {
        const nextArtists = await getDataByUrl(nextAUrl);
        artistArr.push(...nextArtists.data.artists.items);
        nextAUrl = nextArtists.data.artists.next;
      } while (nextAUrl !== null);
      setFollowedArtists(artistArr);

      const playlistArr = [];
      let nextPUrl = playlists.href;
      do {
        const nextPlaylists = await getDataByUrl(nextPUrl);
        playlistArr.push(...nextPlaylists.data.items);
        nextPUrl = nextPlaylists.data.next;
      } while (nextPUrl !== null);
      setPlaylists(playlistArr);
    };
    fetchData();

    document.title = "Convertify | Profile";
  }, []);

  return (
    <>
      {user && followedArtists && playlists && (
        <>
          <User
            user={user}
            statistics={[
              { number: playlists.length, label: "Playlists" },
              { number: user.followers.total, label: "Followers" },
              { number: followedArtists.length, label: "Following" }
            ]}
          />
          <Playlists playlists={playlists} />
        </>
      )}
    </>
  );
};

export default Profile;
