import React, { useEffect, useState } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { getConvertifyProfile } from "../spotify";
import UserStatistic from "./UserStatistic";
import PlaylistCard from "./PlaylistCard";
import Loader from './Loader';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(0);
  const [playlists, setPlaylists] = useState([]);
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      getConvertifyProfile()
        .then((response) => {
          const { profile, followedArtists, playlists } = response;

          setProfile(profile);
          setFollowedArtists(followedArtists);
          setPlaylists(playlists);
          setStatistics([
            { number: playlists.length, label: "Playlists" },
            { number: profile.followers.total, label: "Followers" },
            { number: followedArtists, label: "Following" }
          ]);
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
      {(profile && followedArtists && playlists && statistics) ? (
        <>
          <div className="text-center px-5 mb-5">
            <Image fluid className="rounded-circle" src={profile.images[0].url} width="175" height="175" alt="avatar" />
            <h1 className="my-4 display-4 bold-title">
              <a className="white-to-green" href={profile.external_urls.spotify} target="_blank" rel="noopener noreferrer" title="View your Spotify profile">
                {profile.display_name}
              </a>
            </h1>
            <Container fluid>
              <Row className="d-flex justify-content-center">
                {statistics.map((stat, index) => (
                  <UserStatistic key={index} number={stat.number} label={stat.label} />
                ))}
              </Row>
            </Container>
          </div>
          <Container fluid className="px-5 pb-5">
            <h2 className="display-5 bold-title">Playlists</h2>
            <p className="fs-5 mb-5 gray-text">Select a playlist to convert.</p>
            <Row className="gy-4">
              {playlists.map((playlist, index) => (
                <Col className="d-flex justify-content-center gx-4" key={index}>
                  <PlaylistCard info={playlist} />
                </Col>
              ))}
            </Row>
          </Container>
        </>
      ) : (
        <Loader fullScreen />
      )}
    </>
  );
};

export default Profile;
