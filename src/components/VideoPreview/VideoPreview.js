import React from "react";
import { Image } from "semantic-ui-react";
import "./VideoPreview.scss";
import {Link} from 'react-router-dom';

import { getShortNumberString } from "../../shared/number-format";
import { getVideoDurationString } from "../../shared/date-format";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.locale(en);
const timeAgo = new TimeAgo("en-US");

const VideoPreview = (props) => {
  const { video } = props;
  if (!video) {
    return <div />;
  }

  const getFormattedViewAndTime = (video) => {
    const publicationDate = new Date(video.snippet.publishedAt);
    const viewCount = video.statistics ? video.statistics.viewCount : null;
    if (viewCount) {
      const viewCountShort = getShortNumberString(video.statistics.viewCount);
      return `${viewCountShort} views • ${timeAgo.format(publicationDate)}`;
    }
    return "";
  };

  const duration = video.contentDetails ? video.contentDetails.duration : null;
  const videoDuration = getVideoDurationString(duration);
  const viewAndTimeString = getFormattedViewAndTime(video);
  const horizontal = props.horizontal ? "horizontal" : null;
  return (
    <Link to={{ pathname: props.pathname, search: props.search }}>
      <div className={["video-preview", horizontal].join(" ")}>
        <div className="image-container">
          <Image src={video.snippet.thumbnails.medium.url} />
          <div className="time-label">
            <span>{videoDuration}</span>
          </div>
        </div>

        <div className="video-info">
          <div className="semi-bold show-max-two-lines">
            {video.snippet.title}
          </div>
          <div className="video-preview-metadata-container">
            <div className="channel-title">{video.snippet.channelTitle}</div>
            <div>
              <span>{viewAndTimeString}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoPreview;
