
	var context = new AudioContext({ sampleRate: 44100 });
	var fileInput = document.getElementById("fileInput");

	fileInput.onchange = function () {
	  var files = fileInput.files;

	  if (files.length == 0) return;
	  var reader = new FileReader();

	  reader.onload = function(fileEvent) {
		context.decodeAudioData(fileEvent.target.result, calcTempo);
	  }

	  reader.readAsArrayBuffer(files[0]);
	}
	var calcTempo = function (buffer) {
	  var audioData = [];
	  // Take the average of the two channels
	  if (buffer.numberOfChannels == 2) {
		var channel1Data = buffer.getChannelData(0);
		var channel2Data = buffer.getChannelData(1);
		var length = channel1Data.length;
		for (var i = 0; i < length; i++) {
		  audioData[i] = (channel1Data[i] + channel2Data[i]) / 2;
		}
	  } else {
		audioData = buffer.getChannelData(0);
	  }
	  var mt = new MusicTempo(audioData);

	  console.log(mt.tempo);
	  console.log(mt.beats);
	}
