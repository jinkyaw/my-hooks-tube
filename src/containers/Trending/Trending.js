import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./Trending.scss";
import {
  allMostPopularVideosLoaded,
  getMostPopularVideos,
  getMostPopularVideosNextPageToken,
} from "../../store/reducers/videos";
import * as videoActions from "../../store/actions/videos";
import { getYoutubeLibraryLoaded } from "../../store/reducers/api";
import VideoList from "../../components/VideoList/VideoList";

const Trending = (props) => {
  const { youtubeLibraryLoaded, fetchMostPopularVideos, nextPageToken } = props;

  const shouldShowLoader = () => {
    return !props.allMostPopularVideosLoaded;
  };

  const loaderActive = shouldShowLoader();

  useEffect(() => {
    if (youtubeLibraryLoaded && nextPageToken) {
      fetchMostPopularVideos(20, true, nextPageToken);
    }
  }, [youtubeLibraryLoaded, fetchMostPopularVideos, nextPageToken]);

  const fetchMoreVideos = () => {
    if (youtubeLibraryLoaded && nextPageToken) {
      props.fetchMostPopularVideos(12, true, nextPageToken);
    }
  };

  return (
    <VideoList
      bottomReachedCallback={fetchMoreVideos}
      showLoader={loaderActive}
      videos={props.videos}
    />
  );
};

function mapStateToProps(state) {
  return {
    videos: getMostPopularVideos(state),
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
    allMostPopularVideosLoaded: allMostPopularVideosLoaded(state),
    nextPageToken: getMostPopularVideosNextPageToken(state),
  };
}

function mapDispatchToProps(dispatch) {
  const fetchMostPopularVideos = videoActions.mostPopular.request;
  return bindActionCreators({ fetchMostPopularVideos }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Trending);