import React, { useEffect, useState } from "react";
import PillButton from "../common/buttons/PillButton";
import { getUserProfile, logOut } from "../../spotify";

function Profile() {
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { user, playlists } = await getUserProfile();
      setUser(user);
      setPlaylists(playlists);
    };
    fetchData();
  }, []);

  return (
    <div className="p-5">
      {user ? (
        <div>
          <div className="text-center">
            <img className="img-fluid rounded-circle mt-5" src={user.images[0].url} width="225" height="225" alt="avatar" />
            {playlists && console.log(playlists)}
            <h1 className="my-5 display-4 bold-title">{user.display_name}</h1>
            <PillButton outline text="Logout" href="/" onClick={logOut} />
          </div>

          <h2 className="mt-5 mb-4 display-5 bold-title">Playlists</h2>
          {playlists &&
            playlists.items.map((playlist) => {
              return <img className="m-5" src={playlist.images[0].url} width="240" height="240" alt="playlist"></img>;
            })}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Profile;
