import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { convertPlaylist, getPlaylistConverter } from "../spotify";
import "./PlaylistConverter.css";
import PillButton from "./PillButton";
import Switch from "./Switch";
import Loader from './Loader';

const PlaylistConverter = () => {
  const { playlistId } = useParams();

  const [userId, setUserId] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [items, setItems] = useState([]);
  const [toClean, setToClean] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      getPlaylistConverter(playlistId)
        .then((response) => {
          const { userId, playlist, items } = response;

          setUserId(userId);
          setPlaylist(playlist);
          setItems(items);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, [playlistId]);

  useEffect(() => document.title = `Convertify | Playlists${playlist ? ` | ${playlist.name}` : ``}`, [playlist]);

  return (
    <>
      {(userId && playlist && items) ? (
        <Row>
          <Col className="text-center mb-5 affix" md={6} xl={{ span: 5, offset: 1 }}>
            <img
              className="mb-3"
              src={playlist.images.length > 0 ? playlist.images[0].url : process.env.PUBLIC_URL + "/empty-playlist.png"}
              alt="playlist"
              width="250"
              height="250"
            />
            <h1 className="playlist-title display-5 bold-title mb-2">{playlist.name}</h1>
            <p className="bold-title mb-5">By {playlist.owner.display_name}</p>
            <div className="d-flex align-items-center justify-content-center">
              <span className="me-4 label-text">EXPLICIT </span>
              <Switch isOn={toClean} handleToggle={() => setToClean(!toClean)} title="Toggle the conversion type" />
              <span className="ms-4 label-text"> CLEAN</span>
            </div>
            <div className="py-3" />
            <PillButton
              text="Convert"
              title={`Convert ${playlist.name} to ${toClean ? "clean" : "explicit"}`}
              // href="/"
              disabled={playlist.images.length > 0 ? false : true}
              onClick={() => convertPlaylist(userId, playlist.name, items, toClean)}
            />
          </Col>
          <Col xs={{ span: 10, offset: 1 }} md={{ span: 5, offset: 6 }} xl={{ span: 4, offset: 6 }}>
            {items.map((item, index) => (
              <div key={index}>
                <img
                  className="track-image float-start"
                  src={item.track.album.images[0] && item.track.album.images[0].url}
                  alt="track"
                  width="45"
                  height="45"
                />
                <div className="d-inline">
                  <p className="m-0 truncate-text">{item.track.name}</p>
                  <p className="artist-names truncate-text">
                    {item.track.explicit && !toClean && <span>&#127348; </span>}
                    {item.track.artists.map((artist, index) => (index < item.track.artists.length - 1 ? artist.name + ", " : artist.name))}
                    &nbsp;&nbsp;·&nbsp;&nbsp;
                    {item.track.album.name}
                  </p>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PlaylistConverter;
