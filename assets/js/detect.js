(async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('./assets/face-api/weights');
    await faceapi.nets.faceLandmark68Net.loadFromUri('./assets/face-api/weights');
    await faceapi.nets.faceExpressionNet.loadFromUri('./assets/face-api/weights');


    const video = document.getElementById('video');
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} })
    video.srcObject = stream

    video.addEventListener('play',() =>{
        const canvas = faceapi.createCanvasFromMedia(video);
        document.getElementById("can").append(canvas);

        const dimensions = {
            width: video.width,
            height: video.height,
        }
        faceapi.matchDimensions(canvas, dimensions)

        setInterval(async () =>{
            const detection = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                                        // .withFaceLandmarks()
                                        .withFaceExpressions();

            const resizedDimensions = faceapi.resizeResults(detection,dimensions);

            canvas
                .getContext('2d')
                .clearRect(0, 0, canvas.width, canvas.height)

            faceapi.draw.drawDetections(canvas, resizedDimensions);
            // faceapi.draw.drawFaceLandmarks(canvas, resizedDimensions);
            faceapi.draw.drawFaceExpressions(canvas, resizedDimensions);
        },100);
        
    })
    

})();