(async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('./assets/face-api/weights');
    await faceapi.nets.faceLandmark68Net.loadFromUri('./assets/face-api/weights');
    await faceapi.nets.faceExpressionNet.loadFromUri('./assets/face-api/weights');


    const image = document.querySelector('img');
    const canvas = faceapi.createCanvasFromMedia(image);
    const detection = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())
                                    .withFaceLandmarks()
                                    .withFaceExpressions();

    const dimensions = {
        height: image.height,
        width: image.width,
    }

    const resizedDimensions = faceapi.resizeResults(detection,dimensions);

    faceapi.draw.drawDetections(canvas, resizedDimensions);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDimensions);
    faceapi.draw.drawFaceExpressions(canvas, resizedDimensions);


    const url = canvas.toDataURL();
    image.src = url;

})();