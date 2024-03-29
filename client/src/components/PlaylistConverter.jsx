import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { convertPlaylist, deletePlaylist, getConvertedPlaylist, getPlaylistConverter } from "../spotify";
import "./PlaylistConverter.css";
import PillButton from "./PillButton";
import Loader from './Loader';
import Toast from './Toast';

const PlaylistConverter = () => {
  const { PUBLIC_URL } = process.env;

  const { playlistId } = useParams();

  const [profile, setProfile] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [items, setItems] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [convertedPlaylist, setConvertedPlaylist] = useState(null);
  const [convertedItems, setConvertedItems] = useState(null);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      getPlaylistConverter(playlistId)
        .then((response) => {
          const { profile, playlist, items } = response;

          setProfile(profile);
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

  const clickConvert = async (toClean) => {
    setIsLoading(true);

    const playlistId = await convertPlaylist(profile.id, playlist, items, toClean);

    if (playlistId) {
      getConvertedPlaylist(playlistId)
        .then((response) => {
          const { playlist, items } = response;
          setConvertedPlaylist({
            ...playlist,
            id: playlistId
          });
          setConvertedItems(items);

          setIsLoading(false);

          setToastMessage("Successfully converted this playlist.");
          setShowToast(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsLoading(false);

      setToastMessage("This playlist cannot be converted.");
      setShowToast(true);
    }
  }

  const clickDelete = (playlistId) => {
    deletePlaylist(playlistId);

    setConvertedPlaylist(null);
    setConvertedItems(null);

    setToastMessage("Successfully deleted the converted playlist.");
    setShowToast(true);
  }

  return (
    <>
      {(profile && playlist && items) ? (
        <Container fluid className="px-5">
          <Row>
            <Col className="text-center mb-5">
              <img
                className="img-fluid mb-3 playlist-image"
                src={playlist.images.length ? playlist.images[0].url : PUBLIC_URL + "/empty-playlist.png"}
                alt="playlist"
                width="250"
                height="250"
              />
              <h1 className="playlist-title truncate-text display-5 bold-title mb-2">{playlist.name}</h1>
              <p className=" bold-title mb-5">{playlist.owner.display_name}</p>
              <Row className="align-items-center">
                <Col xl={4} className="text-start mb-5 mb-xl-0">
                  <h2 className="d-inline-block display-5 bold-title">Converter</h2><br />
                  <p className="d-inline-block fs-5 gray-text mb-0">Convert this playlist to explicit or clean.</p>
                </Col>
                <Col xl={8} className="text-xl-end">
                  <PillButton
                    className="stretch mb-3 mb-md-0 me-md-4"
                    outline
                    text="Explicit"
                    title="Convert this playlist to explicit"
                    disabled={playlist.images.length ? false : true}
                    onClick={() => clickConvert(false)}
                  />
                  <br className="d-md-none" />
                  <PillButton
                    className={`stretch${convertedPlaylist ? " mb-3 mb-md-0 me-md-4" : ""}`}
                    text="Clean"
                    title="Convert this playlist to clean"
                    disabled={playlist.images.length ? false : true}
                    onClick={() => clickConvert(true)}
                  />
                  {convertedPlaylist &&
                    <>
                      <br className="d-md-none" />
                      <PillButton
                        delete
                        className="stretch delete"
                        text="Delete"
                        title="Delete the converted playlist"
                        onClick={() => clickDelete(convertedPlaylist.id)}
                      />
                    </>
                  }
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col
              xs={{ span: 10, offset: 1, order: "second" }}
              md={(convertedItems || isLoading) ? { span: 5, offset: 1, order: "first" } : { span: 8, offset: 2, order: "first" }}
              xl={(convertedItems || isLoading) ? { span: 4, offset: 1 } : { span: 6, offset: 3 }}
              className={`${convertedItems ? "mt-5 mt-md-0" : ""} ${isLoading ? "mt-5 mt-md-0" : ""}`}
            >
              <a href={playlist.external_urls.spotify} className="white-to-green" target="_blank" rel="noopener noreferrer" title={`View ${playlist.name} on Spotify`}>
                <p className="fs-3 mb-5 text-center">
                  <span className="h3 bold-title">Original Playlist · </span>{items.length} song{items.length !== 1 ? "s" : ""}
                </p>
              </a>
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
                    <a href={item.track.external_urls.spotify} className="white-to-green" target="_blank" rel="noopener noreferrer" title={`View ${item.track.name} on Spotify`}>
                      <p className="m-0 truncate-text">{item.track.name}</p>
                    </a>
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
            {(convertedPlaylist && convertedItems) && (
              <Col
                xs={{ span: 10, offset: 1, order: "first" }}
                md={{ span: 5, offset: 0, order: "last" }}
                xl={{ span: 4, offset: 2 }}
              >
                <a href={convertedPlaylist.external_urls.spotify} className="white-to-green" target="_blank" rel="noopener noreferrer" title={`View ${convertedPlaylist.name} on Spotify`}>
                  <p className="fs-3 mb-5 text-center">
                    <span className="h3 bold-title">Converted Playlist · </span>{convertedItems.length} song{convertedItems.length !== 1 ? "s" : ""}
                  </p>
                </a>
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
                      <a href={item.track.external_urls.spotify} className="white-to-green" target="_blank" rel="noopener noreferrer" title={`View ${item.track.name} on Spotify`}>
                        <p className="m-0 truncate-text">{item.track.name}</p>
                      </a>
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
            {isLoading && (
              <Col
                xs={{ span: 10, offset: 1, order: "first" }}
                md={{ span: 5, offset: 0, order: "last" }}
                xl={{ span: 4, offset: 2 }}
              >
                <Loader />
              </Col>
            )}
          </Row>
          <Toast show={showToast} setShow={setShowToast} message={toastMessage} />
        </Container>
      ) : (
        <Loader fullScreen />
      )}
    </>
  );
};

export default PlaylistConverter;
