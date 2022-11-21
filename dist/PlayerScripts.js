var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.MAIN_SCRIPT=exports.soundMode=exports.playMode=exports.PLAYER_FUNCTIONS=void 0;var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _constants=require("./constants");var _playMode,_soundMode;var PLAYER_FUNCTIONS={muteVideo:'player.mute(); true;',unMuteVideo:'player.unMute(); true;',playVideo:'player.playVideo(); true;',pauseVideo:'player.pauseVideo(); true;',getVideoUrlScript:"\nwindow.ReactNativeWebView.postMessage(JSON.stringify({eventType: 'getVideoUrl', data: player.getVideoUrl()}));\ntrue;\n  ",durationScript:"\nwindow.ReactNativeWebView.postMessage(JSON.stringify({eventType: 'getDuration', data: player.getDuration()}));\ntrue;\n",currentTimeScript:"\nwindow.ReactNativeWebView.postMessage(JSON.stringify({eventType: 'getCurrentTime', data: player.getCurrentTime()}));\ntrue;\n",isMutedScript:"\nwindow.ReactNativeWebView.postMessage(JSON.stringify({eventType: 'isMuted', data: player.isMuted()}));\ntrue;\n",getVolumeScript:"\nwindow.ReactNativeWebView.postMessage(JSON.stringify({eventType: 'getVolume', data: player.getVolume()}));\ntrue;\n",getPlaybackRateScript:"\nwindow.ReactNativeWebView.postMessage(JSON.stringify({eventType: 'getPlaybackRate', data: player.getPlaybackRate()}));\ntrue;\n",getAvailablePlaybackRatesScript:"\nwindow.ReactNativeWebView.postMessage(JSON.stringify({eventType: 'getAvailablePlaybackRates', data: player.getAvailablePlaybackRates()}));\ntrue;\n",setVolume:function setVolume(volume){return"player.setVolume("+volume+"); true;";},seekToScript:function seekToScript(seconds,allowSeekAhead){return"player.seekTo("+seconds+", "+allowSeekAhead+"); true;";},setPlaybackRate:function setPlaybackRate(playbackRate){return"player.setPlaybackRate("+playbackRate+"); true;";},loadPlaylist:function loadPlaylist(playList,startIndex,play){var index=startIndex||0;var func=play?'loadPlaylist':'cuePlaylist';var list=typeof playList==='string'?"\""+playList+"\"":'undefined';var listType=typeof playList==='string'?"\""+playlist+"\"":'undefined';var playlist=Array.isArray(playList)?"\""+playList.join(',')+"\"":'undefined';return"player."+func+"({listType: "+listType+", list: "+list+", playlist: "+playlist+", index: "+index+"}); true;";},loadVideoById:function loadVideoById(videoId,play){var func=play?'loadVideoById':'cueVideoById';return"player."+func+"({videoId: "+JSON.stringify(videoId)+"}); true;";}};exports.PLAYER_FUNCTIONS=PLAYER_FUNCTIONS;var playMode=(_playMode={},(0,_defineProperty2.default)(_playMode,_constants.PLAY_MODE,PLAYER_FUNCTIONS.playVideo),(0,_defineProperty2.default)(_playMode,_constants.PAUSE_MODE,PLAYER_FUNCTIONS.pauseVideo),_playMode);exports.playMode=playMode;var soundMode=(_soundMode={},(0,_defineProperty2.default)(_soundMode,_constants.MUTE_MODE,PLAYER_FUNCTIONS.muteVideo),(0,_defineProperty2.default)(_soundMode,_constants.UNMUTE_MODE,PLAYER_FUNCTIONS.unMuteVideo),_soundMode);exports.soundMode=soundMode;var MAIN_SCRIPT=function MAIN_SCRIPT(videoId,playList,initialPlayerParams,allowWebViewZoom,contentScale){var end=initialPlayerParams.end,rel=initialPlayerParams.rel,color=initialPlayerParams.color,start=initialPlayerParams.start,playerLang=initialPlayerParams.playerLang,_initialPlayerParams$=initialPlayerParams.loop,loop=_initialPlayerParams$===void 0?false:_initialPlayerParams$,cc_lang_pref=initialPlayerParams.cc_lang_pref,iv_load_policy=initialPlayerParams.iv_load_policy,modestbranding=initialPlayerParams.modestbranding,_initialPlayerParams$2=initialPlayerParams.controls,controls=_initialPlayerParams$2===void 0?true:_initialPlayerParams$2,showClosedCaptions=initialPlayerParams.showClosedCaptions,_initialPlayerParams$3=initialPlayerParams.preventFullScreen,preventFullScreen=_initialPlayerParams$3===void 0?false:_initialPlayerParams$3;var rel_s=rel?1:0;var loop_s=loop?1:0;var videoId_s=videoId||'';var controls_s=controls?1:0;var cc_lang_pref_s=cc_lang_pref||'';var modestbranding_s=modestbranding?1:0;var preventFullScreen_s=preventFullScreen?0:1;var showClosedCaptions_s=showClosedCaptions?1:0;var contentScale_s=typeof contentScale==='number'?contentScale:1.0;var list=typeof playList==='string'?playList:undefined;var listType=typeof playList==='string'?'playlist':undefined;var playlist=Array.isArray(playList)?playList.join(','):undefined;var scale="initial-scale="+contentScale_s;if(!allowWebViewZoom){scale+=", maximum-scale="+contentScale_s;}var safeData={end:end,list:list,start:start,color:color,rel_s:rel_s,loop_s:loop_s,listType:listType,playlist:playlist,videoId_s:videoId_s,controls_s:controls_s,playerLang:playerLang,iv_load_policy:iv_load_policy,contentScale_s:contentScale_s,cc_lang_pref_s:cc_lang_pref_s,allowWebViewZoom:allowWebViewZoom,modestbranding_s:modestbranding_s,preventFullScreen_s:preventFullScreen_s,showClosedCaptions_s:showClosedCaptions_s};var urlEncodedJSON=encodeURI(JSON.stringify(safeData));var listParam=list?"list: '"+list+"',":'';var listTypeParam=listType?"listType: '"+list+"',":'';var playlistParam=playList?"playlist: '"+playList+"',":'';var htmlString="\n<!DOCTYPE html>\n<html>\n  <head>\n    <meta\n      name=\"viewport\"\n      content=\"width=device-width, "+scale+"\"\n    >\n    <style>\n      body {\n        margin: 0;\n      }\n      .container {\n        position: relative;\n        width: 100%;\n        height: 0;\n        padding-bottom: 56.25%;\n      }\n      .video {\n          position: absolute;\n          top: 0;\n          left: 0;\n          width: 100%;\n          height: 100%;\n      }\n    </style>\n  </head>\n  <body>\n    <div class=\"container\">\n      <div class=\"video\" id=\"player\" />\n    </div>\n\n    <script>\n      var tag = document.createElement('script');\n\n      tag.src = \"https://www.youtube.com/iframe_api\";\n      var firstScriptTag = document.getElementsByTagName('script')[0];\n      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);\n\n      var player;\n      function onYouTubeIframeAPIReady() {\n        player = new YT.Player('player', {\n          width: '1000',\n          height: '1000',\n          videoId: '"+videoId_s+"',\n          playerVars: {\n            "+listParam+"\n            "+listTypeParam+"\n            "+playlistParam+"\n\n            end: "+end+",\n            rel: "+rel_s+",\n            playsinline: 1,\n            loop: "+loop_s+",\n            color: "+color+",\n            start: "+start+",\n            hl: "+playerLang+",\n            controls: "+controls_s+",\n            fs: "+preventFullScreen_s+",\n            cc_lang_pref: '"+cc_lang_pref_s+"',\n            iv_load_policy: "+iv_load_policy+",\n            modestbranding: "+modestbranding_s+",\n            cc_load_policy: "+showClosedCaptions_s+",\n          },\n          events: {\n            'onReady': onPlayerReady,\n            'onStateChange': onPlayerStateChange,\n            'onError': onPlayerError,\n            'onPlaybackQualityChange': onPlaybackQualityChange,\n            'onPlaybackRateChange': onPlaybackRateChange,\n          }\n        });\n      }\n\n      function onPlayerError(event) {\n        window.ReactNativeWebView.postMessage(JSON.stringify({eventType: 'playerError', data: event.data}))\n      }\n\n      function onPlaybackRateChange(event) {\n        window.ReactNativeWebView.postMessage(JSON.stringify({eventType: 'playbackRateChange', data: event.data}))\n      }\n\n      function onPlaybackQualityChange(event) {\n        window.ReactNativeWebView.postMessage(JSON.stringify({eventType: 'playerQualityChange', data: event.data}))\n      }\n\n      function onPlayerReady(event) {\n        window.ReactNativeWebView.postMessage(JSON.stringify({eventType: 'playerReady'}))\n      }\n\n      var done = false;\n      function onPlayerStateChange(event) {\n        window.ReactNativeWebView.postMessage(JSON.stringify({eventType: 'playerStateChange', data: event.data}))\n      }\n\n      var isFullScreen = false;\n      function onFullScreenChange() {\n        isFullScreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;\n        window.ReactNativeWebView.postMessage(JSON.stringify({eventType: 'fullScreenChange', data: Boolean(isFullScreen)}));\n      }\n\n      document.addEventListener('fullscreenchange', onFullScreenChange)\n      document.addEventListener('mozfullscreenchange', onFullScreenChange)\n      document.addEventListener('msfullscreenchange', onFullScreenChange)\n      document.addEventListener('webkitfullscreenchange', onFullScreenChange)\n    </script>\n  </body>\n</html>\n";return{htmlString:htmlString,urlEncodedJSON:urlEncodedJSON};};exports.MAIN_SCRIPT=MAIN_SCRIPT;