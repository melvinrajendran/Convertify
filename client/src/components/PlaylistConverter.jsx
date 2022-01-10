import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getDataByUrl, getPlaylist } from "../spotify";
import "./PlaylistConverter.css";
import PillButton from "./PillButton";
import Switch from "./Switch";

const PlaylistConverter = () => {
  const { playlistId } = useParams();

  const [playlist, setPlaylist] = useState(null);
  const [items, setItems] = useState([]);

  const [toClean, setToClean] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylist(playlistId);
      setPlaylist(data);

      const itemArr = [];
      let nextUrl = data.tracks.href;
      do {
        const nextItems = await getDataByUrl(nextUrl);
        itemArr.push(...nextItems.data.items);
        nextUrl = nextItems.data.next;
      } while (nextUrl !== null);
      setItems(itemArr);
    };
    fetchData();
  }, [playlistId]);

  useEffect(() => (document.title = `Convertify | Playlists${playlist ? ` | ${playlist.name}` : ``}`));

  return (
    <>
      {playlist && (
        <Row>
          <Col className="text-center mb-5 affix" md={6} xl={{ span: 5, offset: 1 }}>
            <img className="mb-3" src={playlist.images[0].url} alt="playlist" width="250" height="250" />
            <h1 className="playlist-title display-5 bold-title mb-2">{playlist.name}</h1>
            <p className="bold-title mb-5">By {playlist.owner.display_name}</p>
            <div className="d-flex align-items-center justify-content-center">
              <span className="me-4 label-text">EXPLICIT </span>
              <Switch isOn={toClean} handleToggle={() => setToClean(!toClean)} />
              <span className="ms-4 label-text"> CLEAN</span>
            </div>
            <div className="py-3" />
            <PillButton text="Convert" href="/" />
          </Col>
          <Col className="" xs={{ span: 10, offset: 1 }} md={{ span: 5, offset: 6 }} xl={{ span: 4, offset: 6 }}>
            {items.map((playlistTrack, index) => (
              <div key={index}>
                <img className="track-image float-start" src={playlistTrack.track.album.images[0] && playlistTrack.track.album.images[0].url} alt="track" width="45" height="45" />
                <div className="d-inline">
                  <p className="m-0 truncate-text">{playlistTrack.track.name}</p>
                  <p className="artist-names truncate-text">
                    {playlistTrack.track.explicit && !toClean && <span>&#127348; </span>}
                    {playlistTrack.track.artists.map((artist, index) => (index < playlistTrack.track.artists.length - 1 ? artist.name + ", " : artist.name))}
                    &nbsp;&nbsp;·&nbsp;&nbsp;
                    {playlistTrack.track.album.name}
                  </p>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      )}
    </>
  );
};

export default PlaylistConverter;
