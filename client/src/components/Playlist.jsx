import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getPlaylist } from "../spotify";
import "./Playlist.css";

const Playlist = () => {
  const { playlistId } = useParams();

  const [playlist, setPlaylist] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylist(playlistId);
      setPlaylist(data);
    };
    fetchData();
  }, [playlistId]);

  useEffect(() => (document.title = `Spotify Cleaner | Playlists${playlist ? ` | ${playlist.name}` : ``}`), [playlist]);

  return (
    <>
      {playlist && (
        <>
          <Container fluid className="text-center">
            <img className="mb-3" src={playlist.images[0].url} alt="playlist" width="250" height="250" />
            <h1 className=" display-5 bold-title mb-2">{playlist.name}</h1>
            <p className="bold-title">By {playlist.owner.display_name}</p>
          </Container>
          <Container fluid className="p-5">
            <Row>
              <Col md={6} xl={{ span: 5, offset: 1 }} className="px-md-5 d-none d-md-block">
                {playlist.tracks.items.map((playlistTrack, index) => (
                  <div key={index} className="p-1">
                    <img className="track-image float-start" src={playlistTrack.track.album.images[0] && playlistTrack.track.album.images[0].url} alt="track" width="45" height="45" />
                    <div className="d-inline">
                      <p className="m-0 truncate-text">{playlistTrack.track.name}</p>
                      <p className="artist-names truncate-text">
                        {playlistTrack.track.explicit && <span>&#127348; </span>}
                        {playlistTrack.track.artists.map((artist, index) => (index < playlistTrack.track.artists.length - 1 ? artist.name + ", " : artist.name))}
                        &nbsp;&nbsp;·&nbsp;&nbsp;
                        {playlistTrack.track.album.name}
                      </p>
                    </div>
                  </div>
                ))}
              </Col>
              <Col md={6} xl={{ span: 5 }} className="px-md-5">
                {playlist.tracks.items.map((playlistTrack, index) => (
                  <div key={index} className="p-1">
                    <img className="track-image float-start" src={playlistTrack.track.album.images[0] && playlistTrack.track.album.images[0].url} alt="track" width="45" height="45" />
                    <div className="d-inline">
                      <p className="m-0 truncate-text">{playlistTrack.track.name}</p>
                      <p className="artist-names truncate-text">
                        {playlistTrack.track.explicit && <span>&#127348; </span>}
                        {playlistTrack.track.artists.map((artist, index) => (index < playlistTrack.track.artists.length - 1 ? artist.name + ", " : artist.name))}
                        &nbsp;&nbsp;·&nbsp;&nbsp;
                        {playlistTrack.track.album.name}
                      </p>
                    </div>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default Playlist;
