import React from 'react'

export default function Chat () {

  var webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'localVideo',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remotesVideos',
    // immediately ask for camera access
    autoRequestMedia: true
  })

  return (
    <div>
      <video height="300" id="localVideo"></video>
      <div id="remotesVideos"></div>
      {webrtc.on('readyToCall', () => webrtc.joinRoom('room name'))}
    </div>
  )
}
