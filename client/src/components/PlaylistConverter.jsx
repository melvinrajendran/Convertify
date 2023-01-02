import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { convertPlaylist, getConvertedPlaylist, getPlaylistConverter } from "../spotify";
import "./PlaylistConverter.css";
import PillButton from "./PillButton";
import Loader from './Loader';

const PlaylistConverter = () => {
  const { playlistId } = useParams();

  const [user, setUser] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [items, setItems] = useState([]);
  const [convertedItems, setConvertedItems] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      getPlaylistConverter(playlistId)
        .then((response) => {
          const { user, playlist, items } = response;

          setUser(user);
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

  const handleClick = async (toClean) => {
    const playlistId = await convertPlaylist(user.id, playlist.name, items, toClean);
    console.log(playlistId);
    getConvertedPlaylist(playlistId)
      .then((response) => {
        setConvertedItems(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {(user && playlist && items) ? (
        <Container fluid className="px-5">
          <Row>
            <Col className="text-center mb-5">
              <img
                className="img-fluid mb-3"
                src={playlist.images.length ? playlist.images[0].url : process.env.PUBLIC_URL + "/empty-playlist.png"}
                alt="playlist"
                width="250"
                height="250"
              />
              <h1 className="playlist-title display-5 bold-title mb-2">{playlist.name}</h1>
              <p className=" bold-title mb-5">{playlist.owner.display_name}</p>
              <Row className="align-items-center">
                <Col xl={6} className="text-start mb-5 mb-xl-0">
                  <h2 className="d-inline-block display-5 bold-title">Converter</h2><br />
                  <p className="d-inline-block fs-5 gray-text mb-0">Convert this playlist to explicit or clean.</p>
                </Col>
                <Col xl={6} className="text-xl-end">
                  <PillButton
                    className="stretch mb-3 mb-md-0 me-md-5"
                    outline
                    text="Explicit"
                    title={`Convert ${playlist.name} to explicit`}
                    disabled={playlist.images.length ? false : true}
                    onClick={() => handleClick(false)}
                  />
                  <br className="d-md-none" />
                  <PillButton
                    className="stretch"
                    text="Clean"
                    title={`Convert ${playlist.name} to clean`}
                    disabled={playlist.images.length ? false : true}
                    onClick={() => handleClick(true)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col
              xs={{ span: 10, offset: 1 }}
              md={convertedItems ? { span: 5, offset: 1 } : { span: 8, offset: 2 }}
              xl={convertedItems ? { span: 4, offset: 1 } : { span: 6, offset: 3 }}
            >
              <p className="h3 mb-4 text-center"><span className="bold-title">Original Playlist · </span>{items.length} Songs</p>
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
                      {item.track.explicit && <span>&#127348; </span>}
                      {item.track.artists.map((artist, index) => (index < item.track.artists.length - 1 ? artist.name + ", " : artist.name))}
                      &nbsp;&nbsp;·&nbsp;&nbsp;
                      {item.track.album.name}
                    </p>
                  </div>
                </div>
              ))}
            </Col>
            {convertedItems && (
              <Col xs={{ span: 10, offset: 1 }} md={{ span: 5, offset: 0 }} xl={{ span: 4, offset: 2 }}>
                <p className="h3 mb-4 text-center"><span className="bold-title">Converted Playlist · </span>{convertedItems.length} Songs</p>
                {convertedItems.map((item, index) => (
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
                        {item.track.explicit && <span>&#127348; </span>}
                        {item.track.artists.map((artist, index) => (index < item.track.artists.length - 1 ? artist.name + ", " : artist.name))}
                        &nbsp;&nbsp;·&nbsp;&nbsp;
                        {item.track.album.name}
                      </p>
                    </div>
                  </div>
                ))}
              </Col>
            )}
          </Row>
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PlaylistConverter;
